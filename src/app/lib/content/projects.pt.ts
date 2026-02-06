/**
 * Projects content (Portuguese) - descriptions for all projects
 */

export const projectsPt = {
  projects: {
    badge: "Projetos",
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
      noResults: "Nenhum projeto encontrado com essas tecnologias.",
    },

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
};
