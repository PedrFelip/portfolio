<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { formatDate } from '$lib/utils';
	import { t } from '$lib/i18n';
	import { ArrowLeft, Share2, Link2, Check, Mail } from 'lucide-svelte';
	import XIcon from '$lib/components/icons/XIcon.svelte';
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils';

	export let data;

	let showCopied = false;
	let isShareExpanded = false;
	let url = '';

	onMount(() => {
		if (typeof window !== 'undefined') {
			url = window.location.href;
		}
	});

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(url);
			showCopied = true;
			setTimeout(() => {
				showCopied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	function shareOnTwitter() {
		const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.meta.title)}&url=${encodeURIComponent(url)}`;
		window.open(twitterUrl, '_blank', 'width=550,height=420');
	}

	function shareOnWhatsApp() {
		const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(data.meta.title + ' ' + url)}`;
		window.open(whatsappUrl, '_blank', 'width=550,height=420');
	}

	function shareViaEmail() {
		const emailSubject = encodeURIComponent(data.meta.title);
		const emailBody = encodeURIComponent(`${data.meta.title}\n\n${url}`);
		window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
	}

	function toggleShare() {
		isShareExpanded = !isShareExpanded;
	}

	function closeShare(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.share-dropdown')) {
			isShareExpanded = false;
		}
	}
</script>

<svelte:window on:click={closeShare} />

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="relative min-h-screen pb-16">
	<!-- Back Button -->
	<div class="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
		<Button
			href="/blog"
			variant="ghost"
			class="h-auto p-0 text-sm text-muted-foreground hover:bg-transparent hover:text-foreground"
		>
			<ArrowLeft class="mr-2 size-4" />
			{$t.blog.back}
		</Button>
	</div>

	<!-- Main Article Container -->
	<article class="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
		<!-- Header Section -->
		<header class="relative mb-12">
			<!-- Share Button - Fixed Top Right -->
			<div class="share-dropdown absolute right-0 top-0">
				<button
					on:click|stopPropagation={toggleShare}
					class={cn(
						'flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-sm transition-all duration-200',
						'hover:bg-accent hover:shadow-md',
						isShareExpanded && 'bg-accent shadow-md'
					)}
					aria-label="Share post"
					aria-expanded={isShareExpanded}
				>
					<Share2 class={cn('h-5 w-5 transition-transform', isShareExpanded && 'rotate-12')} />
				</button>

				<!-- Share Dropdown -->
				{#if isShareExpanded}
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="animate-in fade-in slide-in-from-top-2 absolute right-0 mt-2 w-56 rounded-lg border bg-popover p-2 shadow-lg duration-200"
						on:click|stopPropagation
						on:keydown={(e) => e.key === 'Escape' && (isShareExpanded = false)}
					>
						<div class="mb-2 px-2 py-1 text-xs font-medium text-muted-foreground">
							{$t.blog.share}
						</div>

						<!-- Share Options -->
						<div class="space-y-1">
							<!-- X / Twitter -->
							<button
								on:click={shareOnTwitter}
								class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
							>
								<XIcon class="h-4 w-4" />
								<span>Share on X</span>
							</button>

							<!-- WhatsApp -->
							<button
								on:click={shareOnWhatsApp}
								class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
							>
								<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
									/>
								</svg>
								<span>Share on WhatsApp</span>
							</button>

							<!-- Email -->
							<button
								on:click={shareViaEmail}
								class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
							>
								<Mail class="h-4 w-4" />
								<span>Share via Email</span>
							</button>

							<Separator class="my-1" />

							<!-- Copy Link -->
							<button
								on:click={copyToClipboard}
								class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
							>
								{#if showCopied}
									<Check class="h-4 w-4 text-green-500" />
									<span class="text-green-500">{$t.blog.linkCopied}</span>
								{:else}
									<Link2 class="h-4 w-4" />
									<span>{$t.blog.copyLink}</span>
								{/if}
							</button>
						</div>
					</div>
				{/if}
			</div>

			<!-- Title & Meta -->
			<div class="pr-14">
				<h1
					class="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
				>
					{data.meta.title}
				</h1>

				<!-- Date -->
				<time class="text-sm text-muted-foreground" datetime={data.meta.date}>
					{formatDate(data.meta.date)}
				</time>

				<!-- Categories -->
				{#if data.meta.categories && data.meta.categories.length > 0}
					<div class="mt-4 flex flex-wrap gap-2">
						{#each data.meta.categories as category}
							<Badge variant="secondary" class="rounded-full px-3 py-1 text-xs font-medium">
								{category}
							</Badge>
						{/each}
					</div>
				{/if}
			</div>
		</header>

		<Separator class="mb-8" />

		<!-- Content -->
		<div class="post-content mx-auto max-w-none">
			<svelte:component this={data.content} />
		</div>
	</article>
</div>

<style>
	/* Typography */
	:global(.post-content h1) {
		font-size: 1.875rem;
		font-weight: 700;
		line-height: 1.2;
		margin-top: 2rem;
		margin-bottom: 1.5rem;
		scroll-margin-top: 5rem;
		letter-spacing: -0.025em;
	}

	:global(.post-content h2) {
		font-size: 1.5rem;
		font-weight: 700;
		line-height: 1.3;
		margin-top: 2rem;
		margin-bottom: 1rem;
		scroll-margin-top: 5rem;
		letter-spacing: -0.025em;
	}

	:global(.post-content h3) {
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1.4;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		scroll-margin-top: 5rem;
		letter-spacing: -0.025em;
	}

	:global(.post-content p) {
		margin-top: 1rem;
		margin-bottom: 1rem;
		line-height: 1.75;
	}

	:global(.post-content a) {
		font-weight: 500;
		color: hsl(var(--primary));
		text-underline-offset: 4px;
		transition: color 0.2s;
	}

	:global(.post-content a:hover) {
		color: hsl(var(--primary) / 0.8);
		text-decoration: underline;
	}

	:global(.post-content strong) {
		font-weight: 600;
	}

	/* Lists */
	:global(.post-content ul),
	:global(.post-content ol) {
		margin-top: 1rem;
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	:global(.post-content ul) {
		list-style-type: disc;
	}

	:global(.post-content ol) {
		list-style-type: decimal;
	}

	:global(.post-content li) {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
		line-height: 1.75;
	}

	/* Blockquotes */
	:global(.post-content blockquote) {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		border-left: 4px solid hsl(var(--primary));
		background-color: hsl(var(--muted) / 0.5);
		padding: 0.5rem 1rem;
		font-style: normal;
	}

	/* Inline Code */
	:global(.post-content p code),
	:global(.post-content li code) {
		background-color: hsl(var(--muted));
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
		font-family: ui-monospace, monospace;
		font-size: 0.875rem;
	}

	/* Code Blocks - Preserve Shiki Styling */
	:global(.post-content pre) {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		overflow-x: auto;
		border-radius: 0.5rem;
		border: 1px solid hsl(var(--border));
	}

	:global(.post-content pre code) {
		display: block;
		padding: 1rem;
		font-family: ui-monospace, monospace;
		font-size: 0.875rem;
		line-height: 1.75;
		background: transparent !important;
	}

	/* Images */
	:global(.post-content img) {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}

	/* Horizontal Rule */
	:global(.post-content hr) {
		margin-top: 2rem;
		margin-bottom: 2rem;
	}

	/* Tables */
	:global(.post-content table) {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		width: 100%;
		border-collapse: collapse;
		display: block;
		overflow-x: auto;
	}

	:global(.post-content thead) {
		border: 1px solid hsl(var(--border));
		background-color: hsl(var(--muted));
	}

	:global(.post-content th) {
		border: 1px solid hsl(var(--border));
		padding: 0.5rem;
		text-align: left;
		font-weight: 600;
	}

	:global(.post-content td) {
		border: 1px solid hsl(var(--border));
		padding: 0.5rem;
	}

	/* Smooth scrolling for anchor links */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Mobile Adjustments */
	@media (max-width: 640px) {
		:global(.post-content h1) {
			font-size: 1.5rem;
		}

		:global(.post-content h2) {
			font-size: 1.25rem;
		}

		:global(.post-content h3) {
			font-size: 1.125rem;
		}
	}
</style>
