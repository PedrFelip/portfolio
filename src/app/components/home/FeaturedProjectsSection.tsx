import { memo } from "react";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ViewAllLink } from "@/components/common/ViewAllLink";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types/portfolio";

interface FeaturedProjectsSectionProps {
  projects: Project[];
  badge: string;
  title: string;
  description: string;
  viewAllLabel: string;
  viewAllHref: string;
}

/**
 * FeaturedProjectsSection component
 *
 * Best practices applied:
 * - Memoized to prevent unnecessary re-renders (Vercel: rerender-memo)
 * - Receives fully constructed data from parent to avoid inline object creation
 * - Child component (ProjectCard) handles its own memoization
 * - Clean separation of concerns: Section, Header, Grid, Link
 */
export const FeaturedProjectsSection = memo(
  ({
    projects,
    badge,
    title,
    description,
    viewAllLabel,
    viewAllHref,
  }: FeaturedProjectsSectionProps) => {
    return (
      <Section variant="muted">
        <SectionHeader
          badge={badge}
          badgeVariant="projects"
          title={title}
          description={description}
        />

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="dark" />
          ))}
        </div>

        <ViewAllLink href={viewAllHref} label={viewAllLabel} />
      </Section>
    );
  },
);

FeaturedProjectsSection.displayName = "FeaturedProjectsSection";
