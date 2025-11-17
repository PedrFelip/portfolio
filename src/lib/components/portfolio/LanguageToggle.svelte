<script lang="ts">
	import { locale, setLocale, type Locale } from '$lib/i18n';
	import { Languages } from 'lucide-svelte';

	function toggleLocale() {
		const newLocale: Locale = $locale === 'pt' ? 'en' : 'pt';
		setLocale(newLocale);
		console.log('Language toggled to:', newLocale);
	}
</script>

<button
	on:click={toggleLocale}
	class="pointer-events-auto inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:size-12"
	aria-label="Toggle language"
	type="button"
>
	<Languages class="pointer-events-none size-4 sm:size-[18px]" strokeWidth={1.5} />
	<span class="sr-only">Toggle language</span>
</button>
