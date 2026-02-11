import type { ReactNode } from "react";
import { GitCommitVertical } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface CommitLogTimelineItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * CommitLogTimelineItem component - GitHub-style commit list item
 *
 * Design principles (AGENTS.md):
 * - Matches GitHub's commit list layout exactly
 * - Icon aligned with first line of content
 * - 4px grid: consistent spacing throughout
 * - Responsive gap: gap-3 sm:gap-4
 * - Mobile-first: optimized for small screens
 */
export const CommitLogTimelineItem = ({
  children,
  className,
}: CommitLogTimelineItemProps) => {
  return (
    <div
      className={cn(
        "group relative flex gap-3 sm:gap-4 pb-6 sm:pb-8",
        className,
      )}
    >
      {/* GitCommitVertical icon - aligned with first line */}
      <div className="flex-shrink-0 pt-0.5">
        <GitCommitVertical className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]" />
      </div>
      {children}
    </div>
  );
};
