/**
 * About page data - Work experience, education, and contact links
 * Consolidated content for the about page
 */

import { cache } from "react";
// TODO(refactor)[P1]: relative import instead of @/ alias
import type { Education, WorkExperience } from "../types/portfolio";
import { socialLinks } from "./links";

export const getWorkExperience = cache(
  // TODO(refactor)[P1]: inline union instead of Language type
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

export const getEducation = cache(
  // TODO(refactor)[P1]: inline union instead of Language type
  (language: "en" | "pt"): Education[] => {
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
  },
);

// TODO(refactor)[P1]: _language parameter unused
export const getContactLinks = cache((_language: "en" | "pt") => {
  const allowed = new Set(["github", "linkedin", "x", "email"]);
  const contactLinks = socialLinks.reduce<
    {
      label: string;
      url: string;
      icon: "github" | "linkedin" | "x" | "email";
    }[]
  >((acc, link) => {
    if (!allowed.has(link.icon)) return acc;
    acc.push({
      label: link.label,
      url:
        link.icon === "email"
          ? link.url.replace("mailto:", "")
          : link.url.replace(/\/$/, ""),
      // TODO(refactor)[P1]: repeated as cast for contact icon
      icon: link.icon as "github" | "linkedin" | "x" | "email",
    });
    return acc;
  }, []);

  return contactLinks;
});
