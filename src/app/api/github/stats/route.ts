import { fetchGitHubStats } from "@/lib/github";
import { createGitHubRoute } from "../utils";

export const GET = createGitHubRoute(fetchGitHubStats);
