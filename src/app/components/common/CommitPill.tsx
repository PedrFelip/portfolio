import { cn } from "@/lib/utils";

interface CommitPillProps {
  children: string;
  variant?: "default" | "accent";
  className?: string;
}

/**
 * CommitPill component - Monospace badge for tags and status
 *
 * Design principles (AGENTS.md):
 * - Monospace for data: tags, status, labels
 * - Minimal border (0.5px) with subtle hover effect
 * - Accent variant for highlighted tags
 * - No scale transformations on hover (unlike badge-hover)
 * - 150ms animations with cubic-bezier(0.25, 1, 0.5, 1) easing
 *
 * Best practices applied:
 * - Replaces standard Badge component in commit log context
 * - Memoized consumers should handle their own memoization
 * - Consistent with terminal-modern aesthetic
 * - Color reserved for meaning (accent variant)
 */
export const CommitPill = ({
  children,
  variant = "default",
  className,
}: CommitPillProps) => {
  return (
    <span
      className={cn(
        "commit-pill",
        variant === "accent" && "commit-pill--accent",
        className,
      )}
    >
      {children}
    </span>
  );
};
