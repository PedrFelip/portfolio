import dynamic from "next/dynamic";
import {
  AlignedFlickeringGrid,
  RailLayout,
  SectionDivider,
} from "@/components/blueprint";
import { getAllPosts, getAllTags } from "@/lib/blog-data";
import { blogEn } from "@/lib/content/blog.en";
import { blogPt } from "@/lib/content/blog.pt";

const blogContent = {
  en: blogEn,
  pt: blogPt,
};

const BlogListLazy = dynamic(
  () => import("@/components/blog/BlogList").then((mod) => mod.BlogList),
  {
    loading: () => (
      <div className="rail-bounded border border-border px-6 py-16 text-center text-xs font-mono text-muted-foreground">
        Loading posts...
      </div>
    ),
  },
);

interface BlogPageProps {
  params: Promise<{
    lang: "en" | "pt";
  }>;
}

export const revalidate = 86400;

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const t = blogContent[lang].blog;
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  const postsPerPage = 8;

  return (
    <RailLayout>
      <section className="relative">
        <div className="rail-bounded overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="px-6 py-12 sm:px-8 sm:py-16 animate-in-left">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                {t.badge}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl animate-in-left animate-delay-100">
                {t.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground animate-in-left animate-delay-150">
                {t.subtitle}
              </p>
            </div>

            <div className="flex flex-col justify-center px-6 py-12 border-t border-dashed border-border sm:border-t-0 sm:border-l sm:px-8 sm:py-16 lg:px-10 animate-in-up animate-delay-200">
              <span className="text-5xl font-bold tracking-tighter text-foreground sm:text-6xl tabular-nums font-mono">
                {allPosts.length}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/70 mt-2">
                {lang === "pt" ? "Artigos publicados" : "Published articles"}
              </span>
            </div>

            <div className="relative border-t border-dashed border-border lg:border-t-0 lg:border-l sm:col-span-2 lg:col-span-1 overflow-hidden min-h-[200px] sm:min-h-[240px] lg:min-h-0">
              <AlignedFlickeringGrid
                side="right"
                className="absolute inset-0 h-full w-full !flex"
              />
              <div className="absolute right-2 bottom-2 size-2 border-r border-b border-border/40" />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section>
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
    </RailLayout>
  );
}
