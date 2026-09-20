"use client";

import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Home } from "@/components/ui/icons";
import { useLanguage } from "@/lib/language-store";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

export function ZenFloatingControls() {
  const { t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();
  const { scrollY, scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // Timer para detectar inatividade de scroll
  useEffect(() => {
    if (!isScrollingDown) return;

    const idleTimer = setTimeout(() => {
      setIsScrollingDown(false);
    }, 500);

    return () => clearTimeout(idleTimer);
  }, [isScrollingDown]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 100) {
      setIsScrollingDown(true);
    } else {
      setIsScrollingDown(false);
    }
  });

  return (
    <>
      {/* Top Reading Progress Bar */}
      <m.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-foreground to-accent origin-left z-[60]"
        style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Desktop Floating Control Group */}
      {/* TODO(refactor)[P2]: desktop+mobile control groups near-identical */}
      <m.div
        className="sticky top-0 z-[60] hidden border-b border-border bg-background/95 backdrop-blur-sm md:block 2xl:fixed 2xl:top-8 2xl:left-[calc(50%_-_40rem)] 2xl:border-0 2xl:bg-transparent 2xl:backdrop-blur-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
      >
        <div className="blog-post-container py-4 2xl:w-auto 2xl:p-0">
          <div className="px-4 sm:px-6 2xl:px-0">
            <nav
              aria-label={t.blog.back}
              className="flex min-h-11 w-fit items-stretch rounded-sm border border-overlay-border bg-background touch-manipulation"
            >
              <Link
                href={getLocalizedLink("/blog")}
                className="group flex items-center gap-2 px-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-surface-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
              >
                <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                <span>{t.blog.back}</span>
              </Link>

              <div className="w-px border-l border-dashed border-overlay-border" />

              <Link
                href={getLocalizedLink("/")}
                className="group flex items-center justify-center px-4 text-muted-foreground hover:text-foreground hover:bg-surface-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
                aria-label={t.nav.home}
              >
                <Home className="size-3.5 transition-transform group-hover:scale-110" />
              </Link>
            </nav>
          </div>
        </div>
      </m.div>

      {/* Mobile Sticky Bottom Bar */}
      <m.div
        className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-1/2 -translate-x-1/2 z-[60] flex md:hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: isVisible ? (isScrollingDown ? 80 : 0) : 20,
          opacity: isVisible ? (isScrollingDown ? 0 : 1) : 0,
        }}
        transition={{
          duration: 0.25,
          ease: [0.25, 1, 0.5, 1],
        }}
      >
        <div className="flex min-h-11 items-stretch rounded-sm border border-overlay-border bg-background touch-manipulation">
          <Link
            href={getLocalizedLink("/blog")}
            className="group flex items-center gap-2 px-6 text-[10px] font-mono uppercase tracking-widest text-foreground hover:bg-surface-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-[0.98] active:opacity-90"
          >
            <ArrowLeft className="size-3.5" />
            <span>{t.blog.back}</span>
          </Link>

          <div className="w-px border-l border-dashed border-overlay-border" />

          <Link
            href={getLocalizedLink("/")}
            className="group flex items-center justify-center px-5 text-muted-foreground hover:text-foreground hover:bg-surface-4 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-[0.98] active:opacity-90"
            aria-label={t.nav.home}
          >
            <Home className="size-4" />
          </Link>
        </div>
      </m.div>
    </>
  );
}
