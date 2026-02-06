"use client";

import { memo } from "react";
import {
  ExternalLinkAnchor,
  TimelineCardWrapper,
  TimelineDate,
  TimelineItem,
} from "@/components/common/timeline-components";
import { H3, P } from "@/components/ui";
import type { Education } from "@/types/portfolio";

interface EducationCardProps {
  education: Education;
  isLast?: boolean;
}

/**
 * EducationCard component - Timeline Item
 *
 * Design principles (AGENTS.md):
 * - Timeline editorial layout matching blog TimelinePost
 * - Same layout as WorkExperienceCard: school/date on same line
 * - Vertical timeline with animated indicator dots
 * - Rich hover interactions with border glow
 * - 4px grid: consistent spacing throughout
 * - Borders-only approach with accent highlights
 * - Typography: monospace for dates, hierarchy for titles
 * - Animation: smooth transitions
 * - Mobile-first: responsive layout
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Uses shared timeline components for consistency
 * - Clean component composition
 * - Consistent with WorkExperienceCard pattern
 */
export const EducationCard = memo(
  ({ education, isLast = false }: EducationCardProps) => {
    return (
      <TimelineItem isLast={isLast}>
        <TimelineCardWrapper>
          {/* School + Date - same layout as WorkExperience */}
          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
            {/* School Header */}
            {education.href ? (
              <ExternalLinkAnchor
                href={education.href}
                size="base"
                weight="semibold"
                ariaLabel={`${education.school} - Visit website`}
                className="flex-1 min-w-0"
              >
                {education.school}
              </ExternalLinkAnchor>
            ) : (
              <H3 className="flex-1 min-w-0">{education.school}</H3>
            )}

            <TimelineDate start={education.start} end={education.end} />
          </div>

          {/* Degree */}
          <P className="transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-foreground/90">
            {education.degree}
          </P>
        </TimelineCardWrapper>
      </TimelineItem>
    );
  },
);

EducationCard.displayName = "EducationCard";
