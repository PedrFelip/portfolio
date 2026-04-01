"use client";

import Link from "next/link";
import {
  AlignedFlickeringGrid,
  CornerBrackets,
  RailBounded,
  RailLayout,
} from "@/components/blueprint";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { H1, Label, MonoText, P } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";
import { useLanguage } from "@/lib/LanguageContext";
import { useLocalizedLink } from "@/lib/useLocalizedLink";
import { cn } from "@/lib/utils";

/**
 * NotFound component
 *
 * Design principles (AGENTS.md & frontend-design skill):
 * - Architectural Precision: asymmetrical layouts, grid-aware composition
 * - Blueprint/Grid Decorations: visible grid lines, corner brackets
 * - 4px grid: consistent spacing throughout
 * - Monospace for technical data
 */
export function NotFound() {
  const { t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();

  return (
    <RailLayout className="min-h-screen bg-background">
      <Navigation />

      <main className="relative flex-1 flex flex-col justify-center overflow-hidden">
        {/* Decorative Grid Background - Blueprint Atmosphere */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15] dark:opacity-[0.08]">
          <AlignedFlickeringGrid
            side="left"
            className="absolute left-0 top-0 bottom-0 w-1/3"
          />
          <AlignedFlickeringGrid
            side="right"
            className="absolute right-0 top-0 bottom-0 w-1/3"
          />
        </div>

        <RailBounded className="relative z-10 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Huge 404 (Asymmetrical Architectural Detail) */}
            <div className="lg:col-span-5 flex flex-col gap-6 animate-in-left">
              <div className="relative group">
                <CornerBrackets className="opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <div className="p-8 md:p-12 border border-border/40 bg-card/30 backdrop-blur-sm">
                  {/* Decorative Background Text */}
                  <span className="block font-mono text-8xl md:text-9xl font-bold tracking-tighter text-foreground/5 select-none leading-none">
                    404
                  </span>
                  {/* Main Centered Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-6xl md:text-7xl font-bold tracking-tighter text-foreground animate-pulse-subtle">
                      404
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Status Badge */}
              <div className="flex items-center gap-3 px-4 py-2 border border-border/40 bg-muted/20 w-fit rounded-sm">
                <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                <MonoText className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  system.status: {t.notFound.subtitle}
                </MonoText>
              </div>
            </div>

            {/* Right Column: Content & Navigation */}
            <div className="lg:col-span-7 space-y-8 md:space-y-10 animate-in-right animate-delay-150">
              <div className="space-y-4">
                <Label className="uppercase tracking-[0.2em] text-accent/80 font-semibold text-xs">
                  {t.notFound.errorCode}
                </Label>
                <H1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  {t.notFound.title}
                </H1>
                <P className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                  {t.notFound.description}
                </P>
              </div>

              {/* Navigation Grid - Blueprint Inspired Interaction */}
              <div className="space-y-4">
                <Label className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
                  {t.notFound.quickNav}
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: t.nav.home,
                      href: "/",
                      desc: "Return to system root",
                    },
                    {
                      label: t.nav.projects,
                      href: "/projects",
                      desc: "View technical builds",
                    },
                    {
                      label: t.nav.blog,
                      href: "/blog",
                      desc: "Read engineering logs",
                    },
                    {
                      label: t.nav.about,
                      href: "/about",
                      desc: "Architect specifications",
                    },
                  ].map((link, i) => (
                    <Link
                      key={link.href}
                      href={getLocalizedLink(link.href)}
                      className={cn(
                        "group relative p-4 border border-border/40 bg-card/20 hover:bg-accent/[0.03] hover:border-accent/40 transition-all duration-200",
                        `animate-in-up animate-delay-${(i + 4) * 50}`,
                      )}
                    >
                      <CornerBrackets
                        size={8}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <ArrowRight className="h-3 w-3 text-accent group-hover:translate-x-1 transition-transform" />
                          <span className="text-xs font-semibold uppercase tracking-wider">
                            {link.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-muted-foreground group-hover:text-foreground/70 transition-colors">
                          {link.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Primary Action */}
              <div className="pt-8 border-t border-border/40">
                <Link
                  href={getLocalizedLink("/")}
                  className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-foreground text-background font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors duration-200 rounded-sm"
                >
                  {t.notFound.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </RailBounded>
      </main>

      <Footer />
    </RailLayout>
  );
}
