export const pt = {
	// Hero Section
        hero: {
                greeting: 'Olá, Sou Pedro Felipe 👋',
                subtitle: 'Desenvolvedor Backend & Entusiasta DevOps',
                cta: 'Explorar projetos'
        },

	// Sections
	sections: {
		about: 'Sobre',
		education: 'Educação',
		skills: 'Habilidades',
		projects: 'Projetos',
		contact: 'Contato'
	},

	// About
	about: {
		description:
			'Sou um desenvolvedor backend apaixonado por **system design**, **infraestrutura em nuvem** e **automação**. Construo APIs escaláveis, implemento Infraestrutura como Código e projeto sistemas confiáveis e sustentáveis que suportam crescimento. Meu stack principal inclui **Node.js**, **TypeScript**, **Go**, **PostgreSQL**, **Docker** e **Linux**. Também sou usuário Linux de longa data — sempre experimentando configurações e otimizando ambientes para tornar o desenvolvimento mais rápido e limpo. Acredito em aprender construindo, melhorando continuamente minhas habilidades através de projetos práticos e desafios do mundo real.'
	},

	// Projects
	projects: {
		badge: 'Meus Projetos',
		title: 'Confira meu trabalho mais recente',
		description:
			'Trabalhei em uma variedade de projetos, desde sites simples até aplicações web complexas. Aqui estão alguns dos meus favoritos.',
		items: {
			oportune: {
				title: 'Oportune+',
				description:
					'Plataforma web que conecta alunos, professores e empresas para centralizar oportunidades para profissionais no início de carreira. Construída com arquitetura de microsserviços usando Node.js, Fastify, React e Go. Recursos incluem candidatura com um clique, filtros de busca avançados, notificações por email e perfis multi-usuário (Alunos, Empresas, Professores). Implementa solução full-stack com PostgreSQL, Prisma ORM, containerização Docker e Python para validações específicas.'
			},
			'saude-pontual': {
				title: 'Saúde Pontual',
				description:
					'Sistema de gestão para clínicas médicas focado em backend escalável e seguro. Responsável por implementar toda a arquitetura backend incluindo autenticação JWT, gerenciamento de usuários, agendamentos e prontuários médicos. Utilizou Express.js, PostgreSQL com queries otimizadas, Docker para containerização, e implementou validação robusta de dados e controle de permissões.'
			},
			'plan-it-calendar': {
				title: 'Plan It - Calendar',
				description:
					'Projeto acadêmico construído usando metodologia Scrum. Aplicação de calendário intuitiva para gerenciamento de eventos com funcionalidades de criar, editar e deletar. Desenvolvido como parte do aprendizado prático de práticas de desenvolvimento ágil.'
			},
			'api-financeiro': {
				title: 'API Financeiro',
				description:
					'API REST completa para gerenciamento financeiro pessoal construída com TypeScript e Fastify. Implementa autenticação JWT, transações com categorização, e relatórios. Utiliza Knex.js como query builder, SQLite como banco de dados, validação de dados com Zod, e oferece documentação Swagger completa.'
			},
			'notes-api': {
				title: 'Notes API',
				description:
					'API REST simples para gerenciamento de notas construída com Node.js, Fastify e TypeScript. Recursos incluem operações CRUD, validação de dados com Zod, Prisma ORM para PostgreSQL e containerização Docker. Implementa arquitetura limpa com camadas separadas (controller, service, repository).'
			}
		}
	},

	// Philosophy Section
	philosophy: {
		title: 'Sempre Aprendendo, Sempre Construindo',
		text1:
			'Acredito que a melhor forma de crescer como desenvolvedor é através da experiência prática. Cada projeto é uma oportunidade para resolver problemas reais, experimentar novas tecnologias e expandir os limites do que eu sei.',
		text2:
			'Seja otimizando infraestrutura, projetando arquiteturas escaláveis ou automatizando workflows complexos — sou movido pelo desafio de construir sistemas que funcionam de forma confiável e eficiente.'
	},

	// Contact
	contact: {
		badge: 'Contato',
		title: 'Vamos Conversar',
		description:
			'Interessado em colaborar em um projeto, discutir tecnologia ou apenas quer dizer oi? Estou sempre aberto a conectar com outros desenvolvedores e explorar novas oportunidades. Sinta-se à vontade para entrar em contato através de qualquer um dos meus canais sociais abaixo!'
	},

	// Blog
	blog: {
		title: 'Blog',
		readMore: 'Ler mais',
		back: 'Voltar'
	},

	// Common
	common: {
		github: 'GitHub',
		website: 'Website',
		present: 'Presente'
	},

	// Navbar
	navbar: {
		home: 'Início',
		blog: 'Blog',
		projects: 'Projetos',
		github: 'GitHub',
		linkedin: 'LinkedIn',
		x: 'X',
		sendemail: 'Enviar Email',
		language: 'Idioma',
		theme: 'Tema'
	}
};

export type Translation = typeof pt;
