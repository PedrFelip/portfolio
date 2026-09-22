import dynamic from "next/dynamic";
import { Suspense } from "react";
import { HatchSeparator, PanelSpacer } from "@/components/blueprint";
import { GitHubSectionLoader } from "@/components/home/GitHubSectionLoader";
import { HeroGrid } from "@/components/home/HeroGrid";
import { HomeCtaSection } from "@/components/home/HomeCtaSection";
import { HomeFeaturesSection } from "@/components/home/HomeFeaturesSection";
import { LatestPostSection } from "@/components/home/LatestPostSection";
import { PageLoadingSkeleton } from "@/components/layout/PageLoadingSkeleton";
import { ScrollToPageTop } from "@/components/layout/ScrollToPageTop";
import {
  DEFAULT_LANGUAGE,
  getTranslations,
  isLanguage,
  langStaticParams,
} from "@/lib/i18n";
import { JsonLdScript, personSchema, websiteSchema } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site";

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

export function generateStaticParams() {
  return langStaticParams();
}

export default function HomePage({ params }: HomePageProps) {
  return (
    <>
      <ScrollToPageTop />
      <Suspense fallback={<PageLoadingSkeleton variant="home" />}>
        <HomePageContent params={params} />
      </Suspense>
    </>
  );
}

async function HomePageContent({ params }: HomePageProps) {
  const { lang } = await params;
  const t = getTranslations(isLanguage(lang) ? lang : DEFAULT_LANGUAGE);

  return (
    <>
      <JsonLdScript data={[personSchema(), websiteSchema()]} />
      {/* ─── Hero Grid ─── */}
      <HeroGrid
        name={siteConfig.author.name}
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
        <SimpleTechStack title={t.techStack.title} description="" />

        {/* ─── Spacer ─── */}
        <PanelSpacer />

        {/* ─── Features Panel ─── */}
        <HomeFeaturesSection
          title={t.features.title}
          description={t.features.description}
          items={t.features.items}
        />

        {/* ─── Hatch ─── */}
        <HatchSeparator />

        {/* ─── GitHub Panel ─── */}
        <GitHubSectionLoader
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

        {/* ─── Spacer ─── */}
        <PanelSpacer />

        {/* ─── Latest Post Panel ─── */}
        <LatestPostSection
          lang={lang}
          title={t.latestPost.title}
          description={t.latestPost.description}
          readMore={t.latestPost.readMore}
          readingTimeLabel={t.latestPost.readingTime}
          serial={t.latestPost.serial}
        />

        {/* ─── Hatch ─── */}
        <HatchSeparator />

        {/* ─── Toolkit Panel ─── */}
        <HomeToolkitSection
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
