<script lang="ts">
	import { cn } from '$lib/utils';

	export let width: number = 16;
	export let height: number = 16;
	export let x: number | string = 0;
	export let y: number | string = 0;
	export let cx: number = 1;
	export let cy: number = 1;
	export let cr: number = 1;
	export let fillColor: string = 'color-mix(in srgb, var(--muted-foreground), transparent 0%)';

	let className: string = '';
	export { className as class };

	// unique id for the pattern
	let id = crypto.randomUUID?.().toString().slice(0, 8) ?? Math.random().toString(36).slice(2, 10);
</script>

<svg
	aria-hidden="true"
	class={cn(
		'pointer-events-none absolute inset-0 h-full w-full',
		className
	)}
	{...$$restProps}
>
	<defs>
		<pattern
			{id}
			{width}
			{height}
			patternUnits="userSpaceOnUse"
			patternContentUnits="userSpaceOnUse"
			{x}
			{y}
		>
			<circle {cx} {cy} r={cr} fill={fillColor} />
		</pattern>
	</defs>
	<rect width="100%" height="100%" stroke-width="0" fill={`url(#${id})`} />
</svg>
