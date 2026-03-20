"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
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
 * Blueprint design: minimal borders, subtle hover states
 */
const SocialLink = memo(({ href, label, icon }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded border border-white/[0.08] bg-white/[0.03] p-2 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-white/[0.15] hover:bg-white/[0.05] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] touch-manipulation"
  >
    {icon}
  </a>
));
SocialLink.displayName = "SocialLink";

/**
 * Footer component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Typography: monospace for data
 * - Consistent container: matches Navigation and Section components
 * - Information density: useful navigation and social links
 *
 * Best practices applied:
 * - Memoized child components to prevent re-renders
 * - useMemo for navLinks and socialLinks arrays optimization (Vercel best practice)
 * - Clean component composition
 * - Accessible social links with aria-labels
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
    <footer className="border-t border-white/[0.08] bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand - Full width on mobile, 1 col on sm, 1 col on lg */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={getLocalizedLink("/")}
              className="text-base font-semibold tracking-tight text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background touch-manipulation"
            >
              Pedro Felipe
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Backend Engineer
            </p>
          </div>

          {/* Navigation - Stack on mobile, 1 col on sm, 1 col on lg */}
          <div className="sm:col-span-1">
            <Label className="mb-3 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.footer.navigation}
            </Label>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <FooterLink key={link.href} href={getLocalizedLink(link.href)}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Connect - Flex wrap on mobile, 1 col on sm, 1 col on lg */}
          <div className="sm:col-span-1">
            <Label className="mb-3 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.footer.connect}
            </Label>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                />
              ))}
            </div>
          </div>

          {/* Tech Stack - Full width on mobile, span 2 on sm, 1 col on lg */}
          <div className="sm:col-span-2 lg:col-span-1">
            <MonoText className="text-sm text-muted-foreground">
              {t.footer.builtWith}
            </MonoText>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
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
