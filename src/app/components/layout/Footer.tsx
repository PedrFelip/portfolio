"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { Label, MonoText } from "@/components/ui";
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
}

/**
 * SocialLink component - External social/contact link
 */
const SocialLink = memo(({ href, label, icon }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="flex items-center justify-center rounded border border-border bg-background p-2 text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:text-foreground"
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
 * - Clean component composition
 * - Accessible social links with aria-labels
 */
export const Footer = memo(() => {
  const { t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/projects", label: t.nav.projects },
    { href: "/blog", label: t.nav.blog },
  ];

  const socialLinks = [
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
      href: "mailto:pfsilva190406@gmail.com",
      label: "Email",
      icon: <Mail className="h-4 w-4" />,
    },
  ];

  return (
    <footer className="border-t border-border bg-card py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
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

          {/* Navigation */}
          <div>
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

          {/* Connect */}
          <div>
            <Label className="mb-3 block text-xs uppercase tracking-wider text-faint">
              {t.footer.connect}
            </Label>
            <div className="flex gap-2">
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

          {/* Tech Stack */}
          <div className="sm:col-span-2 lg:col-span-1">
            <MonoText className="text-faint">{t.footer.builtWith}</MonoText>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <MonoText className="text-muted-foreground">
            © {t.footer.year} Pedro Felipe
          </MonoText>
          <MonoText className="text-faint">v1.5.0</MonoText>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
