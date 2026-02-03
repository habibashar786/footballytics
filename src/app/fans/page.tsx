"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart,
  Globe,
  Users,
  DollarSign,
  TrendingUp,
  BarChart3,
  MapPin,
  Smartphone,
  ShoppingBag,
  Star,
  PieChart
} from "lucide-react";
import { fanSegments } from "@/data";
import { cn, formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";

const COLORS = ['#FBBF24', '#4ADE80', '#60A5FA', '#C084FC', '#F87171'];

// Simulated time series data
const engagementTrend = [
  { month: "Jan", europe: 88, asia: 72, americas: 78, africa: 84, middleEast: 80 },
  { month: "Feb", europe: 89, asia: 74, americas: 79, africa: 85, middleEast: 82 },
  { month: "Mar", europe: 90, asia: 75, americas: 80, africa: 86, middleEast: 83 },
  { month: "Apr", europe: 91, asia: 76, americas: 81, africa: 87, middleEast: 84 },
  { month: "May", europe: 92, asia: 76, americas: 81, africa: 88, middleEast: 84 },
  { month: "Jun", europe: 92, asia: 76, americas: 81, africa: 88, middleEast: 84 },
];

export default function FansPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const totalFans = fanSegments.reduce((sum, s) => sum + s.totalFans, 0);
  const totalRevenue = fanSegments.reduce((sum, s) => sum + s.merchandiseRevenue, 0);
  const avgEngagement = fanSegments.reduce((sum, s) => sum + s.engagementScore, 0) / fanSegments.length;
  const avgLoyalty = fanSegments.reduce((sum, s) => sum + s.loyaltyIndex, 0) / fanSegments.length;

  const pieData = fanSegments.map(s => ({
    name: s.region,
    value: s.totalFans,
  }));

  const barData = fanSegments.map(s => ({
    region: s.region,
    engagement: s.engagementScore,
    digital: s.digitalEngagement,
    loyalty: s.loyaltyIndex,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Fan</span> Intelligence
        </h1>
        <p className="text-muted-foreground mt-1">
          Global fan demographics, engagement analytics, and revenue insights
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
              <Globe className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatNumber(totalFans)}</p>
              <p className="text-xs text-muted-foreground">Global Fan Base</p>
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
              <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
              <p className="text-xs text-muted-foreground">Merchandise Revenue</p>
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
              <Heart className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgEngagement.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">Avg Engagement</p>
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
              <p className="text-2xl font-bold">{avgLoyalty.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">Avg Loyalty</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fan Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-gold-400" />
            Global Fan Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatNumber(value)}
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Engagement Metrics Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-gold-400" />
            Regional Engagement Metrics
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="region" 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="engagement" name="Engagement" fill="#FBBF24" radius={[4, 4, 0, 0]} />
                <Bar dataKey="digital" name="Digital" fill="#60A5FA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="loyalty" name="Loyalty" fill="#C084FC" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Engagement Trend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-gold-400" />
          Engagement Trend by Region
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis 
                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                domain={[60, 100]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="europe" name="Europe" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.2} />
              <Area type="monotone" dataKey="asia" name="Asia" stroke="#4ADE80" fill="#4ADE80" fillOpacity={0.2} />
              <Area type="monotone" dataKey="americas" name="Americas" stroke="#60A5FA" fill="#60A5FA" fillOpacity={0.2} />
              <Area type="monotone" dataKey="africa" name="Africa" stroke="#C084FC" fill="#C084FC" fillOpacity={0.2} />
              <Area type="monotone" dataKey="middleEast" name="Middle East" stroke="#F87171" fill="#F87171" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Regional Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {fanSegments.map((segment, idx) => (
          <motion.div
            key={segment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            onClick={() => setSelectedRegion(selectedRegion === segment.id ? null : segment.id)}
            className={cn(
              "glass-card p-5 cursor-pointer transition-all hover:-translate-y-1",
              selectedRegion === segment.id && "border-gold-500/50 bg-gold-500/10"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{segment.region}</h3>
              <div 
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold text-gold-400">{formatNumber(segment.totalFans)}</p>
                <p className="text-xs text-muted-foreground">Total Fans</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-red-400" />
                  <span>{segment.engagementScore}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Smartphone className="h-3 w-3 text-blue-400" />
                  <span>{segment.digitalEngagement}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-purple-400" />
                  <span>{segment.loyaltyIndex}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span>{segment.averageAge}y</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Merchandise</span>
                  <span className="text-sm font-bold text-pitch-400">
                    {formatCurrency(segment.merchandiseRevenue)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 bg-gradient-to-r from-gold-500/10 to-transparent border-gold-500/30"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-gold-400" />
          Key Fan Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Highest Engagement</p>
            <p className="text-xl font-bold text-gold-400">Europe (92%)</p>
            <p className="text-xs text-muted-foreground mt-1">Traditional stronghold with mature fan culture</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Fastest Growing</p>
            <p className="text-xl font-bold text-pitch-400">Asia (+15% YoY)</p>
            <p className="text-xs text-muted-foreground mt-1">Digital-first engagement driving growth</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Highest Loyalty</p>
            <p className="text-xl font-bold text-purple-400">Africa (91%)</p>
            <p className="text-xs text-muted-foreground mt-1">Passionate supporter base with deep connection</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
