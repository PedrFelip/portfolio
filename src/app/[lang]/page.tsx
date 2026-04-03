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
  CornerBrackets,
  DotPattern,
  RailLayout,
  SectionDivider,
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
      {/* Hero Section */}
      <section className="relative">
        <div className="rail-bounded">
          <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-[0.6fr_minmax(0,_3.8fr)_0.6fr]">
            {/* Left flickering grid - subtle entry */}
            <AlignedFlickeringGrid
              side="left"
              className="border-b border-border/40"
            />

            {/* Central Hero Content */}
            <div className="relative flex flex-col items-center border-b border-x border-border/40 bg-card/10 px-4 pb-16 pt-12 text-center sm:px-12 sm:pb-24 sm:pt-16 md:px-16 overflow-hidden group">
              {/* Architectural Details */}
              <DotPattern className="opacity-40 sm:opacity-10" />
              <CornerBrackets className="opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Mobile-only radial glow for depth since side grids are hidden */}
              <div className="absolute inset-0 z-0 pointer-events-none sm:hidden bg-[radial-gradient(circle_at_50%_40%,rgba(var(--foreground),0.02)_0%,transparent_70%)]" />

              {/* Main headline - Clean Typography */}
              <H1 className="relative z-10 max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] sm:leading-[0.95]">
                <span className="block text-foreground animate-in-up">
                  {t.hero.title}
                </span>
                <span className="block text-muted-foreground/60 animate-in-up animate-delay-100">
                  {t.hero.subtitle}
                </span>
              </H1>

              {/* Subtitle - More evocative */}
              <Lead className="relative z-10 mx-auto mt-6 max-w-xl text-muted-foreground sm:mt-8 animate-in-up animate-delay-150">
                {t.hero.description}
              </Lead>

              {/* CTAs - Technical & Clean */}
              <div className="relative z-10 mt-10 flex w-full flex-col items-center gap-4 px-0 sm:mt-12 sm:w-auto sm:flex-row sm:px-4 animate-in-up animate-delay-200">
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
            </div>

            {/* Right flickering grid - subtle entry */}
            <AlignedFlickeringGrid
              side="right"
              className="border-b border-border/40"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <SimpleTechStack
        title={t.techStack.title}
        subtitle={t.techStack.badge}
        description={t.techStack.description}
      />

      <SectionDivider />

      {/* Features Grid Section */}
      <section
        id="features"
        className="relative animate-in-up animate-delay-300"
      >
        <div className="rail-bounded">
          <div className="px-6 pb-8 pt-12 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground animate-in-left animate-delay-350">
              {t.features.badge}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl animate-in-left animate-delay-400">
              {t.features.title}
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground animate-in-left animate-delay-450">
              {t.features.description}
            </p>
          </div>
        </div>
        <div className="rail-bounded border-t border-border">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {t.features.items.map((item, i) => {
              const Icon = iconMap[item.id as keyof typeof iconMap] || Activity;
              return (
                <div
                  key={item.id}
                  className={`group px-6 py-8 sm:px-6 transition-all duration-200 hover:bg-surface-2 hover:shadow-inner animate-in-up
                    ${i % 3 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                    ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 3 ? "lg:border-t lg:border-dashed lg:border-border" : ""}
                    ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                  `}
                  style={{ animationDelay: `${500 + i * 50}ms` }}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* GitHub Activity Section */}
      <Suspense fallback={<GitHubSectionSkeleton />}>
        <GitHubSection
          title={t.github.title}
          subtitle={t.github.badge}
          description={t.github.description}
          swipeHint={t.github.swipeHint}
          less={t.github.less}
          more={t.github.more}
          tapHint={t.github.tapHint}
        />
      </Suspense>

      <SectionDivider />

      {/* Toolkit / Setup Section */}
      <section id="toolkit" className="relative animate-in-up">
        <div className="rail-bounded">
          <div className="px-6 pb-8 pt-12 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.toolkit.badge}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {t.toolkit.title}
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {t.toolkit.description}
            </p>
          </div>
        </div>
        <div className="rail-bounded border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {t.toolkit.items.map((item, i) => {
              const itemConfig = TOOLKIT_CONFIG[item.id];
              return (
                <div
                  key={item.id}
                  className={`group px-6 py-10 sm:px-6 transition-all duration-200 hover:bg-surface-2 hover:shadow-inner animate-in-up
                    ${i !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                    ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                  `}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex flex-col">
                    {/* Icons Container */}
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA Section */}
      <section className="relative px-4 py-12 sm:px-6 sm:py-24 animate-in-up">
        <div className="rail-bounded">
          {/* Grid container aligned with blueprint rails */}
          <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-[0.7fr_minmax(0,_3.6fr)_0.7fr]">
            {/* Left flickering grid - aligned to rail */}
            <AlignedFlickeringGrid side="left" />

            {/* CTA Card Container with Corner Brackets */}
            <div className="group relative border border-overlay-border bg-surface-2 px-4 py-12 sm:px-12 sm:py-16 transition-all duration-300 hover:border-overlay-border-hover hover:bg-surface-4 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] overflow-hidden">
              <DotPattern className="opacity-40 sm:opacity-20" />
              <CornerBrackets
                size={16}
                className="border-border/50 transition-all duration-300 group-hover:border-white/40 group-hover:scale-110"
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl transition-colors duration-200 group-hover:text-foreground">
                  {t.cta.title}
                </h2>
                <p className="mt-4 max-w-md text-base text-muted-foreground sm:text-lg transition-colors duration-200 group-hover:text-muted-foreground/90">
                  {t.cta.description}
                </p>

                {/* CTA Buttons */}
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
              </div>
            </div>

            {/* Right flickering grid - aligned to rail */}
            <AlignedFlickeringGrid side="right" />
          </div>
        </div>
      </section>
    </RailLayout>
  );
}
