<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as Avatar from '$lib/components/ui/avatar';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import { ExternalLink } from 'lucide-svelte';

  export let logoUrl: string = '';
  export let company: string = '';
  export let title: string = '';
  export let href: string = '';
  export let badges: string[] = [];
  export let description: string = '';
  export let start: string = '';
  export let end: string = '';

  // Controls whether the description is expanded on mobile
  let expanded = false;

  // Detect small screens to auto-collapse description
  let isMobile = false;
  let media: MediaQueryList | null = null;

  function updateIsMobile() {
    if (typeof window === 'undefined') return;
    isMobile = !!(media && media.matches);
    // reset expanded state when switching to desktop
    if (!isMobile) expanded = true;
  }

  onMount(() => {
    if (typeof window === 'undefined') {
      // SSR: show full content by default
      expanded = true;
      return;
    }

    media = window.matchMedia('(max-width: 640px)'); // tailwind sm breakpoint ~640px
    media.addEventListener ? media.addEventListener('change', updateIsMobile) : media.addListener(updateIsMobile);
    updateIsMobile();

    // On first mount, collapse on mobile, expanded on desktop
    expanded = !isMobile;
  });

  onDestroy(() => {
    if (!media) return;
    media.removeEventListener ? media.removeEventListener('change', updateIsMobile) : media.removeListener(updateIsMobile);
  });

  const isExternal = (u: string) => !!u && /^(https?:)?\/\//.test(u);
</script>

<a
  href={href || '#'}
  class="block no-underline"
  target={isExternal(href) ? '_blank' : undefined}
  rel={isExternal(href) ? 'noopener noreferrer' : undefined}
  aria-label={company + (title ? ` — ${title}` : '')}
>
  <article
    class="group flex w-full flex-col gap-3 rounded-lg bg-card p-4 text-card-foreground transition-shadow hover:shadow-lg sm:flex-row sm:items-start"
    role="article"
    aria-labelledby={"company-" + (company || Math.random())}
  >
    <!-- Logo / avatar -->
    <div class="flex flex-none items-start justify-center sm:items-center">
      {#if logoUrl}
        <Avatar.Root class="size-14 sm:size-16 md:size-18">
          <Avatar.Image src={logoUrl} alt={company} class="object-contain" />
          <Avatar.Fallback class="text-sm">{company ? company[0] : '?'}</Avatar.Fallback>
        </Avatar.Root>
      {:else}
        <div
          class="flex h-14 w-14 items-center justify-center rounded-md bg-muted text-muted-foreground sm:h-16 sm:w-16 md:h-20 md:w-20"
          aria-hidden="true"
        >
          <span class="text-sm font-semibold">{company ? company[0] : '?'}</span>
        </div>
      {/if}
    </div>

    <!-- Content -->
    <div class="flex min-w-0 flex-1 flex-col">
      <header class="flex w-full items-start justify-between gap-3">
        <div class="min-w-0">
          <h3
            id={"company-" + (company || Math.random())}
            class="mb-1 truncate text-sm font-semibold leading-tight sm:text-base"
            title={company}
          >
            {company}
            {#if badges?.length > 0}
              <span class="ml-2 inline-flex gap-1">
                {#each badges as b, i}
                  <Badge variant="secondary" class="align-middle text-xs" key={i}>
                    {b}
                  </Badge>
                {/each}
              </span>
            {/if}
            {#if href}
              <ExternalLink class="ml-2 inline-block align-middle text-muted-foreground size-3" aria-hidden="true" />
            {/if}
          </h3>

          {#if title}
            <p class="truncate text-xs text-muted-foreground sm:text-sm">{title}</p>
          {/if}
        </div>

        <time
          class="mt-0.5 whitespace-nowrap text-right text-xs tabular-nums text-muted-foreground sm:text-sm"
          aria-label="period"
        >
          {start} — {end || 'Present'}
        </time>
      </header>

      <!-- Description area:
           - On mobile (isMobile === true) it will collapse to 3 lines with a "Ver mais" button.
           - On larger screens it's expanded by default.
      -->
      {#if description}
        <div class="mt-2">
          <p
            class={
              "description-text text-xs leading-relaxed text-muted-foreground sm:text-sm " +
              (isMobile && !expanded ? "mobile-collapsed" : "mobile-expanded")
            }
            aria-expanded={isMobile ? expanded : true}
          >
            {@html description}
          </p>

          <!-- "Ver mais" toggle, shown only on small screens when the text is collapsible -->
          {#if isMobile}
            <div class="mt-2 flex items-center gap-2">
              <button
                class="inline-flex items-center rounded px-2 py-1 text-xs font-medium text-primary hover:underline"
                type="button"
                on:click={() => (expanded = !expanded)}
                aria-controls="description"
                aria-expanded={expanded}
              >
                {#if expanded}
                  Ver menos
                {:else}
                  Ver mais
                {/if}
              </button>
            </div>
          {/if}
        </div>
      {/if}

      <!-- Footer slot for optional metadata -->
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <slot name="meta" />
      </div>
    </div>
  </article>
</a>

<style>
  /* Fallback for the line-clamp behavior on mobile */
  :global(.mobile-collapsed) {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  :global(.mobile-expanded) {
    /* show full content */
  }

  /* Small helpers for avatar sizes if utilities are missing */
  :global(.size-14) {
    width: 3.5rem;
    height: 3.5rem;
  }
  :global(.size-16) {
    width: 4rem;
    height: 4rem;
  }
  :global(.size-18) {
    width: 4.5rem;
    height: 4.5rem;
  }

  /* Improve tappable area for mobile buttons */
  button {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  /* Ensure description images / embeds are responsive inside the card */
  :global(.description-text img) {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Slight visual tweak: smoother shadow on hover for desktop */
  @media (hover: hover) and (pointer: fine) {
    :global(.group:hover) {
      transition: box-shadow 0.18s ease;
    }
  }

  /* Reduce padding on very small screens */
  @media (max-width: 420px) {
    :global(article) {
      padding: 0.75rem;
    }
    :global(.size-14) {
      width: 3rem;
      height: 3rem;
    }
  }
</style>
