<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import ShareButtons from '$lib/components/ShareButtons.svelte';
	import { formatDate } from '$lib/utils';
	import { t } from '$lib/i18n';
	import { ArrowLeft } from 'lucide-svelte';

	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<div class="-mt-10 px-4 sm:px-6 lg:px-8">
	<Button
		href="/blog"
		variant="ghost"
		class="h-auto p-0 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
	>
		<ArrowLeft class="mr-2 size-4" />
		{$t.blog.back}
	</Button>
</div>
<article class="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
	<!-- Title -->
	<hgroup class="mb-8 space-y-4">
		<h1 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
			{data.meta.title}
		</h1>
		<div class="flex items-center justify-between text-sm text-muted-foreground">
			<p>
				{formatDate(data.meta.date)}
			</p>
		</div>
	</hgroup>

	<!-- Tags -->
	<div class="tags mb-2 flex space-x-2">
		{#each data.meta.categories as category}
			<Badge variant="secondary" class="rounded-md">{category}</Badge>
		{/each}
	</div>
	<Separator class="mb-8" />

	<!-- Post -->
	<div
		class="prose-video prose-ol:my2 prose pb-24 dark:prose-invert prose-h1:my-1 prose-h2:my-1 prose-h3:my-1 prose-p:my-0 prose-a:my-3 prose-blockquote:my-3 prose-figcaption:my-3 prose-pre:my-3 prose-ul:my-3 prose-table:border-b last:prose-table:border-b prose-thead:border prose-thead:bg-zinc-100 prose-th:border prose-td:border-x prose-td:text-center prose-img:mx-auto prose-img:my-3 prose-img:text-center prose-hr:my-3 dark:prose-thead:bg-zinc-900 md:pb-8"
	>
		<svelte:component this={data.content} />
	</div>

	<!-- Share Buttons -->
	<div class="mt-6 flex flex-col gap-4">
		<ShareButtons title={data.meta.title} />
		<div class="text-xs text-muted-foreground">

		</div>
	</div>
</article>

<style>
	/* Horizontal scroll for wide code blocks or tables */
	:global(article pre) {
		overflow-x: auto;
		padding: 0.75rem 1rem;
	}
	:global(article table) {
		display: block;
		width: 100%;
		overflow-x: auto;
	}
	@media (max-width: 480px) {
		:global(article h1.title) {
			font-size: 1.5rem;
			line-height: 1.2;
		}
	}
</style>
