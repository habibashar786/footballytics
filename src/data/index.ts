/**
 * FOOTBALLYTICS - CENTRAL DATA EXPORT
 * ====================================
 */

// League & Club Data
export { 
  leagues, 
  clubs,
  getAllClubs,
  getClubsByLeague,
  getClubById,
} from "./leagues-clubs";

// Player Data
export {
  players,
  getAllPlayers,
  getPlayersByClub,
  getPlayerById,
  getTopPlayersByValue,
} from "./players";

// Historical Data
export {
  leagueHistory,
  clubHistory,
  globalMarketTrends,
  getLeagueHistory,
  getClubHistory,
  getMarketTrend,
} from "./historical";

// Fan, Media & Sponsorship Data
export {
  fanSegments,
  socialMediaData,
  mediaRightsDeals,
  sponsorships,
  getTotalGlobalFans,
  getTotalMerchandiseRevenue,
  getClubSocialMedia,
  getClubSponsorships,
  getLeagueMediaRights,
  getTotalSponsorshipValue,
} from "./fan-media-sponsorship";

// Types
import { leagues, clubs } from "./leagues-clubs";
import { players } from "./players";
import { fanSegments } from "./fan-media-sponsorship";

/**
 * Get league by ID
 */
export const getLeagueById = (id: string) => leagues.find(l => l.id === id);

/**
 * Get top clubs by market value
 */
export const getTopClubsByValue = (limit: number = 10) =>
  [...clubs].sort((a, b) => b.marketValue - a.marketValue).slice(0, limit);

/**
 * Get players by league
 */
export const getPlayersByLeague = (leagueId: string) => {
  const leagueClubIds = new Set(
    clubs.filter(c => c.leagueId === leagueId).map(c => c.id)
  );
  return players.filter(p => leagueClubIds.has(p.clubId));
};

/**
 * Calculate KPIs - Must have at least 6 items for dashboard
 */
export const kpis = [
  {
    id: "total-market-value",
    name: "Total Market Value",
    value: 42_100_000_000,
    previousValue: 38_200_000_000,
    unit: "currency",
    category: "financial",
    trend: "up" as const,
    target: 45_000_000_000,
  },
  {
    id: "total-players",
    name: "Total Players",
    value: 24500,
    previousValue: 23800,
    unit: "number",
    category: "engagement",
    trend: "up" as const,
    target: 25000,
  },
  {
    id: "global-fan-base",
    name: "Global Fan Base",
    value: 2_600_000_000,
    previousValue: 2_470_000_000,
    unit: "number",
    category: "engagement",
    trend: "up" as const,
    target: 3_000_000_000,
  },
  {
    id: "total-revenue",
    name: "Total Revenue",
    value: 9_800_000_000,
    previousValue: 8_624_000_000,
    unit: "currency",
    category: "financial",
    trend: "up" as const,
    target: 12_000_000_000,
  },
  {
    id: "avg-player-value",
    name: "Avg Player Value",
    value: 12_200_000,
    previousValue: 11_102_000,
    unit: "currency",
    category: "market",
    trend: "up" as const,
    target: 15_000_000,
  },
  {
    id: "transfer-volume",
    name: "Transfer Volume",
    value: 7_800_000_000,
    previousValue: 6_500_000_000,
    unit: "currency",
    category: "financial",
    trend: "up" as const,
    target: 10_000_000_000,
  },
];

/**
 * Tournaments
 */
export const tournaments = [
  {
    id: "world-cup-2026",
    name: "FIFA World Cup 2026",
    type: "international",
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    location: "USA / Canada / Mexico",
    teams: 48,
    prizePool: 1_000_000_000,
    economicImpact: 14_000_000_000,
    status: "upcoming",
  },
  {
    id: "ucl-2024-25",
    name: "UEFA Champions League 2024-25",
    type: "club",
    startDate: "2024-09-17",
    endDate: "2025-05-31",
    location: "Europe",
    teams: 36,
    prizePool: 2_500_000_000,
    economicImpact: 4_200_000_000,
    status: "active",
  },
];
