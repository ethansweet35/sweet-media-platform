/**
 * DataForSEO — top-20 organic SERP results + People Also Ask.
 *
 * Auth is HTTP Basic with login + password. Both are stored as repo-root
 * env vars and pushed to every brand's Vercel project.
 *
 * Endpoint: /v3/serp/google/organic/live/advanced
 *   https://docs.dataforseo.com/v3/serp/google/organic/live/advanced
 *
 * We send `depth=20` and `people_also_ask_click_depth=1` so a single call
 * returns the organic top-20 plus first-tier PAA questions. Cost per call:
 * $0.0006 (verified 2026).
 */
import { ContentEditorError } from "./errors";
import { DATAFORSEO_SERP_COST_PER_CALL } from "./pricing";
import { withRetry } from "./retry";
import type { SerpFetchResult, VendorCallResult } from "./types";

const ENDPOINT =
  "https://api.dataforseo.com/v3/serp/google/organic/live/advanced";

export interface FetchSerpOptions {
  keyword: string;
  /** DataForSEO location code. 2840 = United States. */
  locationCode?: number;
  /** ISO 639-1; default 'en'. */
  languageCode?: string;
  device?: "desktop" | "mobile";
  /** Depth of organic results to retrieve. Default 20, max 100. */
  depth?: number;
}

interface DataForSeoEnvelope {
  tasks?: Array<{
    status_code?: number;
    status_message?: string;
    result?: Array<{
      items?: Array<Record<string, unknown>>;
    }> | null;
  }>;
}

function getAuthHeader(): string {
  const login = process.env.DATAFORSEO_LOGIN?.trim();
  const password = process.env.DATAFORSEO_PASSWORD?.trim();
  if (!login || !password) {
    throw new ContentEditorError(
      "DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD are not configured.",
      { source: "dataforseo", status: 500 },
    );
  }
  const token = Buffer.from(`${login}:${password}`).toString("base64");
  return `Basic ${token}`;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** Recursively pull PAA question strings out of nested PAA structures. */
function collectPaaQuestions(items: Array<Record<string, unknown>>): string[] {
  const out: string[] = [];
  const visit = (nodes: unknown): void => {
    if (!Array.isArray(nodes)) return;
    for (const node of nodes) {
      if (!node || typeof node !== "object") continue;
      const n = node as Record<string, unknown>;
      const type = typeof n.type === "string" ? n.type : "";
      if (type === "people_also_ask_element" || type === "people_also_ask_expanded_element") {
        const title = typeof n.title === "string" ? n.title.trim() : "";
        if (title) out.push(title);
        // Some payloads nest further questions under "expanded_element"
        if (Array.isArray(n.expanded_element)) visit(n.expanded_element);
        if (Array.isArray(n.items)) visit(n.items);
      } else if (Array.isArray(n.items)) {
        visit(n.items);
      }
    }
  };
  visit(items);
  // Dedupe while preserving order
  const seen = new Set<string>();
  return out.filter((q) => {
    const k = q.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export async function fetchSerpResults(
  opts: FetchSerpOptions,
): Promise<VendorCallResult<SerpFetchResult>> {
  const keyword = opts.keyword.trim();
  if (!keyword) {
    throw new ContentEditorError("keyword is required", {
      source: "dataforseo",
      status: 400,
    });
  }

  const depth = Math.min(100, Math.max(10, opts.depth ?? 20));
  const requestBody = [
    {
      keyword,
      location_code: opts.locationCode ?? 2840,
      language_code: opts.languageCode ?? "en",
      device: opts.device ?? "desktop",
      depth,
      people_also_ask_click_depth: 1,
    },
  ];

  const authHeader = getAuthHeader();

  const envelope = await withRetry(async () => {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new ContentEditorError(
        `DataForSEO responded ${res.status}: ${text.slice(0, 300)}`,
        { source: "dataforseo", status: 502, detail: text.slice(0, 800) },
      );
      // Surface status so retry helper can decide whether to retry.
      (err as unknown as { status: number }).status = res.status;
      throw err;
    }
    return (await res.json()) as DataForSeoEnvelope;
  });

  const task = envelope.tasks?.[0];
  if (!task || task.status_code === undefined) {
    throw new ContentEditorError("DataForSEO returned an empty envelope.", {
      source: "dataforseo",
      status: 502,
      detail: envelope,
    });
  }
  if (task.status_code >= 40000) {
    throw new ContentEditorError(
      `DataForSEO task failed: ${task.status_message ?? "unknown error"}`,
      { source: "dataforseo", status: 502, detail: task },
    );
  }

  const items = task.result?.[0]?.items ?? [];

  const organicResults = items
    .filter((i) => i?.type === "organic")
    .slice(0, depth)
    .map((item, idx): import("./types").SerpOrganicResult => {
      const url = typeof item.url === "string" ? item.url : "";
      return {
        position: idx + 1,
        url,
        domain: extractDomain(url),
        title: typeof item.title === "string" ? item.title : "",
        description: typeof item.description === "string" ? item.description : "",
      };
    })
    .filter((r) => r.url.length > 0);

  const paaQuestions = collectPaaQuestions(items);

  return {
    data: { organicResults, paaQuestions },
    cost_usd: DATAFORSEO_SERP_COST_PER_CALL,
  };
}
