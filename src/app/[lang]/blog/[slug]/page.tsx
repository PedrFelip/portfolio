import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Calendar } from "@/components/ui/icons";
import "highlight.js/styles/github-dark.css";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Callout } from "@/components/mdx/Callout";
import { CodeBlockWrapper } from "@/components/mdx/CodeBlockWrapper";
import { Figure } from "@/components/mdx/Figure";
import {
  MDXTable,
  MDXTableBody,
  MDXTableCell,
  MDXTableHead,
  MDXTableRow,
} from "@/components/mdx/MDXTable";
import { Badge, H1, H2, H3 } from "@/components/ui";
import { getAllPostSlugs, getPostBySlug, slugify } from "@/lib/blog-data";
import { blogContent } from "@/lib/content/blog-content";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    lang: "en" | "pt";
  }>;
}

/**
 * MDX Components - Performance Optimization
 *
 * Best practices:
 * - Defined outside of component to prevent re-creation
 * - Improves React reconciliation and rendering performance
 * - Components maintain stable references across renders
 * - Reduces unnecessary re-renders in MDX content
 */
const MDX_COMPONENTS = {
  pre: ({ children }: { children: React.ReactNode }) => (
    <CodeBlockWrapper>{children}</CodeBlockWrapper>
  ),
  code: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    // Se for inline code (dentro de parágrafos), não renderiza aqui
    // Se for dentro de pre, rehypeHighlight já cuidou
    if (className?.startsWith("hljs")) {
      return <code className={className}>{children}</code>;
    }
    // Inline code styling (4px grid: px-1.5 = 6px, py-0.5 = 2px)
    return (
      <code className="font-mono text-xs sm:text-sm bg-muted px-1.5 py-0.5 rounded border border-border text-foreground">
        {children}
      </code>
    );
  },
  Callout,
  Figure,
  table: MDXTable,
  thead: MDXTableHead,
  tbody: MDXTableBody,
  tr: MDXTableRow,
  th: ({ children }: { children: React.ReactNode }) => (
    <MDXTableCell isHeader>{children}</MDXTableCell>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <MDXTableCell>{children}</MDXTableCell>
  ),
  h2: ({ children }: { children: React.ReactNode }) => {
    const id = slugify(String(children));
    return (
      <H2
        id={id}
        className="scroll-mt-20 group relative mb-4 mt-10 border-b border-border pb-2 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent"
      >
        <span className="relative">
          {children}
          <span className="absolute -left-4 top-0 bottom-0 w-1 bg-accent rounded-full opacity-0 transition-opacity duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100" />
        </span>
      </H2>
    );
  },
  h3: ({ children }: { children: React.ReactNode }) => {
    const id = slugify(String(children));
    return (
      <H3
        id={id}
        className="scroll-mt-20 group relative mb-3 mt-8 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-accent"
      >
        {children}
      </H3>
    );
  },
} as const;

/**
 * BlogPostPage component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Consistent container: matches Navigation and Section components
 *
 * Vercel best practices:
 * - Static generation with ISR fallback for new posts
 * - Optimized generateStaticParams: only generate recent posts at build time
 * - Server-side caching for post data
 */

// Cache individual post for 24 hours (ISR)
export const revalidate = 86400;

// Enable incremental static regeneration for new posts
export const dynamicParams = true;
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  const langs = ["en", "pt"];

  // Optimization: Only generate top 20 recent posts at build time
  // New posts will be generated on-demand (ISR)
  const recentSlugs = slugs.slice(0, 20);

  return recentSlugs.flatMap((slug) => langs.map((lang) => ({ slug, lang })));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, lang } = await params;
  const post = getPostBySlug(slug);
  const t = blogContent[lang].blog;

  if (!post) {
    notFound();
  }

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === "pt" ? "pt-BR" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="flex-1 w-full lg:max-w-4xl">
            {/* Back Link with enhanced hover */}
            <Link
              href={`/${lang}/blog`}
              className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-accent hover:gap-3 mb-6 sm:mb-8"
              aria-label={`${t.back} - ${t.title}`}
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-x-1"
                aria-hidden="true"
              />
              <span className="relative">
                {t.back}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full" />
              </span>
            </Link>

            {/* Share Buttons - Mobile Only */}
            <div className="lg:hidden mb-6 sm:mb-8">
              <ShareButtons
                title={post.title}
                url={`${process.env.NEXT_PUBLIC_SITE_URL || ""}/${lang}/blog/${post.slug}`}
                description={post.excerpt}
              />
            </div>

            {/* Post Header with visual enhancements */}
            <header className="mb-6 sm:mb-8 lg:mb-12 relative">
              {/* Accent line decoration - hidden on mobile */}
              <div className="hidden sm:block absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent to-transparent rounded-full" />

              <H1 className="mb-3 sm:mb-4">{post.title}</H1>

              {/* Meta Information with icons and hover effects */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-mono text-muted-foreground border-b border-border pb-3 sm:pb-4">
                <div className="group/meta flex items-center gap-1.5 sm:gap-2 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-accent">
                  <Calendar
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/meta:scale-110"
                    aria-hidden="true"
                  />
                  <time dateTime={post.date}>{formattedDate}</time>
                </div>
              </div>

              {/* Tags with stagger animation */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                  {post.tags.map((tag, index) => (
                    <Badge
                      key={tag}
                      className="text-xs transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent hover:bg-accent/10 hover:text-accent hover:scale-105"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </header>

            {/* Table of Contents - Mobile Only */}
            <div className="lg:hidden mb-6 sm:mb-8 p-4 rounded-lg border border-border bg-muted/30">
              <TableOfContents headings={post.headings || []} />
            </div>

            {/* Post Content with reading enhancements */}
            <article className="prose prose-sm sm:prose-base max-w-none">
              <MDXRemote
                source={post.content}
                options={{
                  mdxOptions: {
                    rehypePlugins: [[rehypeHighlight, { detect: true }]],
                  },
                }}
                components={MDX_COMPONENTS}
              />
            </article>

            {/* Footer with enhanced back link */}
            <footer className="mt-16 sm:mt-20 lg:mt-24 pt-6 sm:pt-8 border-t border-border">
              <Link
                href={`/${lang}/blog`}
                className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-accent hover:gap-3"
                aria-label={`${t.back} - ${t.title}`}
              >
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                <span className="relative">
                  {t.back}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full" />
                </span>
              </Link>
            </footer>
          </div>

          {/* Sidebar with TOC and Share Buttons - Desktop Only */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <TableOfContents headings={post.headings || []} />
              <ShareButtons
                title={post.title}
                url={`${process.env.NEXT_PUBLIC_SITE_URL || ""}/${lang}/blog/${post.slug}`}
                description={post.excerpt}
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
