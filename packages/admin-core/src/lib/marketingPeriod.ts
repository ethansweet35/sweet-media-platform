/**
 * Marketing report lookback presets (calendar-aware, US Pacific).
 */

import type { MarketingPeriodId } from "../types/marketing";

export type { MarketingPeriodId };

export interface MarketingPeriodRanges {
  id: MarketingPeriodId;
  label: string;
  curStart: string;
  curEnd: string;
  prevStart: string;
  prevEnd: string;
}

const TZ = "America/Los_Angeles";

/** YYYY-MM-DD in Pacific time. */
export function isoDateInTz(d = new Date(), timeZone = TZ): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(d);
}

function parseIso(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

function isoFromParts(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function addDays(iso: string, days: number): string {
  const { y, m, d } = parseIso(iso);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return isoFromParts(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

function daysBetweenInclusive(start: string, end: string): number {
  const a = parseIso(start);
  const b = parseIso(end);
  const t0 = Date.UTC(a.y, a.m - 1, a.d);
  const t1 = Date.UTC(b.y, b.m - 1, b.d);
  return Math.max(1, Math.round((t1 - t0) / 86_400_000) + 1);
}

/** Monday-start week containing `iso` (Pacific calendar dates). */
function weekStartMonday(iso: string): string {
  const { y, m, d } = parseIso(iso);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 Sun … 6 Sat
  const offset = dow === 0 ? 6 : dow - 1;
  return addDays(iso, -offset);
}

function lastDayOfMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

function previousPeriod(start: string, end: string): { prevStart: string; prevEnd: string } {
  const len = daysBetweenInclusive(start, end);
  const prevEnd = addDays(start, -1);
  const prevStart = addDays(prevEnd, -(len - 1));
  return { prevStart, prevEnd };
}

export const MARKETING_PERIOD_OPTIONS: { id: MarketingPeriodId; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "yesterday", label: "Yesterday" },
  { id: "last_7_days", label: "Last 7 days" },
  { id: "this_week", label: "This week" },
  { id: "this_month", label: "This month" },
  { id: "last_month", label: "Last month" },
];

export function resolveMarketingPeriod(id: MarketingPeriodId): MarketingPeriodRanges {
  const today = isoDateInTz();
  const { y, m } = parseIso(today);

  let curStart: string;
  let curEnd: string;
  let label: string;

  switch (id) {
    case "today":
      curStart = today;
      curEnd = today;
      label = "Today";
      break;
    case "yesterday": {
      const yd = addDays(today, -1);
      curStart = yd;
      curEnd = yd;
      label = "Yesterday";
      break;
    }
    case "last_7_days":
      curEnd = today;
      curStart = addDays(today, -6);
      label = "Last 7 days";
      break;
    case "this_week":
      curStart = weekStartMonday(today);
      curEnd = today;
      label = "This week";
      break;
    case "this_month":
      curStart = isoFromParts(y, m, 1);
      curEnd = today;
      label = "This month";
      break;
    case "last_month": {
      const pm = m === 1 ? 12 : m - 1;
      const py = m === 1 ? y - 1 : y;
      curStart = isoFromParts(py, pm, 1);
      curEnd = isoFromParts(py, pm, lastDayOfMonth(py, pm));
      label = "Last month";
      break;
    }
    default:
      curEnd = today;
      curStart = addDays(today, -27);
      label = "Last 28 days";
  }

  const { prevStart, prevEnd } = previousPeriod(curStart, curEnd);
  return { id, label, curStart, curEnd, prevStart, prevEnd };
}

export function parseMarketingPeriodParam(
  period: string | null,
  daysParam: string | null,
): MarketingPeriodRanges {
  const valid = MARKETING_PERIOD_OPTIONS.map((o) => o.id);
  if (period && valid.includes(period as MarketingPeriodId)) {
    return resolveMarketingPeriod(period as MarketingPeriodId);
  }
  const days = Math.min(90, Math.max(1, parseInt(daysParam ?? "28", 10) || 28));
  const today = isoDateInTz();
  const curStart = addDays(today, -(days - 1));
  const { prevStart, prevEnd } = previousPeriod(curStart, today);
  return {
    id: "last_7_days",
    label: `Last ${days} days`,
    curStart,
    curEnd: today,
    prevStart,
    prevEnd,
  };
}

/** GSC data lags ~3 days — cap the current window end. */
export function gscRangesForPeriod(period: MarketingPeriodRanges): {
  curStart: string;
  curEnd: string;
  prevStart: string;
  prevEnd: string;
} {
  const lagEnd = addDays(isoDateInTz(), -3);
  const curEnd = period.curEnd <= lagEnd ? period.curEnd : lagEnd;
  if (curEnd < period.curStart) {
    return {
      curStart: period.curStart,
      curEnd: period.curStart,
      prevStart: period.prevStart,
      prevEnd: period.prevEnd <= lagEnd ? period.prevEnd : lagEnd,
    };
  }
  const len = daysBetweenInclusive(period.curStart, period.curEnd);
  const prevEnd = addDays(period.curStart, -1);
  const prevStart = addDays(prevEnd, -(len - 1));
  return {
    curStart: period.curStart,
    curEnd,
    prevStart,
    prevEnd: prevEnd <= lagEnd ? prevEnd : lagEnd,
  };
}
