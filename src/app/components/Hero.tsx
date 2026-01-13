"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 md:py-32 lg:px-8">
      {/* Greeting */}
      <div className="mb-4 sm:mb-6 font-mono text-xs sm:text-sm text-muted-foreground">
        {t.hero.greeting}
      </div>

      {/* Main Title */}
      <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight text-foreground">
        {t.hero.title}
      </h1>

      {/* Subtitle/Description */}
      <p className="mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg md:text-lg leading-relaxed text-muted-foreground">
        {t.hero.description}
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row mb-12 sm:mb-16">
        <Link
          href="/projects"
          className="group inline-flex items-center justify-center gap-2 rounded border border-foreground bg-foreground px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-background transition-all hover:bg-background hover:text-foreground"
        >
          {t.hero.cta}
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <Link
          href="/about"
          className="inline-flex items-center justify-center gap-2 rounded border border-border bg-background px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-foreground transition-colors hover:border-foreground hover:bg-muted"
        >
          {t.hero.ctaSecondary}
        </Link>
      </div>

      {/* Tech Stack Badge */}
      <div className="flex flex-wrap gap-2">
        {["Node.js", "TypeScript", "Go", "PostgreSQL", "Docker", "Linux"].map(
          (tech) => (
            <span
              key={tech}
              className="rounded border border-border bg-muted px-2.5 sm:px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ),
        )}
      </div>
    </section>
  );
};
