import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog-data";
import { SUPPORTED_LOCALES } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

const STATIC_SECTIONS = ["", "/about", "/projects"] as const;

/**
 * Sitemap covering all localized static routes (home, about, projects)
 * for every supported locale, the blog index for every locale, and each
 * blog post under its canonical Portuguese path only (posts are
 * monolingual PT — see blog [slug] canonical strategy).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const section of STATIC_SECTIONS) {
    for (const locale of SUPPORTED_LOCALES) {
      entries.push({
        url: `${siteConfig.url}/${locale}${section}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: section === "" ? 1 : 0.8,
      });
    }
  }

  for (const locale of SUPPORTED_LOCALES) {
    entries.push({
      url: `${siteConfig.url}/${locale}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Posts are PT only — canonical is /pt/blog/<slug>. Listing them once
  // avoids duplicate-content noise in the index.
  for (const post of getAllPosts()) {
    entries.push({
      url: `${siteConfig.url}/pt/blog/${post.slug}`,
      lastModified: new Date(post.modifiedDate || post.date),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
