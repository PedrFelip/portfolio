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
		style="padding: 0 0px !important; background:transparent; border:none;"
		class=" mb-2 h-6 border-none bg-transparent text-xs text-muted-foreground outline-none"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-arrow-left mb-px mr-1"
			><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg
		>
		{$t.blog.back}</Button
	>
</div>
<article class="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
	<!-- Title -->
	<hgroup class="mb-1">
		<h1 class="title max-w-[650px] text-2xl font-medium capitalize tracking-tighter">
			{data.meta.title}
		</h1>
		<div class="mb-3 mt-2 flex max-w-[650px] items-center justify-between text-sm">
			<p class="text-sm text-neutral-600 dark:text-neutral-400">
				{formatDate(data.meta.date)}
			</p>
		</div>
	</hgroup>

	<!-- Tags -->
	<div class="tags mb-4 flex flex-wrap gap-2">
		{#each data.meta.categories as category}
			<Badge variant="outline" class="rounded-[4px]">{category}</Badge>
		{/each}
	</div>
	<Separator class="mb-4" />

	<!-- Post -->
	<div
		class="prose prose-sm sm:prose-base lg:prose-lg prose-pre:my-3 prose-pre:rounded-md prose-pre:bg-muted/40 prose-code:break-words prose-video prose-ol:my2 pb-8 dark:prose-invert prose-h1:my-1 prose-h2:my-1 prose-h3:my-1 prose-p:my-0 prose-a:my-3 prose-blockquote:my-3 prose-figcaption:my-3 prose-ul:my-3 prose-table:border-b last:prose-table:border-b prose-thead:border prose-thead:bg-zinc-100 prose-th:border prose-td:border-x prose-td:text-center prose-img:mx-auto prose-img:my-3 prose-img:text-center prose-hr:my-3 dark:prose-thead:bg-zinc-900"
	>
		<svelte:component this={data.content} />
	</div>

	<!-- Share Buttons -->
	<div class="mt-6 flex flex-col gap-4">
		<ShareButtons title={data.meta.title} />
		<div class="text-xs text-muted-foreground">
			<p class="leading-relaxed">Compartilhe este post se foi útil. Feedbacks são bem-vindos.</p>
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
