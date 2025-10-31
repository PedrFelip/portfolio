<script lang="ts">
	import { DATA } from '$lib/data/resume';
	import Dock from '../magic/Dock.svelte';
	import DockIcon from '../magic/DockIcon.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import ModeToggle from './ModeToggle.svelte';
	import LanguageToggle from './LanguageToggle.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { mode } from 'mode-watcher';
	import { t } from '$lib/i18n';
	$: theme = $mode;
</script>

<div
	class="pointer-events-none fixed inset-x-0 bottom-10 z-30 mx-auto mb-4 flex h-full max-h-14 origin-bottom"
>
	<div
		class="fixed inset-x-0 bottom-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"
	></div>
	<Dock
		class="pointer-events-auto relative z-50 mx-auto flex h-full min-h-full transform-gpu items-center gap-0 rounded-full bg-background px-1 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] sm:gap-0.5 md:gap-1 "
		let:magnification
		let:distance
		let:mouseX
	>
		{#each DATA.navbar as item}
			<DockIcon {magnification} {mouseX} {distance}>
				<Tooltip.Root openDelay={300}>
					<Tooltip.Trigger>
						<Button href={item.href} variant="ghost" size="icon" class="size-9 sm:size-12 rounded-full">
							<!-- <item.icon class="size-4" /> -->
							<svelte:component this={item.icon} class="size-4 sm:size-[18px]" strokeWidth={1.5} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>{$t.navbar[item.label.toLowerCase()]}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</DockIcon>
		{/each}
		<Separator orientation="vertical" class="h-full" />
		{#each Object.entries(DATA.contact.social)
			.filter(([_, social]) => social.navbar)
			.map(([_, social]) => social) as social}
			<DockIcon {magnification} {mouseX} {distance}>
				<Tooltip.Root openDelay={300}>
					<Tooltip.Trigger>
						<Button href={social.url} target="_blank" rel="noopener noreferrer" variant="ghost" size="icon" class="size-9 sm:size-12 rounded-full">
							<!-- <svelte:component this={social.icon} class="size-4" strokeWidth={1.5} /> -->
							{#if social?.dark_icon && theme === 'dark'}
								<img src={social?.dark_icon} class="size-3 sm:size-4 invert-0" alt={social.name} />
							{:else}
								<img src={social.icon} class="size-4 sm:size-[18px] dark:invert" alt={social.name} />
							{/if}
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>{$t.navbar[social.name.toLowerCase().replace(' ', '')]}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</DockIcon>
		{/each}
		<Separator orientation="vertical" class="h-full py-2" />
		<DockIcon {magnification} {mouseX} {distance}>
			<Tooltip.Root openDelay={300}>
				<Tooltip.Trigger asChild>
					<LanguageToggle />
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>{$t.navbar.language}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</DockIcon>
		<DockIcon {magnification} {mouseX} {distance}>
			<Tooltip.Root openDelay={300}>
				<Tooltip.Trigger asChild>
					<ModeToggle />
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>{$t.navbar.theme}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</DockIcon>
	</Dock>
</div>
