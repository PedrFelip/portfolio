import { memo } from "react";
import { MonoText } from "@/components/ui";

interface CodeQualityBadgeProps {
  label: string;
  percentage?: number;
  status?: "success" | "warning" | "neutral";
}

// ✅ Hoisted lookup table for status colors (Vercel: js-cache-function-results)
// Avoids function recreation on every render and provides O(1) lookup
const STATUS_COLORS = {
  success: "var(--status-success)",
  warning: "var(--status-warning)",
  neutral: "var(--status-neutral)",
} as const;

/**
 * CodeQualityBadge component
 *
 * Displays a subtle quality indicator badge with:
 * - Status dot (colored based on status prop)
 * - Label text (monospace for technical feel)
 * - Optional percentage value
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing
 * - Monospace for data/technical elements
 * - Color for meaning only (status)
 * - Minimal borders-only depth
 * - 150-250ms animations
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Status color lookup is cached at module level (Vercel: js-cache-function-results)
 * - Accessible with proper color contrast
 * - Subtle visual presence (doesn't distract)
 */
export const CodeQualityBadge = memo(
  ({ label, percentage, status = "success" }: CodeQualityBadgeProps) => {
    const statusColor = STATUS_COLORS[status] ?? STATUS_COLORS.success;

    return (
      <div className="flex items-center gap-2 animate-in-up animate-delay-600">
        {/* Status Dot */}
        <span
          className="h-1.5 w-1.5 rounded-full transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ backgroundColor: statusColor }}
          aria-hidden="true"
        />

        {/* Label Text */}
        <MonoText className="text-xs sm:text-sm text-muted-foreground">
          {label}
          {percentage !== undefined && ` ${percentage}%`}
        </MonoText>
      </div>
    );
  },
);

CodeQualityBadge.displayName = "CodeQualityBadge";
