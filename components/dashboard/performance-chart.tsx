"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { clsx } from "clsx";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import type { PerformancePoint } from "@/lib/types";
import { formatCurrency } from "@/lib/formatters";

type TimeRange = "24h" | "72h";

const RANGE_LENGTH: Record<TimeRange, number> = {
  "24h": 24,
  "72h": 72,
};

type PerformanceChartProps = {
  data?: PerformancePoint[];
};

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const [range, setRange] = useState<TimeRange>("72h");

  const transformed = useMemo(() => {
    if (!data?.length) return [];
    const slice = data.slice(-RANGE_LENGTH[range]);
    return slice.map((point) => ({
      time: format(new Date(point.timestamp), "MMM d, HH:mm"),
      equity: point.equity,
      benchmark: point.benchmark,
    }));
  }, [data, range]);

  return (
    <Card className="col-span-full flex h-[420px] flex-col gap-4 bg-gradient-to-br from-slate-900/80 to-slate-900/20 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Strategy Equity Curve
          </h2>
          <p className="text-xs text-slate-400">
            Pooled equity vs benchmark composite (BTC, ETH, SOL market index).
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(["24h", "72h"] as TimeRange[]).map((option) => (
            <Button
              key={option}
              variant={option === range ? "primary" : "ghost"}
              onClick={() => setRange(option)}
              className={clsx(
                "rounded-2xl px-3 py-1 text-xs",
                option !== range && "text-slate-300",
              )}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      <div className="size-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={transformed}>
            <defs>
              <linearGradient id="equity" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#2EB8FF" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#0F172A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="benchmark" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0F172A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" strokeDasharray="4 4" />
            <XAxis
              dataKey="time"
              stroke="rgba(148,163,184,0.6)"
              tickLine={false}
              tick={{ fontSize: 11 }}
              minTickGap={20}
            />
            <YAxis
              stroke="rgba(148,163,184,0.6)"
              tickFormatter={(value) => formatCurrency(value, { notation: "compact" })}
              tickLine={false}
              tick={{ fontSize: 11 }}
              width={90}
            />
            <Tooltip
              contentStyle={{
                background: "#020617",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "white",
              }}
              labelStyle={{ color: "#94A3B8" }}
              formatter={(value) => formatCurrency(Number(value))}
            />
            <Legend verticalAlign="top" align="right" wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="equity"
              name="QuantSight Equity"
              stroke="#2EB8FF"
              strokeWidth={2}
              fill="url(#equity)"
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="benchmark"
              name="Benchmark"
              stroke="#F97316"
              strokeWidth={2}
              fill="url(#benchmark)"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
