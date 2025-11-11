/**
 * In-Memory Cache Implementation
 * LRU cache with TTL support for server-side caching
 */

import type { CacheConfig, CacheEntry, CacheKey, CacheStats, ICache } from './types';

/**
 * In-memory LRU cache with TTL support
 * Single-threaded, suitable for Node.js server caching
 *
 * @example
 * ```ts
 * const cache = new MemoryCache({ maxSize: 100, defaultTTL: 3600000 });
 * cache.set('key', 'value', 7200000);
 * const value = cache.get('key');
 * ```
 */
export class MemoryCache implements ICache {
  private store: Map<CacheKey, CacheEntry>;
  private accessOrder: CacheKey[]; // Track LRU order
  private config: CacheConfig;
  private stats: {
    hits: number;
    misses: number;
    evictions: number;
  };

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxSize: config.maxSize ?? 100,
      defaultTTL: config.defaultTTL ?? 3600000, // 1 hour
      enabled: config.enabled ?? true,
      evictionPolicy: config.evictionPolicy ?? 'LRU',
    };

    this.store = new Map();
    this.accessOrder = [];
    this.stats = { hits: 0, misses: 0, evictions: 0 };
  }

  /**
   * Get value from cache
   * Updates LRU order on access
   */
  get(key: CacheKey): unknown | undefined {
    if (!this.config.enabled) return undefined;

    const entry = this.store.get(key);

    if (!entry) {
      this.stats.misses++;
      return undefined;
    }

    // Check if expired
    if (entry.expiresAt < Date.now()) {
      this.store.delete(key);
      this.accessOrder = this.accessOrder.filter((k) => k !== key);
      this.stats.misses++;
      return undefined;
    }

    // Update LRU tracking
    this.updateAccessOrder(key);
    entry.hits++;
    this.stats.hits++;

    return entry.value;
  }

  /**
   * Set value in cache with optional TTL
   * Triggers eviction if cache is full
   */
  set(key: CacheKey, value: unknown, ttl?: number): void {
    if (!this.config.enabled) return;

    const expiresAt = Date.now() + (ttl ?? this.config.defaultTTL);

    // If key already exists, update it
    if (this.store.has(key)) {
      const entry = this.store.get(key)!;
      entry.value = value;
      entry.expiresAt = expiresAt;
      this.updateAccessOrder(key);
      return;
    }

    // Evict if at capacity
    if (this.store.size >= this.config.maxSize) {
      this.evictLRU();
    }

    this.store.set(key, {
      value,
      createdAt: Date.now(),
      expiresAt,
      hits: 0,
    });

    this.accessOrder.push(key);
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: CacheKey): boolean {
    if (!this.config.enabled) return false;

    const entry = this.store.get(key);
    if (!entry) return false;

    if (entry.expiresAt < Date.now()) {
      this.store.delete(key);
      this.accessOrder = this.accessOrder.filter((k) => k !== key);
      return false;
    }

    return true;
  }

  /**
   * Delete key from cache
   */
  delete(key: CacheKey): boolean {
    const deleted = this.store.delete(key);
    this.accessOrder = this.accessOrder.filter((k) => k !== key);
    return deleted;
  }

  /**
   * Clear entire cache
   */
  clear(): void {
    this.store.clear();
    this.accessOrder = [];
    this.stats = { hits: 0, misses: 0, evictions: 0 };
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    const totalRequests = this.stats.hits + this.stats.misses;
    return {
      hits: this.stats.hits,
      misses: this.stats.misses,
      size: this.store.size,
      maxSize: this.config.maxSize,
      hitRate: totalRequests > 0 ? this.stats.hits / totalRequests : 0,
      evictions: this.stats.evictions,
    };
  }

  /**
   * Get all keys in cache
   */
  keys(): CacheKey[] {
    return Array.from(this.store.keys());
  }

  /**
   * Get all entries in cache
   */
  entries(): [CacheKey, unknown][] {
    return Array.from(this.store.entries()).map(([key, entry]) => [key, entry.value]);
  }

  /**
   * Invalidate keys matching a pattern
   */
  invalidatePattern(pattern: string | RegExp): number {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    const keysToDelete: CacheKey[] = [];

    for (const key of this.store.keys()) {
      if (typeof key === 'string' && regex.test(key)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach((key) => this.delete(key));
    return keysToDelete.length;
  }

  /**
   * Enable/disable caching
   */
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
  }

  /**
   * Private: Update LRU access order
   */
  private updateAccessOrder(key: CacheKey): void {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
    this.accessOrder.push(key);
  }

  /**
   * Private: Evict least recently used item
   */
  private evictLRU(): void {
    if (this.accessOrder.length === 0) return;

    const keyToEvict = this.accessOrder.shift();
    if (keyToEvict !== undefined) {
      this.store.delete(keyToEvict);
      this.stats.evictions++;
    }
  }
}

/**
 * Global cache instance
 */
let globalCache: MemoryCache;

/**
 * Get or create global cache instance
 */
export function getGlobalCache(config?: Partial<CacheConfig>): MemoryCache {
  if (!globalCache) {
    globalCache = new MemoryCache(config);
  }
  return globalCache;
}

/**
 * Reset global cache instance (useful for testing)
 */
export function resetGlobalCache(): void {
  globalCache?.clear();
}
