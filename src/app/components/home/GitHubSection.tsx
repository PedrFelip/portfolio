"use client";

import { useEffect, useState } from "react";
import type { ContributionData } from "@/lib/github";
import { GitHubContributionGraph } from "./GitHubContributionGraph";

interface GitHubSectionProps {
  className?: string;
}

/**
 * GitHubSection - Fetches and displays GitHub contribution graph
 * Minimal blueprint design - no extra text or labels
 */
export function GitHubSection({ className }: GitHubSectionProps) {
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
    <div className={`flex justify-center ${className || ""}`}>
      <GitHubContributionGraph data={data} username="" />
    </div>
  );
}
