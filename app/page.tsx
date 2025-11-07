"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardHeader from "@/components/dashboard/header";
import OverviewGrid from "@/components/dashboard/overview-grid";
import PerformanceChart from "@/components/dashboard/performance-chart";
import AllocationChart from "@/components/dashboard/allocation-chart";
import RiskPanel from "@/components/dashboard/risk-panel";
import StrategyPerformanceChart from "@/components/dashboard/strategy-performance";
import BotsTable from "@/components/dashboard/bots-table";
import ActivityLog from "@/components/dashboard/activity-log";
import OperationsPanel from "@/components/dashboard/operations-panel";
import SystemHealth from "@/components/dashboard/system-health";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function Page() {
  const {
    summary,
    bots,
    performance,
    allocations,
    trades,
    riskMetrics,
    strategyPerformance,
    isLoading,
    isError,
    error,
    refetchAll,
  } = useDashboardData();

  const [lastSynced, setLastSynced] = useState<Date | undefined>();

  useEffect(() => {
    if (summary && bots && performance) {
      setLastSynced(new Date());
    }
  }, [summary, bots, performance]);

  const loadingState = isLoading && !summary;

  const worstDrawdownBot = useMemo(() => {
    if (!bots?.length) return undefined;
    return bots.reduce((prev, current) =>
      prev.drawdown > current.drawdown ? prev : current,
    );
  }, [bots]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-4 py-8 lg:px-8">
        <DashboardHeader
          totalBots={summary?.totalBots}
          activeBots={summary?.activeBots}
          riskScore={summary?.riskScore}
          lastUpdated={lastSynced}
          onRefresh={refetchAll}
          refreshing={isLoading}
        />

        {loadingState ? (
          <Card className="flex h-48 items-center justify-center bg-slate-900/60">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <span className="relative flex size-4">
                <span className="absolute inset-0 rounded-full bg-brand-400 opacity-60 blur-sm" />
                <span className="relative inline-flex size-4 rounded-full animate-ping bg-brand-300" />
              </span>
              Initializing data feeds…
            </div>
          </Card>
        ) : null}

        {isError ? (
          <Card className="flex items-start gap-4 border border-rose-500/40 bg-rose-500/10 text-sm text-rose-100">
            <div className="mt-1 size-2 rounded-full bg-rose-400" />
            <div>
              <p className="font-semibold">Data pipelines offline</p>
              <p className="text-xs text-rose-200/80">
                {error instanceof Error ? error.message : "Unknown error."}
              </p>
              <Button
                variant="ghost"
                className="mt-3 rounded-xl border border-white/10 px-3 py-1 text-xs"
                onClick={refetchAll}
              >
                Retry synchronization
              </Button>
            </div>
          </Card>
        ) : null}

        {!loadingState && summary ? (
          <>
            <OverviewGrid
              summary={summary}
              bots={bots}
              performance={performance}
            />

            <PerformanceChart data={performance} />

            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[1.6fr_1fr]">
              <AllocationChart data={allocations} />
              <RiskPanel data={riskMetrics} riskScore={summary.riskScore} />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
              <StrategyPerformanceChart data={strategyPerformance} />
              <OperationsPanel />
            </div>

            <BotsTable bots={bots} />

            <div className="grid gap-6 lg:grid-cols-2">
              <ActivityLog trades={trades} />
              <SystemHealth bots={bots} />
            </div>

            {worstDrawdownBot ? (
              <Card className="flex flex-col gap-3 bg-gradient-to-r from-rose-500/10 via-transparent to-transparent">
                <p className="text-sm font-semibold text-white">
                  Focused Watch: {worstDrawdownBot.name}
                </p>
                <p className="text-xs text-slate-400">
                  Drawdown at {(
                    worstDrawdownBot.drawdown * 100
                  ).toFixed(1)}
                  % with {worstDrawdownBot.openPositions} open legs on{" "}
                  {worstDrawdownBot.exchange}. Recommend enforcing secondary
                  hedges if breach persists.
                </p>
              </Card>
            ) : null}
          </>
        ) : null}
      </div>
    </main>
  );
}
