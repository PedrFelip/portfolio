# Performance & Caching Implementation Plan

## Overview
This plan outlines the implementation of a comprehensive caching strategy for Pedro Felipe's portfolio to improve performance, reduce server load, and optimize user experience.

## Objectives
1. Reduce Time to First Byte (TTFB)
2. Minimize database/file system queries
3. Optimize API response times
4. Improve bundle delivery with HTTP caching
5. Maintain cache coherence across the application

## Technology Stack
- **Runtime Caching**: In-memory cache (Node.js built-in)
- **HTTP Caching**: HTTP cache headers (Cache-Control, ETag, Last-Modified)
- **SvelteKit Integration**: Hooks for `handle` and `handleFetch`
- **Content Storage**: Markdown files with metadata
- **Browser Caching**: Service Worker (optional, future)

## Architecture

### Cache Layers
1. **Browser Cache** (HTTP headers)
   - Static assets (images, CSS, JS)
   - Cache-Control: max-age directives
   - ETag for validation

2. **Server Cache** (In-memory)
   - Parsed markdown content
   - Content listings and metadata
   - API responses
   - TTL-based invalidation

3. **Route Cache** (SvelteKit hooks)
   - Page data caching
   - API endpoint caching
   - Automatic invalidation on changes

## File Structure
```
src/
├── lib/
│   ├── cache/                    # NEW: Caching layer
│   │   ├── index.ts              # Cache utilities export
│   │   ├── types.ts              # Cache type definitions
│   │   ├── memory-cache.ts        # In-memory cache implementation
│   │   ├── strategies.ts          # Caching strategies (LRU, TTL)
│   │   └── invalidation.ts        # Cache invalidation logic
│   ├── content/                  # MODIFIED: Add caching
│   │   ├── loader.ts             # NEW: Content loader with cache
│   │   └── parser.ts             # Optional: Parse content with cache
│   └── utils.ts                  # MODIFIED: Add cache utilities
├── hooks.server.ts               # NEW: SvelteKit server hooks for caching
└── routes/
    └── api/
        └── content/
            ├── +server.ts        # MODIFIED: Add cache headers
            └── cache-config.ts   # NEW: Cache configuration per endpoint
```

## Caching Strategy

### Content Caching (Blog Posts)
- **TTL**: 1 hour during development, 24 hours in production
- **Invalidation**: Manual via API or file watcher (optional)
- **Key**: `blog_content_${slug}`

### Content API
- **TTL**: 5 minutes for content listings
- **Invalidation**: When markdown files change
- **Key**: `content_list`

### Resume Data
- **TTL**: 12 hours
- **Invalidation**: Manual
- **Key**: `resume_data`

### Static Assets
- **Browser Cache**: 1 year for versioned assets
- **ETag**: For HTML and dynamic assets

### SvelteKit Page Data
- **Revalidation**: On-demand ISR (Incremental Static Regeneration)
- **TTL**: Per-route configuration

## Implementation Details

### 1. In-Memory Cache
- LRU eviction policy (max 100 entries)
- TTL support (configurable per key)
- Thread-safe operations (single-threaded Node.js)

### 2. HTTP Cache Headers
```
Static Assets: Cache-Control: public, max-age=31536000, immutable
HTML Pages: Cache-Control: public, max-age=3600, must-revalidate
API Endpoints: Cache-Control: public, max-age=300, must-revalidate
```

### 3. Server Hooks
- `handle`: Intercept requests and add cache headers
- `handleFetch`: Cache API responses

### 4. Invalidation Strategy
- **Time-based**: TTL expiration
- **Event-based**: Manual invalidation via API
- **File-based**: Watch markdown files (development)

## Performance Targets
- TTFB: < 100ms (cached requests)
- Content load time: < 50ms (from cache)
- API response time: < 30ms (cached)
- Bundle size impact: < 5KB (gzipped)

## Implementation Phases

### Phase 1: Setup
- Create cache module structure
- Define TypeScript types
- Set up configuration

### Phase 2: Core Implementation
- Implement in-memory cache
- Create cache strategies
- Set up invalidation logic

### Phase 3: Integration
- Add cache to content loader
- Add cache to API endpoints
- Integrate with SvelteKit hooks

### Phase 4: Testing
- Test cache hit/miss scenarios
- Test cache invalidation
- Verify performance improvements

### Phase 5: Documentation
- Document cache strategy
- Update development guidelines
- Add troubleshooting guide

## Configuration

### Environment Variables
```
# Cache TTL (seconds)
PUBLIC_CACHE_TTL_CONTENT=3600
PUBLIC_CACHE_TTL_API=300
PUBLIC_CACHE_TTL_RESUME=43200

# Cache settings
PUBLIC_CACHE_MAX_SIZE=100
PUBLIC_CACHE_ENABLED=true
```

### Per-Route Configuration
- Blog page: 1 hour
- Home page: 30 minutes
- API endpoints: 5 minutes
- Static assets: 1 year

## Success Criteria
- [ ] All cache layers implemented
- [ ] Cache hit rate > 80% for content
- [ ] TTFB reduced by 50%
- [ ] No stale content served
- [ ] Cache invalidation working correctly
- [ ] All tests passing
- [ ] Documentation complete

## Rollback Plan
- Remove cache layer from SvelteKit hooks
- Disable cache via environment variable
- Revert to file-based content loading
- No data loss (cache is ephemeral)
