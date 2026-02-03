"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

interface LineChartProps {
  data: Record<string, string | number>[];
  lines: {
    dataKey: string;
    name: string;
    color: string;
    strokeWidth?: number;
    dashed?: boolean;
  }[];
  xAxisKey: string;
  title?: string;
  subtitle?: string;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  formatYAxis?: "currency" | "number" | "percentage";
  className?: string;
  filled?: boolean;
}

export function LineChart({
  data,
  lines,
  xAxisKey,
  title,
  subtitle,
  height = 300,
  showGrid = true,
  showLegend = true,
  formatYAxis = "number",
  className,
  filled = false,
}: LineChartProps) {
  const formatValue = (value: number) => {
    switch (formatYAxis) {
      case "currency":
        return formatCurrency(value);
      case "percentage":
        return `${value}%`;
      default:
        return formatNumber(value);
    }
  };

  const ChartComponent = filled ? AreaChart : RechartsLineChart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("glass-card p-6", className)}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}

      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
            )}
            <XAxis
              dataKey={xAxisKey}
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
              tickFormatter={formatValue}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [formatValue(value)]}
            />
            {showLegend && (
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>{value}</span>
                )}
              />
            )}
            {lines.map((line) =>
              filled ? (
                <Area
                  key={line.dataKey}
                  type="monotone"
                  dataKey={line.dataKey}
                  name={line.name}
                  stroke={line.color}
                  fill={line.color}
                  fillOpacity={0.2}
                  strokeWidth={line.strokeWidth || 2}
                  strokeDasharray={line.dashed ? "5 5" : undefined}
                />
              ) : (
                <Line
                  key={line.dataKey}
                  type="monotone"
                  dataKey={line.dataKey}
                  name={line.name}
                  stroke={line.color}
                  strokeWidth={line.strokeWidth || 2}
                  strokeDasharray={line.dashed ? "5 5" : undefined}
                  dot={{ fill: line.color, strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: line.color }}
                />
              )
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// Market Value Trend Chart
export function MarketValueTrendChart({
  data,
  title = "Market Value Trend",
  className,
}: {
  data: { year: number; value: number }[];
  title?: string;
  className?: string;
}) {
  const chartData = data.map((d) => ({
    year: d.year.toString(),
    value: d.value,
  }));

  return (
    <LineChart
      data={chartData}
      lines={[
        {
          dataKey: "value",
          name: "Market Value",
          color: "#FBBF24",
          strokeWidth: 3,
        },
      ]}
      xAxisKey="year"
      title={title}
      formatYAxis="currency"
      filled
      className={className}
    />
  );
}

// Multi-League Comparison Chart
export function LeagueComparisonChart({
  data,
  className,
}: {
  data: {
    year: string;
    premierLeague?: number;
    laLiga?: number;
    bundesliga?: number;
    serieA?: number;
    saudiPro?: number;
  }[];
  className?: string;
}) {
  return (
    <LineChart
      data={data}
      lines={[
        { dataKey: "premierLeague", name: "Premier League", color: "#FBBF24" },
        { dataKey: "laLiga", name: "La Liga", color: "#F87171" },
        { dataKey: "bundesliga", name: "Bundesliga", color: "#4ADE80" },
        { dataKey: "serieA", name: "Serie A", color: "#60A5FA" },
        { dataKey: "saudiPro", name: "Saudi Pro", color: "#C084FC" },
      ]}
      xAxisKey="year"
      title="League Market Value Comparison"
      subtitle="5-year trend analysis"
      formatYAxis="currency"
      className={className}
    />
  );
}
