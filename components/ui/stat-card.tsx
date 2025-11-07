"use client";

import { clsx } from "clsx";
import type { ReactNode } from "react";
import Card from "./card";
import TrendIndicator from "./trend-indicator";

type StatCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
  delta?: number;
  deltaLabel?: string;
  helperText?: string;
  accent?: string;
  className?: string;
  children?: ReactNode;
};

export default function StatCard({
  label,
  value,
  icon,
  delta,
  deltaLabel,
  helperText,
  accent,
  className,
  children,
}: StatCardProps) {
  return (
    <Card
      className={clsx(
        "flex flex-col justify-between gap-6 bg-gradient-to-br from-slate-900/80 to-slate-900/30",
        className,
        accent,
      )}
    >
      <div className="flex items-center justify-between text-sm font-medium text-slate-400">
        <span>{label}</span>
        <span className="text-slate-500">{icon}</span>
      </div>
      <div className="space-y-3">
        <p className="text-3xl font-semibold text-white">{value}</p>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          {typeof delta === "number" ? (
            <TrendIndicator value={delta} label={deltaLabel} />
          ) : null}
          {helperText ? <span>{helperText}</span> : null}
        </div>
        {children}
      </div>
    </Card>
  );
}
