"use client";

import { useMemo, useState } from "react";
import { SectionDivider } from "@/components/blueprint";
import { FilterTags } from "@/components/projects/FilterTags";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { P } from "@/components/ui";
import { useLanguage } from "@/lib/LanguageContext";
import type { Project } from "@/types/portfolio";

interface ProjectsClientProps {
  projects: Project[];
  emptyStateLabel: string;
}

export default function ProjectsClient({
  projects,
  emptyStateLabel,
}: ProjectsClientProps) {
  const { t } = useLanguage();
  const filterLabels = t.projects.filters;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  return (
    <>
      <section className="rail-bounded px-6 py-6 sm:px-8">
        <FilterTags
          selectedTags={selectedTags}
          onTagChange={setSelectedTags}
          allTags={allTags}
          tagCounts={tagCounts}
        />
      </section>

      <SectionDivider />

      {filteredProjects.length > 0 ? (
        <div className="rail-bounded border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {(() => {
              const padCount = (3 - (filteredProjects.length % 3)) % 3;
              const items = [
                ...filteredProjects.map((p) => ({
                  project: p,
                  isEmpty: false,
                })),
                ...Array.from({ length: padCount }, () => ({
                  project: null,
                  isEmpty: true,
                })),
              ];
              return items.map((item, index) => (
                <div
                  key={item.project ? item.project.id : `empty-${index}`}
                  className={`px-6 py-8 transition-colors duration-200 animate-in-up
                    ${!item.isEmpty ? "group hover:bg-white/[0.02]" : ""}
                    ${index % 3 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : ""}
                    ${index % 2 !== 0 ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${index >= 3 ? "lg:border-t lg:border-dashed lg:border-border" : ""}
                    ${index >= 2 ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border" : ""}
                    ${index >= 1 ? "max-sm:border-t max-sm:border-dashed max-sm:border-border" : ""}
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.project && <ProjectCard project={item.project} />}
                </div>
              ));
            })()}
          </div>
        </div>
      ) : (
        <div className="rail-bounded">
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center animate-in-up">
            <P className="mb-2 text-muted-foreground">{emptyStateLabel}</P>
            <div className="mb-4 text-xs font-mono text-muted-foreground/70">
              {filterLabels.active(selectedTags.length)}
            </div>
            {selectedTags.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedTags([])}
                className="text-xs font-medium text-accent transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-accent/80"
              >
                {filterLabels.clearButton}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
