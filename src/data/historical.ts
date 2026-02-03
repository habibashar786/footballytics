/**
 * FOOTBALLYTICS - HISTORICAL DATA (5 YEARS)
 * ==========================================
 * 
 * Time series data for:
 * - Market valuations (2020-2025)
 * - Transfer volumes
 * - Fan engagement
 * - Revenue trends
 */

export interface HistoricalDataPoint {
  year: number;
  season: string;
  value: number;
  change?: number;
}

export interface LeagueHistory {
  leagueId: string;
  marketValue: HistoricalDataPoint[];
  totalRevenue: HistoricalDataPoint[];
  mediaRights: HistoricalDataPoint[];
  attendance: HistoricalDataPoint[];
  transferSpending: HistoricalDataPoint[];
}

export interface ClubHistory {
  clubId: string;
  marketValue: HistoricalDataPoint[];
  revenue: HistoricalDataPoint[];
  wageRatio: HistoricalDataPoint[];
  leaguePosition: HistoricalDataPoint[];
}

// =============================================================================
// LEAGUE HISTORICAL DATA
// =============================================================================

export const leagueHistory: LeagueHistory[] = [
  // Premier League
  {
    leagueId: "premier-league",
    marketValue: [
      { year: 2020, season: "2019-20", value: 9_200_000_000, change: 0 },
      { year: 2021, season: "2020-21", value: 8_500_000_000, change: -7.6 },
      { year: 2022, season: "2021-22", value: 9_800_000_000, change: 15.3 },
      { year: 2023, season: "2022-23", value: 10_500_000_000, change: 7.1 },
      { year: 2024, season: "2023-24", value: 10_900_000_000, change: 3.8 },
      { year: 2025, season: "2024-25", value: 11_200_000_000, change: 2.8 },
    ],
    totalRevenue: [
      { year: 2020, season: "2019-20", value: 5_200_000_000 },
      { year: 2021, season: "2020-21", value: 4_500_000_000 },
      { year: 2022, season: "2021-22", value: 5_500_000_000 },
      { year: 2023, season: "2022-23", value: 6_100_000_000 },
      { year: 2024, season: "2023-24", value: 6_800_000_000 },
      { year: 2025, season: "2024-25", value: 7_200_000_000 },
    ],
    mediaRights: [
      { year: 2020, season: "2019-20", value: 3_100_000_000 },
      { year: 2021, season: "2020-21", value: 3_100_000_000 },
      { year: 2022, season: "2021-22", value: 4_500_000_000 },
      { year: 2023, season: "2022-23", value: 4_800_000_000 },
      { year: 2024, season: "2023-24", value: 5_000_000_000 },
      { year: 2025, season: "2024-25", value: 5_000_000_000 },
    ],
    attendance: [
      { year: 2020, season: "2019-20", value: 14_500_000 },
      { year: 2021, season: "2020-21", value: 0 },
      { year: 2022, season: "2021-22", value: 15_200_000 },
      { year: 2023, season: "2022-23", value: 15_800_000 },
      { year: 2024, season: "2023-24", value: 16_200_000 },
      { year: 2025, season: "2024-25", value: 16_500_000 },
    ],
    transferSpending: [
      { year: 2020, season: "2019-20", value: 1_400_000_000 },
      { year: 2021, season: "2020-21", value: 1_100_000_000 },
      { year: 2022, season: "2021-22", value: 1_900_000_000 },
      { year: 2023, season: "2022-23", value: 2_800_000_000 },
      { year: 2024, season: "2023-24", value: 2_200_000_000 },
      { year: 2025, season: "2024-25", value: 2_400_000_000 },
    ],
  },
  // La Liga
  {
    leagueId: "la-liga",
    marketValue: [
      { year: 2020, season: "2019-20", value: 5_100_000_000, change: 0 },
      { year: 2021, season: "2020-21", value: 4_600_000_000, change: -9.8 },
      { year: 2022, season: "2021-22", value: 4_900_000_000, change: 6.5 },
      { year: 2023, season: "2022-23", value: 5_400_000_000, change: 10.2 },
      { year: 2024, season: "2023-24", value: 5_600_000_000, change: 3.7 },
      { year: 2025, season: "2024-25", value: 5_800_000_000, change: 3.6 },
    ],
    totalRevenue: [
      { year: 2020, season: "2019-20", value: 3_400_000_000 },
      { year: 2021, season: "2020-21", value: 2_900_000_000 },
      { year: 2022, season: "2021-22", value: 3_200_000_000 },
      { year: 2023, season: "2022-23", value: 3_600_000_000 },
      { year: 2024, season: "2023-24", value: 3_900_000_000 },
      { year: 2025, season: "2024-25", value: 4_100_000_000 },
    ],
    mediaRights: [
      { year: 2020, season: "2019-20", value: 1_500_000_000 },
      { year: 2021, season: "2020-21", value: 1_500_000_000 },
      { year: 2022, season: "2021-22", value: 1_700_000_000 },
      { year: 2023, season: "2022-23", value: 1_800_000_000 },
      { year: 2024, season: "2023-24", value: 1_900_000_000 },
      { year: 2025, season: "2024-25", value: 1_900_000_000 },
    ],
    attendance: [
      { year: 2020, season: "2019-20", value: 10_200_000 },
      { year: 2021, season: "2020-21", value: 0 },
      { year: 2022, season: "2021-22", value: 9_800_000 },
      { year: 2023, season: "2022-23", value: 10_500_000 },
      { year: 2024, season: "2023-24", value: 10_800_000 },
      { year: 2025, season: "2024-25", value: 11_000_000 },
    ],
    transferSpending: [
      { year: 2020, season: "2019-20", value: 1_100_000_000 },
      { year: 2021, season: "2020-21", value: 400_000_000 },
      { year: 2022, season: "2021-22", value: 600_000_000 },
      { year: 2023, season: "2022-23", value: 800_000_000 },
      { year: 2024, season: "2023-24", value: 750_000_000 },
      { year: 2025, season: "2024-25", value: 900_000_000 },
    ],
  },
  // Saudi Pro League
  {
    leagueId: "saudi-pro",
    marketValue: [
      { year: 2020, season: "2019-20", value: 180_000_000, change: 0 },
      { year: 2021, season: "2020-21", value: 190_000_000, change: 5.6 },
      { year: 2022, season: "2021-22", value: 210_000_000, change: 10.5 },
      { year: 2023, season: "2022-23", value: 450_000_000, change: 114.3 },
      { year: 2024, season: "2023-24", value: 950_000_000, change: 111.1 },
      { year: 2025, season: "2024-25", value: 1_200_000_000, change: 26.3 },
    ],
    totalRevenue: [
      { year: 2020, season: "2019-20", value: 120_000_000 },
      { year: 2021, season: "2020-21", value: 130_000_000 },
      { year: 2022, season: "2021-22", value: 150_000_000 },
      { year: 2023, season: "2022-23", value: 280_000_000 },
      { year: 2024, season: "2023-24", value: 450_000_000 },
      { year: 2025, season: "2024-25", value: 600_000_000 },
    ],
    mediaRights: [
      { year: 2020, season: "2019-20", value: 80_000_000 },
      { year: 2021, season: "2020-21", value: 100_000_000 },
      { year: 2022, season: "2021-22", value: 150_000_000 },
      { year: 2023, season: "2022-23", value: 350_000_000 },
      { year: 2024, season: "2023-24", value: 450_000_000 },
      { year: 2025, season: "2024-25", value: 500_000_000 },
    ],
    attendance: [
      { year: 2020, season: "2019-20", value: 1_200_000 },
      { year: 2021, season: "2020-21", value: 0 },
      { year: 2022, season: "2021-22", value: 1_800_000 },
      { year: 2023, season: "2022-23", value: 3_500_000 },
      { year: 2024, season: "2023-24", value: 5_200_000 },
      { year: 2025, season: "2024-25", value: 6_000_000 },
    ],
    transferSpending: [
      { year: 2020, season: "2019-20", value: 50_000_000 },
      { year: 2021, season: "2020-21", value: 60_000_000 },
      { year: 2022, season: "2021-22", value: 80_000_000 },
      { year: 2023, season: "2022-23", value: 850_000_000 },
      { year: 2024, season: "2023-24", value: 950_000_000 },
      { year: 2025, season: "2024-25", value: 400_000_000 },
    ],
  },
  // Egyptian Premier League
  {
    leagueId: "egyptian-premier",
    marketValue: [
      { year: 2020, season: "2019-20", value: 150_000_000, change: 0 },
      { year: 2021, season: "2020-21", value: 140_000_000, change: -6.7 },
      { year: 2022, season: "2021-22", value: 155_000_000, change: 10.7 },
      { year: 2023, season: "2022-23", value: 165_000_000, change: 6.5 },
      { year: 2024, season: "2023-24", value: 175_000_000, change: 6.1 },
      { year: 2025, season: "2024-25", value: 180_000_000, change: 2.9 },
    ],
    totalRevenue: [
      { year: 2020, season: "2019-20", value: 45_000_000 },
      { year: 2021, season: "2020-21", value: 40_000_000 },
      { year: 2022, season: "2021-22", value: 50_000_000 },
      { year: 2023, season: "2022-23", value: 58_000_000 },
      { year: 2024, season: "2023-24", value: 62_000_000 },
      { year: 2025, season: "2024-25", value: 68_000_000 },
    ],
    mediaRights: [
      { year: 2020, season: "2019-20", value: 50_000_000 },
      { year: 2021, season: "2020-21", value: 55_000_000 },
      { year: 2022, season: "2021-22", value: 58_000_000 },
      { year: 2023, season: "2022-23", value: 60_000_000 },
      { year: 2024, season: "2023-24", value: 63_000_000 },
      { year: 2025, season: "2024-25", value: 65_000_000 },
    ],
    attendance: [
      { year: 2020, season: "2019-20", value: 2_500_000 },
      { year: 2021, season: "2020-21", value: 0 },
      { year: 2022, season: "2021-22", value: 2_800_000 },
      { year: 2023, season: "2022-23", value: 3_200_000 },
      { year: 2024, season: "2023-24", value: 3_500_000 },
      { year: 2025, season: "2024-25", value: 3_800_000 },
    ],
    transferSpending: [
      { year: 2020, season: "2019-20", value: 15_000_000 },
      { year: 2021, season: "2020-21", value: 12_000_000 },
      { year: 2022, season: "2021-22", value: 18_000_000 },
      { year: 2023, season: "2022-23", value: 22_000_000 },
      { year: 2024, season: "2023-24", value: 25_000_000 },
      { year: 2025, season: "2024-25", value: 28_000_000 },
    ],
  },
];

// =============================================================================
// CLUB HISTORICAL DATA
// =============================================================================

export const clubHistory: ClubHistory[] = [
  // Manchester City
  {
    clubId: "man-city",
    marketValue: [
      { year: 2020, season: "2019-20", value: 1_020_000_000 },
      { year: 2021, season: "2020-21", value: 980_000_000 },
      { year: 2022, season: "2021-22", value: 1_100_000_000 },
      { year: 2023, season: "2022-23", value: 1_280_000_000 },
      { year: 2024, season: "2023-24", value: 1_320_000_000 },
      { year: 2025, season: "2024-25", value: 1_340_000_000 },
    ],
    revenue: [
      { year: 2020, season: "2019-20", value: 549_000_000 },
      { year: 2021, season: "2020-21", value: 569_000_000 },
      { year: 2022, season: "2021-22", value: 619_000_000 },
      { year: 2023, season: "2022-23", value: 679_000_000 },
      { year: 2024, season: "2023-24", value: 715_000_000 },
      { year: 2025, season: "2024-25", value: 730_000_000 },
    ],
    wageRatio: [
      { year: 2020, season: "2019-20", value: 0.58 },
      { year: 2021, season: "2020-21", value: 0.62 },
      { year: 2022, season: "2021-22", value: 0.60 },
      { year: 2023, season: "2022-23", value: 0.61 },
      { year: 2024, season: "2023-24", value: 0.62 },
      { year: 2025, season: "2024-25", value: 0.62 },
    ],
    leaguePosition: [
      { year: 2020, season: "2019-20", value: 2 },
      { year: 2021, season: "2020-21", value: 1 },
      { year: 2022, season: "2021-22", value: 1 },
      { year: 2023, season: "2022-23", value: 1 },
      { year: 2024, season: "2023-24", value: 1 },
      { year: 2025, season: "2024-25", value: 1 },
    ],
  },
  // Al-Hilal
  {
    clubId: "al-hilal",
    marketValue: [
      { year: 2020, season: "2019-20", value: 35_000_000 },
      { year: 2021, season: "2020-21", value: 38_000_000 },
      { year: 2022, season: "2021-22", value: 42_000_000 },
      { year: 2023, season: "2022-23", value: 180_000_000 },
      { year: 2024, season: "2023-24", value: 320_000_000 },
      { year: 2025, season: "2024-25", value: 340_000_000 },
    ],
    revenue: [
      { year: 2020, season: "2019-20", value: 28_000_000 },
      { year: 2021, season: "2020-21", value: 32_000_000 },
      { year: 2022, season: "2021-22", value: 38_000_000 },
      { year: 2023, season: "2022-23", value: 95_000_000 },
      { year: 2024, season: "2023-24", value: 155_000_000 },
      { year: 2025, season: "2024-25", value: 180_000_000 },
    ],
    wageRatio: [
      { year: 2020, season: "2019-20", value: 0.45 },
      { year: 2021, season: "2020-21", value: 0.48 },
      { year: 2022, season: "2021-22", value: 0.52 },
      { year: 2023, season: "2022-23", value: 0.78 },
      { year: 2024, season: "2023-24", value: 0.82 },
      { year: 2025, season: "2024-25", value: 0.85 },
    ],
    leaguePosition: [
      { year: 2020, season: "2019-20", value: 1 },
      { year: 2021, season: "2020-21", value: 1 },
      { year: 2022, season: "2021-22", value: 2 },
      { year: 2023, season: "2022-23", value: 1 },
      { year: 2024, season: "2023-24", value: 1 },
      { year: 2025, season: "2024-25", value: 1 },
    ],
  },
  // Al Ahly Cairo
  {
    clubId: "al-ahly-cairo",
    marketValue: [
      { year: 2020, season: "2019-20", value: 42_000_000 },
      { year: 2021, season: "2020-21", value: 48_000_000 },
      { year: 2022, season: "2021-22", value: 55_000_000 },
      { year: 2023, season: "2022-23", value: 58_000_000 },
      { year: 2024, season: "2023-24", value: 62_000_000 },
      { year: 2025, season: "2024-25", value: 65_000_000 },
    ],
    revenue: [
      { year: 2020, season: "2019-20", value: 32_000_000 },
      { year: 2021, season: "2020-21", value: 35_000_000 },
      { year: 2022, season: "2021-22", value: 38_000_000 },
      { year: 2023, season: "2022-23", value: 42_000_000 },
      { year: 2024, season: "2023-24", value: 44_000_000 },
      { year: 2025, season: "2024-25", value: 45_000_000 },
    ],
    wageRatio: [
      { year: 2020, season: "2019-20", value: 0.52 },
      { year: 2021, season: "2020-21", value: 0.54 },
      { year: 2022, season: "2021-22", value: 0.53 },
      { year: 2023, season: "2022-23", value: 0.55 },
      { year: 2024, season: "2023-24", value: 0.54 },
      { year: 2025, season: "2024-25", value: 0.55 },
    ],
    leaguePosition: [
      { year: 2020, season: "2019-20", value: 1 },
      { year: 2021, season: "2020-21", value: 1 },
      { year: 2022, season: "2021-22", value: 1 },
      { year: 2023, season: "2022-23", value: 1 },
      { year: 2024, season: "2023-24", value: 1 },
      { year: 2025, season: "2024-25", value: 1 },
    ],
  },
];

// =============================================================================
// GLOBAL MARKET TRENDS
// =============================================================================

export const globalMarketTrends = {
  totalMarketValue: [
    { year: 2020, value: 28_500_000_000 },
    { year: 2021, value: 25_800_000_000 },
    { year: 2022, value: 30_200_000_000 },
    { year: 2023, value: 34_500_000_000 },
    { year: 2024, value: 38_200_000_000 },
    { year: 2025, value: 42_100_000_000 },
  ],
  totalTransferSpending: [
    { year: 2020, value: 5_200_000_000 },
    { year: 2021, value: 3_800_000_000 },
    { year: 2022, value: 6_100_000_000 },
    { year: 2023, value: 8_500_000_000 },
    { year: 2024, value: 7_200_000_000 },
    { year: 2025, value: 7_800_000_000 },
  ],
  averageTransferFee: [
    { year: 2020, value: 8_500_000 },
    { year: 2021, value: 7_200_000 },
    { year: 2022, value: 9_800_000 },
    { year: 2023, value: 12_500_000 },
    { year: 2024, value: 11_800_000 },
    { year: 2025, value: 12_200_000 },
  ],
};

// Export helpers
export const getLeagueHistory = (leagueId: string) => 
  leagueHistory.find(h => h.leagueId === leagueId);

export const getClubHistory = (clubId: string) => 
  clubHistory.find(h => h.clubId === clubId);

export const getMarketTrend = (metric: keyof typeof globalMarketTrends) =>
  globalMarketTrends[metric];
