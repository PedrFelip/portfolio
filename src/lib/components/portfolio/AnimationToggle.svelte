<script lang="ts">
	import { forceAnimations, prefersReducedMotion } from '$lib/stores/animations';
	import { Button } from '$lib/components/ui/button/index.js';
	import Play from 'lucide-svelte/icons/play';
	import Pause from 'lucide-svelte/icons/pause';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function handleToggle() {
		forceAnimations.toggle();
	}
</script>

{#if mounted && $prefersReducedMotion}
	<div class="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg border bg-background/95 p-2 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div class="flex flex-col gap-1 px-2">
			<p class="text-xs font-medium leading-none">Animações</p>
			<p class="text-xs text-muted-foreground">
				{$forceAnimations ? 'Forçadas' : 'Desativadas'}
			</p>
		</div>
		<Button
			on:click={handleToggle}
			variant="outline"
			size="icon"
			class="size-9 cursor-pointer transition-transform hover:scale-110 active:scale-95"
			type="button"
			title={$forceAnimations ? 'Desativar animações' : 'Forçar animações'}
		>
			{#if $forceAnimations}
				<Pause class="h-4 w-4" />
			{:else}
				<Play class="h-4 w-4" />
			{/if}
			<span class="sr-only">
				{$forceAnimations ? 'Desativar animações' : 'Forçar animações'}
			</span>
		</Button>
	</div>
{/if}
