"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "@/components/ui/card";
import { formatPercent } from "@/lib/formatters";
import type { StrategyPerformance } from "@/lib/types";

type StrategyPerformanceProps = {
  data?: StrategyPerformance[];
};

export default function StrategyPerformanceChart({
  data,
}: StrategyPerformanceProps) {
  const normalized = data?.map((strategy) => ({
    ...strategy,
    drawdownMagnitude: Math.abs(strategy.maxDrawdown),
  }));

  return (
    <Card className="flex flex-col gap-4 bg-gradient-to-br from-slate-900/70 to-slate-900/20">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Strategy Contribution
        </h2>
        <p className="text-xs text-slate-400">
          Return vs drawdown trade-off across deployed playbooks.
        </p>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={normalized} barSize={22}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.12)" />
            <XAxis
              dataKey="strategy"
              stroke="rgba(148,163,184,0.6)"
              tick={{ fontSize: 11 }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="rgba(34,197,94,0.6)"
              tickFormatter={(value) => formatPercent(value / 100)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgba(239,68,68,0.6)"
              tickFormatter={(value) => formatPercent(value / 100)}
            />
            <Tooltip
              contentStyle={{
                background: "#020617",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "white",
              }}
              formatter={(value: number, name: string) => {
                const normalizedValue =
                  name === "Max Drawdown" ? value / -100 : value / 100;
                return formatPercent(normalizedValue);
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="returnPct"
              name="Return"
              fill="#22C55E"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="drawdownMagnitude"
              name="Max Drawdown"
              fill="#F97316"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
