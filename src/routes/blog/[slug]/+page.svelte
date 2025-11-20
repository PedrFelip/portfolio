<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
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

<div class="mb-8 mt-8">
	<Button
		href="/blog"
		variant="ghost"
		class="h-auto p-0 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
	>
		<ArrowLeft class="mr-2 size-4" />
		{$t.blog.back}
	</Button>
</div>
<article>
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
	<div class="mb-8 flex flex-wrap gap-2">
		{#each data.meta.categories as category}
			<Badge variant="secondary" class="rounded-md">{category}</Badge>
		{/each}
	</div>
	<Separator class="mb-8" />

	<!-- Post -->
	<div
		class="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-m-20 prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-7 prose-blockquote:border-l-2 prose-blockquote:pl-6 prose-blockquote:italic prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6"
	>
		<svelte:component this={data.content} />
	</div>
</article>
