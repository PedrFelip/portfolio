import { memo } from "react";
import { SectionBadge } from "@/components/blueprint";
import { MonoText } from "@/components/ui";
import type { Education } from "@/types/portfolio";

interface EducationBlueprintProps {
  education: Education[];
  title: string;
}

/**
 * EducationBlueprint — chanhdai.com inspired panel
 *
 * Header with title, content area with education
 * items displayed in a clean layout with dashed divider.
 */
export const EducationBlueprint = memo(
  ({ education, title }: EducationBlueprintProps) => {
    return (
      <section data-slot="panel" className="bp-panel bp-line-bottom">
        {/* Header */}
        {/* TODO(refactor)[P2]: section header duplicated 8+ times */}
        <SectionBadge line="bottom" className="px-4 py-3 sm:px-6">
          <h2 className="relative z-10 text-lg font-semibold tracking-tight sm:text-xl">
            {title}
          </h2>
        </SectionBadge>

        {/* Content */}
        <div className="px-4 py-6 sm:px-6">
          <div className="space-y-6">
            {education.map((edu, i) => (
              <div
                key={`${edu.school}-${edu.degree}`}
                className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 ${
                  i > 0 ? "pt-6 border-t border-dashed border-border" : ""
                }`}
              >
                <div className="flex flex-col">
                  <MonoText className="text-[10px] tabular-nums uppercase tracking-widest text-muted-foreground">
                    {edu.start} — {edu.end}
                  </MonoText>
                  <h3 className="text-base font-semibold text-foreground">
                    {edu.school}
                  </h3>
                </div>

                <div className="hidden sm:block h-6 w-px border-r border-dashed border-overlay-border" />

                <span className="text-sm text-foreground/80">{edu.degree}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);

EducationBlueprint.displayName = "EducationBlueprint";
