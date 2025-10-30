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
	class="inline-flex size-9 sm:size-12 items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring pointer-events-auto cursor-pointer"
	aria-label="Toggle language"
	type="button"
>
	<Languages class="size-4 sm:size-[18px] pointer-events-none" strokeWidth={1.5} />
	<span class="sr-only">Toggle language</span>
</button>
