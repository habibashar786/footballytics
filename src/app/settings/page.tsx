"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  Database, 
  Key,
  Globe,
  Moon,
  Sun,
  Check,
  Crown,
  Zap,
  Users,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Upload
} from "lucide-react";

// Admin user data (you are the admin)
const adminUser = {
  name: "Ashar",
  email: "hellomrashar@gmail.com",
  role: "Administrator",
  avatar: "A",
  plan: "Enterprise",
  joinedDate: "2024-01-15",
  lastLogin: new Date().toISOString(),
};

// Subscription tiers
const subscriptionPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "month",
    features: [
      "Basic dashboard access",
      "5 player profiles/day",
      "League standings",
      "Limited historical data",
    ],
    limitations: [
      "No API access",
      "No exports",
      "Ads displayed",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    interval: "month",
    features: [
      "Full dashboard access",
      "Unlimited player profiles",
      "All leagues & clubs",
      "5 years historical data",
      "Basic API access (1000 req/day)",
      "CSV/PDF exports",
      "No ads",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    interval: "month",
    features: [
      "Everything in Pro",
      "AI-powered insights",
      "Real-time data feeds",
      "Unlimited API access",
      "Custom reports",
      "Priority support",
      "White-label options",
      "Dedicated account manager",
    ],
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
    marketing: false,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "admin", label: "Admin Panel", icon: Shield },
    { id: "subscription", label: "Subscription", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "api", label: "API Keys", icon: Key },
    { id: "data", label: "Data Management", icon: Database },
  ];

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-amber-500" />
            Settings
          </h1>
          <p className="text-gray-400 mt-1">Manage your account and preferences</p>
        </div>
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2">
          <Crown className="w-5 h-5 text-amber-500" />
          <span className="text-amber-500 font-semibold">Administrator</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Tabs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-3 bg-[#1a1a2e] rounded-xl border border-gray-800 p-4"
        >
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-500/20 text-amber-500 border border-amber-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-9 bg-[#1a1a2e] rounded-xl border border-gray-800 p-6"
        >
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Profile Settings</h2>
              
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-3xl font-bold text-white">
                  {adminUser.avatar}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{adminUser.name}</h3>
                  <p className="text-gray-400">{adminUser.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-sm font-medium">
                      {adminUser.role}
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                      {adminUser.plan} Plan
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Display Name</label>
                  <input
                    type="text"
                    defaultValue={adminUser.name}
                    className="w-full bg-[#0f0f1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={adminUser.email}
                    className="w-full bg-[#0f0f1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0f0f1a] rounded-lg">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-5 h-5 text-amber-500" /> : <Sun className="w-5 h-5 text-amber-500" />}
                  <span className="text-white">Dark Mode</span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-all ${darkMode ? "bg-amber-500" : "bg-gray-600"} relative`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${darkMode ? "right-0.5" : "left-0.5"}`} />
                </button>
              </div>

              <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          )}

          {/* Admin Panel Tab */}
          {activeTab === "admin" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                <span className="flex items-center gap-2 text-green-400">
                  <Unlock className="w-4 h-4" />
                  Full Access
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0f0f1a] rounded-lg p-4 border border-gray-700">
                  <Users className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="text-2xl font-bold text-white">2,458</h3>
                  <p className="text-gray-400 text-sm">Total Users</p>
                </div>
                <div className="bg-[#0f0f1a] rounded-lg p-4 border border-gray-700">
                  <CreditCard className="w-8 h-8 text-green-400 mb-3" />
                  <h3 className="text-2xl font-bold text-white">$12,450</h3>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                </div>
                <div className="bg-[#0f0f1a] rounded-lg p-4 border border-gray-700">
                  <Zap className="w-8 h-8 text-amber-400 mb-3" />
                  <h3 className="text-2xl font-bold text-white">98.5%</h3>
                  <p className="text-gray-400 text-sm">Uptime</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Admin Controls</h3>
                
                <div className="space-y-3">
                  {[
                    { label: "User Management", desc: "Add, edit, remove users", icon: Users },
                    { label: "Subscription Management", desc: "Manage user subscriptions", icon: CreditCard },
                    { label: "Data Refresh", desc: "Force refresh all data sources", icon: RefreshCw },
                    { label: "Export All Data", desc: "Download complete database", icon: Download },
                    { label: "Import Data", desc: "Bulk import from CSV/JSON", icon: Upload },
                    { label: "API Rate Limits", desc: "Configure rate limiting", icon: Globe },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between p-4 bg-[#0f0f1a] rounded-lg border border-gray-700 hover:border-amber-500/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <item.icon className="w-5 h-5 text-amber-500" />
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-amber-500/10 text-amber-500 rounded-lg hover:bg-amber-500/20 transition-colors">
                        Manage
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Subscription Tab */}
          {activeTab === "subscription" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Subscription Plans</h2>
                <span className="text-gray-400">Current: <span className="text-amber-500 font-semibold">Enterprise</span></span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-xl border p-6 ${
                      plan.id === "enterprise"
                        ? "bg-gradient-to-b from-amber-500/10 to-transparent border-amber-500/50"
                        : "bg-[#0f0f1a] border-gray-700"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                        Most Popular
                      </span>
                    )}
                    {plan.id === "enterprise" && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-black text-xs font-semibold rounded-full">
                        Current Plan
                      </span>
                    )}
                    
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-400">/{plan.interval}</span>
                    </div>

                    <ul className="mt-4 space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${
                        plan.id === "enterprise"
                          ? "bg-amber-500 text-black"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {plan.id === "enterprise" ? "Current Plan" : "Upgrade"}
                    </button>
                  </div>
                ))}
              </div>

              {/* Stripe Integration Section */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Stripe Payment Gateway</h3>
                    <p className="text-gray-400 text-sm">Secure payment processing for subscriptions</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0f0f1a] rounded-lg">
                    <p className="text-gray-400 text-sm">Stripe Account</p>
                    <p className="text-white font-medium">Connected ✓</p>
                  </div>
                  <div className="p-4 bg-[#0f0f1a] rounded-lg">
                    <p className="text-gray-400 text-sm">Webhook Status</p>
                    <p className="text-green-400 font-medium">Active</p>
                  </div>
                </div>
                
                <button className="mt-4 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors">
                  Configure Stripe Settings
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Notification Preferences</h2>
              
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-[#0f0f1a] rounded-lg">
                  <div>
                    <p className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-gray-500 text-sm">
                      {key === "email" && "Receive notifications via email"}
                      {key === "push" && "Browser push notifications"}
                      {key === "updates" && "Product updates and new features"}
                      {key === "marketing" && "Marketing and promotional content"}
                    </p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
                    className={`w-12 h-6 rounded-full transition-all ${value ? "bg-amber-500" : "bg-gray-600"} relative`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${value ? "right-0.5" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === "api" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">API Keys</h2>
              
              <div className="p-4 bg-[#0f0f1a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Production API Key</p>
                    <p className="text-gray-500 text-sm font-mono mt-1">fbl_live_••••••••••••••••</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
                      Copy
                    </button>
                    <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20">
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#0f0f1a] rounded-lg border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Test API Key</p>
                    <p className="text-gray-500 text-sm font-mono mt-1">fbl_test_••••••••••••••••</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
                      Copy
                    </button>
                    <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20">
                      Regenerate
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-amber-500 font-medium">API Usage This Month</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-[35%] bg-amber-500 rounded-full" />
                  </div>
                  <span className="text-white font-medium">35,000 / 100,000</span>
                </div>
              </div>
            </div>
          )}

          {/* Data Management Tab */}
          {activeTab === "data" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Data Management</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="p-6 bg-[#0f0f1a] rounded-lg border border-gray-700 hover:border-amber-500/50 transition-colors text-left">
                  <Download className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="text-white font-semibold">Export Data</h3>
                  <p className="text-gray-500 text-sm mt-1">Download your data as CSV or JSON</p>
                </button>
                <button className="p-6 bg-[#0f0f1a] rounded-lg border border-gray-700 hover:border-amber-500/50 transition-colors text-left">
                  <Upload className="w-8 h-8 text-green-400 mb-3" />
                  <h3 className="text-white font-semibold">Import Data</h3>
                  <p className="text-gray-500 text-sm mt-1">Bulk import from external sources</p>
                </button>
                <button className="p-6 bg-[#0f0f1a] rounded-lg border border-gray-700 hover:border-amber-500/50 transition-colors text-left">
                  <RefreshCw className="w-8 h-8 text-amber-400 mb-3" />
                  <h3 className="text-white font-semibold">Sync Data</h3>
                  <p className="text-gray-500 text-sm mt-1">Force refresh from all data sources</p>
                </button>
                <button className="p-6 bg-[#0f0f1a] rounded-lg border border-gray-700 hover:border-red-500/50 transition-colors text-left">
                  <Database className="w-8 h-8 text-red-400 mb-3" />
                  <h3 className="text-white font-semibold">Clear Cache</h3>
                  <p className="text-gray-500 text-sm mt-1">Clear all cached data</p>
                </button>
              </div>

              <div className="p-4 bg-[#0f0f1a] rounded-lg border border-gray-700">
                <h3 className="text-white font-semibold mb-4">Data Sources Status</h3>
                <div className="space-y-3">
                  {[
                    { name: "Football-Data.org", status: "connected", lastSync: "2 min ago" },
                    { name: "API-Football", status: "connected", lastSync: "5 min ago" },
                    { name: "Transfermarkt", status: "connected", lastSync: "1 hour ago" },
                    { name: "SofaScore", status: "connected", lastSync: "10 min ago" },
                  ].map((source) => (
                    <div key={source.name} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                      <span className="text-gray-300">{source.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500 text-sm">{source.lastSync}</span>
                        <span className="flex items-center gap-1 text-green-400 text-sm">
                          <span className="w-2 h-2 bg-green-400 rounded-full" />
                          Connected
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
