"use client";

import { memo, useCallback, useMemo } from "react";
import { MonoText } from "@/components/ui";
import { useLanguage } from "@/lib/LanguageContext";
import { cn } from "@/lib/utils";

interface FilterTagsProps {
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
  allTags: string[];
  tagCounts: Map<string, number>;
}

/**
 * FilterTags component
 *
 * Design principles (AGENTS.md):
 * - 4px grid spacing (gap-2 = 8px, gap-3 = 12px, px-3 py-1)
 * - Borders-only approach with subtle hover effects
 * - Typography: MonoText for status, Label for buttons
 * - Animation: 150ms with cubic-bezier easing
 * - Isolated controls: buttons feel like crafted objects
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Uses cn() for className merging (Vercel: bundle-barrel-imports)
 * - Clear active/inactive states
 * - Vercel: rerender-dependencies - toggleTag uses only selectedTagsSet (primitive dependency)
 */
export const FilterTags = memo(
  ({ selectedTags, onTagChange, allTags, tagCounts }: FilterTagsProps) => {
    const { t } = useLanguage();
    const filterLabels = t.projects.filters;
    const selectedTagsSet = useMemo(
      () => new Set(selectedTags),
      [selectedTags],
    );

    const toggleTag = useCallback(
      (tag: string) => {
        const newTags = Array.from(selectedTagsSet);
        if (selectedTagsSet.has(tag)) {
          const index = newTags.indexOf(tag);
          if (index > -1) {
            newTags.splice(index, 1);
          }
          onTagChange(newTags);
        } else {
          newTags.push(tag);
          onTagChange(newTags);
        }
      },
      [selectedTagsSet, onTagChange],
    );

    const clearAll = useCallback(() => {
      onTagChange([]);
    }, [onTagChange]);

    return (
      <div className="space-y-3">
        {/* Status Bar */}
        <div className="flex items-center justify-between">
          <MonoText className="text-muted-foreground">
            {selectedTags.length > 0
              ? filterLabels.active(selectedTags.length)
              : filterLabels.empty}
          </MonoText>
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-mono text-muted-foreground transition-[color,opacity] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground active:opacity-70 touch-manipulation min-h-[36px] px-2"
            >
              {filterLabels.clear}
            </button>
          )}
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 sm:gap-2 touch-spacing">
          {allTags.map((tag) => {
            const isSelected = selectedTagsSet.has(tag);
            const count = tagCounts.get(tag) ?? 0;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  "rounded border px-4 py-2.5 sm:px-3 sm:py-2 font-mono text-xs transition-[transform,border-color,background-color,color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none touch-manipulation min-h-[44px] sm:min-h-[40px]",
                  isSelected
                    ? "border-foreground bg-foreground text-background active:scale-95"
                    : "border-border bg-muted text-muted-foreground hover:border-foreground hover:bg-muted/60 hover:text-foreground active:scale-95 active:bg-muted/80",
                )}
              >
                {tag} <MonoText className="opacity-60">({count})</MonoText>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

FilterTags.displayName = "FilterTags";
