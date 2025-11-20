<script lang="ts">
	import { cn } from '$lib/utils';

	export let text: string = '';
	export let href: string | undefined = undefined;
	export let shimmerColor: string = '#ffffff';
	export let shimmerSize: string = '0.05em';
	export let shimmerDuration: string = '3s';
	export let borderRadius: string = '100px';
	export let background: string = 'rgba(0, 0, 0, 1)';
	let className: string = '';
	export { className as class };
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	style:--spread="90deg"
	style:--shimmer-color={shimmerColor}
	style:--radius={borderRadius}
	style:--speed={shimmerDuration}
	style:--cut={shimmerSize}
	style:--bg={background}
	class={cn(
		'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-white',
		'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]',
		className
	)}
	on:click
	{...$$restProps}
>
	<div class={cn('-z-30 blur-[2px]', 'absolute inset-0 overflow-visible [container-type:size]')}>
		<div
			class="animate-magicslide absolute inset-0 h-[100cqh] [aspect-ratio:1] [border-radius:0] [mask:none]"
		>
			<!-- spark before -->
			<div
				class="animate-spin-around absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"
			/>
		</div>
	</div>

	{#if text}
		<span class="relative z-10">{text}</span>
	{:else}
		<span class="relative z-10">
			<slot>Shimmer Button</slot>
		</span>
	{/if}

	<!-- Highlight -->
	<div
		class={cn(
			'insert-0 absolute h-full w-full',
			'rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f]',
			'transform-gpu transition-all duration-300 ease-in-out',
			'group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]',
			'group-active:shadow-[inset_0_-10px_10px_#ffffff3f]'
		)}
	/>

	<!-- backdrop -->
	<div
		class={cn(
			'absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]'
		)}
	/>
</svelte:element>
