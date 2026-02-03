"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

interface BarChartProps {
  data: Record<string, string | number>[];
  bars: {
    dataKey: string;
    name: string;
    color: string;
    stackId?: string;
  }[];
  xAxisKey: string;
  title?: string;
  subtitle?: string;
  height?: number;
  layout?: "horizontal" | "vertical";
  showGrid?: boolean;
  showLegend?: boolean;
  formatYAxis?: "currency" | "number" | "percentage";
  className?: string;
  colorByValue?: boolean;
  colors?: string[];
}

const DEFAULT_COLORS = [
  "#FBBF24", // gold
  "#4ADE80", // green
  "#60A5FA", // blue
  "#C084FC", // purple
  "#F87171", // red
  "#FB923C", // orange
];

export function BarChart({
  data,
  bars,
  xAxisKey,
  title,
  subtitle,
  height = 300,
  layout = "horizontal",
  showGrid = true,
  showLegend = true,
  formatYAxis = "number",
  className,
  colorByValue = false,
  colors = DEFAULT_COLORS,
}: BarChartProps) {
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

  const isVertical = layout === "vertical";

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
          <RechartsBarChart
            data={data}
            layout={isVertical ? "vertical" : "horizontal"}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
            )}
            {isVertical ? (
              <>
                <XAxis
                  type="number"
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                  tickFormatter={formatValue}
                />
                <YAxis
                  type="category"
                  dataKey={xAxisKey}
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                  width={100}
                />
              </>
            ) : (
              <>
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
              </>
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [formatValue(value)]}
            />
            {showLegend && bars.length > 1 && (
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => (
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>{value}</span>
                )}
              />
            )}
            {bars.map((bar, idx) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                name={bar.name}
                fill={bar.color}
                stackId={bar.stackId}
                radius={isVertical ? [0, 4, 4, 0] : [4, 4, 0, 0]}
              >
                {colorByValue &&
                  data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
              </Bar>
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// Club Revenue Comparison
export function ClubRevenueChart({
  data,
  className,
}: {
  data: { name: string; revenue: number; wage: number }[];
  className?: string;
}) {
  return (
    <BarChart
      data={data}
      bars={[
        { dataKey: "revenue", name: "Revenue", color: "#4ADE80" },
        { dataKey: "wage", name: "Wages", color: "#F87171" },
      ]}
      xAxisKey="name"
      title="Revenue vs Wages"
      subtitle="Financial comparison"
      formatYAxis="currency"
      className={className}
    />
  );
}

// Transfer Spending by League
export function TransferSpendingChart({
  data,
  className,
}: {
  data: { league: string; spending: number }[];
  className?: string;
}) {
  return (
    <BarChart
      data={data}
      bars={[{ dataKey: "spending", name: "Transfer Spending", color: "#FBBF24" }]}
      xAxisKey="league"
      title="Transfer Spending by League"
      layout="vertical"
      formatYAxis="currency"
      colorByValue
      className={className}
    />
  );
}
