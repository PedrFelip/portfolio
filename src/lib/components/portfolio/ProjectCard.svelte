<script lang="ts">
	import { marked, cn } from '$lib/utils';
	import Badge from '../ui/badge/badge.svelte';

	let _class = '';
	export { _class as class };
	export let title: string;
	export let href: string = '';
	export let description: string;
	export let dates: string;
	export let tags: readonly string[];
	export let link: string = '';
	export let image: string = '';
	export let video: string = '';
	export let links: { icon: any; type: string; href: string }[] = [];
</script>

<!-- Card -->
<div
	class={cn(
		'relative flex h-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground transition-all duration-300 ease-out hover:shadow-lg',
		_class
	)}
>
	{#if video || image}
		<a href={href || '#'} target="_blank" rel="noopener noreferrer" class="block cursor-pointer">
			{#if video}
				<video
					class="pointer-events-none mx-auto h-40 w-full object-cover object-top"
					src={video}
					autoplay
					loop
					muted
				></video>
			{:else if image}
				<img class="h-40 w-full overflow-hidden object-cover object-top" src={image} alt={title} />
			{/if}
		</a>
	{/if}
	<!-- Card Header -->
	<div class="flex flex-col px-4 pt-4">
		<div class="space-y-1">
			<!-- Card Title -->
			<div class="font-heading text-lg font-semibold tracking-tight">{title}</div>
			<time class="font-sans text-xs text-muted-foreground">{dates}</time>
			<div class="hidden font-sans text-xs underline print:visible">
				{link?.replace('https://', '').replace('www.', '').replace('/', '')}
			</div>
			<div
				class="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
			>
				{@html marked(description)}
			</div>
		</div>
	</div>
	<!-- Card Content -->
	<div class="mt-auto flex flex-col px-4 pb-4 pt-4">
		{#if tags && tags.length > 0}
			<div class="flex flex-wrap gap-1">
				{#each tags as tag}
					<Badge class="rounded-md px-2 py-0.5 text-[10px]" variant="secondary">
						{tag}
					</Badge>
				{/each}
			</div>
		{/if}
	</div>
	<!-- Card Footer -->
	{#if links && links.length > 0}
		<div class="flex items-center px-4 pb-4">
			<div class="flex flex-row flex-wrap items-start gap-2">
				{#each links as link}
					<a href={link?.href} target="_blank" rel="noopener noreferrer">
						<Badge class="flex items-center justify-center gap-1 px-2 py-1 text-[10px]">
							<svelte:component this={link.icon} class="size-3" />
							{link.type}
						</Badge>
					</a>
				{/each}
			</div>
		</div>
	{/if}
</div>
