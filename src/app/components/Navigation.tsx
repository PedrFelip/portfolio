"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LANGUAGES } from "@/lib/i18n";
import { useLanguage } from "@/lib/LanguageContext";

export const Navigation = () => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/projects", label: t.nav.projects },
    { href: "/blog", label: t.nav.blog },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo/Name */}
          <Link
            href="/"
            className="font-mono text-xs sm:text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
          >
            Pedro Felipe
          </Link>

          {/* Nav Links - Desktop */}
          <div className="hidden items-center gap-6 md:gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs sm:text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section: Language + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded border border-border bg-background px-2 sm:px-3 py-1.5 text-xs font-mono font-medium text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              aria-label={t.nav.language}
            >
              <span className="hidden sm:inline">{LANGUAGES[language]}</span>
              <span className="sm:hidden">
                {language === "en" ? "EN" : "PT"}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex md:hidden items-center gap-2 rounded border border-border bg-background px-2.5 py-1.5 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              aria-label={t.nav.toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-border bg-card md:hidden">
            <div className="flex flex-col gap-1 px-0 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-foreground bg-muted/50 border-l-2 border-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
