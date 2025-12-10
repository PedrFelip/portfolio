<script lang="ts">
	import { DATA } from '$lib/data/resume';
	import Dock from '../magic/Dock.svelte';
	import DockIcon from '../magic/DockIcon.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import ModeToggle from './ModeToggle.svelte';
	import LanguageToggle from './LanguageToggle.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { t } from '$lib/i18n';

	function getNavbarLabel(key: string): string {
		const navbarLabels: Record<string, string> = {
			home: $t.navbar.home,
			blog: $t.navbar.blog,
			work: $t.navbar.work,
			projects: $t.navbar.projects
		};
		return navbarLabels[key.toLowerCase()] || key;
	}

	function getSocialLabel(socialName: string): string {
		const socialLabels: Record<string, string> = {
			github: $t.navbar.github,
			linkedin: $t.navbar.linkedin,
			x: $t.navbar.x,
			sendemail: $t.navbar.sendemail
		};
		return socialLabels[socialName.toLowerCase().replace(' ', '')] || socialName;
	}
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
						<Button
							href={item.href}
							variant="ghost"
							size="icon"
							class="size-9 rounded-full sm:size-12"
						>
							<svelte:component this={item.icon} class="size-4 sm:size-[18px]" strokeWidth={1.5} />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>{getNavbarLabel(item.label)}</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</DockIcon>
		{/each}
		<Separator orientation="vertical" class="h-full" />
		{#each Object.entries(DATA.contact.social)
			.filter(([, social]) => social.navbar)
			.map(([, social]) => social) as social}
			<DockIcon {magnification} {mouseX} {distance}>
				<Tooltip.Root openDelay={300}>
					<Tooltip.Trigger>
						<Button
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							variant="ghost"
							size="icon"
							class="size-9 rounded-full sm:size-12"
						>
							<svelte:component
								this={social.icon}
								class="size-4 sm:size-[18px]"
								strokeWidth={1.5}
							/>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>{getSocialLabel(social.name)}</p>
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
