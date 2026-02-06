import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BulletListProps {
  items: Array<string | ReactNode>;
  className?: string;
  itemClassName?: string;
}

/**
 * BulletList component - Generic list with animated bullet points
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Bullet points with hover effects
 * - Animation: 150-200ms with cubic-bezier(0.25, 1, 0.5, 1) easing
 * - Mobile-first: optimized for small screens
 *
 * Best practices applied:
 * - Generic component accepting any content
 * - Memoized to prevent re-renders
 * - Accessible with proper semantic HTML
 */
export const BulletList = memo(
  ({ items, className, itemClassName }: BulletListProps) => {
    return (
      <div
        className={cn(
          "text-sm leading-relaxed text-muted-foreground space-y-1.5",
          className,
        )}
      >
        {items.map((item, index) => (
          <div
            key={typeof item === "string" ? item : index}
            className={cn("flex items-start gap-2.5 group/item", itemClassName)}
          >
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-border transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/item:bg-accent group-hover/item:scale-125" />
            <span className="flex-1 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/item:text-foreground">
              {typeof item === "string" && item.trim() && !item.endsWith(".")
                ? `${item}.`
                : item}
            </span>
          </div>
        ))}
      </div>
    );
  },
);

BulletList.displayName = "BulletList";
