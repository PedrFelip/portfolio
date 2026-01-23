"use client";

import { memo } from "react";
import { H3, MonoText } from "@/components/ui";
import { ExternalLink } from "@/components/ui/icons";
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
 * - Symmetrical padding: matching padding on all sides
 * - Borders-only approach: subtle borders, minimal depth
 * - Typography: monospace for data (dates)
 * - Animation: 150-250ms with cubic-bezier easing
 * - Mobile-first: optimized for small screens
 *
 * Best practices applied:
 * - Memoized to prevent re-renders when experience prop doesn't change
 * - Clean timeline layout with consistent spacing
 * - Isolated controls for links
 */
export const WorkExperienceCard = memo(
  ({ experience, isLast = false }: WorkExperienceCardProps) => {
    return (
      <div className="relative flex gap-4 sm:gap-6 group">
        {/* Timeline Dot and Line */}
        <div className="flex flex-col items-center">
          <div className="mt-2 h-3 w-3 rounded-full border-2 border-foreground bg-background transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-foreground" />
          {!isLast && <div className="w-0.5 flex-1 bg-border mt-2" />}
        </div>

        {/* Content Card */}
        <div className="flex-1 pb-8 sm:pb-12">
          <div className="rounded-lg border border-border bg-card p-4 transition-[border-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground sm:p-6 motion-reduce:transition-none">
            {/* Header */}
            <div className="mb-3 sm:mb-4">
              <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                <H3>{experience.title}</H3>
                <MonoText className="whitespace-nowrap">
                  {experience.start} - {experience.end}
                </MonoText>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {experience.href ? (
                  <a
                    href={experience.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground"
                    aria-label={`${experience.company} - Visit website`}
                  >
                    {experience.company}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    {experience.company}
                  </span>
                )}
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {experience.location}
                </span>
              </div>
            </div>

            {/* Description */}
            {experience.description && (
              <div className="text-sm leading-relaxed text-muted-foreground">
                {experience.description
                  .split(/\.\s+/)
                  .filter((item) => item.trim())
                  .map((item) => (
                    <div
                      key={item}
                      className="mb-2 flex items-start gap-2 last:mb-0"
                    >
                      <span className="mt-0.5 text-muted-foreground/60">•</span>
                      <span className="flex-1">
                        {item.trim()}
                        {item.trim() && !item.endsWith(".") ? "." : ""}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

WorkExperienceCard.displayName = "WorkExperienceCard";
