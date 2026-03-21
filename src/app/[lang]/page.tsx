import {
  Cloud,
  Database,
  Layers,
  Package,
  Plug,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import {
  AlignedFlickeringGrid,
  DotPattern,
  RailLayout,
  SectionDivider,
} from "@/components/blueprint";
import { CornerBrackets } from "@/components/blueprint/CornerBracket";
import { GitHubSection } from "@/components/home/GitHubSection";
import { GitHubSectionSkeleton } from "@/components/home/GitHubSectionSkeleton";
import { SimpleTechStack } from "@/components/home/SimpleTechStack";
import { Button } from "@/components/ui";
import { XIcon } from "@/components/ui/x-icon";
import { homeEn } from "@/lib/content/home.en";
import { homePt } from "@/lib/content/home.pt";

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

const homeContent = {
  en: homeEn,
  pt: homePt,
};

const iconMap = {
  1: Plug,
  2: Cloud,
  3: Package,
  4: Database,
  5: RefreshCw,
  6: Layers,
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
              className="border-b border-white/[0.08]"
            />

            {/* Central Hero Content */}
            <div className="relative flex flex-col items-center border-b border-x border-white/[0.08] bg-white/[0.01] px-4 pb-16 pt-10 text-center sm:px-12 sm:pb-24 sm:pt-16 md:px-16 overflow-hidden">
              <DotPattern className="opacity-30" />
              <CornerBrackets
                size={16}
                className="border-white/10 transition-colors duration-500 group-hover:border-white/20"
              />

              {/* Main headline - Enhanced Typography */}
              <h1 className="relative z-10 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                <span className="inline-block bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent animate-fade-in">
                  {t.hero.title}
                </span>
                <br />
                <span className="inline-block text-muted-foreground/90 relative">
                  {t.hero.subtitle}
                  <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-full" />
                </span>
              </h1>

              {/* Subtitle - More evocative */}
              <p className="relative z-10 mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-lg">
                {t.hero.description}
              </p>

              {/* CTAs - Refined with subtle border glow */}
              <div className="relative z-10 mt-10 flex flex-col items-center gap-4 px-4 sm:mt-12 sm:flex-row">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={`/${lang}/projects`} className="group">
                    {t.hero.cta}
                    <svg
                      className="size-4 transition-transform group-hover:translate-x-1"
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
                  className="w-full sm:w-auto"
                >
                  <Link href={`/${lang}/about`}>{t.hero.ctaSecondary}</Link>
                </Button>
              </div>
            </div>

            {/* Right flickering grid - subtle entry */}
            <AlignedFlickeringGrid
              side="right"
              className="border-b border-white/[0.08]"
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
      <section id="features" className="relative">
        <div className="rail-bounded">
          <div className="px-4 pb-8 pt-12 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.features.badge}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {t.features.title}
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {t.features.description}
            </p>
          </div>
        </div>
        <div className="rail-bounded border-t border-border">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {t.features.items.map((item, i) => {
              const Icon = iconMap[item.id as keyof typeof iconMap] || Plug;
              return (
                <div
                  key={item.id}
                  className={`group px-4 py-6 sm:px-6 transition-colors hover:bg-white/[0.02]
                    ${i % 3 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                    ${i % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 3 ? "lg:border-t lg:border-dashed lg:border-border" : ""}
                    ${i >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${i >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                  `}
                >
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-white/60 transition-colors group-hover:text-white/90">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
        />
      </Suspense>

      <SectionDivider />

      {/* CTA Section */}
      <section className="relative px-4 py-12 sm:px-6 sm:py-24">
        <div className="rail-bounded">
          {/* Grid container aligned with blueprint rails */}
          <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-[0.7fr_minmax(0,_3.6fr)_0.7fr]">
            {/* Left flickering grid - aligned to rail */}
            <AlignedFlickeringGrid side="left" />

            {/* CTA Card Container with Corner Brackets */}
            <div className="group relative border border-white/[0.08] bg-white/[0.02] px-4 py-10 sm:px-12 sm:py-16">
              <CornerBrackets
                size={16}
                className="border-border/50 transition-colors duration-300 group-hover:border-white/20"
              />

              {/* Content */}
              <div className="flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
                  {t.cta.title}
                </h2>
                <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-lg">
                  {t.cta.description}
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                  <Button asChild className="w-full sm:w-44">
                    <Link href={`/${lang}/projects`}>{t.cta.primary}</Link>
                  </Button>

                  <Button asChild variant="outline" className="w-full sm:w-44">
                    <Link
                      href="https://x.com/pedrofelipeek"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <XIcon className="size-4" />
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
