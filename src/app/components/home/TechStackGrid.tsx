import { memo } from "react";

interface TechStackItem {
  name: string;
  category: string;
}

interface TechStackGridProps {
  items: TechStackItem[];
  title?: string;
}

const TechBadge = memo(({ name, category }: TechStackItem) => (
  <div className="group relative rounded-lg border border-border bg-card p-3 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:shadow-sm hover:-translate-y-0.5">
    <div className="font-mono text-xs text-muted-foreground mb-1">
      {category}
    </div>
    <div className="font-semibold text-sm text-foreground">{name}</div>
  </div>
));

TechBadge.displayName = "TechBadge";

export const TechStackGrid = memo(({ items, title }: TechStackGridProps) => {
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((item, index) => (
          <TechBadge key={`${item.name}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
});

TechStackGrid.displayName = "TechStackGrid";
