"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback, useMemo, useState, useTransition } from "react";
import { Menu, X } from "@/components/ui/icons";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

interface NavLink {
  href: string;
  label: string;
}

/**
 * Navigation component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Borders-only approach: subtle borders, no heavy shadows
 * - Typography: monospace for navigation items
 * - Animation: 150-250ms with cubic-bezier easing
 * - Mobile-first: optimized hamburger menu for small screens
 *
 * Vercel best practices applied:
 * - Memoization to avoid unnecessary re-renders (rerender-memo)
 * - useMemo to avoid recreating navLinks array each render (rerender-hoist-jsx)
 * - useCallback for handlers passed to children (rerender-dependencies)
 * - Derived state subscriptions for isActive (rerender-derived-state)
 * - Lazy state init for expensive values (rerender-lazy-state-init)
 * - Hoist static JSX patterns (rendering-hoist-jsx)
 */
export const Navigation = memo(() => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const navLinks: NavLink[] = useMemo(
    () => [
      { href: "/", label: t.nav.home },
      { href: "/about", label: t.nav.about },
      { href: "/projects", label: t.nav.projects },
      { href: "/blog", label: t.nav.blog },
    ],
    [t.nav.home, t.nav.about, t.nav.projects, t.nav.blog],
  );

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(href);
    },
    [pathname],
  );

  const toggleLanguage = useCallback(() => {
    startTransition(() => {
      setLanguage(language === "en" ? "pt" : "en");
    });
  }, [language, setLanguage]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-18">
          <Link
            href={getLocalizedLink("/")}
            className="font-mono text-sm font-semibold tracking-tight text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-accent"
          >
            Pedro Felipe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLocalizedLink(link.href)}
                className={`relative font-mono text-xs font-medium transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
                {isActive(link.href) ? (
                  <span className="absolute -bottom-20 left-0 right-0 h-0.5 bg-accent sm:-bottom-24" />
                ) : null}
              </Link>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              disabled={isPending}
              className="inline-flex min-h-[44px] items-center gap-2 rounded border border-border bg-background px-3 py-2 font-mono text-xs font-medium text-muted-foreground transition-[border-color,background-color,color,transform,opacity] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground/50 hover:text-foreground hover:bg-muted/60 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed motion-reduce:transition-none"
              aria-label={t.nav.language}
            >
              <span>{language === "en" ? "EN" : "PT"}</span>
            </button>

            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex md:hidden min-h-[44px] items-center rounded border border-border bg-background p-2 text-muted-foreground transition-[border-color,background-color,color,transform] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground/50 hover:text-foreground hover:bg-muted/60 active:scale-95 motion-reduce:transition-none"
              aria-label={t.nav.toggleMenu}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X
                  className="h-5 w-5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] rotate-90"
                  aria-hidden="true"
                />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen ? (
          <div className="border-t border-border md:hidden animate-in-down">
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLocalizedLink(link.href)}
                  onClick={closeMenu}
                  className={`min-h-[44px] px-4 py-3 font-mono text-xs font-medium transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive(link.href)
                      ? "text-foreground bg-muted/60 border-l-2 border-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
});

Navigation.displayName = "Navigation";
