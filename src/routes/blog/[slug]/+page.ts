import { error } from '@sveltejs/kit';
import { getContentLoader } from '$lib/cache/content-loader';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	console.log(params, 'Params');
	try {
		// Try to get from cache first
		const loader = getContentLoader();
		const cachedPost = await loader.getPost(params.slug);

		if (cachedPost) {
			// Post metadata found in cache, still need to load content
			const post = await import(`../../../content/${params.slug}.md`);
			return {
				content: post.default,
				meta: post.metadata,
			};
		}

		// Fallback: load directly
		const post = await import(`../../../content/${params.slug}.md`);
		return {
			content: post.default,
			meta: post.metadata,
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
};
