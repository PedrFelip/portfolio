import { BlogList } from "@/components/blog/BlogList";
import { SectionHeader } from "@/components/common/SectionHeader";
import { getAllPosts } from "@/lib/blog-data";
import { blogEn } from "@/lib/content/blog.en";
import { blogPt } from "@/lib/content/blog.pt";

const blogContent = {
  en: blogEn,
  pt: blogPt,
};

interface BlogPageProps {
  params: Promise<{
    lang: "en" | "pt";
  }>;
}

/**
 * BlogPage component - Timeline Editorial Layout
 *
 * Design principles (AGENTS.md):
 * - Timeline layout for technical blog posts
 * - Vertical timeline with indicator dots
 * - Single column layout optimized for reading
 * - 4px grid: consistent spacing throughout
 * - Borders-only depth strategy
 * - Mobile-first: responsive timeline
 *
 * Vercel best practices:
 * - Server component for data fetching
 * - Efficient pagination with BlogList
 * - ISR (Incremental Static Regeneration): revalidate every 1 hour
 */

// Cache blog list for 1 hour (ISR)
export const revalidate = 3600;
export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const t = blogContent[lang].blog;
  const allPosts = getAllPosts();
  const postsPerPage = 8;

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionHeader
            badge={t.badge}
            badgeVariant="blog"
            title={t.title}
            description={t.subtitle}
          />
        </div>

        <BlogList
          initialPosts={allPosts.slice(0, postsPerPage)}
          allPosts={allPosts}
          postsPerPage={postsPerPage}
          translations={{
            noPosts: t.noPosts,
            noPostsDesc: t.noPostsDesc,
            page: t.page,
            of: t.of,
            previous: t.previous,
            next: t.next,
          }}
        />
      </div>
    </section>
  );
}
