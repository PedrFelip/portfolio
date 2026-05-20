import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HatchSeparator, SectionBadge } from "@/components/blueprint";
import { projectsEn } from "@/lib/content/projects.en";
import { projectsPt } from "@/lib/content/projects.pt";
import { isLanguage, SUPPORTED_LANGS } from "@/lib/i18n";
import { getProjects } from "@/lib/projects-data";

const ProjectsClient = dynamic(() => import("./ProjectsClient"), {
  loading: () => (
    <div className="bp-panel px-4 py-16 text-center text-xs font-mono text-muted-foreground">
      Loading projects...
    </div>
  ),
});

const projectsContent = {
  en: projectsEn,
  pt: projectsPt,
};

type Lang = "en" | "pt";

interface ProjectsPageProps {
  params: Promise<{ lang: Lang }>;
}

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const validLang = (isLanguage(lang) ? lang : "en") as Lang;
  const t = projectsContent[validLang].projects;

  return {
    title: validLang === "pt" ? "Projetos" : "Projects",
    description: t.description,
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  const t = projectsContent[lang].projects;

  const projects = getProjects(lang);

  return (
    <div className="mx-auto md:max-w-4xl px-4">
      {/* ─── Projects Header Panel ─── */}
      <section
        data-slot="panel"
        className="bp-panel bp-line-top bp-line-bottom"
      >
        <SectionBadge className="px-4 py-8 sm:px-6">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground/60">
            {t.badge}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {t.title}
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            {t.description}
          </p>
        </SectionBadge>
      </section>

      {/* ─── Hatch ─── */}
      <HatchSeparator />

      {/* ─── Projects Content ─── */}
      <ProjectsClient
        projects={projects}
        emptyStateLabel={t.filters.noResults}
      />
    </div>
  );
}
