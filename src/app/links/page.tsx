import {
  ArrowRight,
  Github,
  Home,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge, H1, MonoText, P } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pedro Felipe - Links",
  description: "Connect with me on social media and professional platforms",
};

const socialLinks = [
  {
    label: "Portfolio",
    url: "/",
    icon: "portfolio",
    description: "View my projects",
  },
  {
    label: "GitHub",
    url: "https://github.com/pdrfelipe",
    icon: "github",
    description: "@pdrfelipe",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/pdrfelipe/",
    icon: "linkedin",
    description: "/in/pdrfelipe",
  },
  {
    label: "X / Twitter",
    url: "https://x.com/pedrofelipeek",
    icon: "twitter",
    description: "@pedrofelipeek",
  },
  {
    label: "Email",
    url: "mailto:pdrfelipe99@gmail.com",
    icon: "email",
    description: "pdrfelipe99@gmail.com",
  },
] as const;

const iconMap = {
  portfolio: Home,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

/**
 * LinksPage component (Linktree-style)
 *
 * Design principles (AGENTS.md):
 * - Uses CSS variables from globals.css
 * - Borders-only approach for cards
 * - Typography: monospace accents
 * - Animation: 150ms with cubic-bezier easing
 * - Dark mode by default
 */
export default function LinksPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 sm:p-12">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge className="mb-4 inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            <span>Available for work</span>
          </Badge>

          <H1 className="mb-3 text-3xl sm:text-4xl">Pedro Felipe</H1>

          <P className="text-muted-foreground">Backend Engineer</P>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            const isExternal = link.icon !== "portfolio";

            const LinkComponent = isExternal ? "a" : Link;
            const linkProps = isExternal
              ? {
                  href: link.url,
                  target: "_blank" as const,
                  rel: "noopener noreferrer",
                }
              : { href: link.url };

            return (
              <LinkComponent
                key={link.label}
                {...linkProps}
                aria-label={`Visit ${link.label}`}
                className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground"
              >
                {/* Icon */}
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors duration-150 group-hover:border-foreground group-hover:text-foreground"
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm font-semibold tracking-tight text-foreground">
                    {link.label}
                  </span>
                  <MonoText className="text-muted-foreground">
                    {link.description}
                  </MonoText>
                </div>

                {/* Arrow */}
                <ArrowRight
                  className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-foreground"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </LinkComponent>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <MonoText className="text-faint">
            © {new Date().getFullYear()} Pedro Felipe
          </MonoText>
        </div>
      </div>
    </div>
  );
}
