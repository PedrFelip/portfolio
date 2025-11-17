<script lang="ts">
	import { onMount } from 'svelte';
	import BlurFade from '$lib/components/magic/BlurFade.svelte';
	import ModeToggle from '$lib/components/portfolio/ModeToggle.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { runAnimationDiagnostics, checkAnimationSupport } from '$lib/utils';
	
	let diagnosticsRun = false;
	let animationSupport: ReturnType<typeof checkAnimationSupport> | null = null;

	onMount(() => {
		// Run diagnostics on mount
		runAnimationDiagnostics();
		animationSupport = checkAnimationSupport();
		diagnosticsRun = true;
	});

	function handleRunDiagnostics() {
		runAnimationDiagnostics();
	}
</script>

<svelte:head>
	<title>Animation Test - Debug Page</title>
</svelte:head>

<main class="container mx-auto px-4 py-8 max-w-4xl">
	<h1 class="text-4xl font-bold mb-8">Animation Debug & Test Page</h1>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Browser Support Status</h2>
		<div class="bg-card p-6 rounded-lg border space-y-2">
			{#if animationSupport}
				<div class="grid grid-cols-2 gap-4">
					<div>
						<strong>View Transitions API:</strong>
						<Badge variant={animationSupport.viewTransitions ? 'default' : 'destructive'}>
							{animationSupport.viewTransitions ? '✅ Supported' : '❌ Not Supported'}
						</Badge>
					</div>
					<div>
						<strong>CSS Animations:</strong>
						<Badge variant={animationSupport.cssAnimations ? 'default' : 'destructive'}>
							{animationSupport.cssAnimations ? '✅ Supported' : '❌ Not Supported'}
						</Badge>
					</div>
					<div>
						<strong>CSS Transitions:</strong>
						<Badge variant={animationSupport.cssTransitions ? 'default' : 'destructive'}>
							{animationSupport.cssTransitions ? '✅ Supported' : '❌ Not Supported'}
						</Badge>
					</div>
					<div>
						<strong>Web Animations API:</strong>
						<Badge variant={animationSupport.webAnimationsAPI ? 'default' : 'destructive'}>
							{animationSupport.webAnimationsAPI ? '✅ Supported' : '❌ Not Supported'}
						</Badge>
					</div>
					<div class="col-span-2">
						<strong>Prefers Reduced Motion:</strong>
						<Badge variant={animationSupport.prefersReducedMotion ? 'secondary' : 'default'}>
							{animationSupport.prefersReducedMotion ? '⚠️ Yes (animations may be limited)' : '✅ No'}
						</Badge>
					</div>
				</div>
				<div class="mt-4 text-sm text-muted-foreground">
					<strong>Browser:</strong> {animationSupport.browserInfo}
				</div>
			{:else}
				<p class="text-muted-foreground">Loading browser support information...</p>
			{/if}
		</div>
		<button
			on:click={handleRunDiagnostics}
			class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
		>
			Run Full Diagnostics (Check Console)
		</button>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">ModeToggle Test</h2>
		<div class="bg-card p-6 rounded-lg border">
			<p class="mb-4 text-muted-foreground">
				Click the button below to test the theme toggle animation. Check the console for debug logs.
			</p>
			<div class="flex items-center gap-4">
				<ModeToggle debug={true} />
				<span class="text-sm text-muted-foreground">
					Theme toggle with debug enabled
				</span>
			</div>
			<div class="mt-4 p-4 bg-muted rounded-md text-sm">
				<p><strong>Expected behavior:</strong></p>
				<ul class="list-disc list-inside space-y-1 mt-2">
					<li>If View Transitions API is supported: circular ripple animation from click point</li>
					<li>If not supported: fade animation fallback</li>
					<li>If prefers-reduced-motion: instant theme change</li>
					<li>Debug logs should appear in browser console</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">BlurFade Test</h2>
		<div class="bg-card p-6 rounded-lg border space-y-6">
			<p class="text-muted-foreground">
				Scroll down to see BlurFade animations trigger. Debug mode is enabled.
			</p>
			
			<div class="space-y-8">
				<BlurFade debug={true} delay={0}>
					<div class="p-4 bg-primary/10 rounded-md">
						<h3 class="text-lg font-semibold">BlurFade Item 1 (no delay)</h3>
						<p class="text-sm text-muted-foreground mt-1">
							This should fade in with a blur effect when it comes into view.
						</p>
					</div>
				</BlurFade>

				<BlurFade debug={true} delay={0.15}>
					<div class="p-4 bg-primary/10 rounded-md">
						<h3 class="text-lg font-semibold">BlurFade Item 2 (0.15s delay)</h3>
						<p class="text-sm text-muted-foreground mt-1">
							This has a slight delay before animating.
						</p>
					</div>
				</BlurFade>

				<BlurFade debug={true} delay={0.3} yOffset={16}>
					<div class="p-4 bg-primary/10 rounded-md">
						<h3 class="text-lg font-semibold">BlurFade Item 3 (0.3s delay, larger yOffset)</h3>
						<p class="text-sm text-muted-foreground mt-1">
							This has more delay and comes from further down.
						</p>
					</div>
				</BlurFade>

				<BlurFade debug={true} delay={0.45} blur="4px">
					<div class="p-4 bg-primary/10 rounded-md">
						<h3 class="text-lg font-semibold">BlurFade Item 4 (0.45s delay, more blur)</h3>
						<p class="text-sm text-muted-foreground mt-1">
							This starts with more blur than the default.
						</p>
					</div>
				</BlurFade>
			</div>

			<div class="mt-6 p-4 bg-muted rounded-md text-sm">
				<p><strong>Expected behavior:</strong></p>
				<ul class="list-disc list-inside space-y-1 mt-2">
					<li>Elements should fade in with blur when scrolled into view</li>
					<li>Each element should animate with its specified delay</li>
					<li>Debug logs should show initialization and view state changes in console</li>
					<li>Animation respects prefers-reduced-motion setting</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Troubleshooting Guide</h2>
		<div class="bg-card p-6 rounded-lg border space-y-4">
			<div>
				<h3 class="font-semibold mb-2">🔍 Check Browser Console</h3>
				<p class="text-sm text-muted-foreground">
					Open your browser's developer tools (F12) and check the Console tab. You should see:
				</p>
				<ul class="list-disc list-inside text-sm text-muted-foreground ml-4 mt-1">
					<li>Animation Diagnostics group with browser support status</li>
					<li>BlurFade initialization messages</li>
					<li>ModeToggle transition logs when clicking the theme button</li>
				</ul>
			</div>

			<div>
				<h3 class="font-semibold mb-2">❌ If View Transitions API is not supported:</h3>
				<p class="text-sm text-muted-foreground">
					The browser will use a fallback fade animation. This is expected behavior for older browsers.
					Consider updating to a modern browser (Chrome 111+, Edge 111+, Safari 18+).
				</p>
			</div>

			<div>
				<h3 class="font-semibold mb-2">🐌 If animations are not working:</h3>
				<ul class="list-disc list-inside text-sm text-muted-foreground ml-4">
					<li>Check if "Prefers Reduced Motion" is enabled in your OS settings</li>
					<li>Verify svelte-motion is installed: check package.json</li>
					<li>Clear browser cache and reload</li>
					<li>Check for CSS conflicts in browser DevTools</li>
				</ul>
			</div>

			<div>
				<h3 class="font-semibold mb-2">🔧 Additional Steps:</h3>
				<ul class="list-disc list-inside text-sm text-muted-foreground ml-4">
					<li>Run <code class="bg-muted px-1 rounded">npm install</code> to ensure all dependencies are installed</li>
					<li>Check that svelte-motion version in package.json is 0.12.2 or newer</li>
					<li>Verify no conflicting CSS is overriding animation styles</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="mb-12">
		<h2 class="text-2xl font-semibold mb-4">Quick Links</h2>
		<div class="flex gap-4">
			<a href="/" class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
				← Back to Home
			</a>
			<a href="/blog" class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
				Go to Blog
			</a>
		</div>
	</section>
</main>

<style>
	/* Add some spacing to demonstrate scrolling animations */
	section {
		min-height: 200px;
	}
</style>
