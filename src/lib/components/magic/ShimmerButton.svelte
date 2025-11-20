<script lang="ts">
	import { cn1 } from '$lib/utils';

	export let text: string = 'Shimmer Button';
	export let href: string | undefined = undefined;
	export let className: string | undefined = undefined;
	export let shimmerColor: string = 'rgba(255, 255, 255, 0.2)';
	export let shimmerSize: string = '0.05em';
	export let shimmerDuration: string = '3s';
	export let borderRadius: string = '100px';
	export let background: string = 'transparent';

	let buttonClass = cn1(
		'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-white',
		'transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]',
		'bg-background/80 backdrop-blur-md dark:bg-background/80',
		'shadow-[0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:shadow-[0_-20px_80px_-20px_#ffffff1f_inset]',
		className
	);
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	{href}
	class={buttonClass}
	style="--spread: 90deg; --shimmer-color: {shimmerColor}; --radius: {borderRadius}; --speed: {shimmerDuration}; --cut: {shimmerSize}; --bg: {background};"
	on:click
	{...$$restProps}
>
	<!-- spark container -->
	<div class={cn1('-z-30 blur-[2px]', 'absolute inset-0 overflow-visible [container-type:size]')}>
		<!-- spark -->
		<div
			class="animate-shimmer-slide absolute inset-0 h-[100cqh] [aspect-ratio:1] [border-radius:0] [mask:none]"
		>
			<!-- spark before -->
			<div
				class="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]"
			></div>
		</div>
	</div>
	<span
		class="pointer-events-none whitespace-pre-wrap text-center text-sm font-semibold leading-none tracking-tight text-foreground dark:from-white dark:to-slate-900/10 lg:text-lg"
	>
		{text}
	</span>

	<!-- backdrop -->
	<div
		class={cn1('absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]')}
	></div>
</svelte:element>

<style>
	@keyframes shimmer-slide {
		to {
			transform: translate(calc(100cqw - 100%), 0);
		}
	}

	@keyframes spin-around {
		0% {
			transform: translateZ(0) rotate(0);
		}
		15%,
		35% {
			transform: translateZ(0) rotate(90deg);
		}
		65%,
		85% {
			transform: translateZ(0) rotate(270deg);
		}
		100% {
			transform: translateZ(0) rotate(360deg);
		}
	}

	.animate-shimmer-slide {
		animation: shimmer-slide var(--speed) ease-in-out infinite alternate;
	}

	.animate-spin-around {
		animation: spin-around calc(var(--speed) * 2) infinite linear;
	}
</style>
