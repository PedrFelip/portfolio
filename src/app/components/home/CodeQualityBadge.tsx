import { memo } from "react";
import { MonoText } from "@/components/ui";

interface CodeQualityBadgeProps {
  label: string;
  percentage?: number;
  status?: "success" | "warning" | "neutral";
}

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
 * - Accessible with proper color contrast
 * - Subtle visual presence (doesn't distract)
 */
export const CodeQualityBadge = memo(
  ({ label, percentage, status = "success" }: CodeQualityBadgeProps) => {
    const getStatusColor = () => {
      switch (status) {
        case "success":
          return "var(--status-success)";
        case "warning":
          return "var(--status-warning)";
        case "neutral":
          return "var(--status-neutral)";
        default:
          return "var(--status-success)";
      }
    };

    return (
      <div className="flex items-center gap-2 animate-in-up animate-delay-600">
        {/* Status Dot */}
        <span
          className="h-1.5 w-1.5 rounded-full transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ backgroundColor: getStatusColor() }}
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
