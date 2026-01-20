import type { ReactNode } from "react";
import { H2, Label, P } from "@/components/ui";

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
 * - Typography hierarchy: proper sizing and spacing with visual breathing room
 * - Uses shadcn/ui typography components: H2, P, Label
 *
 * Spacing scale:
 * - mb-8 on mobile (32px)
 * - mb-12 on tablet/desktop (48px)
 * - Extra spacing after description for better visual separation (mb-6)
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
        <Label className="mb-3 uppercase tracking-wider">{badge}</Label>
      )}
      <H2 className="mb-4">{title}</H2>
      {description && <P className="max-w-2xl mb-2">{description}</P>}
      {children}
    </div>
  );
};
