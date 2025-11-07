"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Filter,
  Settings2,
} from "lucide-react";
import { useMemo, useState } from "react";
import Card from "@/components/ui/card";
import StatusPill from "@/components/ui/status-pill";
import Button from "@/components/ui/button";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/formatters";
import type { BotStatus, TradingBot } from "@/lib/types";

type BotsTableProps = {
  bots?: TradingBot[];
};

const STATUS_OPTIONS: { label: string; value: BotStatus | "all" }[] = [
  { label: "All statuses", value: "all" },
  { label: "Running", value: "running" },
  { label: "Paused", value: "paused" },
  { label: "Cooldown", value: "cooldown" },
  { label: "Error", value: "error" },
];

type SortDescriptor = {
  key: keyof TradingBot;
  direction: "asc" | "desc";
};

export default function BotsTable({ bots = [] }: BotsTableProps) {
  const [statusFilter, setStatusFilter] = useState<BotStatus | "all">("all");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    key: "pnl24h",
    direction: "desc",
  });

  const filtered = useMemo(() => {
    return statusFilter === "all"
      ? bots
      : bots.filter((bot) => bot.status === statusFilter);
  }, [bots, statusFilter]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      const valueA = a[sortDescriptor.key];
      const valueB = b[sortDescriptor.key];
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDescriptor.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDescriptor.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return 0;
    });
    return copy;
  }, [filtered, sortDescriptor]);

  const toggleSort = (key: keyof TradingBot) => {
    setSortDescriptor((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "desc" };
    });
  };

  const SortIcon =
    sortDescriptor.direction === "asc" ? ArrowUp : ArrowDown;

  return (
    <Card className="col-span-full overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-900/30 p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Automation Fleet</h2>
          <p className="text-xs text-slate-400">
            Health, alpha generation, and execution efficiency per bot.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                variant="ghost"
                className="rounded-2xl border border-white/5 px-3 py-1 text-xs text-slate-300"
              >
                <Filter className="size-4" />
                {STATUS_OPTIONS.find((option) => option.value === statusFilter)
                  ?.label ?? "All"}
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              align="end"
              className="min-w-[200px] rounded-2xl border border-white/10 bg-slate-900/90 p-2 text-sm text-slate-200 shadow-xl backdrop-blur-xl"
            >
              {STATUS_OPTIONS.map((option) => (
                <DropdownMenu.Item
                  key={option.value}
                  onSelect={() => setStatusFilter(option.value)}
                  className="flex cursor-pointer items-center rounded-xl px-3 py-2 text-xs hover:bg-white/10"
                >
                  {option.label}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Button
            variant="ghost"
            className="rounded-2xl px-3 py-1 text-xs text-slate-300 border border-white/5"
          >
            <Settings2 className="size-4" />
            Automation Rules
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/5 text-left text-sm text-slate-300">
          <thead className="bg-slate-900/40 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-3 font-medium">Bot</th>
              <th className="px-6 py-3 font-medium">Strategy</th>
              <th className="px-6 py-3 font-medium">Exchange</th>
              <th className="px-6 py-3 font-medium">
                <button
                  type="button"
                  onClick={() => toggleSort("pnl24h")}
                  className="inline-flex items-center gap-1"
                >
                  24h P&amp;L
                  {sortDescriptor.key === "pnl24h" ? (
                    <SortIcon className="size-3" />
                  ) : null}
                </button>
              </th>
              <th className="px-6 py-3 font-medium">7d P&amp;L</th>
              <th className="px-6 py-3 font-medium">Win Rate</th>
              <th className="px-6 py-3 font-medium">Sharpe</th>
              <th className="px-6 py-3 font-medium">Latency</th>
              <th className="px-6 py-3 font-medium">Drawdown</th>
              <th className="px-6 py-3 font-medium">Capital</th>
              <th className="px-6 py-3 font-medium">Positions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sorted.map((bot) => (
              <tr key={bot.id} className="transition hover:bg-white/5">
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-white">
                        {bot.name}
                      </p>
                      <StatusPill status={bot.status} />
                    </div>
                    <p className="text-xs text-slate-500">
                      Updated {new Date(bot.updatedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-slate-400">
                  {bot.strategy}
                </td>
                <td className="px-6 py-4 text-xs text-slate-400">
                  {bot.exchange}
                </td>
                <td className="px-6 py-4 text-sm font-semibold">
                  <span
                    className={
                      bot.pnl24h >= 0 ? "text-emerald-300" : "text-rose-300"
                    }
                  >
                    {formatCurrency(bot.pnl24h)}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-300">
                  {formatCurrency(bot.pnl7d)}
                </td>
                <td className="px-6 py-4 text-xs text-slate-300">
                  {formatPercent(bot.winRate)}
                </td>
                <td className="px-6 py-4 text-xs text-slate-300">
                  {bot.sharpe.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-xs text-slate-300">
                  {formatNumber(bot.latency)} ms
                </td>
                <td className="px-6 py-4 text-xs text-slate-300">
                  {formatPercent(bot.drawdown)}
                </td>
                <td className="px-6 py-4 text-xs text-slate-300">
                  {formatCurrency(bot.capitalAllocated)}
                </td>
                <td className="px-6 py-4 text-xs text-slate-300">
                  {bot.openPositions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
