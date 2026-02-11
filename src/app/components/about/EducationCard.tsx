"use client";

import { memo } from "react";
import { ExternalLinkAnchor } from "@/components/common/timeline-components";
import { Badge, Card, H3, MonoText } from "@/components/ui";
import type { Education } from "@/types/portfolio";

interface EducationCardProps {
  education: Education;
}

/**
 * EducationCard component - Enhanced Brutalist
 *
 * Design principles (AGENTS.md):
 * - Enhanced Brutalist with grid layout and left border indicator
 * - 4px grid: consistent spacing throughout
 * - Brand-emerald accent for education theme
 * - No lift on hover (grounded, stable feel)
 * - Borders-only approach: colored left border, bg tint on hover
 * - Monospace for data: dates, degree, school name
 * - 150ms animations with cubic-bezier(0.25, 1, 0.5, 1) easing
 * - Memoized to prevent re-renders
 */
export const EducationCard = memo(({ education }: EducationCardProps) => {
  return (
    <Card className="education-card-enhanced">
      <div className="grid grid-cols-[140px_1px_1fr] gap-4">
        <div className="flex flex-col items-end pr-4">
          <MonoText className="text-sm tabular-nums text-foreground/70">
            {education.start}
          </MonoText>
          <div className="text-foreground/30 text-xs py-1">↓</div>
          <MonoText className="text-sm tabular-nums text-foreground/70">
            {education.end}
          </MonoText>
        </div>

        <div className="w-px bg-foreground/10" />

        <div className="pl-4">
          <H3 className="mb-3 text-foreground">{education.school}</H3>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <MonoText className="text-sm text-foreground/90">
              {education.degree}
            </MonoText>
            <Badge variant="education">graduated</Badge>
          </div>

          {education.href && (
            <ExternalLinkAnchor
              href={education.href}
              size="sm"
              weight="medium"
              ariaLabel={`${education.school} - Visit website`}
            >
              Visit website
            </ExternalLinkAnchor>
          )}
        </div>
      </div>
    </Card>
  );
});

EducationCard.displayName = "EducationCard";
