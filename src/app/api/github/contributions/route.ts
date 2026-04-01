import { fetchGitHubContributions } from "@/lib/github";
import { createGitHubRoute } from "../utils";

export const revalidate = 86400;

export const GET = createGitHubRoute(fetchGitHubContributions);
