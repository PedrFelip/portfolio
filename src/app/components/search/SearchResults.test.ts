import { describe, expect, it } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { SearchItem } from "@/lib/search-types";
import { SearchResults } from "./SearchResults";

const defaultProps = {
  isLoading: false,
  error: null,
  isSearching: false,
  items: [] as SearchItem[],
  activeIndex: 0,
  language: "pt" as const,
  retry: () => {},
  onNavigate: () => {},
};

describe("SearchResults", () => {
  it("does not show an empty search message before a query", () => {
    expect(
      renderToStaticMarkup(createElement(SearchResults, defaultProps)),
    ).toBe("");
  });

  it("shows no-results feedback only after a query", () => {
    const html = renderToStaticMarkup(
      createElement(SearchResults, { ...defaultProps, isSearching: true }),
    );
    expect(html).toContain("Nenhum resultado encontrado");
  });

  it("shows loading instead of premature no-results feedback", () => {
    const html = renderToStaticMarkup(
      createElement(SearchResults, {
        ...defaultProps,
        isLoading: true,
        isSearching: true,
      }),
    );
    expect(html).toContain("animate-spin");
    expect(html).not.toContain("Nenhum resultado encontrado");
  });

  it("offers retry feedback in the selected language", () => {
    const html = renderToStaticMarkup(
      createElement(SearchResults, {
        ...defaultProps,
        language: "en",
        error: "Request failed",
      }),
    );
    expect(html).toContain("Failed to load search index");
    expect(html).toContain("Retry");
    expect(html).not.toContain("No results found");
  });

  it("preserves page links, post metadata and keyboard selection indices", () => {
    const items: SearchItem[] = [
      { type: "page", label: "Home", href: "/", keywords: [] },
      {
        type: "post",
        slug: "error-handling",
        title: "Tratamento de erros",
        excerpt: "",
        content: "",
        headings: [],
        tags: ["Go", "Backend", "HiddenTag"],
        date: "2026-01-01T12:00:00Z",
        readingTime: 7,
      },
    ];
    const html = renderToStaticMarkup(
      createElement(SearchResults, { ...defaultProps, items, activeIndex: 1 }),
    );
    expect(html).toContain('href="/pt"');
    expect(html).toContain('href="/pt/blog/error-handling"');
    expect(html).toContain('data-index="0"');
    expect(html).toContain('data-index="1"');
    expect(html).toContain("Tratamento de erros");
    expect(html).toContain('dateTime="2026-01-01T12:00:00Z"');
    expect(html).toContain("7m");
    expect(html).toContain("Backend");
    expect(html).not.toContain("HiddenTag");
  });
});
