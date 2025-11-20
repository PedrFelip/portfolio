<script lang="ts">
	// Props compatíveis com lucide-svelte
	export let size: number | string = 24;
	export let color: string = 'currentColor';

	// Classes CSS
	let className: string = '';
	export { className as class };

	// Converter size para string se necessário
	$: sizeValue = typeof size === 'number' ? `${size}px` : size;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={sizeValue}
	height={sizeValue}
	viewBox="0 0 24 24"
	fill={color}
	stroke="none"
	class={className}
	{...$$restProps}
>
	<path
		d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
	/>
</svg>
