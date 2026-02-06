import { cache } from "react";
import { translations } from "./i18n";

export interface SkillGroup {
  category: string;
  items: string[];
}

export const getSkills = cache((language: "en" | "pt"): SkillGroup[] => {
  const t = translations[language];
  return [
    {
      category: t.skills.backend,
      items: ["Node.js", "TypeScript", "NestJS", "Fastify", "Prisma"],
    },
    {
      category: t.skills.databases,
      items: ["PostgreSQL", "Redis"],
    },
    {
      category: t.skills.devops,
      items: ["Docker", "Linux", "Cloud Architecture", "API Design"],
    },
    {
      category: t.skills.tools,
      items: ["Git", "REST APIs", "System Design"],
    },
  ];
});

// Alias for consistency with home-data usage
export const getHomeSkills = cache((language: "en" | "pt"): SkillGroup[] => {
  return getSkills(language);
});
