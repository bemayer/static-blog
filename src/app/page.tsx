import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "../lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-8 last:border-b-0">
            {post.featuredImage && (
              <div className="mb-4">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  width={800}
                  height={192}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
            <header className="mb-4">
              <h2 className="text-2xl font-semibold mb-3">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>by {post.author}</span>
                <span>{post.readingTime} min read</span>
                <span>{post.wordCount} words</span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
            <div className="mb-4">
              {post.description && (
                <p className="text-lg text-gray-600 font-medium mb-2">
                  {post.description}
                </p>
              )}
              <p className="text-gray-700 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <Link
              href={`/posts/${post.slug}`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Read more →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
