"use client";

import { useCallback, useState } from "react";
import { TimelinePost } from "@/components/blog/TimelinePost";
import { P } from "@/components/ui";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
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

/**
 * BlogList component - Timeline Editorial Layout
 *
 * Design principles (AGENTS.md):
 * - Timeline layout with vertical indicator and connecting lines
 * - 4px grid: consistent spacing throughout
 * - Pagination with accessible buttons
 * - Mobile-first: responsive layout
 * - Borders-only approach: subtle design
 *
 * Best practices applied:
 * - Client component for pagination interactivity
 * - Smooth scroll behavior on page changes
 * - Accessible pagination controls
 * - Clean component composition
 */
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

  const handlePrevPage = useCallback(() => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasPrevPage]);

  const handleNextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasNextPage]);

  if (allPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
        <P className="font-medium mb-2 text-sm sm:text-base">
          {translations.noPosts}
        </P>
        <P className="text-muted-foreground text-sm sm:text-base">
          {translations.noPostsDesc}
        </P>
      </div>
    );
  }

  return (
    <>
      {/* Timeline Container */}
      <div className="w-full max-w-3xl">
        {currentPosts.map((post, index) => (
          <TimelinePost
            key={post.slug}
            post={post}
            isLast={index === currentPosts.length - 1 && !hasNextPage}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-border w-full max-w-3xl">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={!hasPrevPage}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-medium text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-card"
            aria-label={translations.previous}
          >
            <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{translations.previous}</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <span className="text-xs sm:text-sm text-muted-foreground px-2 font-mono">
            {translations.page}{" "}
            <span className="font-semibold text-foreground">{currentPage}</span>{" "}
            <span className="text-muted-foreground/60">/</span>{" "}
            <span className="font-medium">{totalPages}</span>
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-medium text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-card"
            aria-label={translations.next}
          >
            <span className="hidden sm:inline">{translations.next}</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      )}
    </>
  );
}
