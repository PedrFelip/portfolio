import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CommitLogItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * CommitLogItem component - Generic wrapper for commit log style entries
 *
 * Design principles (AGENTS.md):
 * - Commit Log List approach (no vertical timeline connecting lines)
 * - 4px grid: consistent spacing (p-4 = 16px padding)
 * - Borders-only approach: subtle border with glow on hover
 * - Terminal glow effect: border-accent/50 + bg-accent/5 + shadow on hover
 * - 150ms animations with cubic-bezier(0.25, 1, 0.5, 1) easing
 * - No lift/scale transformations (unlike hover-lift-subtle)
 *
 * Best practices applied:
 * - Generic wrapper for work experience, education, blog posts
 * - Consistent surface treatment with rounded-lg border
 * - Clean component composition
 * - Memoized consumers should handle their own memoization
 */
export const CommitLogItem = ({ children, className }: CommitLogItemProps) => {
  return (
    <div className={cn("commit-log-item group", className)}>{children}</div>
  );
};
