"use client";

import { memo, useCallback, useMemo } from "react";
import { Button, MonoText } from "@/components/ui";
import { useLanguage } from "@/lib/language-store";

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
            <Button variant="ghost" size="filter" onClick={clearAll}>
              {filterLabels.clear}
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isSelected = selectedTagsSet.has(tag);
            const count = tagCounts.get(tag) ?? 0;
            return (
              // TODO(refactor)[P1]: missing aria-pressed on toggle buttons
              <Button
                key={tag}
                variant="filter"
                size="filter"
                data-state={isSelected ? "on" : "off"}
                onClick={() => toggleTag(tag)}
              >
                {tag}
                <MonoText className="ml-1 opacity-40">({count})</MonoText>
              </Button>
            );
          })}
        </div>
      </div>
    );
  },
);

FilterTags.displayName = "FilterTags";
