import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600">
          {new Date(post.date).toLocaleDateString()}
        </p>
      </header>
      <div className="prose prose-lg max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }}
        />
      </div>
    </article>
  )
}

function formatMarkdown(content: string): string {
  // Basic markdown formatting - in a real app you'd use a proper markdown parser
  return content
    .replace(/#### (.*)/g, '<h4>$1</h4>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/# (.*)/g, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>')
    .replace(/(\d+)️⃣/g, '<span class="text-blue-600 font-semibold">$1.</span>')
}