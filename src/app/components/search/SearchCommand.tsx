"use client";

import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "@/components/ui/icons";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useLanguage } from "@/lib/language-store";
import { useSearchStore } from "@/lib/search-store";
import type { SearchItem, SearchPage, SearchPost } from "@/lib/search-types";
import { SearchFooter } from "./SearchFooter";
import { SearchResults } from "./SearchResults";
import { getNextResultIndex, getSearchHref } from "./search-navigation";

// ─── Component ──────────────────────────────────────────────

export const SearchCommand = memo(function SearchCommand() {
  const isOpen = useSearchStore((s) => s.isOpen);
  const close = useSearchStore((s) => s.close);
  const fuse = useSearchStore((s) => s.fuse);
  const items = useSearchStore((s) => s.items);
  const loaded = useSearchStore((s) => s.loaded);
  const loading = useSearchStore((s) => s.loading);
  const error = useSearchStore((s) => s.error);
  const retry = useSearchStore((s) => s.retry);
  const loadIndex = useSearchStore((s) => s.loadIndex);
  const router = useRouter();
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const placeholder =
    language === "pt"
      ? "Pesquisar páginas, posts..."
      : "Search pages, posts...";

  // Fetch index on first open
  useEffect(() => {
    if (isOpen && !loaded && !loading) {
      loadIndex();
    }
  }, [isOpen, loaded, loading, loadIndex]);

  // Fuzzy search with Fuse.js — returns ranked results
  const results = useMemo(() => {
    if (!fuse) return [];
    if (!query.trim()) return [];

    return fuse.search(query).map((r) => r.item);
  }, [fuse, query]);

  // When no query, show all items grouped (pages first, then posts)
  const displayItems = useMemo(() => {
    if (query.trim()) return results;
    if (!items) return [];

    const pages = items.filter(
      (item): item is SearchPage => item.type === "page",
    );
    const posts = items.filter(
      (item): item is SearchPost => item.type === "post",
    );
    return [...pages, ...posts];
  }, [query, results, items]);

  useBodyScrollLock(isOpen);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // TODO(refactor)[P1]: void displayItems.length is a no-op
  useEffect(() => {
    void displayItems.length;
    setActiveIndex(0);
  }, [displayItems.length]);

  // Navigate to item
  const navigateTo = useCallback(
    (item: SearchItem) => {
      const href = getSearchHref(item, language);
      close();
      router.push(href, { scroll: true });
    },
    [language, close, router],
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const vimShortcut = e.metaKey || e.ctrlKey;
      const moveDown = e.key === "ArrowDown" || (vimShortcut && e.key === "j");
      const moveUp = e.key === "ArrowUp" || (vimShortcut && e.key === "k");

      if (moveDown || moveUp) {
        if (displayItems.length === 0) return;
        e.preventDefault();
        setActiveIndex((current) =>
          getNextResultIndex(current, moveDown ? 1 : -1, displayItems.length),
        );
      } else if (e.key === "Enter") {
        if (displayItems.length === 0) return;
        e.preventDefault();
        const item = displayItems[activeIndex];
        if (item) navigateTo(item);
      } else if (e.key === "Escape") {
        close();
      }
    },
    [displayItems, activeIndex, close, navigateTo],
  );

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!isOpen) return null;

  const isSearching = query.trim().length > 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm animate-in"
        onClick={close}
        aria-hidden="true"
      />

      {/* Command Palette */}
      <div
        className="relative z-10 w-full max-w-[560px] mx-4 border border-border rounded-lg bg-background shadow-2xl shadow-black/20 animate-scale-in overflow-hidden"
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-label="Search command palette"
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 h-12 border-b border-border">
          <Search className="size-4 text-muted-foreground/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-base md:text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="shrink-0 min-h-[44px] min-w-[44px] md:size-8 flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-150 active:scale-90 touch-manipulation"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center justify-center h-4 min-w-[18px] px-1 rounded-[2px] border border-border/60 bg-surface-2 font-mono text-[9px] leading-none text-muted-foreground/40">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[380px] overflow-y-auto">
          <SearchResults
            isLoading={!loaded && loading}
            error={error}
            isSearching={isSearching}
            items={displayItems}
            activeIndex={activeIndex}
            language={language}
            retry={retry}
            onNavigate={navigateTo}
          />
        </div>

        <SearchFooter />
      </div>
    </div>
  );
});

SearchCommand.displayName = "SearchCommand";
