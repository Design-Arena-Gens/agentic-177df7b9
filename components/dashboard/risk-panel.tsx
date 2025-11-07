"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { formatNumber } from "@/lib/formatters";
import type { RiskMetric } from "@/lib/types";

type RiskPanelProps = {
  data?: RiskMetric[];
  riskScore?: number;
};

export default function RiskPanel({ data, riskScore }: RiskPanelProps) {
  return (
    <Card className="flex flex-col gap-4 bg-gradient-to-br from-slate-900/70 to-slate-900/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Risk Surface</h2>
          <p className="text-xs text-slate-400">
            Aggregated posture across operational and market dimensions.
          </p>
        </div>
        <Badge variant="success">
          Composite {formatNumber(riskScore ?? 0, { maximumFractionDigits: 1 })}
        </Badge>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="rgba(148,163,184,0.2)" />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fill: "rgba(148,163,184,0.8)", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                background: "#020617",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "white",
              }}
              formatter={(value: number) => `${value}/100`}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#2EB8FF"
              strokeWidth={2}
              fill="#2EB8FF"
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
