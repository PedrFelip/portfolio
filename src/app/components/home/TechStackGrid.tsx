import { memo } from "react";
import { H3, Label } from "@/components/ui";

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
 * - Uses standard Badge component for consistency
 * - Explicit transitions (no transition: all)
 * - Respects prefers-reduced-motion
 * - 4px grid spacing (p-3 = 12px)
 * - Typography: Label for category, standard font for name
 */
const TechBadge = memo(({ name, category }: TechStackItem) => (
  <div className="group relative flex flex-col gap-1 rounded-md border border-border bg-card p-2 sm:p-3 transition-[border-color,background-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted/50 motion-reduce:transition-none">
    <Label className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground">
      {category}
    </Label>
    <div className="text-xs sm:text-sm font-semibold text-foreground">
      {name}
    </div>
  </div>
));

TechBadge.displayName = "TechBadge";

/**
 * TechStackGrid component
 *
 * Design principles (AGENTS.md):
 * - 4px grid spacing (gap-3 = 12px)
 * - Responsive grid layout
 * - Memoized for performance
 */
export const TechStackGrid = memo(({ items, title }: TechStackGridProps) => {
  return (
    <div className="space-y-4">
      {title && <H3>{title}</H3>}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {items.map((item, index) => (
          <TechBadge key={`${item.name}-${index}`} {...item} />
        ))}
      </div>
    </div>
  );
});

TechStackGrid.displayName = "TechStackGrid";
