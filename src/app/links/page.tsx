import type { Metadata } from "next";
import { memo } from "react";
import {
  RailBounded,
  RailLayout,
  SectionDivider,
} from "@/components/blueprint";
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
 * Design system alignment:
 * - Border: Increased opacity on hover (0.5 → 0.7)
 * - Background: Subtle tint (12% opacity)
 * - Text/Icon: Strong color (400-500 range)
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
 * LinkItem - Optimized link item with enhanced hover effects
 * Features:
 * - Enhanced hover feedback with lift and glow
 * - Platform-specific color scheme
 * - Touch-friendly with active states
 * - Accessible focus states
 */
const LinkItem = memo(({ label, url, icon, description }: LinkItemProps) => {
  const Icon = iconMap[icon];
  const colors = colorMap[icon];
  const isExternal = icon !== "portfolio";

  const linkProps = isExternal
    ? {
        href: url,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : { href: url };

  return (
    <a
      {...linkProps}
      className={`group flex items-center gap-3 px-3 py-3 sm:px-4 sm:py-3.5 rounded-lg border border-transparent transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-white/[0.06] hover:-translate-y-0.5 hover:border-current/10 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${colors.border} ${colors.bg}`}
    >
      {/* Icon container */}
      <div className="flex flex-shrink-0 items-center justify-center">
        <Icon
          className={`h-5 w-5 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:rotate-3 ${colors.icon}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      {/* Label and description */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-sm font-semibold tracking-tight text-foreground transition-colors duration-150">
          {label}
        </span>
        <MonoText
          className={`text-xs text-muted-foreground/60 transition-colors duration-150 ${colors.text}`}
        >
          {description}
        </MonoText>
      </div>

      {/* Arrow icon */}
      <ArrowRight
        className={`h-4 w-4 flex-shrink-0 text-muted-foreground/40 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1.5 group-hover:scale-110 group-hover:opacity-100 ${colors.icon}`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </a>
  );
});

LinkItem.displayName = "LinkItem";

/**
 * LinksPage - Optimized for single-viewport display
 * All content fits within 100vh on all breakpoints without scrolling
 * Enhanced hover effects and polish
 */
export default function LinksPage() {
  return (
    <RailLayout className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-background">
      {/* Header Section - Compact */}
      <div>
        <SectionDivider />
        <RailBounded className="px-6 py-8 sm:py-10 lg:py-12">
          <div className="mx-auto w-full max-w-2xl text-center">
            {/* Availability Badge */}
            <div className="mb-4 inline-flex">
              <Badge className="inline-flex items-center gap-2 transition-all duration-150 hover:scale-105 hover:ring-2 hover:ring-green-500/20">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                <span>Available for work</span>
              </Badge>
            </div>

            {/* Main Title */}
            <H1 className="mb-2 text-3xl sm:text-4xl lg:text-5xl transition-colors duration-150 tracking-tight">
              Pedro Felipe
            </H1>

            {/* Subtitle */}
            <P className="text-sm sm:text-base lg:text-lg text-muted-foreground transition-colors duration-150">
              Backend Engineer & System Architect
            </P>
          </div>
        </RailBounded>
        <SectionDivider />
      </div>

      {/* Links Section - Flexible height, centered */}
      <RailBounded className="px-6 py-8 sm:py-10 lg:py-12 flex items-center">
        <div className="mx-auto w-full max-w-3xl">
          {/* Single column list - integrated vertical stack */}
          <div className="flex flex-col">
            {socialLinks.map((link, index) => (
              <div
                key={link.label}
                className={`border-b border-border/20 last:border-b-0 ${
                  index === 0 ? "border-t border-border/20" : ""
                }`}
              >
                <LinkItem
                  label={link.label}
                  url={link.url}
                  icon={link.icon}
                  description={link.description}
                />
              </div>
            ))}
          </div>
        </div>
      </RailBounded>

      {/* Footer Section - Minimal */}
      <div>
        <SectionDivider />
        <RailBounded className="px-6 py-6 sm:py-8">
          <div className="mx-auto w-full max-w-2xl text-center">
            <MonoText className="text-xs sm:text-sm text-muted-foreground/70 transition-colors duration-150">
              © {new Date().getFullYear()} Pedro Felipe · Made with precision
              for backend engineering
            </MonoText>
          </div>
        </RailBounded>
      </div>
    </RailLayout>
  );
}
