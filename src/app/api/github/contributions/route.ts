import { NextResponse } from "next/server";
import { fetchGitHubContributions } from "@/lib/github";

export const runtime = "edge";
export const revalidate = 86400; // Revalidate every 24 hours

export async function GET() {
  try {
    const username = "pedrfelip"; // Your GitHub username

    const data = await fetchGitHubContributions(username);

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
            : "Failed to fetch GitHub data",
      },
      { status: 500 },
    );
  }
}
