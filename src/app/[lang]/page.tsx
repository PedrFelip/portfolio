import { FeaturedProjectsSection } from "@/components/home/FeaturedProjectsSection";
import { Hero } from "@/components/home/Hero";
import { SkillsSection } from "@/components/home/SkillsSection";
import { homeEn } from "@/lib/content/home.en";
import { homePt } from "@/lib/content/home.pt";
import { HOME_TECH_STACK } from "@/lib/home-config";
import { getFeaturedProjects } from "@/lib/projects-data";
import { getHomeSkills } from "@/lib/shared-data";

type Lang = "en" | "pt";

interface HomePageProps {
  params: Promise<{ lang: Lang }>;
}

const homeContent = {
  en: homeEn,
  pt: homePt,
};

function getLocalizedLink(lang: Lang, path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (cleanPath.startsWith("/en/") || cleanPath.startsWith("/pt/")) {
    return cleanPath;
  }

  if (cleanPath === "/") {
    return `/${lang}`;
  }

  return `/${lang}${cleanPath}`;
}

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params;
  const t = homeContent[lang];

  const [skills, featuredProjects] = await Promise.all([
    getHomeSkills(lang),
    getFeaturedProjects(lang),
  ]);

  return (
    <div className="min-h-screen">
      <Hero
        greetingTexts={t.hero.greetingTexts}
        title={t.hero.title}
        description={t.hero.description}
        ctaPrimary={t.hero.cta}
        ctaSecondary={t.hero.ctaSecondary}
        primaryHref={getLocalizedLink(lang, "/projects")}
        secondaryHref={getLocalizedLink(lang, "/about")}
        techStack={HOME_TECH_STACK}
        keywords={t.hero.keywords}
        badge={t.hero.badge}
      />

      <FeaturedProjectsSection
        projects={featuredProjects}
        badge={t.projects.badge}
        title={t.projects.title}
        description={t.projects.description}
        viewAllLabel={t.projects.viewAll}
        viewAllHref={getLocalizedLink(lang, "/projects")}
      />

      <SkillsSection
        skills={skills}
        badge={t.skills.badge}
        title={t.skills.title}
      />
    </div>
  );
}
