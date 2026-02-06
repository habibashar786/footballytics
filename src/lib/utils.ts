import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency with compact notation (B/M/K)
 * €1,200,000,000 → €1.2B
 * €180,000,000 → €180M
 * €1,500,000 → €1.5M
 */
export function formatCurrency(value: number, currency: string = "EUR"): string {
  const symbol = currency === "EUR" ? "€" : currency === "GBP" ? "£" : "$";
  
  if (value >= 1_000_000_000) {
    return `${symbol}${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${symbol}${(value / 1_000_000).toFixed(0)}M`;
  }
  if (value >= 1_000) {
    return `${symbol}${(value / 1_000).toFixed(0)}K`;
  }
  return `${symbol}${value.toLocaleString()}`;
}

/**
 * Format large currency for display with full precision when needed
 */
export function formatCurrencyFull(value: number, currency: string = "EUR"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format number with compact notation (B/M/K)
 * 1,500,000,000 → 1.5B
 * 450,000,000 → 450M
 */
export function formatNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toLocaleString();
}

/**
 * Format number with full precision
 */
export function formatNumberFull(value: number): string {
  return value.toLocaleString();
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function getChangeIndicator(current: number, previous: number): {
  value: number;
  direction: "up" | "down" | "neutral";
  label: string;
} {
  const change = ((current - previous) / previous) * 100;
  return {
    value: Math.abs(change),
    direction: change > 0 ? "up" : change < 0 ? "down" : "neutral",
    label: `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`,
  };
}

export function getRankStyle(rank: number): string {
  if (rank === 1) return "rank-gold";
  if (rank === 2) return "rank-silver";
  if (rank === 3) return "rank-bronze";
  return "bg-white/10 text-white";
}

/**
 * Generate placeholder image URL
 */
export function getPlaceholderImage(type: "player" | "club" | "league", name: string): string {
  const initial = name.charAt(0).toUpperCase();
  const colors = ["3B82F6", "10B981", "F59E0B", "EF4444", "8B5CF6", "EC4899"];
  const colorIndex = name.length % colors.length;
  const color = colors[colorIndex];
  
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initial)}&background=${color}&color=fff&size=128&bold=true`;
}
