"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import type { BlogMetadata } from "@/types/portfolio";

interface BlogListProps {
  initialPosts: BlogMetadata[];
  allPosts: BlogMetadata[];
  postsPerPage: number;
  translations: {
    noPosts: string;
    noPostsDesc: string;
    page: string;
    of: string;
    previous: string;
    next: string;
  };
}

export function BlogList({
  allPosts,
  postsPerPage,
  translations,
}: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const handlePrevPage = () => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (allPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-foreground mb-2">
          {translations.noPosts}
        </p>
        <p className="text-sm text-muted-foreground">
          {translations.noPostsDesc}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {currentPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-border">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={!hasPrevPage}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-card"
          >
            <ChevronLeft className="h-4 w-4" />
            {translations.previous}
          </button>

          <span className="text-sm text-muted-foreground">
            {translations.page} {currentPage} {translations.of} {totalPages}
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-card"
          >
            {translations.next}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </>
  );
}
