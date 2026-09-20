import { describe, expect, it } from "bun:test";
import type { SearchPage, SearchPost } from "@/lib/search-types";
import { getNextResultIndex, getSearchHref } from "./search-navigation";

describe("search navigation", () => {
  it.each(["en", "pt"] as const)(
    "keeps the %s locale in home, page and post links",
    (language) => {
      const page: SearchPage = {
        type: "page",
        label: "Home",
        href: "/",
        keywords: [],
      };
      const post: SearchPost = {
        type: "post",
        slug: "error-handling",
        title: "Errors",
        excerpt: "",
        content: "",
        headings: [],
        tags: [],
        date: "2026-01-01",
        readingTime: 3,
      };
      expect(getSearchHref(page, language)).toBe(`/${language}`);
      expect(getSearchHref({ ...page, href: "/projects" }, language)).toBe(
        `/${language}/projects`,
      );
      expect(getSearchHref(post, language)).toBe(
        `/${language}/blog/error-handling`,
      );
    },
  );

  it("wraps in both directions at the ends of the result list", () => {
    expect(getNextResultIndex(2, 1, 3)).toBe(0);
    expect(getNextResultIndex(0, -1, 3)).toBe(2);
  });

  it("moves to adjacent results without skipping entries", () => {
    expect(getNextResultIndex(1, 1, 4)).toBe(2);
    expect(getNextResultIndex(2, -1, 4)).toBe(1);
  });

  it("keeps a stable selection for empty or single-result lists", () => {
    for (const direction of [-1, 1] as const) {
      expect(getNextResultIndex(0, direction, 0)).toBe(0);
      expect(getNextResultIndex(0, direction, 1)).toBe(0);
    }
  });
});
