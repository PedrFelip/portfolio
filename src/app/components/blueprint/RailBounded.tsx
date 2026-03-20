import { memo } from "react";
import { cn } from "@/lib/utils";

interface RailBoundedProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "footer" | "header";
}

/**
 * RailBounded - Content aligned with vertical rail lines
 * Use this to constrain content between the structural grid rails
 * Implements margin-based approach to align edges with rail positions
 */
export const RailBounded = memo(function RailBounded({
  children,
  className,
  as: Component = "div",
}: RailBoundedProps) {
  return (
    <Component className={cn("rail-bounded", className)}>{children}</Component>
  );
});

RailBounded.displayName = "RailBounded";
