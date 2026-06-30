import { getAllPosts, getPostBySlug } from "@/lib/blog-data";
import type { SearchItem, SearchPage, SearchPost } from "@/lib/search-types";
import { stripMarkdown } from "@/lib/strip-markdown";

export const revalidate = 604800; // 1 week — same ISR as blog posts

// TODO(refactor)[P1]: 40 lines of static page metadata inline
const SITE_PAGES: SearchPage[] = [
  {
    type: "page",
    label: "Home",
    href: "/",
    keywords: [
      "home",
      "início",
      "pedro felipe",
      "backend",
      "engineer",
      "portfolio",
    ],
  },
  {
    type: "page",
    label: "About / CV",
    href: "/about",
    keywords: [
      "about",
      "sobre",
      "cv",
      "curriculum",
      "experiência",
      "educação",
      "work",
      "experience",
    ],
  },
  {
    type: "page",
    label: "Projects",
    href: "/projects",
    keywords: ["projects", "projetos", "github", "open source", "código"],
  },
  {
    type: "page",
    label: "Blog",
    href: "/blog",
    keywords: ["blog", "artigos", "posts", "writing", "artigos técnicos"],
  },
];

export async function GET(): Promise<Response> {
  const posts = getAllPosts();

  // TODO(refactor)[P2]: calls getPostBySlug again after getAllPosts
  const indexedPosts: SearchPost[] = posts.map((meta) => {
    const full = getPostBySlug(meta.slug);
    const rawContent = full?.content ?? "";
    const plainContent = stripMarkdown(rawContent);
    const headings = full?.headings?.map((h) => h.text) ?? [];

    return {
      type: "post",
      slug: meta.slug,
      title: meta.title,
      excerpt: meta.excerpt,
      tags: meta.tags,
      date: meta.date,
      // TODO(refactor)[P1]: unreachable fallback
      readingTime: meta.readingTime ?? 1,
      content: plainContent,
      headings,
    };
  });

  const index: SearchItem[] = [...SITE_PAGES, ...indexedPosts];

  return Response.json(index);
}
