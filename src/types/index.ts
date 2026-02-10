/**
 * FOOTBALLYTICS - TYPE DEFINITIONS
 * =================================
 * 
 * Comprehensive TypeScript types for all entities
 */

// =============================================================================
// CORE ENTITIES
// =============================================================================

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
  founded: number;
  totalClubs: number;
  marketValue: number;
  mediaRightsValue: number;
  globalFanBase: number;
  competitiveBalanceIndex: number;
}

export interface Club {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  leagueId: string;
  founded: number;
  stadium: string;
  capacity: number;
  owner: string;
  marketValue: number;
  revenue: number;
  wageRatio: number;
  trophies: number;
  globalRanking: number;
  brandIndex: number;
}

export interface Player {
  id: string;
  name: string;
  shortName: string;
  photo: string;
  nationality: string;
  nationalityFlag: string;
  position: string;
  positionCategory: "FWD" | "MID" | "DEF" | "GK";
  age: number;
  clubId: string;
  clubName: string;
  clubLogo: string;
  jerseyNumber: number;
  marketValue: number;
  marketValueTrend: "up" | "down" | "stable";
  contractExpiry: string;
  stats: PlayerStats;
  socialFollowers: number;
  brandScore: number;
}

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  minutesPlayed: number;
  xG: number;
  xA: number;
  passAccuracy: number;
  tacklesWon: number;
  aerialDuelsWon: number;
  cleanSheets?: number;
  saves?: number;
  rating: number;
}

// =============================================================================
// FAN & ENGAGEMENT
// =============================================================================

export interface FanSegment {
  id: string;
  region: string;
  totalFans: number;
  engagementScore: number;
  merchandiseRevenue: number;
  loyaltyIndex: number;
  averageAge: number;
  digitalEngagement: number;
}

// =============================================================================
// FINANCIAL & INVESTMENT
// =============================================================================

export interface Shareholder {
  id: string;
  name: string;
  type: "individual" | "company" | "fund" | "state";
  clubs: string[];
  totalInvestment: number;
  portfolioValue: number;
  roi: number;
  country: string;
}

// =============================================================================
// TOURNAMENTS & EVENTS
// =============================================================================

export interface Tournament {
  id: string;
  name: string;
  type: "club" | "international" | "continental";
  startDate: string;
  endDate: string;
  location: string;
  teams: number;
  prizePool: number;
  economicImpact: number;
  status: "upcoming" | "active" | "completed";
}

// =============================================================================
// ANALYTICS & KPIs
// =============================================================================

export interface KPI {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  unit: "number" | "currency" | "percentage";
  category: string;
  trend: "up" | "down" | "neutral";
  target?: number;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: number | string;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
  icon?: string;
  color?: "gold" | "green" | "blue" | "purple" | "red";
}

// =============================================================================
// TRANSFERS
// =============================================================================

export interface Transfer {
  id: string;
  playerId: string;
  playerName: string;
  fromClubId: string;
  fromClubName: string;
  toClubId: string;
  toClubName: string;
  fee: number;
  date: string;
  type: "permanent" | "loan" | "free";
  season: string;
}

// =============================================================================
// HISTORICAL DATA
// =============================================================================

export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  category?: string;
  color?: string;
}

// =============================================================================
// MULTI-AGENT SYSTEM
// =============================================================================

export interface AgentResult<T = unknown> {
  agent: string;
  status: "success" | "error" | "pending" | "running";
  data: T;
  duration: number;
  cached: boolean;
  timestamp: Date;
  error?: string;
}

export interface AgentStreamEvent {
  type: "start" | "progress" | "complete" | "error";
  agent: string;
  message: string;
  data?: unknown;
  timestamp: Date;
}

// =============================================================================
// API RESPONSES
// =============================================================================

export interface APIResponse<T> {
  data: T;
  meta: {
    total: number;
    page?: number;
    pageSize?: number;
    cached?: boolean;
    duration?: number;
    timestamp: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  meta: APIResponse<T>["meta"] & {
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// =============================================================================
// SEARCH & FILTERS
// =============================================================================

export interface SearchFilters {
  query?: string;
  league?: string;
  club?: string;
  position?: string;
  minValue?: number;
  maxValue?: number;
  minAge?: number;
  maxAge?: number;
  nationality?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  filters: SearchFilters;
  suggestions?: string[];
}

// =============================================================================
// USER & AUTH
// =============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  subscription: SubscriptionTier;
  subscriptionStatus: SubscriptionStatus;
  subscriptionExpiry?: Date;
  stripeCustomerId?: string;
  createdAt: Date;
  lastLoginAt?: Date;
  preferences: UserPreferences;
}

export type UserRole = "user" | "admin" | "super_admin";
export type SubscriptionTier = "free" | "starter" | "pro" | "enterprise";
export type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled" | "expired";

export interface Subscription {
  id: string;
  tier: SubscriptionTier;
  name: string;
  price: number;
  priceYearly: number;
  currency: string;
  features: SubscriptionFeature[];
  limits: SubscriptionLimits;
  popular?: boolean;
}

export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
}

export interface SubscriptionLimits {
  playersView: number | "unlimited";
  clubsView: number | "unlimited";
  leaguesView: number | "unlimited";
  reportsPerMonth: number | "unlimited";
  apiCallsPerDay: number | "unlimited";
  historicalDataYears: number;
  exportFormats: string[];
  aiInsightsPerDay: number | "unlimited";
  customDashboards: number | "unlimited";
  teamMembers: number | "unlimited";
}

export interface AccessControl {
  canViewPlayers: boolean;
  canViewClubs: boolean;
  canViewLeagues: boolean;
  canViewAnalytics: boolean;
  canViewInvestors: boolean;
  canViewReports: boolean;
  canExportData: boolean;
  canUseAI: boolean;
  canAccessAPI: boolean;
  canManageUsers: boolean;
  canManageSettings: boolean;
  canViewAdminPanel: boolean;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  favoriteLeagues: string[];
  favoriteClubs: string[];
  favoritePlayers: string[];
  notifications: {
    transfers: boolean;
    matches: boolean;
    news: boolean;
  };
}

// =============================================================================
// CHART TYPES
// =============================================================================

export interface RadarChartData {
  subject: string;
  value: number;
  fullMark: number;
}

export interface LineChartData {
  name: string;
  [key: string]: number | string;
}

export interface BarChartData {
  name: string;
  value: number;
  color?: string;
}

export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}
