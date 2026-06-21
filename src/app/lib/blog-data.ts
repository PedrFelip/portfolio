import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import type { BlogMetadata, BlogPost, Heading } from "@/types/portfolio";

const BLOG_DIR = path.join(process.cwd(), "src/app/content/blog");

/**
 * Author's timezone. Used to interpret frontmatter dates written without
 * an explicit offset (e.g. `"2026-05-07T15:30"`) and to render times.
 */
const AUTHOR_TZ = "America/Sao_Paulo"; // Brasília (UTC-3)

// TODO(refactor)[P4]: untested published check
function isPostPublished(frontmatter: Record<string, unknown>): boolean {
  const published = frontmatter.published;

  if (published === undefined) {
    return true;
  }

  if (typeof published === "boolean") {
    return published;
  }

  if (typeof published === "string") {
    const normalized = published.trim().toLowerCase();
    return normalized !== "false" && normalized !== "0";
  }

  return Boolean(published);
}

/**
 * Normalize a frontmatter `date` value into an ISO string.
 *
 * Accepts the following shapes:
 *   - `"2026-05-07"`                  → date-only, anchored at 12:00 (author TZ)
 *   - `"2026-05-07T14:30"`            → date + time, interpreted in author TZ
 *   - `"2026-05-07 14:30"`            → same as above (space separator)
 *   - `"2026-05-07T14:30:00-03:00"`   → ISO with explicit offset, kept as-is
 *
 * Falls back to "now" when the value is missing or unparseable.
 */
// TODO(refactor)[P4]: untested date normalization with 4 branches
function normalizeFrontmatterDate(raw: unknown): string {
  if (!raw) return new Date().toISOString();

  const str = typeof raw === "string" ? raw.trim() : String(raw);

  // Already ISO with explicit timezone (Z or ±HH:MM) → keep as-is
  if (/\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}.*([zZ]|[+-]\d{2}:?\d{2})$/.test(str)) {
    const parsed = new Date(str);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }

  // Date + time without timezone → interpret in author's TZ (Brasília)
  const dateTimeMatch = str.match(
    /^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2}(?::\d{2})?)$/,
  );
  if (dateTimeMatch) {
    const parsed = new Date(`${dateTimeMatch[1]}T${dateTimeMatch[2]}-03:00`);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }

  // Date only → anchor at 12:00 in author TZ (sentinel for date-only)
  const parsed = new Date(`${str}T12:00:00-03:00`);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();

  return new Date().toISOString();
}

/**
 * Format the date portion of a post's ISO date as `YYYY-MM-DD` in the
 * author's timezone (Brasília). Use this for any machine-style date
 * display so it stays consistent across environments.
 */
// TODO(refactor)[P4]: untested TZ-aware date formatting
export function getPostDateISO(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  const parts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: AUTHOR_TZ,
  }).formatToParts(date);

  const y = parts.find((p) => p.type === "year")?.value ?? "";
  const m = parts.find((p) => p.type === "month")?.value ?? "";
  const d = parts.find((p) => p.type === "day")?.value ?? "";

  if (!y || !m || !d) return isoDate;
  return `${y}-${m}-${d}`;
}

/**
 * Slugify text for anchor IDs
 * Handles Portuguese characters (accents, ç)
 */
// TODO(refactor)[P4]: untested Portuguese-aware slugify
function slugify(text: string): string {
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
 * Improved regex to handle H2 (##) and H3 (###) across multiline content
 * H1 (#) não é incluído pois geralmente é o título da página
 *
 * Best Practice 7.11 - Use Set/Map for O(1) Lookups
 * Uses Set to track duplicate IDs and append numeric suffixes
 */
// TODO(refactor)[P4]: untested regex-based heading extraction
function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+?)$/gm;
  const headings: Heading[] = [];
  const idCounts = new Map<string, number>(); // Track ID occurrences for deduplication
  let match: RegExpExecArray | null = null;

  // biome-ignore lint/suspicious/noAssignInExpressions: regex exec pattern requires assignment in loop
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2]
      .trim()
      .replace(/\*\*(.+?)\*\*/g, "$1") // Remove bold markdown but keep text
      .replace(/\*(.+?)\*/g, "$1") // Remove italic markdown but keep text
      .replace(/__(.+?)__/g, "$1") // Remove underline bold but keep text
      .replace(/_(.+?)_/g, "$1") // Remove underline italic but keep text
      .trim();

    const baseId = slugify(text);
    let id = baseId;

    // Deduplicate IDs by appending numeric suffix (best practice: O(1) lookup with Map)
    const count = idCounts.get(baseId) || 0;
    if (count > 0) {
      id = `${baseId}-${count}`;
    }
    idCounts.set(baseId, count + 1);

    headings.push({ level, text, id });
  }

  return headings;
}

/**
 * Get all blog post slugs
 */
// TODO(refactor)[P2]: sync readdirSync + per-file existsSync
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  return files.reduce<string[]>((acc, file) => {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) return acc;
    const slug = file.replace(/\.mdx?$/, "");
    if (getPostBySlug(slug) !== null) acc.push(slug);
    return acc;
  }, []);
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

    if (!isPostPublished(data as Record<string, unknown>)) {
      return null;
    }

    const headings = extractHeadings(content);

    // TODO(refactor)[P0]: readingTime missing from return
    return {
      slug,
      title: data.title || "Untitled",
      date: normalizeFrontmatterDate(data.date),
      // TODO(refactor)[P0]: excerpt always empty
      excerpt: data.excerpt || "",
      // TODO(refactor)[P1]: unsafe as string[] cast on frontmatter tags
      tags: (data.tags || data.categories || []) as string[],
      content,
      headings,
    };
    // TODO(refactor)[P1]: malformed frontmatter silently returns null
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

  const posts = slugs.reduce<BlogMetadata[]>((acc, slug) => {
    const post = getPostBySlug(slug);
    if (!post) return acc;

    acc.push({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      tags: post.tags,
      // TODO(refactor)[P0]: readingTime computed here but not in getPostBySlug
      readingTime: calculateReadingTime(post.content),
    });
    return acc;
  }, []);

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
});

/**
 * Get the most recently published post.
 *
 * Returns null when no posts are available so callers can
 * gracefully omit the section.
 */
export const getLatestPost = cache((): BlogMetadata | null => {
  const posts = getAllPosts();
  return posts[0] ?? null;
});

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
// TODO(refactor)[P4]: untested reading time calc
function calculateReadingTime(content: string): number {
  const wordCount = content
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / 225));
}
