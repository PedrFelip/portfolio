"use client";

import { memo } from "react";
import {
  BulletList,
  OrganizationWithLocation,
  TimelineCardWrapper,
  TimelineDate,
  TimelineItem,
} from "@/components/common/timeline-components";
import { H3 } from "@/components/ui";
import type { WorkExperience } from "@/types/portfolio";

interface WorkExperienceCardProps {
  experience: WorkExperience;
  isLast?: boolean;
}

/**
 * WorkExperienceCard component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Timeline editorial layout matching blog TimelinePost
 * - Vertical timeline with animated indicator dots
 * - Rich hover interactions with border glow
 * - Borders-only approach with accent highlights
 * - Typography: monospace for dates, hierarchy for titles
 * - Animation: smooth transitions
 * - Mobile-first: responsive layout
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Uses shared timeline components for consistency
 * - Clean component composition
 */
export const WorkExperienceCard = memo(
  ({ experience, isLast = false }: WorkExperienceCardProps) => {
    return (
      <TimelineItem isLast={isLast}>
        <TimelineCardWrapper>
          <div className="mb-3">
            {/* Title + Date */}
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <H3 className="flex-1 min-w-0">{experience.title}</H3>
              <TimelineDate start={experience.start} end={experience.end} />
            </div>

            {/* Company + Location */}
            <OrganizationWithLocation
              name={experience.company}
              href={experience.href}
              location={experience.location}
              size="sm"
              weight="medium"
            />
          </div>

          {/* Description */}
          {experience.description && (
            <BulletList
              items={experience.description
                .split(/\.\s+/)
                .filter((item) => item.trim())}
            />
          )}
        </TimelineCardWrapper>
      </TimelineItem>
    );
  },
);

WorkExperienceCard.displayName = "WorkExperienceCard";
