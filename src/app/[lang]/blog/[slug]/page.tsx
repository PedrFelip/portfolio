import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import { ScrollToTop } from "@/components/blog/ScrollToTop";
import { ZenFloatingControls } from "@/components/blog/ZenFloatingControls";
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
    <code className="bg-[var(--code-bg)] text-[color:var(--code-fg)] px-1.5 py-0.5 rounded-sm">
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
    <main className="min-h-screen animate-in-fade animate-duration-700 pb-24 md:pb-0">
      <ScrollToTop />
      <ZenFloatingControls />

      {/* Header Section */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-24">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-foreground mb-6 animate-in-up">
            {post.title}
          </h1>

          {/* Meta row: date, reading time, tags */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-muted-foreground animate-in-up animate-delay-100">
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
            <div className="flex flex-wrap gap-2 mt-6 animate-in-up animate-delay-150">
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
            <p className="mt-8 text-lg sm:text-xl leading-relaxed text-muted-foreground italic max-w-2xl animate-in-up animate-delay-200">
              {post.excerpt}
            </p>
          )}
        </div>
      </header>

      {/* Content Section */}
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8 lg:gap-12">
          {/* Main Article */}
          <div className="py-10 sm:py-16 animate-in-up animate-delay-300">
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
            <article className="prose max-w-none">
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
            <footer className="mt-20 pt-12 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-8 animate-in-up animate-delay-400">
              <div className="flex flex-col items-center sm:items-start gap-3">
                <p className="text-sm text-muted-foreground font-mono">
                  {lang === "pt" ? "Obrigado por ler!" : "Thanks for reading!"}
                </p>
                <Link
                  href={`/${lang}/blog`}
                  className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                  {t.back}
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <ShareButtons
                  title={post.title}
                  url={postUrl}
                  description={post.excerpt}
                />
              </div>
            </footer>
          </div>

          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block animate-in-right animate-delay-500">
            <div className="sticky top-24 py-16 space-y-12">
              <TableOfContents headings={post.headings || []} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
