/**
 * Search index types shared between server (route handler)
 * and client (SearchCommand + Fuse.js).
 */

/** Static page entry in the search index */
export interface SearchPage {
  type: "page";
  label: string;
  href: string;
  /** Extra keywords for matching (e.g. synonyms, translations) */
  keywords: string[];
}

/** Blog post entry in the search index */
export interface SearchPost {
  type: "post";
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  readingTime: number;
  /** Full content stripped of markdown — for fuzzy matching */
  content: string;
  /** Section headings — high-value search targets */
  headings: string[];
}

/** Union type for the flat search index */
export type SearchItem = SearchPage | SearchPost;
