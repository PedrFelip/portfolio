"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import { Logo, MonoText } from "@/components/ui";
import { Github, Linkedin, Mail } from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";
import { useLanguage } from "@/lib/language-store";
import { socialLinks } from "@/lib/links";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

/**
 * Footer — chanhdai.com inspired blueprint layout
 *
 * Structure (top to bottom):
 * 1. Diagonal hatch separator
 * 2. Brand row: logo + name | tagline mono
 * 3. Two-column grid: nav links | social icons
 *    - visible vertical grid line between columns
 * 4. Bottom bar: copyright | version
 *
 * All inside bp-panel (border-x) with screen-spanning horizontal lines
 */

function Separator({ className }: { className?: string }) {
  return <div className={className ?? "bp-separator"} />;
}

export const Footer = memo(() => {
  const { t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();

  const navLinks = useMemo(
    () => [
      { href: "/", label: t.nav.home },
      { href: "/about", label: t.nav.about },
      { href: "/projects", label: t.nav.projects },
      { href: "/blog", label: t.nav.blog },
    ],
    [t.nav],
  );

  const footerSocialLinks = useMemo(
    () =>
      socialLinks
        .filter((l) => l.icon !== "portfolio")
        .map((link) => ({
          href: link.url,
          label: link.label,
          icon:
            link.icon === "github" ? (
              <Github className="size-3.5" />
            ) : link.icon === "linkedin" ? (
              <Linkedin className="size-3.5" />
            ) : link.icon === "x" ? (
              <XIcon className="size-3.5" />
            ) : (
              <Mail className="size-3.5" />
            ),
        })),
    [],
  );

  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="mx-auto md:max-w-3xl">
        {/* ─── Hatch Separator ─── */}
        <Separator />

        {/* ─── Brand Row ─── */}
        <div className="bp-panel bp-line-bottom flex items-center justify-between px-4 py-4">
          <Link
            href={getLocalizedLink("/")}
            className="group flex items-center gap-3 text-foreground transition-colors duration-150 hover:text-muted-foreground"
          >
            <Logo height={22} className="h-5 w-auto" />
            <span className="h-4 w-px bg-border/40" aria-hidden="true" />
            <span className="text-sm font-medium tracking-tight">
              Pedro Felipe
            </span>
          </Link>
          <MonoText className="text-[10px] tracking-[0.2em] text-border uppercase hidden sm:block">
            backend engineer
          </MonoText>
        </div>

        {/* ─── Two-column: Nav + Social ─── */}
        <div className="bp-panel bp-line-bottom relative">
          {/* Vertical grid lines */}
          <div
            className="pointer-events-none absolute inset-0 hidden sm:grid sm:grid-cols-[1fr_auto_1fr]"
            aria-hidden="true"
          >
            <div />
            <div className="border-x border-border/40" />
            <div />
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr]">
            {/* Nav Column */}
            <nav className="flex flex-col gap-0 px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLocalizedLink(link.href)}
                  className="
                    group flex items-center gap-2 py-1.5 text-sm text-muted-foreground
                    transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]
                    hover:text-foreground
                  "
                >
                  <span
                    className="
                      inline-block h-px bg-border/40
                      transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
                      w-3 group-hover:w-5 group-hover:bg-foreground/40
                    "
                    aria-hidden="true"
                  />
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Center divider */}
            <div className="hidden sm:block w-px" />

            {/* Social Column */}
            <div className="flex flex-col items-start justify-center gap-2 px-4 py-3 sm:items-end">
              <MonoText className="text-[9px] tracking-[0.2em] text-border/80 uppercase">
                connect
              </MonoText>
              <div className="flex items-center gap-3">
                {footerSocialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="
                      text-muted-foreground/50 transition-all duration-300
                      ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground
                    "
                  >
                    <span className="block transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110">
                      {link.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="bp-panel flex items-center justify-between px-4 py-4">
          <MonoText className="text-[10px] tracking-[0.15em] text-border/80">
            © {t.footer.year}
          </MonoText>
          <MonoText className="text-[10px] tracking-[0.15em] text-border/80">
            v4.4.0
          </MonoText>
        </div>
      </div>

      {/* Safe area spacer */}
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="h-16" />
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
