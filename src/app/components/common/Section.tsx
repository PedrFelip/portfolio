import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted";
}

/**
 * Section component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Mobile-first: optimized for small screens
 *
 * Spacing scale:
 * - Mobile: px-4 py-12 (tighter for small screens)
 * - Tablet: sm:px-6 sm:py-16 (comfortable spacing)
 * - Desktop: lg:px-8 lg:py-24 (generous spacing)
 *
 * Consistent vertical spacing between sections for visual rhythm
 */
export const Section = ({
  children,
  className = "",
  variant = "default",
}: SectionProps) => {
  const variantStyles = {
    default: "py-12 sm:py-16 lg:py-24",
    muted: "border-t border-border bg-muted/30 py-12 sm:py-16 lg:py-24",
  };

  return (
    <section className={`${variantStyles[variant]} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
};
