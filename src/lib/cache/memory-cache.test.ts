import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { MemoryCache, getGlobalCache, resetGlobalCache } from '../memory-cache';
import { CacheInvalidationManager } from '../invalidation';

describe('MemoryCache', () => {
  let cache: MemoryCache;

  beforeEach(() => {
    cache = new MemoryCache({ maxSize: 10, defaultTTL: 100 });
  });

  describe('set and get', () => {
    it('should store and retrieve values', () => {
      cache.set('key1', 'value1');
      expect(cache.get('key1')).toBe('value1');
    });

    it('should return undefined for missing keys', () => {
      expect(cache.get('nonexistent')).toBeUndefined();
    });

    it('should overwrite existing values', () => {
      cache.set('key1', 'value1');
      cache.set('key1', 'value2');
      expect(cache.get('key1')).toBe('value2');
    });

    it('should store objects', () => {
      const obj = { name: 'test', value: 42 };
      cache.set('obj', obj);
      expect(cache.get('obj')).toEqual(obj);
    });
  });

  describe('TTL and expiration', () => {
    it('should expire values after TTL', async () => {
      cache.set('key1', 'value1', 50);
      expect(cache.get('key1')).toBe('value1');

      await new Promise((resolve) => setTimeout(resolve, 60));
      expect(cache.get('key1')).toBeUndefined();
    });

    it('should use default TTL if not specified', async () => {
      cache.set('key1', 'value1');
      expect(cache.has('key1')).toBe(true);
    });
  });

  describe('has method', () => {
    it('should check existence of keys', () => {
      cache.set('key1', 'value1');
      expect(cache.has('key1')).toBe(true);
      expect(cache.has('nonexistent')).toBe(false);
    });
  });

  describe('delete method', () => {
    it('should delete keys', () => {
      cache.set('key1', 'value1');
      expect(cache.delete('key1')).toBe(true);
      expect(cache.get('key1')).toBeUndefined();
    });

    it('should return false for non-existent keys', () => {
      expect(cache.delete('nonexistent')).toBe(false);
    });
  });

  describe('clear method', () => {
    it('should clear all entries', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.clear();
      expect(cache.get('key1')).toBeUndefined();
      expect(cache.get('key2')).toBeUndefined();
    });
  });

  describe('LRU eviction', () => {
    it('should evict least recently used item when full', () => {
      const smallCache = new MemoryCache({ maxSize: 3 });

      smallCache.set('key1', 'value1');
      smallCache.set('key2', 'value2');
      smallCache.set('key3', 'value3');

      // Access key1 to update LRU
      smallCache.get('key1');

      // Add new key, key2 should be evicted (least recently used)
      smallCache.set('key4', 'value4');

      expect(smallCache.get('key1')).toBe('value1');
      expect(smallCache.get('key2')).toBeUndefined();
      expect(smallCache.get('key3')).toBe('value3');
      expect(smallCache.get('key4')).toBe('value4');
    });
  });

  describe('statistics', () => {
    it('should track hits and misses', () => {
      cache.set('key1', 'value1');

      cache.get('key1'); // hit
      cache.get('key1'); // hit
      cache.get('nonexistent'); // miss

      const stats = cache.getStats();
      expect(stats.hits).toBe(2);
      expect(stats.misses).toBe(1);
      expect(stats.hitRate).toBeCloseTo(2 / 3, 5);
    });

    it('should report size and max size', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');

      const stats = cache.getStats();
      expect(stats.size).toBe(2);
      expect(stats.maxSize).toBe(10);
    });
  });

  describe('pattern invalidation', () => {
    it('should invalidate keys matching a pattern', () => {
      cache.set('user_1', 'data1');
      cache.set('user_2', 'data2');
      cache.set('post_1', 'data3');

      const invalidated = cache.invalidatePattern(/^user_/);

      expect(invalidated).toBe(2);
      expect(cache.get('user_1')).toBeUndefined();
      expect(cache.get('user_2')).toBeUndefined();
      expect(cache.get('post_1')).toBe('data3');
    });
  });

  describe('enable/disable', () => {
    it('should not store when disabled', () => {
      cache.setEnabled(false);
      cache.set('key1', 'value1');
      expect(cache.get('key1')).toBeUndefined();
    });
  });

  describe('global cache instance', () => {
    beforeEach(() => {
      resetGlobalCache();
    });

    it('should provide a global cache instance', () => {
      const cache1 = getGlobalCache();
      cache1.set('key1', 'value1');

      const cache2 = getGlobalCache();
      expect(cache2.get('key1')).toBe('value1');
    });

    it('should reset global cache', () => {
      const cache = getGlobalCache();
      cache.set('key1', 'value1');
      resetGlobalCache();

      const cache2 = getGlobalCache();
      expect(cache2.get('key1')).toBeUndefined();
    });
  });
});

describe('CacheInvalidationManager', () => {
  let cache: MemoryCache;
  let manager: CacheInvalidationManager;

  beforeEach(() => {
    cache = new MemoryCache({ maxSize: 100 });
    manager = new CacheInvalidationManager(cache);
  });

  afterEach(() => {
    manager.clearAllTimers();
  });

  describe('manual invalidation', () => {
    it('should invalidate single key', () => {
      cache.set('key1', 'value1');
      const result = manager.invalidate('key1');
      expect(result).toBe(true);
      expect(cache.get('key1')).toBeUndefined();
    });

    it('should invalidate multiple keys', () => {
      cache.set('key1', 'value1');
      cache.set('key2', 'value2');
      cache.set('key3', 'value3');

      const invalidated = manager.invalidateMany(['key1', 'key2']);
      expect(invalidated).toBe(2);
      expect(cache.get('key1')).toBeUndefined();
      expect(cache.get('key3')).toBe('value3');
    });
  });

  describe('prefix invalidation', () => {
    it('should invalidate keys with prefix', () => {
      cache.set('user_1', 'data1');
      cache.set('user_2', 'data2');
      cache.set('post_1', 'data3');

      const invalidated = manager.invalidatePrefix('user_');
      expect(invalidated).toBe(2);
      expect(cache.get('user_1')).toBeUndefined();
      expect(cache.get('post_1')).toBe('data3');
    });
  });

  describe('event listeners', () => {
    it('should emit invalidation events', () => {
      const events: Array<{ type: string; keys: string[] }> = [];

      manager.on((event) => {
        events.push({
          type: event.type,
          keys: event.keys.map((k) => String(k)),
        });
      });

      cache.set('key1', 'value1');
      manager.invalidate('key1', 'test-reason');

      expect(events.length).toBe(1);
      expect(events[0].type).toBe('manual');
    });
  });
});
