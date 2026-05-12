"use client";

import { GraduationCap } from "lucide-react";
import { memo } from "react";
import { CornerBrackets, SectionBadge } from "@/components/blueprint";
import { MonoText } from "@/components/ui";
import type { Education } from "@/types/portfolio";

interface EducationBlueprintProps {
  education: Education[];
  title: string;
  badge: string;
}

/**
 * EducationBlueprint — chanhdai.com inspired panel
 *
 * Header with badge + title, content area with education
 * items displayed in a clean layout with dashed divider.
 */
export const EducationBlueprint = memo(
  ({ education, title, badge }: EducationBlueprintProps) => {
    return (
      <section
        data-slot="panel"
        className="bp-panel bp-line-bottom relative group overflow-hidden"
      >
        {/* Header */}
        <SectionBadge className="bp-line-bottom px-4 py-3 sm:px-6">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            {badge}
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
            {title}
          </h2>
        </SectionBadge>

        {/* Content */}
        <div className="relative px-4 py-8 sm:px-6 sm:py-12 transition-colors duration-300 hover:bg-surface-2">
          {/* Subtle decorative elements */}
          <CornerBrackets
            size={12}
            className="opacity-15 transition-opacity duration-300 group-hover:opacity-40 pointer-events-none"
          />

          {/* Graduation cap decoration */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none">
            <GraduationCap size={100} strokeWidth={1} />
          </div>

          <div className="relative z-10 space-y-6">
            {education.map((edu, i) => (
              <div
                key={`${edu.school}-${edu.degree}`}
                className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 ${
                  i > 0 ? "pt-6 border-t border-dashed border-border" : ""
                }`}
              >
                <div className="flex flex-col">
                  <MonoText className="text-[10px] tabular-nums uppercase tracking-widest text-muted-foreground/40">
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
