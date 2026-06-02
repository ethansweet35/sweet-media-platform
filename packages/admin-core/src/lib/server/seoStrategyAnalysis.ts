import type {
  SeoStrategyDataSnapshot,
  SeoStrategyReport,
  SeoStrategyResult,
} from "../../types/seo-strategy";
import { fetchPsiMetricsQuick, normalizeSpeedTestUrl } from "./psiAnalysis";
import { buildSiteStructureSnapshot } from "./siteStructureSnapshot";
import {
  getDomainMissingKeywords,
  getDomainOrganicCompetitors,
  getDomainOrganicKeywords,
  getDomainOverview,
  hostnameToSemrushDomain,
  SemrushApiError,
} from "./semrushClient";

import { OPENROUTER_GEMINI_FLASH_MODEL } from "../openRouterModels";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const AI_TIMEOUT_MS = 75_000;
const PSI_TIMEOUT_MS = 28_000;

function parseAiJson(raw: string): SeoStrategyReport | null {
  const trimmed = raw.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonText = fence ? fence[1].trim() : trimmed;
  try {
    const parsed = JSON.parse(jsonText) as SeoStrategyReport;
    if (!parsed.executiveSummary || !parsed.cro) return null;
    return parsed;
  } catch {
    return null;
  }
}

function buildAiPrompt(snapshot: SeoStrategyDataSnapshot): string {
  const payload = {
    url: snapshot.url,
    domain: snapshot.domain,
    semrush: {
      available: snapshot.semrushAvailable,
      organicKeywordCount: snapshot.organicKeywordCount,
      organicTrafficEstimate: snapshot.organicTrafficEstimate,
      topKeywords: snapshot.topKeywords.slice(0, 15),
      competitors: snapshot.competitors,
      missingVsCompetitors: snapshot.missingVsCompetitors,
      notes: snapshot.semrushNotes,
    },
    siteCrawl: snapshot.siteCrawl,
    psi: snapshot.psi,
  };

  return `You are a senior SEO strategist at a behavioral-health marketing agency. A prospect ran our free SEO Strategy tool. Analyze the JSON data and produce an actionable strategy report in plain English (no jargon without explanation). Be specific to THIS site — cite real keywords, paths, and competitors from the data.

Audience: treatment center owners and marketing directors who are not technical.

DATA:
${JSON.stringify(payload, null, 2)}

Return ONLY valid JSON (no markdown fences) matching this schema:
{
  "executiveSummary": "Max 2 short sentences. Lead with the single biggest win, then one honest gap.",
  "scorecard": {
    "organicVisibility": "Format: Grade (Strong|Fair|Weak) — max 12 words on why",
    "contentOpportunity": "Grade — max 12 words",
    "technicalHealth": "Grade — max 12 words",
    "conversionReadiness": "Grade — max 12 words"
  },
  "cro": {
    "title": "Conversion & user experience",
    "summary": "One sentence only",
    "items": [{ "title": "3-6 word label", "finding": "Max 15 words — what you observed", "recommendation": "Max 25 words — start with a verb; use semicolons between 2-3 actions", "impact": "high|medium|low", "effort": "quick|moderate|project" }]
  },
  "siteStructure": {
    "title": "URL & site hierarchy",
    "summary": "",
    "items": [...],
    "suggestedHierarchy": ["example path groupings or hub pages to add"]
  },
  "keywordGaps": {
    "title": "Keywords & content vs competitors",
    "summary": "",
    "items": [...],
    "contentIdeas": ["specific page/blog topics with target keyword"]
  },
  "technical": {
    "title": "Technical SEO & performance",
    "summary": "",
    "items": [...]
  },
  "competitorInsights": {
    "title": "Competitive landscape",
    "summary": "",
    "items": [...]
  },
  "prioritizedRoadmap": {
    "thisWeek": ["3-5 quick wins"],
    "thisMonth": ["4-6 bigger initiatives"]
  },
  "dataSourcesNote": "Brief note: Semrush snapshot + live crawl + PageSpeed (if present). Not a full Ahrefs crawl."
}

Rules:
- 3-5 items per section; prioritize high-impact first. No paragraph longer than 2 sentences anywhere.
- finding = observation only; recommendation = actions only (never repeat the finding).
- If Semrush data is missing, still analyze crawl + PSI and say what you'd verify with a full audit.
- For BH/treatment sites: tie CRO to calls, insurance, admissions, trust signals.
- Never invent keyword volumes — only use provided data.
- suggestedHierarchy and contentIdeas must be concrete (real slugs/topics).`;
}

async function generateStrategyReport(
  snapshot: SeoStrategyDataSnapshot,
  apiKey: string,
): Promise<{ report: SeoStrategyReport | null; error?: string }> {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL ?? "https://sweetmediaservices.com",
      "X-Title": "Sweet Media SEO Strategy",
    },
    body: JSON.stringify({
      model: OPENROUTER_GEMINI_FLASH_MODEL,
      temperature: 0.35,
      max_tokens: 5500,
      messages: [
        { role: "user", content: buildAiPrompt(snapshot) },
      ],
    }),
    signal: AbortSignal.timeout(AI_TIMEOUT_MS),
  });

  if (!res.ok) {
    const text = await res.text();
    return { report: null, error: `AI analysis failed (${res.status}): ${text.slice(0, 200)}` };
  }

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = json.choices?.[0]?.message?.content ?? "";
  const report = parseAiJson(content);
  if (!report) {
    return { report: null, error: "AI returned an invalid report format. Please try again." };
  }
  return { report };
}

export interface RunSeoStrategyOptions {
  /** Optional competitor domains (max 2), e.g. "competitor.com" */
  competitorDomains?: string[];
}

/** Full SEO strategy pipeline: Semrush snapshot, crawl, PSI, AI report. */
export async function runSeoStrategyAnalysis(
  url: string,
  opts?: RunSeoStrategyOptions,
): Promise<SeoStrategyResult> {
  const fetchedAt = new Date().toISOString();
  const domain = hostnameToSemrushDomain(url);
  const semrushNotes: string[] = [];

  const [siteCrawl, semrushBundle, psiQuick] = await Promise.all([
    buildSiteStructureSnapshot(url),
    collectSemrushSnapshot(domain, opts?.competitorDomains ?? [], semrushNotes),
    process.env.GOOGLE_PSI_API_KEY
      ? fetchPsiMetricsQuick(url, "mobile", PSI_TIMEOUT_MS)
      : Promise.resolve(null),
  ]);

  const snapshot: SeoStrategyDataSnapshot = {
    url,
    domain,
    fetchedAt,
    semrushAvailable: semrushBundle.available,
    organicKeywordCount: semrushBundle.organicKeywordCount,
    organicTrafficEstimate: semrushBundle.organicTrafficEstimate,
    topKeywords: semrushBundle.topKeywords,
    competitors: semrushBundle.competitors,
    missingVsCompetitors: semrushBundle.missingVsCompetitors,
    siteCrawl: {
      title: siteCrawl.title,
      metaDescription: siteCrawl.metaDescription,
      h1: siteCrawl.h1,
      navLabels: siteCrawl.navLabels,
      internalPaths: siteCrawl.internalPaths,
      sitemapPathCount: siteCrawl.sitemapPathCount,
      homepageWordCount: siteCrawl.homepageWordCount,
    },
    psi: psiQuick
      ? {
          performance: psiQuick.performance,
          lcpMs: psiQuick.lcp_ms,
          cls: psiQuick.cls,
          topIssues: psiQuick.topIssues,
        }
      : null,
    semrushNotes,
  };

  if (psiQuick?.error) {
    semrushNotes.push(`PageSpeed: ${psiQuick.error} (report continues without full speed data).`);
  }

  const openRouterKey = (process.env.OPENROUTER_API_KEY ?? "").trim();
  if (!openRouterKey) {
    return {
      url,
      fetchedAt,
      snapshot,
      report: null,
      aiError: "OPENROUTER_API_KEY is not configured.",
    };
  }

  try {
    const { report, error: aiError } = await generateStrategyReport(snapshot, openRouterKey);
    return {
      url,
      fetchedAt,
      snapshot,
      report,
      aiError: report ? undefined : aiError,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "AI analysis failed";
    const timedOut = /aborted|timeout/i.test(msg);
    return {
      url,
      fetchedAt,
      snapshot,
      report: null,
      aiError: timedOut
        ? "AI analysis timed out. Please try again — we shortened the audit to avoid this."
        : msg,
    };
  }
}

async function collectSemrushSnapshot(
  domain: string,
  userCompetitors: string[],
  notes: string[],
): Promise<{
  available: boolean;
  organicKeywordCount: number | null;
  organicTrafficEstimate: number | null;
  topKeywords: SeoStrategyDataSnapshot["topKeywords"];
  competitors: SeoStrategyDataSnapshot["competitors"];
  missingVsCompetitors: SeoStrategyDataSnapshot["missingVsCompetitors"];
}> {
  const empty = {
    available: false,
    organicKeywordCount: null,
    organicTrafficEstimate: null,
    topKeywords: [] as SeoStrategyDataSnapshot["topKeywords"],
    competitors: [] as SeoStrategyDataSnapshot["competitors"],
    missingVsCompetitors: [] as SeoStrategyDataSnapshot["missingVsCompetitors"],
  };

  if (!process.env.SEMRUSH_API_KEY?.trim()) {
    notes.push("Semrush API key not configured — keyword and competitor data skipped.");
    return empty;
  }

  try {
    const [overview, topKeywords, semrushCompetitors] = await Promise.all([
      getDomainOverview(domain).catch(() => null),
      getDomainOrganicKeywords(domain, { displayLimit: 12 }),
      getDomainOrganicCompetitors(domain, { displayLimit: 3 }),
    ]);

    const competitorDomains = new Set<string>();
    for (const c of semrushCompetitors) competitorDomains.add(c.domain);
    for (const d of userCompetitors.slice(0, 2)) {
      const clean = hostnameToSemrushDomain(d);
      if (clean && clean !== domain) competitorDomains.add(clean);
    }

    const competitors = [
      ...semrushCompetitors.map((c) => ({
        domain: c.domain,
        relevance: c.relevance,
        commonKeywords: c.commonKeywords,
        organicKeywords: c.organicKeywords,
        organicTraffic: c.organicTraffic,
      })),
    ];

    for (const d of userCompetitors.slice(0, 2)) {
      const clean = hostnameToSemrushDomain(d);
      if (clean && !competitors.some((c) => c.domain === clean)) {
        competitors.push({
          domain: clean,
          relevance: 0,
          commonKeywords: 0,
          organicKeywords: 0,
          organicTraffic: 0,
        });
      }
    }

    const gapTargets = [...competitorDomains].filter((d) => d !== domain).slice(0, 1);
    const gapResults = await Promise.all(
      gapTargets.map(async (competitorDomain) => {
        try {
          const keywords = await getDomainMissingKeywords(domain, competitorDomain, {
            displayLimit: 10,
          });
          return { competitorDomain, keywords };
        } catch (e) {
          const msg = e instanceof Error ? e.message : "gap analysis failed";
          notes.push(`Keyword gap vs ${competitorDomain}: ${msg}`);
          return { competitorDomain, keywords: [] };
        }
      }),
    );
    const missingVsCompetitors = gapResults
      .filter((g) => g.keywords.length > 0)
      .map((g) => ({
        competitorDomain: g.competitorDomain,
        keywords: g.keywords.map((k) => ({
          phrase: k.phrase,
          searchVolume: k.searchVolume,
          competition: k.competition,
        })),
      }));

    return {
      available: true,
      organicKeywordCount: overview?.organicKeywords ?? null,
      organicTrafficEstimate: overview?.organicTraffic ?? null,
      topKeywords: topKeywords.map((k) => ({
        phrase: k.phrase,
        position: k.position,
        searchVolume: k.searchVolume,
        trafficPercent: k.trafficPercent,
        difficulty: k.difficulty,
        rankingUrl: k.rankingUrl,
      })),
      competitors,
      missingVsCompetitors,
    };
  } catch (e) {
    if (e instanceof SemrushApiError) {
      notes.push(e.message);
    } else {
      notes.push(e instanceof Error ? e.message : "Semrush data unavailable");
    }
    return empty;
  }
}

export { normalizeSpeedTestUrl as normalizeSeoStrategyUrl };
