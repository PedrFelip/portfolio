# Cache Implementation Guide

## Overview

The portfolio now includes a comprehensive caching layer to improve performance and reduce server load. This guide explains how the cache works and how to use it.

## Architecture

### Cache Layers

1. **Browser Cache (HTTP Headers)**
   - Static assets cached for 1 year
   - Images cached for 30 days
   - HTML pages cached for 1-30 minutes

2. **Server Cache (In-Memory)**
   - Blog post metadata cached in memory
   - Content listings cached
   - API responses cached
   - LRU eviction with TTL support

3. **Content Loader Cache**
   - Automatic caching of markdown content
   - Per-slug caching
   - Invalidation support

## Components

### MemoryCache

The core caching implementation - an LRU cache with TTL support.

```typescript
import { MemoryCache } from '$lib/cache';

// Create a cache instance
const cache = new MemoryCache({
	maxSize: 100, // Max 100 entries
	defaultTTL: 3600000, // 1 hour
	enabled: true,
	evictionPolicy: 'LRU' // Least Recently Used
});

// Store value
cache.set('key', 'value', 7200000); // 2 hour TTL

// Retrieve value
const value = cache.get('key'); // 'value' or undefined

// Check existence
if (cache.has('key')) {
	// Do something
}

// Delete key
cache.delete('key');

// Get statistics
const stats = cache.getStats();
console.log(`Hit rate: ${stats.hitRate.toFixed(2)}`);
```

### CachedContentLoader

Automatically caches blog content with built-in invalidation.

```typescript
import { getContentLoader } from '$lib/cache/content-loader';

// Get global content loader
const loader = getContentLoader();

// Load all posts (cached)
const posts = await loader.getPosts();

// Load specific post
const post = await loader.getPost('first-post');

// Invalidate cache
loader.invalidateCache();

// Invalidate specific post
loader.invalidatePost('first-post');

// View statistics
console.log(loader.getStats());
```

### Cache Invalidation Manager

Handles automatic and manual cache invalidation.

```typescript
import { CacheInvalidationManager } from '$lib/cache';
import { getGlobalCache } from '$lib/cache/memory-cache';

const cache = getGlobalCache();
const manager = new CacheInvalidationManager(cache);

// Invalidate single key
manager.invalidate('key');

// Invalidate multiple keys
manager.invalidateMany(['key1', 'key2', 'key3']);

// Invalidate by prefix
manager.invalidatePrefix('user_');

// Listen to invalidation events
manager.on((event) => {
	console.log(`Cache invalidated: ${event.reason}`);
});
```

## HTTP Caching

Cache-Control headers are automatically set based on route patterns:

| Route Pattern | Cache Duration | Details              |
| ------------- | -------------- | -------------------- |
| Static assets | 1 year         | JS, CSS, fonts       |
| Images        | 30 days        | PNG, JPG, WebP, etc. |
| API endpoints | 5 minutes      | `/api/*`             |
| Blog posts    | 1 hour         | `/blog/*`            |
| Home page     | 30 minutes     | `/`                  |
| HTML pages    | 1 hour         | All other pages      |

## Configuration

### Environment Variables

```bash
# Cache TTL in seconds
PUBLIC_CACHE_TTL_CONTENT=3600      # Content cache: 1 hour
PUBLIC_CACHE_TTL_API=300            # API cache: 5 minutes
PUBLIC_CACHE_TTL_RESUME=43200       # Resume data: 12 hours

# Cache settings
PUBLIC_CACHE_MAX_SIZE=100           # Max cache entries
PUBLIC_CACHE_ENABLED=true           # Enable/disable caching
```

### Per-Route Configuration

Modify cache timing in `src/hooks.server.ts`:

```typescript
const cacheConfig = [
	{
		pattern: /^\/my-route/,
		maxAge: 7200, // 2 hours
		revalidate: 'must-revalidate',
		isPublic: true
	}
	// ... more configs
];
```

## Usage Examples

### Cache Blog Content

```typescript
// In +page.ts
import { getContentLoader } from '$lib/cache/content-loader';

export const load: PageLoad = async ({ params }) => {
	const loader = getContentLoader();
	const post = await loader.getPost(params.slug);

	return {
		post,
		meta: post?.metadata
	};
};
```

### Cache API Responses

The `/api/content` endpoint automatically caches responses:

```typescript
// GET /api/content returns cached posts list
// Response includes Cache-Control: public, max-age=300, must-revalidate
```

### Memoize Function Results

```typescript
import { MemoizationCache } from '$lib/cache';

const memoizer = new MemoizationCache();

const expensiveFunction = (a: number, b: number) => {
	return a + b;
};

const memoized = memoizer.memoize(expensiveFunction);

// First call computes
memoized(1, 2); // Computes: 1 + 2 = 3

// Second call uses cache
memoized(1, 2); // Returns cached: 3

console.log(memoizer.getStats());
// { hits: 1, misses: 1, size: 1, hitRate: 0.5 }
```

### Warm Cache on Startup

```typescript
import { MemoryCache, WarmingCache } from '$lib/cache';

const cache = new MemoryCache();
const warmer = new WarmingCache(cache);

// Pre-populate cache with known values
await warmer.warm([
	{ key: 'app_version', value: '1.0.0', ttl: 86400000 },
	{ key: 'config', value: { theme: 'dark' }, ttl: 3600000 }
]);
```

## Performance Tips

1. **Set appropriate TTL values**
   - Short TTL (5 min) for frequently updated content
   - Long TTL (24 hours) for static content

2. **Monitor cache hit rate**
   - Aim for > 80% hit rate
   - Check stats: `cache.getStats().hitRate`

3. **Use pattern-based invalidation**
   - Invalidate related keys together: `invalidatePrefix('user_')`
   - Reduces need to clear entire cache

4. **Enable cache in production**
   - Set `PUBLIC_CACHE_ENABLED=true`
   - Disable for debugging: `cache.setEnabled(false)`

5. **Size cache appropriately**
   - Too small: more evictions, lower hit rate
   - Too large: higher memory usage
   - Balance based on available resources

## Troubleshooting

### Cache not working

- Check if caching is enabled: `PUBLIC_CACHE_ENABLED=true`
- Verify TTL: `cache.getStats()`
- Check response headers: `Cache-Control` header should be set

### Stale data served

- Invalidate manually: `loader.invalidateCache()`
- Check TTL settings - may be too high
- Use shorter TTL for frequently updated content

### High memory usage

- Reduce `PUBLIC_CACHE_MAX_SIZE`
- Lower TTL values
- Check cache statistics: `cache.getStats()`

### Cache statistics wrong

- Ensure cache is enabled
- Call `getStats()` after operations
- Check for concurrent access issues

## Best Practices

1. **Always set TTL appropriately**
   - Short for changing data
   - Long for static data

2. **Invalidate cache on data changes**
   - Use `invalidateCache()` after updates
   - Use prefix-based invalidation for related items

3. **Monitor cache performance**
   - Log hit rate periodically
   - Alert on low hit rates

4. **Test cache behavior**
   - Verify cache hits in tests
   - Test invalidation logic
   - Check memory usage

5. **Document cache decisions**
   - Add comments for non-obvious TTL choices
   - Document invalidation triggers

## API Reference

### MemoryCache

#### Methods

- `get(key)`: Get cached value
- `set(key, value, ttl?)`: Store value
- `has(key)`: Check if key exists and not expired
- `delete(key)`: Remove key
- `clear()`: Remove all entries
- `getStats()`: Get cache statistics
- `keys()`: Get all keys
- `entries()`: Get all entries
- `invalidatePattern(pattern)`: Remove keys matching pattern
- `setEnabled(enabled)`: Enable/disable caching

### CachedContentLoader

#### Methods

- `getPosts()`: Get all posts (cached)
- `getPost(slug)`: Get specific post (cached)
- `invalidateCache()`: Clear all cache
- `invalidatePost(slug)`: Clear specific post
- `getStats()`: Get cache statistics
- `clear()`: Clear cache and timers
- `setTTL(ttl)`: Update cache TTL
- `setEnabled(enabled)`: Enable/disable caching

### CacheInvalidationManager

#### Methods

- `invalidate(key, reason?)`: Remove single key
- `invalidateMany(keys, reason?)`: Remove multiple keys
- `invalidatePattern(pattern, reason?)`: Remove keys matching pattern
- `invalidatePrefix(prefix, reason?)`: Remove keys with prefix
- `on(listener)`: Listen to invalidation events
- `clearAllTimers()`: Stop all scheduled invalidations

## Migration Guide

### From No Cache to Cached Content Loader

**Before:**

```typescript
const paths = import.meta.glob('/src/content/*.md', { eager: true });
// Manual content loading...
```

**After:**

```typescript
import { getContentLoader } from '$lib/cache/content-loader';

const loader = getContentLoader();
const posts = await loader.getPosts(); // Automatically cached
```

### From Manual Headers to Automatic

The `hooks.server.ts` now automatically adds cache headers. No need to manually set `Cache-Control` on routes (unless you want custom values).

## Testing

See `src/lib/cache/memory-cache.test.ts` for comprehensive test examples.

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test -- --watch
```

## Future Enhancements

- [ ] Redis integration for distributed cache
- [ ] Cache persistence to disk
- [ ] Advanced invalidation strategies
- [ ] Cache analytics dashboard
- [ ] Automatic cache warming from CDN
- [ ] Service Worker integration for offline caching
