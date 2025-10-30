import type { Translation } from './pt';

export const en: Translation = {
	// Hero Section
	hero: {
		greeting: "Hi, I'm Pedro Felipe 👋",
		subtitle: "Backend Developer & DevOps Enthusiast"
	},
	
	// Sections
	sections: {
		about: "About",
		education: "Education",
		skills: "Skills",
		projects: "Projects",
		contact: "Contact"
	},
	
	// About
	about: {
		description: "I'm a backend developer passionate about **system design**, **cloud infrastructure**, and **automation**. I build scalable APIs, implement Infrastructure as Code, and design reliable, maintainable systems that support growth. My main stack includes **Node.js**, **TypeScript**, **Go**, **PostgreSQL**, **Docker**, and **Linux**. I'm also a long-time Linux user — always experimenting with setups and optimizing environments to make development faster and cleaner. I believe in learning by building, continuously improving my craft through hands-on projects and real-world challenges."
	},
	
	// Projects
	projects: {
		badge: "My Projects",
		title: "Check out my latest work",
		description: "I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.",
		items: {
			"oportune": {
				title: "Oportune+",
				description: "Web platform connecting students, professors, and companies to centralize opportunities for early career professionals. Built with microservices architecture using Node.js, Fastify, React, and Go. Features include one-click applications, advanced search filters, email notifications, and multi-user profiles (Students, Companies, Professors). Implements full-stack solution with PostgreSQL, Prisma ORM, Docker containerization, and Python for specific validations."
			},
			"saude-pontual": {
				title: "Saúde Pontual",
				description: "Management system for medical clinics focused on scalable and secure backend. Responsible for implementing the entire backend architecture including JWT authentication, user management, appointments, and medical records. Used Express.js, PostgreSQL with optimized queries, Docker for containerization, and implemented robust data validation and permission controls."
			},
			"plan-it-calendar": {
				title: "Plan It - Calendar",
				description: "Academic project built using Scrum methodology. An intuitive calendar application for event management with create, edit, and delete functionality. Developed as part of practical learning of agile development practices."
			},
			"api-financeiro": {
				title: "Financial API",
				description: "Complete REST API for personal financial management built with TypeScript and Fastify. Implements JWT authentication, transactions with categorization, and reports. Uses Knex.js as query builder, SQLite as database, data validation with Zod, and offers complete Swagger documentation."
			},
			"notes-api": {
				title: "Notes API",
				description: "Simple REST API for note management built with Node.js, Fastify, and TypeScript. Features include CRUD operations, data validation with Zod, Prisma ORM for PostgreSQL, and Docker containerization. Implements clean architecture with separated layers (controller, service, repository)."
			}
		}
	},
	
	// Philosophy Section
	philosophy: {
		title: "Always Learning, Always Building",
		text1: "I believe the best way to grow as a developer is through hands-on experience. Every project is an opportunity to solve real problems, experiment with new technologies, and push the boundaries of what I know.",
		text2: "Whether it's optimizing infrastructure, designing scalable architectures, or automating complex workflows — I'm driven by the challenge of building systems that work reliably and efficiently."
	},
	
	// Contact
	contact: {
		badge: "Contact",
		title: "Let's Connect",
		description: "Interested in collaborating on a project, discussing tech, or just want to say hi? I'm always open to connecting with fellow developers and exploring new opportunities. Feel free to reach out through any of my social channels below!"
	},
	
	// Blog
	blog: {
		title: "Blog",
		readMore: "Read more"
	},
	
	// Common
	common: {
		github: "GitHub",
		website: "Website",
		present: "Present"
	}
};
