"use client";

import { AlertTriangle, Cpu, Server, SignalHigh } from "lucide-react";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { formatNumber } from "@/lib/formatters";
import type { TradingBot } from "@/lib/types";

type SystemHealthProps = {
  bots?: TradingBot[];
};

export default function SystemHealth({ bots = [] }: SystemHealthProps) {
  const running = bots.filter((bot) => bot.status === "running");
  const errors = bots.filter((bot) => bot.status === "error");
  const averageLatency =
    running.reduce((acc, bot) => acc + bot.latency, 0) /
      Math.max(running.length, 1) || 0;

  const averageDrawdown =
    running.reduce((acc, bot) => acc + bot.drawdown, 0) /
      Math.max(running.length, 1) || 0;

  return (
    <Card className="flex h-full flex-col gap-5 bg-gradient-to-br from-slate-900/70 to-slate-900/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">System Pulse</h2>
          <p className="text-xs text-slate-400">
            Execution layer vitals and anomaly cues.
          </p>
        </div>
        <Badge variant={errors.length ? "warning" : "success"}>
          {errors.length ? `${errors.length} Alerts` : "Stable"}
        </Badge>
      </div>
      <div className="space-y-4 text-sm text-slate-300">
        <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-900/40 p-3">
          <SignalHigh className="mt-0.5 size-4 text-emerald-300" />
          <div>
            <p className="font-semibold text-white">
              {running.length} bots streaming order flow
            </p>
            <p className="text-xs text-slate-400">
              Median latency {formatNumber(averageLatency)} ms
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-900/40 p-3">
          <Cpu className="mt-0.5 size-4 text-sky-300" />
          <div>
            <p className="font-semibold text-white">Adaptive model drift</p>
            <p className="text-xs text-slate-400">
              Average drawdown {formatNumber(averageDrawdown * 100, {
                maximumFractionDigits: 1,
              })}
              %
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-900/40 p-3">
          <Server className="mt-0.5 size-4 text-brand-200" />
          <div>
            <p className="font-semibold text-white">
              Connectivity across 6 venues
            </p>
            <p className="text-xs text-slate-400">
              Latency arbitration optimal across co-located PoPs.
            </p>
          </div>
        </div>
        {errors.length ? (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200">
            <AlertTriangle className="mt-0.5 size-4" />
            <div>
              <p className="font-semibold">
                {errors[0].name} requires intervention
              </p>
              <p>
                {errors.length - 1 > 0
                  ? `+${errors.length - 1} additional modules in degraded state`
                  : "Escalate to operations if persistent for 5 min."}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
