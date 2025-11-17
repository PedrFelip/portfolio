<script lang="ts">
	import { Motion, AnimatePresence } from 'svelte-motion';
	import { inview } from 'svelte-inview';
	import { cn } from '$lib/utils';
	export let duration = 0.4;
	export let delay = 0;
	export let yOffset = 8;
	export let inViewMargin = '100px';
	export let blur = '2px';
	export let id = crypto.randomUUID().slice(0, 6);
	export let once = true;
	export let debug = false; // Enable debug logging
	let defaultVariants = {
		hidden: { opacity: 0, y: yOffset, filter: `blur(${blur})` },
		visible: { opacity: 1, y: 0, filter: `blur(0px)` }
	};
	let isInView = 'hidden';
	let _class = '';
	export { _class as class };

	// Debug logging function
	function logDebug(message: string, data?: unknown) {
		if (debug && typeof console !== 'undefined') {
			console.log(`[BlurFade ${id}] ${message}`, data || '');
		}
	}

	// Log initialization
	if (debug) {
		logDebug('Initialized with config:', {
			duration,
			delay,
			yOffset,
			inViewMargin,
			blur,
			once
		});
	}
</script>

<AnimatePresence list={[{ key: id }]}>
	<Motion
		initial="hidden"
		animate={isInView}
		exit="hidden"
		variants={defaultVariants}
		transition={{
			delay: 0.04 + delay,
			duration,
			ease: 'easeOut'
		}}
		let:motion
	>
		<div
			use:inview={{ rootMargin: inViewMargin, unobserveOnEnter: once }}
			use:motion
			on:inview_change={({ detail }) => {
				const newState = detail.inView ? 'visible' : 'hidden';
				logDebug('View state changed:', { inView: detail.inView, state: newState });
				isInView = newState;
			}}
			class={cn(_class)}
		>
			<slot>Default</slot>
		</div>
	</Motion>
</AnimatePresence>
