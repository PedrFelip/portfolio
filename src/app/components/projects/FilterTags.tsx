"use client";

interface FilterTagsProps {
  selectedTags: string[];
  onTagChange: (tags: string[]) => void;
  allTags: string[];
}

export function FilterTags({
  selectedTags,
  onTagChange,
  allTags,
}: FilterTagsProps) {
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
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm font-mono text-muted-foreground">
          {selectedTags.length > 0
            ? `${selectedTags.length} filter${selectedTags.length > 1 ? "s" : ""} active`
            : "Filter by technology"}
        </p>
        {selectedTags.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-mono text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`rounded border px-2.5 py-1 font-mono text-xs transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isSelected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-muted text-muted-foreground hover:border-foreground hover:bg-muted/80"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
