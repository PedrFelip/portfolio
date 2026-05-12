import { memo } from "react";
import { cn } from "@/lib/utils";

interface HatchSeparatorProps {
  /** Height of the separator band (default: 2rem) */
  height?: string;
  /** Additional class names */
  className?: string;
}

/**
 * HatchSeparator - Diagonal hatched line separator between panels
 *
 * Blueprint-inspired architectural detail inspired by chanhdai.com.
 * Creates a full-viewport-width band of diagonal lines that visually
 * separates panels in a continuous bordered column.
 *
 * Uses CSS `bp-hatch` class for the full-viewport hatch pattern
 * via `::before` pseudo-element.
 *
 * @example
 * ```tsx
 * <HatchSeparator />
 * <HatchSeparator height="1.5rem" />
 * ```
 */
export const HatchSeparator = memo(function HatchSeparator({
  height = "2rem",
  className,
}: HatchSeparatorProps) {
  return (
    <div
      className={cn("bp-hatch", className)}
      style={{ height }}
      aria-hidden="true"
    />
  );
});

HatchSeparator.displayName = "HatchSeparator";
