"use client";

import { MoveHorizontal } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MonoText } from "@/components/ui";
import type { ContributionData, ContributionDay } from "@/lib/github";
import { getContributionColor } from "@/lib/github";
import { cn } from "@/lib/utils";

interface GitHubContributionGraphProps {
  data: ContributionData;
  username: string;
  swipeHint: string;
  less: string;
  more: string;
  tapHint: string;
}

/**
 * GitHubContributionGraph - Responsive Heatmap
 * Features:
 * - Adaptive week slicing (24 weeks on mobile, 52 on desktop)
 * - Tap-to-detail interaction for mobile (replaces hover tooltips)
 * - Optimized hit areas for small cells
 * - Swipe hint for better mobile discoverability
 */
export const GitHubContributionGraph = memo(
  ({ data, swipeHint, less, more, tapHint }: GitHubContributionGraphProps) => {
    const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
    const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
    const [scrollState, setScrollState] = useState({ left: false, right: true });
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Detect mobile for adaptive week slicing
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

    // Handle scroll for dynamic masks
    const handleScroll = useCallback(() => {
      if (!scrollContainerRef.current) return;
      
      // Mark as scrolled to hide the hint
      if (!hasScrolled && scrollContainerRef.current.scrollLeft > 10) {
        setHasScrolled(true);
      }

      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setScrollState({
        left: scrollLeft > 10,
        right: scrollLeft < scrollWidth - clientWidth - 10,
      });
    }, [hasScrolled]);

    // Initial scroll check and effect
    useEffect(() => {
      handleScroll();
    }, [handleScroll, recentWeeks]);

    return (
      <div className="relative w-full max-w-full group/graph">
        {/* Swipe Hint - Only mobile, only before first scroll */}
        {isMobile && !hasScrolled && scrollState.right && (
          <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-in-fade">
            <div className="flex flex-col items-center gap-2 rounded-full bg-background/80 px-5 py-2.5 backdrop-blur-md border border-white/10 shadow-2xl animate-pulse">
               <MoveHorizontal className="size-4 text-accent" />
               <span className="text-[9px] text-foreground font-bold uppercase tracking-[0.2em]">{swipeHint}</span>
            </div>
          </div>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative w-full overflow-x-auto overflow-y-visible pb-10 pt-16 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent md:scrollbar-hide flex md:justify-center px-4"
        >
          <div className="relative inline-flex flex-shrink-0">
            {/* Minimal contribution grid */}
            <div className="flex gap-1.5 sm:gap-1">
              {recentWeeks.map((week, index) => {
                const weekKey = week.days[0]?.date || `week-${index}`;
                return (
                  <div key={weekKey} className="flex flex-col gap-1.5 sm:gap-1">
                    {week.days.map((day) => (
                      <button
                        key={day.date}
                        type="button"
                        className={cn(
                          "group relative h-[10px] w-[10px] rounded-[3px] border border-white/[0.08] transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
                          "hover:border-white/[0.2] hover:scale-110 hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                          selectedDay?.date === day.date && "border-accent ring-1 ring-accent z-10 scale-110",
                          // Larger touch target (hidden)
                          "before:absolute before:-inset-2 before:z-[-1]",
                        )}
                        style={{
                          backgroundColor: getContributionColor(day.level),
                        }}
                        onMouseEnter={() => !isMobile && setHoveredDay(day)}
                        onMouseLeave={() => !isMobile && setHoveredDay(null)}
                        onClick={() => {
                          if (isMobile) {
                            setSelectedDay(selectedDay?.date === day.date ? null : day);
                          }
                        }}
                        aria-label={`${day.count} contributions on ${day.date}`}
                      >
                        {/* Enhanced Tooltip (Desktop Only) */}
                        {!isMobile && hoveredDay?.date === day.date && (
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

        {/* Legend & Detail View Container */}
        <div className="mt-4 flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-center">
          {/* Legend */}
          <div className="flex items-center justify-center gap-1.5">
            <MonoText className="text-[10px] text-muted-foreground/60">
              {less}
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
              {more}
            </MonoText>
          </div>

          {/* Selected Day Details (Mobile Only) */}
          {isMobile && (
            <div className={cn(
              "flex min-h-[48px] items-center justify-center rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-2 transition-all duration-300",
              selectedDay ? "opacity-100 translate-y-0" : "opacity-60 translate-y-0"
            )}>
              {selectedDay && (
                <div className="flex items-center gap-3">
                  <div 
                    className="size-3 rounded-sm border border-white/10"
                    style={{ backgroundColor: getContributionColor(selectedDay.level) }}
                  />
                  <div className="flex flex-col">
                    <MonoText className="text-[10px] font-bold text-foreground">
                      {selectedDay.count} commit{selectedDay.count !== 1 ? "s" : ""}
                    </MonoText>
                    <MonoText className="text-[9px] text-muted-foreground/70">
                      {new Date(selectedDay.date).toLocaleDateString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
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
      </div>
    );
  },
);

GitHubContributionGraph.displayName = "GitHubContributionGraph";
