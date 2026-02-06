import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TimelineIndicator } from "./TimelineIndicator";

interface TimelineItemProps {
  children: ReactNode;
  isLast?: boolean;
  className?: string;
}

/**
 * TimelineItem component - Main wrapper for timeline entries
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Responsive gap: gap-4 sm:gap-6 lg:gap-8
 * - Bottom padding: pb-8 sm:pb-12, last:pb-0
 * - Mobile-first: optimized for small screens
 *
 * Best practices applied:
 * - Reusable wrapper for all timeline items
 * - Consistent structure across blog, work, education
 * - Uses TimelineIndicator for consistent dot + line
 */
export const TimelineItem = ({
  children,
  isLast = false,
  className,
}: TimelineItemProps) => {
  return (
    <div
      className={cn(
        "group relative flex gap-4 sm:gap-6 lg:gap-8 pb-8 sm:pb-12 last:pb-0",
        className,
      )}
    >
      <TimelineIndicator isLast={isLast} />
      {children}
    </div>
  );
};
