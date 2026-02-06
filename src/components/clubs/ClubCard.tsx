"use client";

import { useState } from "react";
import Image from "next/image";
import { cn, formatCurrency, formatNumber, getPlaceholderImage } from "@/lib/utils";
import { Club } from "@/types";
import { Trophy, Users, TrendingUp, Building2, DollarSign, Shield } from "lucide-react";

interface ClubCardProps {
  club: Club;
  rank?: number;
  showDetails?: boolean;
  className?: string;
}

export function ClubCard({
  club,
  rank,
  showDetails = true,
  className,
}: ClubCardProps) {
  const [logoError, setLogoError] = useState(false);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-black";
    if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-600 text-black";
    return "bg-white/10 text-white";
  };

  const wageRatioStatus = () => {
    if (club.wageRatio <= 0.55) return { color: "text-pitch-400", label: "Excellent" };
    if (club.wageRatio <= 0.65) return { color: "text-blue-400", label: "Good" };
    if (club.wageRatio <= 0.70) return { color: "text-yellow-400", label: "Average" };
    return { color: "text-red-400", label: "High" };
  };

  const wageStatus = wageRatioStatus();

  // Generate a club color based on name for fallback
  const getClubColor = (name: string) => {
    const colors: Record<string, string> = {
      'Real Madrid': '1a1a2e',
      'Barcelona': 'a50044',
      'Man City': '6caddf',
      'Liverpool': 'c8102e',
      'Bayern': 'dc052d',
      'PSG': '004170',
      'Al-Hilal': '1a2b5f',
      'Al-Nassr': 'ffd700',
      'Flamengo': 'b52126',
      'Palmeiras': '006437',
    };
    return colors[club.shortName] || '1a1a2e';
  };

  return (
    <div
      className={cn(
        "glass-card p-6 relative overflow-hidden group cursor-pointer",
        "hover:border-gold-500/30 hover:shadow-xl hover:shadow-gold-500/5",
        "transition-all duration-500 hover:-translate-y-2",
        className
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Rank Badge */}
      {rank && (
        <div
          className={cn(
            "absolute top-4 right-4 flex h-10 w-10 items-center justify-center",
            "rounded-xl text-lg font-bold shadow-lg z-10",
            getRankBadge(rank)
          )}
        >
          {rank}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {/* Club Logo & Name */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative h-20 w-20 flex-shrink-0 flex items-center justify-center">
            {logoError ? (
              <div 
                className="h-16 w-16 rounded-xl flex items-center justify-center text-2xl font-bold"
                style={{ backgroundColor: `#${getClubColor(club.shortName)}` }}
              >
                <Shield className="h-8 w-8 text-white" />
              </div>
            ) : (
              <Image
                src={club.logo}
                alt={club.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-500"
                unoptimized
                onError={() => setLogoError(true)}
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-foreground group-hover:text-gold-400 transition-colors truncate">
              {club.name}
            </h3>
            <p className="text-sm text-muted-foreground">{club.stadium}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="league-badge text-xs">
                {club.leagueId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Market Value */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-1">Squad Market Value</p>
          <p className="text-3xl font-bold text-gold-400">
            {formatCurrency(club.marketValue)}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <TrendingUp className="h-4 w-4 text-pitch-400" />
            <span className="text-sm text-pitch-400">+8.5% this season</span>
          </div>
        </div>

        {/* Stats Grid */}
        {showDetails && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            {/* Revenue */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Revenue</span>
              </div>
              <p className="text-lg font-bold">{formatCurrency(club.revenue)}</p>
            </div>

            {/* Trophies */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Trophy className="h-4 w-4 text-gold-400" />
                <span className="text-xs text-muted-foreground">Trophies</span>
              </div>
              <p className="text-lg font-bold text-gold-400">{club.trophies}</p>
            </div>

            {/* Capacity */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Capacity</span>
              </div>
              <p className="text-lg font-bold">{formatNumber(club.capacity)}</p>
            </div>

            {/* Wage Ratio */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Wage Ratio</span>
              </div>
              <p className={cn("text-lg font-bold", wageStatus.color)}>
                {(club.wageRatio * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        )}

        {/* Brand Index */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Brand Index</span>
            <span className="text-sm font-bold text-gold-400">{club.brandIndex}/100</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-600 rounded-full transition-all duration-500"
              style={{ width: `${club.brandIndex}%` }}
            />
          </div>
        </div>

        {/* Global Ranking */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <span className="text-sm text-muted-foreground">Global Ranking</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold gradient-text">#{club.globalRanking}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
