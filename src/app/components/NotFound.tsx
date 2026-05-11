"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RailBounded, RailLayout } from "@/components/blueprint";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { MonoText } from "@/components/ui";
import { ArrowLeft } from "@/components/ui/icons";
import { useLanguage } from "@/lib/language-store";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

/**
 * NotFound — Minimalist asymmetric blueprint 404 page
 *
 * Design:
 * - Single oversized "404" anchored top-left, bleeding off-screen
 * - Thin coordinate/axis lines for blueprint feel
 * - Content pushed to bottom-right (asymmetric)
 * - Almost nothing else — intentional negative space
 */

const NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
  { key: "about", href: "/about" },
] as const;

export function NotFound() {
  const { t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <RailLayout className="min-h-screen bg-background">
      <Navigation />

      <main className="relative flex-1 flex flex-col overflow-hidden">
        {/* ─── Coordinate Grid Lines ─── */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          {/* Horizontal axis */}
          <div className="absolute top-[60%] left-0 right-0 h-px bg-border/20" />
          {/* Vertical axis */}
          <div className="absolute top-0 bottom-0 left-[45%] w-px bg-border/20" />
          {/* Subtle crosshair tick marks */}
          <div className="absolute top-[60%] left-[45%] -translate-x-1/2 -translate-y-1/2">
            <div className="w-3 h-3 border border-border/15 rounded-full" />
          </div>
        </div>

        <RailBounded className="relative z-10 flex-1 flex flex-col justify-end py-16 md:py-24">
          {/* ─── Oversized 404 — top-left, bleeds up ─── */}
          <div
            className={`
              relative -mt-8 md:-mt-16 mb-auto
              transition-all duration-700 ease-out
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            <span
              className="
                block font-mono font-bold tracking-tighter leading-none
                text-foreground/[0.04] select-none
                text-[clamp(12rem,35vw,28rem)]
              "
              aria-hidden="true"
            >
              404
            </span>

            {/* Small coordinate label */}
            <MonoText className="absolute top-1 left-0 text-[9px] tracking-[0.25em] text-border/60 uppercase">
              {t.notFound.errorCode}
            </MonoText>
          </div>

          {/* ─── Content Block — bottom-right asymmetric ─── */}
          <div
            className={`
              max-w-md ml-auto
              space-y-10
              transition-all duration-700 delay-200 ease-out
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
            `}
          >
            {/* Text */}
            <div className="space-y-3">
              <h1
                className="
                  text-2xl md:text-3xl font-semibold
                  leading-tight tracking-[-0.02em] text-foreground
                "
              >
                {t.notFound.title}
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
                {t.notFound.description}
              </p>
            </div>

            {/* Minimal Nav Links */}
            <div className="space-y-0">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={getLocalizedLink(item.href)}
                  className="
                    group flex items-center justify-between
                    py-2.5 border-b border-border/20
                    hover:border-border/50
                    transition-colors duration-150
                  "
                >
                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground group-hover:text-foreground transition-colors duration-150">
                    {t.nav[item.key]}
                  </span>
                  <ArrowLeft className="h-3 w-3 text-border opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150" />
                </Link>
              ))}
            </div>

            {/* Status pill */}
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <MonoText className="text-[9px] tracking-[0.2em] text-border uppercase">
                status — {t.notFound.subtitle}
              </MonoText>
            </div>
          </div>
        </RailBounded>
      </main>

      <Footer />
    </RailLayout>
  );
}
