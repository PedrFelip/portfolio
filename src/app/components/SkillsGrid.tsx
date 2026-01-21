import { memo } from "react";
import { H3 } from "@/components/ui";

interface SkillCategory {
  category: string;
  items: string[];
}

interface SkillsGridProps {
  skills: SkillCategory[];
}

/**
 * SkillsGrid component - Responsive grid of skill categories
 *
 * Best practices applied:
 * - Memoized to prevent re-renders when skills prop doesn't change
 * - displayName for debugging and performance monitoring
 */
export const SkillsGrid = memo(({ skills }: SkillsGridProps) => {
  return (
    <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
      {skills.map((skillGroup) => (
        <div key={skillGroup.category} className="space-y-4">
          <H3>{skillGroup.category}</H3>
          <div className="flex flex-wrap gap-2">
            {skillGroup.items.map((skill) => (
              <span
                key={skill}
                className="rounded border border-border bg-muted px-2.5 sm:px-3 py-1 sm:py-1.5 font-mono text-xs text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});

SkillsGrid.displayName = "SkillsGrid";
