"use client";

import { memo } from "react";
import { H3, Label, MonoText } from "@/components/ui";
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
 * - Animation: 150ms with cubic-bezier(0.25, 1, 0.5, 1) easing
 * - Mobile-first: optimized for small screens
 *
 * Best practices applied:
 * - Memoized to prevent re-renders when experience prop doesn't change
 * - Clean timeline layout with consistent spacing
 * - Isolated controls for links
 * - Focus on precision and density
 */
export const WorkExperienceCard = memo(
  ({ experience, isLast = false }: WorkExperienceCardProps) => {
    return (
      <div className="relative flex gap-4 sm:gap-6 group">
        {/* Timeline Dot and Line */}
        <div className="flex flex-col items-center">
          <div className="mt-2 h-2 w-2 rounded-full border-2 border-border bg-background transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-accent" />
          {!isLast && (
            <div className="w-0.5 flex-1 bg-border mt-2 group-hover:bg-accent/20 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]" />
          )}
        </div>

        {/* Content Card */}
        <div className="flex-1 pb-8 sm:pb-12">
          <div className="rounded-md border border-border bg-card p-3 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent/40 hover:shadow-[0_2px_12px_-2px_oklch(var(--foreground)/0.08)] hover:translate-y-[-1px] focus-within:border-accent/60 focus-within:shadow-[0_2px_12px_-2px_oklch(var(--foreground)/0.08)] motion-reduce:transition-none">
            {/* Header */}
            <div className="mb-3">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <H3 className="flex-1 min-w-0">{experience.title}</H3>
                <MonoText className="whitespace-nowrap text-xs sm:text-sm tabular-nums text-muted-foreground/80 group-hover:text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  {experience.start} — {experience.end}
                </MonoText>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {experience.href ? (
                  <a
                    href={experience.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-accent focus:outline-none focus:underline focus:underline-offset-2"
                    aria-label={`${experience.company} - Visit website`}
                  >
                    {experience.company}
                    <ExternalLink
                      className="h-3 w-3 flex-shrink-0 text-muted-foreground/60 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/icon:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <span className="text-sm font-medium text-foreground">
                    {experience.company}
                  </span>
                )}
                <span className="text-muted-foreground/40">•</span>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground/70">
                  {experience.location}
                </Label>
              </div>
            </div>

            {/* Description */}
            {experience.description && (
              <div className="text-sm leading-relaxed text-muted-foreground space-y-1.5">
                {experience.description
                  .split(/\.\s+/)
                  .filter((item) => item.trim())
                  .map((item) => (
                    <div
                      key={item.trim()}
                      className="flex items-start gap-2.5 group/item"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-border transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/item:bg-accent/50" />
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
