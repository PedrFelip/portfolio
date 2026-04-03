import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { Callout } from "@/components/mdx/Callout";
import { CodeBlockWrapper } from "@/components/mdx/CodeBlockWrapper";
import { Figure } from "@/components/mdx/Figure";
import { createHeadingComponents } from "@/components/mdx/MDXHeading";
import {
  MDXTable,
  MDXTableBody,
  MDXTableCell,
  MDXTableHead,
  MDXTableRow,
} from "@/components/mdx/MDXTable";
import { Badge } from "@/components/ui";
import { ArrowLeft, Calendar, Clock } from "@/components/ui/icons";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog-data";
import { blogEn } from "@/lib/content/blog.en";
import { blogPt } from "@/lib/content/blog.pt";

const blogContent = {
  en: blogEn,
  pt: blogPt,
};

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    lang: "en" | "pt";
  }>;
}

const PreComponent = ({ children }: { children: React.ReactNode }) => (
  <CodeBlockWrapper>{children}</CodeBlockWrapper>
);

const CodeComponent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  if (className?.startsWith("hljs")) {
    return <code className={className}>{children}</code>;
  }
  return (
    <code className="font-mono text-[13px] bg-[oklch(0.12_0.008_270)] px-1.5 py-0.5 rounded-sm text-foreground">
      {children}
    </code>
  );
};

const TableCellHeader = ({ children }: { children: React.ReactNode }) => (
  <MDXTableCell isHeader>{children}</MDXTableCell>
);

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <MDXTableCell>{children}</MDXTableCell>
);

export const revalidate = 604800;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.vercel.app";
  const postUrl = `${baseUrl}/${lang}/blog/${slug}`;

  const config = {
    en: {
      title: `${post.title} | Pedro Felipe`,
      description: post.excerpt,
      siteName: "Pedro Felipe Portfolio",
    },
    pt: {
      title: `${post.title} | Pedro Felipe`,
      description: post.excerpt,
      siteName: "Portfólio Pedro Felipe",
    },
  };

  return {
    title: config[lang].title,
    description: config[lang].description,
    alternates: {
      canonical: postUrl,
      languages: {
        en: `${baseUrl}/en/blog/${slug}`,
        pt: `${baseUrl}/pt/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: lang === "pt" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt" ? "en_US" : "pt_BR",
      url: postUrl,
      title: config[lang].title,
      description: config[lang].description,
      siteName: config[lang].siteName,
      publishedTime: post.date,
      authors: ["Pedro Felipe"],
    },
    twitter: {
      card: "summary",
      title: config[lang].title,
      description: config[lang].description,
      creator: "@pedrofelipe",
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  const langs = ["en", "pt"];
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

  const headingComponents = createHeadingComponents(post.headings || []);
  const MDX_COMPONENTS = {
    pre: PreComponent,
    code: CodeComponent,
    Callout,
    Figure,
    table: MDXTable,
    thead: MDXTableHead,
    tbody: MDXTableBody,
    tr: MDXTableRow,
    th: TableCellHeader,
    td: TableCell,
    ...headingComponents,
  };

  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === "pt" ? "pt-BR" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/${lang}/blog/${post.slug}`;

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
          {/* Back link */}
          <Link
            href={`/${lang}/blog`}
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wide text-muted-foreground transition-colors duration-150 hover:text-foreground mb-8"
            aria-label={`${t.back} - ${t.title}`}
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-1"
              aria-hidden="true"
            />
            {t.back}
          </Link>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-foreground mb-4">
            {post.title}
          </h1>

          {/* Meta row: date, reading time, tags */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <time dateTime={post.date}>{formattedDate}</time>
            </span>

            {post.readingTime && (
              <>
                <span className="text-border" aria-hidden="true">
                  ·
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.readingTime} {t.readingTime}
                </span>
              </>
            )}
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-[11px] font-mono font-normal px-2 py-0.5 border-border/60 text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground italic max-w-2xl">
              {post.excerpt}
            </p>
          )}
        </div>
      </header>

      {/* Content Section */}
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8 lg:gap-12">
          {/* Main Article */}
          <div className="py-10 sm:py-12">
            {/* Mobile TOC */}
            <details className="lg:hidden mb-8 group">
              <summary className="flex items-center justify-between cursor-pointer text-xs font-mono uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors py-3 border-b border-border">
                <span>{t.onThisPage || "On this page"}</span>
                <span className="text-[10px] transition-transform group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="pt-4 pb-2">
                <TableOfContents headings={post.headings || []} />
              </div>
            </details>

            {/* Article Content */}
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

            {/* Footer */}
            <footer className="mt-12 pt-6 border-t border-border">
              {/* Mobile Share */}
              <div className="lg:hidden mb-6">
                <ShareButtons
                  title={post.title}
                  url={postUrl}
                  description={post.excerpt}
                />
              </div>

              <Link
                href={`/${lang}/blog`}
                className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground transition-colors duration-150 hover:text-foreground"
                aria-label={`${t.back} - ${t.title}`}
              >
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-150 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                {t.back}
              </Link>
            </footer>
          </div>

          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 py-10 sm:py-12 space-y-8">
              <TableOfContents headings={post.headings || []} />
              <ShareButtons
                title={post.title}
                url={postUrl}
                description={post.excerpt}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
