/**
 * Cache Invalidation Logic
 * Handles time-based, event-based, and pattern-based cache invalidation
 */

import type { CacheKey, CacheInvalidationEvent, ICache } from './types';

/**
 * Cache invalidation manager
 * Handles different invalidation strategies
 */
export class CacheInvalidationManager {
  private timers: Map<CacheKey, ReturnType<typeof setTimeout>> = new Map();
  private listeners: ((event: CacheInvalidationEvent) => void)[] = [];

  constructor(private cache: ICache) {}

  /**
   * Schedule automatic invalidation after TTL
   */
  scheduleInvalidation(key: CacheKey, ttl: number): void {
    // Clear any existing timer
    this.clearTimer(key);

    const timer = setTimeout(() => {
      this.invalidate(key, 'time');
    }, ttl);

    this.timers.set(key, timer);
  }

  /**
   * Invalidate single key
   */
  invalidate(key: CacheKey, reason: string = 'manual'): boolean {
    this.clearTimer(key);
    const deleted = this.cache.delete(key);

    if (deleted) {
      this.emit({
        type: 'manual',
        timestamp: Date.now(),
        keys: [key],
        reason,
      });
    }

    return deleted;
  }

  /**
   * Invalidate multiple keys at once
   */
  invalidateMany(keys: CacheKey[], reason: string = 'manual'): number {
    let invalidated = 0;

    for (const key of keys) {
      if (this.invalidate(key, reason)) {
        invalidated++;
      }
    }

    return invalidated;
  }

  /**
   * Invalidate keys matching a pattern
   */
  invalidatePattern(pattern: string | RegExp, reason: string = 'pattern-match'): number {
    if ('invalidatePattern' in this.cache) {
      const invalidated = (this.cache as unknown as { invalidatePattern: (p: RegExp | string) => number }).invalidatePattern(pattern);

      if (invalidated > 0) {
        this.emit({
          type: 'manual',
          timestamp: Date.now(),
          keys: [],
          reason,
        });
      }

      return invalidated;
    }

    return 0;
  }

  /**
   * Invalidate all keys with a specific prefix
   */
  invalidatePrefix(prefix: string, reason: string = 'prefix-invalidation'): number {
    return this.invalidatePattern(new RegExp(`^${prefix}`), reason);
  }

  /**
   * Clear a specific timer
   */
  private clearTimer(key: CacheKey): void {
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(key);
    }
  }

  /**
   * Clear all timers
   */
  clearAllTimers(): void {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers.clear();
  }

  /**
   * Listen to invalidation events
   */
  on(listener: (event: CacheInvalidationEvent) => void): () => void {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Emit invalidation event
   */
  private emit(event: CacheInvalidationEvent): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}

/**
 * File system watcher for cache invalidation
 * Useful for development to invalidate cache on file changes
 */
export function createFileWatcher(
  cache: ICache,
  invalidationManager: CacheInvalidationManager,
  pattern: string,
): void {
  // This would require fs.watch or chokidar
  // Skipping for now as it requires additional setup
  console.debug(`[Cache] File watcher for pattern: ${pattern}`);
}

/**
 * Event-based cache invalidation
 * Invalidate cache when specific events occur
 */
export class EventBasedInvalidation {
  private eventHandlers: Map<string, Set<CacheKey>> = new Map();

  constructor(private invalidationManager: CacheInvalidationManager) {}

  /**
   * Register cache key to be invalidated on event
   */
  registerOnEvent(eventName: string, key: CacheKey): void {
    if (!this.eventHandlers.has(eventName)) {
      this.eventHandlers.set(eventName, new Set());
    }
    this.eventHandlers.get(eventName)!.add(key);
  }

  /**
   * Emit event and invalidate associated keys
   */
  emit(eventName: string): number {
    const keys = this.eventHandlers.get(eventName);
    if (!keys || keys.size === 0) return 0;

    return this.invalidationManager.invalidateMany(Array.from(keys), `event:${eventName}`);
  }

  /**
   * Clear handlers for event
   */
  clearEvent(eventName: string): void {
    this.eventHandlers.delete(eventName);
  }

  /**
   * Clear all handlers
   */
  clear(): void {
    this.eventHandlers.clear();
  }
}
