import { join } from "node:path";
import { readdir, readFile } from "node:fs/promises";
import process from "node:process";
import matter from "gray-matter";
import yaml from "js-yaml";

const postsDirectory = join(process.cwd(), "posts");
const configPath = join(process.cwd(), "config", "site.yml");

// Site configuration interface
export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  author_name: string;
  author_email: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  analytics_id?: string;
  enable_comments: boolean;
}

// Get site configuration
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const configContent = await readFile(configPath, "utf-8");
    const config = yaml.load(configContent) as unknown as SiteConfig;
    return {
      title: config.title || "Static Blog",
      description: config.description || "A modern static blog",
      url: config.url || "",
      author_name: config.author_name || "Blog Author",
      author_email: config.author_email || "",
      social: config.social || {},
      enable_comments: Boolean(config.enable_comments),
    };
  } catch (_error) {
    return {
      title: "Static Blog",
      description: "A modern static blog",
      url: "",
      author_name: "Blog Author",
      author_email: "",
      social: {},
      enable_comments: false,
    };
  }
}

// Get default author from site config
async function getDefaultAuthor(): Promise<string> {
  const config = await getSiteConfig();
  return config.author_name;
}

// Enhanced type definitions for better CMS validation
export interface PostMetadata {
  title: string;
  date: string;
  author?: string;
  tags: string[]; // Always return string array after processing
  description?: string;
  featured_image?: string;
  draft?: boolean;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
  featuredImage?: string;
  content: string;
  excerpt: string;
  isDraft: boolean;
  wordCount: number;
  readingTime: number;
}

// Simple validation for posts
function validatePostMetadata(attrs: Record<string, unknown>): PostMetadata {
  // Normalize date to string
  let date: string;
  if (typeof attrs.date === "string") {
    date = attrs.date;
  } else if (attrs.date instanceof Date) {
    date = attrs.date.toISOString();
  } else {
    date = new Date().toISOString();
  }

  // Normalize tags
  let tags: string[] = [];
  if (Array.isArray(attrs.tags)) {
    tags = attrs.tags.filter((tag) => typeof tag === "string");
  } else if (typeof attrs.tags === "string") {
    tags = attrs.tags.split(",").map((tag) => tag.trim()).filter((tag) =>
      tag.length > 0
    );
  }

  return {
    title: (attrs.title as string) || "Untitled",
    date,
    author: (attrs.author as string) || undefined,
    tags: tags, // Already processed to be string[]
    description: (attrs.description as string) || undefined,
    featured_image: (attrs.featured_image as string) || undefined,
    draft: Boolean(attrs.draft),
  };
}

// Enhanced excerpt generation
function generateExcerpt(content: string, maxLength = 160): string {
  // Remove markdown syntax for better excerpts
  const plainText = content
    .replace(/#{1,6}\s+/g, "") // Headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Bold
    .replace(/\*(.*?)\*/g, "$1") // Italic
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Links
    .replace(/!\[(.*?)\]\(.*?\)/g, "") // Images
    .replace(/`(.*?)`/g, "$1") // Code
    .replace(/\n+/g, " ") // Newlines
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return lastSpace > maxLength * 0.8
    ? truncated.substring(0, lastSpace) + "..."
    : truncated + "...";
}

// Calculate reading time (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordCount =
    content.split(/\s+/).filter((word) => word.length > 0).length;
  return Math.ceil(wordCount / 200);
}

export async function getAllPosts(includeDrafts = false): Promise<Post[]> {
  const allPostsData: Post[] = [];

  try {
    const fileNames = await readdir(postsDirectory);

    for (const fileName of fileNames) {
      if (fileName.endsWith(".md")) {
        try {
          const slug = fileName.replace(/\.md$/, "");
          const fullPath = join(postsDirectory, fileName);
          const fileContents = await readFile(fullPath, "utf-8");
          const { data, content } = matter(fileContents);

          // Validate post metadata
          const metadata = validatePostMetadata(data);

          // Skip drafts unless explicitly requested
          if (metadata.draft && !includeDrafts) {
            continue;
          }

          const wordCount = content.split(/\s+/).filter((word) =>
            word.length > 0
          ).length;

          allPostsData.push({
            slug,
            title: metadata.title,
            date: metadata.date,
            author: metadata.author || await getDefaultAuthor(),
            tags: metadata.tags,
            description: metadata.description || generateExcerpt(content),
            featuredImage: metadata.featured_image,
            content: content,
            excerpt: generateExcerpt(content),
            isDraft: metadata.draft || false,
            wordCount,
            readingTime: calculateReadingTime(content),
          });
        } catch (_error) {
          // Skip invalid posts
          continue;
        }
      }
    }
  } catch (_error) {
    return [];
  }

  // Sort by date
  return allPostsData.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string,
  includeDrafts = false,
): Promise<Post | null> {
  try {
    const fullPath = join(postsDirectory, `${slug}.md`);
    const fileContents = await readFile(fullPath, "utf-8");
    const { data, content } = matter(fileContents);

    // Validate post metadata
    const metadata = validatePostMetadata(data);

    // Skip drafts unless explicitly requested
    if (metadata.draft && !includeDrafts) {
      return null;
    }

    const wordCount = content.split(/\s+/).filter((word) =>
      word.length > 0
    ).length;

    return {
      slug,
      title: metadata.title,
      date: metadata.date,
      author: metadata.author || await getDefaultAuthor(),
      tags: metadata.tags,
      description: metadata.description || generateExcerpt(content),
      featuredImage: metadata.featured_image,
      content: content,
      excerpt: generateExcerpt(content),
      isDraft: metadata.draft || false,
      wordCount,
      readingTime: calculateReadingTime(content),
    };
  } catch (_error) {
    return null;
  }
}

export async function getAllPostSlugs(
  includeDrafts = false,
): Promise<string[]> {
  const posts = await getAllPosts(includeDrafts);
  return posts.map((post) => post.slug);
}

// Additional CMS utilities
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
