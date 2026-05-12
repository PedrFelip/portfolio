import dynamic from "next/dynamic";
import { Suspense } from "react";
import { HatchSeparator, PanelSpacer } from "@/components/blueprint";
import { GitHubSection } from "@/components/home/GitHubSection";
import { GitHubSectionSkeleton } from "@/components/home/GitHubSectionSkeleton";
import { HeroGrid } from "@/components/home/HeroGrid";
import { HomeCtaSection } from "@/components/home/HomeCtaSection";
import { HomeFeaturesSection } from "@/components/home/HomeFeaturesSection";
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
    <>
      {/* ─── Hero Grid ─── */}
      <HeroGrid
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        description={t.hero.description}
        cta={t.hero.cta}
        ctaSecondary={t.hero.ctaSecondary}
        ctaHref={`/${lang}/projects`}
        ctaSecondaryHref={`/${lang}/about`}
      />

      <div className="mx-auto md:max-w-4xl px-4">
        {/* ─── Hatch ─── */}
        <HatchSeparator />

        {/* ─── Tech Stack Panel ─── */}
        <SimpleTechStack
          title={t.techStack.title}
          subtitle={t.techStack.badge}
          description={t.techStack.description}
        />

        {/* ─── Spacer ─── */}
        <PanelSpacer />

        {/* ─── Features Panel ─── */}
        <HomeFeaturesSection
          badge={t.features.badge}
          title={t.features.title}
          description={t.features.description}
          items={t.features.items}
        />

        {/* ─── Hatch ─── */}
        <HatchSeparator />

        {/* ─── GitHub Panel ─── */}
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

        {/* ─── Spacer ─── */}
        <PanelSpacer />

        {/* ─── Toolkit Panel ─── */}
        <HomeToolkitSection
          badge={t.toolkit.badge}
          title={t.toolkit.title}
          description={t.toolkit.description}
          items={t.toolkit.items}
        />

        {/* ─── Hatch ─── */}
        <HatchSeparator />

        {/* ─── CTA Panel ─── */}
        <HomeCtaSection
          lang={lang}
          title={t.cta.title}
          description={t.cta.description}
          primary={t.cta.primary}
          secondary={t.cta.secondary}
        />
      </div>
    </>
  );
}
