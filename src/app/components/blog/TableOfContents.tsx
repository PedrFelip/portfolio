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
  const [isScrolling, setIsScrolling] = useState(false);
  const { language } = useLanguage();
  const t = blogContent[language].blog;

  // Refs
  const tickingRef = useRef(false);
  const headingPositionsRef = useRef<Map<string, number>>(new Map());
  const isScrollingRef = useRef(false);
  const observerRef = useRef<MutationObserver | null>(null);
  const activeIdRef = useRef(activeId);

  // Sync refs with state (Vercel 5.2 - useLatest pattern)
  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  /**
   * Update cached heading positions
   */
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

  /**
   * Find active heading based on scroll position
   * Active heading is the last one that passed the header offset
   */
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

  /**
   * ✅ Consolidated useEffect for scroll, resize, and mutation observers
   * Reduces from 3 separate effects to 1 with proper cleanup
   */
  useEffect(() => {
    if (headings.length === 0) return;

    // Initial position calculation
    updateHeadingPositions();

    // Scroll handler with RAF throttling
    const handleScroll = () => {
      if (isScrollingRef.current || tickingRef.current) return;

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

    // Resize handler
    const handleResize = () => {
      updateHeadingPositions();
      const newActiveId = findActiveHeading();
      if (newActiveId !== activeIdRef.current) {
        startTransition(() => setActiveId(newActiveId));
      }
    };

    // MutationObserver for dynamic content
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

    // Event listeners with passive flag (Vercel 4.2)
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("load", updateHeadingPositions, { passive: true });

    // ✅ Comprehensive cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", updateHeadingPositions);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [headings, findActiveHeading, updateHeadingPositions]);

  /**
   * Sync with URL hash on initial load
   * ✅ Check DOM directly instead of headings array to avoid dependency issues
   */
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Check if element exists in DOM directly
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
  }, []); // Only on mount

  /**
   * Handle click on TOC link
   * ✅ useCallback with stable dependencies
   */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (!element) return;

      setIsScrolling(true);
      window.history.pushState(null, "", `#${id}`);

      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - HEADER_HEIGHT + 20;

      window.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });

      startTransition(() => setActiveId(id));

      // Reset scrolling state after animation
      const handleScrollEnd = () => {
        setIsScrolling(false);
        updateHeadingPositions();
      };

      window.addEventListener("scrollend", handleScrollEnd, {
        passive: true,
        once: true,
      });
    },
    [updateHeadingPositions],
  );

  // ✅ useMemo for rendered headings to avoid re-creation on every render
  const renderedHeadings = useMemo(() => {
    if (headings.length === 0) return null;

    return headings.map((heading) => {
      const isActive = activeId === heading.id;
      const isH3 = heading.level === 3;

      return (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={`
              relative block py-1 sm:py-2 text-xs sm:text-sm transition-all duration-200
              ease-[cubic-bezier(0.25,1,0.5,1)]
              ${isH3 ? "pl-5 sm:pl-6" : "pl-3 sm:pl-4"}
              ${
                isActive
                  ? "text-accent font-medium border-l border-accent -ml-[1px]"
                  : "text-muted-foreground hover:text-foreground border-l border-transparent -ml-[1px] hover:border-border"
              }
              ${isScrolling && activeId === heading.id ? "animate-pulse" : ""}
            `}
          >
            {heading.text}
          </a>
        </li>
      );
    });
  }, [headings, activeId, isScrolling, handleClick]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1.5 sm:space-y-2">
      <MonoText className="text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground mb-3 sm:mb-4">
        {t.onThisPage}
      </MonoText>

      <ul className="space-y-1 sm:space-y-2 border-l border-border">
        {renderedHeadings}
      </ul>
    </nav>
  );
});

TableOfContents.displayName = "TableOfContents";
