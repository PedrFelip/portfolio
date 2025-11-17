# Quick Start - Cache Usage

## 🚀 TL;DR

O cache está **ativo por padrão** e funciona automaticamente! Nada para configurar.

## ✨ O que foi adicionado

### 1. **Cache de Conteúdo (Blog Posts)**

Automaticamente cacheado com 1 hora de TTL. Use assim:

```typescript
// Em uma rota
import { getContentLoader } from '$lib/cache/content-loader';

export const load = async () => {
	const loader = getContentLoader();
	const posts = await loader.getPosts(); // Cached!
	return { posts };
};
```

### 2. **API de Conteúdo**

`GET /api/content` retorna posts com cache de 5 minutos:

```bash
curl http://localhost:5173/api/content
# Headers: Cache-Control: public, max-age=300, must-revalidate
```

### 3. **HTTP Cache Headers**

Adicionados automaticamente via `hooks.server.ts`:

| Recurso         | Cache                   | Tempo   |
| --------------- | ----------------------- | ------- |
| Static (JS/CSS) | public, max-age         | 1 ano   |
| Imagens         | public, max-age         | 30 dias |
| API             | public, must-revalidate | 5 min   |
| Blog            | public, must-revalidate | 1 hora  |
| Home            | public, must-revalidate | 30 min  |

## 🛠️ Configuração

### Variáveis de Ambiente

```bash
# .env ou .env.local
PUBLIC_CACHE_ENABLED=true         # Enable/disable cache
PUBLIC_CACHE_MAX_SIZE=100          # Max entries
PUBLIC_CACHE_TTL_CONTENT=3600      # 1 hora
PUBLIC_CACHE_TTL_API=300           # 5 minutos
PUBLIC_CACHE_TTL_RESUME=43200      # 12 horas
```

### Modificar TTL per-route

Edite `src/hooks.server.ts`:

```typescript
const cacheConfig = [
	{
		pattern: /^\/my-route/,
		maxAge: 7200, // 2 hours
		revalidate: 'must-revalidate',
		isPublic: true
	}
];
```

## 📊 Monitorar Performance

```typescript
import { getContentLoader } from '$lib/cache/content-loader';

const loader = getContentLoader();
const stats = loader.getStats();

console.log(`Hit Rate: ${(stats.hitRate * 100).toFixed(2)}%`);
console.log(`Size: ${stats.size}/${stats.maxSize}`);
console.log(`Hits: ${stats.hits}, Misses: ${stats.misses}`);
```

## 🔄 Invalidar Cache

### Manual (após update)

```typescript
import { getContentLoader } from '$lib/cache/content-loader';

const loader = getContentLoader();
loader.invalidateCache(); // Clear all
loader.invalidatePost('slug-here'); // Clear specific post
```

### Por Padrão

```typescript
import { CacheInvalidationManager } from '$lib/cache';
import { getGlobalCache } from '$lib/cache/memory-cache';

const manager = new CacheInvalidationManager(getGlobalCache());
manager.invalidatePrefix('user_'); // Invalida user_1, user_2, etc
```

## 🧪 Testar Cache

```bash
# Rodar testes
npm run test

# Com watch mode
npm run test -- --watch

# Check specific file
npm run test src/lib/cache/memory-cache.test.ts
```

## 📚 Exemplos

### Usar Memoization

```typescript
import { MemoizationCache } from '$lib/cache';

const memoizer = new MemoizationCache();

const expensive = (n: number) => {
	console.log(`Computing ${n}...`);
	return n * 2;
};

const memoized = memoizer.memoize(expensive);

memoized(5); // Computes
memoized(5); // Returns cached result
```

### Warming Cache

```typescript
import { MemoryCache, WarmingCache } from '$lib/cache';

const cache = new MemoryCache();
const warmer = new WarmingCache(cache);

await warmer.warm([
	{ key: 'config', value: { theme: 'dark' } },
	{ key: 'version', value: '1.0.0' }
]);
```

### Listening to Invalidation Events

```typescript
import { CacheInvalidationManager } from '$lib/cache';

const manager = new CacheInvalidationManager(cache);

manager.on((event) => {
	console.log(`Cache invalidated: ${event.reason}`);
	console.log(`Keys: ${event.keys.length}`);
});
```

## ⚡ Performance Tips

1. **Hit rate objetivo**: > 80%
2. **Verificar stats regularmente**: `loader.getStats()`
3. **TTL apropriado**: Curto para dados dinâmicos, longo para estáticos
4. **Invalidar em grupo**: Use `invalidatePrefix()` para relacionados
5. **Desabilitar para debug**: `PUBLIC_CACHE_ENABLED=false`

## 🐛 Troubleshooting

### Cache não está funcionando

```typescript
// Verificar se está ativado
const cache = getGlobalCache();
console.log(cache.getStats()); // hit rate deve ser > 0
```

### Dados desatualizados

```typescript
// Invalidar manualmente
const loader = getContentLoader();
loader.invalidateCache();
```

### Memória alta

```typescript
// Reduzir tamanho do cache
const cache = new MemoryCache({ maxSize: 50 });

// Ou desabilitar
PUBLIC_CACHE_ENABLED = false;
```

## 📖 Mais Info

- Documentação completa: `.specify/memory/CACHE_GUIDE.md`
- Testes: `src/lib/cache/memory-cache.test.ts`
- Implementação: `src/lib/cache/`
- Constitution: `.specify/speckit.constitution`

## 🎯 Próximos Passos

- [ ] Monitorar hit rate em produção
- [ ] Ajustar TTL baseado em métricas
- [ ] Adicionar Redis para cache distribuído
- [ ] Service Worker para cache offline
- [ ] Cache analytics dashboard
