/**
 * Cache Strategies
 * Different caching strategies for different use cases
 */

import type { CacheKey, ICache } from './types';

/**
 * TTL-based cache strategy
 * Entries expire after a specified time
 */
export class TTLCacheStrategy implements ICache {
  constructor(
    private cache: ICache,
    private defaultTTL: number = 3600000, // 1 hour
  ) {}

  get(key: CacheKey): unknown | undefined {
    return this.cache.get(key);
  }

  set(key: CacheKey, value: unknown, ttl?: number): void {
    this.cache.set(key, value, ttl ?? this.defaultTTL);
  }

  has(key: CacheKey): boolean {
    return this.cache.has(key);
  }

  delete(key: CacheKey): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  getStats() {
    return this.cache.getStats();
  }
}

/**
 * Memoization strategy
 * Caches function results based on arguments
 */
export class MemoizationCache {
  private cache: Map<string, unknown> = new Map();
  private hits = 0;
  private misses = 0;

  /**
   * Create a memoized version of a function
   */
  memoize<T extends (...args: unknown[]) => unknown>(
    fn: T,
    keyGenerator?: (...args: unknown[]) => string,
  ): T {
    return ((...args: unknown[]) => {
      const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);

      if (this.cache.has(key)) {
        this.hits++;
        return this.cache.get(key);
      }

      this.misses++;
      const result = fn(...args);
      this.cache.set(key, result);
      return result;
    }) as T;
  }

  /**
   * Clear memoization cache
   */
  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }

  /**
   * Get hit rate
   */
  getHitRate(): number {
    const total = this.hits + this.misses;
    return total > 0 ? this.hits / total : 0;
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      hits: this.hits,
      misses: this.misses,
      size: this.cache.size,
      hitRate: this.getHitRate(),
    };
  }
}

/**
 * Warming strategy
 * Pre-populate cache with known values
 */
export class WarmingCache {
  constructor(private cache: ICache) {}

  /**
   * Warm cache with initial values
   */
  async warm<T>(entries: Array<{ key: CacheKey; value: T; ttl?: number }>): Promise<void> {
    for (const { key, value, ttl } of entries) {
      this.cache.set(key, value, ttl);
    }
  }

  /**
   * Clear and rewarm cache
   */
  async rewarm<T>(entries: Array<{ key: CacheKey; value: T; ttl?: number }>): Promise<void> {
    this.cache.clear();
    await this.warm(entries);
  }
}

/**
 * Invalidation-aware cache strategy
 * Tracks dependencies and invalidates related entries
 */
export class DependencyCacheStrategy {
  private dependencies: Map<CacheKey, Set<CacheKey>> = new Map();
  private dependents: Map<CacheKey, Set<CacheKey>> = new Map();

  constructor(private cache: ICache) {}

  /**
   * Set with dependency tracking
   */
  set(key: CacheKey, value: unknown, deps: CacheKey[] = [], ttl?: number): void {
    this.cache.set(key, value, ttl);
    this.trackDependencies(key, deps);
  }

  /**
   * Invalidate key and all dependent keys
   */
  invalidate(key: CacheKey): number {
    let invalidated = this.cache.delete(key) ? 1 : 0;

    // Invalidate all dependents
    const dependents = this.dependents.get(key);
    if (dependents) {
      for (const dependent of dependents) {
        invalidated += this.invalidate(dependent);
      }
    }

    this.dependencies.delete(key);
    this.dependents.delete(key);

    return invalidated;
  }

  /**
   * Get cache methods
   */
  get(key: CacheKey): unknown | undefined {
    return this.cache.get(key);
  }

  has(key: CacheKey): boolean {
    return this.cache.has(key);
  }

  delete(key: CacheKey): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
    this.dependencies.clear();
    this.dependents.clear();
  }

  getStats() {
    return this.cache.getStats();
  }

  /**
   * Private: Track dependencies
   */
  private trackDependencies(key: CacheKey, deps: CacheKey[]): void {
    if (deps.length === 0) return;

    this.dependencies.set(key, new Set(deps));

    for (const dep of deps) {
      if (!this.dependents.has(dep)) {
        this.dependents.set(dep, new Set());
      }
      this.dependents.get(dep)!.add(key);
    }
  }
}
