"use client";

import Link from "next/link";
import { HatchSeparator } from "@/components/blueprint";
import { MonoText } from "@/components/ui";
import { ArrowLeft } from "@/components/ui/icons";
import { useLanguage } from "@/lib/language-store";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

export function NotFound() {
  const { t } = useLanguage();
  const getLocalizedLink = useLocalizedLink();

  return (
    <div className="mx-auto md:max-w-4xl px-4">
      <HatchSeparator />

      <section className="bp-panel bp-line-bottom flex items-center justify-center px-4 py-24 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <MonoText className="text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase">
            {t.notFound.errorCode}
          </MonoText>

          <p className="mt-6 text-5xl font-normal tracking-tighter text-foreground/90">
            404
          </p>

          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t.notFound.description}
          </p>

          <Link
            href={getLocalizedLink("/")}
            className="group mt-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-150 hover:text-foreground min-h-[44px] touch-manipulation"
          >
            <ArrowLeft className="size-3 transition-transform duration-150 group-hover:-translate-x-0.5" />
            {t.notFound.cta}
          </Link>
        </div>
      </section>
    </div>
  );
}
