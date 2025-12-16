<script lang="ts">
	import BlurFade from '$lib/components/magic/BlurFade.svelte';
	import Terminal from '$lib/components/magic/Terminal.svelte';
	import InteractiveHoverButton from '$lib/components/magic/InteractiveHoverButton.svelte';
	import ShimmerButton from '$lib/components/magic/ShimmerButton.svelte';
	import DotPattern from '$lib/components/magic/DotPattern.svelte';
	import ProjectCard from '$lib/components/portfolio/ProjectCard.svelte';
	import ResumeCard from '$lib/components/portfolio/ResumeCard.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { DATA } from '$lib/data/resume';
	import { t } from '$lib/i18n';
	import type { Translation } from '$lib/i18n/pt';
	import { marked } from '$lib/utils';
	let BLUR_FADE_DELAY = 0.15;

	const terminalLines = [
		{ id: '1', text: 'whoami', type: 'input' as const, delay: 0 },
		{ id: '2', text: 'pedrofelipe', type: 'output' as const, delay: 400 },
		{ id: '3', text: 'echo $ROLE', type: 'input' as const, delay: 800 },
		{ id: '4', text: 'Backend & DevOps Engineer', type: 'output' as const, delay: 1200 }
	];

	const handleProjectsClick = () => {
		document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleContactsClick = () => {
		window.location.href = '/links';
	};

	const getProjectItem = (t: Translation, id: string) => {
		const items = t.projects.items as Record<
			string,
			{ title: string; description: string } | undefined
		>;
		return items[id];
	};
</script>

<svelte:head>
	<title>{DATA.name} - Backend Developer & DevOps Enthusiast</title>
	<meta
		name="description"
		content="Backend developer passionate about system design, cloud infrastructure, and automation. Building scalable APIs with Node.js, TypeScript, Go, PostgreSQL, and Docker."
	/>

	<!-- Open Graph / Facebook / LinkedIn -->
	<meta property="og:title" content="{DATA.name} - Backend Developer & DevOps Enthusiast" />
	<meta
		property="og:description"
		content="Backend developer passionate about system design, cloud infrastructure, and automation. Building scalable APIs with Node.js, TypeScript, Go, PostgreSQL, and Docker."
	/>
	<meta property="og:url" content="https://github.com/pedrfelip" />
	<meta property="og:site_name" content="{DATA.name} Portfolio" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:type" content="website" />

	<!-- Twitter -->
	<meta name="twitter:title" content="{DATA.name} - Backend Developer & DevOps" />
	<meta name="twitter:card" content="summary" />
	<meta
		name="twitter:description"
		content="Backend developer passionate about system design, cloud infrastructure, and automation."
	/>
	<meta name="twitter:creator" content="@pedrofelipeek" />

	<!-- SEO -->
	<meta name="robots" content="index, follow" />
	<meta
		name="googlebot"
		content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
	/>
	<meta name="author" content={DATA.name} />
	<meta
		name="keywords"
		content="backend developer, devops, node.js, typescript, go, postgresql, docker, linux, api development, cloud infrastructure, pedro felipe"
	/>
</svelte:head>
<main class="relative flex min-h-[100dvh] flex-col space-y-12 overflow-hidden px-4 sm:px-6 lg:px-8">
	<!-- Dot Pattern Background -->
	<DotPattern
		class="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_80%)]"
		width={20}
		height={20}
		cx={1}
		cy={1}
		cr={1.5}
	/>

	<section id="hero" class="pt-6 sm:pt-10">
		<div class="mx-auto w-full max-w-3xl space-y-8">
			<div
				class="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
			>
				<div class="flex flex-1 flex-col space-y-1.5">
					<BlurFade
						delay={BLUR_FADE_DELAY}
						class="font-heading text-balance text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none"
						yOffset={8}>{$t.hero.greeting}</BlurFade
					>
					<BlurFade
						class="max-w-[640px] text-pretty text-sm sm:text-base md:text-lg lg:text-xl"
						delay={BLUR_FADE_DELAY}>{$t.hero.subtitle}</BlurFade
					>
					<BlurFade delay={BLUR_FADE_DELAY * 2} class="mt-6 flex flex-wrap gap-3">
						<InteractiveHoverButton text="Projetos" on:click={handleProjectsClick} />
						<InteractiveHoverButton text="Blog" on:click={() => (window.location.href = '/blog')} />
					</BlurFade>
				</div>
				<BlurFade delay={BLUR_FADE_DELAY} class="shrink-0">
					<Avatar.Root class="size-24 border sm:size-28 md:size-32">
						<Avatar.Image alt={DATA.name} src={DATA.avatarUrl} class="object-cover" />
						<Avatar.Fallback>{DATA.initials}</Avatar.Fallback>
					</Avatar.Root>
				</BlurFade>
			</div>
		</div>
	</section>
	<section id="about" class="mx-auto w-full max-w-3xl">
		<BlurFade delay={BLUR_FADE_DELAY}>
			<h2 class="font-heading text-xl font-bold">{$t.sections.about}</h2>
		</BlurFade>
		<BlurFade delay={BLUR_FADE_DELAY * 1.5}>
			<div
				class="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
			>
				{@html marked($t.about.description)}
			</div>
		</BlurFade>
	</section>
	<section id="work" class="mx-auto w-full max-w-3xl">
		<div class="flex min-h-0 flex-col gap-y-3">
			<BlurFade delay={BLUR_FADE_DELAY}>
				<h2 class="font-heading text-xl font-bold">{$t.sections.work}</h2>
			</BlurFade>
			{#each DATA.work as work, id}
				<BlurFade delay={BLUR_FADE_DELAY * 1.2 + id * 0.08}>
					<ResumeCard {...work} />
				</BlurFade>
			{/each}
		</div>
	</section>
	<section id="education" class="mx-auto w-full max-w-3xl">
		<div class="flex min-h-0 flex-col gap-y-3">
			<BlurFade delay={BLUR_FADE_DELAY}>
				<h2 class="font-heading text-xl font-bold">{$t.sections.education}</h2>
			</BlurFade>
			{#each DATA.education as edu, id}
				<BlurFade delay={BLUR_FADE_DELAY * 1.2 + id * 0.08}>
					<ResumeCard
						href={edu.href}
						logoUrl={edu.logoUrl}
						company={edu.school}
						title={edu.school}
						subtitle={edu.degree}
						start={edu.start}
						end={edu.end}
					/>
				</BlurFade>
			{/each}
		</div>
	</section>
	<section id="skills" class="mx-auto w-full max-w-3xl">
		<div class="flex min-h-0 flex-col gap-y-3">
			<BlurFade delay={BLUR_FADE_DELAY}>
				<h2 class="font-heading text-xl font-bold">{$t.sections.skills}</h2>
			</BlurFade>
			<div class="flex flex-wrap gap-1">
				{#each DATA.skills as skill, id}
					<BlurFade delay={BLUR_FADE_DELAY * id + 0.008}>
						<Badge>{skill}</Badge>
					</BlurFade>
				{/each}
			</div>
		</div>
	</section>
	<section id="projects" class="px-0">
		<div class="w-full space-y-12 py-12">
			<BlurFade delay={BLUR_FADE_DELAY}>
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-2">
						<div class="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
							{$t.projects.badge}
						</div>
						<h2 class="font-heading text-3xl font-bold tracking-tighter sm:text-5xl">
							{$t.projects.title}
						</h2>
						<p
							class="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
						>
							{$t.projects.description}
						</p>
					</div>
				</div>
			</BlurFade>
			<div class="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2">
				{#each DATA.projects as project, id}
					<BlurFade delay={BLUR_FADE_DELAY * 1.5 + id * 0.08}>
						{@const item = project.id ? getProjectItem($t, project.id) : null}
						<ProjectCard
							href={project.href}
							title={item ? item.title : project.title}
							description={item ? item.description : project.description}
							dates={project.dates}
							tags={project.technologies}
							image={project.image}
							video={project.video}
							links={project.links}
						/>
					</BlurFade>
				{/each}
			</div>
		</div>
	</section>
	<!-- <section id="hackathons">
		<div class="w-full space-y-12 py-12">
			<BlurFade delay={BLUR_FADE_DELAY}>
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-2">
						<div class="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
							Hackathons
						</div>
						<h2 class="font-heading text-3xl font-bold tracking-tighter sm:text-5xl">I like building things</h2>
						<p
							class="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
						>
							During my time in university, I attended{' '}
							{DATA.hackathons.length}+ hackathons. People from around the country would come
							together and build incredible things in 2-3 days. It was eye-opening to see the
							endless possibilities brought to life by a group of motivated and passionate
							individuals.
						</p>
					</div>
				</div>
			</BlurFade>
			<BlurFade delay={BLUR_FADE_DELAY * 2}>
				<ul class="mb-4 ml-4 divide-y divide-dashed border-l">
					{#each DATA.hackathons as project}
						<BlurFade delay={BLUR_FADE_DELAY}>
							<HackathonCard {...project} />
						</BlurFade>
					{/each}
				</ul>
			</BlurFade>
		</div>
	</section> -->
	<section id="philosophy" class="px-0">
		<div class="mx-auto w-full max-w-3xl space-y-8 py-12">
			<BlurFade delay={BLUR_FADE_DELAY}>
				<div class="flex flex-col items-center justify-center space-y-4 text-center">
					<div class="space-y-4">
						<h2 class="font-heading text-3xl font-bold tracking-tighter sm:text-5xl">
							{$t.philosophy.title}
						</h2>
						<p
							class="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
						>
							{$t.philosophy.text1}
						</p>
						<p
							class="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
						>
							{$t.philosophy.text2}
						</p>
					</div>
				</div>
			</BlurFade>
		</div>
	</section>
	<section id="contact" class="px-0">
		<div
			class="grid w-full items-center justify-center gap-6 px-2 py-12 text-center sm:px-4 md:px-6"
		>
			<BlurFade delay={BLUR_FADE_DELAY * 2.2}>
				<div class="space-y-3">
					<div class="inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-background">
						{$t.contact.badge}
					</div>
					<h2 class="font-heading text-3xl font-bold tracking-tight sm:text-5xl">{$t.contact.title}</h2>
					<p
						class="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
					>
						{$t.contact.description}
					</p>
					<div class="flex justify-center pt-4">
						<ShimmerButton
							text="Enviar Mensagem"
							href={`https://wa.me/${DATA.contact.whatsapp.replace(/\D/g, '')}`}
							className="shadow-2xl"
						/>
					</div>
				</div>
			</BlurFade>
		</div>
	</section>
</main>
