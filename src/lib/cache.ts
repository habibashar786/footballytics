/**
 * FOOTBALLYTICS - SIMPLE CACHE LAYER
 * ===================================
 * 
 * In-memory cache for development.
 * Can be replaced with Upstash Redis in production.
 */

// Simple in-memory cache
const memoryCache = new Map<string, { value: unknown; expiry: number }>();

// Cache configuration
const CACHE_CONFIG = {
  kpis: { ttl: 300, prefix: "kpi:" },
  players: { ttl: 3600, prefix: "player:" },
  clubs: { ttl: 3600, prefix: "club:" },
  leagues: { ttl: 21600, prefix: "league:" },
  search: { ttl: 900, prefix: "search:" },
  agent: { ttl: 1800, prefix: "agent:" },
};

export type CacheCategory = keyof typeof CACHE_CONFIG;

/**
 * Get value from cache
 */
export async function getCache<T>(
  category: CacheCategory,
  key: string
): Promise<T | null> {
  const fullKey = `${CACHE_CONFIG[category].prefix}${key}`;
  const cached = memoryCache.get(fullKey);
  
  if (cached && cached.expiry > Date.now()) {
    return cached.value as T;
  }
  
  memoryCache.delete(fullKey);
  return null;
}

/**
 * Set value in cache
 */
export async function setCache<T>(
  category: CacheCategory,
  key: string,
  value: T
): Promise<void> {
  const fullKey = `${CACHE_CONFIG[category].prefix}${key}`;
  const ttl = CACHE_CONFIG[category].ttl * 1000;
  
  memoryCache.set(fullKey, {
    value,
    expiry: Date.now() + ttl,
  });
}

/**
 * Delete value from cache
 */
export async function deleteCache(
  category: CacheCategory,
  key: string
): Promise<void> {
  const fullKey = `${CACHE_CONFIG[category].prefix}${key}`;
  memoryCache.delete(fullKey);
}

/**
 * Get or set cache (with automatic refresh)
 */
export async function getOrSetCache<T>(
  category: CacheCategory,
  key: string,
  fetchFn: () => Promise<T>
): Promise<{ data: T; cached: boolean }> {
  const cached = await getCache<T>(category, key);
  
  if (cached !== null) {
    return { data: cached, cached: true };
  }
  
  const data = await fetchFn();
  await setCache(category, key, data);
  return { data, cached: false };
}

/**
 * Clear all cache for a category
 */
export async function clearCategoryCache(category: CacheCategory): Promise<void> {
  const prefix = CACHE_CONFIG[category].prefix;
  
  for (const key of memoryCache.keys()) {
    if (key.startsWith(prefix)) {
      memoryCache.delete(key);
    }
  }
}

/**
 * Get cache stats
 */
export function getCacheStats(): {
  size: number;
  categories: Record<string, number>;
} {
  const categories: Record<string, number> = {};
  
  for (const key of memoryCache.keys()) {
    const category = key.split(":")[0] + ":";
    categories[category] = (categories[category] || 0) + 1;
  }
  
  return {
    size: memoryCache.size,
    categories,
  };
}
