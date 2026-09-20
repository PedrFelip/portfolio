import "server-only";

/**
 * GitHub API utilities
 * Uses GraphQL API to fetch contribution data
 */

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionData {
  weeks: ContributionWeek[];
  totalContributions: number;
}

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
 * Fetch GitHub contribution data using GraphQL API
 * Requires GITHUB_TOKEN environment variable
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

export async function fetchGitHubContributions(
  username: string,
): Promise<ContributionData> {
  const query = `
    query($userName:String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const data = await fetchGraphQL<{
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }[];
          }[];
        };
      };
    };
  }>(query, { userName: username });

  const calendar = data.user.contributionsCollection.contributionCalendar;

  // TODO(refactor)[P1]: levelMap recreated on every call
  const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };

  const weeks: ContributionWeek[] = calendar.weeks.map(
    (week: {
      contributionDays: {
        date: string;
        contributionCount: number;
        contributionLevel: string;
      }[];
    }) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level:
          levelMap[day.contributionLevel] ??
          (day.contributionCount > 0 ? 1 : 0),
      })),
    }),
  );

  return {
    weeks,
    totalContributions: calendar.totalContributions,
  };
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
