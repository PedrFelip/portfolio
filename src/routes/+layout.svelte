<script>
	import Navbar from '$lib/components/portfolio/Navbar.svelte';
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { SpeedInsights } from '@vercel/speed-insights/sveltekit';
</script>

<ModeWatcher defaultMode="dark" />
<SpeedInsights />
<div class="relative mx-auto min-h-screen max-w-2xl bg-background px-4 sm:px-6 py-12 sm:py-24 font-sans antialiased">
	<slot></slot>
	<Navbar />
</div>
