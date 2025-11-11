/**
 * Cache Type Definitions
 * Defines all types used throughout the caching layer
 */

/** Cache entry with value and metadata */
export interface CacheEntry<T = unknown> {
  value: T;
  createdAt: number;
  expiresAt: number;
  hits: number;
}

/** Cache configuration options */
export interface CacheConfig {
  /** Maximum number of entries to store */
  maxSize: number;
  /** Default TTL in milliseconds */
  defaultTTL: number;
  /** Whether caching is enabled */
  enabled: boolean;
  /** Cache eviction policy */
  evictionPolicy: 'LRU' | 'FIFO' | 'LFU';
}

/** Cache statistics */
export interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  maxSize: number;
  hitRate: number;
  evictions: number;
}

/** Cache key type */
export type CacheKey = string | number | symbol;

/** Generic cache interface */
export interface ICache<T = unknown> {
  get(key: CacheKey): T | undefined;
  set(key: CacheKey, value: T, ttl?: number): void;
  has(key: CacheKey): boolean;
  delete(key: CacheKey): boolean;
  clear(): void;
  getStats(): CacheStats;
}

/** Content cache entry */
export interface ContentCacheEntry {
  slug: string;
  content: string;
  metadata: {
    title: string;
    date: string;
    tags: string[];
    excerpt: string;
  };
}

/** Content list cache entry */
export interface ContentListCacheEntry {
  items: Array<{
    slug: string;
    title: string;
    date: string;
    excerpt: string;
  }>;
  total: number;
}

/** Cache invalidation event */
export interface CacheInvalidationEvent {
  type: 'time' | 'manual' | 'file';
  timestamp: number;
  keys: CacheKey[];
  reason?: string;
}
