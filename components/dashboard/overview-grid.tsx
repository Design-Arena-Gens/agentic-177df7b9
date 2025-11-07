"use client";

import {
  ActivitySquare,
  Gauge,
  Radar,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import Card from "@/components/ui/card";
import StatCard from "@/components/ui/stat-card";
import Sparkline from "@/components/ui/sparkline";
import { formatCurrency, formatPercent, formatNumber } from "@/lib/formatters";
import type { DashboardSummary, PerformancePoint, TradingBot } from "@/lib/types";

type OverviewGridProps = {
  summary?: DashboardSummary;
  bots?: TradingBot[];
  performance?: PerformancePoint[];
};

export default function OverviewGrid({
  summary,
  bots,
  performance,
}: OverviewGridProps) {
  const latestEquity = performance?.at(-1)?.equity ?? summary?.equity ?? 0;
  const avgLatency =
    bots && bots.length
      ? bots.reduce((acc, bot) => acc + bot.latency, 0) / bots.length
      : 0;
  const avgDrawdown =
    bots && bots.length
      ? bots.reduce((acc, bot) => acc + bot.drawdown, 0) / bots.length
      : 0;
  const runningBots = bots?.filter((bot) => bot.status === "running") ?? [];

  const sparklineData =
    performance
      ?.slice(-20)
      .map((point) => ({
        value: Math.max(0, point.equity),
      })) ?? [];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="AUM Controlled"
        value={formatCurrency(latestEquity)}
        icon={<Radar className="size-4" />}
        delta={
          ((summary?.pnl7d ?? 0) / Math.max(latestEquity, 1)) * 100
        }
        deltaLabel="%"
        helperText={`Net P&L (7d) ${formatCurrency(summary?.pnl7d ?? 0)}`}
        accent="bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.25),_rgba(15,23,42,0.8))]"
        className="relative overflow-hidden"
      >
        <Sparkline data={sparklineData} color="#2EB8FF" />
      </StatCard>
      <Card className="flex flex-col gap-4 bg-gradient-to-br from-emerald-500/10 via-slate-900/60 to-slate-900/40">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Daily Yield</span>
          <TrendingUp className="size-4 text-emerald-300" />
        </div>
        <p className="text-3xl font-semibold text-white">
          {formatCurrency(summary?.pnl24h ?? 0)}
        </p>
        <p className="text-xs text-slate-400">
          From {runningBots.length} actively executing strategies
        </p>
        <Sparkline
          data={
            sparklineData.length
              ? sparklineData.map((item, index) => ({
                  value: item.value - (sparklineData[0]?.value ?? 0) + index * 180,
                }))
              : [{ value: 0 }]
          }
          color="#22C55E"
        />
      </Card>
      <Card className="flex flex-col gap-3 bg-gradient-to-br from-slate-900/70 to-slate-900/20">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Win Rate</span>
          <Shield className="size-4 text-brand-200" />
        </div>
        <p className="text-3xl font-semibold text-white">
          {formatPercent(summary?.winRate ?? 0)}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Zap className="size-4 text-amber-300" />
          Sharpe {formatNumber(summary?.sharpe ?? 0, { maximumFractionDigits: 2 })}
        </div>
        <p className="text-xs text-slate-500">
          Best performer: {summary?.bestPerformer ?? "—"}
        </p>
      </Card>
      <Card className="flex flex-col gap-3 bg-gradient-to-br from-slate-900/70 to-slate-900/20">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Execution Health</span>
          <ActivitySquare className="size-4 text-sky-300" />
        </div>
        <p className="text-3xl font-semibold text-white">
          {formatNumber(avgLatency, { maximumFractionDigits: 0 })} ms
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Gauge className="size-4 text-emerald-300" />
          Drawdown {formatPercent(avgDrawdown ?? 0)}
        </div>
        <p className="text-xs text-slate-500">
          Worst performer: {summary?.worstPerformer ?? "—"}
        </p>
      </Card>
    </section>
  );
}
