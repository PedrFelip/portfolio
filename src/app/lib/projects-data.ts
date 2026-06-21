import { cache } from "react";
import type { Project } from "@/types/portfolio";
import { projectsEn } from "./content/projects.en";
import { projectsPt } from "./content/projects.pt";

// TODO(refactor)[P3]: bypasses translations merge point
const projectsContent = {
  en: projectsEn,
  pt: projectsPt,
};

export const getProjects = cache(
  // TODO(refactor)[P1]: inline union instead of Language type
  (language: "en" | "pt"): Project[] => {
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
        // TODO(refactor)[P2]: hardcoded bilingual dates in code
        dates:
          language === "pt" ? "Ago 2025 - Dez 2025" : "Aug 2025 - Dec 2025",
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
        // TODO(refactor)[P2]: hardcoded bilingual dates in code
        dates:
          language === "pt" ? "Fev 2025 - Jul 2025" : "Feb 2025 - Jul 2025",
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
        // TODO(refactor)[P2]: hardcoded bilingual dates in code
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
  },
);
