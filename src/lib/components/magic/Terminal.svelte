<script lang="ts">
	import { onMount } from 'svelte';

	interface TerminalLine {
		id: string;
		text: string;
		type: 'input' | 'output' | 'title';
		delay: number;
	}

	let _class: string = '';
	export { _class as class };
	export let title: string = 'terminal';
	export let lines: TerminalLine[] = [
		{ id: '1', text: '$ whoami', type: 'input', delay: 0 },
		{ id: '2', text: 'Pedro Felipe', type: 'output', delay: 400 },
		{ id: '3', text: '$ cat skills.txt', type: 'input', delay: 800 },
		{ id: '4', text: 'Node.js, TypeScript, Go, PostgreSQL, Docker, Nginx...', type: 'output', delay: 1200 },
		{ id: '5', text: '$ echo "Let\'s build something amazing"', type: 'input', delay: 1600 },
		{ id: '6', text: 'Let\'s build something amazing', type: 'output', delay: 2000 }
	];

	let displayedLines: TerminalLine[] = [];

	onMount(() => {
		lines.forEach((line) => {
			const timeout = setTimeout(() => {
				displayedLines = [...displayedLines, line];
			}, line.delay);

			return () => clearTimeout(timeout);
		});
	});
</script>

<div class={`terminal-container ${_class}`}>
	<div class="terminal-header">
		<div class="terminal-buttons">
			<span class="terminal-btn red"></span>
			<span class="terminal-btn yellow"></span>
			<span class="terminal-btn green"></span>
		</div>
		<span class="terminal-title">{title}</span>
	</div>

	<div class="terminal-body">
		{#each displayedLines as line (line.id)}
			<div class="terminal-line" class:input={line.type === 'input'} class:output={line.type === 'output'}>
				{#if line.type === 'input'}
					<span class="prompt">$ </span>
				{:else if line.type === 'output'}
					<span class="output-prefix"></span>
				{/if}
				<span class="text">{line.text}</span>
			</div>
		{/each}
		<div class="cursor"></div>
	</div>
</div>

<style>
	.terminal-container {
		width: 100%;
		max-width: 800px;
		border-radius: 0.5rem;
		overflow: hidden;
		background: hsl(var(--background));
		border: 1px solid hsl(var(--border));
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
		font-family: 'Courier New', monospace;
	}

	.terminal-header {
		background: hsl(var(--muted));
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		border-bottom: 1px solid hsl(var(--border));
	}

	.terminal-buttons {
		display: flex;
		gap: 0.5rem;
	}

	.terminal-btn {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.terminal-btn.red {
		background-color: #ff5f56;
	}

	.terminal-btn.yellow {
		background-color: #ffbd2e;
	}

	.terminal-btn.green {
		background-color: #27c93f;
	}

	.terminal-btn:hover {
		opacity: 0.8;
	}

	.terminal-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: hsl(var(--foreground));
		margin-left: auto;
		text-transform: lowercase;
		font-family: 'Courier New', monospace;
	}

	.terminal-body {
		padding: 1.5rem;
		min-height: 300px;
		background: hsl(var(--background));
		color: hsl(var(--foreground));
		font-size: 0.875rem;
		line-height: 1.6;
		overflow-y: auto;
		max-height: 500px;
	}

	.terminal-line {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(-10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.terminal-line.input {
		color: hsl(var(--primary));
	}

	.terminal-line.output {
		color: hsl(var(--muted-foreground));
	}

	.prompt {
		color: hsl(var(--primary));
		font-weight: 600;
		user-select: none;
	}

	.output-prefix {
		display: inline-block;
		width: 2ch;
		user-select: none;
	}

	.text {
		word-break: break-word;
		white-space: pre-wrap;
	}

	.cursor {
		display: inline-block;
		width: 0.75rem;
		height: 1rem;
		background-color: hsl(var(--primary));
		animation: blink 1s infinite;
		margin-top: 0.5rem;
	}

	@keyframes blink {
		0%,
		49% {
			opacity: 1;
		}
		50%,
		100% {
			opacity: 0;
		}
	}

	/* Scrollbar styling */
	.terminal-body::-webkit-scrollbar {
		width: 6px;
	}

	.terminal-body::-webkit-scrollbar-track {
		background: hsl(var(--background));
	}

	.terminal-body::-webkit-scrollbar-thumb {
		background: hsl(var(--border));
		border-radius: 3px;
	}

	.terminal-body::-webkit-scrollbar-thumb:hover {
		background: hsl(var(--muted-foreground));
	}
</style>
