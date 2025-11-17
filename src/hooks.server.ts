/**
 * SvelteKit Server Hooks
 * Configure HTTP caching and other server-side behaviors
 */

import type { Handle } from '@sveltejs/kit';

/**
 * Cache configuration by route pattern
 */
const cacheConfig: Array<{
	pattern: RegExp;
	maxAge: number;
	revalidate: 'must-revalidate' | 'no-cache';
	isPublic: boolean;
}> = [
	// Static assets - cache for 1 year
	{
		pattern: /\.(js|css|woff2?|ttf|otf|eot)$/,
		maxAge: 31536000, // 1 year
		revalidate: 'no-cache',
		isPublic: true
	},
	// Images - cache for 30 days
	{
		pattern: /\.(png|jpg|jpeg|gif|webp|svg|ico)$/,
		maxAge: 2592000, // 30 days
		revalidate: 'no-cache',
		isPublic: true
	},
	// API endpoints - cache for 5 minutes
	{
		pattern: /^\/api\//,
		maxAge: 300, // 5 minutes
		revalidate: 'must-revalidate',
		isPublic: true
	},
	// Blog posts - cache for 1 hour
	{
		pattern: /^\/blog\//,
		maxAge: 3600, // 1 hour
		revalidate: 'must-revalidate',
		isPublic: true
	},
	// Home page - cache for 30 minutes
	{
		pattern: /^\/$/,
		maxAge: 1800, // 30 minutes
		revalidate: 'must-revalidate',
		isPublic: true
	},
	// HTML pages - cache for 1 hour
	{
		pattern: /\.html$/,
		maxAge: 3600, // 1 hour
		revalidate: 'must-revalidate',
		isPublic: true
	}
];

/**
 * Get cache control header for a URL
 */
function getCacheControlHeader(url: URL): string | null {
	const path = url.pathname;

	for (const config of cacheConfig) {
		if (config.pattern.test(path)) {
			const visibility = config.isPublic ? 'public' : 'private';
			return `${visibility}, max-age=${config.maxAge}, ${config.revalidate}`;
		}
	}

	return null;
}

/**
 * Handle hook: Add cache headers to responses
 */
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Skip if response already has Cache-Control
	if (response.headers.has('Cache-Control')) {
		return response;
	}

	// Add cache headers based on route
	const cacheControl = getCacheControlHeader(event.url);
	if (cacheControl) {
		response.headers.set('Cache-Control', cacheControl);
	}

	// Add security headers
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	return response;
};
