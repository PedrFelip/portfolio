import { History } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  HatchSeparator,
  PanelSpacer,
  SectionBadge,
} from "@/components/blueprint";
import { SimpleTechStack } from "@/components/home/SimpleTechStack";
import {
  getContactLinks,
  getEducation,
  getWorkExperience,
} from "@/lib/about-data";
import { aboutEn } from "@/lib/content/about.en";
import { aboutPt } from "@/lib/content/about.pt";
import { parseBoldMarkdown } from "@/lib/markdown";

const WorkExperienceCard = dynamic(
  () =>
    import("@/components/about/WorkExperienceCard").then(
      (mod) => mod.WorkExperienceCard,
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

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const validLang = lang === "pt" || lang === "en" ? lang : "en";
  const t = aboutContent[validLang as keyof typeof aboutContent] || aboutEn;

  return {
    title: validLang === "pt" ? "Sobre" : "About",
    description: t.about.intro,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const t = aboutContent[lang] || aboutEn;

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
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
              {t.about.badge}
            </p>
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
      <section
        id="experience"
        data-slot="panel"
        className="bp-panel bp-line-bottom"
      >
        {/* Header */}
        <SectionBadge className="px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                {t.work.badge}
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight sm:text-xl">
                {t.work.title}
              </h2>
            </div>
            <History className="size-5 text-muted-foreground/20" />
          </div>
        </SectionBadge>

        {/* Experience List */}
        <div className="border-t border-dashed border-border/50">
          {workExperience.map((exp, i) => (
            <div
              key={`${exp.company}-${exp.title}`}
              className="dp-panel bg-background animate-in-up"
              style={{ animationDelay: `${100 + i * 80}ms` }}
            >
              <WorkExperienceCard experience={exp} />
            </div>
          ))}
        </div>
      </section>

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
