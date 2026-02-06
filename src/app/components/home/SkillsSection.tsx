import { memo } from "react";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge, H3 } from "@/components/ui";
import type { SkillCategory } from "@/types/portfolio";

interface SkillsSectionProps {
  skills: SkillCategory[];
  badge: string;
  title: string;
}

interface SkillItemProps {
  skill: string;
}

/**
 * SkillItem component
 *
 * Design principles (AGENTS.md):
 * - Uses Badge component for consistency
 * - 4px grid padding maintained
 * - Borders-only approach with subtle hover
 * - Typography: monospace for skill names
 *
 * Memoized to prevent re-renders for individual skill items
 * (Vercel: rerender-memo)
 */
const SkillItem = memo(({ skill }: SkillItemProps) => (
  <Badge
    variant="outline"
    className="font-mono text-xs transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:text-foreground motion-reduce:transition-none"
  >
    {skill}
  </Badge>
));

SkillItem.displayName = "SkillItem";

interface SkillCategoryGroupProps extends SkillCategory {}

/**
 * SkillCategoryGroup component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing (gap-2 = 8px, gap-3 = 12px)
 * - Symmetrical padding: matching padding on all sides
 * - Typography: H3 for category titles, monospace for skills
 *
 * Memoized to prevent re-renders when skills in a category don't change
 * (Vercel: rerender-memo)
 */
const SkillCategoryGroup = memo(
  ({ category, items }: SkillCategoryGroupProps) => (
    <div className="space-y-3 sm:space-y-4">
      <H3>{category}</H3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <SkillItem key={skill} skill={skill} />
        ))}
      </div>
    </div>
  ),
);

SkillCategoryGroup.displayName = "SkillCategoryGroup";

/**
 * SkillsSection component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Mobile-first: optimized for small screens
 * - Section component for consistent page structure
 *
 * Best practices applied:
 * - Memoized to prevent unnecessary re-renders (Vercel: rerender-memo)
 * - Child components (SkillCategoryGroup, SkillItem) are memoized separately
 * - Efficient rendering of large skill lists
 * - Clean component composition
 */
export const SkillsSection = memo(
  ({ skills, badge, title }: SkillsSectionProps) => {
    return (
      <Section>
        <SectionHeader badge={badge} badgeVariant="expertise" title={title} />
        <div className="grid gap-6 md:grid-cols-2">
          {skills.map((skillGroup) => (
            <SkillCategoryGroup
              key={skillGroup.category}
              category={skillGroup.category}
              items={skillGroup.items}
            />
          ))}
        </div>
      </Section>
    );
  },
);

SkillsSection.displayName = "SkillsSection";
