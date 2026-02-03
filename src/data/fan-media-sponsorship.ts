/**
 * FOOTBALLYTICS - FAN, MEDIA & SPONSORSHIP DATA
 * ==============================================
 * 
 * Comprehensive data for:
 * - Fan demographics by region
 * - Social media metrics
 * - Media rights deals
 * - Sponsorship contracts
 */

import { FanSegment } from "@/types";

// =============================================================================
// FAN SEGMENTS BY REGION
// =============================================================================

export const fanSegments: FanSegment[] = [
  {
    id: "europe",
    region: "Europe",
    totalFans: 450_000_000,
    engagementScore: 92,
    merchandiseRevenue: 4_200_000_000,
    loyaltyIndex: 88,
    averageAge: 38,
    digitalEngagement: 85,
  },
  {
    id: "asia",
    region: "Asia",
    totalFans: 1_200_000_000,
    engagementScore: 76,
    merchandiseRevenue: 2_800_000_000,
    loyaltyIndex: 72,
    averageAge: 28,
    digitalEngagement: 92,
  },
  {
    id: "americas",
    region: "Americas",
    totalFans: 380_000_000,
    engagementScore: 81,
    merchandiseRevenue: 1_500_000_000,
    loyaltyIndex: 78,
    averageAge: 32,
    digitalEngagement: 88,
  },
  {
    id: "africa",
    region: "Africa",
    totalFans: 400_000_000,
    engagementScore: 88,
    merchandiseRevenue: 450_000_000,
    loyaltyIndex: 91,
    averageAge: 24,
    digitalEngagement: 78,
  },
  {
    id: "middle-east",
    region: "Middle East",
    totalFans: 180_000_000,
    engagementScore: 84,
    merchandiseRevenue: 850_000_000,
    loyaltyIndex: 82,
    averageAge: 30,
    digitalEngagement: 90,
  },
  {
    id: "oceania",
    region: "Oceania",
    totalFans: 25_000_000,
    engagementScore: 78,
    merchandiseRevenue: 180_000_000,
    loyaltyIndex: 75,
    averageAge: 35,
    digitalEngagement: 82,
  },
];

// =============================================================================
// SOCIAL MEDIA DATA
// =============================================================================

export interface SocialMediaMetrics {
  clubId: string;
  clubName: string;
  followers: {
    instagram: number;
    facebook: number;
    twitter: number;
    tiktok: number;
    youtube: number;
    total: number;
  };
  engagement: {
    averageLikes: number;
    averageComments: number;
    engagementRate: number;
  };
  growth: {
    monthlyGrowth: number;
    yearlyGrowth: number;
  };
}

export const socialMediaData: SocialMediaMetrics[] = [
  {
    clubId: "real-madrid",
    clubName: "Real Madrid",
    followers: {
      instagram: 160_000_000,
      facebook: 118_000_000,
      twitter: 45_000_000,
      tiktok: 32_000_000,
      youtube: 18_000_000,
      total: 373_000_000,
    },
    engagement: {
      averageLikes: 2_500_000,
      averageComments: 45_000,
      engagementRate: 3.2,
    },
    growth: {
      monthlyGrowth: 1.8,
      yearlyGrowth: 15.2,
    },
  },
  {
    clubId: "barcelona",
    clubName: "FC Barcelona",
    followers: {
      instagram: 130_000_000,
      facebook: 104_000_000,
      twitter: 40_000_000,
      tiktok: 28_000_000,
      youtube: 15_000_000,
      total: 317_000_000,
    },
    engagement: {
      averageLikes: 2_200_000,
      averageComments: 38_000,
      engagementRate: 2.9,
    },
    growth: {
      monthlyGrowth: 1.5,
      yearlyGrowth: 12.8,
    },
  },
  {
    clubId: "man-utd",
    clubName: "Manchester United",
    followers: {
      instagram: 65_000_000,
      facebook: 75_000_000,
      twitter: 32_000_000,
      tiktok: 22_000_000,
      youtube: 12_000_000,
      total: 206_000_000,
    },
    engagement: {
      averageLikes: 1_200_000,
      averageComments: 28_000,
      engagementRate: 2.5,
    },
    growth: {
      monthlyGrowth: 1.2,
      yearlyGrowth: 10.5,
    },
  },
  {
    clubId: "al-hilal",
    clubName: "Al-Hilal SFC",
    followers: {
      instagram: 12_000_000,
      facebook: 8_000_000,
      twitter: 6_500_000,
      tiktok: 5_000_000,
      youtube: 2_500_000,
      total: 34_000_000,
    },
    engagement: {
      averageLikes: 450_000,
      averageComments: 12_000,
      engagementRate: 4.2,
    },
    growth: {
      monthlyGrowth: 8.5,
      yearlyGrowth: 85.2,
    },
  },
  {
    clubId: "al-nassr",
    clubName: "Al-Nassr FC",
    followers: {
      instagram: 18_000_000,
      facebook: 5_500_000,
      twitter: 4_800_000,
      tiktok: 8_000_000,
      youtube: 3_500_000,
      total: 39_800_000,
    },
    engagement: {
      averageLikes: 800_000,
      averageComments: 25_000,
      engagementRate: 5.8,
    },
    growth: {
      monthlyGrowth: 12.5,
      yearlyGrowth: 320.0,
    },
  },
  {
    clubId: "al-ahly-cairo",
    clubName: "Al Ahly SC",
    followers: {
      instagram: 15_000_000,
      facebook: 28_000_000,
      twitter: 8_500_000,
      tiktok: 4_200_000,
      youtube: 2_800_000,
      total: 58_500_000,
    },
    engagement: {
      averageLikes: 380_000,
      averageComments: 15_000,
      engagementRate: 3.5,
    },
    growth: {
      monthlyGrowth: 2.2,
      yearlyGrowth: 18.5,
    },
  },
];

// =============================================================================
// MEDIA RIGHTS DEALS
// =============================================================================

export interface MediaRightsDeal {
  leagueId: string;
  leagueName: string;
  broadcaster: string;
  region: string;
  annualValue: number;
  startYear: number;
  endYear: number;
  type: "domestic" | "international";
}

export const mediaRightsDeals: MediaRightsDeal[] = [
  // Premier League
  {
    leagueId: "premier-league",
    leagueName: "Premier League",
    broadcaster: "Sky Sports / TNT Sports",
    region: "UK",
    annualValue: 1_880_000_000,
    startYear: 2025,
    endYear: 2029,
    type: "domestic",
  },
  {
    leagueId: "premier-league",
    leagueName: "Premier League",
    broadcaster: "NBC Sports",
    region: "USA",
    annualValue: 450_000_000,
    startYear: 2022,
    endYear: 2028,
    type: "international",
  },
  {
    leagueId: "premier-league",
    leagueName: "Premier League",
    broadcaster: "beIN Sports",
    region: "Middle East & North Africa",
    annualValue: 500_000_000,
    startYear: 2022,
    endYear: 2025,
    type: "international",
  },
  // La Liga
  {
    leagueId: "la-liga",
    leagueName: "La Liga",
    broadcaster: "Movistar+",
    region: "Spain",
    annualValue: 990_000_000,
    startYear: 2022,
    endYear: 2027,
    type: "domestic",
  },
  {
    leagueId: "la-liga",
    leagueName: "La Liga",
    broadcaster: "ESPN+",
    region: "USA",
    annualValue: 175_000_000,
    startYear: 2021,
    endYear: 2029,
    type: "international",
  },
  // Saudi Pro League
  {
    leagueId: "saudi-pro",
    leagueName: "Saudi Pro League",
    broadcaster: "SSC",
    region: "Saudi Arabia",
    annualValue: 180_000_000,
    startYear: 2023,
    endYear: 2028,
    type: "domestic",
  },
  {
    leagueId: "saudi-pro",
    leagueName: "Saudi Pro League",
    broadcaster: "Various (Global)",
    region: "International",
    annualValue: 320_000_000,
    startYear: 2023,
    endYear: 2028,
    type: "international",
  },
  // Egyptian Premier League
  {
    leagueId: "egyptian-premier",
    leagueName: "Egyptian Premier League",
    broadcaster: "ON Sport",
    region: "Egypt",
    annualValue: 35_000_000,
    startYear: 2023,
    endYear: 2026,
    type: "domestic",
  },
];

// =============================================================================
// SPONSORSHIP DATA
// =============================================================================

export interface Sponsorship {
  clubId: string;
  clubName: string;
  sponsor: string;
  type: "kit" | "stadium" | "sleeve" | "training" | "regional" | "crypto";
  annualValue: number;
  startYear: number;
  endYear: number;
  industry: string;
}

export const sponsorships: Sponsorship[] = [
  // Real Madrid
  {
    clubId: "real-madrid",
    clubName: "Real Madrid",
    sponsor: "Adidas",
    type: "kit",
    annualValue: 120_000_000,
    startYear: 2020,
    endYear: 2028,
    industry: "Sportswear",
  },
  {
    clubId: "real-madrid",
    clubName: "Real Madrid",
    sponsor: "Emirates",
    type: "kit",
    annualValue: 70_000_000,
    startYear: 2017,
    endYear: 2026,
    industry: "Aviation",
  },
  // Manchester City
  {
    clubId: "man-city",
    clubName: "Manchester City",
    sponsor: "Puma",
    type: "kit",
    annualValue: 75_000_000,
    startYear: 2019,
    endYear: 2029,
    industry: "Sportswear",
  },
  {
    clubId: "man-city",
    clubName: "Manchester City",
    sponsor: "Etihad Airways",
    type: "stadium",
    annualValue: 67_500_000,
    startYear: 2011,
    endYear: 2031,
    industry: "Aviation",
  },
  // Barcelona
  {
    clubId: "barcelona",
    clubName: "FC Barcelona",
    sponsor: "Nike",
    type: "kit",
    annualValue: 105_000_000,
    startYear: 2018,
    endYear: 2028,
    industry: "Sportswear",
  },
  {
    clubId: "barcelona",
    clubName: "FC Barcelona",
    sponsor: "Spotify",
    type: "kit",
    annualValue: 70_000_000,
    startYear: 2022,
    endYear: 2026,
    industry: "Technology",
  },
  // Al-Hilal
  {
    clubId: "al-hilal",
    clubName: "Al-Hilal SFC",
    sponsor: "Nike",
    type: "kit",
    annualValue: 15_000_000,
    startYear: 2022,
    endYear: 2027,
    industry: "Sportswear",
  },
  {
    clubId: "al-hilal",
    clubName: "Al-Hilal SFC",
    sponsor: "Mobily",
    type: "kit",
    annualValue: 25_000_000,
    startYear: 2023,
    endYear: 2026,
    industry: "Telecommunications",
  },
  // Al-Nassr
  {
    clubId: "al-nassr",
    clubName: "Al-Nassr FC",
    sponsor: "Sela Sport",
    type: "kit",
    annualValue: 22_000_000,
    startYear: 2023,
    endYear: 2026,
    industry: "Sports Management",
  },
  // Al Ahly Cairo
  {
    clubId: "al-ahly-cairo",
    clubName: "Al Ahly SC",
    sponsor: "Adidas",
    type: "kit",
    annualValue: 5_000_000,
    startYear: 2020,
    endYear: 2025,
    industry: "Sportswear",
  },
  {
    clubId: "al-ahly-cairo",
    clubName: "Al Ahly SC",
    sponsor: "WE (Telecom Egypt)",
    type: "kit",
    annualValue: 8_000_000,
    startYear: 2022,
    endYear: 2025,
    industry: "Telecommunications",
  },
];

// =============================================================================
// AGGREGATE FUNCTIONS
// =============================================================================

export const getTotalGlobalFans = () => 
  fanSegments.reduce((sum, s) => sum + s.totalFans, 0);

export const getTotalMerchandiseRevenue = () =>
  fanSegments.reduce((sum, s) => sum + s.merchandiseRevenue, 0);

export const getClubSocialMedia = (clubId: string) =>
  socialMediaData.find(s => s.clubId === clubId);

export const getClubSponsorships = (clubId: string) =>
  sponsorships.filter(s => s.clubId === clubId);

export const getLeagueMediaRights = (leagueId: string) =>
  mediaRightsDeals.filter(d => d.leagueId === leagueId);

export const getTotalSponsorshipValue = (clubId: string) =>
  sponsorships
    .filter(s => s.clubId === clubId)
    .reduce((sum, s) => sum + s.annualValue, 0);
