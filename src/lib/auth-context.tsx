"use client";

/**
 * FOOTBALLYTICS - AUTH CONTEXT
 * ============================
 * 
 * Authentication and authorization context
 * Manages user state, roles, and subscriptions
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole, SubscriptionTier, SubscriptionStatus, AccessControl } from "@/types";
import { getAccessControl, getDataLimit } from "@/data/subscriptions";

// =============================================================================
// TYPES
// =============================================================================

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isPaidUser: boolean;
  subscription: SubscriptionTier;
  accessControl: AccessControl;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  checkAccess: (feature: keyof AccessControl) => boolean;
  getLimit: (limitType: string) => number | "unlimited";
}

// =============================================================================
// DEFAULT USER (for demo/development)
// =============================================================================

const defaultAdminUser: User = {
  id: "admin-001",
  email: "admin@footballytics.com",
  name: "Ashar",
  avatar: undefined,
  role: "admin",
  subscription: "enterprise",
  subscriptionStatus: "active",
  subscriptionExpiry: new Date("2027-12-31"),
  createdAt: new Date("2024-01-01"),
  lastLoginAt: new Date(),
  preferences: {
    theme: "dark",
    language: "en",
    favoriteLeagues: ["premier-league", "la-liga", "saudi-pro"],
    favoriteClubs: ["real-madrid", "man-city", "al-hilal"],
    favoritePlayers: ["haaland", "bellingham", "salah"],
    notifications: {
      transfers: true,
      matches: true,
      news: true,
    },
  },
};

const defaultFreeUser: User = {
  id: "user-001",
  email: "user@example.com",
  name: "Demo User",
  avatar: undefined,
  role: "user",
  subscription: "free",
  subscriptionStatus: "active",
  subscriptionExpiry: undefined,
  createdAt: new Date(),
  lastLoginAt: new Date(),
  preferences: {
    theme: "dark",
    language: "en",
    favoriteLeagues: [],
    favoriteClubs: [],
    favoritePlayers: [],
    notifications: {
      transfers: false,
      matches: false,
      news: false,
    },
  },
};

// =============================================================================
// CONTEXT
// =============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =============================================================================
// PROVIDER
// =============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Default to admin user for demo (change to null for production)
  const [user, setUser] = useState<User | null>(defaultAdminUser);
  const [isLoading, setIsLoading] = useState(false);

  // Computed values
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin" || user?.role === "super_admin";
  const isSuperAdmin = user?.role === "super_admin";
  const isPaidUser = user?.subscription !== "free" && user?.subscriptionStatus === "active";
  const subscription = user?.subscription || "free";
  const accessControl = getAccessControl(
    user?.role || "user",
    user?.subscription || "free"
  );

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("footballytics_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        // Convert date strings back to Date objects
        parsed.createdAt = new Date(parsed.createdAt);
        parsed.lastLoginAt = parsed.lastLoginAt ? new Date(parsed.lastLoginAt) : undefined;
        parsed.subscriptionExpiry = parsed.subscriptionExpiry ? new Date(parsed.subscriptionExpiry) : undefined;
        setUser(parsed);
      } catch (e) {
        console.error("Failed to parse saved user:", e);
      }
    }
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("footballytics_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("footballytics_user");
    }
  }, [user]);

  // Login function (mock - replace with real auth)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in production, call your auth API
      if (email === "admin@footballytics.com") {
        setUser(defaultAdminUser);
      } else {
        setUser({
          ...defaultFreeUser,
          email,
          lastLoginAt: new Date(),
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("footballytics_user");
  };

  // Update user function
  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  // Check if user has access to a feature
  const checkAccess = (feature: keyof AccessControl): boolean => {
    return accessControl[feature];
  };

  // Get data limit for user's subscription
  const getLimit = (limitType: string): number | "unlimited" => {
    return getDataLimit(subscription, limitType as any);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    isPaidUser,
    subscription,
    accessControl,
    login,
    logout,
    updateUser,
    checkAccess,
    getLimit,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// =============================================================================
// HIGHER-ORDER COMPONENT FOR PROTECTED ROUTES
// =============================================================================

interface WithAuthProps {
  requiredRole?: UserRole;
  requiredSubscription?: SubscriptionTier;
  requiredFeature?: keyof AccessControl;
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthProps = {}
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, user, checkAccess } = useAuth();
    const { requiredRole, requiredSubscription, requiredFeature } = options;

    // Check authentication
    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Authentication Required</h2>
            <p className="text-gray-400">Please sign in to access this page.</p>
          </div>
        </div>
      );
    }

    // Check role
    if (requiredRole && user?.role !== requiredRole && user?.role !== "super_admin") {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
            <p className="text-gray-400">You don&apos;t have permission to access this page.</p>
          </div>
        </div>
      );
    }

    // Check subscription
    if (requiredSubscription) {
      const tierOrder: SubscriptionTier[] = ["free", "starter", "pro", "enterprise"];
      const userTierIndex = tierOrder.indexOf(user?.subscription || "free");
      const requiredTierIndex = tierOrder.indexOf(requiredSubscription);
      
      if (userTierIndex < requiredTierIndex) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Upgrade Required</h2>
              <p className="text-gray-400">
                This feature requires a {requiredSubscription} subscription or higher.
              </p>
            </div>
          </div>
        );
      }
    }

    // Check feature access
    if (requiredFeature && !checkAccess(requiredFeature)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Feature Locked</h2>
            <p className="text-gray-400">
              Upgrade your subscription to access this feature.
            </p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
