"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  FileText,
  Home,
  Search,
  X,
} from "@/components/ui/icons";
import { MonoText } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-store";
import { useSearchStore } from "@/lib/search-store";
import type { SearchItem, SearchPage, SearchPost } from "@/lib/search-types";
import { cn } from "@/lib/utils";

// ─── Helpers ────────────────────────────────────────────────

function buildHref(item: SearchItem, lang: string): string {
  if (item.type === "page") {
    return `/${lang}${item.href === "/" ? "" : item.href}`;
  }
  return `/${lang}/blog/${item.slug}`;
}

const pageIconMap: Record<string, React.ReactNode> = {
  "/": <Home className="size-3.5" />,
};

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

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  // Global Ctrl+K / ⌘K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        useSearchStore.getState().toggle();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    void displayItems.length;
    setActiveIndex(0);
  }, [displayItems.length]);

  // Navigate to item
  const navigateTo = useCallback(
    (item: SearchItem) => {
      const href = buildHref(item, language);
      close();
      router.push(href, { scroll: true });
    },
    [language, close, router],
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        if (displayItems.length === 0) return;
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < displayItems.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        if (displayItems.length === 0) return;
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : displayItems.length - 1,
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
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
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none"
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
              className="shrink-0 text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-150"
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
          {!loaded && loading ? (
            <div className="flex items-center justify-center py-10 text-muted-foreground/40">
              <div className="size-4 border border-muted-foreground/20 border-t-muted-foreground/60 rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground/40">
              <Search className="size-6 mb-2" />
              <p className="text-xs mb-3">
                {language === "pt"
                  ? "Falha ao carregar o índice de busca"
                  : "Failed to load search index"}
              </p>
              <button
                type="button"
                onClick={retry}
                className="text-[10px] font-mono px-2 py-1 rounded-[2px] border border-border/60 bg-surface-2 text-muted-foreground/50 hover:text-muted-foreground hover:border-border transition-colors duration-150"
              >
                {language === "pt" ? "Tentar novamente" : "Retry"}
              </button>
            </div>
          ) : isSearching && displayItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground/40">
              <Search className="size-6 mb-2" />
              <p className="text-xs">
                {language === "pt"
                  ? "Nenhum resultado encontrado"
                  : "No results found"}
              </p>
            </div>
          ) : !isSearching && displayItems.length === 0 ? null : (
            <div className="py-1" role="listbox">
              {displayItems.map((item, index) => (
                <ResultItem
                  key={item.type === "page" ? item.href : item.slug}
                  item={item}
                  isActive={index === activeIndex}
                  index={index}
                  language={language}
                  onNavigate={navigateTo}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border bg-surface-1/50">
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground/30">
            <kbd className="inline-flex items-center justify-center h-3.5 min-w-[14px] px-0.5 rounded-[2px] border border-border/60 bg-surface-2 font-mono text-[8px] leading-none text-muted-foreground/40">
              ↑
            </kbd>
            <kbd className="inline-flex items-center justify-center h-3.5 min-w-[14px] px-0.5 rounded-[2px] border border-border/60 bg-surface-2 font-mono text-[8px] leading-none text-muted-foreground/40">
              ↓
            </kbd>
            <span className="ml-0.5">navigate</span>
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground/30">
            <kbd className="inline-flex items-center justify-center h-3.5 min-w-[14px] px-0.5 rounded-[2px] border border-border/60 bg-surface-2 font-mono text-[8px] leading-none text-muted-foreground/40">
              ↵
            </kbd>
            <span className="ml-0.5">open</span>
          </span>
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground/30 ml-auto">
            <kbd className="inline-flex items-center justify-center h-3.5 min-w-[14px] px-0.5 rounded-[2px] border border-border/60 bg-surface-2 font-mono text-[8px] leading-none text-muted-foreground/40">
              ESC
            </kbd>
            <span className="ml-0.5">close</span>
          </span>
        </div>
      </div>
    </div>
  );
});

SearchCommand.displayName = "SearchCommand";

// ─── Result Item ────────────────────────────────────────────

interface ResultItemProps {
  item: SearchItem;
  isActive: boolean;
  index: number;
  language: string;
  onNavigate: (item: SearchItem) => void;
}

const ResultItem = memo(function ResultItem({
  item,
  isActive,
  index,
  language,
  onNavigate,
}: ResultItemProps) {
  const href = buildHref(item, language);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate(item);
    },
    [onNavigate, item],
  );

  if (item.type === "page") {
    const icon = pageIconMap[item.href] ?? <FileText className="size-3.5" />;

    return (
      <Link
        href={href}
        onClick={handleClick}
        data-index={index}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 mx-1 rounded-lg transition-colors duration-100",
          isActive
            ? "bg-accent/[0.08] text-foreground"
            : "text-muted-foreground",
        )}
      >
        <span
          className={cn(
            "shrink-0 size-7 rounded-lg border border-border/60 flex items-center justify-center transition-colors duration-100",
            isActive
              ? "border-accent/30 text-accent bg-accent/[0.05]"
              : "text-muted-foreground/50",
          )}
        >
          {icon}
        </span>
        <span className="text-sm font-medium">{item.label}</span>
        <ArrowRight
          className={cn(
            "size-3 ml-auto transition-opacity duration-100",
            isActive ? "opacity-60" : "opacity-0",
          )}
          aria-hidden="true"
        />
      </Link>
    );
  }

  const formattedDate = new Date(item.date).toLocaleDateString(
    language === "pt" ? "pt-BR" : "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );

  return (
    <Link
      href={href}
      onClick={handleClick}
      data-index={index}
      className={cn(
        "flex items-start gap-3 px-4 py-2.5 mx-1 rounded-lg transition-colors duration-100",
        isActive ? "bg-accent/[0.08] text-foreground" : "text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "shrink-0 size-7 rounded-lg border border-border/60 flex items-center justify-center mt-0.5 transition-colors duration-100",
          isActive
            ? "border-accent/30 text-accent bg-accent/[0.05]"
            : "text-muted-foreground/50",
        )}
      >
        <FileText className="size-3.5" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{item.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="inline-flex items-center gap-1 text-muted-foreground/50">
            <Calendar className="size-2.5" aria-hidden="true" />
            <MonoText className="text-[10px]">
              <time dateTime={item.date}>{formattedDate}</time>
            </MonoText>
          </span>
          <span className="inline-flex items-center gap-1 text-muted-foreground/50">
            <Clock className="size-2.5" aria-hidden="true" />
            <MonoText className="text-[10px]">{item.readingTime}m</MonoText>
          </span>
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono px-1 py-px rounded-[2px] border border-border/40 text-muted-foreground/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <ArrowRight
        className={cn(
          "size-3 shrink-0 mt-1.5 transition-opacity duration-100",
          isActive ? "opacity-60" : "opacity-0",
        )}
        aria-hidden="true"
      />
    </Link>
  );
});

ResultItem.displayName = "ResultItem";
