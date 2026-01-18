/**
 * Projects content - descriptions for all projects
 * Keep translations for project titles and descriptions
 */

export const projectsContent = {
  en: {
    projects: {
      badge: "My Projects",
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
      },

      // Individual Projects
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
  },
  pt: {
    projects: {
      badge: "Meus Projetos",
      title: "Projetos em Destaque",
      subtitle: "Confira meu trabalho mais recente",
      description:
        "Trabalhei em uma variedade de projetos, desde sites simples até aplicações web complexas. Aqui estão alguns dos meus favoritos.",
      viewAll: "Ver todos os projetos",
      links: {
        code: "Código",
        demo: "Demo",
        website: "Website",
      },
      filters: {
        active: (count: number) =>
          `${count} filtro${count > 1 ? "s" : ""} ativo${count > 1 ? "s" : ""}`,
        empty: "Filtrar por tecnologia",
        clear: "Limpar tudo",
      },

      // Individual Projects
      oportunne: {
        title: "Oportune+",
        description:
          "Plataforma web conectando estudantes, professores e empresas para centralizar oportunidades para profissionais iniciantes. Construída com arquitetura de microsserviços usando Node.js, Fastify, React e Go.",
      },
      saudePontual: {
        title: "Saúde Pontual",
        description:
          "Sistema de agendamento médico com arquitetura backend robusta. Desenvolvi a infraestrutura da API gerenciando agendamentos, dados de pacientes e lógica de negócio. Implementei autenticação JWT, migrações de banco de dados e containerização Docker.",
      },
      planItCalendar: {
        title: "Plan It - Calendário",
        description:
          "Projeto acadêmico construído usando metodologia Scrum. Uma aplicação intuitiva de calendário para gerenciamento de eventos com funcionalidades de criar, editar e excluir. Desenvolvido como parte do aprendizado prático das práticas ágeis.",
      },
      apiFinanceiro: {
        title: "API Financeiro",
        description:
          "API de gerenciamento de transações financeiras construída com TypeScript e Fastify para alta performance. Recursos incluem arquitetura REST moderna com banco SQLite, query builder Knex para consultas otimizadas, validação Zod para manipulação type-safe de dados.",
      },
      notesApi: {
        title: "Notes API",
        description:
          "API REST simples para gerenciamento de notas construída com Node.js, Fastify e TypeScript. Recursos incluem operações CRUD, validação de dados com Zod, ORM Prisma para PostgreSQL e containerização Docker.",
      },
    },
  },
};
