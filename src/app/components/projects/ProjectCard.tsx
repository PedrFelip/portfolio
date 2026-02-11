"use client";

import Link from "next/link";
import { memo } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  H3,
  MonoText,
  P,
} from "@/components/ui";
import { ExternalLink, Github } from "@/components/ui/icons";
import { useLanguage } from "@/lib/LanguageContext";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard component
 *
 * Design principles (AGENTS.md):
 * - 4px grid: consistent spacing throughout
 * - Symmetrical padding: matching padding on all sides
 * - Borders-only approach: subtle borders, minimal depth
 * - Typography: monospace for data (dates, tech, links)
 * - Animation: 150-250ms with cubic-bezier easing
 * - Mobile-first: optimized for small screens
 * - Card Layouts Vary: internal structure for specific content
 *
 * Best practices applied:
 * - Memoized to prevent re-renders when project prop doesn't change
 * - Flex column layout to push links to bottom consistently
 * - Separates concerns: header, description, tech list, links
 * - Uses shadcn/ui components: Card, H3, P, MonoText, Badge, Button
 * - Removed custom ProjectLink component in favor of Button asChild pattern
 */
export const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const { t } = useLanguage();
  const linkLabels = t.projects.links;
  const techCount = project.technologies.length;
  const displayedTechs = project.technologies.slice(0, 6);
  const remainingTechs = techCount > 6 ? techCount - 6 : 0;

  return (
    <Card className="group flex h-full flex-col hover-lift-subtle touch-feedback-subtle">
      {/* Header: Title + Dates */}
      <CardHeader>
        <div className="flex flex-col gap-2 sm:gap-2 sm:flex-row sm:items-start sm:justify-between">
          <H3 className="pr-2 transition-colors duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] break-words group-hover:text-accent flex items-start gap-2">
            {project.featured && (
              <MonoText className="text-xs text-[color:var(--brand-amber)] opacity-80 mt-0.5">
                ★
              </MonoText>
            )}
            {project.title}
          </H3>
          {project.dates && (
            <MonoText className="whitespace-nowrap tabular-nums text-xs sm:text-sm">
              {project.dates}
            </MonoText>
          )}
        </div>
      </CardHeader>

      {/* Description */}
      <CardContent className="flex-grow">
        <P className="leading-relaxed">{project.description}</P>

        {/* Technologies */}
        <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
          {displayedTechs.map((tech, index) => (
            <Badge
              key={tech}
              className="transition-all duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-accent hover:bg-accent/10 hover:text-accent motion-reduce:transition-none min-h-[32px] touch-target-xs"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              {tech}
            </Badge>
          ))}
          {remainingTechs > 0 && (
            <Badge className="min-h-[32px]">+{remainingTechs}</Badge>
          )}
        </div>
      </CardContent>

      {/* Links - always pushed to bottom */}
      {project.links && (
        <CardFooter className="flex flex-wrap gap-2">
          {project.links.github && (
            <Button asChild variant="outline" size="sm">
              <Link
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link"
              >
                <Github
                  className="mr-2 h-3.5 w-3.5 icon-hover-rotate group-hover/icon:scale-110 sm:h-4 sm:w-4"
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
                  className="mr-2 h-3.5 w-3.5 icon-hover-rotate group-hover/icon:scale-110 sm:h-4 sm:w-4"
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
                  className="mr-2 h-3.5 w-3.5 icon-hover-rotate group-hover/icon:scale-110 sm:h-4 sm:w-4"
                  aria-hidden="true"
                />
                {linkLabels.website}
              </Link>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
});

ProjectCard.displayName = "ProjectCard";
