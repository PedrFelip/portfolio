import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';

/**
 * GET /api/content
 * Returns all published blog posts
 */
export async function GET() {
	let posts: Post[] = [];

	const paths = import.meta.glob('/src/content/*.md', { eager: true });
	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			if (post.published) {
				posts.push(post);
			}
		}
	}

	// Sort by date descending
	posts = posts.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());

	return json(posts, {
		headers: {
			'Cache-Control': 'public, max-age=300, must-revalidate',
			'Content-Type': 'application/json',
		},
	});
}
