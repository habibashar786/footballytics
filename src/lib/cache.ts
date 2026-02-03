import { Redis } from "@upstash/redis";

// Initialize Redis client
// Uses environment variables: UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
const redis = process.env.UPSTASH_REDIS_REST_URL
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
    })
  : null;

// Cache configuration
const CACHE_CONFIG = {
  // KPIs - refresh every 5 minutes
  kpis: { ttl: 300, prefix: "kpi:" },
  // Players - refresh every hour
  players: { ttl: 3600, prefix: "player:" },
  // Clubs - refresh every hour
  clubs: { ttl: 3600, prefix: "club:" },
  // Leagues - refresh every 6 hours
  leagues: { ttl: 21600, prefix: "league:" },
  // Search results - refresh every 15 minutes
  search: { ttl: 900, prefix: "search:" },
  // Agent responses - cache for 30 minutes
  agent: { ttl: 1800, prefix: "agent:" },
};

export type CacheCategory = keyof typeof CACHE_CONFIG;

/**
 * Get cached data
 */
export async function getCache<T>(
  category: CacheCategory,
  key: string
): Promise<T | null> {
  if (!redis) {
    console.log("[Cache] Redis not configured, skipping cache");
    return null;
  }

  try {
    const cacheKey = `${CACHE_CONFIG[category].prefix}${key}`;
    const cached = await redis.get<T>(cacheKey);
    
    if (cached) {
      console.log(`[Cache] HIT: ${cacheKey}`);
      return cached;
    }
    
    console.log(`[Cache] MISS: ${cacheKey}`);
    return null;
  } catch (error) {
    console.error("[Cache] Error getting cache:", error);
    return null;
  }
}

/**
 * Set cached data with TTL
 */
export async function setCache<T>(
  category: CacheCategory,
  key: string,
  data: T
): Promise<boolean> {
  if (!redis) {
    console.log("[Cache] Redis not configured, skipping cache set");
    return false;
  }

  try {
    const cacheKey = `${CACHE_CONFIG[category].prefix}${key}`;
    const ttl = CACHE_CONFIG[category].ttl;
    
    await redis.setex(cacheKey, ttl, JSON.stringify(data));
    console.log(`[Cache] SET: ${cacheKey} (TTL: ${ttl}s)`);
    return true;
  } catch (error) {
    console.error("[Cache] Error setting cache:", error);
    return false;
  }
}

/**
 * Delete cached data
 */
export async function deleteCache(
  category: CacheCategory,
  key: string
): Promise<boolean> {
  if (!redis) return false;

  try {
    const cacheKey = `${CACHE_CONFIG[category].prefix}${key}`;
    await redis.del(cacheKey);
    console.log(`[Cache] DELETE: ${cacheKey}`);
    return true;
  } catch (error) {
    console.error("[Cache] Error deleting cache:", error);
    return false;
  }
}

/**
 * Clear all cache for a category
 */
export async function clearCategoryCache(category: CacheCategory): Promise<boolean> {
  if (!redis) return false;

  try {
    const prefix = CACHE_CONFIG[category].prefix;
    const keys = await redis.keys(`${prefix}*`);
    
    if (keys.length > 0) {
      await Promise.all(keys.map(key => redis.del(key)));
      console.log(`[Cache] CLEARED: ${keys.length} keys with prefix ${prefix}`);
    }
    
    return true;
  } catch (error) {
    console.error("[Cache] Error clearing category cache:", error);
    return false;
  }
}

/**
 * Get or set cache with automatic refresh
 */
export async function getOrSetCache<T>(
  category: CacheCategory,
  key: string,
  fetchFn: () => Promise<T>
): Promise<{ data: T; cached: boolean; duration: number }> {
  const startTime = Date.now();
  
  // Try to get from cache first
  const cached = await getCache<T>(category, key);
  if (cached) {
    return {
      data: cached,
      cached: true,
      duration: Date.now() - startTime,
    };
  }

  // Fetch fresh data
  const data = await fetchFn();
  
  // Cache the result
  await setCache(category, key, data);
  
  return {
    data,
    cached: false,
    duration: Date.now() - startTime,
  };
}

/**
 * Pre-warm cache with commonly accessed data
 */
export async function warmCache(): Promise<void> {
  console.log("[Cache] Starting cache warm-up...");
  
  // Import data
  const { players, clubs, leagues, kpis } = await import("@/data");
  
  // Cache all players
  for (const player of players) {
    await setCache("players", player.id, player);
  }
  
  // Cache all clubs
  for (const club of clubs) {
    await setCache("clubs", club.id, club);
  }
  
  // Cache all leagues
  for (const league of leagues) {
    await setCache("leagues", league.id, league);
  }
  
  // Cache KPIs
  await setCache("kpis", "all", kpis);
  
  console.log("[Cache] Cache warm-up complete!");
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
  connected: boolean;
  keys: number;
  memoryUsage?: string;
}> {
  if (!redis) {
    return { connected: false, keys: 0 };
  }

  try {
    const keys = await redis.keys("*");
    return {
      connected: true,
      keys: keys.length,
    };
  } catch (error) {
    return { connected: false, keys: 0 };
  }
}

export { redis };
