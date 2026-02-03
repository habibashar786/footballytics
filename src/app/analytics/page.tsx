"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  DollarSign,
} from "lucide-react";
import { RadarChart, PlayerStatsRadar } from "@/components/charts/RadarChart";
import { LineChart, MarketValueTrendChart, LeagueComparisonChart } from "@/components/charts/LineChart";
import { BarChart, ClubRevenueChart, TransferSpendingChart } from "@/components/charts/BarChart";
import { leagueHistory, globalMarketTrends, clubs, players } from "@/data";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function AnalyticsPage() {
  // Prepare data for charts
  const marketTrendData = globalMarketTrends.totalMarketValue.map((d) => ({
    year: d.year.toString(),
    value: d.value,
  }));

  const leagueComparisonData = [
    { year: "2020", premierLeague: 9.2, laLiga: 5.1, bundesliga: 4.2, serieA: 3.8, saudiPro: 0.18 },
    { year: "2021", premierLeague: 8.5, laLiga: 4.6, bundesliga: 3.9, serieA: 3.5, saudiPro: 0.19 },
    { year: "2022", premierLeague: 9.8, laLiga: 4.9, bundesliga: 4.3, serieA: 3.9, saudiPro: 0.21 },
    { year: "2023", premierLeague: 10.5, laLiga: 5.4, bundesliga: 4.5, serieA: 4.1, saudiPro: 0.45 },
    { year: "2024", premierLeague: 10.9, laLiga: 5.6, bundesliga: 4.6, serieA: 4.2, saudiPro: 0.95 },
    { year: "2025", premierLeague: 11.2, laLiga: 5.8, bundesliga: 4.6, serieA: 4.2, saudiPro: 1.2 },
  ];

  const transferSpendingData = [
    { league: "Premier League", spending: 2_400_000_000 },
    { league: "Saudi Pro", spending: 950_000_000 },
    { league: "La Liga", spending: 900_000_000 },
    { league: "Serie A", spending: 650_000_000 },
    { league: "Bundesliga", spending: 550_000_000 },
    { league: "Ligue 1", spending: 450_000_000 },
  ];

  const revenueData = clubs.slice(0, 8).map((club) => ({
    name: club.shortName,
    revenue: club.revenue / 1_000_000,
    wage: club.revenue * club.wageRatio / 1_000_000,
  }));

  // Get a player for radar chart
  const featuredPlayer = players.find((p) => p.id === "haaland") || players[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Advanced</span> Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Deep-dive into football market trends, valuations, and performance metrics
        </p>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gold-500/20">
              <DollarSign className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(42_100_000_000)}</p>
              <p className="text-xs text-muted-foreground">Global Market Value</p>
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
              <TrendingUp className="h-6 w-6 text-pitch-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">+10.2%</p>
              <p className="text-xs text-muted-foreground">YoY Growth</p>
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
              <Activity className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(7_800_000_000)}</p>
              <p className="text-xs text-muted-foreground">Transfer Volume</p>
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
              <Globe className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">2.6B</p>
              <p className="text-xs text-muted-foreground">Global Fans</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Value Trend */}
        <MarketValueTrendChart
          data={globalMarketTrends.totalMarketValue}
          title="Global Football Market Value"
        />

        {/* League Comparison */}
        <LeagueComparisonChart data={leagueComparisonData} />

        {/* Transfer Spending */}
        <TransferSpendingChart data={transferSpendingData} />

        {/* Revenue vs Wages */}
        <ClubRevenueChart data={revenueData} />
      </div>

      {/* Player Stats Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlayerStatsRadar player={featuredPlayer} />

        {/* Additional Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-gold-400" />
            Key Market Insights
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Saudi Pro League Growth</span>
                <span className="text-pitch-400 font-bold">+567%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                5-year market value growth driven by high-profile signings
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Premier League Dominance</span>
                <span className="text-gold-400 font-bold">26.6%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Share of global top-100 most valuable players
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Average Player Age</span>
                <span className="text-blue-400 font-bold">26.2 years</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Among top-50 most valuable players (-0.8 vs 2020)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Transfer Record</span>
                <span className="text-purple-400 font-bold">€222M</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Neymar Jr (Barcelona → PSG, 2017) - Still unbroken
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Historical Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-gold-400" />
          5-Year Market Evolution
        </h3>
        
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr className="bg-white/5">
                <th>Metric</th>
                <th>2020</th>
                <th>2021</th>
                <th>2022</th>
                <th>2023</th>
                <th>2024</th>
                <th>2025</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-medium">Total Market Value</td>
                <td>€28.5B</td>
                <td>€25.8B</td>
                <td>€30.2B</td>
                <td>€34.5B</td>
                <td>€38.2B</td>
                <td className="text-gold-400 font-bold">€42.1B</td>
                <td className="text-pitch-400">+47.7%</td>
              </tr>
              <tr>
                <td className="font-medium">Transfer Spending</td>
                <td>€5.2B</td>
                <td>€3.8B</td>
                <td>€6.1B</td>
                <td>€8.5B</td>
                <td>€7.2B</td>
                <td className="text-gold-400 font-bold">€7.8B</td>
                <td className="text-pitch-400">+50.0%</td>
              </tr>
              <tr>
                <td className="font-medium">Avg Transfer Fee</td>
                <td>€8.5M</td>
                <td>€7.2M</td>
                <td>€9.8M</td>
                <td>€12.5M</td>
                <td>€11.8M</td>
                <td className="text-gold-400 font-bold">€12.2M</td>
                <td className="text-pitch-400">+43.5%</td>
              </tr>
              <tr>
                <td className="font-medium">Saudi Pro Value</td>
                <td>€180M</td>
                <td>€190M</td>
                <td>€210M</td>
                <td>€450M</td>
                <td>€950M</td>
                <td className="text-gold-400 font-bold">€1.2B</td>
                <td className="text-purple-400">+567%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
