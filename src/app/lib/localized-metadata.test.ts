import { describe, expect, it } from "bun:test";
import { localizedAlternates } from "./localized-metadata";
import { siteConfig } from "./site";

describe("localizedAlternates", () => {
  it("preserves the home canonical without a trailing slash", () => {
    expect(localizedAlternates("pt")).toEqual({
      canonical: `${siteConfig.url}/pt`,
      languages: {
        en: `${siteConfig.url}/en`,
        pt: `${siteConfig.url}/pt`,
        "x-default": `${siteConfig.url}/en`,
      },
    });
  });

  it.each(["en", "pt"] as const)(
    "keeps the blog path in every alternate for %s",
    (language) => {
      expect(localizedAlternates(language, "/blog")).toEqual({
        canonical: `${siteConfig.url}/${language}/blog`,
        languages: {
          en: `${siteConfig.url}/en/blog`,
          pt: `${siteConfig.url}/pt/blog`,
          "x-default": `${siteConfig.url}/en/blog`,
        },
      });
    },
  );
});
