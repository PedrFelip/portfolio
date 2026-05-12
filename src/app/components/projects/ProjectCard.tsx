"use client";

import Link from "next/link";
import { memo } from "react";
import { Badge, Button, H3, MonoText, P } from "@/components/ui";
import { ExternalLink, Github } from "@/components/ui/icons";
import { useLanguage } from "@/lib/language-store";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const { t } = useLanguage();
  const linkLabels = t.projects.links;

  return (
    <div className="group/card relative flex h-full flex-col">
      {/* Header: title + date */}
      <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <H3 className="text-sm sm:text-base break-words pr-0 sm:pr-2 flex items-start gap-2 transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:text-accent">
          {project.featured && (
            <MonoText className="mt-px shrink-0 text-[10px] sm:text-xs text-accent opacity-95 font-semibold animate-pulse hover:animate-none transition-all duration-150">
              ★
            </MonoText>
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
              className="text-[10px] sm:text-xs transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none hover:border-accent/60 hover:bg-accent/25 hover:text-accent hover:shadow-md hover:shadow-accent/5 variant-projects"
              style={{ transitionDelay: `${index * 20}ms` }}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Links */}
      {project.links && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-dashed border-border/60 pt-4 sm:mt-5">
          {project.links.github && (
            <Button asChild variant="outline" size="sm">
              <Link
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link text-xs sm:text-sm"
              >
                <Github
                  className="mr-1.5 size-3 sm:mr-2 sm:size-3.5 icon-hover-rotate group-hover/link:scale-110"
                  aria-hidden="true"
                />
                {linkLabels.code}
              </Link>
            </Button>
          )}
          {project.links.demo && (
            <Button asChild variant="outline" size="sm">
              <Link
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link text-xs sm:text-sm"
              >
                <ExternalLink
                  className="mr-1.5 size-3 sm:mr-2 sm:size-3.5 icon-hover-rotate group-hover/link:scale-110"
                  aria-hidden="true"
                />
                {linkLabels.demo}
              </Link>
            </Button>
          )}
          {project.links.website && (
            <Button asChild variant="outline" size="sm">
              <Link
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link text-xs sm:text-sm"
              >
                <ExternalLink
                  className="mr-1.5 size-3 sm:mr-2 sm:size-3.5 icon-hover-rotate group-hover/link:scale-110"
                  aria-hidden="true"
                />
                {linkLabels.website}
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";
