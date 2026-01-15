"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";
import { LANGUAGES } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

interface NavLink {
  href: string;
  label: string;
}

/**
 * Navigation component
 *
 * Vercel best practices applied:
 * - Memoization to avoid unnecessary re-renders (rerender-memo)
 * - useMemo to avoid recreating navLinks array each render
 * - useCallback for handlers passed to children
 */
export const Navigation = memo(() => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavLink[] = useMemo(
    () => [
      { href: "/", label: t.nav.home },
      { href: "/about", label: t.nav.about },
      { href: "/projects", label: t.nav.projects },
      { href: "/blog", label: t.nav.blog },
    ],
    [t.nav.about, t.nav.blog, t.nav.home, t.nav.projects],
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
    setLanguage(language === "en" ? "pt" : "en");
  }, [language, setLanguage]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link
            href={getLocalizedLink("/")}
            className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
          >
            Pedro Felipe
          </Link>

          <div className="hidden items-center gap-6 md:gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={getLocalizedLink(link.href)}
                className={`relative text-xs sm:text-sm font-medium transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive(link.href) ? (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-foreground animate-scale-in" />
                ) : null}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded border border-border bg-background px-2 sm:px-3 py-1.5 text-xs font-mono font-medium text-muted-foreground transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:text-foreground hover:bg-muted/50 active:scale-95"
              aria-label={t.nav.language}
            >
              <span className="hidden sm:inline">{LANGUAGES[language]}</span>
              <span className="sm:hidden">
                {language === "en" ? "EN" : "PT"}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex md:hidden items-center gap-2 rounded border border-border bg-background px-2.5 py-1.5 text-muted-foreground transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:text-foreground hover:bg-muted/50 active:scale-95"
              aria-label={t.nav.toggleMenu}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] rotate-90" />
              ) : (
                <Menu className="h-5 w-5 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="animate-slide-in-right border-t border-border md:hidden">
            <div className="flex flex-col px-0 py-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={getLocalizedLink(link.href)}
                  onClick={closeMenu}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`animate-fade-in-up px-4 py-3 text-sm font-medium transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive(link.href)
                      ? "text-foreground bg-muted/60 border-l-2 border-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
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
