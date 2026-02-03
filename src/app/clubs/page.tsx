"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Search, 
  TrendingUp,
  Trophy,
  Users,
  DollarSign,
  Building2,
  MapPin,
  ArrowUpDown,
  Grid3X3,
  List,
  BarChart3
} from "lucide-react";
import { ClubCard } from "@/components/clubs/ClubCard";
import { clubs, getLeagueById } from "@/data";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

type SortField = "marketValue" | "revenue" | "trophies" | "brandIndex" | "capacity";
type SortOrder = "asc" | "desc";
type ViewMode = "grid" | "list";

const leagueFilters = ["All", "premier-league", "la-liga", "bundesliga", "serie-a", "ligue-1"];

export default function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [leagueFilter, setLeagueFilter] = useState("All");
  const [sortField, setSortField] = useState<SortField>("marketValue");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Filter and sort clubs
  const filteredClubs = useMemo(() => {
    let result = [...clubs];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        c =>
          c.name.toLowerCase().includes(query) ||
          c.stadium.toLowerCase().includes(query) ||
          c.owner.toLowerCase().includes(query)
      );
    }

    // League filter
    if (leagueFilter !== "All") {
      result = result.filter(c => c.leagueId === leagueFilter);
    }

    // Sort
    result.sort((a, b) => {
      let aVal: number, bVal: number;
      
      switch (sortField) {
        case "marketValue":
          aVal = a.marketValue;
          bVal = b.marketValue;
          break;
        case "revenue":
          aVal = a.revenue;
          bVal = b.revenue;
          break;
        case "trophies":
          aVal = a.trophies;
          bVal = b.trophies;
          break;
        case "brandIndex":
          aVal = a.brandIndex;
          bVal = b.brandIndex;
          break;
        case "capacity":
          aVal = a.capacity;
          bVal = b.capacity;
          break;
        default:
          aVal = a.marketValue;
          bVal = b.marketValue;
      }

      return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
    });

    return result;
  }, [searchQuery, leagueFilter, sortField, sortOrder]);

  // Stats summary
  const stats = useMemo(() => ({
    totalClubs: filteredClubs.length,
    totalValue: filteredClubs.reduce((sum, c) => sum + c.marketValue, 0),
    totalRevenue: filteredClubs.reduce((sum, c) => sum + c.revenue, 0),
    totalTrophies: filteredClubs.reduce((sum, c) => sum + c.trophies, 0),
  }), [filteredClubs]);

  const getLeagueName = (leagueId: string) => {
    const league = getLeagueById(leagueId);
    return league?.name || leagueId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Club</span> Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive club analytics, valuations, and financial metrics
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === "grid" ? "bg-gold-500/20 text-gold-400" : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            <Grid3X3 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-lg transition-colors",
              viewMode === "list" ? "bg-gold-500/20 text-gold-400" : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gold-500/20">
              <Building2 className="h-5 w-5 text-gold-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalClubs}</p>
              <p className="text-xs text-muted-foreground">Total Clubs</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pitch-500/20">
              <DollarSign className="h-5 w-5 text-pitch-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalValue)}</p>
              <p className="text-xs text-muted-foreground">Total Value</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <BarChart3 className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-xs text-muted-foreground">Total Revenue</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Trophy className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalTrophies}</p>
              <p className="text-xs text-muted-foreground">Total Trophies</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search clubs, stadiums, owners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
            />
          </div>

          {/* League Filter */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-sm text-muted-foreground whitespace-nowrap">League:</span>
            <div className="flex gap-1">
              {leagueFilters.map((league) => (
                <button
                  key={league}
                  onClick={() => setLeagueFilter(league)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    leagueFilter === league
                      ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                      : "bg-white/5 text-muted-foreground hover:text-white"
                  )}
                >
                  {league === "All" ? "All" : getLeagueName(league).split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
            >
              <option value="marketValue">Market Value</option>
              <option value="revenue">Revenue</option>
              <option value="trophies">Trophies</option>
              <option value="brandIndex">Brand Index</option>
              <option value="capacity">Capacity</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className={cn(
                "p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors",
                sortOrder === "desc" ? "text-gold-400" : "text-muted-foreground"
              )}
            >
              <ArrowUpDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Clubs Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club, idx) => (
            <motion.div
              key={club.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <ClubCard club={club} rank={idx + 1} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="data-table">
            <thead>
              <tr className="bg-white/5">
                <th>Rank</th>
                <th>Club</th>
                <th>League</th>
                <th>Stadium</th>
                <th>Owner</th>
                <th>Market Value</th>
                <th>Revenue</th>
                <th>Wage Ratio</th>
                <th>Trophies</th>
                <th>Brand</th>
              </tr>
            </thead>
            <tbody>
              {filteredClubs.map((club, idx) => (
                <motion.tr
                  key={club.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="hover:bg-white/5 cursor-pointer"
                >
                  <td>
                    <span className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
                      idx === 0 ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black" :
                      idx === 1 ? "bg-gradient-to-r from-gray-300 to-gray-500 text-black" :
                      idx === 2 ? "bg-gradient-to-r from-orange-400 to-orange-600 text-black" :
                      "bg-white/10 text-white"
                    )}>
                      {idx + 1}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <Image
                        src={club.logo}
                        alt={club.name}
                        width={40}
                        height={40}
                        className="rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{club.name}</p>
                        <p className="text-xs text-muted-foreground">Founded {club.founded}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="league-badge text-xs">{getLeagueName(club.leagueId).split(' ')[0]}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{club.stadium}</span>
                    </div>
                  </td>
                  <td className="text-sm text-muted-foreground">{club.owner}</td>
                  <td className="font-bold text-gold-400">{formatCurrency(club.marketValue)}</td>
                  <td className="font-bold text-pitch-400">{formatCurrency(club.revenue)}</td>
                  <td>
                    <span className={cn(
                      "font-medium",
                      club.wageRatio <= 0.60 ? "text-pitch-400" :
                      club.wageRatio <= 0.70 ? "text-yellow-400" :
                      "text-red-400"
                    )}>
                      {(club.wageRatio * 100).toFixed(0)}%
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-gold-400" />
                      <span className="font-bold">{club.trophies}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
                          style={{ width: `${club.brandIndex}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{club.brandIndex}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredClubs.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No clubs found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
