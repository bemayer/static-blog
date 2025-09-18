import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-2">
              <Link
                href={`/posts/${post.slug}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 text-sm mb-3">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}