"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { BreedCostProfile } from "@/types";

const COLORS = [
  "#0f172a", // food - navy
  "#14b8a6", // insurance - mint
  "#6366f1", // vet - indigo
  "#f59e0b", // grooming - amber
  "#10b981", // treats - green
  "#8b5cf6", // toys - violet
  "#ef4444", // fleaTick - red
  "#64748b", // equipment - slate
  "#94a3b8", // misc - light slate
];

const LABELS: Record<string, string> = {
  food: "Foder",
  insurance: "Forsikring",
  vet: "Dyrlæge",
  grooming: "Grooming",
  treats: "Godbidder",
  toys: "Legetøj",
  fleaTick: "Loppe/Flåt",
  equipment: "Udstyr",
  miscellaneous: "Diverse",
};

interface BreakdownChartProps {
  breakdown: BreedCostProfile;
  total: number;
}

export function BreakdownChart({ breakdown, total }: BreakdownChartProps) {
  const data = Object.entries(breakdown)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => ({
      name: LABELS[key] || key,
      value,
      pct: Math.round((value / total) * 100),
    }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => [`${value} kr.`, ""]}
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "12px",
          }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => (
            <span style={{ fontSize: "12px", color: "#64748b" }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
