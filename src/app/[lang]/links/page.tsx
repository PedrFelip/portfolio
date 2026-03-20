import type { Metadata } from "next";
import Link from "next/link";
import { memo } from "react";
import {
  CornerBrackets,
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
import { linksEn } from "@/lib/content/links.en";
import { linksPt } from "@/lib/content/links.pt";

interface LinksPageProps {
  params: Promise<{ lang: "en" | "pt" }>;
}

export async function generateMetadata({
  params,
}: LinksPageProps): Promise<Metadata> {
  const { lang } = await params;
  const content = lang === "pt" ? linksPt : linksEn;

  return {
    title: `${content.links.heading} - Links`,
    description: content.links.footerText,
  };
}

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
 * LinkItem - Individual card with blueprint styling
 * Features:
 * - Corner bracket decorations
 * - Dot pattern overlay
 * - Platform-specific color scheme on hover
 * - Responsive grid layout
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
      {...linkProps}
      aria-label={`Visit ${label}`}
      className={`group relative flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:p-6 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105 ${colors.border} ${colors.bg}`}
    >
      {/* Dot pattern overlay */}
      <div
        className="dot-pattern absolute inset-0 rounded-lg opacity-20 transition-opacity duration-200 group-hover:opacity-40"
        aria-hidden="true"
      />

      {/* Corner brackets */}
      <div className="absolute inset-0 pointer-events-none">
        <CornerBrackets
          size={12}
          className="transition-all duration-200 opacity-30 group-hover:opacity-50 border-border/40 group-hover:border-border/70"
        />
      </div>

      {/* Content - relative z-index above pattern */}
      <div className="relative z-10 flex items-center gap-3">
        {/* Icon container */}
        <div className="relative flex flex-shrink-0 items-center justify-center">
          <Icon
            className={`h-5 w-5 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 ${colors.icon}`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>

        {/* Label and description */}
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

        {/* Arrow icon */}
        <ArrowRight
          className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1 group-hover:scale-110 ${colors.icon}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>
    </LinkComponent>
  );
});

LinkItem.displayName = "LinkItem";

/**
 * LinksPage - Localized links page with structural grid design
 * Uses blueprint components: RailLayout, SectionDivider, RailBounded, DotPattern
 * Responsive grid: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
 */
export default async function LinksPage({ params }: LinksPageProps) {
  const { lang } = await params;
  const content = lang === "pt" ? linksPt : linksEn;

  return (
    <RailLayout className="min-h-screen bg-background">
      {/* Header Section with Divider */}
      <SectionDivider />

      <RailBounded className="px-6 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-2xl text-center">
          {/* Availability Badge */}
          <div className="mb-6 inline-flex">
            <Badge className="inline-flex items-center gap-2 transition-all duration-150 hover:scale-105">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
              <span>{content.links.availableForWork}</span>
            </Badge>
          </div>

          {/* Main Title */}
          <H1 className="mb-4 text-4xl sm:text-5xl transition-colors duration-150 tracking-tight">
            {content.links.heading}
          </H1>

          {/* Subtitle */}
          <P className="text-base sm:text-lg text-muted-foreground transition-colors duration-150">
            {content.links.subtitle}
          </P>
        </div>
      </RailBounded>

      <SectionDivider />

      {/* Links Grid Section */}
      <RailBounded className="px-6 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-4xl">
          {/* Responsive grid: 1 col → 2 cols → 3 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
        </div>
      </RailBounded>

      <SectionDivider />

      {/* Footer Section */}
      <RailBounded className="px-6 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-2xl text-center">
          <MonoText className="text-xs sm:text-sm text-muted-foreground/70 transition-colors duration-150">
            © {new Date().getFullYear()} {content.links.heading} ·{" "}
            {content.links.footerText}
          </MonoText>
        </div>
      </RailBounded>
    </RailLayout>
  );
}
