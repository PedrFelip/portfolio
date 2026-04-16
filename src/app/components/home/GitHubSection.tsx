import { AlignedFlickeringGrid } from "@/components/blueprint/AlignedFlickeringGrid";
import { DotPattern } from "@/components/blueprint/DotPattern";
import { CountUp, Reveal } from "@/components/common";
import { fetchGitHubContributions } from "@/lib/github";
import { cn } from "@/lib/utils";
import { GitHubContributionGraph } from "./GitHubContributionGraph";

interface GitHubSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  username?: string;
  swipeHint?: string;
  less?: string;
  more?: string;
  tapHint?: string;
  commitLabel?: string;
  commitsLabel?: string;
  commitsLastYearLabel?: string;
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
export async function GitHubSection({
  className,
  title = "GitHub Activity",
  subtitle = "Commit History",
  description = "Daily contributions and coding activity over the past year.",
  username = "pedrfelip",
  swipeHint = "Swipe",
  less = "Less",
  more = "More",
  tapHint = "Tap a cell for details",
  commitLabel = "commit",
  commitsLabel = "commits",
  commitsLastYearLabel = "Commits last year",
}: GitHubSectionProps) {
  const data = await fetchGitHubContributions(username).catch(() => null);

  if (!data) {
    return null;
  }

  return (
    <section id="github-activity" className={cn("relative", className)}>
      {/* 3-Column Header Grid aligned with Features Section Grid */}
      <div className="rail-bounded overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Info Content */}
          <div className="px-6 py-12 sm:px-8 sm:py-12">
            <Reveal
              as="p"
              className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60"
            >
              {subtitle}
            </Reveal>
            <Reveal
              as="h2"
              delay={0.06}
              className="mt-4 text-3xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
            >
              {title}
            </Reveal>
            <Reveal
              as="p"
              delay={0.12}
              className="mt-3 max-w-md text-base leading-relaxed text-muted-foreground"
            >
              {description}
            </Reveal>
          </div>

          {/* Column 2: Commit Stats - Balanced & Centered */}
          <div className="flex flex-col justify-center px-6 py-12 border-t border-dashed border-border sm:border-t-0 sm:border-l sm:py-12 lg:px-10 hover:bg-accent/10 transition-colors duration-300">
            <div className="flex flex-col items-start sm:items-center text-left sm:text-center">
              <CountUp
                value={data.totalContributions}
                format
                className="text-5xl font-bold tracking-tighter text-accent transition-colors duration-200 sm:text-6xl tabular-nums"
              />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/70 mt-2">
                {commitsLastYearLabel}
              </span>
            </div>
          </div>

          {/* Column 3: Decorative Flickering Grid - Responsive Display */}
          <div className="relative border-t border-dashed border-border lg:border-t-0 lg:border-l sm:col-span-2 lg:col-span-1 overflow-hidden min-h-[200px] sm:min-h-[240px] lg:min-h-0 group hover:bg-accent/5 transition-colors duration-300">
            <AlignedFlickeringGrid
              side="right"
              className="absolute inset-0 h-full w-full !flex"
            />
            {/* Blueprint corner detail */}
            <div className="absolute right-2 bottom-2 size-2 border-r border-b border-accent/40 transition-colors group-hover:border-accent/60" />
          </div>
        </div>
      </div>

      {/* Contribution Graph Area - Aligned to Rails with background texture */}
      <div className="rail-bounded border-t border-dashed border-border bg-background overflow-hidden">
        <div className="relative py-8 sm:py-16">
          {/* Smooth background pattern with radial mask */}
          <DotPattern
            className="opacity-[0.15] pointer-events-none"
            style={{
              maskImage:
                "radial-gradient(circle at center, white, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, white, transparent 80%)",
            }}
          />

          <div className="relative z-10">
            <GitHubContributionGraph
              data={data}
              username={username}
              swipeHint={swipeHint}
              less={less}
              more={more}
              tapHint={tapHint}
              commitLabel={commitLabel}
              commitsLabel={commitsLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
