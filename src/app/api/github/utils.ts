import { io } from "next/cache";
import { NextResponse } from "next/server";

// TODO(refactor)[P1]: GitHub username hardcoded
const GITHUB_USERNAME = "pedrfelip";
const GITHUB_CACHE_CONTROL =
  "public, max-age=300, s-maxage=86400, stale-while-revalidate=604800";

export function createGitHubRoute<T extends object>(
  fetcher: (username: string) => Promise<T>,
) {
  return async function GET() {
    // GitHub data requires a runtime secret. Keep it out of the static shell;
    // the underlying fetch remains cached by Next's persistent Data Cache.
    await io();

    try {
      const data = await fetcher(GITHUB_USERNAME);
      return NextResponse.json(
        {
          success: true,
          data: { ...data, username: GITHUB_USERNAME },
        },
        {
          headers: {
            "Cache-Control": GITHUB_CACHE_CONTROL,
          },
        },
      );
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
        {
          status: 500,
          headers: { "Cache-Control": "private, no-store" },
        },
      );
    }
  };
}
