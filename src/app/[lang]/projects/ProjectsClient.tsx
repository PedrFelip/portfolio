"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { SectionDivider } from "@/components/blueprint";
import { CardFlicker } from "@/components/projects/CardFlicker";
import { FilterTags } from "@/components/projects/FilterTags";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { P } from "@/components/ui";
import { projectCardVariants, projectGridVariants } from "@/lib/animations";
import { useLanguage } from "@/lib/language-store";
import type { Project } from "@/types/portfolio";

interface ProjectsClientProps {
  projects: Project[];
  emptyStateLabel: string;
}

function getGridBorderClasses(index: number): string {
  return [
    index % 3 !== 0 ? "lg:border-l lg:border-dashed lg:border-border" : "",
    index % 2 !== 0
      ? "sm:max-lg:border-l sm:max-lg:border-dashed sm:max-lg:border-border"
      : "",
    index >= 3 ? "lg:border-t lg:border-dashed lg:border-border" : "",
    index >= 2
      ? "sm:max-lg:border-t sm:max-lg:border-dashed sm:max-lg:border-border"
      : "",
    index >= 1
      ? "max-sm:border-t max-sm:border-dashed max-sm:border-border"
      : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function ProjectsClient({
  projects,
  emptyStateLabel,
}: ProjectsClientProps) {
  const { t } = useLanguage();
  const filterLabels = t.projects.filters;
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagChange = useCallback((tags: string[]) => {
    setSelectedTags(tags);
  }, []);

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

  const filterKey = selectedTags.length > 0 ? selectedTags.join(",") : "all";

  return (
    <>
      <section className="rail-bounded px-6 py-6 sm:px-8">
        <FilterTags
          selectedTags={selectedTags}
          onTagChange={handleTagChange}
          allTags={allTags}
          tagCounts={tagCounts}
        />
      </section>

      <SectionDivider />

      <div className="rail-bounded border border-border relative">
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`grid-${filterKey}`}
              variants={projectGridVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {(() => {
                  const padCount = (3 - (filteredProjects.length % 3)) % 3;
                  const items = [
                    ...filteredProjects.map((p) => ({
                      project: p,
                      isEmpty: false,
                    })),
                    ...Array.from({ length: padCount }, (_, i) => ({
                      project: null,
                      isEmpty: true,
                      key: `empty-${i}`,
                    })),
                  ];
                  return items.map((item, index) =>
                    item.project ? (
                      <motion.div
                        key={item.project.id}
                        variants={projectCardVariants}
                        className={`relative px-6 py-8 transition-colors duration-200 group hover:bg-surface-2 ${getGridBorderClasses(
                          index,
                        )}`}
                      >
                        <CardFlicker />
                        <ProjectCard project={item.project} />
                      </motion.div>
                    ) : (
                      <div
                        key={item.key}
                        className={getGridBorderClasses(index)}
                      />
                    ),
                  );
                })()}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              variants={projectGridVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <P className="mb-2 text-muted-foreground">{emptyStateLabel}</P>
                <div className="mb-4 text-xs font-mono text-muted-foreground/70">
                  {filterLabels.active(selectedTags.length)}
                </div>
                {selectedTags.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleTagChange([])}
                    className="text-xs font-medium text-accent transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:text-accent/80"
                  >
                    {filterLabels.clearButton}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
