/**
 * Central site configuration — single source of truth for the
 * production URL, author identity, and social profiles.
 *
 * Read by metadataBase, canonical URLs, sitemap, robots, and JSON-LD.
 * Override the domain via NEXT_PUBLIC_SITE_URL when deploying to a
 * custom domain.
 */

const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.vercel.app";

function normalizeUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export const siteConfig = {
  /** Absolute base URL with no trailing slash. */
  url: normalizeUrl(rawUrl),
  name: "Pedro Felipe",
  title: "Pedro Felipe - Backend Engineer & System Architect",
  description:
    "Backend developer passionate about system design, cloud infrastructure, and automation. Building scalable, maintainable systems with Node.js, TypeScript, Go, PostgreSQL, Docker, and Linux.",
  defaultLocale: "en" as const,
  locales: ["en", "pt"] as const,
  author: {
    name: "Pedro Felipe",
    jobTitle: "Backend Engineer & DevOps Enthusiast",
  },
  social: {
    github: "https://github.com/pedrfelip",
    linkedin: "https://www.linkedin.com/in/pedrfelip/",
    x: "https://x.com/pdrdotdev",
    xHandle: "@pdrdotdev",
    email: "mailto:pfsilva190406@gmail.com",
  },
} as const;

/** Build an absolute URL for a path segment. */
export function absoluteUrl(path = ""): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
