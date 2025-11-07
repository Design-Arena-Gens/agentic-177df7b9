"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type SparklineProps = {
  data: { value: number }[];
  color?: string;
};

export default function Sparkline({
  data,
  color = "#2EB8FF",
}: SparklineProps) {
  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="sparkline" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.45} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          contentStyle={{
            background: "#020617",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "white",
          }}
          labelStyle={{ color: "#94A3B8" }}
        />
        <Area
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill="url(#sparkline)"
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
