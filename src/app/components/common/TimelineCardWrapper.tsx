import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TimelineCardWrapperProps {
  children: ReactNode;
  className?: string;
}

/**
 * TimelineCardWrapper component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent padding (p-3 sm:p-4 lg:p-5)
 * - Symmetrical padding with negative margin for timeline extension
 * - Borders-only approach: transparent border on default, visible on hover
 * - Hover effect: border + muted background (no shadow, no translate)
 * - Animation: 200ms with cubic-bezier(0.25, 1, 0.5, 1) easing
 */
export const TimelineCardWrapper = ({
  children,
  className,
}: TimelineCardWrapperProps) => {
  return (
    <div className="flex-1 pt-0 min-w-0">
      <div
        className={cn(
          "relative rounded-lg border border-transparent p-3 sm:p-4 lg:p-5 -ml-3 sm:-ml-4 lg:-ml-5 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-border group-hover:bg-muted/30",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
