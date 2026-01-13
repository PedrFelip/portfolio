export type Language = "en" | "pt";

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  pt: "Português",
};

export const DEFAULT_LANGUAGE: Language = "en";

export const translations = {
  en: {
    // Navigation
    nav: {
      home: "Home",
      about: "About / CV",
      projects: "Projects",
      blog: "Blog",
      language: "Language",
      theme: "Theme",
      toggleMenu: "Toggle menu",
    },

    // Hero Section
    hero: {
      greeting: "Hi, I'm Pedro Felipe 👋",
      title: "Backend Engineer & System Architect",
      subtitle: "Backend Developer & DevOps Enthusiast",
      description:
        "Building scalable, maintainable systems focused on efficiency and reliability",
      cta: "Explore my work",
      ctaSecondary: "Read my CV",
    },

    // About Section
    about: {
      badge: "About Me",
      title: "About Me",
      intro:
        "I am a backend engineer passionate about designing robust and scalable systems.",
      description:
        "I'm a backend developer passionate about **system design**, **cloud infrastructure**, and **automation**. I build scalable APIs, implement Infrastructure as Code, and design reliable, maintainable systems that support growth. My main stack includes **Node.js**, **TypeScript**, **Go**, **PostgreSQL**, **Docker**, and **Linux**. I'm also a long-time Linux user — always experimenting with setups and optimizing environments to make development faster and cleaner. I believe in learning by building, continuously improving my craft through hands-on projects and real-world challenges.",
    },

    // Work Section
    work: {
      badge: "Work Experience",
      title: "Work Experience",
      present: "Present",
      intro:
        "Honed backend and platform engineering skills while shipping products for startups, health teams, and academic initiatives.",
    },

    // Education Section
    education: {
      badge: "Education",
      title: "Education",
    },

    // Contact Section
    contact: {
      badge: "Get in Touch",
      title: "Let's Connect",
      description:
        "Feel free to reach out through any of these channels. I'm always open to discussing new projects, technical challenges, or collaboration opportunities.",
    },

    // Projects
    projects: {
      badge: "My Projects",
      title: "Featured Projects",
      subtitle: "Check out my latest work",
      description:
        "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.",
      viewAll: "View all projects",

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

    // Skills Section
    skills: {
      badge: "Expertise",
      title: "Core Technical Skills",
      backend: "Backend",
      databases: "Databases",
      devops: "DevOps & Infrastructure",
      tools: "Tools & Practices",
    },

    // Philosophy Section
    philosophy: {
      title: "Always Learning, Always Building",
      text1:
        "I believe the best way to grow as a developer is through hands-on experience. Every project is an opportunity to solve real problems, experiment with new technologies, and push the boundaries of what I know.",
      text2:
        "Whether it's optimizing infrastructure, designing scalable architectures, or automating complex workflows — I'm driven by the challenge of building systems that work reliably and efficiently.",
    },

    // Blog
    blog: {
      title: "Blog",
      subtitle: "Insights on backend engineering, system design, and DevOps",
      readMore: "Read more",
      back: "Back",
      share: "Share",
      shareOn: "Share on",
      copyLink: "Copy link",
      linkCopied: "Link copied!",
      shareVia: "Share via",
    },

    // Common
    common: {
      home: "Home",
      about: "About",
      projects: "Projects",
      blog: "Blog",
      language: "Language",
      github: "GitHub",
      website: "Website",
      present: "Present",
      viewProject: "View Project",
      sourceCode: "Source Code",
    },

    // Footer
    footer: {
      year: new Date().getFullYear(),
      madeWith: "Made with",
      by: "by",
    },

    // Header
    header: {
      name: "Pedro Felipe",
      subtitle: "Backend Engineer & System Architect",
    },

    // Links Page
    links: {
      heading: "Pedro Felipe",
      subtitle: "Backend Engineer & System Architect",
      footerText: "Made with precision for backend engineering",
    },
  },
  pt: {
    // Navigation
    nav: {
      home: "Início",
      about: "Sobre / CV",
      projects: "Projetos",
      blog: "Blog",
      language: "Idioma",
      theme: "Tema",
      toggleMenu: "Alternar menu",
    },

    // Hero Section
    hero: {
      greeting: "Olá, Sou Pedro Felipe 👋",
      title: "Engenheiro Backend & Arquiteto de Sistemas",
      subtitle: "Desenvolvedor Backend & Entusiasta DevOps",
      description:
        "Construindo sistemas escaláveis e manteníveis focados em eficiência e confiabilidade",
      cta: "Explorar meu trabalho",
      ctaSecondary: "Ler meu CV",
    },

    // About Section
    about: {
      badge: "About Me",
      title: "About Me",
      intro:
        "I am a backend engineer passionate about designing robust and scalable systems.",
      description:
        "I'm a backend developer passionate about **system design**, **cloud infrastructure**, and **automation**. I build scalable APIs, implement Infrastructure as Code, and design reliable, maintainable systems that support growth. My main stack includes **Node.js**, **TypeScript**, **Go**, **PostgreSQL**, **Docker**, and **Linux**. I'm also a long-time Linux user — always experimenting with setups and optimizing environments to make development faster and cleaner. I believe in learning by building, continuously improving my craft through hands-on projects and real-world challenges.",
    },

    // Work Section
    work: {
      badge: "Experiência",
      title: "Experiência Profissional",
      present: "Presente",
      intro:
        "Experiências práticas construindo plataformas backend e infraestrutura para startups, equipes de saúde e iniciativas acadêmicas.",
    },

    // Education Section
    education: {
      badge: "Educação",
      title: "Educação",
    },

    // Projects
    projects: {
      badge: "Meus Projetos",
      title: "Projetos em Destaque",
      subtitle: "Confira meu trabalho mais recente",
      description:
        "Trabalhei em uma variedade de projetos, desde sites simples até aplicações web complexas. Aqui estão alguns dos meus favoritos.",
      viewAll: "Ver todos os projetos",

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

    // Skills Section
    skills: {
      badge: "Expertise",
      title: "Habilidades Técnicas Principais",
      backend: "Backend",
      databases: "Bancos de Dados",
      devops: "DevOps & Infraestrutura",
      tools: "Ferramentas & Práticas",
    },

    // Philosophy Section
    philosophy: {
      title: "Sempre Aprendendo, Sempre Construindo",
      text1:
        "Acredito que a melhor forma de crescer como desenvolvedor é através da experiência prática. Cada projeto é uma oportunidade para resolver problemas reais, experimentar novas tecnologias e expandir os limites do que eu sei.",
      text2:
        "Seja otimizando infraestrutura, projetando arquiteturas escaláveis ou automatizando workflows complexos — sou movido pelo desafio de construir sistemas que funcionam de forma confiável e eficiente.",
    },

    // Contact Section
    contact: {
      badge: "Contato",
      title: "Vamos Conversar",
      description:
        "Interessado em colaborar em um projeto, discutir tecnologia ou apenas quer dizer oi? Estou sempre aberto a conectar com outros desenvolvedores e explorar novas oportunidades. Sinta-se à vontade para entrar em contato através de qualquer um dos meus canais sociais abaixo!",
    },

    // Blog
    blog: {
      title: "Blog",
      subtitle:
        "Insights sobre engenharia backend, design de sistemas e DevOps",
      readMore: "Ler mais",
      back: "Voltar",
      share: "Compartilhar",
      shareOn: "Compartilhar em",
      copyLink: "Copiar link",
      linkCopied: "Link copiado!",
      shareVia: "Compartilhar via",
    },

    // Common
    common: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      blog: "Blog",
      language: "Idioma",
      github: "GitHub",
      website: "Website",
      present: "Presente",
      viewProject: "Ver Projeto",
      sourceCode: "Código Fonte",
    },

    // Footer
    footer: {
      year: new Date().getFullYear(),
      madeWith: "Feito com",
      by: "por",
    },

    // Header
    header: {
      name: "Pedro Felipe",
      subtitle: "Engenheiro Backend & Arquiteto de Sistemas",
    },

    // Links Page
    links: {
      heading: "Pedro Felipe",
      subtitle: "Engenheiro Backend & Arquiteto de Sistemas",
      footerText: "Feito com precisão para engenharia backend",
    },
  },
};

// Helper to get translation by key path (e.g., "hero.title")
export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split(".");
  let value: unknown = translations[language];

  for (const k of keys) {
    if (typeof value === "object" && value !== null) {
      value = (value as Record<string, unknown>)[k];
    }
  }

  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : key;
};
