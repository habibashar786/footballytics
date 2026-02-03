"use client";

import Image from "next/image";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { Player } from "@/types";
import { TrendingUp, TrendingDown, Minus, Star, Award, Users } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  rank?: number;
  showStats?: boolean;
  compact?: boolean;
  className?: string;
}

export function PlayerCard({
  player,
  rank,
  showStats = true,
  compact = false,
  className,
}: PlayerCardProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-500 text-black";
    if (rank === 3) return "bg-gradient-to-r from-orange-400 to-orange-600 text-black";
    return "bg-white/10 text-white";
  };

  const getTrendIcon = () => {
    switch (player.marketValueTrend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-pitch-400" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-400" />;
      default:
        return <Minus className="h-3 w-3 text-gray-400" />;
    }
  };

  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-4 p-4",
          "bg-white/5 hover:bg-white/10 rounded-xl",
          "border border-white/5 hover:border-gold-500/30",
          "transition-all duration-300 cursor-pointer",
          className
        )}
      >
        {/* Rank */}
        {rank && (
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
              getRankBadge(rank)
            )}
          >
            {rank}
          </div>
        )}

        {/* Photo */}
        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white/10">
          <Image
            src={player.photo}
            alt={player.name}
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=random`;
            }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{player.name}</p>
          <p className="text-xs text-muted-foreground">{player.clubName}</p>
        </div>

        {/* Value */}
        <div className="text-right">
          <p className="font-bold text-gold-400">{formatCurrency(player.marketValue)}</p>
          <div className="flex items-center justify-end gap-1">
            {getTrendIcon()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "player-card group cursor-pointer",
        className
      )}
    >
      {/* Rank Badge */}
      {rank && (
        <div
          className={cn(
            "absolute top-3 left-3 flex h-8 w-8 items-center justify-center",
            "rounded-lg text-sm font-bold shadow-lg z-10",
            getRankBadge(rank)
          )}
        >
          {rank}
        </div>
      )}

      {/* Club Logo */}
      <div className="absolute top-3 right-3 z-10">
        <Image
          src={player.clubLogo}
          alt={player.clubName}
          width={32}
          height={32}
          className="rounded-lg shadow-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Player Photo */}
      <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-gradient-to-b from-white/5 to-transparent">
        <Image
          src={player.photo}
          alt={player.name}
          fill
          className="object-contain object-bottom group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=1a1a2e&color=fff&size=200`;
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Player Info */}
      <div className="space-y-3">
        {/* Name & Position */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{player.nationalityFlag}</span>
            <span className="text-sm text-muted-foreground">{player.position}</span>
          </div>
          <h3 className="text-lg font-bold text-foreground group-hover:text-gold-400 transition-colors">
            {player.name}
          </h3>
          <p className="text-sm text-muted-foreground">{player.clubName}</p>
        </div>

        {/* Market Value */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gold-400">
              {formatCurrency(player.marketValue)}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {getTrendIcon()}
              <span className="text-xs text-muted-foreground">Market Value</span>
            </div>
          </div>
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl",
              "bg-gradient-to-br from-gold-500/20 to-gold-600/10",
              "border border-gold-500/30"
            )}
          >
            <span className="text-lg font-bold text-gold-400">#{player.jerseyNumber}</span>
          </div>
        </div>

        {/* Stats */}
        {showStats && (
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
            <div className="text-center">
              <p className="text-lg font-bold text-pitch-400">{player.stats.goals}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Goals</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-400">{player.stats.assists}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Assists</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-purple-400">{player.stats.rating.toFixed(1)}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Rating</p>
            </div>
          </div>
        )}

        {/* Brand Score */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-gold-400" />
            <span className="text-sm text-muted-foreground">Brand Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
                style={{ width: `${player.brandScore}%` }}
              />
            </div>
            <span className="text-sm font-bold text-gold-400">{player.brandScore}</span>
          </div>
        </div>

        {/* Social */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{formatNumber(player.socialFollowers)} followers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
