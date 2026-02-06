"use client";

import { useMemo } from "react";
import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { Hero } from "@/components/home/Hero";
import { SkillsSection } from "@/components/home/SkillsSection";
import { HOME_TECH_STACK } from "@/lib/home-config";
import { useLanguage } from "@/lib/LanguageContext";
import { getFeaturedProjects } from "@/lib/projects-data";
import { getHomeSkills } from "@/lib/shared-data";
import { useLocalizedLink } from "@/lib/useLocalizedLink";

/**
 * Home page component
 *
 * Note: Marked as client component due to:
 * - useLanguage() hook for translations
 * - useMemo for derived state based on language changes
 *
 * Performance optimizations (Vercel best practices):
 * - useMemo prevents unnecessary recalculations of projects and skills (rerender-memo)
 * - Child components are memoized to prevent unnecessary re-renders
 * - Language-based data fetching is cached per language
 * - Direct imports used (no barrel files) to optimize bundle size
 */
export default function Home() {
  const { t, language } = useLanguage();
  const getLocalizedLink = useLocalizedLink();

  // Memoize projects and skills based on language changes
  // Prevents recalculating derived state on every render
  const skills = useMemo(
    () => getHomeSkills(language as "en" | "pt"),
    [language],
  );

  const featuredProjects = useMemo(
    () => getFeaturedProjects(language as "en" | "pt"),
    [language],
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        greeting={t.hero.greeting}
        title={t.hero.title}
        description={t.hero.description}
        ctaPrimary={t.hero.cta}
        ctaSecondary={t.hero.ctaSecondary}
        primaryHref={getLocalizedLink("/projects")}
        secondaryHref={getLocalizedLink("/about")}
        techStack={HOME_TECH_STACK}
        keywords={t.hero.keywords}
        badge={t.hero.badge}
      />

      {/* Featured Projects Section */}
      <FeaturedProjectsSection
        projects={featuredProjects}
        badge={t.projects.badge}
        title={t.projects.title}
        description={t.projects.description}
        viewAllLabel={t.projects.viewAll}
        viewAllHref={getLocalizedLink("/projects")}
      />

      {/* Skills Section */}
      <SkillsSection
        skills={skills}
        badge={t.skills.badge}
        title={t.skills.title}
      />
    </div>
  );
}
