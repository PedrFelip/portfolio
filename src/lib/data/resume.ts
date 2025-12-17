import {
	BriefcaseIcon,
	CodeIcon,
	Github,
	Globe,
	HomeIcon,
	NotebookIcon,
	Linkedin,
	Mail,
	ExternalLink,
	Youtube
} from 'lucide-svelte';
import XIcon from '$lib/components/icons/XIcon.svelte';

import UniceplacImg from '$lib/imgs/uniceplac.png';
import SaudePontualImg from '$lib/imgs/saudepontual.png';
import PlanItImg from '$lib/imgs/calendario.png';
import MhGestaoImg from '$lib/imgs/mhgestao.jfif';
import OportuneImg from '$lib/imgs/oportune.png';
import PedroFelipeImg from '$lib/imgs/pedrofelipe.png';

// Your resume data
export const DATA = {
	name: 'Pedro Felipe',
	initials: 'P',
	url: 'https://github.com/SikandarJODD',
	img: 'https://i.pinimg.com/736x/9e/dc/a6/9edca66eba199828bda2dbaf35642154.jpg',
	location: 'Brasilia, Brazil',
	locationLink: 'https://www.google.com/maps/place/brasilia',
	description: 'Backend Developer & DevOps Enthusiast.',
	summary:
		"I'm a backend developer passionate about **system design**, **cloud infrastructure**, and **automation**.\n\n I build scalable APIs, implement Infrastructure as Code, and design reliable, maintainable systems that support growth. My main stack includes **Node.js**, **TypeScript**, **Go**, **PostgreSQL**, **Docker**, and **Linux**. I'm also a long-time Linux user always experimenting with setups and optimizing environments to make development faster and cleaner.\n\n I believe in learning by building, continuously improving my craft through hands-on projects and real-world challenges.",
	avatarUrl: PedroFelipeImg,
	skills: [
		'Node.js',
		'TypeScript',
		'Go',
		'Fastify',
		'NestJS',
		'Prisma ORM',

		'PostgreSQL',

		'Docker',
		'Nginx',
		'Vagrant',
		'OCI',

		'Linux',
		'Shell Scripting'
	],

	navbar: [
		{ href: '/', icon: HomeIcon, label: 'Home' },
		{ href: '/blog', icon: NotebookIcon, label: 'Blog' },
		//{ href: '/#work', icon: BriefcaseIcon, label: 'Work' },
		{ href: '/#projects', icon: CodeIcon, label: 'Projects' }
	],
	contact: {
		email: 'hello@example.com',
		tel: '+123456789',
		whatsapp: '+556198750612',
		social: {
			GitHub: {
				name: 'GitHub',
				url: 'https://github.com/pedrfelip',
				icon: Github,
				navbar: true
			},
			LinkedIn: {
				name: 'LinkedIn',
				url: 'https://www.linkedin.com/in/pedrfelip/',
				icon: Linkedin,
				navbar: true
			},
			X: {
				name: 'X',
				url: 'https://x.com/pedrofelipeek',
				icon: XIcon,
				navbar: true
			},
			PeerList: {
				name: 'PeerList',
				url: 'https://peerlist.io/bhide',
				icon: ExternalLink,
				navbar: false
			},
			email: {
				name: 'Send Email',
				url: 'mailto:pfsvila190406@gmail.com',
				icon: Mail,
				navbar: true
			}
		}
	},
	work: [
		{
			company: 'MhGestão',
			href: 'https://mhgestao.com',
			badges: [],
			location: 'Brasília, BR',
			title: 'Estagiário Backend',
			logoUrl: MhGestaoImg,
			start: 'Nov 2025',
			end: 'Present',
			description:
				'Atuação em manutenção de APIs Node.js/Fastify, criação de integrações internas e ajustes contínuos de pipelines CI para serviços core da MhGestão.'
		}
	],
	education: [
		{
			school: 'UNICEPLAC',
			href: 'https://uniceplac.edu.br',
			degree: 'Engenharia de Software (Software Engineering)',
			logoUrl: UniceplacImg,
			start: '2024',
			end: '2028'
		}
	],
	projects: [
		{
			id: 'oportune',
			title: 'Oportune+',
			href: 'https://github.com/PedrFelip/oportune',
			dates: '2024 - Present',
			active: true,
			description:
				'Web platform connecting students, professors, and companies to centralize opportunities for early career professionals. Built with microservices architecture using Node.js, Fastify, React, and Go. Features include one-click applications, advanced search filters, email notifications, and multi-user profiles (Students, Companies, Professors). Implements full-stack solution with PostgreSQL, Prisma ORM, Docker containerization, and Python for specific validations.',
			technologies: [
				'React',
				'TypeScript',
				'Node.js',
				'Fastify',
				'PostgreSQL',
				'Prisma',
				'Docker',
				'Go',
				'Python',
				'Tailwind CSS'
			],
			links: [
				{
					type: 'GitHub',
					href: 'https://github.com/PedrFelip/oportune',
					icon: Github
				}
			],
			image: OportuneImg,
			video: ''
		},
		{
			id: 'saude-pontual',
			title: 'Saúde Pontual',
			href: 'https://github.com/gabbzin/saude_pontual',
			dates: 'Fev 2025 - Jul 2025',
			active: true,
			description:
				'Medical appointment scheduling system with robust backend architecture. Developed the API infrastructure handling appointment management, patient data, and business logic. Implemented JWT authentication, database migrations, and Docker containerization for seamless deployment across environments.',
			technologies: ['Node.js', 'Express', 'PostgreSQL', 'Docker', 'JWT', 'API REST', 'React'],
			links: [
				{
					type: 'GitHub',
					href: 'https://github.com/gabbzin/saude_pontual',
					icon: Github
				}
			],
			image: SaudePontualImg,
			video: ''
		},
		{
			id: 'plan-it-calendar',
			title: 'Plan It - Calendar',
			href: 'https://github.com/PedrFelip/Calendario-scrum',
			dates: '2024',
			active: true,
			description:
				'Academic project built using Scrum methodology. An intuitive calendar application for event management with create, edit, and delete functionality. Developed as part of practical learning of agile development practices.',
			technologies: ['JavaScript', 'Electron', 'SQLite', 'Node.js', 'Scrum'],
			links: [
				{
					type: 'GitHub',
					href: 'https://github.com/PedrFelip/Calendario-scrum',
					icon: Github
				}
			],
			image: PlanItImg,
			video: ''
		},
		{
			id: 'api-financeiro',
			title: 'API Financeiro',
			href: 'https://github.com/PedrFelip/api-financeiro',
			dates: '',
			active: true,
			description:
				'Financial transactions management API built with TypeScript and Fastify for high performance. Features modern REST architecture with SQLite database, Knex query builder for optimized queries, Zod validation for type-safe data handling, and cookie-based session management.',
			technologies: ['TypeScript', 'Fastify', 'SQLite', 'Knex', 'Zod', 'Node.js'],
			links: [
				{
					type: 'GitHub',
					href: 'https://github.com/PedrFelip/api-financeiro',
					icon: Github
				}
			],
			image: '',
			video: ''
		},
		{
			id: 'notes-api',
			title: 'Notes API',
			href: 'https://github.com/PedrFelip/notes-api',
			dates: '',
			active: true,
			description:
				'Simple REST API for note management built with Node.js, Fastify, and TypeScript. Features include CRUD operations, data validation with Zod, Prisma ORM for PostgreSQL, and Docker containerization. Implements clean architecture with separated layers (controller, service, repository).',
			technologies: ['Node.js', 'Fastify', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker', 'Zod'],
			links: [
				{
					type: 'GitHub',
					href: 'https://github.com/PedrFelip/notes-api',
					icon: Github
				}
			],
			image: '',
			video: ''
		}
	],
	hackathons: [
		{
			title: 'Hack Western 5',
			dates: 'November 23rd - 25th, 2018',
			location: 'London, Ontario',
			description:
				'Developed a mobile application which delivered bedtime stories to children using augmented reality.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg',
			links: []
		},
		{
			title: 'Hack The North',
			dates: 'September 14th - 16th, 2018',
			location: 'Waterloo, Ontario',
			description:
				'Developed a mobile application which delivers university campus wide events in real time to all students.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg',
			links: []
		},
		{
			title: 'FirstNet Public Safety Hackathon',
			dates: 'March 23rd - 24th, 2018',
			location: 'San Francisco, California',
			description:
				'Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.',
			// icon: "public",
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png',
			links: []
		},
		{
			title: 'DeveloperWeek Hackathon',
			dates: 'February 3rd - 4th, 2018',
			location: 'San Francisco, California',
			description:
				'Developed a web application which aggregates social media data regarding cryptocurrencies and predicts future prices.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/developer-week.jpg',
			links: [
				{
					title: 'Github',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/cryptotrends/cryptotrends'
				}
			]
		},
		{
			title: 'HackDavis',
			dates: 'January 20th - 21st, 2018',
			location: 'Davis, California',
			description:
				'Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png',
			win: 'Best Data Hack',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg',
			links: [
				{
					title: 'Devpost',
					icon: Globe,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://devpost.com/software/my6footprint'
				},
				{
					title: 'ML',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/Wallet6/my6footprint-machine-learning'
				},
				{
					title: 'iOS',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/Wallet6/CarbonWallet'
				},
				{
					title: 'Server',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/Wallet6/wallet6-server'
				}
			]
		},
		{
			title: 'ETH Waterloo',
			dates: 'October 13th - 15th, 2017',
			location: 'Waterloo, Ontario',
			description:
				'Developed a blockchain application for doctors and pharmacists to perform trustless transactions and prevent overdosage in patients.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/eth-waterloo.png',
			links: [
				{
					title: 'Organization',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/ethdocnet'
				}
			]
		},
		{
			title: 'Hack The North',
			dates: 'September 15th - 17th, 2017',
			location: 'Waterloo, Ontario',
			description:
				'Developed a virtual reality application allowing users to see themselves in third person.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg',
			links: [
				{
					title: 'Streamer Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/justinmichaud/htn2017'
				},
				{
					title: 'Client Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/RTSPClient'
				}
			]
		},
		{
			title: 'Hack The 6ix',
			dates: 'August 26th - 27th, 2017',
			location: 'Toronto, Ontario',
			description:
				'Developed an open platform for people shipping items to same place to combine shipping costs and save money.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-6ix.jpg',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg',
			links: [
				{
					title: 'Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/ShareShip/ShareShip'
				},
				{
					title: 'Site',
					icon: Globe,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://share-ship.herokuapp.com/'
				}
			]
		},
		{
			title: 'Stupid Hack Toronto',
			dates: 'July 23rd, 2017',
			location: 'Toronto, Ontario',
			description:
				'Developed a chrome extension which tracks which facebook profiles you have visited and immediately texts your girlfriend if you visited another girls page.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/stupid-hackathon.png',
			links: [
				{
					title: 'Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/nsagirlfriend/nsagirlfriend'
				}
			]
		},
		{
			title: 'Global AI Hackathon - Toronto',
			dates: 'June 23rd - 25th, 2017',
			location: 'Toronto, Ontario',
			description:
				'Developed a python library which can be imported to any python game and change difficulty of the game based on real time emotion of player. Uses OpenCV and webcam for facial recognition, and a custom Machine Learning Model trained on a [Kaggle Emotion Dataset](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/leaderboard) using [Tensorflow](https://www.tensorflow.org/Tensorflow) and [Keras](https://keras.io/). This project recieved 1st place prize at the Global AI Hackathon - Toronto and was also invited to demo at [NextAI Canada](https://www.nextcanada.com/next-ai).',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/global-ai-hackathon.jpg',
			win: '1st Place Winner',
			links: [
				{
					title: 'Article',
					icon: Globe,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://syncedreview.com/2017/06/26/global-ai-hackathon-in-toronto/'
				},
				{
					title: 'Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/TinySamosas/'
				}
			]
		},
		{
			title: 'McGill AI for Social Innovation Hackathon',
			dates: 'June 17th - 18th, 2017',
			location: 'Montreal, Quebec',
			description: 'Developed realtime facial microexpression analyzer using AI',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/ai-for-social-good.jpg',
			links: []
		},
		{
			title: 'Open Source Circular Economy Days Hackathon',
			dates: 'June 10th, 2017',
			location: 'Toronto, Ontario',
			description:
				"Developed a custom admin interface for food waste startup <a href='http://genecis.co/'>Genecis</a> to manage their data and provide analytics.",
			image:
				'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/open-source-circular-economy-days.jpg',
			win: '1st Place Winner',
			links: [
				{
					title: 'Source',
					icon: Github,
					// icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/genecis'
				}
			]
		},
		{
			title: "Make School's Student App Competition 2017",
			dates: 'May 19th - 21st, 2017',
			location: 'International',
			description: 'Improved PocketDoc and submitted to online competition',
			image:
				'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/make-school-hackathon.png',
			win: 'Top 10 Finalist | Honourable Mention',
			links: [
				{
					title: 'Medium Article',
					icon: Github,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://medium.com/make-school/the-winners-of-make-schools-student-app-competition-2017-a6b0e72f190a'
				},
				{
					title: 'Devpost',
					icon: Globe,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://devpost.com/software/pocketdoc-react-native'
				},
				{
					title: 'YouTube',
					icon: Youtube,
					// icon: <Icons.youtube className="h-4 w-4" />,
					href: 'https://www.youtube.com/watch?v=XwFdn5Rmx68'
				},
				{
					title: 'Source',
					icon: Github,
					href: 'https://github.com/dillionverma/pocketdoc-react-native'
				}
			]
		},
		{
			title: 'HackMining',
			dates: 'May 12th - 14th, 2017',
			location: 'Toronto, Ontario',
			description: 'Developed neural network to optimize a mining process',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-mining.png',
			links: []
		},
		{
			title: 'Waterloo Equithon',
			dates: 'May 5th - 7th, 2017',
			location: 'Waterloo, Ontario',
			description:
				'Developed Pocketdoc, an app in which you take a picture of a physical wound, and the app returns common solutions or cures to the injuries or diseases.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/waterloo-equithon.png',
			links: [
				{
					title: 'Devpost',
					icon: Globe,
					// icon: <Icons.globe className="h-4 w-4" />,
					href: 'https://devpost.com/software/pocketdoc-react-native'
				},
				{
					title: 'YouTube',
					icon: Youtube,
					// icon: <Icons.youtube className="h-4 w-4" />,
					href: 'https://www.youtube.com/watch?v=XwFdn5Rmx68'
				},
				{
					title: 'Source',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/pocketdoc-react-native'
				}
			]
		},
		{
			title: 'SpaceApps Waterloo',
			dates: 'April 28th - 30th, 2017',
			location: 'Waterloo, Ontario',
			description:
				'Developed Earthwatch, a web application which allows users in a plane to virtually see important points of interest about the world below them. They can even choose to fly away from their route and then fly back if they choose. Special thanks to CesiumJS for providing open source world and plane models.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/space-apps.png',
			links: [
				{
					title: 'Source',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/earthwatch'
				}
			]
		},
		{
			title: 'MHacks 9',
			dates: 'March 24th - 26th, 2017',
			location: 'Ann Arbor, Michigan',
			description:
				'Developed Super Graphic Air Traffic, a VR website made to introduce people to the world of air traffic controlling. This project was built completely using THREE.js as well as a node backend server.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/mhacks-9.png',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg',
			links: [
				{
					title: 'Source',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/threejs-planes'
				}
			]
		},
		{
			title: 'StartHacks I',
			dates: 'March 4th - 5th, 2017',
			location: 'Waterloo, Ontario',
			description:
				'Developed at StartHacks 2017, Recipic is a mobile app which allows you to take pictures of ingredients around your house, and it will recognize those ingredients using ClarifAI image recognition API and return possible recipes to make. Recipic recieved 1st place at the hackathon for best pitch and hack.',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/starthacks.png',
			win: '1st Place Winner',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg',
			links: [
				{
					title: 'Source (Mobile)',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/mattBlackDesign/recipic-ionic'
				},
				{
					title: 'Source (Server)',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/mattBlackDesign/recipic-rails'
				}
			]
		},
		{
			title: 'QHacks II',
			dates: 'February 3rd - 5th, 2017',
			location: 'Kingston, Ontario',
			description: 'Developed a mobile game which enables city-wide manhunt with random lobbies',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/qhacks.png',
			mlh: 'https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg',
			links: [
				{
					title: 'Source (Mobile)',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/dillionverma/human-huntr-react-native'
				},
				{
					title: 'Source (API)',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/mattBlackDesign/human-huntr-rails'
				}
			]
		},
		{
			title: 'Terrible Hacks V',
			dates: 'November 26th, 2016',
			location: 'Waterloo, Ontario',
			description:
				'Developed a mock of Windows 11 with interesting notifications and functionality',
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/terrible-hacks-v.png',
			links: [
				{
					title: 'Source',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/justinmichaud/TerribleHacks2016-Windows11'
				}
			]
		},
		{
			title: 'Portal Hackathon',
			dates: 'October 29, 2016',
			location: 'Kingston, Ontario',
			description:
				"Developed an internal widget for uploading assignments using Waterloo's portal app",
			image: 'https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/portal-hackathon.png',
			links: [
				{
					title: 'Source',
					icon: Github,
					//   // icon: <Icons.github className="h-4 w-4" />,
					href: 'https://github.com/UWPortalSDK/crowmark'
				}
			]
		}
	]
};
