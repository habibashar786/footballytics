"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Trophy,
  Building2,
  Users,
  Heart,
  Briefcase,
  Calendar,
  Sparkles,
  BarChart3,
  Settings,
  FileText,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "Leagues", href: "/leagues", icon: Trophy },
  { name: "Clubs", href: "/clubs", icon: Building2 },
  { name: "Players", href: "/players", icon: Users },
  { name: "Fans", href: "/fans", icon: Heart },
  { name: "Investors", href: "/investors", icon: Briefcase },
  { name: "Events", href: "/events", icon: Calendar },
];

const secondaryNav = [
  { name: "AI Insights", href: "/insights", icon: Sparkles },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-black/50 backdrop-blur-xl border-r border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-3 h-16 px-6 border-b border-white/10">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600">
          <Zap className="h-6 w-6 text-black" />
        </div>
        <div>
          <h1 className="text-lg font-bold">
            <span className="text-gold-400">Football</span>ytics
          </h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Elite Intelligence
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Main
        </p>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-gold-400")} />
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-gold-400"
                />
              )}
            </Link>
          );
        })}

        <div className="pt-6">
          <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Tools
          </p>
          {secondaryNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                    : "text-muted-foreground hover:text-white hover:bg-white/5",
                  item.name === "AI Insights" && !isActive && "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5",
                  isActive && "text-gold-400",
                  item.name === "AI Insights" && !isActive && "text-purple-400"
                )} />
                {item.name}
                {item.name === "AI Insights" && !isActive && (
                  <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-400 rounded">
                    AI
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer Stats */}
      <div className="p-4 border-t border-white/10">
        <div className="p-4 rounded-xl bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gold-400">Data Status</span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-pitch-400 animate-pulse" />
              <span className="text-xs text-pitch-400">Live</span>
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Players</span>
              <span className="font-medium">2,458</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Clubs</span>
              <span className="font-medium">142</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Leagues</span>
              <span className="font-medium">12</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[10px] text-muted-foreground">
          © 2025 Footballytics v2.0
        </p>
      </div>
    </div>
  );
}
