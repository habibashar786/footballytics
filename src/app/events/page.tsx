"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar,
  Trophy,
  Globe,
  DollarSign,
  Users,
  Tv,
  MapPin,
  TrendingUp,
  Clock,
  Star,
  ChevronRight
} from "lucide-react";
import { tournaments } from "@/data";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ['#FBBF24', '#4ADE80', '#60A5FA', '#C084FC', '#F87171'];

// Extended events data
const allEvents = [
  {
    id: "world-cup-2026",
    name: "FIFA World Cup 2026",
    type: "World Cup",
    status: "upcoming",
    date: "Jun 11 - Jul 19, 2026",
    location: "USA / Canada / Mexico",
    economicImpact: 14_000_000_000,
    viewership: 5_000_000_000,
    sponsorshipValue: 1_800_000_000,
    teams: 48,
    matches: 104,
    icon: "🏆",
  },
  {
    id: "ucl-2024-25",
    name: "UEFA Champions League 2024-25",
    type: "Club Competition",
    status: "active",
    date: "Sep 2024 - May 2025",
    location: "Europe",
    economicImpact: 4_200_000_000,
    viewership: 800_000_000,
    sponsorshipValue: 650_000_000,
    teams: 36,
    matches: 189,
    icon: "⭐",
  },
  {
    id: "euro-2024",
    name: "UEFA Euro 2024",
    type: "Continental",
    status: "completed",
    date: "Jun 14 - Jul 14, 2024",
    location: "Germany",
    economicImpact: 6_500_000_000,
    viewership: 2_000_000_000,
    sponsorshipValue: 850_000_000,
    teams: 24,
    matches: 51,
    icon: "🇪🇺",
  },
  {
    id: "copa-2024",
    name: "Copa América 2024",
    type: "Continental",
    status: "completed",
    date: "Jun 20 - Jul 14, 2024",
    location: "USA",
    economicImpact: 1_800_000_000,
    viewership: 500_000_000,
    sponsorshipValue: 320_000_000,
    teams: 16,
    matches: 32,
    icon: "🏆",
  },
  {
    id: "premier-league-24-25",
    name: "Premier League 2024-25",
    type: "League",
    status: "active",
    date: "Aug 2024 - May 2025",
    location: "England",
    economicImpact: 8_500_000_000,
    viewership: 4_700_000_000,
    sponsorshipValue: 1_200_000_000,
    teams: 20,
    matches: 380,
    icon: "🦁",
  },
  {
    id: "club-world-cup-2025",
    name: "FIFA Club World Cup 2025",
    type: "Club Competition",
    status: "upcoming",
    date: "Jun 15 - Jul 13, 2025",
    location: "USA",
    economicImpact: 3_200_000_000,
    viewership: 1_500_000_000,
    sponsorshipValue: 550_000_000,
    teams: 32,
    matches: 63,
    icon: "🌍",
  },
];

// Economic impact chart data
const impactData = allEvents
  .sort((a, b) => b.economicImpact - a.economicImpact)
  .slice(0, 5)
  .map(e => ({
    name: e.name.split(' ').slice(0, 2).join(' '),
    impact: e.economicImpact / 1_000_000_000,
    sponsorship: e.sponsorshipValue / 1_000_000_000,
  }));

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "active" | "upcoming" | "completed">("all");

  const filteredEvents = filter === "all" 
    ? allEvents 
    : allEvents.filter(e => e.status === filter);

  const totalEconomicImpact = allEvents.reduce((sum, e) => sum + e.economicImpact, 0);
  const totalViewership = allEvents.reduce((sum, e) => sum + e.viewership, 0);
  const totalSponsorship = allEvents.reduce((sum, e) => sum + e.sponsorshipValue, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-pitch-500/20 text-pitch-400 border-pitch-500/30";
      case "upcoming": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "completed": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default: return "bg-white/10 text-white";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Events &</span> Tournaments
        </h1>
        <p className="text-muted-foreground mt-1">
          Major football events, economic impact, and sponsorship analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gold-500/20">
              <Calendar className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{allEvents.length}</p>
              <p className="text-xs text-muted-foreground">Major Events</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-pitch-500/20">
              <DollarSign className="h-6 w-6 text-pitch-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalEconomicImpact)}</p>
              <p className="text-xs text-muted-foreground">Economic Impact</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/20">
              <Tv className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatNumber(totalViewership)}</p>
              <p className="text-xs text-muted-foreground">Global Viewership</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <Star className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalSponsorship)}</p>
              <p className="text-xs text-muted-foreground">Sponsorship Value</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Economic Impact Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-gold-400" />
          Economic Impact by Event (€B)
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={impactData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                type="number"
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickFormatter={(value) => `€${value}B`}
              />
              <YAxis 
                type="category"
                dataKey="name"
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                width={120}
              />
              <Tooltip 
                formatter={(value: number) => [`€${value.toFixed(1)}B`]}
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="impact" name="Economic Impact" fill="#FBBF24" radius={[0, 4, 4, 0]} />
              <Bar dataKey="sponsorship" name="Sponsorship" fill="#4ADE80" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["all", "active", "upcoming", "completed"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize",
              filter === status
                ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="glass-card p-6 hover:border-gold-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              {/* Event Icon */}
              <div className="text-4xl">{event.icon}</div>

              {/* Event Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{event.name}</h3>
                  <span className={cn(
                    "px-2 py-0.5 text-xs rounded-full border capitalize",
                    getStatusColor(event.status)
                  )}>
                    {event.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    {event.teams} teams
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-lg font-bold text-gold-400">{formatCurrency(event.economicImpact)}</p>
                    <p className="text-xs text-muted-foreground">Economic Impact</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-400">{formatNumber(event.viewership)}</p>
                    <p className="text-xs text-muted-foreground">Viewership</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-pitch-400">{formatCurrency(event.sponsorshipValue)}</p>
                    <p className="text-xs text-muted-foreground">Sponsorship</p>
                  </div>
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-8 bg-gradient-to-r from-gold-500/10 to-transparent border-gold-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl">🏆</div>
          <div>
            <p className="text-sm text-gold-400 font-medium">FEATURED EVENT</p>
            <h3 className="text-2xl font-bold">FIFA World Cup 2026</h3>
            <p className="text-muted-foreground">The biggest sporting event in the world</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <div>
            <p className="text-3xl font-bold text-gold-400">48</p>
            <p className="text-sm text-muted-foreground">Nations</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-pitch-400">104</p>
            <p className="text-sm text-muted-foreground">Matches</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-400">16</p>
            <p className="text-sm text-muted-foreground">Host Cities</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-400">5B+</p>
            <p className="text-sm text-muted-foreground">Expected Viewers</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
