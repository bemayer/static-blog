import { Handlers, PageProps } from "$fresh/server.ts";
import { getPosts, Post } from "@/utils/posts.ts";

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts();
    return ctx.render(posts);
  },
};

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data;
  return (
    <main class="max-w-screen-md px-4 pt-16 mx-auto">
      <h1 class="text-5xl font-bold">Blog</h1>
      <div class="mt-8 space-y-8">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  );
}

function PostCard({ post }: Readonly<{ post: Post }>) {
  return (
    <div class="py-8 border-t border-gray-200">
      <a
        href={`/${post.slug}`}
        class="block hover:bg-gray-50 p-4 transition rounded-md"
      >
        <h3 class="text-3xl text-gray-900 font-bold">{post.title}</h3>
        <time class="block text-gray-500 mt-1">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </a>
    </div>
  );
}
