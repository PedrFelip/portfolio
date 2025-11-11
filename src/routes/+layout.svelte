<script>
	import Navbar from '$lib/components/portfolio/Navbar.svelte';
	import StarryBackground from '$lib/components/magic/StarryBackground.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
</script>

<ModeWatcher defaultMode="dark" />
<StarryBackground />
<div
	class="relative z-10 mx-auto min-h-screen max-w-2xl bg-background px-4 py-12 font-sans antialiased sm:px-6 sm:py-24"
>
	<slot></slot>
	<Navbar />
</div>
