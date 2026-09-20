"use client";

import Link from "next/link";
import { memo, useCallback } from "react";
import {
  ArrowRight,
  Calendar,
  Clock,
  FileText,
  Home,
} from "@/components/ui/icons";
import { MonoText } from "@/components/ui/typography";
import type { Language } from "@/lib/i18n";
import type { SearchItem, SearchPost } from "@/lib/search-types";
import { cn } from "@/lib/utils";
import { getSearchHref } from "./search-navigation";

const pageIconMap: Record<string, React.ReactNode> = {
  "/": <Home className="size-3.5" />,
};

interface SearchResultItemProps {
  item: SearchItem;
  isActive: boolean;
  index: number;
  language: Language;
  onNavigate: (item: SearchItem) => void;
}

export const SearchResultItem = memo(function SearchResultItem({
  item,
  isActive,
  index,
  language,
  onNavigate,
}: SearchResultItemProps) {
  const href = getSearchHref(item, language);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate(item);
    },
    [onNavigate, item],
  );

  return (
    <Link
      href={href}
      onClick={handleClick}
      data-index={index}
      className={cn(
        "flex items-center gap-3 px-4 py-3 md:py-2.5 mx-1 rounded-lg transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-[0.99] active:bg-accent/[0.12] min-h-[48px] md:min-h-[56px] touch-manipulation",
        isActive ? "bg-accent/[0.08] text-foreground" : "text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "shrink-0 size-7 rounded-lg border border-border/60 flex items-center justify-center transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
          isActive
            ? "border-accent/30 text-accent bg-accent/[0.05]"
            : "text-muted-foreground/50",
        )}
      >
        {pageIconMap[item.type === "page" ? item.href : ""] ?? (
          <FileText className="size-3.5" />
        )}
      </span>
      {item.type === "page" ? (
        <span className="text-sm font-medium">{item.label}</span>
      ) : (
        <PostResultSummary item={item} language={language} />
      )}
      <ArrowRight
        className={cn(
          "size-3 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]",
          item.type === "page" ? "ml-auto" : "shrink-0",
          isActive ? "opacity-60 translate-x-0" : "opacity-0 -translate-x-1.5",
        )}
        aria-hidden="true"
      />
    </Link>
  );
});

SearchResultItem.displayName = "SearchResultItem";

function PostResultSummary({
  item,
  language,
}: {
  item: SearchPost;
  language: Language;
}) {
  const formattedDate = new Date(item.date).toLocaleDateString(
    language === "pt" ? "pt-BR" : "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );

  return (
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
  );
}
