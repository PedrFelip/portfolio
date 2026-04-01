import { NextResponse } from "next/server";

const GITHUB_USERNAME = "pedrfelip";

export function createGitHubRoute<T>(
  fetcher: (username: string) => Promise<T>,
) {
  return async function GET() {
    try {
      const data = await fetcher(GITHUB_USERNAME);
      return NextResponse.json({
        success: true,
        data: { ...Object(data), username: GITHUB_USERNAME },
      });
    } catch (error) {
      console.error("GitHub API error:", error);
      return NextResponse.json(
        {
          success: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch GitHub data",
        },
        { status: 500 },
      );
    }
  };
}
