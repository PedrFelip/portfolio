<script lang="ts">
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
   
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
    
    function handleToggle() {
      toggleMode();
      console.log('Theme toggled');
    }
  </script>
   
  <Button on:click={handleToggle} variant='ghost' size="icon" class='rounded-full size-9 sm:size-12 pointer-events-auto cursor-pointer' type="button">
    <Sun
      class="h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground pointer-events-none"
    />
    <Moon
      class="absolute h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground pointer-events-none"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>