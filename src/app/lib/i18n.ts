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

export const SUPPORTED_LOCALES = ["en", "pt"] as const;
export const SUPPORTED_LANGS = SUPPORTED_LOCALES;

export type Language = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LANGUAGE: Language = "en";
export const LANGUAGE_COOKIE = "NEXT_LOCALE";

export function isLanguage(lang: string | null | undefined): lang is Language {
  return (SUPPORTED_LOCALES as readonly string[]).includes(lang ?? "");
}

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
