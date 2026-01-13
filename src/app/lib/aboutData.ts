import type { Education, WorkExperience } from "@/types/portfolio";
import { socialLinks } from "./links";

export const getWorkExperience = (language: "en" | "pt"): WorkExperience[] => {
  if (language === "pt") {
    return [
      {
        company: "MhGestão",
        title: "Estagiário Backend",
        location: "Brasília, Brasil",
        start: "Nov 2025",
        end: "Presente",
        description:
          "[Descrição das suas responsabilidades e conquistas no MhGestão - será preenchido depois]",
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
        "[Description of your responsibilities and achievements at MhGestão - to be filled later]",
    },
  ];
};

export const getEducation = (language: "en" | "pt"): Education[] => {
  if (language === "pt") {
    return [
      {
        school: "UNICEPLAC",
        degree: "[Seu Curso/Grau - será preenchido depois]",
        start: "[Ano início]",
        end: "[Ano fim ou Presente]",
      },
    ];
  }

  return [
    {
      school: "UNICEPLAC",
      degree: "[Your Course/Degree - to be filled later]",
      start: "[Start year]",
      end: "[End year or Present]",
    },
  ];
};

export const getContactLinks = (_language: "en" | "pt") => {
  // Filter to get GitHub, LinkedIn, and Email only
  const contactLinks = socialLinks
    .filter(
      (link) =>
        link.icon === "github" ||
        link.icon === "linkedin" ||
        link.icon === "email",
    )
    .map((link) => ({
      label: link.label,
      url: link.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
      icon: link.icon as "github" | "linkedin" | "email",
    }));

  return contactLinks;
};
