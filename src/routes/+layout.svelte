<script>
	import Navbar from '$lib/components/portfolio/Navbar.svelte';
	import DotBackground from '$lib/components/magic/DotBackground.svelte';
	import '../app.css';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
</script>

<ModeWatcher defaultMode="dark" />
<DotBackground
	class="[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]"
	fillColor={$mode === 'dark' ? 'rgb(255 255 255 / 0.06)' : 'rgb(0 0 0 / 0.04)'}
/>
<div
	class="relative z-10 mx-auto min-h-screen max-w-2xl bg-background px-4 py-12 font-sans antialiased sm:px-6 sm:py-24"
>
	<slot></slot>
	<Navbar />
</div>
