import { join } from 'node:path'
import { readdir, readFile } from 'node:fs/promises'

// Simplified front matter parsing function
function extractFrontMatter(content: string): { attrs: Record<string, any>, body: string } {
  if (!content.startsWith('---')) {
    return { attrs: {}, body: content }
  }

  const parts = content.split('---')
  if (parts.length < 3) {
    return { attrs: {}, body: content }
  }

  const frontMatter = parts[1].trim()
  const body = parts.slice(2).join('---').trim()

  const attrs: Record<string, any> = {}
  frontMatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      attrs[key.trim()] = valueParts.join(':').trim().replace(/['"]/g, '')
    }
  })

  return { attrs, body }
}

const postsDirectory = join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  date: string
  content: string
  excerpt: string
}

export async function getAllPosts(): Promise<Post[]> {
  const allPostsData: Post[] = []

  try {
    const fileNames = await readdir(postsDirectory)

    for (const fileName of fileNames) {
      if (fileName.endsWith('.md')) {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = join(postsDirectory, fileName)
        const fileContents = await readFile(fullPath, 'utf8')
        const { attrs, body } = extractFrontMatter(fileContents)

        allPostsData.push({
          slug,
          title: (attrs as any).title || '',
          date: (attrs as any).date || '',
          content: body,
          excerpt: body.substring(0, 150).replace(/[#*`]/g, '') + '...',
        })
      }
    }
  } catch (error) {
    // Return empty array if posts directory doesn't exist
    return []
  }

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = join(postsDirectory, `${slug}.md`)
    const fileContents = await readFile(fullPath, 'utf8')
    const { attrs, body } = extractFrontMatter(fileContents)

    return {
      slug,
      title: (attrs as any).title || '',
      date: (attrs as any).date || '',
      content: body,
      excerpt: body.substring(0, 150).replace(/[#*`]/g, '') + '...',
    }
  } catch (error) {
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const slugs: string[] = []

  try {
    const fileNames = await readdir(postsDirectory)

    for (const fileName of fileNames) {
      if (fileName.endsWith('.md')) {
        slugs.push(fileName.replace(/\.md$/, ''))
      }
    }
  } catch (error) {
    // Return empty array if posts directory doesn't exist
    return []
  }

  return slugs
}