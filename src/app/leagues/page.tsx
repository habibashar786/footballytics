"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Trophy,
  Globe,
  DollarSign,
  Users,
  Tv,
  TrendingUp,
  BarChart3,
  ChevronRight
} from "lucide-react";
import { leagues, getClubsByLeague } from "@/data";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

export default function LeaguesPage() {
  const [selectedLeague, setSelectedLeague] = useState(leagues[0].id);

  const currentLeague = leagues.find(l => l.id === selectedLeague) || leagues[0];
  const leagueClubs = getClubsByLeague(selectedLeague);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">League</span> Intelligence
        </h1>
        <p className="text-muted-foreground mt-1">
          Global league analytics, market values, and competitive analysis
        </p>
      </div>

      {/* League Selector */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {leagues.map((league) => (
          <motion.button
            key={league.id}
            onClick={() => setSelectedLeague(league.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl min-w-[200px] transition-all",
              selectedLeague === league.id
                ? "glass-card border-gold-500/50 bg-gold-500/10"
                : "glass-card hover:border-white/20"
            )}
          >
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
            <div className="text-left">
              <p className={cn(
                "font-semibold",
                selectedLeague === league.id ? "text-gold-400" : "text-white"
              )}>
                {league.name}
              </p>
              <p className="text-xs text-muted-foreground">{league.country}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* League Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <Image
                src={currentLeague.logo}
                alt={currentLeague.name}
                fill
                className="object-contain"
              />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={currentLeague.logo}
                  alt={currentLeague.name}
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
                <div>
                  <h2 className="text-3xl font-bold">{currentLeague.name}</h2>
                  <p className="text-muted-foreground">{currentLeague.country} • Founded {currentLeague.founded}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/5">
                  <DollarSign className="h-6 w-6 text-gold-400 mb-2" />
                  <p className="text-2xl font-bold text-gold-400">{formatCurrency(currentLeague.marketValue)}</p>
                  <p className="text-xs text-muted-foreground">Total Market Value</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <Tv className="h-6 w-6 text-blue-400 mb-2" />
                  <p className="text-2xl font-bold text-blue-400">{formatCurrency(currentLeague.mediaRightsValue)}</p>
                  <p className="text-xs text-muted-foreground">Media Rights</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <Globe className="h-6 w-6 text-pitch-400 mb-2" />
                  <p className="text-2xl font-bold text-pitch-400">{formatNumber(currentLeague.globalFanBase)}</p>
                  <p className="text-xs text-muted-foreground">Global Fans</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <Trophy className="h-6 w-6 text-purple-400 mb-2" />
                  <p className="text-2xl font-bold text-purple-400">{currentLeague.totalClubs}</p>
                  <p className="text-xs text-muted-foreground">Total Clubs</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Competitive Balance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-gold-400" />
              Competitive Balance Index
            </h3>
            
            <div className="space-y-4">
              {leagues.map((league) => (
                <div key={league.id} className="flex items-center gap-4">
                  <Image
                    src={league.logo}
                    alt={league.name}
                    width={32}
                    height={32}
                    className="rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{league.name}</span>
                      <span className={cn(
                        "text-sm font-bold",
                        league.competitiveBalanceIndex >= 70 ? "text-pitch-400" :
                        league.competitiveBalanceIndex >= 50 ? "text-yellow-400" :
                        "text-red-400"
                      )}>
                        {league.competitiveBalanceIndex}%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${league.competitiveBalanceIndex}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={cn(
                          "h-full rounded-full",
                          league.competitiveBalanceIndex >= 70 ? "bg-pitch-500" :
                          league.competitiveBalanceIndex >= 50 ? "bg-yellow-500" :
                          "bg-red-500"
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Clubs in League */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-gold-400" />
              Clubs in {currentLeague.name}
            </h3>
            
            {leagueClubs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leagueClubs.map((club, idx) => (
                  <motion.div
                    key={club.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <span className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
                      idx === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black" :
                      idx === 1 ? "bg-gradient-to-r from-gray-300 to-gray-500 text-black" :
                      idx === 2 ? "bg-gradient-to-r from-orange-400 to-orange-600 text-black" :
                      "bg-white/10 text-white"
                    )}>
                      {idx + 1}
                    </span>
                    <Image
                      src={club.logo}
                      alt={club.name}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{club.name}</p>
                      <p className="text-xs text-muted-foreground">{club.stadium}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gold-400">{formatCurrency(club.marketValue)}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No clubs data available for this league</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          {/* League Rankings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">League Rankings</h3>
            <div className="space-y-3">
              {leagues
                .sort((a, b) => b.marketValue - a.marketValue)
                .map((league, idx) => (
                  <div
                    key={league.id}
                    onClick={() => setSelectedLeague(league.id)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors",
                      selectedLeague === league.id
                        ? "bg-gold-500/20 border border-gold-500/30"
                        : "bg-white/5 hover:bg-white/10"
                    )}
                  >
                    <span className={cn(
                      "flex h-6 w-6 items-center justify-center rounded text-xs font-bold",
                      idx === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black" :
                      idx === 1 ? "bg-gradient-to-r from-gray-300 to-gray-500 text-black" :
                      idx === 2 ? "bg-gradient-to-r from-orange-400 to-orange-600 text-black" :
                      "bg-white/10 text-white"
                    )}>
                      {idx + 1}
                    </span>
                    <Image
                      src={league.logo}
                      alt={league.name}
                      width={24}
                      height={24}
                      className="rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{league.name}</p>
                    </div>
                    <p className="text-xs font-bold text-gold-400">{formatCurrency(league.marketValue)}</p>
                  </div>
                ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Market Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Leagues</span>
                <span className="font-bold">{leagues.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Combined Value</span>
                <span className="font-bold text-gold-400">
                  {formatCurrency(leagues.reduce((sum, l) => sum + l.marketValue, 0))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Media Rights</span>
                <span className="font-bold text-blue-400">
                  {formatCurrency(leagues.reduce((sum, l) => sum + l.mediaRightsValue, 0))}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Global Reach</span>
                <span className="font-bold text-pitch-400">
                  {formatNumber(leagues.reduce((sum, l) => sum + l.globalFanBase, 0))}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Top League */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 bg-gradient-to-br from-gold-500/10 to-transparent border-gold-500/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-gold-400" />
              <h3 className="text-lg font-semibold">Most Valuable</h3>
            </div>
            <div className="flex items-center gap-3">
              <Image
                src={leagues[0].logo}
                alt={leagues[0].name}
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <p className="font-bold text-gold-400">{leagues[0].name}</p>
                <p className="text-2xl font-bold">{formatCurrency(leagues[0].marketValue)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
