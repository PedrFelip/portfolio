<script lang="ts">
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";

    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";

    let isTransitioning = false;
    let buttonElement: HTMLButtonElement;

    // Verifica se o navegador suporta View Transitions API
    const supportsViewTransitions = typeof document !== 'undefined' &&
      'startViewTransition' in document;

    // Verifica se o usuário prefere animações reduzidas (acessibilidade)
    const prefersReducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    async function handleToggle(event: MouseEvent) {
      if (isTransitioning) return;

      isTransitioning = true;

      // Se o usuário prefere animações reduzidas, apenas troca o tema
      if (prefersReducedMotion) {
        toggleMode();
        isTransitioning = false;
        return;
      }

      if (supportsViewTransitions) {
        // Cria efeito ripple circular a partir do botão
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        // @ts-ignore - View Transitions API
        const transition = document.startViewTransition(async () => {
          toggleMode();
        });

        try {
          await transition.ready;

          // Anima o clip-path em formato circular
          document.documentElement.animate(
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

          await transition.finished;
        } catch (error) {
          console.log('Transition interrupted:', error);
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
