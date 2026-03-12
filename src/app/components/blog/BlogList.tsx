"use client";

import { useCallback, useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
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
      <div className="flex flex-col gap-3">
        {currentPosts.map((post, i) => (
          <BlogCard key={post.slug} post={post} index={i} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 pt-6 md:pt-8 border-t border-border">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={!hasPrevPage}
            className="terminal-glow w-full md:w-auto inline-flex items-center justify-center gap-2 rounded border border-border bg-card px-4 py-2 text-xs font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-40 transition-colors duration-150 hover:border-foreground/30"
            aria-label={translations.previous}
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>{translations.previous}</span>
          </button>

          <MonoText className="text-xs text-muted-foreground tabular-nums px-2">
            {translations.page}{" "}
            <span className="text-foreground">{currentPage}</span>
            <span className="text-muted-foreground/60"> / </span>
            <span>{totalPages}</span>
          </MonoText>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={!hasNextPage}
            className="terminal-glow w-full md:w-auto inline-flex items-center justify-center gap-2 rounded border border-border bg-card px-4 py-2 text-xs font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-40 transition-colors duration-150 hover:border-foreground/30"
            aria-label={translations.next}
          >
            <span>{translations.next}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </>
  );
}
