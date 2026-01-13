"use client";

import { useMemo } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjects } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProjectsPage() {
  const { t, language } = useLanguage();

  const projects = useMemo(
    () => getProjects(language as "en" | "pt"),
    [language],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      {/* Page Header */}
      <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {t.projects.badge}
        </div>
        <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
          {t.projects.title}
        </h1>
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground">
          {t.projects.description}
        </p>
      </div>

      {/* All Projects Grid */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
