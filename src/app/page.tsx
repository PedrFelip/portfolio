"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { getFeaturedProjects } from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { t, language } = useLanguage();

  const skills = [
    {
      category: t.skills.backend,
      items: ["Node.js", "TypeScript", "Go", "Fastify", "Express", "Prisma"],
    },
    { category: t.skills.databases, items: ["PostgreSQL", "SQLite", "Redis"] },
    {
      category: t.skills.devops,
      items: ["Docker", "Linux", "Cloud Architecture", "API Design"],
    },
    {
      category: t.skills.tools,
      items: ["Git", "REST APIs", "System Design", "Microservices"],
    },
  ];

  const featuredProjects = useMemo(
    () => getFeaturedProjects(language as "en" | "pt"),
    [language],
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Projects Section */}
      <section className="border-t border-border bg-muted/30 py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 sm:mb-12">
            <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t.projects.badge}
            </div>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {t.projects.title}
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-muted-foreground">
              {t.projects.description}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* View All Projects Link */}
          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.projects.viewAll}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 sm:py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <div className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {t.skills.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {t.skills.title}
            </h2>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded border border-border bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
