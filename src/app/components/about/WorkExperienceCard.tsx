"use client";

import { memo } from "react";
import { CornerBrackets } from "@/components/blueprint";
import { BulletList } from "@/components/common/BulletList";
import { ExternalLinkAnchor } from "@/components/common/ExternalLinkAnchor";
import { H3, MonoText } from "@/components/ui";
import type { WorkExperience } from "@/types/portfolio";

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

/**
 * WorkExperienceCard — chanhdai.com inspired
 *
 * Clean row layout with vertical dashed divider between
 * role info and description. Corner brackets on hover.
 */
export const WorkExperienceCard = memo(
  ({ experience }: WorkExperienceCardProps) => {
    return (
      <div className="group relative px-4 py-5 sm:px-6 sm:py-6 transition-colors duration-200 hover:bg-surface-2">
        <CornerBrackets
          size={8}
          className="opacity-0 transition-opacity duration-200 group-hover:opacity-40 pointer-events-none"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[180px_auto_1fr] sm:gap-6">
          {/* Left: Timeline & Role */}
          <div className="flex flex-col gap-1">
            <MonoText className="text-[10px] tabular-nums uppercase tracking-widest text-muted-foreground/40">
              {experience.start} — {experience.end}
            </MonoText>
            <H3 className="text-sm font-bold tracking-tight text-foreground leading-snug">
              {experience.title}
            </H3>
            <div className="flex items-center gap-1.5 mt-0.5">
              {experience.href ? (
                <ExternalLinkAnchor
                  href={experience.href}
                  size="sm"
                  weight="medium"
                  className="text-xs text-foreground/70 hover:text-foreground transition-colors"
                >
                  {experience.company}
                </ExternalLinkAnchor>
              ) : (
                <MonoText className="text-xs font-medium text-foreground/70">
                  {experience.company}
                </MonoText>
              )}
              <span className="text-muted-foreground/15">·</span>
              <MonoText className="text-[10px] text-muted-foreground/40">
                {experience.location}
              </MonoText>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden sm:block border-r border-dashed border-border/40 self-stretch" />

          {/* Right: Description */}
          <div className="flex flex-col">
            {experience.description && (
              <BulletList
                items={experience.description
                  .split(/\.\s+/)
                  .filter((item) => item.trim())}
                className="space-y-2"
                itemClassName="text-[13px] leading-relaxed text-muted-foreground/70"
              />
            )}
          </div>
        </div>
      </div>
    );
  },
);

WorkExperienceCard.displayName = "WorkExperienceCard";
