import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";
import {
  AlignedFlickeringGrid,
  CornerBrackets,
  DotPattern,
  RailLayout,
  SectionDivider,
} from "@/components/blueprint";
import { GitHubSection } from "@/components/home/GitHubSection";
import { GitHubSectionSkeleton } from "@/components/home/GitHubSectionSkeleton";
import { HomeCtaSection } from "@/components/home/HomeCtaSection";
import { HomeFeaturesSection } from "@/components/home/HomeFeaturesSection";
import { Button, H1, Lead } from "@/components/ui";
import { ArrowRight } from "@/components/ui/icons";
import { homeEn } from "@/lib/content/home.en";
import { homePt } from "@/lib/content/home.pt";

const SimpleTechStack = dynamic(() =>
  import("@/components/home/SimpleTechStack").then(
    (mod) => mod.SimpleTechStack,
  ),
);

const HomeToolkitSection = dynamic(() =>
  import("@/components/home/HomeToolkitSection").then(
    (mod) => mod.HomeToolkitSection,
  ),
);

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

const homeContent = {
  en: homeEn,
  pt: homePt,
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

            <div className="relative flex flex-col items-center border-b border-x border-border/40 bg-card/10 px-4 pb-16 pt-12 text-center sm:px-12 sm:pb-24 sm:pt-16 md:px-16 overflow-hidden group">
              <DotPattern className="absolute inset-0 opacity-40 sm:opacity-10 pointer-events-none" />
              <CornerBrackets className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none" />

              <div className="absolute inset-0 z-0 pointer-events-none sm:hidden bg-[radial-gradient(circle_at_50%_40%,rgba(var(--foreground),0.02)_0%,transparent_70%)]" />

              <H1 className="relative z-10 max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] sm:leading-[0.95]">
                <span className="block text-foreground">{t.hero.title}</span>
                <span className="block text-muted-foreground/60">
                  {t.hero.subtitle}
                </span>
              </H1>

              <Lead className="relative z-10 mx-auto mt-6 max-w-xl text-muted-foreground sm:mt-8">
                {t.hero.description}
              </Lead>

              <div className="relative z-10 mt-10 flex w-full flex-col items-center gap-4 px-0 sm:mt-12 sm:w-auto sm:flex-row sm:px-4">
                <Button asChild size="lg" className="w-full sm:w-56">
                  <Link href={`/${lang}/projects`}>
                    {t.hero.cta}
                    <ArrowRight className="size-4 translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]" />
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

            <AlignedFlickeringGrid
              side="right"
              className="border-b border-border/40"
            />
          </div>
        </div>
      </section>

      <SimpleTechStack
        title={t.techStack.title}
        subtitle={t.techStack.badge}
        description={t.techStack.description}
      />

      <SectionDivider />

      <HomeFeaturesSection
        badge={t.features.badge}
        title={t.features.title}
        description={t.features.description}
        items={t.features.items}
      />

      <SectionDivider />

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

      <SectionDivider />

      <HomeToolkitSection
        badge={t.toolkit.badge}
        title={t.toolkit.title}
        description={t.toolkit.description}
        items={t.toolkit.items}
      />

      <SectionDivider />

      <HomeCtaSection
        lang={lang}
        title={t.cta.title}
        description={t.cta.description}
        primary={t.cta.primary}
        secondary={t.cta.secondary}
      />
    </RailLayout>
  );
}
