"use client";

import { memo } from "react";
import { CornerBrackets } from "@/components/blueprint";
import { BulletList } from "@/components/common/BulletList";
import { ExternalLinkAnchor } from "@/components/common/ExternalLinkAnchor";
import { Card, H3, MonoText } from "@/components/ui";
import type { WorkExperience } from "@/types/portfolio";

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

/**
 * WorkExperienceCard component - Blueprint Edition
 *
 * Design principles:
 * - Architectural precision with visible grid layout
 * - Technical metadata (EXP-ID, STATUS: ACTIVE/COMPLETED)
 * - Corner brackets for structural reinforcement
 * - Asymmetrical internal composition
 * - Monochrome aesthetic with subtle dashed dividers
 */
export const WorkExperienceCard = memo(
  ({ experience }: WorkExperienceCardProps) => {
    return (
      <Card
        withBrackets={false}
        className="group relative p-0 overflow-hidden border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300"
      >
        <CornerBrackets
          size={10}
          className="opacity-20 transition-opacity duration-300 group-hover:opacity-100"
        />

        <div className="p-5 sm:p-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.5fr] gap-8 items-start">
            {/* Left side: Role & Entity */}
            <div className="flex flex-col">
              <MonoText className="text-[10px] tabular-nums text-muted-foreground/40 mb-2">
                {experience.start} — {experience.end}
              </MonoText>
              <H3 className="mb-3 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-white">
                {experience.title}
              </H3>

              <div className="flex items-center gap-3">
                {experience.href ? (
                  <ExternalLinkAnchor
                    href={experience.href}
                    size="sm"
                    weight="medium"
                    className="text-foreground/80 hover:text-white transition-colors"
                  >
                    {experience.company}
                  </ExternalLinkAnchor>
                ) : (
                  <MonoText className="text-sm font-medium text-foreground/80">
                    {experience.company}
                  </MonoText>
                )}
                <span className="text-muted-foreground/20">•</span>
                <MonoText className="text-xs text-muted-foreground/60">
                  {experience.location}
                </MonoText>
              </div>
            </div>

            {/* Vertical Divider (Desktop) */}
            <div className="hidden lg:flex h-full w-px border-r border-dashed border-white/[0.08] self-stretch" />

            {/* Right side: Description */}
            <div className="flex flex-col pt-1">
              {experience.description && (
                <BulletList
                  items={experience.description
                    .split(/\.\s+/)
                    .filter((item) => item.trim())}
                  className="space-y-3"
                  itemClassName="text-[13px] leading-relaxed text-muted-foreground/80 group-hover/item:text-muted-foreground transition-colors"
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </Card>
    );
  },
);

WorkExperienceCard.displayName = "WorkExperienceCard";
