"use client";

import { memo } from "react";
import { CornerBrackets } from "@/components/blueprint";
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

/**
 * ContactLinks component - Minimal Blueprint Edition
 *
 * Simplified version:
 * - Focuses exclusively on icons for a cleaner look
 * - Maintains the blueprint card aesthetic with corner brackets
 * - Precision-focused 48x48 icon buttons
 */
export const ContactLinks = memo(({ links }: ContactLinksProps) => {
  return (
    <div className="flex flex-wrap gap-3">
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
            className="group relative flex h-12 w-12 items-center justify-center border border-white/[0.08] bg-white/[0.02] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-white/20 hover:bg-white/[0.04] focus:outline-none focus:ring-1 focus:ring-white/20"
            aria-label={`${link.label}: ${link.url}`}
            title={link.label}
          >
            <CornerBrackets
              size={6}
              className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />

            <Icon
              className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:text-foreground"
              aria-hidden="true"
            />

            {/* Subtle decorative dot */}
            <div className="absolute -bottom-0.5 -right-0.5 h-1 w-1 bg-white/10 transition-colors group-hover:bg-white/30" />
          </a>
        );
      })}
    </div>
  );
});

ContactLinks.displayName = "ContactLinks";
