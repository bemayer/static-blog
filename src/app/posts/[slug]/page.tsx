import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { marked } from "marked";
import { getAllPostSlugs, getPostBySlug } from "../../../lib/posts";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Static Blog`,
    description: post.description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8 pb-6 border-b">
        <div className="mb-4">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back to all posts
          </Link>
        </div>

        {post.featuredImage && (
          <div className="mb-6">
            <Image
              src={post.featuredImage}
              alt={post.title}
              width={1024}
              height={256}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>

        {post.description && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {post.description}
          </p>
        )}

        <div className="flex items-center gap-6 text-gray-600 mb-4">
          <time dateTime={post.date} className="font-medium">
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
                className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
        <div
          dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        />
      </div>
    </article>
  );
}
