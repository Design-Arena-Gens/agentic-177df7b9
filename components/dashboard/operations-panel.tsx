"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { useState } from "react";
import { Check, ExternalLink, Play, ShieldAlert } from "lucide-react";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

const playbooks = [
  {
    id: "playbook-1",
    title: "Deploy Basis Rebalance",
    description: "Shift funding rate capture bots to premium venues.",
  },
  {
    id: "playbook-2",
    title: "Activate Circuit Breakers",
    description: "Apply tighter drawdown stops for high-volatility assets.",
  },
  {
    id: "playbook-3",
    title: "Roll Options Wing",
    description: "Adjust gamma scalping bot deltas across expiries.",
  },
];

export default function OperationsPanel() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <Card className="flex flex-col gap-4 bg-gradient-to-br from-slate-900/70 to-slate-900/20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Ops Playbooks</h2>
          <p className="text-xs text-slate-400">
            Immediate mitigation controls and deployment shortcuts.
          </p>
        </div>
        <Button
          variant="ghost"
          className="rounded-2xl border border-white/5 px-3 py-1 text-xs"
        >
          <ExternalLink className="size-4" />
          Runbook
        </Button>
      </div>
      <div className="space-y-3 text-sm text-slate-200">
        {playbooks.map((playbook) => {
          const isSelected = selected.includes(playbook.id);
          return (
            <label
              key={playbook.id}
              className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/5 bg-slate-900/40 px-4 py-3 transition hover:border-brand-400/30"
            >
              <Checkbox.Root
                checked={isSelected}
                onCheckedChange={() => toggle(playbook.id)}
                className="mt-1 flex size-5 items-center justify-center rounded-lg border border-white/10 bg-slate-950 data-[state=checked]:border-brand-400 data-[state=checked]:bg-brand-500"
              >
                <Checkbox.Indicator>
                  <Check className="size-4 text-white" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-white">{playbook.title}</p>
                <p className="text-xs text-slate-400">
                  {playbook.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>
      <Button
        variant="secondary"
        className="w-full rounded-2xl border border-brand-500/30 bg-brand-500/15"
        disabled={!selected.length}
      >
        <Play className="size-4" />
        Execute {selected.length || ""} Playbook
      </Button>
      <div className="flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
        <ShieldAlert className="size-4" />
        Automated guardrails will sandbox playbooks in simulation before
        touching production liquidity.
      </div>
    </Card>
  );
}
