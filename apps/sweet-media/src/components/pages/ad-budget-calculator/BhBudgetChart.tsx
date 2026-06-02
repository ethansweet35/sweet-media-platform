"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BudgetModelResult } from "@/lib/bhBudgetModel";
import { CEILING } from "@/lib/bhBudgetModel";
import { moneyR, num1, pct } from "@/lib/bhBudgetFormat";

type BhBudgetChartProps = {
  model: BudgetModelResult;
  mode: "min" | "eval";
  budgetInput: number;
};

export default function BhBudgetChart({
  model: m,
  mode,
  budgetInput,
}: BhBudgetChartProps) {
  return (
    <div className="w-full h-[230px]">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={m.points} margin={{ top: 8, right: 12, bottom: 4, left: 4 }}>
          <defs>
            <linearGradient id="bhBudgetArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3A7F8E" stopOpacity={0.32} />
              <stop offset="100%" stopColor="#3A7F8E" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E7E2D8" vertical={false} />
          <XAxis
            dataKey="B"
            tickFormatter={(v) => `$${Math.round(Number(v) / 1000)}k`}
            tick={{ fill: "#6B7178", fontSize: 11 }}
            stroke="#CFC8BA"
          />
          <YAxis
            tick={{ fill: "#6B7178", fontSize: 11 }}
            stroke="#CFC8BA"
            width={34}
          />
          <Tooltip
            formatter={(v, n) => [
              `${num1(Number(v))}/mo`,
              n === "leads" ? "Leads" : "Verified (VOB)",
            ]}
            labelFormatter={(v) => `${moneyR(Number(v), 100)}/mo`}
            contentStyle={{
              border: "1px solid #0A1F44",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          {m.ceilingBudget < m.chartMax && (
            <ReferenceArea
              x1={m.ceilingBudget}
              x2={m.chartMax}
              fill="#C9A961"
              fillOpacity={0.1}
            />
          )}
          <Area
            type="monotone"
            dataKey="leads"
            stroke="#3A7F8E"
            strokeWidth={2.2}
            fill="url(#bhBudgetArea)"
          />
          <Line
            type="monotone"
            dataKey="vobs"
            stroke="#C9A961"
            strokeWidth={2}
            dot={false}
          />
          <ReferenceLine
            x={Math.round(m.recBudget)}
            stroke="#0A1F44"
            strokeDasharray="4 3"
            label={{
              value: "recommended",
              position: "top",
              fill: "#0A1F44",
              fontSize: 10,
            }}
          />
          {mode === "eval" && (
            <ReferenceLine
              x={Math.round(budgetInput)}
              stroke="#B4541F"
              strokeWidth={1.5}
              label={{
                value: "your budget",
                position: "insideTopRight",
                fill: "#B4541F",
                fontSize: 10,
              }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
      <p className="mt-2 text-[10.5px] text-[#6B7178] italic">
        Shaded zone = past the ~{pct(CEILING)} impression-share ceiling, where added spend buys
        sharply less.
      </p>
    </div>
  );
}
