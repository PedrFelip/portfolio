<script lang="ts">
	import { cn } from '$lib/utils';
	import { Motion, useMotionValue, useSpring, useTransform } from 'svelte-motion';
	import { onMount } from 'svelte';

	export let magnification = 60;
	export let distance = 160;
	export let mouseX = 0;
	let mint = useMotionValue(mouseX);
	$: mint.set(mouseX);

	let className: string | undefined = '';
	export { className as class };

	let iconElement: HTMLDivElement;
	let isMobile = false;

	onMount(() => {
		isMobile = window.innerWidth < 640;
		const handleResize = () => {
			isMobile = window.innerWidth < 640;
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	});

	let distanceCalc = useTransform(mint, (val: number) => {
		const bounds = iconElement?.getBoundingClientRect() ?? { x: 0, width: 0 };
		return val - bounds.x - bounds.width / 2;
	});

	let widthSync = useTransform(
		distanceCalc,
		[-distance, 0, distance],
		isMobile ? [36, 36, 36] : [38, magnification, 38]
	);

	let width = useSpring(widthSync, {
		mass: 0.1,
		stiffness: 150,
		damping: 12
	});

	let iconClass = cn(
		'flex aspect-square cursor-pointer items-center justify-center rounded-full',
		className
	);
</script>

<Motion style={{ width: isMobile ? 36 : width }} let:motion>
	<div use:motion bind:this={iconElement} class={iconClass}>
		<slot></slot>
	</div>
</Motion>
