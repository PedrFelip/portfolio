"use client";

import { ExternalLink } from "lucide-react";
import { memo } from "react";
import { H3, MonoText, P } from "@/components/ui";
import type { Education } from "@/types/portfolio";

interface EducationCardProps {
  education: Education;
}

/**
 * EducationCard component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Borders-only approach: subtle borders, minimal depth
 * - Typography: monospace for data (dates)
 * - Animation: 150-250ms with cubic-bezier easing
 *
 * Best practices applied:
 * - Memoized to prevent re-renders when education prop doesn't change
 * - Clean component composition
 */
export const EducationCard = memo(({ education }: EducationCardProps) => {
  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground">
      {/* Header */}
      <div className="mb-3">
        {education.href ? (
          <a
            href={education.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-accent group"
            aria-label={`${education.school} - Visit website`}
          >
            {education.school}
            <ExternalLink
              className="h-4 w-4 opacity-0 transition-opacity duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100"
              aria-hidden="true"
            />
          </a>
        ) : (
          <H3>{education.school}</H3>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <P className="text-muted-foreground">{education.degree}</P>
        <MonoText className="whitespace-nowrap">
          {education.start} → {education.end}
        </MonoText>
      </div>
    </div>
  );
});

EducationCard.displayName = "EducationCard";
