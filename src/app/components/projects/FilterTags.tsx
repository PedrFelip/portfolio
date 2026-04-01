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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <MonoText className="text-xs text-muted-foreground">
            {selectedTags.length > 0
              ? filterLabels.active(selectedTags.length)
              : filterLabels.empty}
          </MonoText>
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-mono text-muted-foreground/60 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground active:opacity-70 touch-manipulation min-h-[36px] px-2"
            >
              {filterLabels.clear}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedTagsSet.has(tag);
            const count = tagCounts.get(tag) ?? 0;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  "border font-mono text-xs transition-[border-color,background-color,color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none touch-manipulation min-h-[36px] px-3 py-1.5 sm:min-h-[36px] sm:px-3 sm:py-1.5",
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                {tag}
                <MonoText className="ml-1 opacity-40">({count})</MonoText>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

FilterTags.displayName = "FilterTags";
