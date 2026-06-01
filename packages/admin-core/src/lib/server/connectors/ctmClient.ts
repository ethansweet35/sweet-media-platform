/**
 * CallTrackingMetrics REST API — calls + form (activity) volume.
 * @see https://github.com/calltracking/calltracking.github.io/blob/master/api_users_guide.md
 */

import type { ChannelMetricRow } from "../../../types/marketing";

const CTM_HOST = "https://api.calltrackingmetrics.com/api/v1";

function ctmAuth(accountIdOverride?: string): { header: string; accountId: string } | null {
  const access = (process.env.CTM_ACCESS_KEY ?? process.env.CTM_API_KEY ?? "").trim();
  const secret = (process.env.CTM_SECRET_KEY ?? process.env.CTM_API_SECRET ?? "").trim();
  const accountId = (accountIdOverride ?? process.env.CTM_ACCOUNT_ID ?? "").trim();
  if (!access || !secret || !accountId) return null;
  const token = Buffer.from(`${access}:${secret}`).toString("base64");
  return { header: `Basic ${token}`, accountId };
}

function dayFromValue(v: unknown): string | null {
  if (typeof v !== "string" || v.length < 10) return null;
  return v.slice(0, 10);
}

async function ctmGet(
  accountId: string,
  path: string,
  query: Record<string, string>,
): Promise<unknown> {
  const auth = ctmAuth(accountId);
  if (!auth) return null;
  const params = new URLSearchParams(query);
  const res = await fetch(
    `${CTM_HOST}/accounts/${auth.accountId}/${path}?${params}`,
    {
      headers: { Authorization: auth.header, Accept: "application/json" },
      cache: "no-store",
    },
  );
  if (!res.ok) return null;
  return res.json();
}

/** Daily call + form counts from CTM. */
export async function fetchCtmMetrics(
  accountId: string,
  startDate: string,
  endDate: string,
): Promise<ChannelMetricRow[]> {
  const auth = ctmAuth(accountId);
  if (!auth) return [];

  const out: ChannelMetricRow[] = [];
  const callCounts = new Map<string, number>();
  const formCounts = new Map<string, number>();
  const tagCounts = new Map<string, Map<string, number>>();

  let page = 1;
  while (page <= 30) {
    const json = (await ctmGet(accountId, "calls.json", {
      start_date: startDate,
      end_date: endDate,
      page: String(page),
      per_page: "100",
    })) as { calls?: Record<string, unknown>[]; total_pages?: number } | null;

    const calls = json?.calls ?? [];
    if (!calls.length) break;

    for (const call of calls) {
      const day =
        dayFromValue(call.call_date) ??
        dayFromValue(call.started_at as string) ??
        dayFromValue(call.created_at as string);
      if (!day || day < startDate || day > endDate) continue;
      callCounts.set(day, (callCounts.get(day) ?? 0) + 1);

      const tagsRaw = call.tags ?? call.tag_list ?? call.tag_names;
      const tags: string[] = Array.isArray(tagsRaw)
        ? tagsRaw.map((t) => String(t).trim()).filter(Boolean)
        : typeof tagsRaw === "string" && tagsRaw.trim()
          ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
          : ["(untagged)"];

      for (const tag of tags) {
        if (!tagCounts.has(day)) tagCounts.set(day, new Map());
        const m = tagCounts.get(day)!;
        m.set(tag, (m.get(tag) ?? 0) + 1);
      }
    }

    const totalPages = json?.total_pages ?? 1;
    if (page >= totalPages) break;
    page += 1;
  }

  // Form / web leads — CTM exposes these as activities in many accounts
  page = 1;
  while (page <= 20) {
    const json = (await ctmGet(accountId, "activities.json", {
      start_date: startDate,
      end_date: endDate,
      page: String(page),
      per_page: "100",
    })) as { activities?: Record<string, unknown>[]; total_pages?: number } | null;

    const activities = json?.activities ?? [];
    if (!activities.length) break;

    for (const act of activities) {
      const type = String(act.type ?? act.activity_type ?? "").toLowerCase();
      if (!type.includes("form") && !type.includes("webform") && !type.includes("submission")) {
        continue;
      }
      const day =
        dayFromValue(act.date as string) ??
        dayFromValue(act.created_at as string) ??
        dayFromValue(act.submitted_at as string);
      if (!day || day < startDate || day > endDate) continue;
      formCounts.set(day, (formCounts.get(day) ?? 0) + 1);
    }

    const totalPages = json?.total_pages ?? 1;
    if (page >= totalPages) break;
    page += 1;
  }

  for (const [metric_date, value] of callCounts) {
    out.push({
      channel: "ctm",
      metric: "calls",
      metric_date,
      value,
      dimensions: { provider: "ctm", account_id: auth.accountId },
      dim_key: "total",
    });
  }

  for (const [metric_date, value] of formCounts) {
    out.push({
      channel: "ctm",
      metric: "forms",
      metric_date,
      value,
      dimensions: { provider: "ctm", account_id: auth.accountId },
      dim_key: "total",
    });
  }

  for (const [metric_date, tagMap] of tagCounts) {
    for (const [tag, value] of tagMap) {
      out.push({
        channel: "ctm",
        metric: "calls_by_tag",
        metric_date,
        value,
        dimensions: { provider: "ctm", tag, account_id: auth.accountId },
        dim_key: `tag|${tag.replace(/\|/g, "/").slice(0, 120)}`,
      });
    }
  }

  return out;
}
