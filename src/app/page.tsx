"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Globe, 
  Trophy,
  Sparkles,
  ArrowRight,
  Play,
  BarChart3
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { PlayerCard } from "@/components/players/PlayerCard";
import { ClubCard } from "@/components/clubs/ClubCard";
import { 
  kpis, 
  getTopPlayersByValue, 
  getTopClubsByValue, 
  leagues,
  fanSegments 
} from "@/data";
import { formatNumber, formatCurrency } from "@/lib/utils";
import Image from "next/image";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function DashboardPage() {
  const topPlayers = getTopPlayersByValue(8);
  const topClubs = getTopClubsByValue(4);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="relative overflow-hidden rounded-3xl">
        <div className="hero-gradient p-8 md:p-12">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                AI-Powered Analytics
              </span>
              <span className="live-indicator text-sm">
                <span className="text-red-400 font-medium">Live Data</span>
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Football Intelligence</span>
              <br />
              <span className="text-foreground">At Your Fingertips</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6 max-w-xl">
              Unifying sport, business, media, and fan economics into one trusted 
              ecosystem. Track leagues, clubs, players, and market trends in real-time.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="btn-premium flex items-center gap-2">
                <Play className="h-4 w-4" />
                Explore Platform
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <BarChart3 className="h-4 w-4" />
                View Reports
              </button>
            </div>
          </div>
          
          {/* Floating stats */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Leagues", value: "12", icon: Trophy },
                { label: "Clubs", value: "842", icon: Users },
                { label: "Players", value: "24.5K", icon: Users },
                { label: "Data Points", value: "1.2M", icon: BarChart3 },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="glass-card p-4 text-center min-w-[120px]"
                >
                  <stat.icon className="h-5 w-5 text-gold-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* KPI Cards */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Market Overview</h2>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-400 transition-colors">
            View all metrics
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Market Value"
            value={kpis[0].value}
            previousValue={kpis[0].previousValue}
            format="currency"
            icon={DollarSign}
            target={kpis[0].target}
            accentColor="gold"
          />
          <KPICard
            title="Global Fan Base"
            value={kpis[2].value}
            previousValue={kpis[2].previousValue}
            format="number"
            icon={Globe}
            target={kpis[2].target}
            accentColor="green"
          />
          <KPICard
            title="Total Revenue"
            value={kpis[3].value}
            previousValue={kpis[3].previousValue}
            format="currency"
            icon={TrendingUp}
            accentColor="blue"
          />
          <KPICard
            title="Transfer Volume"
            value={kpis[5].value}
            previousValue={kpis[5].previousValue}
            format="currency"
            icon={Users}
            accentColor="purple"
          />
        </div>
      </motion.section>

      {/* Top Players Section */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Top Valued Players</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Most valuable football assets in the market
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold-400 transition-colors">
            View all players
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPlayers.slice(0, 4).map((player, idx) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <PlayerCard player={player} rank={idx + 1} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Clubs */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Top Clubs by Value</h2>
            <button className="text-sm text-muted-foreground hover:text-gold-400 transition-colors">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {topClubs.map((club, idx) => (
              <ClubCard key={club.id} club={club} rank={idx + 1} showDetails={false} />
            ))}
          </div>
        </motion.section>

        {/* League Rankings */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">League Rankings</h2>
            <button className="text-sm text-muted-foreground hover:text-gold-400 transition-colors">
              View all
            </button>
          </div>
          
          <div className="glass-card divide-y divide-white/10">
            {leagues.slice(0, 5).map((league, idx) => (
              <div
                key={league.id}
                className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-bold">
                  {idx + 1}
                </div>
                <Image
                  src={league.logo}
                  alt={league.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{league.name}</p>
                  <p className="text-sm text-muted-foreground">{league.country}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gold-400">{formatCurrency(league.marketValue)}</p>
                  <p className="text-xs text-muted-foreground">{league.totalClubs} clubs</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Fan Engagement Section */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Global Fan Engagement</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Regional distribution and engagement metrics
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {fanSegments.map((segment) => (
            <div key={segment.id} className="glass-card p-5 hover:border-gold-500/30 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{segment.region}</h3>
                <Globe className="h-4 w-4 text-gold-400" />
              </div>
              
              <p className="text-2xl font-bold text-gold-400 mb-1">
                {formatNumber(segment.totalFans)}
              </p>
              <p className="text-xs text-muted-foreground mb-4">Total Fans</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Engagement</span>
                  <span className="font-medium text-pitch-400">{segment.engagementScore}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Digital</span>
                  <span className="font-medium text-blue-400">{segment.digitalEngagement}%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Loyalty</span>
                  <span className="font-medium text-purple-400">{segment.loyaltyIndex}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.section variants={itemVariants}>
        <div className="glass-card p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 via-transparent to-gold-500/10" />
          <div className="relative z-10">
            <Sparkles className="h-12 w-12 text-gold-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Unlock AI-Powered Insights
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Get personalized recommendations, predictive analytics, and natural language 
              queries powered by advanced AI agents.
            </p>
            <button className="btn-premium">
              Try AI Assistant
            </button>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-white/10">
        <p className="text-sm text-muted-foreground">
          Built by <span className="text-gold-400 font-medium">Ashar</span> • 
          Footballytics Intelligence Platform • 
          For demonstration purposes only
        </p>
      </footer>
    </motion.div>
  );
}
