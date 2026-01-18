import type { ReactNode } from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/**
 * SectionHeader component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Typography hierarchy: proper sizing and spacing
 *
 * Spacing scale:
 * - mb-8 on mobile (32px)
 * - mb-12 on tablet/desktop (48px)
 * - Consistent spacing between header and content
 */
export const SectionHeader = ({
  badge,
  title,
  description,
  children,
}: SectionHeaderProps) => {
  return (
    <div className="mb-8 sm:mb-12">
      {badge && (
        <div className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {badge}
        </div>
      )}
      <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-sm sm:text-base text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};
