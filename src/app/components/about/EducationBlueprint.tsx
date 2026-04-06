"use client";

import { GraduationCap } from "lucide-react";
import { memo } from "react";
import {
  AlignedFlickeringGrid,
  CornerBrackets,
  DotPattern,
} from "@/components/blueprint";
import { MonoText } from "@/components/ui";
import type { Education } from "@/types/portfolio";

interface EducationBlueprintProps {
  education: Education[];
  title: string;
  badge: string;
}

/**
 * EducationBlueprint component
 *
 * A simplified, horizontal blueprint layout for education data.
 * Adheres to the "Architectural Precision" design system.
 */
export const EducationBlueprint = memo(
  ({ education, title, badge }: EducationBlueprintProps) => {
    return (
      <div className="rail-bounded overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Header Column */}
          <div className="px-6 py-12 sm:px-8 sm:py-16">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
              {badge}
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {title}
            </h2>
          </div>

          {/* Content Column (Blueprint Style) */}
          <div className="group relative flex flex-col justify-center border-t border-dashed border-border lg:border-t-0 lg:border-l lg:col-span-2 overflow-hidden bg-surface-1 hover:bg-surface-2 transition-colors duration-300 px-6 py-10 sm:px-12 sm:py-16 hover:shadow-lg hover:shadow-accent/5">
            {/* Flickering Grid Background */}
            <AlignedFlickeringGrid
              side="right"
              className="absolute inset-0 h-full w-full !flex opacity-40"
              maxOpacity={0.1}
            />

            {/* Decorative Background */}
            <DotPattern className="opacity-10" />
            <CornerBrackets
              size={12}
              className="opacity-20 transition-opacity duration-300 group-hover:opacity-70"
            />

            <div className="relative z-10">
              {education.map((edu) => (
                <div
                  key={`${edu.school}-${edu.degree}`}
                  className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8"
                >
                  <div className="flex flex-col">
                    <MonoText className="text-[11px] tabular-nums uppercase tracking-widest text-muted-foreground/40 mb-1">
                      {edu.start} — {edu.end}
                    </MonoText>
                    <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-foreground">
                      {edu.school}
                    </h3>
                  </div>

                  <div className="hidden sm:block h-8 w-px border-r border-dashed border-overlay-border" />

                  <div className="flex flex-col">
                    <span className="text-base font-medium text-foreground/80">
                      {edu.degree}
                    </span>
                  </div>

                  {/* Subtle graduation icon decoration */}
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none">
                    <GraduationCap size={120} strokeWidth={1} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

EducationBlueprint.displayName = "EducationBlueprint";
