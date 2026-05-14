"use client";

import Link from "next/link";
import {
  RailBounded,
  RailLayout,
  Reveal,
  SectionBadge,
} from "@/components/blueprint";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { Button } from "@/components/ui/button";
import { MonoText } from "@/components/ui";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { useLanguage } from "@/lib/language-store";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
] as const;

export function NotFound() {
  const { t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();

  return (
    <RailLayout className="min-h-screen bg-background">
      <Navigation />

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-border"
          viewBox="0 0 400 600"
          fill="none"
          aria-hidden="true"
        >
          <g className="text-border">
            <path
              className="bp-draw-dashed"
              style={{ animationDelay: "0ms, 0ms" }}
              d="M-100 200L500 400"
              stroke="currentColor"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="bp-draw-dashed"
              style={{ animationDelay: "200ms, 200ms" }}
              d="M-100 400L500 200"
              stroke="currentColor"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          <g>
            <path
              className="bp-draw-line"
              style={{ animationDelay: "400ms, 400ms" }}
              d="M0 300L400 300"
              stroke="currentColor"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="bp-draw-line"
              style={{ animationDelay: "500ms, 500ms" }}
              d="M200 0L200 600"
              stroke="currentColor"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          <g>
            <rect
              className="bp-draw-rect"
              style={{ animationDelay: "700ms, 700ms" }}
              x="345"
              y="20"
              width="25"
              height="25"
              stroke="currentColor"
              vectorEffect="non-scaling-stroke"
            />
            <rect
              className="bp-draw-rect"
              style={{ animationDelay: "900ms, 900ms" }}
              x="30"
              y="555"
              width="25"
              height="25"
              stroke="currentColor"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          <circle
            className="bp-draw-rect text-muted-foreground/30"
            style={{ animationDelay: "1100ms, 1100ms" }}
            cx="200"
            cy="300"
            r="8"
            stroke="currentColor"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <RailBounded className="relative z-10 w-full py-16 md:py-24">
          <Reveal variant="up" delay={0.2}>
            <div className="mx-auto max-w-lg bp-panel bp-line-top bp-line-bottom">
              <SectionBadge className="bp-line-bottom px-4 py-3 sm:px-6">
                <MonoText className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                  {t.notFound.errorCode}
                </MonoText>
                <h1 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                  {t.notFound.title}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t.notFound.description}
                </p>
              </SectionBadge>

              <div className="px-4 py-8 sm:px-6">
                <MonoText className="text-[10px] tracking-[0.2em] text-muted-foreground/40 uppercase">
                  {t.notFound.quickNav}
                </MonoText>

                <div className="mt-4">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.key}
                      href={getLocalizedLink(item.href)}
                      className="group flex items-center justify-between py-2.5 border-b border-border/20 hover:border-border/50 transition-colors duration-150"
                    >
                      <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground group-hover:text-foreground transition-colors duration-150">
                        {t.nav[item.key]}
                      </span>
                      <ArrowRight className="size-3.5 text-muted-foreground/30 opacity-70 group-hover:translate-x-1.5 group-hover:opacity-100 group-hover:text-foreground transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                    </Link>
                  ))}
                </div>

                <div className="mt-8">
                  <Button asChild variant="primary" size="lg">
                    <Link href={getLocalizedLink("/")}>
                      <ArrowLeft className="size-3.5" />
                      {t.notFound.cta}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </RailBounded>
      </main>

      <Footer />
    </RailLayout>
  );
}
