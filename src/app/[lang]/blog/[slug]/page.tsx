import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import dynamic from "next/dynamic";
import { IBM_Plex_Serif } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "@fontsource/ia-writer-mono/latin-400.css";
import "@fontsource/ia-writer-mono/latin-400-italic.css";
import "@fontsource/ia-writer-mono/latin-700.css";
import "@fontsource/ia-writer-mono/latin-700-italic.css";
import { ScrollToTop } from "@/components/blog/ScrollToTop";
import { ZenFloatingControls } from "@/components/blog/ZenFloatingControls";
import { PageLoadingSkeleton } from "@/components/layout/PageLoadingSkeleton";
import { ScrollToPageTop } from "@/components/layout/ScrollToPageTop";
import { MarkdownContent } from "@/components/mdx/MarkdownContent";
import { Badge } from "@/components/ui";
import { ArrowLeft, Calendar, ChevronDown, Clock } from "@/components/ui/icons";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog-data";
import {
  DEFAULT_LANGUAGE,
  getTranslations,
  isLanguage,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import {
  blogBreadcrumbSchema,
  blogPostingSchema,
  JsonLdScript,
} from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

const ShareButtons = dynamic(
  () =>
    import("@/components/blog/ShareButtons").then((mod) => mod.ShareButtons),
  {
    loading: () => (
      <div className="h-10 w-44 border border-overlay-border bg-surface-2" />
    ),
  },
);

const TableOfContents = dynamic(
  () =>
    import("@/components/blog/TableOfContents").then(
      (mod) => mod.TableOfContents,
    ),
  {
    loading: () => (
      <div className="h-24 border border-overlay-border bg-surface-2" />
    ),
  },
);

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    lang: "en" | "pt";
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  // Posts are monolingual (Portuguese). The canonical source of truth is
  // always /pt/blog/<slug> so both /en/blog/<slug> and /pt/blog/<slug>
  // consolidate to a single URL, avoiding duplicate-content signals.
  const canonicalUrl = `${siteConfig.url}/pt/blog/${slug}`;

  const t = getTranslations(isLanguage(lang) ? lang : DEFAULT_LANGUAGE).blog;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        pt: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      alternateLocale: ["en_US"],
      url: canonicalUrl,
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      siteName: t.siteName,
      publishedTime: post.date,
      modifiedTime: post.modifiedDate,
      authors: [siteConfig.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      creator: siteConfig.social.xHandle,
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.flatMap((slug) =>
    SUPPORTED_LOCALES.map((lang) => ({ slug, lang })),
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <>
      <ScrollToPageTop />
      <Suspense fallback={<PageLoadingSkeleton />}>
        <BlogPostPageContent params={params} />
      </Suspense>
    </>
  );
}

async function BlogPostPageContent({ params }: BlogPostPageProps) {
  "use cache";
  cacheLife("weeks");

  const { slug, lang } = await params;
  const validLang = isLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const post = getPostBySlug(slug);
  const t = getTranslations(validLang).blog;

  if (!post) {
    notFound();
  }

  const headings = post.headings ?? [];
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;

  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === "pt" ? "pt-BR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const postUrl = `${siteConfig.url}/pt/blog/${post.slug}`;

  return (
    <>
      <ScrollToTop />
      <ZenFloatingControls />
      <div
        className={`${ibmPlexSerif.variable} pb-[calc(6rem+env(safe-area-inset-bottom,0px))] md:pb-0`}
      >
        <JsonLdScript
          data={[
            blogPostingSchema({
              title: post.title,
              description: post.excerpt,
              slug: post.slug,
              date: post.date,
              modifiedDate: post.modifiedDate,
              tags: post.tags,
              wordCount,
              readingTime: post.readingTime,
            }),
            blogBreadcrumbSchema({ slug: post.slug, title: post.title }),
          ]}
        />
        {/* Header Section */}
        <header className="blog-post-container">
          <div className="blog-post-content border-b py-10 sm:py-12 lg:py-16">
            <div className="min-w-0">
              {/* Title */}
              <h1 className="max-w-full pr-1 text-3xl sm:text-4xl lg:text-5xl [overflow-wrap:anywhere] text-balance font-semibold tracking-[-0.03em] leading-[1.2] pb-1 mb-6 animate-in-up [font-family:var(--font-ibm-plex-serif)] bg-gradient-to-br from-foreground to-accent bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [box-decoration-break:clone]">
                {post.title}
              </h1>

              {/* Meta row: date, reading time, tags */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3 text-xs font-mono text-muted-foreground animate-in-up animate-delay-100">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="size-3.5" aria-hidden="true" />
                  <time dateTime={post.date}>{formattedDate}</time>
                </span>

                {post.readingTime && (
                  <>
                    <span
                      className="hidden text-accent/40 sm:inline"
                      aria-hidden="true"
                    >
                      ·
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" aria-hidden="true" />
                      {post.readingTime} {t.readingTime}
                    </span>
                  </>
                )}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 animate-in-up animate-delay-150">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="max-w-full whitespace-normal [overflow-wrap:anywhere] text-[11px] font-mono font-normal px-2 py-0.5 border-border/60 text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Excerpt */}
              {post.excerpt && (
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground italic animate-in-up animate-delay-200">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="blog-post-container">
          <div className="blog-post-content">
            {/* Main Article */}
            <div className="min-w-0 py-8 sm:py-12">
              {/* Mobile TOC */}
              {headings.length > 0 && (
                <details className="2xl:hidden mb-8 group">
                  <summary className="flex items-center justify-between cursor-pointer text-xs font-mono uppercase tracking-wide text-muted-foreground hover:text-accent transition-colors py-3 border-b border-border min-h-[48px] touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                    <span>{t.onThisPage || "On this page"}</span>
                    <ChevronDown
                      className="size-3 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="pt-4 pb-2">
                    <TableOfContents headings={headings} showTitle={false} />
                  </div>
                </details>
              )}

              {/* Article Content */}
              <article
                lang="pt-BR"
                className="blog-article prose min-w-0 max-w-none"
              >
                <MarkdownContent source={post.content} />
              </article>

              {/* Footer */}
              <footer className="mt-12 pt-8 sm:mt-16 border-t border-border flex flex-wrap items-start justify-between gap-6 animate-in-up animate-delay-400">
                <div className="flex flex-col items-start gap-2">
                  <p className="text-sm text-muted-foreground font-mono">
                    {t.thanksForReading}
                  </p>
                  <Link
                    href={`/${validLang}/blog`}
                    className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors min-h-[44px] touch-manipulation"
                  >
                    <ArrowLeft className="size-3 text-muted-foreground group-hover:text-accent group-hover:-translate-x-1.5 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                    {t.back}
                  </Link>
                </div>

                <div className="min-w-0 max-w-full">
                  <ShareButtons
                    title={post.title}
                    url={postUrl}
                    description={post.excerpt}
                  />
                </div>
              </footer>
            </div>

            {/* Sidebar (Desktop) */}
            {headings.length > 0 && (
              <aside className="absolute top-0 bottom-0 left-full ml-8 hidden w-48 pt-12 2xl:block">
                <div className="sticky top-8 max-h-[calc(100dvh-4rem)] overflow-y-auto">
                  <TableOfContents headings={headings} />
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
