"use client";

import Link from "next/link";
import { Reveal, SectionBadge, SectionLabel } from "@/components/blueprint";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "@/components/ui/icons";

interface HomeCtaSectionProps {
  lang: string;
  badge: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
}

export function HomeCtaSection({
  lang,
  badge,
  title,
  description,
  primary,
  secondary,
}: HomeCtaSectionProps) {
  return (
    <section data-slot="panel" className="bp-panel bp-line-top bp-line-bottom">
      <SectionBadge className="bp-line-bottom px-4 py-3 sm:px-6">
        <SectionLabel>{badge}</SectionLabel>
        <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </SectionBadge>

      <Reveal variant="up" delay={0.1}>
        <div className="flex flex-col items-center gap-3 px-4 py-10 sm:flex-row sm:justify-center sm:gap-4 sm:px-6 sm:py-14">
          <Button asChild variant="primary" size="md" className="min-w-[180px]">
            <Link href={`/${lang}/projects`}>
              {primary}
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="md" className="min-w-[180px]">
            <Link
              href="https://x.com/pdrdotdev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${secondary} — opens in new tab`}
            >
              {secondary}
              <ExternalLink className="size-3.5" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
