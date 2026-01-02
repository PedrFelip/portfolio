<script lang="ts">
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
    class="flex w-full flex-col gap-3 rounded-lg bg-card p-4 text-card-foreground transition-shadow hover:shadow-lg md:flex-row md:items-start"
    role="group"
    aria-labelledby="company-{company}"
  >
    <!-- Logo / avatar -->
    <div class="flex flex-none items-start justify-center md:items-center">
      {#if logoUrl}
        <Avatar.Root class="size-14 md:size-16 lg:size-20">
          <!-- object-contain keeps logos intact; fallback shows initial -->
          <Avatar.Image src={logoUrl} alt={company} class="object-contain" />
          <Avatar.Fallback class="text-sm">{company ? company[0] : '?'}</Avatar.Fallback>
        </Avatar.Root>
      {:else}
        <div
          class="flex h-14 w-14 items-center justify-center rounded-md bg-muted text-muted-foreground md:h-16 md:w-16 lg:h-20 lg:w-20"
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
            id={"company-" + company}
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
              <ExternalLink
                class="ml-2 inline-block align-middle text-muted-foreground size-3"
                aria-hidden="true"
              />
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

      {#if description}
        <p class="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm md:mt-2">
          <!-- On small screens show a shorter preview; on larger show full -->
          <span class="block line-clamp-4">{description}</span>
        </p>
      {/if}

      <!-- Footer actions / metadata (optional) -->
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <!-- Placeholder for future metadata: location, tech badges, links -->
        <slot name="meta" />
      </div>
    </div>
  </article>
</a>

<style>
  /* Fallback CSS for line-clamp utility in case it's not present in Tailwind build */
  :global(.line-clamp-4) {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Ensure Avatar sizes respect the project's utilities but provide safe defaults */
  :global(.size-14) {
    width: 3.5rem;
    height: 3.5rem;
  }
  :global(.size-16) {
    width: 4rem;
    height: 4rem;
  }
  :global(.size-20) {
    width: 5rem;
    height: 5rem;
  }

  /* Improve responsive spacing on very small screens */
  @media (max-width: 420px) {
    :global(article) {
      padding: 0.75rem;
    }
  }
</style>
