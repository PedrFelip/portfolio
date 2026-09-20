import type { Language } from "@/lib/i18n";
import type { SearchItem } from "@/lib/search-types";

export function getSearchHref(item: SearchItem, language: Language): string {
  if (item.type === "page") {
    return `/${language}${item.href === "/" ? "" : item.href}`;
  }
  return `/${language}/blog/${item.slug}`;
}

export function getNextResultIndex(
  currentIndex: number,
  direction: -1 | 1,
  resultCount: number,
): number {
  if (resultCount === 0) return 0;
  return (currentIndex + direction + resultCount) % resultCount;
}
