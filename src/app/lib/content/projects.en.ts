/**
 * Projects content (English) - descriptions for all projects
 */

export const projectsEn = {
  projects: {
    badge: "Projects",
    title: "Featured Projects",
    subtitle: "Check out my latest work",
    description:
      "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.",
    viewAll: "View all projects",
    links: {
      code: "Code",
      demo: "Demo",
      website: "Website",
    },
    filters: {
      active: (count: number) =>
        `${count} filter${count > 1 ? "s" : ""} active`,
      empty: "Filter by technology",
      clear: "Clear all",
      noResults: "No projects found with those technologies.",
    },

    oportunne: {
      title: "Oportune+",
      description:
        "Web platform connecting students, professors, and companies to centralize opportunities for early career professionals. Built with microservices architecture using Node.js, Fastify, React, and Go.",
    },
    saudePontual: {
      title: "Saúde Pontual",
      description:
        "Medical appointment scheduling system with robust backend architecture. Developed the API infrastructure handling appointment management, patient data, and business logic. Implemented JWT authentication, database migrations, and Docker containerization.",
    },
    planItCalendar: {
      title: "Plan It - Calendar",
      description:
        "Academic project built using Scrum methodology. An intuitive calendar application for event management with create, edit, and delete functionality. Developed as part of practical learning of agile development practices.",
    },
    apiFinanceiro: {
      title: "API Financeiro",
      description:
        "Financial transactions management API built with TypeScript and Fastify for high performance. Features modern REST architecture with SQLite database, Knex query builder for optimized queries, Zod validation for type-safe data handling.",
    },
    notesApi: {
      title: "Notes API",
      description:
        "Simple REST API for note management built with Node.js, Fastify, and TypeScript. Features include CRUD operations, data validation with Zod, Prisma ORM for PostgreSQL, and Docker containerization.",
    },
  },
};
