"use client";

import { memo } from "react";
import {
  BulletList,
  ExternalLinkAnchor,
} from "@/components/common/timeline-components";
import { Card, CardContent, CardHeader, H3, MonoText } from "@/components/ui";
import type { WorkExperience } from "@/types/portfolio";

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

/**
 * WorkExperienceCard component - Modern Data Card
 *
 * Design principles (AGENTS.md):
 * - Modern Data Card pattern with left border indicator
 * - 4px grid: consistent spacing throughout
 * - Brand-blue accent for work theme
 * - Subtle lift on hover (1px) for tactile feedback
 * - Borders-only approach: colored left border, minimal shadow
 * - Monospace for data: dates, company name, location
 * - 150ms animations with cubic-bezier(0.25, 1, 0.5, 1) easing
 * - Memoized to prevent re-renders
 */
export const WorkExperienceCard = memo(
  ({ experience }: WorkExperienceCardProps) => {
    return (
      <Card className="work-card-modern">
        <CardHeader>
          <H3 className="mb-2">{experience.title}</H3>

          <div className="flex items-center gap-2.5">
            <MonoText className="text-xs tabular-nums text-muted-foreground">
              {experience.start}
              {experience.end && ` → ${experience.end}`}
            </MonoText>
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {experience.href ? (
              <ExternalLinkAnchor
                href={experience.href}
                size="sm"
                weight="medium"
                ariaLabel={`${experience.company} - Visit website`}
              >
                {experience.company}
              </ExternalLinkAnchor>
            ) : (
              <MonoText className="text-sm font-medium text-foreground">
                {experience.company}
              </MonoText>
            )}
            <span className="text-muted-foreground/40">•</span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground/70">
              {experience.location}
            </span>
          </div>

          {experience.description && (
            <BulletList
              items={experience.description
                .split(/\.\s+/)
                .filter((item) => item.trim())}
            />
          )}
        </CardContent>
      </Card>
    );
  },
);

WorkExperienceCard.displayName = "WorkExperienceCard";
