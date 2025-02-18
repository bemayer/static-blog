import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPost, Post } from "@/utils/posts.ts";
import { CSS, render } from "@deno/gfm";
import { JSX } from "preact/jsx-runtime";

/**
 * Handles requests for fetching a specific blog post.
 */
export const handler: Handlers<Post> = {
  /**
   * Fetches a single blog post based on the slug parameter.
   *
   * @param _req - The incoming request (unused).
   * @param ctx - The request context, containing route parameters.
   * @returns A response with the rendered post or a "Not Found" page.
   */
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (!post) {
      return ctx.renderNotFound();
    }
    return ctx.render(post);
  },
};

/**
 * Renders a blog post page.
 *
 * @param props - The page properties, including the post data.
 * @returns The JSX representation of the blog post page.
 */
export default function PostPage({ data }: PageProps<Post>): JSX.Element {
  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <main class="max-w-prose px-6 md:px-8 lg:px-10 py-16 mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900">{data.title}</h1>
        <time class="block mt-2 text-gray-500 text-sm md:text-base">
          {new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div
          class="mt-6 prose prose-lg prose-gray dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: render(data.content) }}
        />
      </main>
    </>
  );
}
