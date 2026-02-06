"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback, useMemo, useState, useTransition } from "react";
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
      "font-mono text-xs font-medium transition-[color,background-color,opacity] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none touch-manipulation";

    const variantClasses = {
      desktop:
        "relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset focus-visible:ring-offset-2 active:opacity-80",
      mobile:
        "min-h-[44px] px-4 py-3 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:opacity-80 active:bg-muted/80",
    };

    const stateClasses = isActive
      ? "text-foreground bg-muted/60"
      : "text-muted-foreground hover:text-foreground hover:bg-muted/60";

    const indicatorClasses = `absolute h-0.5 bg-accent ${
      variant === "desktop"
        ? "left-0 right-0 -bottom-2 sm:-bottom-4"
        : "bottom-3 left-4 right-4"
    }`;

    return (
      <Link
        href={localizedHref}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${stateClasses}`}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
        {isActive && <span className={indicatorClasses} />}
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

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href={getLocalizedLink("/")}
            className="font-mono text-sm font-semibold tracking-tight text-foreground transition-[color,opacity] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-accent active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
          >
            Pedro Felipe
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
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
          <div className="flex items-center gap-4">
            <Button
              variant="nav"
              onClick={toggleLanguage}
              disabled={isPending}
              aria-label={`Switch language to ${
                language === "en" ? "Portuguese" : "English"
              }`}
            >
              <span>{language === "en" ? "EN" : "PT"}</span>
            </Button>

            <Button
              variant="ghost"
              className="md:hidden min-h-[44px] active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              onClick={toggleMenu}
              aria-label={t.nav.toggleMenu}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X
                  className="h-5 w-5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] rotate-90"
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  className="h-5 w-5 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  aria-hidden="true"
                />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen ? (
          <div className="border-t border-border md:hidden animate-in-down">
            <div className="flex flex-col py-4 gap-1">
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
        ) : null}
      </div>
    </nav>
  );
});

Navigation.displayName = "Navigation";
