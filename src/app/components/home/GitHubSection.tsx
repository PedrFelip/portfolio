"use client";

import { useEffect, useState } from "react";
import type { ContributionData } from "@/lib/github";
import { GitHubContributionGraph } from "./GitHubContributionGraph";

interface GitHubSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

/**
 * GitHubSection - Complete section with header and contribution graph
 * Follows the same pattern as other sections (Features, Projects, etc.)
 *
 * Design:
 * - Section header with label, title, description
 * - Centered contribution graph
 * - Consistent spacing with other sections
 * - 4px grid system (12px, 16px, 24px, 32px, 48px)
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

  if (loading) {
    return null;
  }

  if (error || !data) {
    return null;
  }

  return (
    <section id="github-activity" className={`relative ${className || ""}`}>
      {/* Section Header - same pattern as Features section */}
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="pt-12 pb-8">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {subtitle}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {/* Contribution Graph - centered with consistent padding */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-12">
        <div className="flex justify-center">
          <GitHubContributionGraph data={data} username="" />
        </div>
      </div>
    </section>
  );
}
