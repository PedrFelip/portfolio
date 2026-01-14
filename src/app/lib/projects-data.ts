import type { Project } from "@/types/portfolio";
import { projectsContent } from "./content/projects-content";

export const getProjects = (language: "en" | "pt"): Project[] => {
  const t = projectsContent[language].projects;

  return [
    {
      id: "oportune",
      title: t.oportunne.title,
      description: t.oportunne.description,
      technologies: [
        "React",
        "TypeScript",
        "Node.js",
        "Fastify",
        "PostgreSQL",
        "Prisma",
        "Docker",
        "Go",
        "Python",
        "Tailwind CSS",
      ],
      links: {
        github: "https://github.com/PedrFelip/oportune",
      },
      dates: language === "pt" ? "2024 - Presente" : "2024 - Present",
      active: true,
      featured: true,
    },
    {
      id: "saude-pontual",
      title: t.saudePontual.title,
      description: t.saudePontual.description,
      technologies: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "Docker",
        "JWT",
        "API REST",
        "React",
      ],
      links: {
        github: "https://github.com/gabbzin/saude_pontual",
      },
      dates: language === "pt" ? "Fev 2025 - Jul 2025" : "Feb 2025 - Jul 2025",
      active: true,
      featured: true,
    },
    {
      id: "plan-it-calendar",
      title: t.planItCalendar.title,
      description: t.planItCalendar.description,
      technologies: ["JavaScript", "Electron", "SQLite", "Node.js", "Scrum"],
      links: {
        github: "https://github.com/PedrFelip/Calendario-scrum",
      },
      dates: "2024",
      active: true,
      featured: true,
    },
    {
      id: "api-financeiro",
      title: t.apiFinanceiro.title,
      description: t.apiFinanceiro.description,
      technologies: [
        "TypeScript",
        "Fastify",
        "SQLite",
        "Knex",
        "Zod",
        "Node.js",
      ],
      links: {
        github: "https://github.com/PedrFelip/api-financeiro",
      },
      active: true,
      featured: false,
    },
    {
      id: "notes-api",
      title: t.notesApi.title,
      description: t.notesApi.description,
      technologies: [
        "Node.js",
        "Fastify",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "Docker",
        "Zod",
      ],
      links: {
        github: "https://github.com/PedrFelip/notes-api",
      },
      active: true,
      featured: false,
    },
  ];
};

export const getFeaturedProjects = (language: "en" | "pt"): Project[] => {
  return getProjects(language).filter((p) => p.featured);
};

// Legacy exports for backward compatibility
export const projects = getProjects("en");
export const featuredProjects = getFeaturedProjects("en");
