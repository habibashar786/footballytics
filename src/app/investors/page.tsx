"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Briefcase,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  PieChart,
  BarChart3,
  Globe,
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { clubs } from "@/data";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";

const COLORS = ['#FBBF24', '#4ADE80', '#60A5FA', '#C084FC', '#F87171', '#FB923C'];

// Simulated investor data
const investors = [
  {
    id: "cfg",
    name: "City Football Group",
    type: "Private Equity",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/City_Football_Group_logo.svg/200px-City_Football_Group_logo.svg.png",
    clubsOwned: ["Manchester City", "Melbourne City", "New York City FC", "Girona FC"],
    totalInvestment: 4_500_000_000,
    portfolioValue: 6_800_000_000,
    roi: 51.1,
    acquisitionYear: 2008,
  },
  {
    id: "qsi",
    name: "Qatar Sports Investments",
    type: "Sovereign Fund",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/Qatar_Sports_Investments_Logo.svg/200px-Qatar_Sports_Investments_Logo.svg.png",
    clubsOwned: ["Paris Saint-Germain"],
    totalInvestment: 2_200_000_000,
    portfolioValue: 4_100_000_000,
    roi: 86.4,
    acquisitionYear: 2011,
  },
  {
    id: "fsg",
    name: "Fenway Sports Group",
    type: "Private Equity",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Fenway_Sports_Group_logo.svg/200px-Fenway_Sports_Group_logo.svg.png",
    clubsOwned: ["Liverpool FC", "Boston Red Sox", "Pittsburgh Penguins"],
    totalInvestment: 480_000_000,
    portfolioValue: 5_200_000_000,
    roi: 983.3,
    acquisitionYear: 2010,
  },
  {
    id: "ineos",
    name: "INEOS",
    type: "Industrial Group",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/INEOS_logo.svg/200px-INEOS_logo.svg.png",
    clubsOwned: ["Manchester United (27.7%)", "OGC Nice", "Lausanne-Sport"],
    totalInvestment: 1_800_000_000,
    portfolioValue: 2_400_000_000,
    roi: 33.3,
    acquisitionYear: 2024,
  },
  {
    id: "redbird",
    name: "RedBird Capital",
    type: "Private Equity",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/RedBird_Capital_Partners_Logo.svg/200px-RedBird_Capital_Partners_Logo.svg.png",
    clubsOwned: ["AC Milan", "Toulouse FC"],
    totalInvestment: 1_200_000_000,
    portfolioValue: 1_800_000_000,
    roi: 50.0,
    acquisitionYear: 2022,
  },
];

// Valuation trend data
const valuationTrend = [
  { year: "2019", value: 28.5 },
  { year: "2020", value: 24.2 },
  { year: "2021", value: 29.8 },
  { year: "2022", value: 35.2 },
  { year: "2023", value: 42.1 },
  { year: "2024", value: 48.6 },
];

// Ownership structure
const ownershipTypes = [
  { name: "Private Equity", value: 42 },
  { name: "Sovereign Funds", value: 18 },
  { name: "Billionaire Owners", value: 25 },
  { name: "Member-Owned", value: 8 },
  { name: "Public Companies", value: 7 },
];

export default function InvestorsPage() {
  const [selectedInvestor, setSelectedInvestor] = useState<string | null>(null);

  const totalInvestment = investors.reduce((sum, i) => sum + i.totalInvestment, 0);
  const totalValue = investors.reduce((sum, i) => sum + i.portfolioValue, 0);
  const avgRoi = investors.reduce((sum, i) => sum + i.roi, 0) / investors.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Investor</span> Intelligence
        </h1>
        <p className="text-muted-foreground mt-1">
          Football club ownership, valuations, and investment analytics
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
              <DollarSign className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalInvestment)}</p>
              <p className="text-xs text-muted-foreground">Total Investment</p>
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
              <Building2 className="h-6 w-6 text-pitch-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
              <p className="text-xs text-muted-foreground">Portfolio Value</p>
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
              <TrendingUp className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgRoi.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground">Average ROI</p>
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
              <Briefcase className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{investors.length}</p>
              <p className="text-xs text-muted-foreground">Major Investors</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Valuation Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gold-400" />
            Top 20 Clubs Valuation Trend (€B)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={valuationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickFormatter={(value) => `€${value}B`}
                />
                <Tooltip 
                  formatter={(value: number) => [`€${value}B`, 'Valuation']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#FBBF24" 
                  strokeWidth={3}
                  dot={{ fill: '#FBBF24', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Ownership Structure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-gold-400" />
            Ownership Structure (Top 100 Clubs)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={ownershipTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {ownershipTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Share']}
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
      </div>

      {/* Investor Cards */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Major Football Investors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {investors.map((investor, idx) => (
            <motion.div
              key={investor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedInvestor(selectedInvestor === investor.id ? null : investor.id)}
              className={cn(
                "glass-card p-6 cursor-pointer transition-all hover:-translate-y-1",
                selectedInvestor === investor.id && "border-gold-500/50 bg-gold-500/10"
              )}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden">
                  <Briefcase className="h-6 w-6 text-gold-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{investor.name}</h4>
                  <p className="text-xs text-muted-foreground">{investor.type} • Since {investor.acquisitionYear}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Investment</span>
                  <span className="font-semibold">{formatCurrency(investor.totalInvestment)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Portfolio Value</span>
                  <span className="font-semibold text-gold-400">{formatCurrency(investor.portfolioValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">ROI</span>
                  <span className={cn(
                    "font-semibold flex items-center gap-1",
                    investor.roi > 50 ? "text-pitch-400" : investor.roi > 0 ? "text-blue-400" : "text-red-400"
                  )}>
                    {investor.roi > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {investor.roi.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-muted-foreground mb-2">Portfolio:</p>
                <div className="flex flex-wrap gap-1">
                  {investor.clubsOwned.map((club) => (
                    <span
                      key={club}
                      className="px-2 py-1 text-xs rounded-full bg-white/10"
                    >
                      {club}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-gold-400" />
          Investment Risk Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-pitch-500/10 border border-pitch-500/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-pitch-400" />
              <span className="font-semibold text-pitch-400">Low Risk</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premier League clubs, member-owned Spanish clubs, established German clubs with 50+1 rule
            </p>
          </div>
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold text-yellow-400">Medium Risk</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Emerging league clubs, clubs with high wage ratios, recent ownership changes
            </p>
          </div>
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="font-semibold text-red-400">High Risk</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Clubs with financial distress, regulatory uncertainty, geopolitical exposure
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
