<script lang="ts">
	import BlurFade from '$lib/components/magic/BlurFade.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import { DATA } from '$lib/data/resume';
	import { enabledLinks } from '$lib/data/links';

	let BLUR_FADE_DELAY = 0.04;
</script>

<svelte:head>
	<title>{DATA.name} - Links</title>
	<meta name="description" content="Todos os meus links em um só lugar - {DATA.name}" />
	<meta property="og:title" content="{DATA.name} - Links" />
	<meta property="og:description" content="Todos os meus links em um só lugar" />
	<meta name="twitter:title" content="{DATA.name} - Links" />
	<meta name="twitter:description" content="Todos os meus links em um só lugar" />
</svelte:head>

<main class="flex min-h-[100dvh] flex-col items-center justify-center space-y-8 py-12">
	<!-- Header com Avatar e Info -->
	<section class="w-full max-w-md">
		<BlurFade delay={BLUR_FADE_DELAY} class="flex flex-col items-center space-y-4">
			<Avatar.Root class="size-24 border-2 border-primary">
				<Avatar.Image alt={DATA.name} src={DATA.avatarUrl} class="object-cover" />
				<Avatar.Fallback>{DATA.initials}</Avatar.Fallback>
			</Avatar.Root>

			<div class="space-y-2 text-center">
				<h1 class="text-3xl font-bold tracking-tight">{DATA.name}</h1>
				<p class="text-muted-foreground">{DATA.description}</p>
			</div>
		</BlurFade>
	</section>

	<!-- Links -->
	<section class="w-full max-w-md space-y-4 px-4">
		{#each enabledLinks as link, i}
			<BlurFade delay={BLUR_FADE_DELAY * (i + 2)}>
				<a
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					class="block transition-transform hover:scale-105"
				>
					<Card.Root class="transition-colors duration-300 {link.color}">
						<div class="p-6">
							<div class="flex items-center space-x-4">
								<div class="flex-shrink-0">
									<svelte:component this={link.icon} class="h-6 w-6" />
								</div>
								<div class="min-w-0 flex-1">
									<h3 class="text-lg font-semibold">{link.title}</h3>
									<p class="text-sm text-muted-foreground">{link.description}</p>
								</div>
								<div class="flex-shrink-0">
									<svg
										class="h-5 w-5 text-muted-foreground"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</div>
							</div>
						</div>
					</Card.Root>
				</a>
			</BlurFade>
		{/each}
	</section>

	<!-- Footer -->
	<BlurFade delay={BLUR_FADE_DELAY * (enabledLinks.length + 2)}>
		<footer class="text-center text-sm text-muted-foreground">
			<p>© {new Date().getFullYear()} {DATA.name}. Todos os direitos reservados.</p>
		</footer>
	</BlurFade>
</main>
