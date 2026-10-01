import "server-only";

import {
  buildContributionData,
  type ContributionData,
  type ContributionDay,
  parseContributionDate,
} from "./contribution-data";

export type { ContributionData, ContributionDay } from "./contribution-data";

export interface GitHubStats {
  repositories: number;
  followers: number;
  following: number;
  stars: number;
  forks: number;
}

interface GitHubRepoNode {
  stargazerCount: number;
  forkCount: number;
}

/**
 * Fetch GitHub stats through GraphQL using GITHUB_TOKEN.
 */
async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, string>,
): Promise<T> {
  const token = process.env.GITHUB_TOKEN;

  // TODO(refactor)[P2]: throw typed GitHubConfigurationError for missing env
  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(10_000),
    // TODO(refactor)[P1]: revalidate=86400 duplicated across 4 files
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    // TODO(refactor)[P1]: data.errors[0] without length check
    throw new Error(`GraphQL error: ${data.errors[0].message}`);
  }

  // TODO(refactor)[P3]: blind as T cast on unvalidated GraphQL JSON
  return data.data as T;
}

/** Fetch the last year of activity using the public Contributions API. */
export async function fetchGitHubContributions(
  username: string,
): Promise<ContributionData> {
  const apiUrl =
    process.env.NEXT_PUBLIC_GITHUB_CONTRIBUTIONS_API_URL ??
    "https://github-contributions-api.jogruber.de/v4";
  const url = new URL(
    `${apiUrl.replace(/\/$/, "")}/${encodeURIComponent(username)}`,
  );
  url.searchParams.set("y", "last");

  const response = await fetch(url, {
    signal: AbortSignal.timeout(10_000),
    next: { revalidate: 86400 },
  });
  if (!response.ok) {
    throw new Error(`Contribution API error: ${response.status}`);
  }

  const payload: unknown = await response.json();
  if (
    !payload ||
    typeof payload !== "object" ||
    !("contributions" in payload) ||
    !Array.isArray(payload.contributions) ||
    !payload.contributions.every(isContributionDay)
  ) {
    throw new Error("Invalid contribution API response");
  }

  return buildContributionData(payload.contributions);
}

function isContributionDay(value: unknown): value is ContributionDay {
  if (!value || typeof value !== "object") return false;
  const day = value as Record<string, unknown>;
  return (
    typeof day.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
    !Number.isNaN(parseContributionDate(day.date).getTime()) &&
    parseContributionDate(day.date).toISOString().slice(0, 10) === day.date &&
    typeof day.count === "number" &&
    Number.isSafeInteger(day.count) &&
    day.count >= 0 &&
    typeof day.level === "number" &&
    Number.isInteger(day.level) &&
    day.level >= 0 &&
    day.level <= 4
  );
}

/**
 * Fetch general GitHub stats using GraphQL API
 */
export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const query = `
    query($userName:String!) {
      user(login: $userName) {
        repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
          totalCount
          nodes {
            stargazerCount
            forkCount
          }
        }
        followers {
          totalCount
        }
        following {
          totalCount
        }
      }
    }
  `;

  const data = await fetchGraphQL<{
    user: {
      repositories: { totalCount: number; nodes: GitHubRepoNode[] };
      followers: { totalCount: number };
      following: { totalCount: number };
    };
  }>(query, { userName: username });

  const repos = data.user.repositories.nodes;

  return {
    repositories: data.user.repositories.totalCount,
    followers: data.user.followers.totalCount,
    following: data.user.following.totalCount,
    stars: repos.reduce((sum, repo) => sum + repo.stargazerCount, 0),
    forks: repos.reduce((sum, repo) => sum + repo.forkCount, 0),
  };
}
