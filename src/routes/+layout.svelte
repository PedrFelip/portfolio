<script>
	import Navbar from '$lib/components/portfolio/Navbar.svelte';
	import '../app.css';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import { SpeedInsights } from '@vercel/speed-insights/sveltekit';
	setMode('dark');
</script>

<ModeWatcher />
<SpeedInsights />
<div class="relative mx-auto min-h-screen max-w-2xl bg-background px-4 sm:px-6 py-12 sm:py-24 font-sans antialiased">
	<slot></slot>
	<Navbar />
</div>
