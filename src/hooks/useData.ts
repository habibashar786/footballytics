import useSWR, { SWRConfiguration } from "swr";
import { Player, Club, League, KPI } from "@/types";

// Global fetcher
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
};

// SWR configuration for optimal caching
const defaultConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 60000, // Refresh every 60 seconds
  dedupingInterval: 5000, // Dedupe requests within 5 seconds
};

/**
 * Hook for fetching players with caching
 */
export function usePlayers(options?: {
  limit?: number;
  position?: string;
  club?: string;
  sortBy?: string;
}) {
  const params = new URLSearchParams();
  if (options?.limit) params.set("limit", options.limit.toString());
  if (options?.position) params.set("position", options.position);
  if (options?.club) params.set("club", options.club);
  if (options?.sortBy) params.set("sortBy", options.sortBy);

  const queryString = params.toString();
  const url = `/api/players${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR<{
    data: Player[];
    meta: { total: number; cached: boolean; duration: number };
  }>(url, fetcher, defaultConfig);

  return {
    players: data?.data || [],
    meta: data?.meta,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook for fetching clubs with caching
 */
export function useClubs(options?: {
  limit?: number;
  league?: string;
  sortBy?: string;
}) {
  const params = new URLSearchParams();
  if (options?.limit) params.set("limit", options.limit.toString());
  if (options?.league) params.set("league", options.league);
  if (options?.sortBy) params.set("sortBy", options.sortBy);

  const queryString = params.toString();
  const url = `/api/clubs${queryString ? `?${queryString}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR<{
    data: Club[];
    meta: { total: number; cached: boolean; duration: number };
  }>(url, fetcher, defaultConfig);

  return {
    clubs: data?.data || [],
    meta: data?.meta,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook for AI insights with streaming support
 */
export function useInsights(query: string, enabled: boolean = true) {
  const { data, error, isLoading, mutate } = useSWR(
    enabled ? `/api/insights?q=${encodeURIComponent(query)}` : null,
    async (url) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error("Failed to fetch insights");
      return res.json();
    },
    {
      ...defaultConfig,
      revalidateOnFocus: false,
      refreshInterval: 0, // Don't auto-refresh insights
    }
  );

  return {
    insights: data,
    isLoading,
    isError: error,
    mutate,
  };
}

/**
 * Hook for optimistic UI updates
 */
export function useOptimisticUpdate<T>(
  key: string,
  updateFn: (current: T, update: Partial<T>) => T
) {
  const { data, mutate } = useSWR<T>(key, fetcher, defaultConfig);

  const optimisticUpdate = async (update: Partial<T>, serverUpdate: () => Promise<T>) => {
    // Optimistically update the UI
    const optimisticData = data ? updateFn(data, update) : undefined;
    
    mutate(optimisticData, false);

    try {
      // Perform the actual update
      const newData = await serverUpdate();
      mutate(newData, false);
      return newData;
    } catch (error) {
      // Revert on error
      mutate(data, false);
      throw error;
    }
  };

  return {
    data,
    optimisticUpdate,
    mutate,
  };
}
