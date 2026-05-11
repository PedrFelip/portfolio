import { History } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  AlignedFlickeringGrid,
  RailLayout,
  SectionDivider,
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
      <div className="rail-bounded h-56 border border-overlay-border bg-surface-2" />
    ),
  },
);

const BlueprintContactSection = dynamic(
  () =>
    import("@/components/about/BlueprintContactSection").then(
      (mod) => mod.BlueprintContactSection,
    ),
  {
    loading: () => (
      <div className="rail-bounded border-t border-border h-64 bg-surface-2" />
    ),
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

/**
 * AboutPage component - Blueprint Design
 *
 * This page follows the "Architectural Precision" design direction:
 * - RailLayout for structural grid alignment
 * - AlignedFlickeringGrid for decorative technical depth
 * - 3-column header grids for section headers
 * - Dashed borders for internal content separation
 * - Corner brackets for framing key information
 */
export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const t = aboutContent[lang] || aboutEn;

  // Parallel fetch for all about page data
  const [workExperience, education, contactLinks] = await Promise.all([
    getWorkExperience(lang),
    getEducation(lang),
    getContactLinks(lang),
  ]);

  return (
    <RailLayout>
      {/* Hero / About Intro Section */}
      <section className="relative">
        <div className="rail-bounded overflow-hidden">
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {/* Column 1: Intro Info */}
            <div className="px-6 py-12 sm:px-8 sm:py-16">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60 animate-in-left">
                {t.about.badge}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-4xl lg:text-5xl animate-in-left animate-delay-100">
                {t.about.title}
              </h1>
              <p className="mt-4 text-lg font-medium text-foreground/90 animate-in-left animate-delay-150">
                {t.about.intro}
              </p>
            </div>

            {/* Column 2: Detailed Description - Aligned with the center rail */}
            <div className="relative border-t border-dashed border-border px-6 py-12 sm:border-t-0 sm:border-l sm:px-8 sm:py-16 lg:px-10 animate-in-up animate-delay-200">
              <div className="relative z-10">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {parseBoldMarkdown(t.about.description)}
                </p>
              </div>
            </div>

            {/* Column 3: Decorative Flickering Grid */}
            <div className="relative border-t border-dashed border-border lg:border-t-0 lg:border-l overflow-hidden min-h-[200px] sm:min-h-0">
              <AlignedFlickeringGrid
                side="right"
                className="absolute inset-0 h-full w-full !flex"
              />
              <div className="absolute right-4 bottom-4 size-4 border-r border-b border-border/40" />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Work Experience Section */}
      <section id="experience" className="relative animate-in-up">
        <div className="rail-bounded overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Header Column */}
            <div className="px-6 py-12 sm:px-8 sm:py-16">
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
                {t.work.badge}
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {t.work.title}
              </h2>
            </div>
            {/* Decorative Grid - Fills the rest of the header row */}
            <div className="relative border-t border-dashed border-border sm:border-t-0 sm:border-l sm:col-span-2 overflow-hidden min-h-[100px] sm:min-h-0">
              <AlignedFlickeringGrid
                side="right"
                className="absolute inset-0 h-full w-full !flex opacity-40"
                maxOpacity={0.1}
              />
              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                <History className="size-12 text-white/5" />
              </div>
            </div>
          </div>
        </div>

        {/* Experience List - Unified Blueprint Cards */}
        <div className="rail-bounded border-t border-border">
          <div className="grid grid-cols-1 gap-px bg-border/50">
            {workExperience.map((exp, i) => (
              <div
                key={`${exp.company}-${exp.title}`}
                className="bg-background animate-in-up"
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <WorkExperienceCard experience={exp} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Skills Section */}
      <SimpleTechStack
        id="skills"
        title={t.skills.title}
        subtitle={t.skills.badge}
        description=""
      />

      <SectionDivider />

      {/* Education Section */}
      <section id="education" className="relative animate-in-up">
        <EducationBlueprint
          education={education}
          title={t.education.title}
          badge={t.education.badge}
        />
      </section>

      <SectionDivider />

      {/* Contact Section - Blueprint Edition */}
      <BlueprintContactSection
        badge={t.contact.badge}
        title={t.contact.title}
        description={t.contact.description}
        links={contactLinks}
      />
    </RailLayout>
  );
}
