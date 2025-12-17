<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { ExternalLink } from 'lucide-svelte';
	export let logoUrl: string = '';
	export let company: string = '';
	export let title: string = '';
	export let href: string = '';
	export let badges: string[] = [''];
	export let description: string = '';
	export let start: string = '';
	export let end: string = '';
</script>

<a
	href={href || '#'}
	target={href && href.startsWith('http') ? '_blank' : undefined}
	rel={href && href.startsWith('http') ? 'noopener noreferrer' : undefined}
>
	<div class="flex rounded-lg bg-card text-card-foreground">
		<div class="flex-none">
			<Avatar.Root class="bg-muted-background m-auto size-12 border dark:bg-foreground">
				<Avatar.Image src={logoUrl} alt={company} class="object-contain" />
				<Avatar.Fallback>{company[0]}</Avatar.Fallback>
			</Avatar.Root>
		</div>
		<div class="ml-4 flex-grow flex-col items-center">
			<div class="flex flex-col">
				<div class="flex items-center justify-between gap-x-2 text-base">
					<h3
						class="inline-flex items-center justify-center text-xs font-semibold leading-none sm:text-sm"
					>
						{company}
						{#if badges?.length > 0 && badges[0] !== ''}
							<span class="inline-flex gap-x-1">
								{#each badges as badge, index}
									<Badge variant="secondary" class="align-middle text-xs" key={index}>
										{badge}
									</Badge>
								{/each}
							</span>
						{/if}
						{#if href}
							<ExternalLink class="ml-1 size-3 text-muted-foreground sm:size-4" />
						{/if}
					</h3>
					<div class="text-right text-xs tabular-nums text-muted-foreground sm:text-sm">
						{start} - {end || 'Present'}
					</div>
				</div>
				{#if title}
					<div class="font-sans text-xs">{title}</div>
				{/if}
			</div>
			{#if description}
				<div class="mt-2 text-xs sm:text-sm">
					{description}
				</div>
			{/if}
		</div>
	</div>
</a>
