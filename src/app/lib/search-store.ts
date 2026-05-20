import type Fuse from "fuse.js";

import { create } from "zustand";
import type { SearchItem } from "@/lib/search-types";

interface SearchState {
  isOpen: boolean;
  /** Search index — fetched once, cached in memory */
  items: SearchItem[] | null;
  /** Fuse.js instance — initialized once with the index */
  fuse: Fuse<SearchItem> | null;
  /** Whether the index has been loaded (success or error) */
  loaded: boolean;
  /** Loading in progress flag — prevents duplicate fetches */
  loading: boolean;
  /** Error message if index fetch failed, null otherwise */
  error: string | null;

  open: () => void;
  close: () => void;
  toggle: () => void;
  /**
   * Fetch the search index from /api/search and initialize Fuse.js.
   * Safe to call multiple times — only fetches once.
   */
  loadIndex: () => Promise<void>;
  /** Reset error state and retry loading the index */
  retry: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  isOpen: false,
  items: null,
  fuse: null,
  loaded: false,
  loading: false,
  error: null,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),

  retry: () => {
    set({
      items: null,
      fuse: null,
      loaded: false,
      loading: false,
      error: null,
    });
    get().loadIndex();
  },

  loadIndex: async () => {
    const state = get();
    if (state.loaded || state.loading) return;

    set({ loading: true });

    try {
      const res = await fetch("/api/search");
      if (!res.ok) throw new Error(`Search index fetch failed: ${res.status}`);

      const items: SearchItem[] = await res.json();

      const FuseClass = (await import("fuse.js")).default;
      const fuse = new FuseClass(items, {
        keys: [
          { name: "title", weight: 2.0 },
          { name: "headings", weight: 1.5 },
          { name: "tags", weight: 1.2 },
          { name: "excerpt", weight: 1.0 },
          { name: "keywords", weight: 0.8 },
          { name: "label", weight: 1.0 },
          { name: "content", weight: 0.3 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
        minMatchCharLength: 2,
        includeScore: true,
      });

      set({ items, fuse, loaded: true, loading: false, error: null });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load search index";
      console.error("Failed to load search index:", error);
      set({ loaded: true, loading: false, error: message });
    }
  },
}));
