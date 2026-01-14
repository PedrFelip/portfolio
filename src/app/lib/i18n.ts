import { aboutContent } from "./content/about-content";
import { blogContent } from "./content/blog-content";
import { homeContent } from "./content/home-content";
import { linksContent } from "./content/links-content";
import { notFoundContent } from "./content/not-found-content";
import { sharedContent } from "./content/shared-content";

export type Language = "en" | "pt";

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  pt: "Português",
};

export const DEFAULT_LANGUAGE: Language = "en";

export const translations = {
  en: {
    // Shared UI (navigation, footer, header, common buttons)
    ...sharedContent.en,

    // Page-specific content
    ...homeContent.en,
    ...aboutContent.en,
    ...blogContent,
    ...linksContent.en,
    ...notFoundContent.en,
  },
  pt: {
    // Shared UI (navigation, footer, header, common buttons)
    ...sharedContent.pt,

    // Page-specific content
    ...homeContent.pt,
    ...aboutContent.pt,
    ...blogContent,
    ...linksContent.pt,
    ...notFoundContent.pt,
  },
};

// Helper to get translation by key path (e.g., "hero.title")
export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split(".");
  let value: unknown = translations[language];

  for (const k of keys) {
    if (typeof value === "object" && value !== null) {
      value = (value as Record<string, unknown>)[k];
    }
  }

  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : key;
};
