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
 * Calculate KPIs
 */
export const kpis = [
  {
    id: "total-market-value",
    name: "Total Market Value",
    value: clubs.reduce((sum, c) => sum + c.marketValue, 0),
    previousValue: clubs.reduce((sum, c) => sum + c.marketValue, 0) * 0.92,
    unit: "currency",
    category: "financial",
    trend: "up" as const,
    target: 45_000_000_000,
  },
  {
    id: "global-fan-base",
    name: "Global Fan Base",
    value: fanSegments.reduce((sum, s) => sum + s.totalFans, 0),
    previousValue: fanSegments.reduce((sum, s) => sum + s.totalFans, 0) * 0.95,
    unit: "number",
    category: "engagement",
    trend: "up" as const,
    target: 3_000_000_000,
  },
  {
    id: "total-revenue",
    name: "Total Revenue",
    value: clubs.reduce((sum, c) => sum + c.revenue, 0),
    previousValue: clubs.reduce((sum, c) => sum + c.revenue, 0) * 0.88,
    unit: "currency",
    category: "financial",
    trend: "up" as const,
    target: 12_000_000_000,
  },
  {
    id: "avg-player-value",
    name: "Avg Player Value",
    value: players.reduce((sum, p) => sum + p.marketValue, 0) / players.length,
    previousValue: (players.reduce((sum, p) => sum + p.marketValue, 0) / players.length) * 0.91,
    unit: "currency",
    category: "market",
    trend: "up" as const,
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
