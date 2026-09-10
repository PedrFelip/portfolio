import { memo } from "react";
import {
  SectionBadge,
  StaggerGroup,
  StaggerItem,
} from "@/components/blueprint";
import { BulletList } from "@/components/common/BulletList";
import { ExternalLinkAnchor } from "@/components/common/ExternalLinkAnchor";
import { MonoText } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { WorkExperience } from "@/types/portfolio";

interface WorkExperienceBlueprintProps {
  experiences: WorkExperience[];
  title: string;
  presentLabel: string;
}

/**
 * WorkExperienceBlueprint — Full work experience section
 *
 * Blueprint panel with section header, staggered reveal for each
 * entry and a
 * two-column layout (timeline | details) with dashed divider.
 *
 * Follows the same patterns as EducationBlueprint and
 * BlueprintContactSection for visual consistency.
 */
export const WorkExperienceBlueprint = memo(
  ({ experiences, title, presentLabel }: WorkExperienceBlueprintProps) => {
    return (
      <section
        id="experience"
        data-slot="panel"
        className="bp-panel bp-line-bottom"
      >
        {/* ─── Header ─── */}
        {/* TODO(refactor)[P2]: section header duplicated 8+ times */}
        <SectionBadge line="bottom" className="px-4 py-3 sm:px-6">
          <h2 className="relative z-10 text-lg font-semibold tracking-tight sm:text-xl">
            {title}
          </h2>
        </SectionBadge>

        {/* ─── Experience List ─── */}
        <StaggerGroup className="divide-y divide-dashed divide-border/50">
          {experiences.map((exp) => {
            const isPresent =
              exp.end.toLowerCase() === presentLabel.toLowerCase();

            return (
              <StaggerItem key={`${exp.company}-${exp.title}`} variant="up">
                <div className="group relative transition-colors duration-200 hover:bg-surface-2">
                  <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] sm:gap-0">
                    {/* ─── Left Column: Timeline ─── */}
                    <div className="flex flex-row items-center gap-3 px-4 py-5 sm:flex-col sm:items-start sm:gap-1 sm:border-r sm:border-dashed sm:border-border/40 sm:py-6 sm:px-6">
                      <MonoText className="text-[10px] tabular-nums uppercase tracking-widest text-muted-foreground">
                        {exp.start}
                      </MonoText>

                      {/* Vertical connector (desktop) */}
                      <div className="hidden sm:block w-px flex-1 min-h-4 self-stretch border-r border-dashed border-border/30" />

                      {/* Horizontal connector (mobile) */}
                      <div className="sm:hidden flex-1 border-t border-dashed border-border/30" />

                      <div className="flex items-center gap-1.5">
                        {isPresent && (
                          <span
                            // TODO(refactor)[P1]: emerald-500 off-palette
                            className="size-1.5 rounded-full bg-emerald-500/80 animate-pulse"
                            aria-hidden="true"
                          />
                        )}
                        <MonoText
                          className={cn(
                            "text-[10px] tabular-nums uppercase tracking-widest",
                            // TODO(refactor)[P1]: emerald-500 off-palette
                            isPresent
                              ? "text-emerald-500/60"
                              : "text-muted-foreground",
                          )}
                        >
                          {exp.end}
                        </MonoText>
                      </div>
                    </div>

                    {/* ─── Right Column: Details ─── */}
                    <div className="flex flex-col gap-3 px-4 py-4 sm:px-6 sm:py-6">
                      {/* Role & Company row */}
                      <div className="flex flex-col gap-1">
                        <h3 className="text-sm font-bold tracking-tight text-foreground leading-snug sm:text-base">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {exp.href ? (
                            <ExternalLinkAnchor
                              href={exp.href}
                              size="sm"
                              weight="medium"
                              className="text-xs text-foreground/70 hover:text-foreground transition-colors"
                            >
                              {exp.company}
                            </ExternalLinkAnchor>
                          ) : (
                            <MonoText className="text-xs font-medium text-foreground/70">
                              {exp.company}
                            </MonoText>
                          )}
                          <span
                            className="text-muted-foreground/15"
                            aria-hidden="true"
                          >
                            ·
                          </span>
                          <MonoText className="text-[10px] text-muted-foreground">
                            {exp.location}
                          </MonoText>
                        </div>
                      </div>

                      {/* Description bullets */}
                      {exp.description && (
                        <BulletList
                          items={exp.description
                            .split(/\.\s+/)
                            .filter((s) => s.trim())}
                          className="space-y-1.5 mt-1"
                          itemClassName="text-[13px] leading-relaxed text-muted-foreground"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>
    );
  },
);

WorkExperienceBlueprint.displayName = "WorkExperienceBlueprint";
