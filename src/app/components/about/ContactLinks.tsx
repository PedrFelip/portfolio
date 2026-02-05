"use client";

import { memo } from "react";
import { Label, MonoText } from "@/components/ui";
import { Github, Linkedin, Mail } from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";

interface ContactLink {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "x" | "email";
}

interface ContactLinksProps {
  links: ContactLink[];
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  x: XIcon,
  email: Mail,
};

const socialColorMap = {
  github:
    "hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-400",
  linkedin: "hover:border-blue-700/60 hover:bg-blue-700/15 hover:text-blue-400",
  x: "hover:border-slate-400/50 hover:bg-slate-500/10 hover:text-slate-300",
  email: "hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400",
};

/**
 * ContactLinks component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing (gap-3 = 12px)
 * - Symmetrical padding: matching padding on all sides (p-3 = 12px)
 * - Borders-only approach: subtle borders with platform-specific hover effects
 * - Typography: Label for names, MonoText for URLs
 * - Animation: 150ms with cubic-bezier(0.25, 1, 0.5, 1) easing
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Uses typography system (Label, MonoText)
 * - Accessible with proper aria-labels
 * - Platform-specific color scheme on hover
 */
export const ContactLinks = memo(({ links }: ContactLinksProps) => {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        const isEmail = link.icon === "email";
        const href = isEmail ? `mailto:${link.url}` : link.url;

        return (
          <a
            key={link.label}
            href={href}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            className={`group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:translate-y-[-2px] hover:shadow-[0_2px_12px_-2px_oklch(var(--foreground)/0.08)] focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-card motion-reduce:transition-none ${socialColorMap[link.icon]}`}
            aria-label={`${link.label}: ${link.url}`}
          >
            <Icon
              className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-foreground"
              aria-hidden="true"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <Label className="text-xs uppercase tracking-wider text-foreground break-words transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]">
                {link.label}
              </Label>
              <MonoText className="break-words text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]">
                {link.url}
              </MonoText>
            </div>
          </a>
        );
      })}
    </div>
  );
});

ContactLinks.displayName = "ContactLinks";
