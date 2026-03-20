import type { Metadata } from "next";
import { memo } from "react";
import {
  RailBounded,
  RailLayout,
  SectionDivider,
} from "@/components/blueprint";
import { Badge, H1, MonoText, P } from "@/components/ui";
import { ArrowRight, Github, Linkedin, Mail } from "@/components/ui/icons";
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
 * LinkItem - Minimal integrated link item
 * Features:
 * - Borderless, transparent design
 * - Subtle hover effect blending with background
 * - Platform-specific color scheme on hover
 * - Responsive layout
 */
const LinkItem = memo(({ label, url, icon, description }: LinkItemProps) => {
  const Icon = iconMap[icon];
  const colors = colorMap[icon];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-3 px-3 py-4 sm:px-4 sm:py-5 rounded-lg transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-white/[0.04] ${colors.border} ${colors.bg}`}
    >
      {/* Icon container */}
      <div className="flex flex-shrink-0 items-center justify-center">
        <Icon
          className={`h-5 w-5 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 ${colors.icon}`}
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
        className={`h-4 w-4 flex-shrink-0 text-muted-foreground/40 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1 group-hover:scale-110 group-hover:text-muted-foreground/70 ${colors.icon}`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </a>
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
      <RailBounded className="px-6 py-12 sm:py-16 lg:py-20">
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
