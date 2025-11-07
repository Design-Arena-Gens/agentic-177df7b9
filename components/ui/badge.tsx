"use client";

import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

type BadgeVariant = "neutral" | "success" | "warning" | "danger";

const badgeStyles: Record<BadgeVariant, string> = {
  neutral:
    "bg-slate-800 text-slate-100 ring-1 ring-inset ring-white/10",
  success:
    "bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-500/30",
  warning:
    "bg-amber-500/10 text-amber-200 ring-1 ring-inset ring-amber-500/20",
  danger: "bg-rose-500/10 text-rose-200 ring-1 ring-inset ring-rose-500/20",
};

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export default function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide",
        badgeStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
