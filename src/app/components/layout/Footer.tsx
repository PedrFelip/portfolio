"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import { Label, MonoText } from "@/components/ui";
import { Github, Linkedin, Mail } from "@/components/ui/icons";
import { X } from "@/components/ui/x-icon";
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
      className="text-sm text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-foreground"
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
  platform: "github" | "linkedin" | "x" | "email";
}

// Brand color mappings for social platforms
const socialColorMap = {
  github:
    "hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-400",
  linkedin: "hover:border-blue-600/50 hover:bg-blue-600/10 hover:text-blue-500",
  x: "hover:border-slate-400/50 hover:bg-slate-500/10 hover:text-slate-300",
  email: "hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400",
};

/**
 * SocialLink component - External social/contact link
 */
const SocialLink = memo(({ href, label, icon, platform }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`flex items-center justify-center rounded border border-border bg-background p-2 text-muted-foreground transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] ${socialColorMap[platform]}`}
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
  // Vercel best practice: cache arrays when used in maps
  const navLinks = useMemo(
    () => [
      { href: "/", label: t.nav.home },
      { href: "/about", label: t.nav.about },
      { href: "/projects", label: t.nav.projects },
      { href: "/blog", label: t.nav.blog },
    ],
    [t.nav.home, t.nav.about, t.nav.projects, t.nav.blog],
  );

  // Memoize socialLinks array - static links don't depend on t
  // Only icons and labels are language-agnostic
  const socialLinks = useMemo(
    () => [
      {
        href: "https://github.com/pedrfelip",
        label: "GitHub",
        icon: <Github className="h-4 w-4" />,
        platform: "github" as const,
      },
      {
        href: "https://linkedin.com/in/pedrfelip",
        label: "LinkedIn",
        icon: <Linkedin className="h-4 w-4" />,
        platform: "linkedin" as const,
      },
      {
        href: "https://x.com/pedrofelipeek",
        label: "X",
        icon: <X className="h-4 w-4" />,
        platform: "x" as const,
      },
      {
        href: "mailto:pfsilva190406@gmail.com",
        label: "Email",
        icon: <Mail className="h-4 w-4" />,
        platform: "email" as const,
      },
    ],
    [],
  );

  return (
    <footer className="border-t border-border bg-card py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand - Full width on mobile, 1 col on sm, 1 col on lg */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={getLocalizedLink("/")}
              className="font-mono text-sm font-semibold tracking-tight text-foreground transition-colors duration-150 hover:text-accent"
            >
              Pedro Felipe
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Backend Engineer
            </p>
          </div>

          {/* Navigation - Stack on mobile, 1 col on sm, 1 col on lg */}
          <div className="sm:col-span-1">
            <Label className="mb-3 block text-xs uppercase tracking-wider text-faint">
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
            <Label className="mb-3 block text-xs uppercase tracking-wider text-faint">
              {t.footer.connect}
            </Label>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  platform={link.platform}
                />
              ))}
            </div>
          </div>

          {/* Tech Stack - Full width on mobile, span 2 on sm, 1 col on lg */}
          <div className="sm:col-span-2 lg:col-span-1">
            <MonoText className="text-faint">{t.footer.builtWith}</MonoText>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col items-start gap-4 border-t border-border pt-6 sm:items-center sm:justify-between sm:gap-0 sm:pt-8">
          <MonoText className="text-muted-foreground">
            © {t.footer.year} Pedro Felipe
          </MonoText>
          <MonoText className="text-faint">v2.9.7</MonoText>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
