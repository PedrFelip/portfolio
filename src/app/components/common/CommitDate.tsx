import { MonoText } from "@/components/ui";
import { cn } from "@/lib/utils";

interface CommitDateProps {
  start: string;
  end?: string;
  className?: string;
}

/**
 * CommitDate component - Date display with editorial format and monospace font
 *
 * Design principles (AGENTS.md):
 * - Monospace for data: dates, timestamps, IDs
 * - Tabular-nums for alignment
 * - Muted foreground color, accent on hover
 * - Arrow separator (→) for ranges
 * - 150ms animations with cubic-bezier(0.25, 1, 0.5, 1) easing
 *
 * Best practices applied:
 * - Uses existing editorial format from types (no conversion needed)
 * - Memoized consumers should handle their own memoization
 * - Consistent with terminal-modern aesthetic
 * - Color reserved for meaning (accent on hover)
 */
export const CommitDate = ({ start, end, className }: CommitDateProps) => {
  return (
    <MonoText className={cn("commit-date", className)}>
      {start}
      {end && ` → ${end}`}
    </MonoText>
  );
};
