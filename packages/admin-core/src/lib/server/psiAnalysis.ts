/**
 * PageSpeed Insights analysis for public speed-test tools (server-only).
 */

import type {
  PsiStrategy,
  RecommendationEffort,
  RecommendationImpact,
  SitePlatformInsight,
  SpeedTestCoreMetrics,
  SpeedTestRecommendation,
  SpeedTestResult,
} from "../../types/speed-test";
import {
  detectPlatformFromSignals,
  extractUrlsFromPsiAudits,
  fetchPageHtml,
} from "./platformDetect";
import { tailorRecommendation } from "./platformPlaybooks";

export type {
  PsiStrategy,
  RecommendationEffort,
  RecommendationImpact,
  SpeedTestCoreMetrics,
  SpeedTestRecommendation,
  SpeedTestResult,
} from "../../types/speed-test";

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

interface PsiAudit {
  id?: string;
  title?: string;
  description?: string;
  score?: number | null;
  scoreDisplayMode?: string;
  displayValue?: string;
  numericValue?: number;
  metricSavings?: { FCP?: number; LCP?: number; TBT?: number; CLS?: number };
  details?: {
    type?: string;
    overallSavingsMs?: number;
    items?: Array<Record<string, unknown>>;
  };
}

interface PsiLhResponse {
  lighthouseResult?: {
    categories?: { performance?: { score?: number | null } };
    audits?: Record<string, PsiAudit>;
  };
  error?: { message?: string };
}

interface PlaybookEntry {
  impact: RecommendationImpact;
  effort: RecommendationEffort;
  category: SpeedTestRecommendation["category"];
  summary: string;
  actions: string[];
}

const PLAYBOOK: Record<string, PlaybookEntry> = {
  "render-blocking-insight": {
    impact: "high",
    effort: "quick",
    category: "css",
    summary: "Stylesheets or scripts are blocking the first paint.",
    actions: [
      "Self-host fonts with next/font (or local @font-face) instead of Google Fonts <link> tags.",
      "Load analytics, chat widgets, and tag managers after the page is interactive (defer or interaction trigger).",
      "Inline only critical above-the-fold CSS; let the rest load asynchronously.",
    ],
  },
  "render-blocking-resources": {
    impact: "high",
    effort: "quick",
    category: "css",
    summary: "Render-blocking resources delay when users see content.",
    actions: [
      "Move non-critical CSS out of the document head or mark async where safe.",
      "Defer non-essential JavaScript until after first paint.",
    ],
  },
  "unused-javascript": {
    impact: "high",
    effort: "moderate",
    category: "javascript",
    summary: "Large JavaScript bundles are downloaded but not used on first load.",
    actions: [
      "Split heavy widgets (sliders, maps, chat) with dynamic import() so they load only when needed.",
      "Audit WordPress plugins and page builders — each often adds 100–300 KB of JS sitewide.",
      "Remove duplicate jQuery/Bootstrap loads left over from legacy themes.",
    ],
  },
  "legacy-javascript-insight": {
    impact: "medium",
    effort: "moderate",
    category: "javascript",
    summary: "The site ships polyfills and transpiled code modern browsers do not need.",
    actions: [
      "Target modern browsers in your build (ES2020+) to drop legacy polyfill bundles.",
      "On WordPress, avoid plugins that bundle their own outdated toolchain on every page.",
    ],
  },
  "modern-image-formats": {
    impact: "high",
    effort: "quick",
    category: "images",
    summary: "Hero and content images are served as JPEG/PNG instead of WebP or AVIF.",
    actions: [
      "Enable WebP/AVIF in your CDN or image optimizer (Vercel, Cloudflare, or Supabase transforms).",
      "Use next/image (or equivalent) so the browser gets the right format automatically.",
    ],
  },
  "uses-optimized-images": {
    impact: "high",
    effort: "quick",
    category: "images",
    summary: "Images are larger than needed for how they display on screen.",
    actions: [
      "Compress hero and gallery photos (aim for <200 KB for full-width heroes after compression).",
      "Generate responsive widths — do not ship a 4000px file into a 800px slot.",
    ],
  },
  "uses-responsive-images": {
    impact: "medium",
    effort: "quick",
    category: "images",
    summary: "The browser downloads oversized images because srcset/sizes are missing.",
    actions: [
      "Add a sizes attribute that matches your layout breakpoints.",
      "Provide multiple widths in srcset (or use next/image which handles this).",
    ],
  },
  "offscreen-images": {
    impact: "medium",
    effort: "quick",
    category: "images",
    summary: "Below-the-fold images load immediately and compete with the hero.",
    actions: [
      "Lazy-load images that are not in the first viewport (native loading=\"lazy\" or next/image default).",
      "Keep fetchpriority=\"high\" / priority only on the LCP hero image.",
    ],
  },
  "prioritize-lcp-image": {
    impact: "high",
    effort: "quick",
    category: "images",
    summary: "The largest visible image is not prioritized for download.",
    actions: [
      "Add priority (Next.js) or fetchpriority=\"high\" on the hero/LCP image only.",
      "Preload the LCP image URL in <head> when it is stable (not rotating carousels).",
    ],
  },
  "lcp-lazy-loaded": {
    impact: "high",
    effort: "quick",
    category: "images",
    summary: "The LCP image is lazy-loaded, which delays the metric Google cares about most.",
    actions: [
      "Remove loading=\"lazy\" from the hero image — lazy load everything else instead.",
    ],
  },
  "largest-contentful-paint-element": {
    impact: "high",
    effort: "quick",
    category: "images",
    summary: "LCP is driven by a slow-loading hero element.",
    actions: [
      "Optimize the LCP element (usually the hero image): modern format, compression, and priority loading.",
      "Avoid animating opacity on the hero until after load — it can delay LCP timing.",
    ],
  },
  "font-display-insight": {
    impact: "medium",
    effort: "quick",
    category: "fonts",
    summary: "Web fonts block text visibility or cause layout shift when they swap in.",
    actions: [
      "Use font-display: swap (or optional) and preload only the weights you use above the fold.",
      "Prefer next/font or self-hosted subsets instead of blocking CSS from fonts.googleapis.com.",
    ],
  },
  "font-display": {
    impact: "medium",
    effort: "quick",
    category: "fonts",
    summary: "Font files delay visible text.",
    actions: [
      "Limit font families and weights — each extra file adds latency on mobile.",
      "Subset fonts to Latin characters if you do not need full glyph sets.",
    ],
  },
  "third-parties-insight": {
    impact: "high",
    effort: "moderate",
    category: "third-party",
    summary: "Third-party scripts (ads, chat, analytics, call tracking) compete with your content.",
    actions: [
      "Load CallRail, GTM, Meta Pixel, and chat widgets after user interaction or requestIdleCallback.",
      "Remove tags you no longer use — they often stay embedded for years.",
    ],
  },
  "third-party-summary": {
    impact: "medium",
    effort: "moderate",
    category: "third-party",
    summary: "Third-party code consumes bandwidth and main-thread time.",
    actions: [
      "Audit tag manager containers and disable tags on pages that do not need them.",
    ],
  },
  "server-response-time": {
    impact: "high",
    effort: "moderate",
    category: "server",
    summary: "Time to first byte is slow — the server takes too long before sending HTML.",
    actions: [
      "Move to edge hosting (Vercel, Cloudflare) with static/ISR pages where possible.",
      "Enable full-page cache for marketing routes; avoid heavy PHP on every request (common on WordPress).",
    ],
  },
  "uses-text-compression": {
    impact: "medium",
    effort: "quick",
    category: "server",
    summary: "HTML, CSS, or JS are not compressed with Brotli/gzip.",
    actions: [
      "Turn on Brotli at your CDN or host — often a one-click setting.",
    ],
  },
  "uses-long-cache-ttl": {
    impact: "low",
    effort: "quick",
    category: "caching",
    summary: "Static assets are re-downloaded on repeat visits.",
    actions: [
      "Set long cache headers for hashed static files (_next/static, fonts, images).",
    ],
  },
  "total-byte-weight": {
    impact: "medium",
    effort: "moderate",
    category: "other",
    summary: "The total page weight is high for a marketing page.",
    actions: [
      "Compress images and defer video backgrounds until after load.",
      "Remove unused CSS from page builders (Elementor/Divi often ship 500 KB+ per page).",
    ],
  },
  "unminified-javascript": {
    impact: "low",
    effort: "quick",
    category: "javascript",
    summary: "Some JavaScript is not minified in production.",
    actions: [
      "Ensure production builds minify JS; check for plugins enqueueing dev bundles.",
    ],
  },
  "unminified-css": {
    impact: "low",
    effort: "quick",
    category: "css",
    summary: "CSS files are larger than necessary.",
    actions: [
      "Purge unused CSS from legacy themes or enable production minification.",
    ],
  },
  "efficient-animated-content": {
    impact: "medium",
    effort: "quick",
    category: "images",
    summary: "Large GIFs or animations hurt load time.",
    actions: [
      "Replace GIF heroes with muted MP4/WebM or a static poster image.",
    ],
  },
  "redirects": {
    impact: "medium",
    effort: "quick",
    category: "server",
    summary: "Extra redirects add latency before the page loads.",
    actions: [
      "Link directly to HTTPS www (or non-www) — avoid chains like http → www → trailing slash.",
    ],
  },
  "uses-rel-preconnect": {
    impact: "low",
    effort: "quick",
    category: "other",
    summary: "Important origins are not preconnected.",
    actions: [
      "Add <link rel=\"preconnect\"> only for origins you actually use (CDN, fonts) — max 2–3.",
    ],
  },
  "layout-shift-elements": {
    impact: "medium",
    effort: "quick",
    category: "layout",
    summary: "Elements move after load, hurting CLS and user trust.",
    actions: [
      "Set explicit width and height on images and embeds.",
      "Reserve space for sticky headers, banners, and cookie bars before they appear.",
    ],
  },
  "cls-culprits-insight": {
    impact: "medium",
    effort: "quick",
    category: "layout",
    summary: "Specific elements are causing cumulative layout shift.",
    actions: [
      "Fix the listed elements first — often ads, fonts, or images without dimensions.",
    ],
  },
  "image-delivery-insight": {
    impact: "high",
    effort: "quick",
    category: "images",
    summary: "Image delivery can be improved with modern formats and sizing.",
    actions: [
      "Serve AVIF/WebP from your CDN and right-size images for mobile viewports.",
    ],
  },
};

const AUDIT_PRIORITY = [
  "lcp-lazy-loaded",
  "prioritize-lcp-image",
  "render-blocking-insight",
  "render-blocking-resources",
  "unused-javascript",
  "modern-image-formats",
  "uses-optimized-images",
  "image-delivery-insight",
  "largest-contentful-paint-element",
  "third-parties-insight",
  "server-response-time",
  "font-display-insight",
  "offscreen-images",
  "uses-responsive-images",
];

function scorePct(score: number | null | undefined): number | null {
  if (typeof score !== "number") return null;
  return Math.round(score * 100);
}

function estimateSavingsMs(audit: PsiAudit): number {
  const fromDetails = audit.details?.overallSavingsMs;
  if (typeof fromDetails === "number") return fromDetails;
  const lcp = audit.metricSavings?.LCP;
  if (typeof lcp === "number") return lcp;
  const fcp = audit.metricSavings?.FCP;
  if (typeof fcp === "number") return fcp;
  const tbt = audit.metricSavings?.TBT;
  if (typeof tbt === "number") return tbt;
  return 0;
}

function impactFromSavings(ms: number, playbook: PlaybookEntry): RecommendationImpact {
  if (ms >= 800) return "high";
  if (ms >= 300) return "medium";
  return playbook.impact;
}

function buildRecommendation(auditId: string, audit: PsiAudit): SpeedTestRecommendation | null {
  const score = audit.score;
  const mode = audit.scoreDisplayMode ?? "";
  const savingsMs = estimateSavingsMs(audit);

  const isOpportunity =
    mode === "metricSavings" || audit.details?.type === "opportunity" || savingsMs > 0;
  const isFailing = typeof score === "number" && score < 1;
  const isBinaryFail = mode === "binary" && score === 0;

  if (!isOpportunity && !isFailing && !isBinaryFail) return null;
  if (mode === "informative" && !isFailing) return null;

  const playbook = PLAYBOOK[auditId];
  if (!playbook) {
    if (!isFailing && savingsMs < 100) return null;
    return {
      id: auditId,
      title: audit.title ?? auditId,
      psiTitle: audit.title ?? auditId,
      impact: savingsMs >= 500 ? "high" : savingsMs >= 200 ? "medium" : "low",
      effort: "moderate",
      category: "other",
      savingsMs: savingsMs || null,
      savingsLabel: audit.displayValue ?? null,
      summary: audit.description?.split("[")[0]?.trim() ?? "This audit flagged a performance issue.",
      whyItMatters: null,
      actions: [
        "Review the audit in Chrome DevTools → Lighthouse for file-level details.",
        "Fix the highest-impact item first, then re-run this test.",
      ],
      tailored: false,
    };
  }

  return {
    id: auditId,
    title: audit.title ?? auditId,
    psiTitle: audit.title ?? auditId,
    impact: impactFromSavings(savingsMs, playbook),
    effort: playbook.effort,
    category: playbook.category,
    savingsMs: savingsMs || null,
    savingsLabel: audit.displayValue ?? null,
    summary: playbook.summary,
    whyItMatters: null,
    actions: playbook.actions,
    tailored: false,
  };
}

function sortRecommendations(a: SpeedTestRecommendation, b: SpeedTestRecommendation): number {
  const impactOrder = { high: 0, medium: 1, low: 2 };
  const ia = impactOrder[a.impact];
  const ib = impactOrder[b.impact];
  if (ia !== ib) return ia - ib;
  const sa = a.savingsMs ?? 0;
  const sb = b.savingsMs ?? 0;
  if (sa !== sb) return sb - sa;
  const pa = AUDIT_PRIORITY.indexOf(a.id);
  const pb = AUDIT_PRIORITY.indexOf(b.id);
  const pra = pa === -1 ? 999 : pa;
  const prb = pb === -1 ? 999 : pb;
  return pra - prb;
}

function parseMetrics(audits: Record<string, PsiAudit>): SpeedTestCoreMetrics {
  return {
    performance: null,
    fcp_ms: audits["first-contentful-paint"]?.numericValue ?? null,
    lcp_ms: audits["largest-contentful-paint"]?.numericValue ?? null,
    cls:
      typeof audits["cumulative-layout-shift"]?.numericValue === "number"
        ? Math.round(audits["cumulative-layout-shift"].numericValue * 1000) / 1000
        : null,
    tbt_ms: audits["total-blocking-time"]?.numericValue ?? null,
    speed_index_ms: audits["speed-index"]?.numericValue ?? null,
  };
}

/** Validate and normalize a user-supplied URL for PSI. */
export function normalizeSpeedTestUrl(input: string): { ok: true; url: string } | { ok: false; error: string } {
  const trimmed = input.trim();
  if (!trimmed) return { ok: false, error: "Enter a website URL to test." };

  let parsed: URL;
  try {
    parsed = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
  } catch {
    return { ok: false, error: "That does not look like a valid URL." };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, error: "Only http and https URLs are supported." };
  }

  const host = parsed.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host === "127.0.0.1" ||
    host.startsWith("192.168.") ||
    host.startsWith("10.") ||
    host === "0.0.0.0" ||
    host === "[::1]"
  ) {
    return { ok: false, error: "Local and private network URLs cannot be tested." };
  }

  parsed.hash = "";
  return { ok: true, url: parsed.toString() };
}

async function fetchPsi(url: string, strategy: PsiStrategy): Promise<{
  ok: boolean;
  error?: string;
  audits: Record<string, PsiAudit>;
  perfScore: number | null;
}> {
  const params = new URLSearchParams({ url, strategy, category: "performance" });
  const key = process.env.GOOGLE_PSI_API_KEY;
  if (key) params.set("key", key);

  const res = await fetch(`${PSI_ENDPOINT}?${params.toString()}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(120_000),
  });

  const json = (await res.json()) as PsiLhResponse;
  if (!res.ok) {
    return {
      ok: false,
      error: json.error?.message ?? `PageSpeed API returned ${res.status}`,
      audits: {},
      perfScore: null,
    };
  }

  const lh = json.lighthouseResult;
  return {
    ok: true,
    audits: lh?.audits ?? {},
    perfScore: scorePct(lh?.categories?.performance?.score),
  };
}

/** Run PSI and return scores plus actionable recommendations. */
export async function runSpeedTestAnalysis(
  url: string,
  strategy: PsiStrategy = "mobile",
): Promise<SpeedTestResult> {
  const emptyMetrics: SpeedTestCoreMetrics = {
    performance: null,
    fcp_ms: null,
    lcp_ms: null,
    cls: null,
    tbt_ms: null,
    speed_index_ms: null,
  };

  const fetchedAt = new Date().toISOString();

  try {
    const [psi, html] = await Promise.all([fetchPsi(url, strategy), fetchPageHtml(url)]);

    if (!psi.ok) {
      return {
        url,
        strategy,
        fetchedAt,
        metrics: emptyMetrics,
        platform: null,
        recommendations: [],
        error: psi.error,
      };
    }

    const audits = psi.audits;
    const metrics = { ...parseMetrics(audits), performance: psi.perfScore };
    const requestUrls = extractUrlsFromPsiAudits(audits);

    let platform: SitePlatformInsight | null = null;
    if (html.length > 200 || requestUrls.length > 0) {
      platform = detectPlatformFromSignals({ html, requestUrls, pageUrl: url });
    }

    const recs: SpeedTestRecommendation[] = [];
    for (const [auditId, audit] of Object.entries(audits)) {
      const rec = buildRecommendation(auditId, audit);
      if (!rec) continue;
      recs.push(tailorRecommendation(rec, platform?.platform ?? "unknown"));
    }

    recs.sort(sortRecommendations);

    return {
      url,
      strategy,
      fetchedAt,
      metrics,
      platform,
      recommendations: recs.slice(0, 10),
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "PageSpeed request failed";
    return {
      url,
      strategy,
      fetchedAt,
      metrics: emptyMetrics,
      platform: null,
      recommendations: [],
      error: msg,
    };
  }
}
