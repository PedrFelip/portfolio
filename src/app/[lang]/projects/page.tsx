import { SectionHeader } from "@/components/common/SectionHeader";
import { projectsContent } from "@/lib/content/projects-content";
import { getProjects } from "@/lib/projects-data";
import ProjectsClient from "./ProjectsClient";

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
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge={t.badge}
          badgeVariant="projects"
          title={t.title}
          description={t.description}
        />

        <ProjectsClient
          projects={projects}
          emptyStateLabel={
            lang === "pt"
              ? "Nenhum projeto encontrado com essas tecnologias."
              : "No projects found with those technologies."
          }
        />
      </div>
    </section>
  );
}
