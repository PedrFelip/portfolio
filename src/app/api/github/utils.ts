import { NextResponse } from "next/server";

// TODO(refactor)[P1]: GitHub username hardcoded
const GITHUB_USERNAME = "pedrfelip";

export function createGitHubRoute<T>(
  fetcher: (username: string) => Promise<T>,
) {
  return async function GET() {
    try {
      const data = await fetcher(GITHUB_USERNAME);
      return NextResponse.json({
        success: true,
        // TODO(refactor)[P1]: Object() spread hack
        data: { ...Object(data), username: GITHUB_USERNAME },
      });
    } catch (error) {
      console.error("GitHub API error:", error);
      // TODO(refactor)[P2]: raw error.message exposed to clients
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
