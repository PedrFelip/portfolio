/**
 * GitHub API utilities
 * Uses GraphQL API to fetch contribution data
 */

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
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
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL error: ${data.errors[0].message}`);
  }

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
 * Get contribution color based on level (blueprint design)
 */
const contributionColorsDark: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "oklch(0.93 0 0 / 3%)",
  1: "oklch(0.75 0 0 / 12%)",
  2: "oklch(0.75 0 0 / 22%)",
  3: "oklch(0.75 0 0 / 38%)",
  4: "oklch(0.75 0 0 / 58%)",
};

const contributionColorsLight: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "oklch(0.13 0 0 / 4%)",
  1: "oklch(0.42 0 0 / 12%)",
  2: "oklch(0.42 0 0 / 22%)",
  3: "oklch(0.42 0 0 / 36%)",
  4: "oklch(0.42 0 0 / 52%)",
};

export function getContributionColor(
  level: 0 | 1 | 2 | 3 | 4,
  theme: "dark" | "light" = "dark",
): string {
  return theme === "dark"
    ? contributionColorsDark[level]
    : contributionColorsLight[level];
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
