"use client";

import { Search } from "@/components/ui/icons";
import type { Language } from "@/lib/i18n";
import type { SearchItem } from "@/lib/search-types";
import { SearchResultItem } from "./SearchResultItem";

interface SearchResultsProps {
  isLoading: boolean;
  error: string | null;
  isSearching: boolean;
  items: SearchItem[];
  activeIndex: number;
  language: Language;
  retry: () => void;
  onNavigate: (item: SearchItem) => void;
}

export function SearchResults({
  isLoading,
  error,
  isSearching,
  items,
  activeIndex,
  language,
  retry,
  onNavigate,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10 text-muted-foreground/40">
        <div className="size-4 border border-muted-foreground/20 border-t-muted-foreground/60 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
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
    );
  }

  if (items.length === 0) {
    if (!isSearching) return null;
    return (
      <div className="flex flex-col items-center justify-center py-10 text-muted-foreground/40">
        <Search className="size-6 mb-2" />
        <p className="text-xs">
          {language === "pt"
            ? "Nenhum resultado encontrado"
            : "No results found"}
        </p>
      </div>
    );
  }

  return (
    <div className="py-1" role="listbox">
      {/* TODO(refactor)[P2]: role="listbox" but children are Links */}
      {items.map((item, index) => (
        <SearchResultItem
          key={item.type === "page" ? item.href : item.slug}
          item={item}
          isActive={index === activeIndex}
          index={index}
          language={language}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
