import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HatchSeparator, SectionBadge } from "@/components/blueprint";
import { getAllPosts, getAllTags } from "@/lib/blog-data";
import { blogEn } from "@/lib/content/blog.en";
import { blogPt } from "@/lib/content/blog.pt";
import { isLanguage, SUPPORTED_LANGS } from "@/lib/i18n";

const blogContent = {
  en: blogEn,
  pt: blogPt,
};

const BlogListLazy = dynamic(() =>
  import("@/components/blog/BlogList").then((mod) => mod.BlogList),
);

interface BlogPageProps {
  params: Promise<{
    lang: "en" | "pt";
  }>;
}

export const revalidate = 86400;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;
  const validLang = (isLanguage(lang) ? lang : "en") as "en" | "pt";
  const t = blogContent[validLang].blog;

  return {
    title: t.title,
    description: t.subtitle,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const t = blogContent[lang].blog;
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  const postsPerPage = 8;

  return (
    <div className="mx-auto md:max-w-4xl px-4">
      {/* ─── Blog Header Panel ─── */}
      <section
        data-slot="panel"
        className="bp-panel bp-line-top bp-line-bottom"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Info */}
          <SectionBadge className="px-4 py-8 sm:px-6 sm:py-12">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
              {t.badge}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.subtitle}
            </p>
          </SectionBadge>

          {/* Stats */}
          <div className="flex flex-col justify-center border-t border-dashed border-border px-4 py-8 sm:border-t-0 sm:border-l sm:px-6 sm:py-12">
            <span className="text-4xl font-bold tracking-tighter text-foreground tabular-nums font-mono sm:text-5xl">
              {allPosts.length}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 mt-1">
              {lang === "pt" ? "Artigos publicados" : "Published articles"}
            </span>
          </div>
        </div>
      </section>

      {/* ─── Hatch ─── */}
      <HatchSeparator />

      {/* ─── Blog List Panel ─── */}
      <section data-slot="panel" className="bp-panel">
        <BlogListLazy
          initialPosts={allPosts.slice(0, postsPerPage)}
          allPosts={allPosts}
          allTags={allTags}
          postsPerPage={postsPerPage}
          translations={{
            noPosts: t.noPosts,
            noPostsDesc: t.noPostsDesc,
            page: t.page,
            of: t.of,
            previous: t.previous,
            next: t.next,
            allTags: t.allTags,
          }}
        />
      </section>
    </div>
  );
}
