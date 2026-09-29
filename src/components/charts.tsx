"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AXIS = { fontSize: 12, fill: "#7C8798", fontWeight: 700 } as const;
const GRID = "#EBE7DE";

const tooltipStyle = {
  contentStyle: {
    borderRadius: 12,
    border: "1px solid #E7E3D9",
    boxShadow: "0 12px 30px -16px rgba(16,32,52,.3)",
    fontFamily: "Tajawal, sans-serif",
    fontSize: 13,
    fontWeight: 700,
    direction: "rtl" as const,
  },
  labelStyle: { color: "#15202E", fontWeight: 800, marginBottom: 4 },
};

/* منحنى تطور النتيجة */
export function ScoreTrend({
  data,
  color = "#1F4E81",
  height = 220,
}: {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.24} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} reversed />
        <YAxis domain={[0, 100]} tick={AXIS} axisLine={false} tickLine={false} orientation="right" width={40} />
        <Tooltip {...tooltipStyle} formatter={(v) => [`${v}`, "النتيجة"] as [string, string]} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2.6}
          fill="url(#scoreFill)"
          dot={{ r: 3.5, fill: "#fff", stroke: color, strokeWidth: 2 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* أعمدة رأسية */
export function VerticalBars({
  data,
  keys,
  colors,
  height = 280,
}: {
  data: Record<string, string | number>[];
  keys: string[];
  colors: string[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} reversed />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} orientation="right" width={40} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "#F5F3ED" }} />
        {keys.length > 1 && (
          <Legend
            wrapperStyle={{ fontSize: 12.5, fontWeight: 700, fontFamily: "Tajawal, sans-serif", paddingTop: 8 }}
          />
        )}
        {keys.map((k, i) => (
          <Bar key={k} dataKey={k} fill={colors[i]} radius={[6, 6, 0, 0]} barSize={22} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/* خطان للمقارنة */
export function DualTrend({
  data,
  keys,
  colors,
  height = 260,
}: {
  data: Record<string, string | number>[];
  keys: string[];
  colors: string[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} reversed />
        <YAxis domain={[40, 90]} tick={AXIS} axisLine={false} tickLine={false} orientation="right" width={40} />
        <Tooltip {...tooltipStyle} />
        <Legend
          wrapperStyle={{ fontSize: 12.5, fontWeight: 700, fontFamily: "Tajawal, sans-serif", paddingTop: 8 }}
        />
        {keys.map((k, i) => (
          <Line
            key={k}
            type="monotone"
            dataKey={k}
            stroke={colors[i]}
            strokeWidth={2.6}
            dot={{ r: 3, fill: "#fff", stroke: colors[i], strokeWidth: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

/* رادار المحاور الخمسة */
export function DimensionRadar({
  data,
  height = 300,
}: {
  data: { key: string; before: number; after: number }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke={GRID} />
        <PolarAngleAxis dataKey="key" tick={AXIS} />
        <Tooltip {...tooltipStyle} />
        <Radar name="التقييم الأولي" dataKey="before" stroke="#A8A5B5" fill="#A8A5B5" fillOpacity={0.18} strokeWidth={2} />
        <Radar name="التقييم الحالي" dataKey="after" stroke="#1F4E81" fill="#1F4E81" fillOpacity={0.22} strokeWidth={2.4} />
        <Legend
          wrapperStyle={{ fontSize: 12.5, fontWeight: 700, fontFamily: "Tajawal, sans-serif", paddingTop: 6 }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
