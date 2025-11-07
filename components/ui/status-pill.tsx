"use client";

import { clsx } from "clsx";
import type { BotStatus } from "@/lib/types";

const statusStyles: Record<BotStatus, string> = {
  running:
    "ring-1 ring-inset ring-emerald-400/40 bg-emerald-500/15 text-emerald-200",
  paused:
    "ring-1 ring-inset ring-amber-400/40 bg-amber-500/15 text-amber-200",
  error:
    "ring-1 ring-inset ring-rose-400/40 bg-rose-500/15 text-rose-200",
  cooldown:
    "ring-1 ring-inset ring-sky-400/40 bg-sky-500/15 text-sky-200",
};

const statusLabel: Record<BotStatus, string> = {
  running: "Running",
  paused: "Paused",
  error: "Error",
  cooldown: "Cooldown",
};

type StatusPillProps = {
  status: BotStatus;
  className?: string;
};

export default function StatusPill({
  status,
  className,
}: StatusPillProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
        statusStyles[status],
        className,
      )}
    >
      <span className="relative flex size-2">
        <span
          className={clsx(
            "absolute inset-0 rounded-full",
            status === "running" && "animate-ping bg-emerald-400",
            status === "error" && "animate-ping bg-rose-400",
          )}
        />
        <span
          className={clsx(
            "relative inline-flex size-2 rounded-full",
            status === "running" && "bg-emerald-300",
            status === "paused" && "bg-amber-300",
            status === "error" && "bg-rose-300",
            status === "cooldown" && "bg-sky-300",
          )}
        />
      </span>
      {statusLabel[status]}
    </span>
  );
}
