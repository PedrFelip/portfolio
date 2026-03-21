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

export interface GitHubRepoNode {
  stargazerCount: number;
  forkCount: number;
}

/**
 * Fetch GitHub contribution data using GraphQL API
 * Requires GITHUB_TOKEN environment variable
 */
export async function fetchGitHubContributions(
  username: string,
): Promise<ContributionData> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }

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

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { userName: username },
    }),
    next: { revalidate: 86400 }, // Cache for 24 hours
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL error: ${data.errors[0].message}`);
  }

  const calendar = data.data.user.contributionsCollection.contributionCalendar;

  // Map GitHub's contributionLevel (NONE, FIRST_QUARTILE, etc) to numeric levels
  const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };

  interface GitHubDay {
    date: string;
    contributionCount: number;
    contributionLevel: string;
  }

  interface GitHubWeek {
    contributionDays: GitHubDay[];
  }

  const weeks: ContributionWeek[] = calendar.weeks.map((week: GitHubWeek) => ({
    days: week.contributionDays.map((day: GitHubDay) => ({
      date: day.date,
      count: day.contributionCount,
      level:
        levelMap[day.contributionLevel] ?? (day.contributionCount > 0 ? 1 : 0),
    })),
  }));

  return {
    weeks,
    totalContributions: calendar.totalContributions,
  };
}

/**
 * Get contribution color based on level (blueprint design)
 */
export function getContributionColor(level: 0 | 1 | 2 | 3 | 4): string {
  const colors = {
    0: "rgba(255, 255, 255, 0.03)", // No contributions - subtle bg
    1: "rgba(255, 255, 255, 0.08)", // Low
    2: "rgba(255, 255, 255, 0.15)", // Medium
    3: "rgba(255, 255, 255, 0.25)", // High
    4: "rgba(255, 255, 255, 0.40)", // Very high
  };
  return colors[level];
}

/**
 * Fetch general GitHub stats using GraphQL API
 */
export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error("GITHUB_TOKEN environment variable is not set");
  }

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

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { userName: username },
    }),
    next: { revalidate: 86400 }, // Cache for 24 hours
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL error: ${data.errors[0].message}`);
  }

  const user = data.data.user;
  const repos = user.repositories.nodes;

  const totalStars = repos.reduce(
    (sum: number, repo: GitHubRepoNode) => sum + repo.stargazerCount,
    0,
  );
  const totalForks = repos.reduce(
    (sum: number, repo: GitHubRepoNode) => sum + repo.forkCount,
    0,
  );

  return {
    repositories: user.repositories.totalCount,
    followers: user.followers.totalCount,
    following: user.following.totalCount,
    stars: totalStars,
    forks: totalForks,
  };
}
