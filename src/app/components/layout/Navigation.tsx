"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button } from "@/components/ui";
import { Menu, X } from "@/components/ui/icons";
import { useLanguage } from "@/lib/language-store";
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
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLAnchorElement, NavLinkItemProps>(
    ({ label, isActive, localizedHref, onClick, variant = "desktop" }, ref) => {
      const baseClasses =
        "text-sm font-medium transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none touch-manipulation";

      const variantClasses = {
        desktop:
          "group relative px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        mobile:
          "block min-h-[48px] px-4 py-3 border-b border-dashed border-border last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-surface-4",
      };

      const stateClasses = {
        desktop: isActive
          ? "text-accent"
          : "text-muted-foreground hover:text-foreground hover:bg-surface-4",
        mobile: isActive
          ? "text-accent border-l-[3px] border-l-accent bg-accent/[0.08]"
          : "text-muted-foreground hover:text-foreground hover:bg-surface-2 border-l-[3px] border-l-transparent",
      };

      return (
        <Link
          ref={ref}
          href={localizedHref}
          onClick={onClick}
          className={`${baseClasses} ${variantClasses[variant]} ${stateClasses[variant]}`}
          aria-current={isActive ? "page" : undefined}
        >
          {variant === "desktop" ? (
            <span className="relative inline-flex flex-col items-center">
              {label}
              <span
                className={`absolute -bottom-2 left-1/2 h-[2px] rounded-full bg-accent -translate-x-1/2 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive
                    ? "w-4/5 opacity-100"
                    : "w-0 group-hover:w-1/2 opacity-0 group-hover:opacity-100"
                }`}
                aria-hidden="true"
              />
            </span>
          ) : (
            <span className="flex items-center gap-3">
              <span
                className={`rounded-full transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive
                    ? "h-2 w-2 bg-accent scale-100"
                    : "h-1.5 w-1.5 bg-muted-foreground/30 scale-75"
                }`}
                aria-hidden="true"
              />
              {label}
            </span>
          )}
        </Link>
      );
    },
  ),
);
NavLinkItem.displayName = "NavLinkItem";

export const Navigation = memo(() => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(
    null,
  );

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
      const localizedPath = getLocalizedLink(href);
      if (href === "/") {
        return pathname === localizedPath;
      }
      return (
        pathname === localizedPath || pathname.startsWith(`${localizedPath}/`)
      );
    },
    [pathname, getLocalizedLink],
  );

  const activeIndex = useMemo(
    () => navLinks.findIndex((link) => isActive(link.href)),
    [navLinks, isActive],
  );

  useLayoutEffect(() => {
    if (activeIndex === -1 || !navRef.current) {
      setPill(null);
      return;
    }
    const linkEl = linkRefs.current[activeIndex];
    const containerEl = navRef.current;
    if (!linkEl) {
      setPill(null);
      return;
    }
    const containerRect = containerEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    setPill({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
    });
  }, [activeIndex]);

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
    <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md page-rails-nav">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-overlay-border to-surface-4"
          style={{ left: "var(--rail-offset)" }}
        />
        <div
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-overlay-border to-surface-4"
          style={{ right: "var(--rail-offset)" }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-surface-4 via-overlay-border to-surface-4" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <div className="flex h-16 items-center justify-between">
          <Link href={getLocalizedLink("/")} className="group">
            <div className="text-base font-semibold tracking-tight text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-muted-foreground">
              Pedro Felipe
            </div>
          </Link>

          <div
            ref={navRef}
            className="hidden items-center gap-1 md:flex relative"
          >
            {pill && (
              <span
                className="absolute top-1/2 -translate-y-1/2 h-[calc(100%-8px)] rounded bg-accent/[0.10] transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none pointer-events-none"
                style={{ left: pill.left, width: pill.width }}
                aria-hidden="true"
              />
            )}
            {navLinks.map((link, index) => (
              <NavLinkItem
                key={link.href}
                ref={(el: HTMLAnchorElement | null) => {
                  linkRefs.current[index] = el;
                }}
                label={link.label}
                isActive={isActive(link.href)}
                localizedHref={getLocalizedLink(link.href)}
                variant="desktop"
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={toggleLanguage}
              disabled={isPending}
              aria-label={`Switch language to ${
                language === "en" ? "Portuguese" : "English"
              }`}
              className="h-10 w-10 rounded border border-overlay-border bg-surface-3 font-mono text-xs font-medium transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-overlay-border-hover hover:bg-surface-4 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {language === "en" ? "EN" : "PT"}
            </Button>

            <Button
              variant="ghost"
              className={`h-10 w-10 rounded border border-overlay-border transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-overlay-border-hover hover:bg-surface-4 active:scale-[0.97] md:hidden ${
                isMenuOpen
                  ? "border-overlay-border-hover bg-surface-4"
                  : "bg-surface-3"
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

        {isMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 animate-in-fade bg-background/80 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
              aria-hidden="true"
            />
            <div className="relative z-50 animate-in-slide-down border-t border-overlay-border bg-background/95 backdrop-blur-md md:hidden">
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
