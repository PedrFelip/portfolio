"use client";

import { useCallback, useState } from "react";
import { BlogCommitLog } from "@/components/blog/BlogCommitLog";
import { MonoText, P } from "@/components/ui";
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
 * BlogList component - GitHub-style Commit Log List
 *
 * Design principles (AGENTS.md):
 * - Commit Log List approach with git-style vertical timeline
 * - Continuous vertical line through all commits
 * - 4px grid: consistent spacing throughout
 * - Terminal-style pagination with monospace numbers
 * - Mobile-first: responsive layout
 * - Borders-only approach: subtle design
 *
 * Best practices applied:
 * - Client component for pagination interactivity
 * - Smooth scroll behavior on page changes
 * - Accessible pagination controls
 * - Clean component composition
 * - GitCommitVertical icon for GitHub-style commit graph
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
      <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center px-4">
        <P className="font-medium mb-2 text-sm md:text-base">
          {translations.noPosts}
        </P>
        <P className="text-muted-foreground text-sm md:text-base">
          {translations.noPostsDesc}
        </P>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-3xl relative">
        {/* Continuous vertical line through all commits - GitHub style */}
        <div className="absolute left-[10px] top-0 bottom-0 w-px bg-border opacity-80" />

        <div className="space-y-4">
          {currentPosts.map((post) => (
            <BlogCommitLog key={post.slug} post={post} />
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 pt-6 md:pt-8 border-t border-border w-full max-w-3xl">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={!hasPrevPage}
            className="terminal-glow w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-3 md:py-2 text-xs md:text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={translations.previous}
          >
            <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="hidden md:inline">{translations.previous}</span>
            <span className="md:hidden">Prev</span>
          </button>

          <MonoText className="text-xs md:text-sm text-muted-foreground px-2">
            {translations.page}{" "}
            <span className="text-foreground">{currentPage}</span>
            <span className="text-muted-foreground/60">/</span>
            <span>{totalPages}</span>
          </MonoText>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className="terminal-glow w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-3 md:py-2 text-xs md:text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={translations.next}
          >
            <span className="hidden md:inline">{translations.next}</span>
            <span className="md:hidden">Next</span>
            <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </button>
        </div>
      )}
    </>
  );
}
