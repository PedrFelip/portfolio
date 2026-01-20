"use client";

import { memo } from "react";
import { MonoText } from "@/components/ui";
import { useLanguage } from "@/lib/LanguageContext";

interface FilterTagsProps {
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
  allTags: string[];
}

/**
 * FilterTags component
 *
 * Design principles (AGENTS.md):
 * - 4px grid spacing (gap-2 = 8px, gap-3 = 12px)
 * - Borders-only approach with subtle hover effects
 * - Typography: MonoText for status, Label for buttons
 * - Animation: 150ms with cubic-bezier easing
 * - Isolated controls: buttons feel like crafted objects
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Consistent with Badge component styling
 * - Clear active/inactive states
 */
export const FilterTags = memo(
  ({ selectedTags, onTagChange, allTags }: FilterTagsProps) => {
    const { t } = useLanguage();
    const filterLabels = t.projects.filters;

    const toggleTag = (tag: string) => {
      if (selectedTags.includes(tag)) {
        onTagChange(selectedTags.filter((t) => t !== tag));
      } else {
        onTagChange([...selectedTags, tag]);
      }
    };

    const clearAll = () => {
      onTagChange([]);
    };

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
              className="text-xs font-mono text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground"
            >
              {filterLabels.clear}
            </button>
          )}
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded border px-2.5 py-1 font-mono text-xs transition-[border-color,background-color,color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none ${
                  isSelected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-muted text-muted-foreground hover:border-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

FilterTags.displayName = "FilterTags";
