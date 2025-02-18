import { extract } from "@std/front-matter/any";
import { join } from "@std/path";

/**
 * Directory containing the markdown posts.
 */
const DIRECTORY = Object.freeze("./posts");

/**
 * Represents a blog post.
 */
export interface Post {
  readonly slug: string;
  readonly title: string;
  readonly date: Date;
  readonly content: string;
}

/**
 * Retrieves all posts from the directory, sorted by publication date (newest first).
 *
 * @returns A promise resolving to an array of blog posts.
 */
export async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir(DIRECTORY);

  const posts = await Promise.all(
    (await Array.fromAsync(files))
      .map(file => getPost(file.name.replace(".md", "")))
  );

  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

/**
 * Retrieves a single post by its slug.
 *
 * @param slug - The identifier of the post.
 * @returns A promise resolving to the post object or `null` if not found.
 */
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const text = await Deno.readTextFile(join(DIRECTORY, `${slug}.md`));
    const { attrs, body } = extract<Post>(text);

    if (!attrs?.title || !attrs?.date) {
      return null;
    }

    return {
      slug,
      title: attrs.title,
      date: new Date(attrs.date),
      content: body,
    };
  } catch {
    return null;
  }
}
