import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
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
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog-data";
import { blogContent } from "@/lib/content/blog-content";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    lang: "en" | "pt";
  }>;
}

/**
 * BlogPostPage component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Consistent container: matches Navigation and Section components
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  const langs = ["en", "pt"];

  return slugs.flatMap((slug) => langs.map((lang) => ({ slug, lang })));
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

  const components = {
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
      // Inline code styling
      return (
        <code className="font-mono text-xs sm:text-sm bg-muted px-2 py-1 rounded border border-border text-foreground">
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
    h2: ({ children }: { children: React.ReactNode }) => (
      <H2 className="mb-4 mt-10 border-b border-border pb-2">{children}</H2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <H3 className="mb-3 mt-8">{children}</H3>
    ),
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.back}
        </Link>

        {/* Post Header */}
        <header className="mb-8 sm:mb-12">
          <H1 className="mb-4">{post.title}</H1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground border-b border-border pb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <article className="prose max-w-none">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypeHighlight, { detect: true }]],
              },
            }}
            components={components}
          />
        </article>

        {/* Footer */}
        <footer className="mt-24 pt-12 border-t border-border">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </Link>
        </footer>
      </div>
    </section>
  );
}
