import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  HatchSeparator,
  SectionBadge,
  SectionLabel,
} from "@/components/blueprint";
import { getAllPosts, getAllTags } from "@/lib/blog-data";
import {
  DEFAULT_LANGUAGE,
  getTranslations,
  isLanguage,
  langStaticParams,
  SUPPORTED_LOCALES,
} from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

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
  return langStaticParams();
}

function blogAlternates(currentLang: string) {
  const languages: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    languages[locale] = `${siteConfig.url}/${locale}/blog`;
  }
  languages["x-default"] = `${siteConfig.url}/${DEFAULT_LANGUAGE}/blog`;
  return {
    canonical: `${siteConfig.url}/${currentLang}/blog`,
    languages,
  };
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { lang } = await params;
  const validLang = isLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const t = getTranslations(validLang).blog;

  return {
    title: t.title,
    description: t.subtitle,
    openGraph: {
      type: "website",
      locale: validLang === "pt" ? "pt_BR" : "en_US",
      url: `${siteConfig.url}/${validLang}/blog`,
      siteName: siteConfig.name,
      title: `${t.title} | ${siteConfig.name}`,
      description: t.subtitle,
    },
    twitter: {
      card: "summary_large_image",
      title: `${t.title} | ${siteConfig.name}`,
      description: t.subtitle,
      creator: siteConfig.social.xHandle,
    },
    alternates: blogAlternates(validLang),
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const validLang = isLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const t = getTranslations(validLang).blog;
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  // TODO(refactor)[P1]: magic number 8
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
            <SectionLabel>{t.badge}</SectionLabel>
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
              {t.publishedCount}
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
