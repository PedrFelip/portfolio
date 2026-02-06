/**
 * About page data - Work experience, education, and contact links
 * Consolidated content for the about page
 */

import { cache } from "react";
import { socialLinks } from "./links";

export interface WorkExperience {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
}

export const getWorkExperience = cache(
  (language: "en" | "pt"): WorkExperience[] => {
    if (language === "pt") {
      return [
        {
          company: "MhGestão",
          title: "Estagiário Backend",
          location: "Brasília, Brasil",
          start: "Nov 2025",
          end: "Presente",
          description:
            "Desenvolvimento de APIs RESTful com NestJS, seguindo boas práticas de arquitetura modular e clean architecture. Modelagem e manutenção de schemas complexos no PostgreSQL utilizando Prisma ORM. Integração com APIs fiscais externas (Nuvem Fiscal e Focus NFe), incluindo autenticação, emissão e acompanhamento de status.",
        },
      ];
    }

    return [
      {
        company: "MhGestão",
        title: "Backend Intern",
        location: "Brasília, Brazil",
        start: "Nov 2025",
        end: "Present",
        description:
          "Development of RESTful APIs with NestJS, following best practices in modular architecture and clean architecture. Modeling and maintenance of complex schemas in PostgreSQL using Prisma ORM. Integration with external fiscal APIs (Nuvem Fiscal and Focus NFe), including authentication, issuance and status tracking.",
      },
    ];
  },
);

export const getEducation = cache((language: "en" | "pt"): Education[] => {
  if (language === "pt") {
    return [
      {
        school: "UNICEPLAC",
        degree: "Engenharia de Software",
        start: "2024",
        end: "2028",
      },
    ];
  }

  return [
    {
      school: "UNICEPLAC",
      degree: "Software Engineering",
      start: "2024",
      end: "2028",
    },
  ];
});

export const getContactLinks = cache((_language: "en" | "pt") => {
  const contactLinks = socialLinks
    .filter(
      (link) =>
        link.icon === "github" ||
        link.icon === "linkedin" ||
        link.icon === "x" ||
        link.icon === "email",
    )
    .map((link) => ({
      label: link.label,
      url:
        link.icon === "email"
          ? link.url.replace("mailto:", "")
          : link.url.replace(/\/$/, ""),
      icon: link.icon as "github" | "linkedin" | "x" | "email",
    }));

  return contactLinks;
});
