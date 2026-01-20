import { memo } from "react";
import { H3 } from "@/components/ui";

interface TechStackItem {
  name: string;
  category: string;
}

interface TechStackGridProps {
  items: TechStackItem[];
  title?: string;
}

/**
 * TechBadge component
 *
 * Design principles (AGENTS.md):
 * - Borders-only depth strategy (no shadows)
 * - Explicit transitions (no transition: all)
 * - Respects prefers-reduced-motion
 * - 4px grid spacing (p-3 = 12px)
 */
const TechBadge = memo(({ name, category }: TechStackItem) => (
  <div className="group relative rounded-lg border border-border bg-card p-3 transition-[border-color,background-color] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted/50 motion-reduce:transition-none">
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
      {title && <H3>{title}</H3>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((item, index) => (
          <TechBadge key={`${item.name}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
});

TechStackGrid.displayName = "TechStackGrid";
