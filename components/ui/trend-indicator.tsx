"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import { formatDelta } from "@/lib/formatters";

type TrendIndicatorProps = {
  value: number;
  label?: string;
  className?: string;
};

export default function TrendIndicator({
  value,
  label,
  className,
}: TrendIndicatorProps) {
  const isPositive = value >= 0;
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        isPositive
          ? "bg-emerald-500/10 text-emerald-300"
          : "bg-rose-500/10 text-rose-200",
        className,
      )}
    >
      <Icon className="size-3.5" />
      {formatDelta(value)}
      {label ? <span className="text-slate-400">{label}</span> : null}
    </span>
  );
}
