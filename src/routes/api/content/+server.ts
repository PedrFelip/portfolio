import { json } from '@sveltejs/kit';
import { getContentLoader } from '$lib/cache/content-loader';

/**
 * GET /api/content
 * Returns all published blog posts with caching
 */
export async function GET() {
	const loader = getContentLoader();
	const posts = await loader.getPosts();

	return json(posts, {
		headers: {
			'Cache-Control': 'public, max-age=300, must-revalidate',
			'Content-Type': 'application/json',
		},
	});
}
