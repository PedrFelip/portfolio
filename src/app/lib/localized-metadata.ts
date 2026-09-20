import { DEFAULT_LANGUAGE, type Language, SUPPORTED_LOCALES } from "./i18n";
import { siteConfig } from "./site";

interface LocalizedAlternates {
  canonical: string;
  languages: Record<string, string>;
}

export function localizedAlternates(
  language: Language,
  path: "" | `/${string}` = "",
): LocalizedAlternates {
  const languages: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    languages[locale] = `${siteConfig.url}/${locale}${path}`;
  }
  languages["x-default"] = languages[DEFAULT_LANGUAGE];

  return { canonical: languages[language], languages };
}
