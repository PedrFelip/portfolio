<script lang="ts">
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { onMount } from 'svelte';

	import { toggleMode } from 'mode-watcher';

	let isTransitioning = false;
	let buttonElement: HTMLButtonElement;
	let supportsViewTransitions = false;

	onMount(() => {
		// Verifica se o navegador suporta View Transitions API
		supportsViewTransitions = typeof document !== 'undefined' && 'startViewTransition' in document;
	});

	async function handleToggle(event: MouseEvent) {
		if (isTransitioning) {
			return;
		}

		isTransitioning = true;

		if (supportsViewTransitions) {
			try {
				// Cria efeito ripple circular a partir do botão
				const x = event.clientX;
				const y = event.clientY;
				const endRadius = Math.hypot(
					Math.max(x, window.innerWidth - x),
					Math.max(y, window.innerHeight - y)
				);

				// View Transitions API
				const transition = (document as any).startViewTransition(async () => {
					toggleMode();
				});

				await transition.ready;

				// Anima o clip-path em formato circular
				document.documentElement.animate(
					{
						clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
					},
					{
						duration: 500,
						easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
						pseudoElement: '::view-transition-new(root)'
					}
				);

				await transition.finished;
			} catch (error) {
				console.error('[ModeToggle] Transition error:', error);
				// Fallback: apenas troca o tema sem animação
				toggleMode();
			} finally {
				isTransitioning = false;
			}
		} else {
			// Fallback para navegadores sem suporte
			document.documentElement.classList.add('theme-transitioning');
			toggleMode();

			setTimeout(() => {
				document.documentElement.classList.remove('theme-transitioning');
				isTransitioning = false;
			}, 500);
		}
	}
</script>

<button
	bind:this={buttonElement}
	on:click={handleToggle}
	class="pointer-events-auto inline-flex size-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-transform hover:scale-110 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-95 disabled:pointer-events-none disabled:opacity-50 sm:size-12"
	type="button"
	disabled={isTransitioning}
>
	<Sun
		class="pointer-events-none h-4 w-4 rotate-0 scale-100 text-foreground transition-all duration-500 ease-out dark:-rotate-90 dark:scale-0 sm:h-[1.2rem] sm:w-[1.2rem]"
	/>
	<Moon
		class="pointer-events-none absolute h-4 w-4 rotate-90 scale-0 text-foreground transition-all duration-500 ease-out dark:rotate-0 dark:scale-100 sm:h-[1.2rem] sm:w-[1.2rem]"
	/>
	<span class="sr-only">Toggle theme</span>
</button>
