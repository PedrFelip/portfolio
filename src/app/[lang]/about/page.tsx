import { ContactLinks } from "@/components/about/ContactLinks";
import { EducationCard } from "@/components/about/EducationCard";
import { WorkExperienceCard } from "@/components/about/WorkExperienceCard";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SkillsSection } from "@/components/home/SkillsSection";
import { P } from "@/components/ui";
import {
  getContactLinks,
  getEducation,
  getWorkExperience,
} from "@/lib/about-data";
import { aboutEn } from "@/lib/content/about.en";
import { aboutPt } from "@/lib/content/about.pt";
import { parseBoldMarkdown } from "@/lib/markdown";
import { getSkills } from "@/lib/shared-data";

const aboutContent = {
  en: aboutEn,
  pt: aboutPt,
};

type Lang = "en" | "pt";

interface AboutPageProps {
  params: Promise<{ lang: Lang }>;
}

/**
 * AboutPage component
 *
 * Vercel best practices applied:
 * - async-parallel: Promise.all() for independent operations (CRITICAL)
 * - async-defer-await: defer await until needed (HIGH)
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Mobile-first: optimized for small screens
 * - Consistent container: uses Section component for uniform alignment
 */
export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const t = aboutContent[lang];

  // Vercel: async-parallel - Parallel fetch for independent data
  // Instead of sequential awaits, use Promise.all() to fetch all data concurrently
  const [workExperience, education, contactLinks, skills] = await Promise.all([
    getWorkExperience(lang),
    getEducation(lang),
    getContactLinks(lang),
    getSkills(lang),
  ]);

  return (
    <div className="min-h-screen">
      <Section>
        <SectionHeader
          badge={t.about.badge}
          badgeVariant="about"
          title={t.about.title}
        />
        <P className="max-w-2xl text-muted-foreground">
          {parseBoldMarkdown(t.about.description)}
        </P>
      </Section>

      <Section variant="muted">
        <SectionHeader
          badge={t.work.badge}
          badgeVariant="work"
          title={t.work.title}
        />

        <div className="space-y-0">
          {workExperience.map((experience) => (
            <WorkExperienceCard
              key={`${experience.company}-${experience.title}`}
              experience={experience}
            />
          ))}
        </div>
      </Section>

      <SkillsSection
        skills={skills}
        badge={t.skills.badge}
        title={t.skills.title}
      />

      <Section variant="muted">
        <SectionHeader
          badge={t.education.badge}
          badgeVariant="education"
          title={t.education.title}
        />

        <div className="space-y-0">
          {education.map((edu) => (
            <EducationCard
              key={`${edu.school}-${edu.degree}`}
              education={edu}
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          badge={t.contact.badge}
          badgeVariant="contact"
          title={t.contact.title}
          description={t.contact.description}
        />

        <ContactLinks links={contactLinks} />
      </Section>
    </div>
  );
}
