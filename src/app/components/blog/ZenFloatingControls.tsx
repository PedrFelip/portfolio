"use client";

import {
  motion,
  useMotionValueEvent,
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
    }, 500); // Reaparece após 300ms parado

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
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[60]"
        style={{ scaleX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* Desktop Floating Control Group */}
      <motion.div
        className="fixed top-6 left-6 z-[60] hidden md:flex"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: isVisible ? 0 : -20, opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex h-9 items-stretch rounded-sm border border-overlay-border bg-background shadow-sm overflow-hidden touch-manipulation">
          <Link
            href={getLocalizedLink("/blog")}
            className="group flex items-center gap-2 px-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-surface-4 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            <span>{t.blog.back}</span>
          </Link>

          <div className="w-px border-l border-dashed border-overlay-border" />

          <Link
            href={getLocalizedLink("/")}
            className="group flex items-center justify-center px-4 text-muted-foreground hover:text-foreground hover:bg-surface-4 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
            aria-label={t.nav.home}
          >
            <Home className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
          </Link>
        </div>
      </motion.div>

      {/* Mobile Sticky Bottom Bar */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] flex md:hidden"
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
        <div className="flex h-11 items-stretch rounded-sm border border-overlay-border bg-background shadow-md overflow-hidden touch-manipulation">
          <Link
            href={getLocalizedLink("/blog")}
            className="group flex items-center gap-2 px-6 text-[10px] font-mono uppercase tracking-widest text-foreground hover:bg-surface-4 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-[0.98]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{t.blog.back}</span>
          </Link>

          <div className="w-px border-l border-dashed border-overlay-border" />

          <Link
            href={getLocalizedLink("/")}
            className="group flex items-center justify-center px-5 text-muted-foreground hover:text-foreground hover:bg-surface-4 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-[0.98]"
            aria-label={t.nav.home}
          >
            <Home className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    </>
  );
}
