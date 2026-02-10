/**
 * FOOTBALLYTICS - SUBSCRIPTION PLANS
 * ===================================
 * 
 * Subscription tiers and access control configuration
 * Ready for Stripe integration
 */

import { Subscription, SubscriptionTier, AccessControl, UserRole } from "@/types";

// =============================================================================
// SUBSCRIPTION PLANS
// =============================================================================

export const subscriptionPlans: Subscription[] = [
  {
    id: "free",
    tier: "free",
    name: "Free",
    price: 0,
    priceYearly: 0,
    currency: "USD",
    popular: false,
    features: [
      { id: "players-basic", name: "Basic Player Stats", description: "View top 20 players", included: true },
      { id: "clubs-basic", name: "Basic Club Info", description: "View top 10 clubs", included: true },
      { id: "leagues-basic", name: "League Overview", description: "View 5 major leagues", included: true },
      { id: "analytics-basic", name: "Basic Analytics", description: "Limited dashboard", included: true },
      { id: "historical-1y", name: "1 Year History", description: "Historical data for 1 year", included: true },
      { id: "reports", name: "Reports", description: "Generate reports", included: false },
      { id: "ai-insights", name: "AI Insights", description: "AI-powered analysis", included: false },
      { id: "api-access", name: "API Access", description: "Programmatic access", included: false },
      { id: "export", name: "Data Export", description: "Export to CSV/Excel", included: false },
    ],
    limits: {
      playersView: 20,
      clubsView: 10,
      leaguesView: 5,
      reportsPerMonth: 0,
      apiCallsPerDay: 0,
      historicalDataYears: 1,
      exportFormats: [],
      aiInsightsPerDay: 0,
      customDashboards: 0,
      teamMembers: 1,
    },
  },
  {
    id: "starter",
    tier: "starter",
    name: "Starter",
    price: 19,
    priceYearly: 190,
    currency: "USD",
    popular: false,
    features: [
      { id: "players-full", name: "Full Player Database", description: "Access all 2,500+ players", included: true },
      { id: "clubs-full", name: "Full Club Database", description: "Access all 140+ clubs", included: true },
      { id: "leagues-full", name: "All Leagues", description: "Access all 12 leagues", included: true },
      { id: "analytics-full", name: "Full Analytics", description: "Complete dashboard", included: true },
      { id: "historical-3y", name: "3 Year History", description: "Historical data for 3 years", included: true },
      { id: "reports", name: "Reports", description: "5 reports per month", included: true },
      { id: "ai-insights", name: "AI Insights", description: "10 AI queries per day", included: true },
      { id: "api-access", name: "API Access", description: "Programmatic access", included: false },
      { id: "export", name: "Data Export", description: "Export to CSV", included: true },
    ],
    limits: {
      playersView: "unlimited",
      clubsView: "unlimited",
      leaguesView: "unlimited",
      reportsPerMonth: 5,
      apiCallsPerDay: 0,
      historicalDataYears: 3,
      exportFormats: ["csv"],
      aiInsightsPerDay: 10,
      customDashboards: 2,
      teamMembers: 1,
    },
  },
  {
    id: "pro",
    tier: "pro",
    name: "Pro",
    price: 49,
    priceYearly: 490,
    currency: "USD",
    popular: true,
    features: [
      { id: "players-full", name: "Full Player Database", description: "Access all 2,500+ players", included: true },
      { id: "clubs-full", name: "Full Club Database", description: "Access all 140+ clubs", included: true },
      { id: "leagues-full", name: "All Leagues", description: "Access all 12 leagues", included: true },
      { id: "analytics-advanced", name: "Advanced Analytics", description: "Complete + predictive", included: true },
      { id: "historical-5y", name: "5 Year History", description: "Historical data for 5 years", included: true },
      { id: "reports", name: "Unlimited Reports", description: "Unlimited reports", included: true },
      { id: "ai-insights", name: "AI Insights", description: "Unlimited AI queries", included: true },
      { id: "api-access", name: "API Access", description: "1,000 calls/day", included: true },
      { id: "export", name: "Data Export", description: "Export to CSV/Excel/PDF", included: true },
      { id: "investors", name: "Investor Analytics", description: "ROI & valuation tools", included: true },
    ],
    limits: {
      playersView: "unlimited",
      clubsView: "unlimited",
      leaguesView: "unlimited",
      reportsPerMonth: "unlimited",
      apiCallsPerDay: 1000,
      historicalDataYears: 5,
      exportFormats: ["csv", "xlsx", "pdf"],
      aiInsightsPerDay: "unlimited",
      customDashboards: 10,
      teamMembers: 3,
    },
  },
  {
    id: "enterprise",
    tier: "enterprise",
    name: "Enterprise",
    price: 199,
    priceYearly: 1990,
    currency: "USD",
    popular: false,
    features: [
      { id: "everything", name: "Everything in Pro", description: "All Pro features", included: true },
      { id: "api-unlimited", name: "Unlimited API", description: "Unlimited API calls", included: true },
      { id: "white-label", name: "White Label", description: "Custom branding", included: true },
      { id: "dedicated-support", name: "Dedicated Support", description: "24/7 priority support", included: true },
      { id: "custom-integrations", name: "Custom Integrations", description: "Custom data feeds", included: true },
      { id: "team", name: "Team Management", description: "Unlimited team members", included: true },
      { id: "sla", name: "SLA", description: "99.9% uptime guarantee", included: true },
      { id: "training", name: "Training", description: "Onboarding & training", included: true },
    ],
    limits: {
      playersView: "unlimited",
      clubsView: "unlimited",
      leaguesView: "unlimited",
      reportsPerMonth: "unlimited",
      apiCallsPerDay: "unlimited",
      historicalDataYears: 5,
      exportFormats: ["csv", "xlsx", "pdf", "json", "api"],
      aiInsightsPerDay: "unlimited",
      customDashboards: "unlimited",
      teamMembers: "unlimited",
    },
  },
];

// =============================================================================
// ACCESS CONTROL BY ROLE
// =============================================================================

export const roleAccessControl: Record<UserRole, AccessControl> = {
  user: {
    canViewPlayers: true,
    canViewClubs: true,
    canViewLeagues: true,
    canViewAnalytics: true,
    canViewInvestors: false,
    canViewReports: false,
    canExportData: false,
    canUseAI: false,
    canAccessAPI: false,
    canManageUsers: false,
    canManageSettings: false,
    canViewAdminPanel: false,
  },
  admin: {
    canViewPlayers: true,
    canViewClubs: true,
    canViewLeagues: true,
    canViewAnalytics: true,
    canViewInvestors: true,
    canViewReports: true,
    canExportData: true,
    canUseAI: true,
    canAccessAPI: true,
    canManageUsers: true,
    canManageSettings: true,
    canViewAdminPanel: true,
  },
  super_admin: {
    canViewPlayers: true,
    canViewClubs: true,
    canViewLeagues: true,
    canViewAnalytics: true,
    canViewInvestors: true,
    canViewReports: true,
    canExportData: true,
    canUseAI: true,
    canAccessAPI: true,
    canManageUsers: true,
    canManageSettings: true,
    canViewAdminPanel: true,
  },
};

// =============================================================================
// ACCESS CONTROL BY SUBSCRIPTION
// =============================================================================

export const subscriptionAccessControl: Record<SubscriptionTier, AccessControl> = {
  free: {
    canViewPlayers: true,
    canViewClubs: true,
    canViewLeagues: true,
    canViewAnalytics: true,
    canViewInvestors: false,
    canViewReports: false,
    canExportData: false,
    canUseAI: false,
    canAccessAPI: false,
    canManageUsers: false,
    canManageSettings: false,
    canViewAdminPanel: false,
  },
  starter: {
    canViewPlayers: true,
    canViewClubs: true,
    canViewLeagues: true,
    canViewAnalytics: true,
    canViewInvestors: false,
    canViewReports: true,
    canExportData: true,
    canUseAI: true,
    canAccessAPI: false,
    canManageUsers: false,
    canManageSettings: false,
    canViewAdminPanel: false,
  },
  pro: {
    canViewPlayers: true,
    canViewClubs: true,
    canViewLeagues: true,
    canViewAnalytics: true,
    canViewInvestors: true,
    canViewReports: true,
    canExportData: true,
    canUseAI: true,
    canAccessAPI: true,
    canManageUsers: false,
    canManageSettings: false,
    canViewAdminPanel: false,
  },
  enterprise: {
    canViewPlayers: true,
    canViewClubs: true,
    canViewLeagues: true,
    canViewAnalytics: true,
    canViewInvestors: true,
    canViewReports: true,
    canExportData: true,
    canUseAI: true,
    canAccessAPI: true,
    canManageUsers: true,
    canManageSettings: true,
    canViewAdminPanel: false,
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export function getAccessControl(role: UserRole, subscription: SubscriptionTier): AccessControl {
  const roleAccess = roleAccessControl[role];
  const subAccess = subscriptionAccessControl[subscription];
  
  // Admin/Super Admin always has full access regardless of subscription
  if (role === "admin" || role === "super_admin") {
    return roleAccess;
  }
  
  // For regular users, combine role and subscription access (most permissive wins)
  return {
    canViewPlayers: roleAccess.canViewPlayers || subAccess.canViewPlayers,
    canViewClubs: roleAccess.canViewClubs || subAccess.canViewClubs,
    canViewLeagues: roleAccess.canViewLeagues || subAccess.canViewLeagues,
    canViewAnalytics: roleAccess.canViewAnalytics || subAccess.canViewAnalytics,
    canViewInvestors: roleAccess.canViewInvestors || subAccess.canViewInvestors,
    canViewReports: roleAccess.canViewReports || subAccess.canViewReports,
    canExportData: roleAccess.canExportData || subAccess.canExportData,
    canUseAI: roleAccess.canUseAI || subAccess.canUseAI,
    canAccessAPI: roleAccess.canAccessAPI || subAccess.canAccessAPI,
    canManageUsers: roleAccess.canManageUsers,
    canManageSettings: roleAccess.canManageSettings,
    canViewAdminPanel: roleAccess.canViewAdminPanel,
  };
}

export function getPlanByTier(tier: SubscriptionTier): Subscription | undefined {
  return subscriptionPlans.find(plan => plan.tier === tier);
}

export function canAccessFeature(
  role: UserRole,
  subscription: SubscriptionTier,
  feature: keyof AccessControl
): boolean {
  const access = getAccessControl(role, subscription);
  return access[feature];
}

export function getDataLimit(
  subscription: SubscriptionTier,
  limitType: keyof Subscription["limits"]
): number | "unlimited" {
  const plan = getPlanByTier(subscription);
  if (!plan) return 0;
  return plan.limits[limitType];
}
