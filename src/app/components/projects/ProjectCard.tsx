"use client";

import { memo } from "react";
import { Badge, H3, MonoText, P } from "@/components/ui";
import { Star } from "@/components/ui/icons";
import type { Project } from "@/types/portfolio";

import { ProjectLinks } from "./ProjectLinks";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = memo(({ project }: ProjectCardProps) => {
  return (
    <div className="group/card relative flex h-full flex-col">
      {/* Header: title + date */}
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <H3 className="text-sm sm:text-base break-words pr-0 sm:pr-2 flex items-start gap-2 transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:text-accent">
          {project.featured && (
            <Star
              className="mt-px shrink-0 size-3 sm:size-3.5 text-accent opacity-95 animate-pulse hover:animate-none transition-all duration-150"
              aria-hidden="true"
            />
          )}
          {project.title}
        </H3>
        {project.dates && (
          <MonoText className="shrink-0 whitespace-nowrap tabular-nums text-[10px] sm:text-xs text-muted-foreground">
            {project.dates}
          </MonoText>
        )}
      </div>

      {/* Description + tech tags */}
      <div className="mt-3 flex-1 sm:mt-4">
        <P className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </P>

        <div className="mt-3 flex flex-wrap gap-1 sm:mt-4 sm:gap-1.5">
          {project.technologies.map((tech, index) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-[10px] sm:text-xs transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none hover:border-accent/60 hover:bg-accent/25 hover:text-accent hover:shadow-md hover:shadow-accent/5"
              style={{ transitionDelay: `${index * 20}ms` }}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {project.links && <ProjectLinks links={project.links} />}
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";
