<script lang="ts">
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    import { onMount } from 'svelte';

    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";

    let isTransitioning = false;
    let buttonElement: HTMLButtonElement;
    let supportsViewTransitions = false;
    let prefersReducedMotion = false;
    export let debug = false; // Enable debug logging

    // Debug logging function
    function logDebug(message: string, data?: any) {
      if (debug && typeof console !== 'undefined') {
        console.log(`[ModeToggle] ${message}`, data || '');
      }
    }

    onMount(() => {
      // Verifica se o navegador suporta View Transitions API
      supportsViewTransitions = typeof document !== 'undefined' &&
        'startViewTransition' in document;

      // Verifica se o usuário prefere animações reduzidas (acessibilidade)
      prefersReducedMotion = typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      logDebug('Browser support check:', {
        supportsViewTransitions,
        prefersReducedMotion,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'
      });
    });

    async function handleToggle(event: MouseEvent) {
      if (isTransitioning) {
        logDebug('Toggle blocked: already transitioning');
        return;
      }

      isTransitioning = true;
      logDebug('Toggle started', { prefersReducedMotion, supportsViewTransitions });

      // Se o usuário prefere animações reduzidas, apenas troca o tema
      if (prefersReducedMotion) {
        logDebug('Using reduced motion mode');
        toggleMode();
        isTransitioning = false;
        return;
      }

      if (supportsViewTransitions) {
        try {
          // Cria efeito ripple circular a partir do botão
          const x = event.clientX;
          const y = event.clientY;
          const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          );

          logDebug('Starting View Transition animation', { x, y, endRadius });

          // @ts-ignore - View Transitions API
          const transition = document.startViewTransition(async () => {
            toggleMode();
          });

          await transition.ready;
          logDebug('View Transition ready');

          // Anima o clip-path em formato circular
          const animation = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
              ]
            },
            {
              duration: 500,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              pseudoElement: '::view-transition-new(root)'
            }
          );

          logDebug('Clip-path animation started', { duration: 500 });

          await transition.finished;
          logDebug('View Transition completed');
        } catch (error) {
          console.error('[ModeToggle] Transition error:', error);
          // Fallback: apenas troca o tema sem animação
          toggleMode();
        } finally {
          isTransitioning = false;
        }
      } else {
        // Fallback para navegadores sem suporte
        logDebug('Using fallback animation (no View Transitions API support)');
        document.documentElement.classList.add('theme-transitioning');
        toggleMode();

        setTimeout(() => {
          document.documentElement.classList.remove('theme-transitioning');
          isTransitioning = false;
          logDebug('Fallback animation completed');
        }, 500);
      }
    }
  </script>

  <Button
    bind:this={buttonElement}
    on:click={handleToggle}
    variant='ghost'
    size="icon"
    class='rounded-full size-9 sm:size-12 pointer-events-auto cursor-pointer transition-transform hover:scale-110 active:scale-95 disabled:opacity-50'
    type="button"
    disabled={isTransitioning}
  >
    <Sun
      class="h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem] rotate-0 scale-100 transition-all duration-500 ease-out dark:-rotate-90 dark:scale-0 text-foreground pointer-events-none"
    />
    <Moon
      class="absolute h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem] rotate-90 scale-0 transition-all duration-500 ease-out dark:rotate-0 dark:scale-100 text-foreground pointer-events-none"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
