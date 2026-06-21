import { fetchGitHubStats } from "@/lib/github";
import { createGitHubRoute } from "../utils";

// TODO(refactor)[P1]: revalidate duplicated (also in github.ts fetch)
export const revalidate = 86400;

export const GET = createGitHubRoute(fetchGitHubStats);
