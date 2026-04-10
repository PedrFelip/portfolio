"use client";

import { memo } from "react";
import { H1, P } from "@/components/ui";
import {
  ArrowRight,
  Github,
  Home,
  Linkedin,
  Mail,
} from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";
import { useLanguage } from "@/lib/language-store";
import { socialLinks } from "@/lib/links";

const iconMap = {
  portfolio: Home,
  github: Github,
  linkedin: Linkedin,
  x: XIcon,
  email: Mail,
};

const colorMap = {
  portfolio: {
    border: "group-hover:border-accent/70",
    bg: "group-hover:bg-accent/12",
    text: "group-hover:text-accent",
    icon: "group-hover:text-accent",
  },
  github: {
    border: "group-hover:border-[var(--brand-violet)]/70",
    bg: "group-hover:bg-[var(--brand-violet)]/12",
    text: "group-hover:text-[var(--brand-violet)]",
    icon: "group-hover:text-[var(--brand-violet)]",
  },
  linkedin: {
    border: "group-hover:border-[var(--brand-linkedin)]/70",
    bg: "group-hover:bg-[var(--brand-linkedin)]/12",
    text: "group-hover:text-[var(--brand-linkedin)]",
    icon: "group-hover:text-[var(--brand-linkedin)]",
  },
  x: {
    border: "group-hover:border-[var(--brand-slate)]/70",
    bg: "group-hover:bg-[var(--brand-slate)]/12",
    text: "group-hover:text-[var(--brand-slate)]",
    icon: "group-hover:text-[var(--brand-slate)]",
  },
  email: {
    border: "group-hover:border-[var(--brand-email)]/70",
    bg: "group-hover:bg-[var(--brand-email)]/12",
    text: "group-hover:text-[var(--brand-email)]",
    icon: "group-hover:text-[var(--brand-email)]",
  },
};

interface LinkItemProps {
  label: string;
  url: string;
  icon: keyof typeof iconMap;
  description: string;
}

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
      className={`group flex items-center gap-4 px-4 py-3.5 sm:px-5 sm:py-4 lg:px-6 lg:py-5 rounded-lg border border-transparent transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-surface-4 hover:-translate-y-0.5 hover:border-current/10 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${colors.border} ${colors.bg}`}
    >
      <div className="flex flex-shrink-0 items-center justify-center">
        <Icon
          className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 group-hover:rotate-3 ${colors.icon}`}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-base font-semibold tracking-tight text-foreground transition-colors duration-150 sm:text-lg lg:text-xl">
          {label}
        </span>
        <span
          className={`text-sm text-muted-foreground/60 transition-colors duration-150 sm:text-base lg:text-lg ${colors.text}`}
        >
          {description}
        </span>
      </div>

      <ArrowRight
        className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 flex-shrink-0 text-muted-foreground/40 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1.5 group-hover:scale-110 group-hover:opacity-100 ${colors.icon}`}
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </a>
  );
});

LinkItem.displayName = "LinkItem";

function LinksContent() {
  const { t } = useLanguage();

  const descriptionMap: Record<string, string> = {
    portfolio: t.links.portfolioDescription,
    github: t.links.githubDescription,
    linkedin: t.links.linkedinDescription,
    x: t.links.xDescription,
    email: t.links.emailDescription,
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <H1 className="mb-0.5 text-center text-2xl sm:text-3xl lg:text-4xl tracking-tight">
          {t.links.heading}
        </H1>

        <P className="mb-8 text-center text-sm text-muted-foreground">
          {t.links.subtitle}
        </P>

        <div className="flex flex-col gap-1 sm:gap-1.5 lg:gap-2">
          {socialLinks.map((link) => (
            <LinkItem
              key={link.label}
              label={link.label}
              url={link.url}
              icon={link.icon}
              description={descriptionMap[link.icon] || ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LinksClient() {
  return <LinksContent />;
}
