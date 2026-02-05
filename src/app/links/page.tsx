import type { Metadata } from "next";
import Link from "next/link";
import { memo } from "react";
import { Badge, H1, MonoText, P } from "@/components/ui";
import {
  ArrowRight,
  Github,
  Home,
  Linkedin,
  Mail,
} from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";

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
  x: XIcon,
  email: Mail,
};

/**
 * Color map for each social platform
 *
 * Design system alignment:
 * - Border: Increased opacity on hover for clarity (0.5 → 0.6-0.7)
 * - Background: Subtle tint (10-15% opacity) for visibility
 * - Text/Icon: Strong color (400-500 range) for contrast
 * - Matches AGENTS.md: borders-only approach with color accents on hover
 */
const colorMap = {
  portfolio: {
    border: "group-hover:border-blue-500/70",
    bg: "group-hover:bg-blue-500/12",
    text: "group-hover:text-blue-400",
    icon: "group-hover:text-blue-400",
  },
  github: {
    border: "group-hover:border-purple-500/70",
    bg: "group-hover:bg-purple-500/12",
    text: "group-hover:text-purple-400",
    icon: "group-hover:text-purple-400",
  },
  linkedin: {
    border: "group-hover:border-blue-600/70",
    bg: "group-hover:bg-blue-600/12",
    text: "group-hover:text-blue-400",
    icon: "group-hover:text-blue-400",
  },
  x: {
    border: "group-hover:border-slate-400/70",
    bg: "group-hover:bg-slate-400/12",
    text: "group-hover:text-slate-300",
    icon: "group-hover:text-slate-300",
  },
  email: {
    border: "group-hover:border-red-500/70",
    bg: "group-hover:bg-red-500/12",
    text: "group-hover:text-red-400",
    icon: "group-hover:text-red-400",
  },
};

interface LinkItemProps {
  label: string;
  url: string;
  icon: keyof typeof iconMap;
  description: string;
}

/**
 * LinkItem component - Individual social/contact link
 *
 * Enhanced hover effects:
 * - Border: color + opacity increase (0.5 → 0.7)
 * - Background: subtle tint for depth
 * - Text: color transition for icon and description
 * - Transform: subtle scale and translate for feedback
 * - Duration: 150ms with cubic-bezier easing (Vercel best practice)
 *
 * Memoized to prevent re-renders when parent re-renders
 * Vercel best practice: rerender-memo
 */
const LinkItem = memo(({ label, url, icon, description }: LinkItemProps) => {
  const Icon = iconMap[icon];
  const colors = colorMap[icon];
  const isExternal = icon !== "portfolio";

  const LinkComponent = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? {
        href: url,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : { href: url };

  return (
    <LinkComponent
      key={label}
      {...linkProps}
      aria-label={`Visit ${label}`}
      className={`group relative flex items-center gap-3 rounded-lg border border-border bg-card p-3 sm:p-4 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.02] ${colors.border} ${colors.bg}`}
    >
      {/* Icon container with enhanced hover */}
      <div className="relative flex flex-shrink-0 items-center justify-center">
        <Icon
          className={`h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 ${colors.icon}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      {/* Content section */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-sm font-semibold tracking-tight text-foreground transition-colors duration-150 group-hover:text-foreground">
          {label}
        </span>
        <MonoText
          className={`text-xs text-muted-foreground transition-colors duration-150 ${colors.text}`}
        >
          {description}
        </MonoText>
      </div>

      {/* Arrow icon with enhanced animation */}
      <ArrowRight
        className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1 group-hover:scale-110 ${colors.icon}`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </LinkComponent>
  );
});

LinkItem.displayName = "LinkItem";

/**
 * LinksPage component (Linktree-style)
 *
 * Design principles (AGENTS.md):
 * - Uses CSS variables from globals.css
 * - Borders-only approach for cards
 * - Typography: monospace accents
 * - Animation: 150ms with cubic-bezier easing
 * - Dark mode by default
 *
 * Performance optimizations (Vercel best practices):
 * - LinkItem is memoized (rerender-memo)
 * - socialLinks array is static and cached
 * - iconMap and colorMap are static module-level data
 *
 * Enhanced hover effects:
 * - Scale transform for subtle lift effect
 * - Shadow for depth perception
 * - Color transitions aligned with design system
 * - Consistent 150ms animation timing across all elements
 */
export default function LinksPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 sm:p-12">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Header Section */}
        <div className="mb-12 text-center">
          {/* Availability Badge */}
          <div className="mb-4 inline-flex">
            <Badge className="mb-4 inline-flex items-center gap-2 transition-all duration-150 hover:scale-105">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              <span>Available for work</span>
            </Badge>
          </div>

          {/* Main Title */}
          <H1 className="mb-3 text-3xl sm:text-4xl transition-colors duration-150">
            Pedro Felipe
          </H1>

          {/* Subtitle */}
          <P className="text-muted-foreground transition-colors duration-150">
            Backend Engineer
          </P>
        </div>

        {/* Links Grid */}
        <div className="flex flex-col gap-2 sm:gap-3">
          {socialLinks.map((link) => (
            <LinkItem
              key={link.label}
              label={link.label}
              url={link.url}
              icon={link.icon}
              description={link.description}
            />
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-12 text-center">
          <MonoText className="text-faint transition-colors duration-150">
            © {new Date().getFullYear()} Pedro Felipe
          </MonoText>
        </div>
      </div>
    </div>
  );
}
