"use client";

import { forwardRef } from "react";
import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "glass-panel rounded-3xl p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

Card.displayName = "Card";

export default Card;
