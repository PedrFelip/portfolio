import dynamic from "next/dynamic";
import { SectionBadge, SectionLabel } from "@/components/blueprint";
import { fetchGitHubContributions } from "@/lib/github";
import { cn } from "@/lib/utils";

const GitHubContributionGraph = dynamic(
  () =>
    import("./GitHubContributionGraph").then(
      (mod) => mod.GitHubContributionGraph,
    ),
  {
    loading: () => (
      <div className="h-[140px] w-full max-w-4xl rounded border border-overlay-border bg-surface-2" />
    ),
  },
);

// TODO(refactor)[P2]: 11 translation props drilled
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
 * GitHubSection - chanhdai.com inspired panel layout
 *
 * Structure:
 * - Header row: subtitle + title + stats (inline)
 * - Content: contribution graph with dot pattern bg
 */
export async function GitHubSection({
  className,
  title = "GitHub Activity",
  subtitle = "Commit History",
  description = "Daily contributions and coding activity over the past year.",
  username = "pedrfelip",
  // TODO(refactor)[P1]: hardcoded username default
  swipeHint = "Swipe",
  less = "Less",
  more = "More",
  tapHint = "Tap a cell for details",
  commitLabel = "commit",
  commitsLabel = "commits",
  commitsLastYearLabel = "Commits last year",
  // TODO(refactor)[P1]: hardcoded English defaults despite i18n
}: GitHubSectionProps) {
  const data = await fetchGitHubContributions(username).catch(() => null);

  if (!data) {
    return null;
  }

  return (
    <section
      id="github-activity"
      data-slot="panel"
      className={cn("bp-panel bp-line-bottom", className)}
    >
      {/* Header */}
      {/* TODO(refactor)[P2]: section header pattern duplicated 8+ times */}
      <SectionBadge className="bp-line-bottom px-4 py-3 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <SectionLabel>{subtitle}</SectionLabel>
            <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <div className="flex flex-col items-start sm:items-end">
            <span className="text-3xl font-bold tracking-tighter text-foreground tabular-nums font-mono sm:text-4xl">
              {data.totalContributions.toLocaleString()}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/70">
              {commitsLastYearLabel}
            </span>
          </div>
        </div>
      </SectionBadge>

      {/* Contribution Graph */}
      <div className="relative py-6 sm:py-10 overflow-hidden">
        <div className="relative z-10 px-4 sm:px-6">
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
    </section>
  );
}
