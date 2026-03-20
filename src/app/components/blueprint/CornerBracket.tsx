import { memo } from "react";
import { cn } from "@/lib/utils";

type CornerPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface CornerBracketProps {
  position: CornerPosition;
  size?: number;
  className?: string;
}

const positionStyles: Record<CornerPosition, string> = {
  "top-left": "top-0 left-0 border-t border-l",
  "top-right": "top-0 right-0 border-t border-r",
  "bottom-left": "bottom-0 left-0 border-b border-l",
  "bottom-right": "bottom-0 right-0 border-b border-r",
};

/**
 * CornerBracket - L-shaped decorative marker
 * Blueprint-inspired architectural detail for cards/sections
 */
export const CornerBracket = memo(function CornerBracket({
  position,
  size = 12,
  className,
}: CornerBracketProps) {
  return (
    <div
      className={cn(
        "absolute border-border/40 pointer-events-none",
        positionStyles[position],
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
});

CornerBracket.displayName = "CornerBracket";

interface CornerBracketsProps {
  size?: number;
  className?: string;
  corners?: CornerPosition[];
}

/**
 * CornerBrackets - Apply brackets to all corners
 * Use on cards/sections for blueprint aesthetic
 */
export const CornerBrackets = memo(function CornerBrackets({
  size = 12,
  className,
  corners = ["top-left", "top-right", "bottom-left", "bottom-right"],
}: CornerBracketsProps) {
  return (
    <>
      {corners.map((corner) => (
        <CornerBracket
          key={corner}
          position={corner}
          size={size}
          className={className}
        />
      ))}
    </>
  );
});

CornerBrackets.displayName = "CornerBrackets";
