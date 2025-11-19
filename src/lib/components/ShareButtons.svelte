<script lang="ts">
	import { t } from '$lib/i18n';
	import { Share2, Twitter, Linkedin, Facebook, Mail, Link2, Check } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { onMount } from 'svelte';

	export let title: string;
	export let url: string = '';

	let showCopied = false;
	let canShare = false;

	onMount(() => {
		// Use current page URL if not provided
		if (!url && typeof window !== 'undefined') {
			url = window.location.href;
		}

		// Check if Web Share API is available
		if (typeof navigator !== 'undefined' && 'share' in navigator) {
			canShare = true;
		}
	});

	async function handleNativeShare() {
		if (canShare && navigator.share) {
			try {
				await navigator.share({
					title: title,
					url: url
				});
			} catch (err) {
				// User cancelled or error occurred
				console.log('Share cancelled or failed:', err);
			}
		}
	}

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(url);
			showCopied = true;
			setTimeout(() => {
				showCopied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	function shareOnTwitter() {
		const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
		window.open(twitterUrl, '_blank', 'width=550,height=420');
	}

	function shareOnLinkedIn() {
		const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
		window.open(linkedInUrl, '_blank', 'width=550,height=420');
	}

	function shareOnFacebook() {
		const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
		window.open(facebookUrl, '_blank', 'width=550,height=420');
	}

	function shareViaEmail() {
		const emailSubject = encodeURIComponent(title);
		const emailBody = encodeURIComponent(`${title}\n\n${url}`);
		window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
	}
</script>

<div class="mt-6 border-t pt-6">
	<div class="mb-3 text-sm font-medium text-muted-foreground">{$t.blog.share}</div>
	<div class="flex flex-wrap gap-2">
		{#if canShare}
			<Button variant="outline" size="sm" on:click={handleNativeShare} class="h-9 gap-2 text-xs">
				<Share2 class="h-4 w-4" />
				{$t.blog.shareVia}
			</Button>
		{/if}

		<Button variant="outline" size="sm" on:click={copyToClipboard} class="h-9 gap-2 text-xs">
			{#if showCopied}
				<Check class="h-4 w-4" />
				{$t.blog.linkCopied}
			{:else}
				<Link2 class="h-4 w-4" />
				{$t.blog.copyLink}
			{/if}
		</Button>

		<Button
			variant="outline"
			size="sm"
			on:click={shareOnTwitter}
			class="h-9 gap-2 text-xs"
			title={`${$t.blog.shareOn} Twitter/X`}
		>
			<Twitter class="h-4 w-4" />
			<span class="hidden sm:inline">Twitter/X</span>
		</Button>

		<Button
			variant="outline"
			size="sm"
			on:click={shareOnLinkedIn}
			class="h-9 gap-2 text-xs"
			title={`${$t.blog.shareOn} LinkedIn`}
		>
			<Linkedin class="h-4 w-4" />
			<span class="hidden sm:inline">LinkedIn</span>
		</Button>

		<Button
			variant="outline"
			size="sm"
			on:click={shareOnFacebook}
			class="h-9 gap-2 text-xs"
			title={`${$t.blog.shareOn} Facebook`}
		>
			<Facebook class="h-4 w-4" />
			<span class="hidden sm:inline">Facebook</span>
		</Button>

		<Button
			variant="outline"
			size="sm"
			on:click={shareViaEmail}
			class="h-9 gap-2 text-xs"
			title={`${$t.blog.shareVia} Email`}
		>
			<Mail class="h-4 w-4" />
			<span class="hidden sm:inline">Email</span>
		</Button>
	</div>
</div>
