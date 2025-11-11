/**
 * Content Loader with Caching
 * Loads and caches blog post metadata from markdown files
 */

import type { Post } from '$lib/types';
import { getGlobalCache, type MemoryCache } from './memory-cache';
import { CacheInvalidationManager } from './invalidation';

const CONTENT_CACHE_PREFIX = 'content_';
const POSTS_LIST_CACHE_KEY = 'posts_list';

/**
 * Content loader with built-in caching
 */
export class CachedContentLoader {
  private cache: MemoryCache;
  private invalidationManager: CacheInvalidationManager;
  private cacheTTL: number = 3600000; // 1 hour default

  constructor(ttl?: number) {
    this.cache = getGlobalCache({
      maxSize: 100,
      defaultTTL: ttl ?? this.cacheTTL,
    });
    this.invalidationManager = new CacheInvalidationManager(this.cache);

    if (ttl) {
      this.cacheTTL = ttl;
    }
  }

  /**
   * Load all posts with caching
   */
  async getPosts(): Promise<Post[]> {
    // Check cache first
    const cached = this.cache.get(POSTS_LIST_CACHE_KEY);
    if (cached && Array.isArray(cached)) {
      return cached as Post[];
    }

    // Load posts
    const posts = await this.loadPosts();

    // Cache the result
    this.cache.set(POSTS_LIST_CACHE_KEY, posts, this.cacheTTL);
    this.invalidationManager.scheduleInvalidation(POSTS_LIST_CACHE_KEY, this.cacheTTL);

    return posts;
  }

  /**
   * Load specific post by slug with caching
   */
  async getPost(slug: string): Promise<Post | null> {
    const cacheKey = `${CONTENT_CACHE_PREFIX}${slug}`;

    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached as Post;
    }

    // Load all posts and find the one we need
    const posts = await this.getPosts();
    const post = posts.find((p) => p.slug === slug) || null;

    if (post) {
      // Cache individual post
      this.cache.set(cacheKey, post, this.cacheTTL);
      this.invalidationManager.scheduleInvalidation(cacheKey, this.cacheTTL);
    }

    return post;
  }

  /**
   * Invalidate posts cache
   */
  invalidateCache(): number {
    let invalidated = this.invalidationManager.invalidate(POSTS_LIST_CACHE_KEY, 'manual') ? 1 : 0;
    invalidated += this.invalidationManager.invalidatePrefix(CONTENT_CACHE_PREFIX, 'manual');
    return invalidated;
  }

  /**
   * Invalidate specific post cache
   */
  invalidatePost(slug: string): boolean {
    const cacheKey = `${CONTENT_CACHE_PREFIX}${slug}`;
    const invalidated = this.invalidationManager.invalidate(cacheKey, 'post-update');
    if (invalidated) {
      // Also invalidate posts list
      this.invalidationManager.invalidate(POSTS_LIST_CACHE_KEY, 'post-update');
    }
    return invalidated;
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return this.cache.getStats();
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear();
    this.invalidationManager.clearAllTimers();
  }

  /**
   * Set cache TTL
   */
  setTTL(ttl: number): void {
    this.cacheTTL = ttl;
  }

  /**
   * Enable/disable caching
   */
  setEnabled(enabled: boolean): void {
    this.cache.setEnabled(enabled);
  }

  /**
   * Private: Load posts from markdown files
   */
  private async loadPosts(): Promise<Post[]> {
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

    return posts;
  }
}

/**
 * Global content loader instance
 */
let globalContentLoader: CachedContentLoader;

/**
 * Get or create global content loader
 */
export function getContentLoader(ttl?: number): CachedContentLoader {
  if (!globalContentLoader) {
    globalContentLoader = new CachedContentLoader(ttl);
  }
  return globalContentLoader;
}

/**
 * Reset global content loader (useful for testing)
 */
export function resetContentLoader(): void {
  globalContentLoader?.clear();
}
