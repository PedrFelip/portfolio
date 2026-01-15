"use client";

import { useMemo, useState } from "react";
import { FilterTags } from "@/components/projects/FilterTags";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types/portfolio";

interface ProjectsClientProps {
  projects: Project[];
  emptyStateLabel: string;
}

export default function ProjectsClient({
  projects,
  emptyStateLabel,
}: ProjectsClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const project of projects) {
      for (const tech of project.technologies) {
        tags.add(tech);
      }
    }
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project) =>
      selectedTags.some((tag) => project.technologies.includes(tag)),
    );
  }, [projects, selectedTags]);

  return (
    <>
      <div className="mb-8 sm:mb-10 md:mb-12">
        <FilterTags
          selectedTags={selectedTags}
          onTagChange={setSelectedTags}
          allTags={allTags}
        />
      </div>

      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">{emptyStateLabel}</p>
        </div>
      ) : null}
    </>
  );
}
