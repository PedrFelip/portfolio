import { memo } from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * DotPattern - Subtle dot pattern background
 * Use as an absolute overlay inside sections for depth
 *
 * For rail-bounded sections, use:
 * style={{ left: 'var(--rail-offset)', right: 'var(--rail-offset)', top: 0, bottom: 0 }}
 */
export const DotPattern = memo(function DotPattern({
  className,
  style,
}: DotPatternProps) {
  return (
    <div
      className={cn("dot-pattern absolute", className)}
      aria-hidden="true"
      style={style}
    />
  );
});

DotPattern.displayName = "DotPattern";
