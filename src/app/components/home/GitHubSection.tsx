"use client";

import { useEffect, useState } from "react";
import { AlignedFlickeringGrid } from "@/components/blueprint/AlignedFlickeringGrid";
import type { ContributionData } from "@/lib/github";
import { cn } from "@/lib/utils";
import { GitHubContributionGraph } from "./GitHubContributionGraph";

interface GitHubSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

/**
 * GitHubSection - Complete section with 3-column header and contribution graph
 * Aligned with the blueprint/rail design system.
 *
 * Design:
 * - 3-column header grid (Info, Stats, Decorative Grid)
 * - Dashed internal dividers
 * - Centered contribution graph
 * - Rail-bounded alignment
 */
export function GitHubSection({
  className,
  title = "GitHub Activity",
  subtitle = "Commit History",
  description = "Daily contributions and coding activity over the past year.",
}: GitHubSectionProps) {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/github/contributions");
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || "Failed to fetch GitHub data");
        }

        setData(result.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading || error || !data) {
    return null;
  }

  return (
    <section id="github-activity" className={cn("relative", className)}>
      {/* 3-Column Header Grid aligned with Features Section Grid */}
      <div className="rail-bounded border-t border-border overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Info Content */}
          <div className="px-6 py-10 sm:py-12 lg:px-8">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
              {subtitle}
            </p>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Column 2: Commit Stats - Balanced & Centered */}
          <div className="flex flex-col justify-center px-6 py-10 sm:py-12 border-t border-dashed border-border sm:border-t-0 sm:border-l lg:px-10">
            <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
              <span className="text-5xl font-bold tracking-tighter text-foreground sm:text-6xl tabular-nums">
                {data.totalContributions}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/70 mt-2">
                Commits last year
              </span>
            </div>
          </div>

          {/* Column 3: Decorative Flickering Grid - Responsive Display */}
          {/* Aligned to 3rd column on LG, spans full width or occupies new row on SM */}
          <div className="relative border-t border-dashed border-border lg:border-t-0 lg:border-l sm:col-span-2 lg:col-span-1 overflow-hidden min-h-[140px] sm:min-h-[160px] lg:min-h-0">
            <AlignedFlickeringGrid
              side="right"
              className="absolute inset-0 h-full w-full !flex"
              squareSize={4}
              gridGap={6}
              flickerChance={0.3}
              maxOpacity={0.25}
            />
            {/* Blueprint corner detail */}
            <div className="absolute right-2 bottom-2 size-2 border-r border-b border-border/40" />
          </div>
        </div>
      </div>

      {/* Contribution Graph Area - Aligned to Rails with background texture */}
      <div className="rail-bounded border-t border-dashed border-border bg-white/[0.01]">
        <div className="relative py-12 sm:py-16">
          {/* Subtle background texture - blueprint detail */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,var(--foreground)_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative z-10">
            <GitHubContributionGraph data={data} username="" />
          </div>
        </div>
      </div>
    </section>
  );
}
