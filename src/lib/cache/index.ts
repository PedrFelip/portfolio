/**
 * Cache Module
 * Comprehensive caching layer for the portfolio
 */

// Re-export types
export type {
  CacheEntry,
  CacheConfig,
  CacheStats,
  CacheKey,
  ICache,
  ContentCacheEntry,
  ContentListCacheEntry,
  CacheInvalidationEvent,
} from './types';

// Re-export cache implementations
export { MemoryCache, getGlobalCache, resetGlobalCache } from './memory-cache';

// Re-export strategies
export { TTLCacheStrategy, MemoizationCache, WarmingCache, DependencyCacheStrategy } from './strategies';

// Re-export invalidation
export {
  CacheInvalidationManager,
  createFileWatcher,
  EventBasedInvalidation,
} from './invalidation';

// Re-export content loader
export { CachedContentLoader, getContentLoader, resetContentLoader } from './content-loader';
