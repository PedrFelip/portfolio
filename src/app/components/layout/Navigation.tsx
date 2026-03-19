"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Button } from "@/components/ui";
import { Menu, X } from "@/components/ui/icons";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

interface NavLink {
  href: string;
  label: string;
}

interface NavLinkItemProps {
  label: string;
  isActive: boolean;
  localizedHref: string;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
}

const NavLinkItem = memo(
  ({
    label,
    isActive,
    localizedHref,
    onClick,
    variant = "desktop",
  }: NavLinkItemProps) => {
    const baseClasses =
      "font-mono text-[11px] font-medium transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none touch-manipulation";

    const variantClasses = {
      desktop:
        "relative px-3 py-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      mobile:
        "min-h-[48px] px-4 py-3 border-b border-border/40 last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-muted/80",
    };

    const stateClasses = isActive
      ? "text-foreground bg-muted/50"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/30 active:bg-muted/50";

    return (
      <Link
        href={localizedHref}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${stateClasses}`}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
      </Link>
    );
  },
);
NavLinkItem.displayName = "NavLinkItem";

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
    [t.nav],
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ESC key handler to close mobile menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen, closeMenu]);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between md:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link
              href={getLocalizedLink("/")}
              className="flex items-center gap-2 group"
            >
              <div className="hidden sm:block">
                <div className="font-mono text-sm font-semibold tracking-tight text-foreground group-hover:text-muted-foreground/90 transition-colors duration-150">
                  Pedro Felipe
                </div>
                <div className="font-mono text-[10px] text-muted-foreground/60 tabular-nums">
                  <span className="opacity-50">~$</span> portfolio
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.href}
                label={link.label}
                isActive={isActive(link.href)}
                localizedHref={getLocalizedLink(link.href)}
                variant="desktop"
              />
            ))}
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              disabled={isPending}
              aria-label={`Switch language to ${
                language === "en" ? "Portuguese" : "English"
              }`}
              className="h-8 w-8 sm:h-9 sm:w-9 font-mono text-[11px] font-medium border border-border/60 rounded hover:bg-muted/60 active:bg-muted/80 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
            >
              {language === "en" ? "EN" : "PT"}
            </Button>

            <Button
              variant="ghost"
              className={`sm:hidden h-8 w-8 sm:h-9 sm:w-9 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] border border-border/60 rounded hover:bg-muted/60 ${
                isMenuOpen ? "bg-muted/80" : ""
              }`}
              onClick={toggleMenu}
              aria-label={t.nav.toggleMenu}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X
                  className="h-4 w-4 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  className="h-4 w-4 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  aria-hidden="true"
                />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-background/90 backdrop-blur-md z-40 md:hidden animate-in-fade"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <div className="border-t border-border/80 md:hidden relative z-50 bg-background animate-in-slide-down">
              <div className="flex flex-col bg-background">
                {navLinks.map((link) => (
                  <NavLinkItem
                    key={link.href}
                    label={link.label}
                    isActive={isActive(link.href)}
                    localizedHref={getLocalizedLink(link.href)}
                    onClick={closeMenu}
                    variant="mobile"
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
});

Navigation.displayName = "Navigation";
