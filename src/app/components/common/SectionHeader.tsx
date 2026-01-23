import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { Badge, H2, P } from "@/components/ui";
import type { badgeVariants } from "@/components/ui/badge";

interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: VariantProps<typeof badgeVariants>["variant"];
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
 * - Badge variants: color-coded by section type for visual distinctiveness
 * - Uses shadcn/ui typography components: H2, P, Badge
 *
 * Spacing scale:
 * - mb-8 on mobile (32px)
 * - mb-12 on tablet/desktop (48px)
 * - Description uses mb-4 for proper visual separation (matches grid content gap)
 *
 * Badge variants:
 * - work: blue accent for professional experience
 * - education: green accent for educational background
 * - expertise: purple accent for technical skills
 * - projects: amber accent for project showcases
 * - contact: cyan accent for contact/social links
 * - about: slate accent for personal sections
 */

export const SectionHeader = ({
  badge,
  badgeVariant = "outline",
  title,
  description,
  children,
}: SectionHeaderProps) => {
  return (
    <div className="mb-8 sm:mb-12">
      {badge && (
        <Badge
          variant={badgeVariant}
          className="mb-3 uppercase tracking-wider text-xs font-medium"
        >
          {badge}
        </Badge>
      )}
      <H2 className="mb-4">{title}</H2>
      {description && <P className="max-w-2xl mb-4">{description}</P>}
      {children}
    </div>
  );
};
