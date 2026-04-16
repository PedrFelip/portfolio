import {
  Activity,
  Cpu,
  Database,
  Package,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import {
  AlignedFlickeringGrid,
  BlueprintReveal,
  CornerBrackets,
  DotPattern,
  RailLayout,
  Reveal,
  SectionDivider,
  StaggerGroup,
} from "@/components/blueprint";
import { GitHubSection } from "@/components/home/GitHubSection";
import { GitHubSectionSkeleton } from "@/components/home/GitHubSectionSkeleton";
import { SimpleTechStack } from "@/components/home/SimpleTechStack";
import { Button, H1, Lead } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";
import { XIcon } from "@/components/ui/x-icon";
import { homeEn } from "@/lib/content/home.en";
import { homePt } from "@/lib/content/home.pt";
import { TOOLKIT_CONFIG } from "@/lib/toolkit-data";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

const homeContent = {
  en: homeEn,
  pt: homePt,
};

const iconMap = {
  1: Cpu,
  2: ShieldCheck,
  3: Activity,
  4: Database,
  5: Package,
  6: Terminal,
};

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const t = homeContent[lang as keyof typeof homeContent] || homeEn;

  return (
    <RailLayout>
      <section className="relative">
        <div className="rail-bounded">
          <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-[0.6fr_minmax(0,_3.8fr)_0.6fr]">
            <AlignedFlickeringGrid
              side="left"
              className="border-b border-border/40"
            />

            <BlueprintReveal
              className="relative flex flex-col items-center border-b border-x border-border/40 bg-card/10 px-4 pb-16 pt-12 text-center sm:px-12 sm:pb-24 sm:pt-16 md:px-16 overflow-hidden group"
              dotPattern={<DotPattern className="opacity-40 sm:opacity-10" />}
              cornerBrackets={
                <CornerBrackets className="opacity-20 transition-opacity duration-500 group-hover:opacity-40" />
              }
            >
              <div className="absolute inset-0 z-0 pointer-events-none sm:hidden bg-[radial-gradient(circle_at_50%_40%,rgba(var(--foreground),0.02)_0%,transparent_70%)]" />

              <H1 className="relative z-10 max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] sm:leading-[0.95]">
                <Reveal
                  as="span"
                  className="block text-foreground"
                  variant="left"
                >
                  {t.hero.title}
                </Reveal>
                <Reveal
                  as="span"
                  className="block text-muted-foreground/60"
                  delay={0.06}
                  variant="left"
                >
                  {t.hero.subtitle}
                </Reveal>
              </H1>

              <Reveal asChild delay={0.1} variant="up">
                <Lead className="relative z-10 mx-auto mt-6 max-w-xl text-muted-foreground sm:mt-8">
                  {t.hero.description}
                </Lead>
              </Reveal>

              <Reveal asChild delay={0.14} variant="up">
                <div className="relative z-10 mt-10 flex w-full flex-col items-center gap-4 px-0 sm:mt-12 sm:w-auto sm:flex-row sm:px-4">
                  <Button asChild size="lg" className="w-full sm:w-56">
                    <Link href={`/${lang}/projects`}>
                      {t.hero.cta}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-56"
                  >
                    <Link href={`/${lang}/about`}>{t.hero.ctaSecondary}</Link>
                  </Button>
                </div>
              </Reveal>
            </BlueprintReveal>

            <AlignedFlickeringGrid
              side="right"
              className="border-b border-border/40"
            />
          </div>
        </div>
      </section>

      <Reveal>
        <SimpleTechStack
          title={t.techStack.title}
          subtitle={t.techStack.badge}
          description={t.techStack.description}
        />
      </Reveal>

      <SectionDivider />

      <section id="features" className="relative">
        <div className="rail-bounded">
          <div className="px-6 pb-8 pt-12 sm:px-8">
            <Reveal asChild variant="left" delay={0.02}>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t.features.badge}
              </p>
            </Reveal>
            <Reveal asChild variant="left" delay={0.05}>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {t.features.title}
              </h2>
            </Reveal>
            <Reveal asChild variant="left" delay={0.08}>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {t.features.description}
              </p>
            </Reveal>
          </div>
        </div>
        <div className="rail-bounded border-t border-border">
          <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3">
            {t.features.items.map((item, i) => {
              const Icon = iconMap[item.id as keyof typeof iconMap] || Activity;
              return (
                <Reveal
                  key={item.id}
                  className={`group px-6 py-8 sm:px-6 transition-all duration-200 hover:bg-surface-2 hover:shadow-inner
                    ${i % 3 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                    ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 3 ? "lg:border-t lg:border-dashed lg:border-border" : ""}
                    ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                  `}
                  delay={i * 0.018}
                  variant="left"
                >
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-overlay-border bg-surface-3 text-muted-foreground transition-all duration-200 group-hover:text-foreground group-hover:border-overlay-border-hover group-hover:bg-faint group-hover:scale-110">
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="transition-transform duration-200 group-hover:rotate-3"
                    />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight transition-colors duration-150 group-hover:text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors duration-150 group-hover:text-muted-foreground/90">
                    {item.description}
                  </p>
                </Reveal>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <SectionDivider />

      <Reveal>
        <Suspense fallback={<GitHubSectionSkeleton />}>
          <GitHubSection
            title={t.github.title}
            subtitle={t.github.badge}
            description={t.github.description}
            swipeHint={t.github.swipeHint}
            less={t.github.less}
            more={t.github.more}
            tapHint={t.github.tapHint}
            commitLabel={t.github.commit}
            commitsLabel={t.github.commits}
            commitsLastYearLabel={t.github.commitsLastYear}
          />
        </Suspense>
      </Reveal>

      <SectionDivider />

      <section id="toolkit" className="relative">
        <div className="rail-bounded">
          <div className="px-6 pb-8 pt-12 sm:px-8">
            <Reveal asChild variant="left" delay={0.02}>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t.toolkit.badge}
              </p>
            </Reveal>
            <Reveal asChild delay={0.05} variant="left">
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                {t.toolkit.title}
              </h2>
            </Reveal>
            <Reveal asChild delay={0.08} variant="left">
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {t.toolkit.description}
              </p>
            </Reveal>
          </div>
        </div>
        <div className="rail-bounded border-t border-border">
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {t.toolkit.items.map((item, i) => {
              const itemConfig = TOOLKIT_CONFIG[item.id];
              return (
                <Reveal
                  key={item.id}
                  className={`group px-6 py-10 sm:px-6 transition-all duration-200 hover:bg-surface-2 hover:shadow-inner
                    ${i !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                    ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                  `}
                  delay={i * 0.02}
                  variant="left"
                >
                  <div className="flex flex-col">
                    <div className="mb-5 flex items-center gap-2">
                      {itemConfig?.icons.map((iconConfig, iconIndex) => (
                        <React.Fragment key={`${item.id}-icon-${iconIndex}`}>
                          {iconIndex > 0 && (
                            <span className="text-muted-foreground/40 font-mono text-sm leading-none flex items-center h-full">
                              +
                            </span>
                          )}
                          <div
                            className="inline-flex size-10 flex-shrink-0 items-center justify-center rounded-xl border border-overlay-border bg-surface-3 text-muted-foreground transition-all duration-300 group-hover:border-[var(--icon-color)]/30 group-hover:bg-[var(--icon-color)]/10 group-hover:text-[var(--icon-color)] group-hover:shadow-[0_0_15px_rgba(0,0,0,0.2)] group-hover:shadow-[var(--icon-color)]/20 group-hover:scale-110"
                            style={
                              {
                                "--icon-color": iconConfig.color || "#ffffff",
                                transitionDelay: `${iconIndex * 50}ms`,
                              } as React.CSSProperties
                            }
                          >
                            <iconConfig.component className="size-5 transition-transform duration-200 group-hover:rotate-6" />
                          </div>
                        </React.Fragment>
                      ))}
                    </div>

                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 transition-colors duration-150 group-hover:text-muted-foreground">
                      {item.title}
                    </p>
                    <h3 className="mt-1 text-base font-semibold tracking-tight transition-colors duration-150 group-hover:text-foreground">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80 transition-colors duration-150 group-hover:text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      <SectionDivider />

      <section className="relative px-4 py-12 sm:px-6 sm:py-24">
        <div className="rail-bounded">
          <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-[0.7fr_minmax(0,_3.6fr)_0.7fr]">
            <AlignedFlickeringGrid side="left" />

            <BlueprintReveal
              className="group relative border border-overlay-border bg-surface-2 px-4 py-12 sm:px-12 sm:py-16 transition-all duration-300 hover:border-overlay-border-hover hover:bg-surface-4 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] overflow-hidden"
              dotPattern={<DotPattern className="opacity-40 sm:opacity-20" />}
              cornerBrackets={
                <CornerBrackets
                  size={16}
                  className="border-border/50 transition-all duration-300 group-hover:border-white/40 group-hover:scale-110"
                />
              }
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <Reveal asChild variant="left" delay={0.03}>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-200 group-hover:text-foreground">
                    {t.cta.title}
                  </h2>
                </Reveal>
                <Reveal asChild delay={0.07} variant="up">
                  <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg transition-colors duration-200 group-hover:text-muted-foreground/90">
                    {t.cta.description}
                  </p>
                </Reveal>

                <Reveal asChild delay={0.12} variant="up">
                  <div className="mt-8 flex w-full flex-col items-center gap-4 px-0 sm:mt-12 sm:w-auto sm:flex-row sm:px-4">
                    <Button
                      asChild
                      size="lg"
                      className="w-full sm:w-52 scale-on-active group/btn hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.15)] transition-all duration-200"
                    >
                      <Link href={`/${lang}/projects`}>
                        {t.cta.primary}
                        <svg
                          className="size-4 transition-transform duration-150 group-hover/btn:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <title>Arrow right</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-52 scale-on-active hover:border-white/30 transition-all duration-200"
                    >
                      <Link
                        href="https://x.com/pedrofelipeek"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <XIcon className="size-4 transition-transform duration-150 group-hover:scale-110" />
                        <span>{t.cta.secondary}</span>
                      </Link>
                    </Button>
                  </div>
                </Reveal>
              </div>
            </BlueprintReveal>

            <AlignedFlickeringGrid side="right" />
          </div>
        </div>
      </section>
    </RailLayout>
  );
}
