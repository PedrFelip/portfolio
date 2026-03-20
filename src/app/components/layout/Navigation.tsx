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
      "text-sm font-medium transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none touch-manipulation";

    const variantClasses = {
      desktop:
        "relative px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      mobile:
        "block min-h-[48px] px-4 py-3 border-b border-dashed border-border last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-white/[0.04]",
    };

    const stateClasses = {
      desktop: isActive
        ? "text-foreground bg-white/[0.02] border-l-4 border-l-accent pl-[8px]"
        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02] border-l-4 border-l-transparent pl-[8px]",
      mobile: isActive
        ? "text-foreground bg-white/[0.02] border-l-4 border-l-accent"
        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.02] border-l-4 border-l-transparent",
    };

    return (
      <Link
        href={localizedHref}
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${stateClasses[variant]}`}
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
    <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={getLocalizedLink("/")} className="group">
            <div className="text-base font-semibold tracking-tight text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-muted-foreground">
              Pedro Felipe
            </div>
          </Link>

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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              disabled={isPending}
              aria-label={`Switch language to ${
                language === "en" ? "Portuguese" : "English"
              }`}
              className="h-10 w-10 rounded border border-white/[0.08] bg-white/[0.03] font-mono text-xs font-medium transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-white/[0.15] hover:bg-white/[0.05] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {language === "en" ? "EN" : "PT"}
            </Button>

            <Button
              variant="ghost"
              className={`h-10 w-10 rounded border border-white/[0.08] transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-white/[0.15] hover:bg-white/[0.05] active:scale-[0.97] md:hidden ${
                isMenuOpen
                  ? "border-white/[0.15] bg-white/[0.05]"
                  : "bg-white/[0.03]"
              }`}
              onClick={toggleMenu}
              aria-label={t.nav.toggleMenu}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X
                  className="h-4 w-4 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  className="h-4 w-4 transition-transform duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
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
              className="fixed inset-0 z-40 animate-in-fade bg-background/80 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <div className="relative z-50 animate-in-slide-down border-t border-white/[0.08] bg-background/95 backdrop-blur-md md:hidden">
              <div className="flex flex-col">
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
