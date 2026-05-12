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
  User,
  X,
} from "@/components/ui/icons";
import { MonoText } from "@/components/ui/typography";
import { useLanguage } from "@/lib/language-store";
import { useSearchStore } from "@/lib/search-store";
import { cn } from "@/lib/utils";

// ─── Mock Data ──────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  href: string;
  iconType: "home" | "user" | "file";
  section: "navigation";
}

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: number;
  section: "blog";
}

type SearchItem = NavItem | BlogPostItem;

const MOCK_NAV_EN: NavItem[] = [
  {
    id: "nav-home",
    label: "Home",
    href: "/",
    iconType: "home",
    section: "navigation",
  },
  {
    id: "nav-about",
    label: "About / CV",
    href: "/about",
    iconType: "user",
    section: "navigation",
  },
  {
    id: "nav-projects",
    label: "Projects",
    href: "/projects",
    iconType: "file",
    section: "navigation",
  },
  {
    id: "nav-blog",
    label: "Blog",
    href: "/blog",
    iconType: "file",
    section: "navigation",
  },
];

const MOCK_NAV_PT: NavItem[] = [
  {
    id: "nav-home",
    label: "Início",
    href: "/",
    iconType: "home",
    section: "navigation",
  },
  {
    id: "nav-about",
    label: "Sobre / CV",
    href: "/about",
    iconType: "user",
    section: "navigation",
  },
  {
    id: "nav-projects",
    label: "Projetos",
    href: "/projects",
    iconType: "file",
    section: "navigation",
  },
  {
    id: "nav-blog",
    label: "Blog",
    href: "/blog",
    iconType: "file",
    section: "navigation",
  },
];

const MOCK_POSTS: BlogPostItem[] = [
  {
    id: "post-structs-go",
    title: "Go Structs - Otimizando memória e performance no backend",
    slug: "structs-go",
    excerpt:
      "Structs em Go são fundamentais para organizar dados, otimizar memória e melhorar performance.",
    date: "2026-05-07",
    tags: ["Go"],
    readingTime: 8,
    section: "blog",
  },
  {
    id: "post-dip",
    title: "DIP - Dependa de abstrações",
    slug: "dip",
    excerpt:
      "Entenda o Princípio da Inversão de Dependência e sua importância na arquitetura de software.",
    date: "2026-01-25",
    tags: ["SOLID", "Design Patterns"],
    readingTime: 10,
    section: "blog",
  },
  {
    id: "post-big-o",
    title: "O que é Big-O?",
    slug: "big-o",
    excerpt:
      "Entenda notação Big-O e sua importância na análise de algoritmos e estruturas de dados.",
    date: "2025-11-22",
    tags: ["Algoritmos", "Arquitetura de Software", "Data Structures"],
    readingTime: 6,
    section: "blog",
  },
  {
    id: "post-dtos",
    title: "O que são DTOs (Data Transfer Objects)?",
    slug: "dtos",
    excerpt:
      "Entenda o papel dos DTOs na arquitetura de software e como eles ajudam na comunicação entre camadas.",
    date: "2025-11-05",
    tags: ["DTOs", "Boas Práticas", "Arquitetura de Software"],
    readingTime: 7,
    section: "blog",
  },
  {
    id: "post-niri",
    title: "Niri - um tiling baseado em scroll",
    slug: "niri",
    excerpt:
      "Niri WM traz o conceito de scrollable tiling, janelas organizadas com navegação fluida.",
    date: "2025-11-02",
    tags: ["NiriWM", "Linux", "Window Managers"],
    readingTime: 5,
    section: "blog",
  },
  {
    id: "post-primeiro",
    title: "Bem-vindo ao Blog",
    slug: "primeiro-post",
    excerpt: "Primeiro post do blog com exemplos de Hello World.",
    date: "2025-10-28",
    tags: ["Blog"],
    readingTime: 3,
    section: "blog",
  },
];

// ─── Helpers ────────────────────────────────────────────────

function buildHref(item: SearchItem, lang: string): string {
  if ("href" in item) {
    return `/${lang}${item.href === "/" ? "" : item.href}`;
  }
  return `/${lang}/blog/${(item as BlogPostItem).slug}`;
}

const iconMap = {
  home: <Home className="size-3.5" />,
  user: <User className="size-3.5" />,
  file: <FileText className="size-3.5" />,
} as const;

// ─── Types ──────────────────────────────────────────────────

type ActiveSection = "navigation" | "blog";

// ─── Component ──────────────────────────────────────────────

export const SearchCommand = memo(function SearchCommand() {
  const isOpen = useSearchStore((s) => s.isOpen);
  const close = useSearchStore((s) => s.close);
  const router = useRouter();
  const { language } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] =
    useState<ActiveSection>("navigation");
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = language === "pt" ? MOCK_NAV_PT : MOCK_NAV_EN;

  const sectionLabels =
    language === "pt"
      ? { navigation: "Navegação", blog: "Blog" }
      : { navigation: "Navigation", blog: "Blog" };

  const placeholder =
    language === "pt"
      ? "Pesquisar páginas, posts..."
      : "Search pages, posts...";

  // Filter items based on active section + query
  const filteredItems = useMemo(() => {
    const source = activeSection === "navigation" ? navItems : MOCK_POSTS;
    if (!query.trim()) return source;

    const q = query.toLowerCase();
    return source.filter((item) => {
      if ("title" in item) {
        return (
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return item.label.toLowerCase().includes(q);
    });
  }, [activeSection, query, navItems]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      setActiveSection("navigation");
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

  // Reset active index when filter context changes
  const filterKey = `${activeSection}-${query}`;
  const prevFilterKeyRef = useRef(filterKey);
  if (prevFilterKeyRef.current !== filterKey) {
    prevFilterKeyRef.current = filterKey;
    setActiveIndex(0);
  }

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
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filteredItems[activeIndex];
        if (item) navigateTo(item);
      } else if (e.key === "Escape") {
        close();
      } else if (e.key === "Tab") {
        e.preventDefault();
        setActiveSection((prev) =>
          prev === "navigation" ? "blog" : "navigation",
        );
      }
    },
    [filteredItems, activeIndex, close, navigateTo],
  );

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!isOpen) return null;

  const isNav = activeSection === "navigation";

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
        className="relative z-10 w-full max-w-[560px] mx-4 border border-border rounded-sm bg-background shadow-2xl shadow-black/20 animate-scale-in overflow-hidden"
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

        {/* Section Tabs */}
        <div className="flex border-b border-border">
          {(["navigation", "blog"] as const).map((section) => (
            <button
              key={section}
              type="button"
              onClick={() => setActiveSection(section)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-xs font-medium transition-colors duration-150",
                activeSection === section
                  ? "text-foreground border-b border-foreground"
                  : "text-muted-foreground/50 hover:text-muted-foreground",
              )}
            >
              {section === "navigation" ? (
                <Home className="size-3" />
              ) : (
                <FileText className="size-3" />
              )}
              {sectionLabels[section]}
              <kbd className="inline-flex items-center justify-center h-3.5 min-w-[14px] px-0.5 rounded-[2px] border border-border/60 bg-surface-2 font-mono text-[8px] leading-none text-muted-foreground/40">
                ⇥
              </kbd>
            </button>
          ))}
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[320px] overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground/40">
              <Search className="size-6 mb-2" />
              <p className="text-xs">
                {language === "pt"
                  ? "Nenhum resultado encontrado"
                  : "No results found"}
              </p>
            </div>
          ) : (
            <div className="py-1">
              {filteredItems.map((item, index) => (
                <ResultItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  index={index}
                  language={language}
                  onNavigate={navigateTo}
                  onMouseEnter={() => setActiveIndex(index)}
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
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground/30">
            <kbd className="inline-flex items-center justify-center h-3.5 min-w-[14px] px-0.5 rounded-[2px] border border-border/60 bg-surface-2 font-mono text-[8px] leading-none text-muted-foreground/40">
              ⇥
            </kbd>
            <span className="ml-0.5">{isNav ? "blog" : "nav"}</span>
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
  onMouseEnter: () => void;
}

const ResultItem = memo(function ResultItem({
  item,
  isActive,
  index,
  language,
  onNavigate,
  onMouseEnter,
}: ResultItemProps) {
  const href = buildHref(item, language);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onNavigate(item);
    },
    [onNavigate, item],
  );

  const isNav = "href" in item;

  if (isNav) {
    const nav = item as NavItem;
    return (
      <Link
        href={href}
        onClick={handleClick}
        data-index={index}
        onMouseEnter={onMouseEnter}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 mx-1 rounded-sm transition-colors duration-100",
          isActive
            ? "bg-accent/[0.08] text-foreground"
            : "text-muted-foreground hover:bg-surface-2",
        )}
      >
        <span
          className={cn(
            "shrink-0 size-7 rounded-sm border border-border/60 flex items-center justify-center transition-colors duration-100",
            isActive
              ? "border-accent/30 text-accent bg-accent/[0.05]"
              : "text-muted-foreground/50",
          )}
        >
          {iconMap[nav.iconType]}
        </span>
        <span className="text-sm font-medium">{nav.label}</span>
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

  const post = item as BlogPostItem;
  const formattedDate = new Date(post.date).toLocaleDateString(
    language === "pt" ? "pt-BR" : "en-US",
    { year: "numeric", month: "short", day: "numeric" },
  );

  return (
    <Link
      href={href}
      onClick={handleClick}
      data-index={index}
      onMouseEnter={onMouseEnter}
      className={cn(
        "flex items-start gap-3 px-4 py-2.5 mx-1 rounded-sm transition-colors duration-100",
        isActive
          ? "bg-accent/[0.08] text-foreground"
          : "text-muted-foreground hover:bg-surface-2",
      )}
    >
      <span
        className={cn(
          "shrink-0 size-7 rounded-sm border border-border/60 flex items-center justify-center mt-0.5 transition-colors duration-100",
          isActive
            ? "border-accent/30 text-accent bg-accent/[0.05]"
            : "text-muted-foreground/50",
        )}
      >
        <FileText className="size-3.5" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{post.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="inline-flex items-center gap-1 text-muted-foreground/50">
            <Calendar className="size-2.5" aria-hidden="true" />
            <MonoText className="text-[10px]">
              <time dateTime={post.date}>{formattedDate}</time>
            </MonoText>
          </span>
          <span className="inline-flex items-center gap-1 text-muted-foreground/50">
            <Clock className="size-2.5" aria-hidden="true" />
            <MonoText className="text-[10px]">{post.readingTime}m</MonoText>
          </span>
          {post.tags.slice(0, 2).map((tag) => (
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
