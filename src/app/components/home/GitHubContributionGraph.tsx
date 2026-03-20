"use client";

import { memo, useMemo, useState } from "react";
import { MonoText } from "@/components/ui";
import type { ContributionData, ContributionDay } from "@/lib/github";
import { getContributionColor } from "@/lib/github";

interface GitHubContributionGraphProps {
  data: ContributionData;
  username: string;
}

/**
 * GitHubContributionGraph - Heatmap minimalista de contribuições com tooltip
 * Design blueprint: grid de quadrados com tooltip de commits
 */
export const GitHubContributionGraph = memo(
  ({ data }: GitHubContributionGraphProps) => {
    const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

    // Get last 52 weeks (1 year) - GitHub style
    const recentWeeks = useMemo(() => {
      return data.weeks.slice(-52);
    }, [data.weeks]);

    return (
      <div className="relative w-full overflow-visible">
        <div className="flex justify-center">
          <div className="relative inline-block">
            {/* Minimal contribution grid */}
            <div className="flex gap-1">
              {recentWeeks.map((week) => {
                const weekKey = week.days[0]?.date || Math.random().toString();
                return (
                  <div key={weekKey} className="flex flex-col gap-1">
                    {week.days.map((day) => (
                      <button
                        key={day.date}
                        type="button"
                        className="group relative h-[10px] w-[10px] rounded-sm border border-white/[0.08] transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-white/[0.15] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        style={{
                          backgroundColor: getContributionColor(day.level),
                        }}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        aria-label={`${day.count} contributions on ${day.date}`}
                      >
                        {/* Tooltip */}
                        {hoveredDay?.date === day.date && (
                          <div className="pointer-events-none absolute bottom-full left-1/2 z-[9999] mb-2 -translate-x-1/2 whitespace-nowrap rounded border border-white/[0.08] bg-background/95 px-2 py-1 backdrop-blur-md animate-in-down">
                            <MonoText className="text-[10px] text-foreground">
                              {day.date} · {day.count} commit
                              {day.count !== 1 ? "s" : ""}
                            </MonoText>
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
      </div>
    );
  },
);

GitHubContributionGraph.displayName = "GitHubContributionGraph";
