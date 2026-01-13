"use client";

import { Github, Home, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import type { SocialLink } from "@/lib/links";
import { socialLinks } from "@/lib/links";

const iconMap = {
  portfolio: Home,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
};

export default function LinksPage() {
  const { t } = useLanguage();

  // Hide navigation on this page
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      nav.style.display = "none";
    }
    return () => {
      if (nav) {
        nav.style.display = "";
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background px-4 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-sm sm:max-w-md">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center">
          <h1 className="mb-2 font-mono text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
            {t.links.heading}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground px-2">
            {t.links.subtitle}
          </p>
        </div>

        {/* Link Cards */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {socialLinks.map((link: SocialLink) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.url}
                target={link.icon === "portfolio" ? "_self" : "_blank"}
                rel={
                  link.icon === "portfolio" ? undefined : "noopener noreferrer"
                }
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 transition-colors hover:border-foreground hover:bg-muted active:opacity-75"
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-muted-foreground" />
                <span className="text-sm sm:text-base md:text-lg font-medium text-foreground">
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Footer text */}
        <p className="mt-8 sm:mt-10 text-center text-xs sm:text-sm text-muted-foreground px-2">
          {t.links.footerText}
        </p>
      </div>
    </div>
  );
}
