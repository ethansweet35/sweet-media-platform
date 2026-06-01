/**
 * CallRail via Windsor.ai — one row per call with tags.
 * @see https://windsor.ai/connectors/callrail/
 */

import type { ChannelMetricRow } from "../../../types/marketing";
import { queryWindsor } from "./windsorClient";

function slugTag(tag: string): string {
  return tag.replace(/\|/g, "/").slice(0, 120);
}

function splitTags(raw: string): string[] {
  const t = raw.trim();
  if (!t) return ["(untagged)"];
  return t
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Pull CallRail calls + per-tag counts into channel_metrics rows. */
export async function fetchWindsorCallrail(
  accountName: string,
  startDate: string,
  endDate: string,
): Promise<ChannelMetricRow[]> {
  const rows = await queryWindsor(
    "callrail",
    accountName,
    ["calls__id", "calls__tags"],
    startDate,
    endDate,
  );

  const callsByDate = new Map<string, Set<string>>();
  const tagCallsByDate = new Map<string, Map<string, Set<string>>>();

  for (const row of rows) {
    const date = typeof row.date === "string" ? row.date : null;
    const callId = row.calls__id != null ? String(row.calls__id) : "";
    if (!date || !callId) continue;

    if (!callsByDate.has(date)) callsByDate.set(date, new Set());
    callsByDate.get(date)!.add(callId);

    const tags = splitTags(String(row.calls__tags ?? ""));
    for (const tag of tags) {
      if (!tagCallsByDate.has(date)) tagCallsByDate.set(date, new Map());
      const dayTags = tagCallsByDate.get(date)!;
      if (!dayTags.has(tag)) dayTags.set(tag, new Set());
      dayTags.get(tag)!.add(callId);
    }
  }

  const out: ChannelMetricRow[] = [];
  for (const [date, ids] of callsByDate) {
    out.push({
      channel: "callrail",
      metric: "calls",
      metric_date: date,
      value: ids.size,
      dimensions: { provider: "callrail", account_name: accountName },
      dim_key: "total",
    });
  }

  for (const [date, tagMap] of tagCallsByDate) {
    for (const [tag, ids] of tagMap) {
      out.push({
        channel: "callrail",
        metric: "calls_by_tag",
        metric_date: date,
        value: ids.size,
        dimensions: { provider: "callrail", tag, account_name: accountName },
        dim_key: `tag|${slugTag(tag)}`,
      });
    }
  }

  return out;
}
