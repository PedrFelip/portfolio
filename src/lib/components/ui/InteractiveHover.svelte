<script lang="ts">
	import { cn } from '$lib/utils';
	import { ArrowRight } from 'lucide-svelte';
	import { onMount } from 'svelte';

	let _class: string = '';
	export { _class as class };
	export let text: string = 'Button';

	let buttonElement: HTMLButtonElement;
	let bgCircle: HTMLElement;
	let textOriginal: HTMLElement;
	let textHover: HTMLElement;

	onMount(() => {
		if (!buttonElement) return;

		const handleMouseEnter = () => {
			if (!bgCircle || !textOriginal || !textHover) return;

			// Animate background circle - elegant expansion from text
			bgCircle.animate(
				[
					{
						width: '1.2rem',
						height: '1.2rem',
						left: '15%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						opacity: '1'
					},
					{
						width: '350%',
						height: '350%',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						opacity: '1'
					}
				],
				{
					duration: 450,
					easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
					fill: 'forwards'
				}
			);

			// Animate original text out
			textOriginal.animate(
				[
					{
						transform: 'translateX(0)',
						opacity: '1'
					},
					{
						transform: 'translateX(3.5rem)',
						opacity: '0'
					}
				],
				{
					duration: 450,
					easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
					fill: 'forwards'
				}
			);

			// Animate hover text in
			textHover.animate(
				[
					{
						transform: 'translateX(-3.5rem)',
						opacity: '0'
					},
					{
						transform: 'translateX(0)',
						opacity: '1'
					}
				],
				{
					duration: 450,
					easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
					fill: 'forwards'
				}
			);
		};

		const handleMouseLeave = () => {
			if (!bgCircle || !textOriginal || !textHover) return;

			// Animate background circle back
			bgCircle.animate(
				[
					{
						width: '350%',
						height: '350%',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						opacity: '1'
					},
					{
						width: '1.2rem',
						height: '1.2rem',
						left: '25%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
						opacity: '1'
					}
				],
				{
					duration: 450,
					easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
					fill: 'forwards'
				}
			);

			// Animate original text back
			textOriginal.animate(
				[
					{
						transform: 'translateX(3.5rem)',
						opacity: '0'
					},
					{
						transform: 'translateX(0)',
						opacity: '1'
					}
				],
				{
					duration: 450,
					easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
					fill: 'forwards'
				}
			);

			// Animate hover text out
			textHover.animate(
				[
					{
						transform: 'translateX(0)',
						opacity: '1'
					},
					{
						transform: 'translateX(-3.5rem)',
						opacity: '0'
					}
				],
				{
					duration: 450,
					easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
					fill: 'forwards'
				}
			);
		};

		buttonElement.addEventListener('mouseenter', handleMouseEnter);
		buttonElement.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			buttonElement.removeEventListener('mouseenter', handleMouseEnter);
			buttonElement.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
</script>

<button
	bind:this={buttonElement}
	class={cn(
		'group relative inline-flex w-32 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border bg-background px-4 py-2 text-center text-sm font-semibold text-foreground',
		_class
	)}
	{...$$restProps}
>
	<!-- Background circle starts from text side -->
	<span
		bind:this={bgCircle}
		class="absolute z-0 rounded-full bg-primary transition-none"
		style="width: 1.2rem; height: 1.2rem; left: 25%; top: 50%; transform: translate(-50%, -50%);"
	></span>

	<!-- Original text -->
	<span bind:this={textOriginal} class="relative z-10 inline-block transition-none">
		{text}
	</span>

	<!-- Hover text with arrow -->
	<span
		bind:this={textHover}
		class="absolute bottom-0 left-0 right-0 top-0 z-20 inline-flex items-center justify-center gap-1.5 text-primary-foreground transition-none"
	>
		<span>{text}</span>
		<ArrowRight class="h-4 w-4" />
	</span>
</button>
