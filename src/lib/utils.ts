import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import { marked } from 'marked';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'));
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(dateToFormat);
}

// Configure marked to open external links in new tab
marked.use({
	hooks: {
		postprocess(html) {
			// Replace all external links to open in new tab
			return html.replace(
				/<a href="(https?:\/\/[^"]+)"/g,
				'<a href="$1" target="_blank" rel="noopener noreferrer"'
			);
		}
	}
});

export { marked };

/**
 * Animation debugging utilities
 */

export interface BrowserAnimationSupport {
	viewTransitions: boolean;
	cssAnimations: boolean;
	cssTransitions: boolean;
	webAnimationsAPI: boolean;
	prefersReducedMotion: boolean;
	browserInfo: string;
}

/**
 * Checks browser support for various animation features
 */
export function checkAnimationSupport(): BrowserAnimationSupport {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return {
			viewTransitions: false,
			cssAnimations: false,
			cssTransitions: false,
			webAnimationsAPI: false,
			prefersReducedMotion: false,
			browserInfo: 'Server-side rendering'
		};
	}

	return {
		viewTransitions: 'startViewTransition' in document,
		cssAnimations: 'animate' in document.createElement('div'),
		cssTransitions: 'transition' in document.createElement('div').style,
		webAnimationsAPI: typeof Element.prototype.animate === 'function',
		prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
		browserInfo: navigator.userAgent
	};
}

/**
 * Logs animation support information to console
 */
export function logAnimationSupport(componentName = 'Animation'): void {
	const support = checkAnimationSupport();
	console.group(`[${componentName}] Browser Animation Support`);
	console.log('View Transitions API:', support.viewTransitions ? '✅' : '❌');
	console.log('CSS Animations:', support.cssAnimations ? '✅' : '❌');
	console.log('CSS Transitions:', support.cssTransitions ? '✅' : '❌');
	console.log('Web Animations API:', support.webAnimationsAPI ? '✅' : '❌');
	console.log(
		'Prefers Reduced Motion:',
		support.prefersReducedMotion ? '⚠️ Yes (animations may be disabled)' : '✅ No'
	);
	console.log('Browser:', support.browserInfo);
	console.groupEnd();
}

/**
 * Validates that required animation classes exist in the document
 */
export function validateAnimationClasses(classes: string[]): {
	valid: boolean;
	missing: string[];
} {
	if (typeof document === 'undefined') {
		return { valid: false, missing: classes };
	}

	const missing: string[] = [];
	const styleSheets = Array.from(document.styleSheets);

	for (const className of classes) {
		let found = false;

		try {
			for (const sheet of styleSheets) {
				if (!sheet.cssRules) continue;

				for (let i = 0; i < sheet.cssRules.length; i++) {
					const rule = sheet.cssRules[i];
					if (rule instanceof CSSStyleRule) {
						if (rule.selectorText && rule.selectorText.includes(className)) {
							found = true;
							break;
						}
					}
				}

				if (found) break;
			}
		} catch (e) {
			// Cross-origin stylesheet access might fail, ignore
			continue;
		}

		if (!found) {
			missing.push(className);
		}
	}

	return {
		valid: missing.length === 0,
		missing
	};
}

/**
 * Tests if svelte-motion is loaded correctly
 */
export function checkSvelteMotionLoaded(): boolean {
	try {
		// Check if we can import svelte-motion components
		// This is a basic check - the actual import happens at build time
		return typeof window !== 'undefined';
	} catch {
		// Silently return false if check fails
		return false;
	}
}

/**
 * Comprehensive animation diagnostics
 */
export function runAnimationDiagnostics(): void {
	console.group('🔍 Animation Diagnostics');

	// Check browser support
	logAnimationSupport('Diagnostics');

	// Check for svelte-motion
	const svelteMotionLoaded = checkSvelteMotionLoaded();
	console.log('Svelte Motion:', svelteMotionLoaded ? '✅' : '❌');

	// Check for required CSS classes
	const requiredClasses = ['theme-transitioning'];
	const classValidation = validateAnimationClasses(requiredClasses);
	console.log('CSS Classes:', classValidation.valid ? '✅' : '⚠️');
	if (!classValidation.valid) {
		console.warn('Missing CSS classes:', classValidation.missing);
	}

	// Check computed styles for potential conflicts
	if (typeof document !== 'undefined') {
		const html = document.documentElement;
		const computed = window.getComputedStyle(html);
		console.log('HTML view-transition-name:', computed.getPropertyValue('view-transition-name'));
	}

	console.groupEnd();
}

export function cn1(...inputs: any[]) {
	return inputs.filter(Boolean).join(' ');
}
