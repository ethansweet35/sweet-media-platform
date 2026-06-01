/**
 * Native Google PageSpeed Insights connector (server-only).
 *
 * Uses the public PSI v5 API. An API key (GOOGLE_PSI_API_KEY) raises the rate
 * limit but is optional for low volume. Returns one row per (url, strategy).
 *
 * Never import from a client component.
 */

import type { PageSpeedEntry } from "../../../types/marketing";

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

type PsiStrategy = "mobile" | "desktop";

interface PsiAudit {
  numericValue?: number;
}

interface PsiResponse {
  lighthouseResult?: {
    categories?: { performance?: { score?: number | null } };
    audits?: Record<string, PsiAudit>;
  };
  loadingExperience?: {
    metrics?: {
      INTERACTION_TO_NEXT_PAINT?: { percentile?: number };
    };
  };
}

/**
 * Resolve a Google API key for PSI. Falls back to the shared Google Cloud key
 * (same project as the NLP key) so PSI works without a dedicated secret — just
 * enable the PageSpeed Insights API on that project. Without a key the public
 * endpoint quota is tiny and returns 429s during ingest.
 */
function resolvePsiKey(): string | undefined {
  return (
    process.env.GOOGLE_PSI_API_KEY?.trim() ||
    process.env.GOOGLE_NLP_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    undefined
  );
}

async function runPsi(url: string, strategy: PsiStrategy): Promise<PageSpeedEntry> {
  const params = new URLSearchParams({ url, strategy, category: "performance" });
  const key = resolvePsiKey();
  if (key) params.set("key", key);

  const empty: PageSpeedEntry = {
    url,
    strategy,
    performance: null,
    lcp_ms: null,
    cls: null,
    inp_ms: null,
    fetched_at: null,
  };

  try {
    const res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, {
      // PSI is slow; give it room. No Next caching — this runs server-side on ingest.
      cache: "no-store",
    });
    if (!res.ok) return empty;

    const json = (await res.json()) as PsiResponse;
    const lh = json.lighthouseResult;
    const score = lh?.categories?.performance?.score;
    const audits = lh?.audits ?? {};
    const inpField = json.loadingExperience?.metrics?.INTERACTION_TO_NEXT_PAINT?.percentile;

    return {
      url,
      strategy,
      performance: typeof score === "number" ? Math.round(score * 100) : null,
      lcp_ms: audits["largest-contentful-paint"]?.numericValue ?? null,
      cls:
        typeof audits["cumulative-layout-shift"]?.numericValue === "number"
          ? Math.round(audits["cumulative-layout-shift"]!.numericValue! * 1000) / 1000
          : null,
      inp_ms: typeof inpField === "number" ? inpField : null,
      fetched_at: new Date().toISOString(),
    };
  } catch {
    return empty;
  }
}

/**
 * Fetch PageSpeed for a list of URLs across both strategies.
 * Runs sequentially to stay friendly to PSI rate limits.
 */
export async function fetchPageSpeed(
  urls: string[],
  strategies: PsiStrategy[] = ["mobile", "desktop"],
): Promise<PageSpeedEntry[]> {
  const out: PageSpeedEntry[] = [];
  for (const url of urls) {
    for (const strategy of strategies) {
      out.push(await runPsi(url, strategy));
    }
  }
  return out;
}
