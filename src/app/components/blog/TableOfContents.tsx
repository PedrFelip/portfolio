"use client";

import {
  memo,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MonoText } from "@/components/ui/typography";
import { blogEn } from "@/lib/content/blog.en";
import { blogPt } from "@/lib/content/blog.pt";
import { useLanguage } from "@/lib/LanguageContext";
import type { Heading } from "@/types/portfolio";

const blogContent = {
  en: blogEn,
  pt: blogPt,
};

interface TableOfContentsProps {
  headings: Heading[];
}

const HEADER_HEIGHT = 100;

/**
 * TableOfContents component with optimized scroll spy
 *
 * Design principles (AGENTS.md):
 * - File tree structure: prefixos simples (└─, ├─)
 * - 4px grid: consistent spacing throughout
 * - Monospace for tree prefixes
 * - Terminal aesthetic: no pulse animations
 * - Active state: accent color + subtle border
 * - 150ms animations with cubic-bezier(0.25, 1, 0.5, 1) easing
 *
 * Best Practices Applied:
 * - Passive event listeners for scroll performance (Vercel 4.2)
 * - startTransition for non-urgent state updates (Vercel 5.7)
 * - useMemo for expensive computations (Vercel 5.2)
 * - Consolidated useEffect to reduce executions (Vercel 3.6)
 * - Lazy state initialization (Vercel 5.6)
 */
export const TableOfContents = memo(({ headings }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>(() =>
    headings.length > 0 ? headings[0].id : "",
  );
  const { language } = useLanguage();
  const t = blogContent[language].blog;

  const tickingRef = useRef(false);
  const headingPositionsRef = useRef<Map<string, number>>(new Map());
  const observerRef = useRef<MutationObserver | null>(null);
  const activeIdRef = useRef(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const updateHeadingPositions = useCallback(() => {
    const positions = new Map<string, number>();

    for (const { id } of headings) {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        positions.set(id, rect.top + window.scrollY);
      }
    }

    headingPositionsRef.current = positions;
  }, [headings]);

  const findActiveHeading = useCallback((): string => {
    if (headings.length === 0) return "";

    const scrollY = window.scrollY;
    const triggerOffset = scrollY + HEADER_HEIGHT;

    let activeHeadingId = headings[0].id;
    const positions = headingPositionsRef.current;

    for (const heading of headings) {
      const position = positions.get(heading.id);
      if (position === undefined) continue;

      if (position <= triggerOffset) {
        activeHeadingId = heading.id;
      } else {
        break;
      }
    }

    return activeHeadingId;
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) return;

    updateHeadingPositions();

    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;

      requestAnimationFrame(() => {
        const newActiveId = findActiveHeading();

        if (newActiveId && newActiveId !== activeIdRef.current) {
          startTransition(() => {
            setActiveId(newActiveId);
          });
        }

        tickingRef.current = false;
      });
    };

    const handleResize = () => {
      updateHeadingPositions();
      const newActiveId = findActiveHeading();
      if (newActiveId !== activeIdRef.current) {
        startTransition(() => setActiveId(newActiveId));
      }
    };

    const handleMutations = () => {
      requestAnimationFrame(updateHeadingPositions);
    };

    observerRef.current = new MutationObserver(handleMutations);
    const article = document.querySelector("article");
    if (article) {
      observerRef.current.observe(article, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["src", "class"],
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("load", updateHeadingPositions, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", updateHeadingPositions);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [headings, findActiveHeading, updateHeadingPositions]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setActiveId(hash);

        requestAnimationFrame(() => {
          const rect = element.getBoundingClientRect();
          const scrollTop = window.scrollY + rect.top - HEADER_HEIGHT + 20;
          window.scrollTo({ top: scrollTop, behavior: "instant" });
        });
      }
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (!element) return;

      window.history.pushState(null, "", `#${id}`);

      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - HEADER_HEIGHT + 20;

      window.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });

      startTransition(() => setActiveId(id));

      const handleScrollEnd = () => {
        updateHeadingPositions();
      };

      window.addEventListener("scrollend", handleScrollEnd, {
        passive: true,
        once: true,
      });
    },
    [updateHeadingPositions],
  );

  const renderedHeadings = useMemo(() => {
    if (headings.length === 0) return null;

    return headings.map((heading, index) => {
      const isActive = activeId === heading.id;
      const isH3 = heading.level === 3;
      const isLast = index === headings.length - 1;
      const nextIsH3 =
        index < headings.length - 1 && headings[index + 1].level === 3;

      let prefix = "";
      if (isH3) {
        prefix = nextIsH3 ? "│   ├─" : "│   └─";
      } else {
        prefix = isLast ? "└─" : "├─";
      }

      return (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={`toc-line ${isActive ? "toc-line--active" : "text-muted-foreground hover:text-foreground"}`}
            data-prefix={prefix}
          >
            {heading.text}
          </a>
        </li>
      );
    });
  }, [headings, activeId, handleClick]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1.5 md:space-y-2">
      <MonoText className="text-xs md:text-xs uppercase tracking-wide text-muted-foreground mb-3 md:mb-4">
        {t.onThisPage}
      </MonoText>

      <ul className="space-y-1 md:space-y-2 font-mono">{renderedHeadings}</ul>
    </nav>
  );
});

TableOfContents.displayName = "TableOfContents";
