"use client";

import { ArrowDownRight, ArrowUpRight, Clock3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Card from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import type { TradeEvent } from "@/lib/types";

type ActivityLogProps = {
  trades?: TradeEvent[];
};

export default function ActivityLog({ trades = [] }: ActivityLogProps) {
  return (
    <Card className="flex flex-col gap-4 bg-gradient-to-br from-slate-900/70 to-slate-900/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Recent Executions</h2>
          <p className="text-xs text-slate-400">
            Latest order fills streamed from connected venues.
          </p>
        </div>
        <Badge variant="neutral">Live</Badge>
      </div>
      <div className="space-y-4">
        {trades.slice(0, 7).map((trade) => {
          const isPositive = trade.pnl >= 0;
          const Icon = isPositive ? ArrowUpRight : ArrowDownRight;
          return (
            <div
              key={trade.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-slate-900/40 px-4 py-3 text-xs"
            >
              <div className="flex flex-col gap-1 text-slate-300">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  {trade.symbol}
                  <Badge variant={isPositive ? "success" : "danger"}>
                    {trade.side.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-slate-400">{trade.botName}</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-slate-400">
                  <span>{formatNumber(trade.size)} contracts</span>
                  <span>@ {formatCurrency(trade.price, { maximumFractionDigits: 2 })}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="size-3" />
                    {formatDistanceToNow(new Date(trade.timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
              <div
                className={`flex items-center gap-2 text-sm font-semibold ${isPositive ? "text-emerald-300" : "text-rose-300"}`}
              >
                <Icon className="size-4" />
                {formatCurrency(trade.pnl, { maximumFractionDigits: 2 })}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
