<script lang="ts">
	import { onMount } from 'svelte';
	import { mode } from 'mode-watcher';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let stars: Star[] = [];
	let shootingStars: ShootingStar[] = [];
	let animationFrameId: number;
	let isMobile = false;

	interface Star {
		x: number;
		y: number;
		size: number;
		opacity: number;
		twinkleSpeed: number;
		twinklePhase: number;
	}

	interface ShootingStar {
		x: number;
		y: number;
		length: number;
		speed: number;
		opacity: number;
		angle: number;
		tail: { x: number; y: number; opacity: number }[];
	}

	function createStars(count: number) {
		stars = [];
		for (let i = 0; i < count; i++) {
			stars.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				size: Math.random() * 1.5 + 0.5,
				opacity: Math.random() * 0.5 + 0.3,
				twinkleSpeed: Math.random() * 0.02 + 0.01,
				twinklePhase: Math.random() * Math.PI * 2
			});
		}
	}

	function createShootingStar() {
		const startX = Math.random() * canvas.width;
		const startY = Math.random() * canvas.height * 0.5;

		shootingStars.push({
			x: startX,
			y: startY,
			length: Math.random() * 80 + 60,
			speed: Math.random() * 3 + 2,
			opacity: 1,
			angle: Math.PI / 4 + Math.random() * 0.3,
			tail: []
		});
	}

	function updateStars() {
		stars.forEach((star) => {
			star.twinklePhase += star.twinkleSpeed;
			star.opacity = 0.3 + Math.sin(star.twinklePhase) * 0.4;
		});
	}

	function updateShootingStars() {
		shootingStars = shootingStars.filter((star) => {
			star.x += Math.cos(star.angle) * star.speed;
			star.y += Math.sin(star.angle) * star.speed;
			star.opacity -= 0.01;

			// Add tail effect
			star.tail.push({
				x: star.x,
				y: star.y,
				opacity: star.opacity
			});

			if (star.tail.length > 20) {
				star.tail.shift();
			}

			return star.opacity > 0 && star.x < canvas.width && star.y < canvas.height;
		});
	}

	function drawStars() {
		if (!ctx) return;

		const isDark = $mode === 'dark';
		const starColor = isDark ? '255, 255, 255' : '100, 100, 120';

		stars.forEach((star) => {
			ctx.fillStyle = `rgba(${starColor}, ${star.opacity})`;
			ctx.beginPath();
			ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
			ctx.fill();

			// Add a subtle glow
			if (star.opacity > 0.6) {
				ctx.fillStyle = `rgba(${starColor}, ${star.opacity * 0.2})`;
				ctx.beginPath();
				ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
				ctx.fill();
			}
		});
	}

	function drawShootingStars() {
		if (!ctx) return;

		const isDark = $mode === 'dark';
		const starColor = isDark ? '255, 255, 255' : '100, 100, 120';
		const accentColor = isDark ? '200, 220, 255' : '80, 100, 180';

		shootingStars.forEach((star) => {
			// Draw tail
			star.tail.forEach((point, index) => {
				const tailOpacity = (index / star.tail.length) * point.opacity * 0.5;
				const tailSize = (index / star.tail.length) * 2;

				ctx.fillStyle = `rgba(${starColor}, ${tailOpacity})`;
				ctx.beginPath();
				ctx.arc(point.x, point.y, tailSize, 0, Math.PI * 2);
				ctx.fill();
			});

			// Draw shooting star head
			const gradient = ctx.createLinearGradient(
				star.x,
				star.y,
				star.x - Math.cos(star.angle) * star.length,
				star.y - Math.sin(star.angle) * star.length
			);
			gradient.addColorStop(0, `rgba(${starColor}, ${star.opacity})`);
			gradient.addColorStop(0.5, `rgba(${accentColor}, ${star.opacity * 0.6})`);
			gradient.addColorStop(1, `rgba(${starColor}, 0)`);

			ctx.strokeStyle = gradient;
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(star.x, star.y);
			ctx.lineTo(
				star.x - Math.cos(star.angle) * star.length,
				star.y - Math.sin(star.angle) * star.length
			);
			ctx.stroke();
		});
	}

	function animate() {
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		updateStars();
		updateShootingStars();

		drawStars();
		drawShootingStars();

		// Random chance to create shooting star
		if (Math.random() < 0.003 && shootingStars.length < 2) {
			createShootingStar();
		}

		animationFrameId = requestAnimationFrame(animate);
	}

	function resizeCanvas() {
		if (!canvas) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		createStars(150);
	}

	function checkMobile() {
		return window.innerWidth < 768;
	}

	onMount(() => {
		isMobile = checkMobile();

		// Don't start animation on mobile
		if (isMobile) {
			return;
		}

		ctx = canvas.getContext('2d');
		resizeCanvas();
		animate();

		const handleResize = () => {
			const wasMobile = isMobile;
			isMobile = checkMobile();

			// If switching between mobile and desktop, reload page or handle accordingly
			if (wasMobile !== isMobile) {
				if (isMobile) {
					// Switching to mobile - stop animation
					cancelAnimationFrame(animationFrameId);
					if (ctx) {
						ctx.clearRect(0, 0, canvas.width, canvas.height);
					}
				} else {
					// Switching to desktop - start animation
					ctx = canvas.getContext('2d');
					resizeCanvas();
					animate();
				}
			} else if (!isMobile) {
				resizeCanvas();
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	});
</script>

{#if !isMobile}
	<canvas
		bind:this={canvas}
		class="fixed inset-0 pointer-events-none z-0"
		style="opacity: {$mode === 'dark' ? '0.6' : '0.4'};"
	></canvas>
{/if}

<style>
	canvas {
		background: transparent;
	}
</style>
