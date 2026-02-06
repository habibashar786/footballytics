"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  BarChart3,
  PieChart,
  Filter,
  Search,
  Clock,
  CheckCircle,
  Eye,
} from "lucide-react";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { leagues, clubs, players, kpis } from "@/data";

interface Report {
  id: string;
  title: string;
  description: string;
  type: "market" | "player" | "club" | "league" | "financial";
  date: string;
  pages: number;
  downloads: number;
  views: number;
  status: "ready" | "generating" | "scheduled";
  icon: typeof FileText;
}

const reports: Report[] = [
  {
    id: "market-2025-q1",
    title: "Global Football Market Report Q1 2025",
    description: "Comprehensive analysis of market valuations, transfer trends, and financial health across top leagues.",
    type: "market",
    date: "2025-01-15",
    pages: 45,
    downloads: 1250,
    views: 5840,
    status: "ready",
    icon: TrendingUp,
  },
  {
    id: "player-valuations-2025",
    title: "Player Valuation Index 2025",
    description: "In-depth analysis of top 100 most valuable players with AI-powered projections.",
    type: "player",
    date: "2025-01-10",
    pages: 32,
    downloads: 890,
    views: 4200,
    status: "ready",
    icon: Users,
  },
  {
    id: "saudi-pro-analysis",
    title: "Saudi Pro League Market Analysis",
    description: "Special report on the explosive growth of Saudi Pro League and its global impact.",
    type: "league",
    date: "2025-01-08",
    pages: 28,
    downloads: 2100,
    views: 8500,
    status: "ready",
    icon: Globe,
  },
  {
    id: "transfer-window-2025",
    title: "January Transfer Window 2025",
    description: "Real-time tracking and analysis of all major transfers with ROI predictions.",
    type: "financial",
    date: "2025-01-31",
    pages: 0,
    downloads: 0,
    views: 320,
    status: "generating",
    icon: DollarSign,
  },
  {
    id: "club-financial-health",
    title: "Club Financial Health Report",
    description: "FFP compliance analysis and financial sustainability scores for top 50 clubs.",
    type: "club",
    date: "2025-02-01",
    pages: 38,
    downloads: 0,
    views: 0,
    status: "scheduled",
    icon: BarChart3,
  },
];

const reportTypes = [
  { id: "all", label: "All Reports", icon: FileText },
  { id: "market", label: "Market", icon: TrendingUp },
  { id: "player", label: "Players", icon: Users },
  { id: "club", label: "Clubs", icon: PieChart },
  { id: "league", label: "Leagues", icon: Globe },
  { id: "financial", label: "Financial", icon: DollarSign },
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = reports.filter((report) => {
    const matchesType = selectedType === "all" || report.type === selectedType;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "ready":
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-pitch-500/20 text-pitch-400 text-xs">
            <CheckCircle className="h-3 w-3" />
            Ready
          </span>
        );
      case "generating":
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
            <Clock className="h-3 w-3 animate-spin" />
            Generating
          </span>
        );
      case "scheduled":
        return (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs">
            <Calendar className="h-3 w-3" />
            Scheduled
          </span>
        );
    }
  };

  const getTypeColor = (type: Report["type"]) => {
    switch (type) {
      case "market": return "text-gold-400 bg-gold-500/20";
      case "player": return "text-purple-400 bg-purple-500/20";
      case "club": return "text-blue-400 bg-blue-500/20";
      case "league": return "text-pitch-400 bg-pitch-500/20";
      case "financial": return "text-red-400 bg-red-500/20";
    }
  };

  // Calculate summary stats
  const totalReports = reports.length;
  const totalDownloads = reports.reduce((sum, r) => sum + r.downloads, 0);
  const totalViews = reports.reduce((sum, r) => sum + r.views, 0);
  const readyReports = reports.filter(r => r.status === "ready").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Reports</span> & Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Download comprehensive football intelligence reports
          </p>
        </div>
        <button className="btn-premium flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Generate Custom Report
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gold-500/20">
              <FileText className="h-6 w-6 text-gold-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalReports}</p>
              <p className="text-xs text-muted-foreground">Total Reports</p>
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
              <CheckCircle className="h-6 w-6 text-pitch-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{readyReports}</p>
              <p className="text-xs text-muted-foreground">Ready to Download</p>
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
              <Download className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatNumber(totalDownloads)}</p>
              <p className="text-xs text-muted-foreground">Total Downloads</p>
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
              <Eye className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatNumber(totalViews)}</p>
              <p className="text-xs text-muted-foreground">Total Views</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
          />
        </div>

        {/* Type Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                selectedType === type.id
                  ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 border border-white/10"
              )}
            >
              <type.icon className="h-4 w-4" />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report, idx) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 hover:border-gold-500/30 transition-all duration-300 group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={cn("p-3 rounded-xl", getTypeColor(report.type))}>
                <report.icon className="h-6 w-6" />
              </div>
              {getStatusBadge(report.status)}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-gold-400 transition-colors">
              {report.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {report.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(report.date).toLocaleDateString()}
              </span>
              {report.pages > 0 && (
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {report.pages} pages
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-1 text-sm">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span>{formatNumber(report.downloads)}</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span>{formatNumber(report.views)}</span>
              </div>
              <div className="flex-1" />
              {report.status === "ready" && (
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500/20 text-gold-400 text-sm font-medium hover:bg-gold-500/30 transition-colors">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Platform Summary Report */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-gold-400" />
          Platform Summary
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 rounded-xl bg-white/5">
            <p className="text-3xl font-bold text-gold-400">{leagues.length}</p>
            <p className="text-sm text-muted-foreground">Leagues Tracked</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5">
            <p className="text-3xl font-bold text-pitch-400">{clubs.length}</p>
            <p className="text-sm text-muted-foreground">Clubs Analyzed</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5">
            <p className="text-3xl font-bold text-blue-400">{players.length}</p>
            <p className="text-sm text-muted-foreground">Players Tracked</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/5">
            <p className="text-3xl font-bold text-purple-400">{formatCurrency(kpis[0].value)}</p>
            <p className="text-sm text-muted-foreground">Total Market Value</p>
          </div>
        </div>

        {/* Key Insights */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-pitch-500/10 border border-pitch-500/20">
              <p className="text-pitch-400 font-medium">Market Growth</p>
              <p className="text-sm text-muted-foreground mt-1">
                Global football market value increased by 10.2% YoY, reaching €42.1B
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/20">
              <p className="text-gold-400 font-medium">Saudi Pro League</p>
              <p className="text-sm text-muted-foreground mt-1">
                567% growth in market value over 5 years, now €1.2B total
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-blue-400 font-medium">Transfer Activity</p>
              <p className="text-sm text-muted-foreground mt-1">
                €7.8B in transfer volume, average fee €12.2M (+43.5% vs 2020)
              </p>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <p className="text-purple-400 font-medium">Fan Engagement</p>
              <p className="text-sm text-muted-foreground mt-1">
                2.6B global fans, 92% digital engagement in Asia-Pacific region
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
