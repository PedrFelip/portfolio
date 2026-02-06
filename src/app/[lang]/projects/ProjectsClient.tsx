"use client";

import { memo, useMemo, useState } from "react";
import { FilterTags } from "@/components/projects/FilterTags";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { P } from "@/components/ui";
import { useLanguage } from "@/lib/LanguageContext";
import type { Project } from "@/types/portfolio";

interface ProjectsClientProps {
  projects: Project[];
  emptyStateLabel: string;
}

// ✅ Memoized card wrapper to prevent unnecessary re-renders (Vercel 5.2)
const AnimatedProjectCard = memo(
  ({ project, delay }: { project: Project; delay: string }) => (
    <div className="animate-in-up" style={{ animationDelay: delay }}>
      <ProjectCard project={project} />
    </div>
  ),
);

AnimatedProjectCard.displayName = "AnimatedProjectCard";

export default function ProjectsClient({
  projects,
  emptyStateLabel,
}: ProjectsClientProps) {
  const { t } = useLanguage();
  const filterLabels = t.projects.filters;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // ✅ useMemo with Set for O(1) lookups (Vercel 7.11)
  const { allTags, tagCounts } = useMemo(() => {
    const tags = new Set<string>();
    const counts = new Map<string, number>();
    for (const project of projects) {
      for (const tech of project.technologies) {
        tags.add(tech);
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      }
    }
    return {
      allTags: Array.from(tags).sort(),
      tagCounts: counts,
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project) =>
      selectedTags.some((tag) => project.technologies.includes(tag)),
    );
  }, [projects, selectedTags]);

  // ✅ Memoized project cards - only recreates when filteredProjects changes
  const projectCards = useMemo(
    () =>
      filteredProjects.map((project, index) => (
        <AnimatedProjectCard
          key={project.id}
          project={project}
          delay={`${index * 50}ms`}
        />
      )),
    [filteredProjects],
  );

  return (
    <>
      <div className="mb-8 sm:mb-10 md:mb-12">
        <FilterTags
          selectedTags={selectedTags}
          onTagChange={setSelectedTags}
          allTags={allTags}
          tagCounts={tagCounts}
        />
      </div>

      <div className="grid gap-4 sm:gap-6 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projectCards}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center px-4 animate-in-up">
          <P className="text-muted-foreground mb-2">{emptyStateLabel}</P>
          <div className="text-xs font-mono text-muted-foreground/70 mb-4">
            {filterLabels.active(selectedTags.length)}
          </div>
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={() => setSelectedTags([])}
              className="text-xs font-medium text-accent hover:text-accent/80 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)]"
            >
              {filterLabels.clearButton}
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}
