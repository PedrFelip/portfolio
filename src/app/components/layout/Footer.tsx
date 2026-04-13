"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import { FooterGrid, FooterGridCell } from "@/components/blueprint";
import { Label, MonoText } from "@/components/ui";
import { Github, Linkedin, Mail } from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";
import { useLanguage } from "@/lib/language-store";
import { socialLinks } from "@/lib/links";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

/**
 * FooterLink component - Internal navigation link
 * Structural Grid: subtle hover with underline animation
 */
const FooterLink = memo(
  ({ href, children, external = false }: FooterLinkProps) => (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="link-underline inline-flex min-h-[30px] items-center text-sm text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
    >
      {children}
    </Link>
  ),
);
FooterLink.displayName = "FooterLink";

interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

/**
 * SocialLink component - External social/contact link
 * Structural Grid: Consistent blueprint-style button
 */
const SocialLink = memo(({ href, label, icon }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group relative flex h-10 w-10 items-center justify-center rounded border border-overlay-border bg-surface-3 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-overlay-border-hover hover:bg-faint hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] touch-manipulation"
  >
    <div className="relative z-10 transition-transform duration-150 group-hover:scale-110">
      {icon}
    </div>
  </a>
));
SocialLink.displayName = "SocialLink";

/**
 * Footer component
 *
 * Design principles (AGENTS.md + Structural Grid + Blueprint):
 * - Container alignment: matches Navigation (mx-auto max-w-6xl px-4 sm:px-6)
 * - Blueprint Grid: visible vertical grid lines connecting cells (architectural aesthetic)
 * - Corner brackets: L-shaped technical markers on all 4 corners of each cell
 * - Hover effects: subtle background + bracket glow (150ms transitions)
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: px-6 (24px) and py-12 (48px) on each cell
 * - Dot pattern: restricted to non-contact cells to avoid visual clutter
 */
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

  const footerSocialLinks: SocialLinkProps[] = useMemo(
    () =>
      socialLinks
        .filter((l) => l.icon !== "portfolio")
        .map((link) => ({
          href: link.url,
          label: link.label,
          icon:
            link.icon === "github" ? (
              <Github className="h-4 w-4" />
            ) : link.icon === "linkedin" ? (
              <Linkedin className="h-4 w-4" />
            ) : link.icon === "x" ? (
              <XIcon className="h-4 w-4" />
            ) : (
              <Mail className="h-4 w-4" />
            ),
        })),
    [],
  );

  return (
    <footer className="relative border-t border-border bg-background">
      {/* Main container - matches Navigation max-w-6xl and padding */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Blueprint Grid with visible grid lines and corner brackets */}
        <FooterGrid>
          {/* Brand Column */}
          <FooterGridCell showCorners={false} showDotPattern={true}>
            <Link
              href={getLocalizedLink("/")}
              className="text-base font-semibold tracking-tight text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
            >
              Pedro Felipe
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Backend Engineer
            </p>
          </FooterGridCell>

          {/* Navigation Column */}
          <FooterGridCell showCorners={false} showDotPattern={true}>
            <Label className="mb-4 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.footer.navigation}
            </Label>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <FooterLink key={link.href} href={getLocalizedLink(link.href)}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </FooterGridCell>

          {/* Connect Column - NO DotPattern as requested */}
          <FooterGridCell showCorners={false} showDotPattern={false}>
            <Label className="mb-4 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.footer.connect}
            </Label>
            <div className="flex flex-wrap gap-3">
              {footerSocialLinks.map((link) => (
                <SocialLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                />
              ))}
            </div>
          </FooterGridCell>

          {/* Tech Stack Column */}
          <FooterGridCell showCorners={false} showDotPattern={true}>
            <Label className="mb-4 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Built With
            </Label>
            <MonoText className="text-sm leading-relaxed text-muted-foreground">
              {t.footer.builtWith}
            </MonoText>
          </FooterGridCell>
        </FooterGrid>

        {/* Bottom Bar - matches Navigation container */}
        <div className="flex flex-col items-start gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <MonoText className="text-xs text-muted-foreground sm:text-sm">
            © {t.footer.year} Pedro Felipe
          </MonoText>
          <MonoText className="text-xs text-muted-foreground sm:text-sm">
            v4.0.1
          </MonoText>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
