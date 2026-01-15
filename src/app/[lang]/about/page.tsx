import { ContactLinks } from "@/components/about/ContactLinks";
import { EducationCard } from "@/components/about/EducationCard";
import { WorkExperienceCard } from "@/components/about/WorkExperienceCard";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SkillsGrid } from "@/components/SkillsGrid";
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

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const t = aboutContent[lang];

  const workExperience = getWorkExperience(lang);
  const education = getEducation(lang);
  const contactLinks = getContactLinks(lang);
  const skills = getSkills(lang);

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="mb-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {t.about.badge}
        </div>
        <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          {t.about.title}
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
          {parseBoldMarkdown(t.about.description)}
        </p>
      </section>

      <Section variant="muted" className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            badge={t.work.badge}
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
        </div>
      </Section>

      <Section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeader badge={t.skills.badge} title={t.skills.title} />
          <SkillsGrid skills={skills} />
        </div>
      </Section>

      <Section variant="muted" className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeader badge={t.education.badge} title={t.education.title} />

          <div className="space-y-4">
            {education.map((edu) => (
              <EducationCard
                key={`${edu.school}-${edu.degree}`}
                education={edu}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-12 sm:py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            badge={t.contact.badge}
            title={t.contact.title}
            description={t.contact.description}
          />

          <ContactLinks links={contactLinks} />
        </div>
      </Section>
    </div>
  );
}
