"use client";

import { cn, formatNumber, formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number;
  previousValue?: number;
  format?: "number" | "currency" | "percentage";
  currency?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  target?: number;
  className?: string;
  accentColor?: "gold" | "green" | "blue" | "purple" | "red";
}

const accentColors = {
  gold: {
    gradient: "from-gold-500/20 to-gold-600/5",
    border: "border-gold-500/30 hover:border-gold-500/50",
    text: "text-gold-400",
    icon: "text-gold-500",
    bar: "from-gold-500 to-gold-600",
  },
  green: {
    gradient: "from-pitch-500/20 to-pitch-600/5",
    border: "border-pitch-500/30 hover:border-pitch-500/50",
    text: "text-pitch-400",
    icon: "text-pitch-500",
    bar: "from-pitch-500 to-pitch-600",
  },
  blue: {
    gradient: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/30 hover:border-blue-500/50",
    text: "text-blue-400",
    icon: "text-blue-500",
    bar: "from-blue-500 to-blue-600",
  },
  purple: {
    gradient: "from-purple-500/20 to-purple-600/5",
    border: "border-purple-500/30 hover:border-purple-500/50",
    text: "text-purple-400",
    icon: "text-purple-500",
    bar: "from-purple-500 to-purple-600",
  },
  red: {
    gradient: "from-red-500/20 to-red-600/5",
    border: "border-red-500/30 hover:border-red-500/50",
    text: "text-red-400",
    icon: "text-red-500",
    bar: "from-red-500 to-red-600",
  },
};

export function KPICard({
  title,
  value,
  previousValue,
  format = "number",
  currency = "EUR",
  icon: Icon,
  trend,
  target,
  className,
  accentColor = "gold",
}: KPICardProps) {
  const colors = accentColors[accentColor];

  // Calculate change percentage
  const changePercent = previousValue
    ? ((value - previousValue) / previousValue) * 100
    : null;

  // Determine trend from change if not provided
  const effectiveTrend =
    trend || (changePercent ? (changePercent > 0 ? "up" : changePercent < 0 ? "down" : "neutral") : "neutral");

  // Format the display value
  const displayValue = () => {
    switch (format) {
      case "currency":
        return formatCurrency(value, currency);
      case "percentage":
        return `${value.toFixed(1)}%`;
      default:
        return formatNumber(value);
    }
  };

  // Progress towards target
  const progressPercent = target ? Math.min((value / target) * 100, 100) : null;

  return (
    <div
      className={cn(
        "glass-card p-6 relative overflow-hidden group",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        colors.border,
        className
      )}
    >
      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          colors.gradient
        )}
      />

      {/* Top accent bar */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
          colors.bar
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
          </div>
          {Icon && (
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl",
                "bg-white/5 group-hover:bg-white/10 transition-colors",
                colors.icon
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mb-3">
          <p className="text-3xl font-bold text-foreground tabular-nums">
            {displayValue()}
          </p>
        </div>

        {/* Change indicator */}
        {changePercent !== null && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                effectiveTrend === "up" && "bg-pitch-500/20 text-pitch-400",
                effectiveTrend === "down" && "bg-red-500/20 text-red-400",
                effectiveTrend === "neutral" && "bg-gray-500/20 text-gray-400"
              )}
            >
              {effectiveTrend === "up" && <TrendingUp className="h-3 w-3" />}
              {effectiveTrend === "down" && <TrendingDown className="h-3 w-3" />}
              {effectiveTrend === "neutral" && <Minus className="h-3 w-3" />}
              {changePercent >= 0 ? "+" : ""}
              {changePercent.toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground">vs previous</span>
          </div>
        )}

        {/* Progress bar for target */}
        {progressPercent !== null && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress to target</span>
              <span className={colors.text}>{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", colors.bar)}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
