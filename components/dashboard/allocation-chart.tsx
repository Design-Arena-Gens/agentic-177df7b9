"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Card from "@/components/ui/card";
import type { AllocationSlice } from "@/lib/types";

type AllocationChartProps = {
  data?: AllocationSlice[];
};

export default function AllocationChart({ data }: AllocationChartProps) {
  return (
    <Card className="flex h-[340px] flex-col gap-4 bg-gradient-to-br from-slate-900/70 to-slate-900/20">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Capital Allocation
        </h2>
        <p className="text-xs text-slate-400">
          Strategy split across equity, futures, and options surfaces.
        </p>
      </div>
      <div className="flex h-full items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                background: "#020617",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "white",
              }}
              formatter={(value) => `${value}%`}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={2}
              stroke="rgba(15,23,42,0.5)"
            >
              {data?.map((slice) => (
                <Cell key={slice.name} fill={slice.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
