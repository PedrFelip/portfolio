import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts } from "@/lib/blog-data";
import { blogContent } from "@/lib/content/blog-content";

interface BlogPageProps {
  params: Promise<{
    lang: "en" | "pt";
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const t = blogContent[lang].blog;
  const allPosts = getAllPosts();
  const postsPerPage = 6;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      {/* Page Header */}
      <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
          {t.title}
        </h1>
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground">
          {t.subtitle}
        </p>
      </div>

      {/* Blog Posts List with Client-Side Pagination */}
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
  );
}
