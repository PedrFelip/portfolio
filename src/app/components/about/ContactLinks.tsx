"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { memo } from "react";
import { Label, MonoText } from "@/components/ui";
import { X } from "@/components/ui/x-icon";

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
  x: X,
  email: Mail,
};

/**
 * ContactLinks component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing (gap-2, gap-4, p-4)
 * - Symmetrical padding: matching padding on all sides
 * - Borders-only approach: subtle borders with hover effects
 * - Typography: Label for names, MonoText for URLs
 * - Animation: 150ms with cubic-bezier easing
 *
 * Best practices applied:
 * - Memoized to prevent re-renders
 * - Uses typography system (Label, MonoText)
 * - Accessible with proper aria-labels
 */
export const ContactLinks = memo(({ links }: ContactLinksProps) => {
  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
            className="group flex flex-col gap-2 rounded-lg border border-border bg-card p-4 sm:p-5 transition-[border-color,background-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted motion-reduce:transition-none"
            aria-label={`${link.label}: ${link.url}`}
          >
            <div className="flex items-start sm:items-center gap-2 min-w-0">
              <Icon
                className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-muted-foreground transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:text-foreground"
                aria-hidden="true"
              />
              <Label className="text-xs uppercase tracking-wider text-foreground break-words">
                {link.label}
              </Label>
            </div>
            <MonoText className="break-words text-xs text-muted-foreground">
              {link.url}
            </MonoText>
          </a>
        );
      })}
    </div>
  );
});

ContactLinks.displayName = "ContactLinks";
