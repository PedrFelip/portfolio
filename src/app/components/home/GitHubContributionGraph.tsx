"use client";

import { memo, useMemo, useState } from "react";
import { MonoText } from "@/components/ui";
import type { ContributionData, ContributionDay } from "@/lib/github";
import { getContributionColor } from "@/lib/github";
import { cn } from "@/lib/utils";

interface GitHubContributionGraphProps {
  data: ContributionData;
  username: string;
}

/**
 * GitHubContributionGraph - Responsive Heatmap
 * Features:
 * - Horizontal scrolling on mobile
 * - Centered on desktop
 * - Edge masks for scroll indication
 * - Padded container for tooltips
 */
export const GitHubContributionGraph = memo(
  ({ data }: GitHubContributionGraphProps) => {
    const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

    // Get last 52 weeks (1 year) - GitHub style
    const recentWeeks = useMemo(() => {
      return data.weeks.slice(-52);
    }, [data.weeks]);

    return (
      <div className="relative w-full max-w-full group/graph">
        {/* Scroll Indication Masks - only visible on mobile when scrollable */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-background to-transparent opacity-0 md:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-background to-transparent opacity-100 md:hidden" />

        {/* Scroll Container */}
        <div className="relative w-full overflow-x-auto overflow-y-visible pb-10 pt-16 scrollbar-hide flex md:justify-center px-4">
          <div className="relative inline-flex flex-shrink-0">
            {/* Minimal contribution grid */}
            <div className="flex gap-1">
              {recentWeeks.map((week, index) => {
                const weekKey = week.days[0]?.date || `week-${index}`;
                return (
                  <div key={weekKey} className="flex flex-col gap-1">
                    {week.days.map((day) => (
                      <button
                        key={day.date}
                        type="button"
                        className={cn(
                          "group relative h-[10px] w-[10px] rounded-[3px] border border-white/[0.08] transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
                          "hover:border-white/[0.2] hover:scale-110 hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                        )}
                        style={{
                          backgroundColor: getContributionColor(day.level),
                        }}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        aria-label={`${day.count} contributions on ${day.date}`}
                      >
                        {/* Enhanced Tooltip */}
                        {hoveredDay?.date === day.date && (
                          <div className="pointer-events-none absolute bottom-full left-1/2 z-[9999] mb-2 -translate-x-1/2 whitespace-nowrap rounded border border-white/[0.1] bg-card/95 px-2.5 py-1.5 shadow-2xl backdrop-blur-md animate-in-down">
                            <div className="flex flex-col gap-0.5 items-center">
                              <MonoText className="text-[10px] font-bold text-foreground">
                                {day.count} commit
                                {day.count !== 1 ? "s" : ""}
                              </MonoText>
                              <MonoText className="text-[9px] text-muted-foreground/80">
                                {new Date(day.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </MonoText>
                            </div>
                            {/* Tooltip Arrow */}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 border-r border-b border-white/10 bg-card/95" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend - Responsive positioning */}
        <div className="mt-2 flex items-center justify-end gap-1.5 px-4 md:justify-center">
          <MonoText className="text-[10px] text-muted-foreground/60">
            Less
          </MonoText>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <div
              key={lvl}
              className="h-2 w-2 rounded-[2px] border border-white/[0.05]"
              style={{
                backgroundColor: getContributionColor(lvl as 0 | 1 | 2 | 3 | 4),
              }}
            />
          ))}
          <MonoText className="text-[10px] text-muted-foreground/60">
            More
          </MonoText>
        </div>
      </div>
    );
  },
);

GitHubContributionGraph.displayName = "GitHubContributionGraph";
