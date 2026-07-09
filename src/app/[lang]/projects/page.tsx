import type { Metadata } from "next";
import dynamic from "next/dynamic";
import {
  HatchSeparator,
  SectionBadge,
  SectionLabel,
} from "@/components/blueprint";
import {
  DEFAULT_LANGUAGE,
  getTranslations,
  isLanguage,
  type Language,
  langStaticParams,
} from "@/lib/i18n";
import { getProjects } from "@/lib/projects-data";

const ProjectsClient = dynamic(() => import("./ProjectsClient"), {
  loading: () => (
    <div className="bp-panel px-4 py-16 text-center text-xs font-mono text-muted-foreground">
      Loading projects...
    </div>
  ),
});

type Lang = Language;

interface ProjectsPageProps {
  params: Promise<{ lang: Lang }>;
}

export function generateStaticParams() {
  return langStaticParams();
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { lang } = await params;
  const validLang = isLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const t = getTranslations(validLang).projects;

  return {
    title: t.pageTitle,
    description: t.description,
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { lang } = await params;
  const validLang = isLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const t = getTranslations(validLang).projects;

  const projects = getProjects(validLang);

  return (
    <div className="mx-auto md:max-w-4xl px-4">
      {/* ─── Projects Header Panel ─── */}
      <section
        data-slot="panel"
        className="bp-panel bp-line-top bp-line-bottom"
      >
        <SectionBadge className="px-4 py-8 sm:px-6">
          <SectionLabel>{t.badge}</SectionLabel>
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
