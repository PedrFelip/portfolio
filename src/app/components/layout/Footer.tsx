"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import { DotPattern, FooterGrid, FooterGridCell } from "@/components/blueprint";
import { Label, MonoText } from "@/components/ui";
import { Github, Linkedin, Mail } from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

/**
 * FooterLink component - Internal navigation link
 * Structural Grid: hover states with subtle transitions
 */
const FooterLink = memo(
  ({ href, children, external = false }: FooterLinkProps) => (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex min-h-[36px] items-center text-sm text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:opacity-80 touch-manipulation"
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
 * Structural Grid: Blueprint-inspired card with corner brackets aesthetic
 */
const SocialLink = memo(({ href, label, icon }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group relative flex min-h-[40px] min-w-[40px] items-center justify-center rounded border border-white/[0.08] bg-white/[0.03] p-2 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] touch-manipulation overflow-hidden"
  >
    {icon}
    {/* Blueprint corner bracket decoration - only on hover */}
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/0 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-white/[0.15]" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/0 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:border-white/[0.15]" />
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
 * - 4px grid: consistent spacing throughout (12px, 16px, 24px, 32px, 48px)
 * - Symmetrical padding: px-6 (24px) and py-12 (48px) on each cell
 * - Typography: monospace for data (version numbers, dates)
 * - Dot pattern: subtle background texture for depth
 * - Grid lines: 40% opacity, visible separators between columns (technical drawing style)
 * - Responsive: 1 col mobile → 2 cols tablet → 4 cols desktop
 *
 * Best practices applied:
 * - Memoized child components to prevent re-renders
 * - useMemo for navLinks and socialLinks arrays optimization (Vercel best practice)
 * - Clean component composition with specialized FooterGrid/FooterGridCell
 * - Accessible social links with aria-labels
 * - All decorative elements have aria-hidden="true"
 */
export const Footer = memo(() => {
  const { t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();

  // Memoize navLinks array to prevent array recreation on every render
  // Vercel best practice: cache arrays when used in maps (rerender-dependencies)
  // Dependencies optimized: only include when language actually changes
  const navLinks = useMemo(
    () => [
      { href: "/", label: t.nav.home },
      { href: "/about", label: t.nav.about },
      { href: "/projects", label: t.nav.projects },
      { href: "/blog", label: t.nav.blog },
    ],
    [t.nav],
  );

  // Memoize socialLinks array - static links don't depend on props/state
  // Vercel best practice: js-cache-function-results (cache static data)
  // Empty dependency array is correct since these URLs never change
  const socialLinks: SocialLinkProps[] = useMemo(
    () => [
      {
        href: "https://github.com/pedrfelip",
        label: "GitHub",
        icon: <Github className="h-4 w-4" />,
      },
      {
        href: "https://linkedin.com/in/pedrfelip",
        label: "LinkedIn",
        icon: <Linkedin className="h-4 w-4" />,
      },
      {
        href: "https://x.com/pedrofelipeek",
        label: "X",
        icon: <XIcon className="h-4 w-4" />,
      },
      {
        href: "mailto:pfsilva190406@gmail.com",
        label: "Email",
        icon: <Mail className="h-4 w-4" />,
      },
    ],
    [],
  );

  return (
    <footer className="relative border-t border-border bg-background">
      {/* Subtle dot pattern background - blueprint aesthetic */}
      <DotPattern className="inset-0" />

      {/* Main container - matches Navigation max-w-6xl and padding */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Blueprint Grid with visible grid lines and corner brackets */}
        <FooterGrid className="py-12 sm:py-16">
          {/* Brand Column - Full width mobile, 1 col sm+lg */}
          <FooterGridCell showCorners={true}>
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
          <FooterGridCell showCorners={true}>
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

          {/* Connect Column */}
          <FooterGridCell showCorners={true}>
            <Label className="mb-4 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.footer.connect}
            </Label>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
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
          <FooterGridCell showCorners={true}>
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
            v2.41.68
          </MonoText>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
