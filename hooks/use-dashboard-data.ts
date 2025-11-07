"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllocations,
  fetchBots,
  fetchDashboardSummary,
  fetchPerformance,
  fetchRiskMetrics,
  fetchStrategyPerformance,
  fetchTrades,
} from "@/lib/mock-api";

const REFRESH_INTERVAL = 1000 * 15;

export function useDashboardData() {
  const summaryQuery = useQuery({
    queryKey: ["dashboard", "summary"],
    queryFn: fetchDashboardSummary,
    refetchInterval: REFRESH_INTERVAL,
  });

  const botsQuery = useQuery({
    queryKey: ["dashboard", "bots"],
    queryFn: fetchBots,
    refetchInterval: REFRESH_INTERVAL,
  });

  const performanceQuery = useQuery({
    queryKey: ["dashboard", "performance"],
    queryFn: fetchPerformance,
    refetchOnReconnect: true,
    refetchInterval: REFRESH_INTERVAL,
  });

  const allocationQuery = useQuery({
    queryKey: ["dashboard", "allocations"],
    queryFn: fetchAllocations,
    refetchInterval: REFRESH_INTERVAL * 2,
  });

  const tradesQuery = useQuery({
    queryKey: ["dashboard", "trades"],
    queryFn: fetchTrades,
    refetchInterval: REFRESH_INTERVAL,
  });

  const riskMetricsQuery = useQuery({
    queryKey: ["dashboard", "risk"],
    queryFn: fetchRiskMetrics,
    refetchInterval: REFRESH_INTERVAL * 2,
  });

  const strategyPerformanceQuery = useQuery({
    queryKey: ["dashboard", "strategy-performance"],
    queryFn: fetchStrategyPerformance,
    refetchInterval: REFRESH_INTERVAL * 2,
  });

  const isLoading =
    summaryQuery.isLoading ||
    botsQuery.isLoading ||
    performanceQuery.isLoading ||
    allocationQuery.isLoading ||
    tradesQuery.isLoading ||
    riskMetricsQuery.isLoading ||
    strategyPerformanceQuery.isLoading;

  const isError =
    summaryQuery.isError ||
    botsQuery.isError ||
    performanceQuery.isError ||
    allocationQuery.isError ||
    tradesQuery.isError ||
    riskMetricsQuery.isError ||
    strategyPerformanceQuery.isError;

  const error = useMemo(
    () =>
      summaryQuery.error ??
      botsQuery.error ??
      performanceQuery.error ??
      allocationQuery.error ??
      tradesQuery.error ??
      riskMetricsQuery.error ??
      strategyPerformanceQuery.error,
    [
      summaryQuery.error,
      botsQuery.error,
      performanceQuery.error,
      allocationQuery.error,
      tradesQuery.error,
      riskMetricsQuery.error,
      strategyPerformanceQuery.error,
    ],
  );

  return {
    summary: summaryQuery.data,
    bots: botsQuery.data,
    performance: performanceQuery.data,
    allocations: allocationQuery.data,
    trades: tradesQuery.data,
    riskMetrics: riskMetricsQuery.data,
    strategyPerformance: strategyPerformanceQuery.data,
    isLoading,
    isError,
    error,
    refetchAll: () => {
      void summaryQuery.refetch();
      void botsQuery.refetch();
      void performanceQuery.refetch();
      void allocationQuery.refetch();
      void tradesQuery.refetch();
      void riskMetricsQuery.refetch();
      void strategyPerformanceQuery.refetch();
    },
  };
}
