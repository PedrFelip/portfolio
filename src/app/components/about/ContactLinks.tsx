"use client";

import { Github, Linkedin, Mail } from "lucide-react";

interface ContactLink {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "email";
}

interface ContactLinksProps {
  links: ContactLink[];
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
};

export const ContactLinks = ({ links }: ContactLinksProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
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
            className="flex flex-col gap-2 rounded-lg border border-border bg-card px-4 py-4 transition-all hover:border-foreground hover:bg-muted group"
          >
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              <span className="text-sm font-mono font-semibold text-foreground uppercase tracking-wide">
                {link.label}
              </span>
            </div>
            <span className="text-xs text-muted-foreground break-all">
              {link.url}
            </span>
          </a>
        );
      })}
    </div>
  );
};
