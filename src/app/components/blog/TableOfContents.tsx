"use client";

import {
  memo,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MonoText } from "@/components/ui/typography";
import { blogContent } from "@/lib/content/blog-content";
import { useLanguage } from "@/lib/LanguageContext";
import type { Heading } from "@/types/portfolio";

interface TableOfContentsProps {
  headings: Heading[];
}

const HEADER_HEIGHT = 100; // Offset for fixed header + some padding

/**
 * TableOfContents component with improved scroll spy
 *
 * Best Practices Applied:
 * - Passive event listeners for scroll performance (Vercel 4.2)
 * - startTransition for non-urgent state updates (Vercel 5.7)
 * - URL hash synchronization on initial load
 * - MutationObserver for dynamic DOM content
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

  // Sync isScrolling ref with state
  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  /**
   * Update cached heading positions
   * Called on mount, resize, and when headings change
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

    // Find the last heading that is above the trigger offset
    for (const heading of headings) {
      const position = headingPositionsRef.current.get(heading.id);
      if (position === undefined) continue;

      // If this heading is above the trigger point, it's a candidate
      if (position <= triggerOffset) {
        activeHeadingId = heading.id;
      } else {
        // We've passed the trigger point, stop here
        break;
      }
    }

    return activeHeadingId;
  }, [headings]);

  /**
   * Handle scroll events with RAF throttling
   */
  useEffect(() => {
    if (headings.length === 0) return;

    // Initial position calculation
    updateHeadingPositions();

    const handleScroll = () => {
      if (isScrollingRef.current || tickingRef.current) return;

      tickingRef.current = true;

      requestAnimationFrame(() => {
        const newActiveId = findActiveHeading();

        if (newActiveId && newActiveId !== activeId) {
          startTransition(() => {
            setActiveId(newActiveId);
          });
        }

        tickingRef.current = false;
      });
    };

    // Passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Recalculate positions on resize
    const handleResize = () => {
      updateHeadingPositions();
      // Re-check active heading after resize
      const newActiveId = findActiveHeading();
      if (newActiveId !== activeId) {
        startTransition(() => setActiveId(newActiveId));
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [headings, findActiveHeading, updateHeadingPositions, activeId]);

  /**
   * Setup MutationObserver to handle dynamically added content
   * Re-calculates positions when DOM changes (e.g., images loading)
   */
  useEffect(() => {
    if (headings.length === 0) return;

    const handleMutations = () => {
      // Small delay to let layout settle
      requestAnimationFrame(() => {
        updateHeadingPositions();
      });
    };

    const observer = new MutationObserver(handleMutations);

    // Observe the article container for changes
    const article = document.querySelector("article");
    if (article) {
      observer.observe(article, {
        childList: true,
        subtree: true,
        attributes: true, // Watch for attribute changes (like images loading)
        attributeFilter: ["src", "class"],
      });
    }

    // Also recalculate when images load
    const handleImageLoad = () => {
      updateHeadingPositions();
    };

    window.addEventListener("load", handleImageLoad);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", handleImageLoad);
    };
  }, [headings, updateHeadingPositions]);

  /**
   * Sync with URL hash on initial load
   */
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const targetHeading = headings.find((h) => h.id === hash);
      if (targetHeading) {
        setActiveId(hash);

        // Scroll to element after a short delay to ensure DOM is ready
        requestAnimationFrame(() => {
          const element = document.getElementById(hash);
          if (element) {
            const rect = element.getBoundingClientRect();
            const scrollTop = window.scrollY + rect.top - HEADER_HEIGHT + 20;
            window.scrollTo({ top: scrollTop, behavior: "instant" });
          }
        });
      }
    }
  }, [headings]);

  /**
   * Handle click on TOC link
   */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const element = document.getElementById(id);
      if (!element) return;

      setIsScrolling(true);

      // Update URL hash
      window.history.pushState(null, "", `#${id}`);

      // Calculate scroll position with offset
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - HEADER_HEIGHT + 20;

      window.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });

      // Set active immediately
      startTransition(() => setActiveId(id));

      // Reset scrolling state after animation
      const handleScrollEnd = () => {
        setIsScrolling(false);
        updateHeadingPositions(); // Recalculate after scroll
      };

      window.addEventListener("scrollend", handleScrollEnd, {
        passive: true,
        once: true,
      });

      // Fallback timeout
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    },
    [updateHeadingPositions],
  );

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-1.5 sm:space-y-2">
      <MonoText className="text-[10px] sm:text-xs uppercase tracking-wide text-muted-foreground mb-3 sm:mb-4">
        {t.onThisPage}
      </MonoText>

      <ul className="space-y-1 sm:space-y-2 border-l border-border">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isH3 = heading.level === 3;

          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  relative block py-1 sm:py-1.5 text-xs sm:text-sm transition-all duration-200
                  ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${isH3 ? "pl-5 sm:pl-6" : "pl-3 sm:pl-4"}
                  ${
                    isActive
                      ? "text-accent font-medium border-l-2 border-accent -ml-[1px]"
                      : "text-muted-foreground hover:text-foreground border-l-2 border-transparent -ml-[1px] hover:border-border"
                  }
                  ${isScrolling && activeId === heading.id ? "animate-pulse" : ""}
                `}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
});

TableOfContents.displayName = "TableOfContents";
