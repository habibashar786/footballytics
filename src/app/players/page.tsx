"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Star,
  ChevronDown,
  Grid3X3,
  List,
  ArrowUpDown
} from "lucide-react";
import { PlayerCard } from "@/components/players/PlayerCard";
import { players } from "@/data";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { Player } from "@/types";

type SortField = "marketValue" | "goals" | "assists" | "rating" | "age" | "brandScore";
type SortOrder = "asc" | "desc";
type ViewMode = "grid" | "list";

const positionFilters = ["All", "FWD", "MID", "DEF", "GK"];
const clubFilters = ["All", ...new Set(players.map(p => p.clubName))];

export default function PlayersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("All");
  const [clubFilter, setClubFilter] = useState("All");
  const [sortField, setSortField] = useState<SortField>("marketValue");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Filter and sort players
  const filteredPlayers = useMemo(() => {
    let result = [...players];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.clubName.toLowerCase().includes(query) ||
          p.nationality.toLowerCase().includes(query)
      );
    }

    // Position filter
    if (positionFilter !== "All") {
      result = result.filter(p => p.positionCategory === positionFilter);
    }

    // Club filter
    if (clubFilter !== "All") {
      result = result.filter(p => p.clubName === clubFilter);
    }

    // Sort
    result.sort((a, b) => {
      let aVal: number, bVal: number;
      
      switch (sortField) {
        case "marketValue":
          aVal = a.marketValue;
          bVal = b.marketValue;
          break;
        case "goals":
          aVal = a.stats.goals;
          bVal = b.stats.goals;
          break;
        case "assists":
          aVal = a.stats.assists;
          bVal = b.stats.assists;
          break;
        case "rating":
          aVal = a.stats.rating;
          bVal = b.stats.rating;
          break;
        case "age":
          aVal = a.age;
          bVal = b.age;
          break;
        case "brandScore":
          aVal = a.brandScore;
          bVal = b.brandScore;
          break;
        default:
          aVal = a.marketValue;
          bVal = b.marketValue;
      }

      return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
    });

    return result;
  }, [searchQuery, positionFilter, clubFilter, sortField, sortOrder]);

  // Stats summary
  const stats = useMemo(() => ({
    totalPlayers: filteredPlayers.length,
    totalValue: filteredPlayers.reduce((sum, p) => sum + p.marketValue, 0),
    avgValue: filteredPlayers.length > 0 
      ? filteredPlayers.reduce((sum, p) => sum + p.marketValue, 0) / filteredPlayers.length 
      : 0,
    totalGoals: filteredPlayers.reduce((sum, p) => sum + p.stats.goals, 0),
  }), [filteredPlayers]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Player</span> Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive player analytics, valuations, and performance metrics
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
              <Users className="h-5 w-5 text-gold-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalPlayers}</p>
              <p className="text-xs text-muted-foreground">Total Players</p>
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
              <TrendingUp className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{formatCurrency(stats.avgValue)}</p>
              <p className="text-xs text-muted-foreground">Avg Value</p>
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
              <Star className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalGoals}</p>
              <p className="text-xs text-muted-foreground">Total Goals</p>
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
              placeholder="Search players, clubs, nationality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50"
            />
          </div>

          {/* Position Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Position:</span>
            <div className="flex gap-1">
              {positionFilters.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPositionFilter(pos)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                    positionFilter === pos
                      ? "bg-gold-500/20 text-gold-400 border border-gold-500/30"
                      : "bg-white/5 text-muted-foreground hover:text-white"
                  )}
                >
                  {pos}
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
              <option value="goals">Goals</option>
              <option value="assists">Assists</option>
              <option value="rating">Rating</option>
              <option value="age">Age</option>
              <option value="brandScore">Brand Score</option>
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

      {/* Players Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map((player, idx) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <PlayerCard player={player} rank={idx + 1} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="data-table">
            <thead>
              <tr className="bg-white/5">
                <th>Rank</th>
                <th>Player</th>
                <th>Club</th>
                <th>Position</th>
                <th>Age</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Rating</th>
                <th>Market Value</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player, idx) => (
                <motion.tr
                  key={player.id}
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
                      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-white/10">
                        <Image
                          src={player.photo}
                          alt={player.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <p className="text-xs text-muted-foreground">{player.nationalityFlag} {player.nationality}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Image
                        src={player.clubLogo}
                        alt={player.clubName}
                        width={24}
                        height={24}
                        className="rounded"
                      />
                      <span className="text-sm">{player.clubName}</span>
                    </div>
                  </td>
                  <td>
                    <span className="px-2 py-1 rounded-full text-xs bg-white/10">
                      {player.positionCategory}
                    </span>
                  </td>
                  <td>{player.age}</td>
                  <td className="font-bold text-pitch-400">{player.stats.goals}</td>
                  <td className="font-bold text-blue-400">{player.stats.assists}</td>
                  <td>
                    <span className="font-bold text-purple-400">{player.stats.rating.toFixed(1)}</span>
                  </td>
                  <td className="font-bold text-gold-400">{formatCurrency(player.marketValue)}</td>
                  <td>
                    {player.marketValueTrend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-pitch-400" />
                    ) : player.marketValueTrend === "down" ? (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {filteredPlayers.length === 0 && (
        <div className="glass-card p-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No players found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
}
