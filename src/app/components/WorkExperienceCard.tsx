"use client";

import { ExternalLink } from "lucide-react";
import type { WorkExperience } from "@/types/portfolio";

interface WorkExperienceCardProps {
  experience: WorkExperience;
  isLast?: boolean;
}

export const WorkExperienceCard = ({
  experience,
  isLast = false,
}: WorkExperienceCardProps) => {
  return (
    <div className="relative flex gap-4 sm:gap-6 group">
      {/* Timeline Dot and Line */}
      <div className="flex flex-col items-center">
        <div className="mt-2 h-3 w-3 rounded-full border-2 border-foreground bg-background transition-colors group-hover:bg-foreground" />
        {!isLast && <div className="w-0.5 flex-1 bg-border mt-2" />}
      </div>

      {/* Content Card */}
      <div className="flex-1 pb-8 sm:pb-12">
        <div className="rounded-lg border border-border bg-card p-4 sm:p-6 transition-all hover:border-foreground">
          {/* Header */}
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <h3 className="text-base sm:text-lg font-semibold text-foreground">
                {experience.title}
              </h3>
              <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                {experience.start} → {experience.end}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {experience.href ? (
                <a
                  href={experience.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {experience.company}
                  <ExternalLink className="h-3.5 w-3.5" />
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
            <p className="text-sm leading-relaxed text-muted-foreground">
              {experience.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
