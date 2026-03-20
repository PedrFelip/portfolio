import { NextResponse } from "next/server";
import { fetchGitHubStats } from "@/lib/github";

export const runtime = "edge";
export const revalidate = 3600;

export async function GET() {
  try {
    const username = "pedrfelip";

    const data = await fetchGitHubStats(username);

    return NextResponse.json({
      success: true,
      data: {
        ...data,
        username,
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch GitHub stats",
      },
      { status: 500 },
    );
  }
}
