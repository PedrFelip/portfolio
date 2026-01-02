<script>
	import Navbar from '$lib/components/portfolio/Navbar.svelte';
	import DotBackground from '$lib/components/magic/DotBackground.svelte';
	import '../app.css';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (typeof window === 'undefined') return;

		try {
			const mod = await import('@vercel/speed-insights/sveltekit');
			if (mod && typeof mod.injectSpeedInsights === 'function') {
				mod.injectSpeedInsights();
			}
		} catch (err) {
			console.error('[injectSpeedInsights] dynamic import failed:', err);
		}
	});
</script>

<ModeWatcher defaultMode="dark" disableTransitions={false} />
<div class="relative min-h-screen bg-background">
	<DotBackground
		class="pointer-events-none fixed inset-0 -z-10 [mask-image:radial-gradient(100vmax_circle_at_center,white,transparent)]"
		fillColor={$mode === 'dark' ? 'rgb(255 255 255 / 0.06)' : 'rgb(0 0 0 / 0.04)'}
	/>
	<div
		class="relative z-10 mx-auto min-h-screen max-w-2xl px-4 py-12 font-sans antialiased sm:px-6 sm:py-24"
	>
		<slot></slot>
		<Navbar />
	</div>
</div>
