import type { Metadata } from "next";
import Link from "next/link";
import { Badge, H1, MonoText, P } from "@/components/ui";
import {
  ArrowRight,
  Github,
  Home,
  Linkedin,
  Mail,
} from "@/components/ui/icons";
import { X } from "@/components/ui/x-icon";

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
    url: "https://github.com/pedrfelip",
    icon: "github",
    description: "@pedrfelip",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/pedrfelip/",
    icon: "linkedin",
    description: "/in/pedrfelip",
  },
  {
    label: "X",
    url: "https://x.com/pedrofelipeek",
    icon: "x",
    description: "@pedrofelipeek",
  },
  {
    label: "Email",
    url: "mailto:pfsilva190406@gmail.com",
    icon: "email",
    description: "pfsilva190406@gmail.com",
  },
] as const;

const iconMap = {
  portfolio: Home,
  github: Github,
  linkedin: Linkedin,
  x: X,
  email: Mail,
};

// Color map for each social platform
const colorMap = {
  portfolio: {
    bg: "group-hover:bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
    text: "group-hover:text-blue-400",
  },
  github: {
    bg: "group-hover:bg-purple-500/10",
    border: "group-hover:border-purple-500/50",
    text: "group-hover:text-purple-400",
  },
  linkedin: {
    bg: "group-hover:bg-blue-600/10",
    border: "group-hover:border-blue-600/50",
    text: "group-hover:text-blue-500",
  },
  x: {
    bg: "group-hover:bg-slate-500/10",
    border: "group-hover:border-slate-400/50",
    text: "group-hover:text-slate-300",
  },
  email: {
    bg: "group-hover:bg-red-500/10",
    border: "group-hover:border-red-500/50",
    text: "group-hover:text-red-400",
  },
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
        <div className="flex flex-col gap-2 sm:gap-3">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            const colors = colorMap[link.icon];
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
                className={`group flex items-center gap-3 rounded-lg border border-border bg-card p-3 sm:p-4 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted ${colors.bg} ${colors.border}`}
              >
                {/* Icon */}
                <Icon
                  className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-foreground ${colors.text}`}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-sm font-semibold tracking-tight text-foreground">
                    {link.label}
                  </span>
                  <MonoText className="text-xs text-muted-foreground">
                    {link.description}
                  </MonoText>
                </div>

                {/* Arrow */}
                <ArrowRight
                  className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-foreground ${colors.text}`}
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
