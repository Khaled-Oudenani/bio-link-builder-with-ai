"use client";

import Link from "next/link";
import { ArrowLeft, MousePointerClick, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

interface Props {
  pageName: string;
  pageId: string;
  totalClicks: number;
  clicksByDay: { date: string; count: number }[];
  clicksByLink: { title: string; count: number }[];
  clicksByCountry: { country: string; count: number }[];
}

export default function AnalyticsClient({
  pageName,
  pageId,
  totalClicks,
  clicksByDay,
  clicksByLink,
  clicksByCountry,
}: Props) {
  function getFlagEmoji(countryCode: string): string {
    if (countryCode === "Unknown") return "🌐";
    try {
      return countryCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(127397 + char.charCodeAt(0)),
        );
    } catch {
      return "🌐";
    }
  }
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-3 mb-8">
        <Link
          href="/dashboard"
          className="p-1.5 rounded-lg transition-all hover:bg-white/5"
          style={{ color: "var(--color-muted)" }}
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1
            className="text-xl sm:text-2xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            Analytics
          </h1>
          <p
            className="text-xs sm:text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            {pageName} — last 14 days
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div
          className="p-4 sm:p-6 rounded-2xl border"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <MousePointerClick
              size={15}
              style={{ color: "var(--color-accent)" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-muted)" }}
            >
              Total Clicks
            </span>
          </div>
          <p
            className="text-2xl sm:text-4xl font-extrabold"
            style={{ color: "var(--color-text)" }}
          >
            {totalClicks}
          </p>
        </div>
        <div
          className="p-4 sm:p-6 rounded-2xl border"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={15} style={{ color: "var(--color-accent)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-muted)" }}
            >
              Daily Average
            </span>
          </div>
          <p
            className="text-2xl sm:text-4xl font-extrabold"
            style={{ color: "var(--color-text)" }}
          >
            {clicksByDay.length > 0
              ? (totalClicks / clicksByDay.length).toFixed(1)
              : "0"}
          </p>
        </div>
      </div>

      {/* Clicks over time */}
      <div
        className="p-4 sm:p-6 rounded-2xl border mb-6"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <h2
          className="text-sm font-semibold mb-5"
          style={{ color: "var(--color-text)" }}
        >
          Clicks Over Time
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={clicksByDay}
            margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
          >
            <defs>
              <linearGradient id="clickGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c6af7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7c6af7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6b6b85" }} />
            <YAxis
              tick={{ fontSize: 11, fill: "#6b6b85" }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: "#111118",
                border: "1px solid #2a2a3a",
                borderRadius: 8,
                fontSize: 12,
                color: "#e8e8f0",
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#7c6af7"
              strokeWidth={2}
              fill="url(#clickGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Clicks by link */}
      {clicksByLink.length > 0 && (
        <div
          className="p-4 sm:p-6 rounded-2xl border"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <h2
            className="text-sm font-semibold mb-5"
            style={{ color: "var(--color-text)" }}
          >
            Clicks by Link
          </h2>
          <ResponsiveContainer
            width="100%"
            height={Math.max(clicksByLink.length * 50, 100)}
          >
            <BarChart
              data={clicksByLink}
              layout="vertical"
              margin={{ top: 0, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.04)"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "#6b6b85" }}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="title"
                width={120}
                tick={{ fontSize: 11, fill: "#e8e8f0" }}
              />
              <Tooltip
                contentStyle={{
                  background: "#111118",
                  border: "1px solid #2a2a3a",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "#e8e8f0",
                }}
              />
              <Bar dataKey="count" fill="#7c6af7" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {clicksByCountry.length > 0 && (
        <div
          className="p-4 sm:p-6 rounded-2xl border mt-6"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <h2
            className="text-sm font-semibold mb-5"
            style={{ color: "var(--color-text)" }}
          >
            🌍 Visitors by Country
          </h2>
          <div className="space-y-3">
            {clicksByCountry.map((item) => (
              <div key={item.country} className="flex items-center gap-3">
                <span className="text-sm w-8 text-center">
                  {getFlagEmoji(item.country)}
                </span>
                <span
                  className="text-sm flex-1"
                  style={{ color: "var(--color-text)" }}
                >
                  {item.country}
                </span>
                <div className="flex items-center gap-2 flex-1">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(item.count / clicksByCountry[0].count) * 100}%`,
                      background: "var(--color-accent)",
                      minWidth: 8,
                    }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 text-right">
        <Link
          href={`/editor/${pageId}`}
          className="text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: "var(--color-accent)" }}
        >
          ← Back to editor
        </Link>
      </div>
    </div>
  );
}
