<script lang="ts">
	import { cn } from '$lib/utils';

	export let width: number = 40;
	export let height: number = 40;
	export let x: number | string = -1;
	export let y: number | string = -1;
	export let strokeDashArray: string = '';
	export let squares: Array<[number, number]> = [[0, 0]];
	export let fillColor: string = 'rgb(156 163 175 / 0.3)';
	export let strokeWidth: number = 1;

	let className: any = '';
	export { className as class };

	// unique id for the pattern
	let id = crypto.randomUUID?.().toString().slice(0, 8) ?? Math.random().toString(36).slice(2, 10);
</script>

<svg
	aria-hidden="true"
	class={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
	{...$$restProps}
	stroke={fillColor}
	stroke-width={strokeWidth}
>
	<defs>
		<pattern {id} {width} {height} patternUnits="userSpaceOnUse" {x} {y}>
			<path d={`M.5 ${height} V.5 H${width}`} fill="none" stroke-dasharray={strokeDashArray} />
		</pattern>
	</defs>

	<rect width="100%" height="100%" stroke-width="0" fill={`url(#${id})`} />

	{#if squares && squares.length}
		<svg {x} {y} class="overflow-visible" aria-hidden="true">
			{#each squares as sq}
				<rect
					stroke={fillColor}
					fill="none"
					stroke-width="0"
					width={width - 1}
					height={height - 1}
					x={sq[0] * width + 1}
					y={sq[1] * height + 1}
				/>
			{/each}
		</svg>
	{/if}
</svg>
