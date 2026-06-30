import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  HatchSeparator,
  PanelSpacer,
  SectionBadge,
  SectionLabel,
} from "@/components/blueprint";
import { SimpleTechStack } from "@/components/home/SimpleTechStack";
import {
  getContactLinks,
  getEducation,
  getWorkExperience,
} from "@/lib/about-data";
import { aboutEn } from "@/lib/content/about.en";
import { aboutPt } from "@/lib/content/about.pt";
import { isLanguage, SUPPORTED_LOCALES } from "@/lib/i18n";
import { parseBoldMarkdown } from "@/lib/markdown";

const WorkExperienceBlueprint = dynamic(
  () =>
    import("@/components/about/WorkExperienceBlueprint").then(
      (mod) => mod.WorkExperienceBlueprint,
    ),
  {
    loading: () => (
      <div className="h-40 border border-overlay-border bg-surface-2" />
    ),
  },
);

const EducationBlueprint = dynamic(
  () =>
    import("@/components/about/EducationBlueprint").then(
      (mod) => mod.EducationBlueprint,
    ),
  {
    loading: () => (
      <div className="h-56 border border-overlay-border bg-surface-2" />
    ),
  },
);

const BlueprintContactSection = dynamic(
  () =>
    import("@/components/about/BlueprintContactSection").then(
      (mod) => mod.BlueprintContactSection,
    ),
  {
    loading: () => <div className="h-64 bg-surface-2" />,
  },
);

type Lang = "en" | "pt";

interface AboutPageProps {
  params: Promise<{ lang: Lang }>;
}

const aboutContent = {
  en: aboutEn,
  pt: aboutPt,
};

// TODO(refactor)[P1]: generateStaticParams duplicated
// extract langStaticParams helper
export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const validLang = isLanguage(lang) ? lang : "en";
  const t = aboutContent[validLang as keyof typeof aboutContent] || aboutEn;

  return {
    title: validLang === "pt" ? "Sobre" : "About",
    description: t.about.intro,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const t = aboutContent[lang] || aboutEn;

  // TODO(refactor)[P1]: Promise.all wrapping 3 sync cache()
  // functions — drop await/Promise.all
  const [workExperience, education, contactLinks] = await Promise.all([
    getWorkExperience(lang),
    getEducation(lang),
    getContactLinks(lang),
  ]);

  return (
    <div className="mx-auto md:max-w-4xl px-4">
      {/* ─── About Intro Panel ─── */}
      <section
        data-slot="panel"
        className="bp-panel bp-line-top bp-line-bottom"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Column 1: Intro Info */}
          <SectionBadge className="px-4 py-8 sm:px-6 sm:py-12">
            <SectionLabel>{t.about.badge}</SectionLabel>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.about.title}
            </h1>
            <p className="mt-3 text-base font-medium text-foreground/90">
              {t.about.intro}
            </p>
          </SectionBadge>

          {/* Column 2: Description */}
          <div className="border-t border-dashed border-border px-4 py-8 sm:border-t-0 sm:border-l sm:px-6 sm:py-12">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {parseBoldMarkdown(t.about.description)}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Hatch ─── */}
      <HatchSeparator />

      {/* ─── Work Experience Panel ─── */}
      <WorkExperienceBlueprint
        experiences={workExperience}
        title={t.work.title}
        badge={t.work.badge}
        presentLabel={t.work.present}
      />

      {/* ─── Spacer ─── */}
      <PanelSpacer />

      {/* ─── Skills Panel ─── */}
      <SimpleTechStack
        id="skills"
        title={t.skills.title}
        subtitle={t.skills.badge}
        description=""
      />

      {/* ─── Hatch ─── */}
      <HatchSeparator />

      {/* ─── Education Panel ─── */}
      <EducationBlueprint
        education={education}
        title={t.education.title}
        badge={t.education.badge}
      />

      {/* ─── Hatch ─── */}
      <HatchSeparator />

      {/* ─── Contact Panel ─── */}
      <BlueprintContactSection
        badge={t.contact.badge}
        title={t.contact.title}
        description={t.contact.description}
        links={contactLinks}
      />
    </div>
  );
}
