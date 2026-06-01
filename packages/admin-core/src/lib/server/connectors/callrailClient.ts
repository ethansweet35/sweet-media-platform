/**
 * CallRail API v3 — form submission volume (calls come from Windsor ingest).
 * @see https://apidocs.callrail.com/
 */

import type { ChannelMetricRow } from "../../../types/marketing";

const CALLRAIL_BASE = "https://api.callrail.com/v3/a";

interface CallrailPage<T> {
  form_submissions?: T[];
  total_pages?: number;
  page?: number;
}

interface FormSubmissionRow {
  id?: string;
  submitted_at?: string;
}

function authHeader(): string | null {
  const key = (process.env.CALLRAIL_API_KEY ?? "").trim();
  if (!key) return null;
  return `Token token=${key}`;
}

function dateFromIso(iso: string): string | null {
  if (!iso || iso.length < 10) return null;
  return iso.slice(0, 10);
}

export interface CallrailFormMetricsOptions {
  /** Numeric company id — filters submissions when using one agency ACC account */
  companyId?: string;
}

/** Daily form submission counts → channel_metrics rows. */
export async function fetchCallrailFormMetrics(
  accountId: string,
  startDate: string,
  endDate: string,
  options?: CallrailFormMetricsOptions,
): Promise<ChannelMetricRow[]> {
  const auth = authHeader();
  if (!auth || !accountId.trim()) return [];

  const counts = new Map<string, number>();
  let page = 1;
  const maxPages = 40;

  while (page <= maxPages) {
    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
      per_page: "100",
      page: String(page),
      fields: "id,submitted_at",
    });
    const companyId = options?.companyId?.trim();
    if (companyId) params.set("company_id", companyId);

    const res = await fetch(
      `${CALLRAIL_BASE}/${encodeURIComponent(accountId)}/form_submissions.json?${params}`,
      {
        headers: { Authorization: auth, Accept: "application/json" },
        cache: "no-store",
      },
    );

    if (!res.ok) break;
    const json = (await res.json()) as CallrailPage<FormSubmissionRow>;
    const batch = json.form_submissions ?? [];
    if (batch.length === 0) break;

    for (const row of batch) {
      const day = dateFromIso(row.submitted_at ?? "");
      if (!day || day < startDate || day > endDate) continue;
      counts.set(day, (counts.get(day) ?? 0) + 1);
    }

    const totalPages = json.total_pages ?? 1;
    if (page >= totalPages) break;
    page += 1;
  }

  return [...counts.entries()].map(([metric_date, value]) => ({
    channel: "callrail",
    metric: "forms",
    metric_date,
    value,
    dimensions: { provider: "callrail", account_id: accountId },
    dim_key: "total",
  }));
}
