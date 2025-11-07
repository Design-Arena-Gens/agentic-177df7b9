"use client";

import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  Bot,
  Gauge,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/ui/button";
import ThemeToggle from "./theme-toggle";

type DashboardHeaderProps = {
  totalBots?: number;
  activeBots?: number;
  riskScore?: number;
  lastUpdated?: Date;
  onRefresh?: () => void;
  refreshing?: boolean;
};

export default function DashboardHeader({
  totalBots = 0,
  activeBots = 0,
  riskScore = 80,
  lastUpdated,
  onRefresh,
  refreshing,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-6 rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 p-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-200">
            <Activity className="size-6" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-200">
              QuantSight
            </p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Trading Bot Command Center
            </h1>
          </div>
        </div>
        <p className="max-w-xl text-sm text-slate-400">
          Unified control plane for orchestrating algorithmic market making,
          momentum capture, and cross-exchange arbitrage automation.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span className="inline-flex items-center gap-2">
            <Bot className="size-4 text-brand-200" />
            {activeBots} / {totalBots} bots active
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-emerald-300" />
            Risk posture <span className="font-semibold text-white">{riskScore}</span>
          </span>
          {lastUpdated ? (
            <span className="inline-flex items-center gap-2">
              <Gauge className="size-4 text-slate-300" />
              Synced{" "}
              {formatDistanceToNow(lastUpdated, { addSuffix: true })}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-3 self-end">
        <Button
          variant="secondary"
          className="rounded-2xl px-3"
          onClick={onRefresh}
          disabled={refreshing}
        >
          <RefreshCcw
            className={refreshing ? "size-4 animate-spin" : "size-4"}
          />
          Sync Feeds
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
