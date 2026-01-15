import { SectionHeader } from "@/components/common/SectionHeader";
import { projectsContent } from "@/lib/content/projects-content";
import { getProjects } from "@/lib/projects-data";
import ProjectsClient from "./ProjectsClient";

type Lang = "en" | "pt";

interface ProjectsPageProps {
  params: Promise<{ lang: Lang }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  const t = projectsContent[lang].projects;

  const projects = getProjects(lang);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <SectionHeader
        badge={t.badge}
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
  );
}
