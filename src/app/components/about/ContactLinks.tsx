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
 * ContactLinks component - Blueprint Edition
 *
 * Updated to match the architectural/blueprint aesthetic:
 * - Sharp corners (rounded-none)
 * - Transparent background with subtle tint
 * - Monospace for both labels and URLs
 * - Platform-specific hover glow
 */
export const ContactLinks = memo(({ links }: ContactLinksProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
            className={`group flex items-center gap-4 rounded-none border border-white/[0.08] bg-white/[0.02] p-4 transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:translate-y-[-2px] hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.1)] focus:outline-none focus:ring-1 focus:ring-white/20 motion-reduce:transition-none ${socialColorMap[link.icon]}`}
            aria-label={`${link.label}: ${link.url}`}
          >
            <Icon
              className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors duration-200 group-hover:text-foreground"
              aria-hidden="true"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <Label className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground/60 transition-colors duration-200 group-hover:text-muted-foreground">
                {link.label}
              </Label>
              <MonoText className="break-words text-[11px] text-foreground/80 group-hover:text-foreground transition-colors duration-200">
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
