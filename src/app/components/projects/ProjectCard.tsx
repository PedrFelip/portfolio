"use client";

import Link from "next/link";
import { memo } from "react";
import { Badge, Button, H3, MonoText, P } from "@/components/ui";
import { ExternalLink, Github } from "@/components/ui/icons";
import { useLanguage } from "@/lib/LanguageContext";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const { t } = useLanguage();
  const linkLabels = t.projects.links;

  return (
    <div className="group/card relative flex h-full flex-col">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
        <H3 className="break-words pr-2 flex items-start gap-2 transition-colors duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/card:text-accent">
          {project.featured && (
            <MonoText className="mt-0.5 text-xs text-accent opacity-95 font-semibold animate-pulse hover:animate-none transition-all duration-150">
              ★
            </MonoText>
          )}
          {project.title}
        </H3>
        {project.dates && (
          <MonoText className="shrink-0 whitespace-nowrap tabular-nums text-xs sm:text-sm">
            {project.dates}
          </MonoText>
        )}
      </div>

      <div className="mt-3 flex-1 sm:mt-4">
        <P className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          {project.description}
        </P>

        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          {project.technologies.map((tech, index) => (
            <Badge
              key={tech}
              className="transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none hover:border-accent/60 hover:bg-accent/25 hover:text-accent hover:shadow-md hover:shadow-accent/5 variant-projects"
              style={{ transitionDelay: `${index * 20}ms` }}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {project.links && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-dashed border-border pt-4 sm:mt-5">
          {project.links.github && (
            <Button asChild variant="outline" size="sm">
              <Link
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link"
              >
                <Github
                  className="mr-2 h-3.5 w-3.5 icon-hover-rotate group-hover/link:scale-110 sm:h-4 sm:w-4"
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
                className="group/link"
              >
                <ExternalLink
                  className="mr-2 h-3.5 w-3.5 icon-hover-rotate group-hover/link:scale-110 sm:h-4 sm:w-4"
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
                className="group/link"
              >
                <ExternalLink
                  className="mr-2 h-3.5 w-3.5 icon-hover-rotate group-hover/link:scale-110 sm:h-4 sm:w-4"
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
