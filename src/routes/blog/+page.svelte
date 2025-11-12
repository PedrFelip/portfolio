<script lang="ts">
	import { formatDate } from '$lib/utils';
	import BlurFade from '$lib/components/magic/BlurFade.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { t } from '$lib/i18n';
	import { ArrowLeft } from 'lucide-svelte';

	export let data;
	let BLUR_FADE_DELAY = 0.04;
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<div class="-mt-10">
	<Button
		href="/"
		style="padding: 0 0px !important; background:transparent; border:none;"
		class="mb-2 h-6 border-none bg-transparent text-xs text-muted-foreground outline-none"
	>
		<ArrowLeft class="mb-px mr-1 h-3.5 w-3.5" strokeWidth={1.2} />
		{$t.blog.back}
	</Button>
</div>

<BlurFade delay={BLUR_FADE_DELAY}>
	<h1 class="mb-8 text-2xl font-medium tracking-tighter">Blog</h1>
</BlurFade>
<!-- Posts -->
<section>
	<ul class="posts">
		{#each data.posts as post, id}
			<li class="post">
				<BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05}>
					<a class="mb-4 flex flex-col space-y-1" href="/blog/{post.slug}">
						<div class="flex w-full flex-col">
							<p class="tracking-tight">{post.title}</p>
							<p class="h-6 text-xs text-muted-foreground">
								{formatDate(post.date)}
							</p>
						</div>
					</a>
				</BlurFade>
			</li>
		{/each}
	</ul>
</section>

<style>
	.posts {
		display: grid;
	}

	.post {
		max-inline-size: var(--size-content-3);
	}

	.post:not(:last-child) {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--size-7);
	}
</style>
