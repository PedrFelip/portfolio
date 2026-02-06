import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { projectsEn } from "@/lib/content/projects.en";
import { projectsPt } from "@/lib/content/projects.pt";
import { getProjects } from "@/lib/projects-data";
import ProjectsClient from "./ProjectsClient";

const projectsContent = {
  en: projectsEn,
  pt: projectsPt,
};

type Lang = "en" | "pt";

interface ProjectsPageProps {
  params: Promise<{ lang: Lang }>;
}

/**
 * ProjectsPage component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Consistent container: uses Section component for uniform alignment
 */
export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  const t = projectsContent[lang].projects;

  const projects = getProjects(lang);

  return (
    <div className="min-h-screen">
      <Section variant="muted">
        <SectionHeader
          badge={t.badge}
          badgeVariant="projects"
          title={t.title}
          description={t.description}
        />

        <ProjectsClient
          projects={projects}
          emptyStateLabel={t.filters.noResults}
        />
      </Section>
    </div>
  );
}
