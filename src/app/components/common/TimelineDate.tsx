import type { ReactNode } from "react";
import { MonoText } from "@/components/ui";
import { cn } from "@/lib/utils";

interface TimelineDateProps {
  start: string | ReactNode;
  end: string | ReactNode;
  size?: "xs" | "sm";
  className?: string;
}

const sizeClasses = {
  xs: "text-xs sm:text-xs",
  sm: "text-xs sm:text-sm",
};

/**
 * TimelineDate component - Formatted date display with hover effect
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing
 * - Monospace for dates (tabular-nums)
 * - Hover color change to accent
 * - Animation: 150ms with cubic-bezier(0.25, 1, 0.5, 1) easing
 */
export const TimelineDate = ({
  start,
  end,
  size = "sm",
  className,
}: TimelineDateProps) => {
  return (
    <MonoText
      className={cn(
        "whitespace-nowrap tabular-nums text-muted-foreground/80 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-accent",
        sizeClasses[size],
        className,
      )}
    >
      {start} — {end}
    </MonoText>
  );
};
