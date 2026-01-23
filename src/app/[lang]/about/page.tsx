import { ContactLinks } from "@/components/about/ContactLinks";
import { EducationCard } from "@/components/about/EducationCard";
import { WorkExperienceCard } from "@/components/about/WorkExperienceCard";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SkillsGrid } from "@/components/SkillsGrid";
import { H1, Label, P } from "@/components/ui";
import {
  getContactLinks,
  getEducation,
  getWorkExperience,
} from "@/lib/about-data";
import { aboutContent } from "@/lib/content/about-content";
import { parseBoldMarkdown } from "@/lib/markdown";
import { getSkills } from "@/lib/shared-data";

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
      {/* Hero-like Header Section */}
      <Section>
        <Label className="mb-4 uppercase">{t.about.badge}</Label>
        <H1 className="mb-4">{t.about.title}</H1>
        <P className="max-w-2xl text-muted-foreground">
          {parseBoldMarkdown(t.about.description)}
        </P>
      </Section>

      <Section variant="muted">
        <SectionHeader
          badge={t.work.badge}
          badgeVariant="work"
          title={t.work.title}
          description={t.work.intro}
        />

        <div className="space-y-0">
          {workExperience.map((experience, index) => (
            <WorkExperienceCard
              key={`${experience.company}-${experience.title}`}
              experience={experience}
              isLast={index === workExperience.length - 1}
            />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          badge={t.skills.badge}
          badgeVariant="expertise"
          title={t.skills.title}
        />
        <SkillsGrid skills={skills} />
      </Section>

      <Section variant="muted">
        <SectionHeader
          badge={t.education.badge}
          badgeVariant="education"
          title={t.education.title}
        />

        <div className="space-y-4">
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
