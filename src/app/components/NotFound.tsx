"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

export function NotFound() {
  const { t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      {/* Main content */}
      <main className="flex-1 py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-8 animate-fade-in-up">
            {/* Error code and title */}
            <div className="space-y-4">
              <div className="font-mono text-xs sm:text-sm text-muted-foreground tracking-widest uppercase">
                {t.notFound.errorCode}
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground leading-tight">
                {t.notFound.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.notFound.description}
            </p>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Navigation menu */}
            <div className="space-y-3">
              <p className="font-mono text-xs text-muted-foreground/70 uppercase tracking-wide">
                {t.notFound.quickNav}
              </p>
              <div className="grid gap-2">
                {[
                  { label: t.nav.home, href: "/" },
                  { label: t.nav.about, href: "/about" },
                  { label: t.nav.projects, href: "/projects" },
                  { label: t.nav.blog, href: "/blog" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={getLocalizedLink(link.href)}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                  >
                    <span className="w-4 text-accent/70">→</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={getLocalizedLink("/")}
                className="group inline-flex items-center justify-center gap-2 rounded border border-foreground bg-foreground px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium text-background transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-background hover:text-foreground"
              >
                {t.notFound.cta}
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1" />
              </Link>

              <Link
                href={getLocalizedLink("/projects")}
                className="inline-flex items-center justify-center gap-2 rounded border border-border bg-background px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-foreground hover:bg-muted"
              >
                {t.nav.projects}
              </Link>
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-2 pt-4 border-t border-border">
              <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground">
                status: {t.notFound.subtitle}
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
