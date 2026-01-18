"use client";

import { ExternalLink } from "lucide-react";
import type { Education } from "@/types/portfolio";

interface EducationCardProps {
  education: Education;
}

export const EducationCard = ({ education }: EducationCardProps) => {
  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground">
      {/* Header */}
      <div className="mb-3">
        {education.href ? (
          <a
            href={education.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-primary group"
          >
            {education.school}
            <ExternalLink className="h-4 w-4 opacity-0 transition-opacity duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100" />
          </a>
        ) : (
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            {education.school}
          </h3>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm text-muted-foreground">{education.degree}</p>
        <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
          {education.start} → {education.end}
        </span>
      </div>
    </div>
  );
};
