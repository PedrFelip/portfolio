import { DotPattern, RailLayout, SectionDivider } from "@/components/blueprint";
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

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  const t = projectsContent[lang].projects;

  const projects = getProjects(lang);

  return (
    <RailLayout>
      <section className="relative">
        <DotPattern
          className="opacity-30 sm:opacity-10"
          style={{
            left: "var(--rail-offset)",
            right: "var(--rail-offset)",
            top: 0,
            bottom: 0,
          }}
        />
        <div className="rail-bounded">
          <div className="relative z-10 px-6 pb-6 pt-16 sm:px-8">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.badge}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              {t.title}
            </h2>
            <p className="mt-2 max-w-lg text-base text-muted-foreground">
              {t.description}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      <ProjectsClient
        projects={projects}
        emptyStateLabel={t.filters.noResults}
      />
    </RailLayout>
  );
}
