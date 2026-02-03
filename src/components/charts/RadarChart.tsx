"use client";

import { 
  RadarChart as RechartsRadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RadarChartProps {
  data: {
    subject: string;
    value: number;
    fullMark?: number;
  }[];
  title?: string;
  color?: string;
  showLegend?: boolean;
  className?: string;
  comparison?: {
    data: { subject: string; value: number }[];
    label: string;
    color: string;
  };
}

export function RadarChart({
  data,
  title,
  color = "#FBBF24",
  showLegend = false,
  className,
  comparison,
}: RadarChartProps) {
  // Normalize data to include fullMark if not provided
  const normalizedData = data.map(d => ({
    ...d,
    fullMark: d.fullMark || 100,
  }));

  // Merge comparison data if provided
  const mergedData = comparison
    ? normalizedData.map(d => {
        const compItem = comparison.data.find(c => c.subject === d.subject);
        return {
          ...d,
          comparison: compItem?.value || 0,
        };
      })
    : normalizedData;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn("glass-card p-6", className)}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
      )}
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={mergedData}>
            <PolarGrid 
              stroke="rgba(255,255,255,0.2)" 
              gridType="polygon"
            />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              tickLine={false}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]}
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
              tickCount={5}
            />
            <Radar
              name="Stats"
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.3}
              strokeWidth={2}
            />
            {comparison && (
              <Radar
                name={comparison.label}
                dataKey="comparison"
                stroke={comparison.color}
                fill={comparison.color}
                fillOpacity={0.2}
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
              }}
            />
            {showLegend && <Legend />}
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// Player stats radar helper
export function PlayerStatsRadar({ 
  player, 
  comparison,
  className 
}: { 
  player: {
    name: string;
    stats: {
      goals: number;
      assists: number;
      passAccuracy: number;
      rating: number;
      tacklesWon: number;
      aerialDuelsWon: number;
    };
  };
  comparison?: {
    name: string;
    stats: typeof player.stats;
  };
  className?: string;
}) {
  const data = [
    { subject: "Goals", value: Math.min(player.stats.goals * 3, 100) },
    { subject: "Assists", value: Math.min(player.stats.assists * 5, 100) },
    { subject: "Passing", value: player.stats.passAccuracy },
    { subject: "Rating", value: player.stats.rating * 10 },
    { subject: "Tackles", value: Math.min(player.stats.tacklesWon, 100) },
    { subject: "Aerial", value: Math.min(player.stats.aerialDuelsWon, 100) },
  ];

  const comparisonData = comparison
    ? {
        label: comparison.name,
        color: "#60A5FA",
        data: [
          { subject: "Goals", value: Math.min(comparison.stats.goals * 3, 100) },
          { subject: "Assists", value: Math.min(comparison.stats.assists * 5, 100) },
          { subject: "Passing", value: comparison.stats.passAccuracy },
          { subject: "Rating", value: comparison.stats.rating * 10 },
          { subject: "Tackles", value: Math.min(comparison.stats.tacklesWon, 100) },
          { subject: "Aerial", value: Math.min(comparison.stats.aerialDuelsWon, 100) },
        ],
      }
    : undefined;

  return (
    <RadarChart
      data={data}
      title={`${player.name} Stats`}
      color="#FBBF24"
      comparison={comparisonData}
      showLegend={!!comparison}
      className={className}
    />
  );
}
