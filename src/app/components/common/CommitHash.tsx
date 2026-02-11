import { MonoText } from "@/components/ui";
import { cn } from "@/lib/utils";

interface CommitHashProps {
  hash: string;
  className?: string;
}

/**
 * CommitHash component - Git commit hash style identifier
 *
 * Design principles (AGENTS.md):
 * - Monospace for data: hashes, IDs, codes
 * - Tabular-nums for alignment
 * - Accent color for technical identifiers
 * - Opacity 60% → 100% on hover (subtle feedback)
 * - 150ms animations with cubic-bezier(0.25, 1, 0.5, 1) easing
 *
 * Best practices applied:
 * - Uses existing ID from types (no hash generation needed)
 * - Memoized consumers should handle their own memoization
 * - Consistent with terminal-modern aesthetic
 * - Color reserved for meaning (accent for technical IDs)
 */
export const CommitHash = ({ hash, className }: CommitHashProps) => {
  return <MonoText className={cn("commit-hash", className)}>{hash}</MonoText>;
};
