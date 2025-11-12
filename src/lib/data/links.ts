import { Github, Linkedin, Mail, Twitter, Briefcase } from 'lucide-svelte';
import type { ComponentType } from 'svelte';

export interface LinkItem {
	title: string;
	description: string;
	url: string;
	icon: ComponentType;
	color?: string;
	enabled?: boolean;
}

// Configure seus links aqui
export const socialLinks: LinkItem[] = [
	{
		title: 'Portfólio',
		description: '',
		url: '/',
		icon: Briefcase,
		color: 'hover:bg-primary hover:text-primary-foreground',
		enabled: true
	},
	{
		title: 'GitHub',
		description: '',
		url: 'https://github.com/pedrfelip',
		icon: Github,
		color: 'hover:bg-[#333] hover:text-white',
		enabled: true
	},
	{
		title: 'LinkedIn',
		description: '',
		url: 'https://www.linkedin.com/in/pedrfelip/',
		icon: Linkedin,
		color: 'hover:bg-[#0077b5] hover:text-white',
		enabled: true
	},
	{
		title: 'Twitter / X',
		description: '',
		url: 'https://x.com/pedrofelipeek',
		icon: Twitter,
		color: 'hover:bg-[#1DA1F2] hover:text-white',
		enabled: true
	},
	// {
	// 	title: 'PeerList',
	// 	description: 'Veja meu perfil profissional',
	// 	url: 'https://peerlist.io/bhide',
	// 	icon: Globe,
	// 	color: 'hover:bg-[#00AA45] hover:text-white',
	// 	enabled: true
	// },
	{
		title: 'Email',
		description: '',
		url: 'mailto:pfsvila190406@gmail.com',
		icon: Mail,
		color: 'hover:bg-red-500 hover:text-white',
		enabled: true
	}
	// Adicione mais links aqui conforme necessário
	// {
	// 	title: 'YouTube',
	// 	description: 'Assista meus vídeos',
	// 	url: 'https://youtube.com/@seu-canal',
	// 	icon: Youtube,
	// 	color: 'hover:bg-[#FF0000] hover:text-white',
	// 	enabled: false
	// },
	// {
	// 	title: 'Blog',
	// 	description: 'Leia meus artigos',
	// 	url: '/blog',
	// 	icon: FileText,
	// 	color: 'hover:bg-primary hover:text-primary-foreground',
	// 	enabled: false
	// }
];

// Filtra apenas os links habilitados
export const enabledLinks = socialLinks.filter((link) => link.enabled !== false);
