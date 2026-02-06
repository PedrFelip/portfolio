import { aboutEn } from "./content/about.en";
import { aboutPt } from "./content/about.pt";
import { blogEn } from "./content/blog.en";
import { blogPt } from "./content/blog.pt";
import { homeEn } from "./content/home.en";
import { homePt } from "./content/home.pt";
import { linksEn } from "./content/links.en";
import { linksPt } from "./content/links.pt";
import { notFoundEn } from "./content/not-found.en";
import { notFoundPt } from "./content/not-found.pt";
import { projectsEn } from "./content/projects.en";
import { projectsPt } from "./content/projects.pt";
import { sharedEn } from "./content/shared.en";
import { sharedPt } from "./content/shared.pt";

export type Language = "en" | "pt";

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  pt: "Português",
};

export const DEFAULT_LANGUAGE: Language = "en";

export const translations = {
  en: {
    ...sharedEn,
    ...homeEn,
    ...aboutEn,
    ...blogEn,
    ...linksEn,
    ...notFoundEn,
    ...projectsEn,
  },
  pt: {
    ...sharedPt,
    ...homePt,
    ...aboutPt,
    ...blogPt,
    ...linksPt,
    ...notFoundPt,
    ...projectsPt,
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
