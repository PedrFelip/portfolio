import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { BlogMetadata, BlogPost, Heading } from "@/types/portfolio";

const BLOG_DIR = path.join(process.cwd(), "src/app/content/blog");
const POSTS_PER_PAGE = 6;

/**
 * Slugify text for anchor IDs
 * Handles Portuguese characters (accents, ç)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Decompose accents
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Spaces to hyphens
    .replace(/-+/g, "-") // Multiple hyphens to single
    .trim();
}

/**
 * Extract headings from markdown content
 * Returns array of heading objects with level, text, and id
 */
export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match: RegExpExecArray | null = null;

  // biome-ignore lint/suspicious/noAssignInExpressions: regex exec pattern requires assignment in loop
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2]
      .trim()
      .replace(/\*\*/g, "") // Remove bold markdown
      .replace(/\*/g, "") // Remove italic markdown
      .replace(/__/g, "") // Remove underline bold
      .replace(/_/g, "") // Remove underline italic
      .trim();
    const id = slugify(text);

    headings.push({ level, text, id });
  }

  return headings;
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Get blog post metadata by slug
 * Using React.cache() for per-request deduplication (server-cache-react)
 */
export const getPostBySlug = cache((slug: string): BlogPost | null => {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.md`);
    const mdxFilePath = path.join(BLOG_DIR, `${slug}.mdx`);

    let fullPath = filePath;
    if (!fs.existsSync(filePath) && fs.existsSync(mdxFilePath)) {
      fullPath = mdxFilePath;
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const headings = extractHeadings(content);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || "",
      tags: data.tags || [],
      content,
      headings,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
});

/**
 * Get all blog posts metadata (sorted by date, newest first)
 * Using React.cache() for per-request deduplication (server-cache-react)
 */
export const getAllPosts = cache((): BlogMetadata[] => {
  const slugs = getAllPostSlugs();

  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;

      const readingTime = calculateReadingTime(post.content);

      // Return only metadata for list view
      return {
        slug: post.slug,
        title: post.title,
        date: post.date,
        excerpt: post.excerpt,
        tags: post.tags,
        readingTime,
      } as BlogMetadata;
    })
    .filter((post): post is BlogMetadata => post !== null)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
});

/**
 * Get paginated blog posts
 */
export function getPaginatedPosts(page = 1): {
  posts: BlogMetadata[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);

  return {
    posts,
    totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogMetadata[] {
  return getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();

  for (const post of allPosts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }

  return Array.from(tags).sort();
}

/**
 * Calculate reading time for blog content
 * Average reading speed: 200-250 words per minute
 * Uses 225 as the average
 */
export function calculateReadingTime(content: string): number {
  const wordCount = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 225));
}
