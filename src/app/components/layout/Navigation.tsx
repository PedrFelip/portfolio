"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { Button, EncryptedText, Logo } from "@/components/ui";
import { Menu, Search, X } from "@/components/ui/icons";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useLanguage } from "@/lib/language-store";
import { useSearchStore } from "@/lib/search-store";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

interface NavLink {
  href: string;
  label: string;
}

// TODO(refactor)[P1]: manual ref prop
interface NavLinkItemProps {
  label: string;
  isActive: boolean;
  localizedHref: string;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
  ref?: React.Ref<HTMLAnchorElement>;
}

const NavLinkItem = memo(function NavLinkItem({
  label,
  isActive,
  localizedHref,
  onClick,
  variant = "desktop",
  ref,
}: NavLinkItemProps) {
  const baseClasses =
    "text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none touch-manipulation";

  const variantClasses = {
    desktop:
      "group relative px-3 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    mobile:
      "block min-h-[48px] px-4 py-3 border-b border-dashed border-border last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-surface-4",
  };

  const stateClasses = {
    desktop: isActive
      ? "text-foreground"
      : "text-muted-foreground hover:text-foreground",
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
        <span className="relative">
          {label}
          <span
            // TODO(refactor)[P0]: duration-350 not in Tailwind v4
            className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isActive
                ? "w-full opacity-100"
                : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"
            }`}
            aria-hidden="true"
          />
        </span>
      ) : (
        <span className="flex items-center gap-3">
          <span
            // TODO(refactor)[P0]: duration-250 not in Tailwind v4
            className={`rounded-full transition-all duration-250 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isActive
                ? "size-2 bg-accent scale-100"
                : "size-1.5 bg-muted-foreground/30 scale-75"
            }`}
            aria-hidden="true"
          />
          {label}
        </span>
      )}
    </Link>
  );
});
NavLinkItem.displayName = "NavLinkItem";

function SearchBar() {
  const openSearch = useSearchStore((s) => s.open);
  return (
    <button
      type="button"
      onClick={openSearch}
      className="hidden md:flex items-center gap-1.5 h-7 px-2.5 rounded-lg border border-border bg-surface-2/50 text-muted-foreground/60 select-none transition-colors duration-150 hover:border-border/80 hover:bg-surface-3/50 hover:text-muted-foreground/80"
      aria-label="Search"
    >
      <Search className="size-3 shrink-0" />
      <span className="text-[11px] font-medium truncate">Search...</span>
      <span className="ml-auto flex items-center gap-px">
        <kbd className="inline-flex items-center justify-center h-3.5 min-w-[14px] px-0.5 rounded-[2px] border border-border/60 bg-surface-3 font-mono text-[8px] leading-none text-muted-foreground/50">
          ⌘
        </kbd>
        <kbd className="inline-flex items-center justify-center h-3.5 min-w-[14px] px-0.5 rounded-[2px] border border-border/60 bg-surface-3 font-mono text-[8px] leading-none text-muted-foreground/50">
          K
        </kbd>
      </span>
    </button>
  );
}

export const Navigation = memo(() => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();
  const openSearch = useSearchStore((s) => s.open);
  const isTouch = useIsTouchDevice();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(
    null,
  );

  // TODO(refactor)[P2]: nav link list duplicated w/ Footer
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

  // TODO(refactor)[P2]: pill position drifts on resize
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

  // TODO(refactor)[P2]: body-scroll-lock duplicated (SearchCommand)
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
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto md:max-w-4xl px-4">
        <div className="relative flex flex-col gap-px">
          <div className="border-x border-border px-4 sm:px-6">
            <div className="relative z-50 flex h-14 items-center justify-between gap-3">
              <Link
                href={getLocalizedLink("/")}
                className="group flex items-center gap-2 shrink-0"
              >
                <Logo height={28} className="h-5 sm:h-6 w-auto" />
                <span className="hidden sm:block text-sm font-semibold tracking-tight text-foreground">
                  <EncryptedText
                    text="Pedro Felipe"
                    targets={["@PedrFelip", "@pdrdotdev"]}
                  />
                </span>
              </Link>

              <div
                ref={navRef}
                className="hidden items-center gap-1 md:flex relative"
              >
                {pill && (
                  <span
                    className="absolute top-1/2 -translate-y-1/2 h-[calc(100%-8px)] rounded-lg bg-accent/[0.10] transition-all duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none pointer-events-none"
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

              <div className="flex items-center gap-1.5 shrink-0">
                {/* TODO(refactor)[P2]: 3 near-identical icon-btn strings */}
                <SearchBar />

                {!isTouch && (
                  <Button
                    variant="ghost"
                    onClick={openSearch}
                    aria-label="Search"
                    // TODO(refactor)[P0]: duration-250 not in Tailwind v4
                    className="size-11 md:size-7 rounded-lg border border-overlay-border bg-surface-3 flex md:hidden items-center justify-center transition-all duration-250 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-overlay-border-hover hover:bg-surface-4 active:scale-[0.97] touch-manipulation"
                  >
                    <Search className="size-4" aria-hidden="true" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  onClick={toggleLanguage}
                  disabled={isPending}
                  aria-label={`Switch language to ${
                    language === "en" ? "Portuguese" : "English"
                  }`}
                  // TODO(refactor)[P0]: duration-250 not in Tailwind v4
                  className="size-11 md:size-7 rounded-lg border border-overlay-border bg-surface-3 font-mono text-[10px] font-medium transition-all duration-250 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-overlay-border-hover hover:bg-surface-4 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation"
                >
                  {language === "en" ? "EN" : "PT"}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  // TODO(refactor)[P0]: duration-250 not in Tailwind v4
                  className={`rounded-lg border transition-all duration-250 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-[0.97] md:hidden touch-manipulation ${
                    isMenuOpen
                      ? "border-foreground/20 bg-surface-4 text-foreground"
                      : "border-overlay-border bg-surface-3 text-foreground"
                  }`}
                  onClick={toggleMenu}
                  aria-label={t.nav.toggleMenu}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? (
                    <X
                      // TODO(refactor)[P0]: duration-250 not in Tailwind v4
                      className="size-5 text-foreground transition-transform duration-250 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  ) : (
                    <Menu
                      // TODO(refactor)[P0]: duration-250 not in Tailwind v4
                      className="size-5 text-foreground transition-transform duration-250 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  )}
                </Button>
              </div>
            </div>
          </div>
          <div
            className="border-x border-border h-px bg-border"
            aria-hidden="true"
          />
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-background md:hidden"
                onClick={closeMenu}
                aria-hidden="true"
              />
              <div className="absolute top-full left-0 right-0 z-50 border-x border-b border-border bg-background shadow-lg md:hidden">
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
      </div>
    </nav>
  );
});

Navigation.displayName = "Navigation";
