"use client";

import { ArrowUpRight } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { MonoText } from "@/components/ui";
import type { ContributionData, ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";
import { getContributionColor } from "./github-colors";

// TODO(refactor)[P1]: re-implements useTheme via MutationObserver
function useTheme(): "dark" | "light" {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(root.classList.contains("dark") ? "dark" : "light");
    });
    setTheme(root.classList.contains("dark") ? "dark" : "light");
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

interface GitHubContributionGraphProps {
  data: ContributionData;
  username: string;
  swipeHint: string;
  less: string;
  more: string;
  tapHint: string;
  commitLabel: string;
  commitsLabel: string;
}

/**
 * GitHubContributionGraph - Responsive Heatmap
 * Features:
 * - Adaptive week slicing (24 weeks on mobile, 52 on desktop)
 * - Tap-to-detail interaction for mobile (replaces hover tooltips)
 * - Optimized hit areas for small cells
 * - Grid fits the available width without horizontal scrolling
 */
export const GitHubContributionGraph = memo(
  ({
    data,
    username,
    less,
    more,
    tapHint,
    commitLabel,
    commitsLabel,
  }: GitHubContributionGraphProps) => {
    const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
    const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(
      null,
    );
    const theme = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile for adaptive week slicing
    // TODO(refactor)[P1]: resize listener without debounce + flash
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Get weeks based on screen size (less scroll fatigue on mobile)
    const recentWeeks = useMemo(() => {
      const limit = isMobile ? 24 : 52;
      return data.weeks.slice(-limit);
    }, [data.weeks, isMobile]);

    return (
      <div className="relative w-full max-w-full group/graph">
        {/* Contribution grid */}
        <div className="relative w-full pb-10 pt-16 px-4">
          <div className="relative w-full">
            {/* Minimal contribution grid */}
            {/* TODO(refactor)[P3]: 364 buttons without virtualization */}
            <div className="flex w-full justify-center gap-0.5 sm:gap-1">
              {recentWeeks.map((week, index) => {
                const weekKey = week.days[0]?.date || `week-${index}`;
                const tooltipAtStart = index < 6;
                const tooltipAtEnd = index >= recentWeeks.length - 6;
                return (
                  <div
                    key={weekKey}
                    className="flex min-w-0 max-w-[12px] flex-1 flex-col gap-0.5 sm:gap-1"
                  >
                    {week.days.map((day) => (
                      <button
                        key={day.date}
                        type="button"
                        className={cn(
                          "group relative aspect-square w-full shrink-0 rounded-[3px] transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
                          "hover:scale-110 hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                          selectedDay?.date === day.date &&
                            "ring-1 ring-accent z-10 scale-110",
                          // Larger touch target (hidden) — 44px on mobile, 26px on desktop
                          "before:absolute before:-inset-3 md:before:-inset-2 before:z-[-1]",
                        )}
                        style={{
                          backgroundColor: getContributionColor(
                            day.level,
                            theme,
                          ),
                        }}
                        onMouseEnter={() => !isMobile && setHoveredDay(day)}
                        onMouseLeave={() => !isMobile && setHoveredDay(null)}
                        onClick={() => {
                          if (isMobile) {
                            setSelectedDay(
                              selectedDay?.date === day.date ? null : day,
                            );
                          }
                        }}
                        aria-label={`${day.count} contributions on ${day.date}`}
                      >
                        {/* Enhanced Tooltip (Desktop Only) */}
                        {!isMobile && hoveredDay?.date === day.date && (
                          <div
                            className={cn(
                              "pointer-events-none absolute bottom-full z-[9999] mb-2 whitespace-nowrap rounded border border-overlay-border bg-card/95 px-2.5 py-1.5 shadow-2xl backdrop-blur-md animate-in-down",
                              tooltipAtStart && "left-0",
                              !tooltipAtStart && tooltipAtEnd && "right-0",
                              !tooltipAtStart &&
                                !tooltipAtEnd &&
                                "left-1/2 -translate-x-1/2",
                            )}
                          >
                            <div className="flex flex-col gap-0.5 items-center">
                              <MonoText className="text-[10px] font-bold text-foreground">
                                {day.count}{" "}
                                {day.count === 1 ? commitLabel : commitsLabel}
                              </MonoText>
                              <MonoText className="text-[9px] text-muted-foreground/80">
                                {parseLocalDate(day.date).toLocaleDateString(
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
                            <div
                              className={cn(
                                "absolute -bottom-1 size-2 rotate-45 border-r border-b border-overlay-border bg-card/95",
                                tooltipAtStart && "left-1",
                                !tooltipAtStart && tooltipAtEnd && "right-1",
                                !tooltipAtStart &&
                                  !tooltipAtEnd &&
                                  "left-1/2 -translate-x-1/2",
                              )}
                            />
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

        {/* Legend & Detail View Container */}
        <div className="mt-4 flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-center">
          {/* Legend */}
          <div className="flex items-center justify-center gap-1.5">
            <MonoText className="text-xs text-muted-foreground/60">
              {less}
            </MonoText>
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                className="size-3 rounded-[3px]"
                style={{
                  backgroundColor: getContributionColor(
                    lvl as 0 | 1 | 2 | 3 | 4,
                    theme,
                  ),
                }}
              />
            ))}
            <MonoText className="text-xs text-muted-foreground/60">
              {more}
            </MonoText>
          </div>

          {/* Selected Day Details (Mobile Only) */}
          {isMobile && (
            <div
              className={cn(
                "flex min-h-[48px] items-center justify-center rounded-lg border border-overlay-border bg-background px-4 py-2 transition-all duration-300",
                selectedDay ? "translate-y-0" : "translate-y-0",
              )}
            >
              {selectedDay && (
                <div className="flex items-center gap-3">
                  <div
                    className="size-3 rounded-sm border border-overlay-border"
                    style={{
                      backgroundColor: getContributionColor(
                        selectedDay.level,
                        theme,
                      ),
                    }}
                  />
                  <div className="flex flex-col">
                    <MonoText className="text-[10px] font-bold text-foreground">
                      {selectedDay.count}{" "}
                      {selectedDay.count === 1 ? commitLabel : commitsLabel}
                    </MonoText>
                    <MonoText className="text-[9px] text-muted-foreground/70">
                      {parseLocalDate(selectedDay.date).toLocaleDateString(
                        undefined,
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </MonoText>
                  </div>
                </div>
              )}
              {!selectedDay && (
                <div className="flex items-center gap-2">
                  <div className="size-1.5 rounded-full bg-accent animate-pulse" />
                  <MonoText className="text-[10px] text-muted-foreground italic">
                    {tapHint}
                  </MonoText>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-end px-4">
          <a
            href={`https://github.com/${encodeURIComponent(username)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-[3px] font-mono text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
          >
            @{username}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    );
  },
);

GitHubContributionGraph.displayName = "GitHubContributionGraph";
