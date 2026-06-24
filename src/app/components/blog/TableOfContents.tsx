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
import { useLanguage } from "@/lib/language-store";
import { cn } from "@/lib/utils";
import type { Heading } from "@/types/portfolio";

interface TableOfContentsProps {
  headings: Heading[];
}

const HEADER_HEIGHT = 100;

/**
 * TableOfContents component with optimized scroll spy
 *
 * Design principles (AGENTS.md):
 * - Clean editorial list — no file-tree chrome
 * - Active state: accent left bar + foreground color
 * - 4px grid: consistent spacing throughout
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
  const { t } = useLanguage();
  const tBlog = t.blog;

  const tickingRef = useRef(false);
  const activeIdRef = useRef(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const findActiveHeading = useCallback((): string => {
    if (headings.length === 0) return "";

    // When the page can't scroll any further, the viewport bottom pins to the
    // document bottom — so the trigger line (HEADER_HEIGHT) may sit above the
    // last heading's top on short final sections. Force the last existing
    // heading to win in that case.
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 4;
    if (atBottom) {
      for (let i = headings.length - 1; i >= 0; i--) {
        if (document.getElementById(headings[i].id)) {
          return headings[i].id;
        }
      }
    }

    const triggerOffset = HEADER_HEIGHT;
    let activeHeadingId = headings[0].id;

    for (const heading of headings) {
      const element = document.getElementById(heading.id);
      if (!element) continue;
      const top = element.getBoundingClientRect().top;
      if (top <= triggerOffset) {
        activeHeadingId = heading.id;
      } else {
        break;
      }
    }

    return activeHeadingId;
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) return;

    const update = () => {
      const newActiveId = findActiveHeading();
      if (newActiveId && newActiveId !== activeIdRef.current) {
        startTransition(() => {
          setActiveId(newActiveId);
        });
      }
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        update();
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("load", update, { passive: true, once: true });
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [headings, findActiveHeading]);

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
    },
    [],
  );

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
            className={cn(
              "toc-item",
              isH3 && "toc-item--nested",
              isActive ? "toc-item--active" : "toc-item--inactive",
            )}
          >
            {heading.text}
          </a>
        </li>
      );
    });
  }, [headings, activeId, handleClick]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground/60 mb-3 px-3">
        {tBlog.onThisPage}
      </p>

      <ul className="space-y-0.5">{renderedHeadings}</ul>
    </nav>
  );
});

TableOfContents.displayName = "TableOfContents";
