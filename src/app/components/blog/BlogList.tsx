"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { FlickerOverlay } from "@/components/common/FlickerOverlay";
import { MonoText, P } from "@/components/ui";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { useFlickerTransition } from "@/hooks/useFlickerTransition";
import { flickerContentVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { BlogMetadata } from "@/types/portfolio";
import { BlogCard } from "./BlogCard";

interface BlogListProps {
  initialPosts: BlogMetadata[];
  allPosts: BlogMetadata[];
  allTags: string[];
  postsPerPage: number;
  translations: {
    noPosts: string;
    noPostsDesc: string;
    page: string;
    of: string;
    previous: string;
    next: string;
    allTags: string;
  };
}

export function BlogList({
  allPosts,
  allTags,
  postsPerPage,
  translations: t,
}: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const { flickerPhase, contentVisible, trigger } = useFlickerTransition();
  const listRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  const filteredPosts = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const captureHeight = useCallback(() => {
    if (listRef.current) {
      setMinHeight(listRef.current.offsetHeight);
    }
  }, []);

  const handlePrevPage = useCallback(() => {
    if (hasPrevPage) {
      captureHeight();
      trigger(() => setCurrentPage((prev) => prev - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasPrevPage, trigger, captureHeight]);

  const handleNextPage = useCallback(() => {
    if (hasNextPage) {
      captureHeight();
      trigger(() => setCurrentPage((prev) => prev + 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasNextPage, trigger, captureHeight]);

  const handleTagClick = useCallback(
    (tag: string | null) => {
      captureHeight();
      trigger(() => {
        setActiveTag(tag);
        setCurrentPage(1);
      });
    },
    [trigger, captureHeight],
  );

  const handleListRef = useCallback(
    (node: HTMLDivElement | null) => {
      listRef.current = node;
      if (node && contentVisible) {
        setMinHeight(undefined);
      }
    },
    [contentVisible],
  );

  if (allPosts.length === 0) {
    return (
      <div className="rail-bounded border border-border">
        <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center px-6">
          <P className="font-medium mb-2 text-sm md:text-base">{t.noPosts}</P>
          <P className="text-muted-foreground text-sm md:text-base">
            {t.noPostsDesc}
          </P>
        </div>
      </div>
    );
  }

  const listKey = `${activeTag ?? "all"}-${currentPage}`;

  return (
    <div className="rail-bounded border border-border">
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr]">
        <div className="hidden lg:block border-r border-dashed border-border">
          <div className="lg:sticky lg:top-24 py-8 pl-4 pr-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
              {t.allTags}
            </p>
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={() => handleTagClick(null)}
                className={cn(
                  "text-left text-sm px-2 py-1.5 rounded transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  !activeTag
                    ? "text-accent bg-accent/5 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-2",
                )}
              >
                All ({allPosts.length})
              </button>
              {allTags.map((tag) => {
                const count = allPosts.filter((p) =>
                  p.tags.includes(tag),
                ).length;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={cn(
                      "text-left text-sm px-2 py-1.5 rounded transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      activeTag === tag
                        ? "text-accent bg-accent/5 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-surface-2",
                    )}
                  >
                    <span className="font-mono text-xs">{tag}</span>
                    <span className="text-muted-foreground/50 text-xs ml-1">
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:hidden px-6 pt-6 pb-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleTagClick(null)}
            className={cn(
              "text-xs px-2 py-1 rounded border transition-colors duration-150",
              !activeTag
                ? "border-accent/40 text-accent bg-accent/5"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={cn(
                "text-xs px-2 py-1 rounded border transition-colors duration-150 font-mono",
                activeTag === tag
                  ? "border-accent/40 text-accent bg-accent/5"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="relative" style={minHeight ? { minHeight } : undefined}>
          <FlickerOverlay phase={flickerPhase} />
          <div className="relative z-0">
            <AnimatePresence mode="wait">
              {contentVisible && currentPosts.length > 0 ? (
                <motion.div
                  key={listKey}
                  ref={handleListRef}
                  variants={flickerContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {currentPosts.map((post, i) => (
                    <div
                      key={post.slug}
                      className={cn(
                        "group transition-colors duration-150 hover:bg-surface-2",
                        i > 0 && "border-t border-dashed border-border",
                      )}
                    >
                      <BlogCard post={post} />
                    </div>
                  ))}
                </motion.div>
              ) : contentVisible ? (
                <motion.div
                  key={`${listKey}-empty`}
                  ref={handleListRef}
                  variants={flickerContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="px-6 py-12 text-center text-muted-foreground text-sm"
                >
                  {t.noPosts}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  variants={flickerContentVariants}
                  initial="animate"
                  animate="animate"
                  exit="exit"
                  className="invisible"
                  aria-hidden="true"
                >
                  <div style={minHeight ? { minHeight } : undefined} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 px-6 py-8 border-t border-dashed border-border">
              <button
                type="button"
                onClick={handlePrevPage}
                disabled={!hasPrevPage}
                className="terminal-glow inline-flex items-center gap-2 rounded border border-border bg-card px-4 py-2 text-xs font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-40 transition-colors duration-150 hover:border-foreground/30"
                aria-label={t.previous}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>{t.previous}</span>
              </button>

              <MonoText className="text-xs text-muted-foreground tabular-nums px-2">
                {t.page} <span className="text-foreground">{currentPage}</span>
                <span className="text-muted-foreground/60"> / </span>
                <span>{totalPages}</span>
              </MonoText>

              <button
                type="button"
                onClick={handleNextPage}
                disabled={!hasNextPage}
                className="terminal-glow inline-flex items-center gap-2 rounded border border-border bg-card px-4 py-2 text-xs font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-40 transition-colors duration-150 hover:border-foreground/30"
                aria-label={t.next}
              >
                <span>{t.next}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
