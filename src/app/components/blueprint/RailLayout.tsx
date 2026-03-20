import { memo } from "react";
import { cn } from "@/lib/utils";

interface RailLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * RailLayout - Container for structural grid pages
 * Creates vertical rail lines that span the full height
 * Always use overflow-x: clip (not hidden) to preserve position:sticky
 */
export const RailLayout = memo(function RailLayout({
  children,
  className,
}: RailLayoutProps) {
  return (
    <div className={cn("page-rails flex flex-col", className)}>{children}</div>
  );
});

RailLayout.displayName = "RailLayout";
