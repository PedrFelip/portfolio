import { memo } from "react";
import { cn } from "@/lib/utils";
import { DotPattern } from "./DotPattern";

interface FooterGridProps {
  children: React.ReactNode;
  className?: string;
}

interface FooterGridCellProps {
  children: React.ReactNode;
  className?: string;
  showCorners?: boolean;
  showDotPattern?: boolean;
}

/**
 * FooterGrid - Blueprint-inspired grid container for footer
 * Features:
 * - Visible grid lines (architectural blueprint aesthetic)
 * - Responsive grid: 1 col mobile → 2 cols tablet → 4 cols desktop
 * - Structural grid lines that connect cells
 */
export const FooterGrid = memo(function FooterGrid({
  children,
  className,
}: FooterGridProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {/* Vertical grid lines - blueprint style */}
      <div
        className="pointer-events-none absolute inset-0 hidden sm:block"
        aria-hidden="true"
      >
        {/* Line between col 1 and 2 (tablet and desktop) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/40" />
        {/* Lines for desktop 4-col layout */}
        <div className="absolute left-1/4 top-0 bottom-0 hidden w-px bg-border/40 lg:block" />
        <div className="absolute left-3/4 top-0 bottom-0 hidden w-px bg-border/40 lg:block" />
      </div>

      {children}
    </div>
  );
});

FooterGrid.displayName = "FooterGrid";

/**
 * FooterGridCell - Individual cell with corner brackets
 * Features:
 * - Corner bracket decorations (L-shaped technical markers)
 * - Hover state: subtle background + brackets become more visible
 * - Consistent padding following 4px grid
 * - Smooth 200ms transition for refined feel
 */
export const FooterGridCell = memo(function FooterGridCell({
  children,
  className,
  showCorners = true,
  showDotPattern = false,
}: FooterGridCellProps) {
  return (
    <div
      className={cn(
        "group relative px-6 py-12 sm:py-16 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-white/[0.02] overflow-hidden",
        className,
      )}
    >
      {/* Subtle dot pattern background - blueprint aesthetic */}
      {showDotPattern && (
        <DotPattern className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Corner brackets - blueprint architectural detail */}
      {showCorners && (
        <>
          {/* Top-left corner */}
          <div
            className="absolute left-2 top-2 h-3 w-3 border-l border-t border-border/20 transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-border/50"
            aria-hidden="true"
          />
          {/* Top-right corner */}
          <div
            className="absolute right-2 top-2 h-3 w-3 border-r border-t border-border/20 transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-border/50"
            aria-hidden="true"
          />
          {/* Bottom-left corner */}
          <div
            className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-border/20 transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-border/50"
            aria-hidden="true"
          />
          {/* Bottom-right corner */}
          <div
            className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-border/20 transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-border/50"
            aria-hidden="true"
          />
        </>
      )}

      {/* Cell content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
});

FooterGridCell.displayName = "FooterGridCell";
