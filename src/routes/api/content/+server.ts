import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';
import { marked } from 'marked';

/**
 * GET /api/content
 * Returns all published blog posts
 */
function stripFrontmatter(markdown: string) {
	if (!markdown.startsWith('---')) {
		return markdown;
	}

	return markdown.replace(/^---\s*[\s\S]*?---\s*/, '');
}

export async function GET() {
	let posts: Post[] = [];

	const paths = import.meta.glob('/src/content/*.md', { eager: true });
	const rawFiles = import.meta.glob('/src/content/*.md', { eager: true, as: 'raw' }) as Record<
		string,
		string
	>;

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');
		const raw = rawFiles[path];
		const content = raw ? await marked.parse(stripFrontmatter(raw).trim()) : undefined;

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug, content } satisfies Post;
			if (post.published) {
				posts.push(post);
			}
		}
	}

	// Sort by date descending
	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return json(posts, {
		headers: {
			'Cache-Control': 'public, max-age=300, must-revalidate',
			'Content-Type': 'application/json'
		}
	});
}
