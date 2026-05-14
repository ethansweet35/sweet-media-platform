"use client";

import { useCallback, useMemo, useState } from "react";
import AdminPageHeader from "../components/AdminPageHeader";
import { supabase } from "../lib/supabase";
import { applyToBlock, buildLinkRegex, fetchPostContent, savePostContent } from "../lib/content-links-utils";

type SiteScanStatus = "pending" | "checking" | "ok" | "broken" | "redirect" | "redirect-chain" | "error";
type ScanPhase = "idle" | "discovering" | "checking" | "done";
type ScanFilter = "all" | "broken" | "redirect" | "redirect-chain" | "ok";
type RedirectDecision = "replace-source" | "keep-redirect" | "review";

interface SiteScanResult {
  href: string;
  sources: Array<{ sourcePage: string; text: string }>;
  type: "internal" | "external";
  status: SiteScanStatus;
  statusCode?: number;
  chain?: string[];
  finalUrl?: string;
  errorMessage?: string;
  checked: boolean;
}

interface ReplacementSuggestion {
  url: string;
  title?: string;
  description?: string;
  source?: "internal" | "web";
  score?: number;
}

interface ReplacementState {
  loading: boolean;
  internalSuggestion: { url: string; reason: string } | null;
  externalSuggestions: ReplacementSuggestion[];
  error?: string;
}

interface ApplyResultSummary {
  updatedSources: number;
  skippedSources: number;
}

const SCAN_STATUS_CONFIG: Record<SiteScanStatus, { label: string; color: string; bg: string; icon: string }> = {
  pending: { label: "Pending", color: "text-neutral-400", bg: "bg-neutral-100", icon: "ri-time-line" },
  checking: { label: "Checking...", color: "text-amber-500", bg: "bg-amber-50", icon: "ri-loader-4-line" },
  ok: { label: "OK", color: "text-emerald-600", bg: "bg-emerald-50", icon: "ri-checkbox-circle-line" },
  broken: { label: "Broken", color: "text-red-600", bg: "bg-red-50", icon: "ri-error-warning-line" },
  redirect: { label: "Redirect", color: "text-amber-600", bg: "bg-amber-50", icon: "ri-arrow-right-circle-line" },
  "redirect-chain": { label: "Redirect Chain", color: "text-orange-600", bg: "bg-orange-50", icon: "ri-git-branch-line" },
  error: { label: "Error", color: "text-red-500", bg: "bg-red-50", icon: "ri-close-circle-line" },
};

const DECISION_LABELS: Record<RedirectDecision, string> = {
  "replace-source": "Replace source links",
  "keep-redirect": "Keep redirect",
  review: "Needs review",
};

function getPathFromUrl(url: string): string {
  try {
    return new URL(url).pathname.toLowerCase().replace(/\/$/, "") || "/";
  } catch {
    return url.toLowerCase();
  }
}

function getKeywordTokens(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9/ -]/g, " ")
    .split(/[\/\s-]+/)
    .filter((token) => token.length > 1);
}

function toAbsoluteUrl(candidate: string, baseSiteUrl: string): string {
  if (!candidate) return candidate;
  if (candidate.startsWith("http://") || candidate.startsWith("https://")) return candidate;
  if (!baseSiteUrl) return candidate;
  return `${baseSiteUrl.replace(/\/$/, "")}${candidate.startsWith("/") ? "" : "/"}${candidate}`;
}

function getBlogSlugFromSourcePage(sourcePage: string): string | null {
  const raw = sourcePage.trim();
  if (!raw) return null;

  let path = raw;
  try {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      path = new URL(raw).pathname;
    }
  } catch {
    path = raw;
  }

  const clean = path.split("?")[0].split("#")[0].replace(/\/$/, "");
  const match = clean.match(/^\/blog\/([^/]+)$/);
  return match ? match[1] : null;
}

function getLinkUrlVariants(url: string): string[] {
  const cleaned = url.trim();
  if (!cleaned) return [];
  const variants = new Set<string>();
  variants.add(cleaned);

  const withoutSlash = cleaned.replace(/\/$/, "");
  if (withoutSlash) variants.add(withoutSlash);

  try {
    const parsed = new URL(cleaned);
    const noSlashPath = parsed.pathname.replace(/\/$/, "") || "/";
    const withSlashPath = noSlashPath === "/" ? "/" : `${noSlashPath}/`;
    variants.add(`${parsed.origin}${noSlashPath}${parsed.search}${parsed.hash}`);
    variants.add(`${parsed.origin}${withSlashPath}${parsed.search}${parsed.hash}`);
  } catch {
    const withSlash = cleaned.endsWith("/") ? cleaned : `${cleaned}/`;
    variants.add(withSlash);
  }

  return [...variants];
}

export default function LinkHealthPage() {
  const [siteUrl, setSiteUrl] = useState("");
  const [baseDomain, setBaseDomain] = useState("");
  const [scanPhase, setScanPhase] = useState<ScanPhase>("idle");
  const [discoverProgress, setDiscoverProgress] = useState<{ done: number; total: number } | null>(null);
  const [checkProgress, setCheckProgress] = useState<{ done: number; total: number } | null>(null);
  const [scanResults, setScanResults] = useState<SiteScanResult[]>([]);
  const [scanFilter, setScanFilter] = useState<ScanFilter>("all");
  const [scanExpandedId, setScanExpandedId] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [replacementSuggestions, setReplacementSuggestions] = useState<Record<string, ReplacementState>>({});
  const [redirectDecisions, setRedirectDecisions] = useState<Record<string, RedirectDecision>>({});
  const [applyLoadingByHref, setApplyLoadingByHref] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  const pickBestInternalSuggestion = useCallback(
    (target: SiteScanResult): { url: string; reason: string } | null => {
      const targetPath = getPathFromUrl(target.href);
      const sourceAnchor = target.sources[0]?.text ?? "";
      const targetTokens = new Set([...getKeywordTokens(targetPath), ...getKeywordTokens(sourceAnchor)]);
      const candidates = new Set<string>();

      for (const row of scanResults) {
        if (row.type !== "internal") continue;
        if (row.href === target.href) continue;
        if (!row.checked) continue;
        if (!["ok", "redirect", "redirect-chain"].includes(row.status)) continue;

        candidates.add(row.finalUrl ?? row.href);
      }

      let winner: { url: string; score: number } | null = null;
      for (const candidateUrl of candidates) {
        const candidatePath = getPathFromUrl(candidateUrl);
        if (candidatePath === targetPath) continue;

        const candidateTokens = new Set(getKeywordTokens(candidatePath));
        let score = 0;

        if (targetPath.split("/")[1] && targetPath.split("/")[1] === candidatePath.split("/")[1]) {
          score += 20;
        }

        for (const token of candidateTokens) {
          if (targetTokens.has(token)) score += 8;
        }

        if (candidatePath.startsWith(targetPath.split("/").slice(0, 2).join("/"))) {
          score += 12;
        }

        if (!winner || score > winner.score) {
          winner = { url: candidateUrl, score };
        }
      }

      if (!winner || winner.score < 12) return null;
      return {
        url: winner.url,
        reason: "Closest internal match based on route and anchor similarity.",
      };
    },
    [scanResults]
  );

  const fetch404Suggestions = useCallback(
    async (result: SiteScanResult) => {
      const normalizedSite = siteUrl.trim().replace(/\/$/, "");
      const existing = replacementSuggestions[result.href];
      if (existing?.loading) return;
      setScanExpandedId(result.href);

      setReplacementSuggestions((prev) => ({
        ...prev,
        [result.href]: {
          loading: true,
          internalSuggestion: prev[result.href]?.internalSuggestion ?? null,
          externalSuggestions: prev[result.href]?.externalSuggestions ?? [],
        },
      }));

      try {
        const internalSuggestion = pickBestInternalSuggestion(result);
        const anchorText =
          result.sources.find((s) => Boolean(s.text.trim()))?.text ??
          getPathFromUrl(result.href).split("/").filter(Boolean).pop()?.replace(/-/g, " ") ??
          "replacement link";

        const { data, error } = await supabase.functions.invoke("suggest-replacement-link", {
          body: {
            anchorText,
            currentUrl: result.href,
            brokenUrl: result.href,
          },
        });

        if (error) {
          setReplacementSuggestions((prev) => ({
            ...prev,
            [result.href]: {
              loading: false,
              internalSuggestion,
              externalSuggestions: [],
              error: error.message || "Could not fetch replacement suggestions.",
            },
          }));
          return;
        }

        const suggestions: ReplacementSuggestion[] = Array.isArray(data?.suggestions) ? data.suggestions : [];
        const externalSuggestions = suggestions
          .filter((item) => item.source === "web")
          .map((item) => ({ ...item, url: toAbsoluteUrl(item.url, normalizedSite) }))
          .filter((item) => {
            if (!item.url.startsWith("http")) return false;
            try {
              const host = new URL(item.url).hostname;
              return !baseDomain || host !== baseDomain;
            } catch {
              return false;
            }
          })
          .slice(0, 3);

        const fallbackInternal = suggestions.find((item) => item.source === "internal");
        const resolvedInternal =
          internalSuggestion ??
          (fallbackInternal
            ? {
                url: toAbsoluteUrl(fallbackInternal.url, normalizedSite),
                reason: "Suggested from your published internal content.",
              }
            : null);

        setReplacementSuggestions((prev) => ({
          ...prev,
          [result.href]: {
            loading: false,
            internalSuggestion: resolvedInternal,
            externalSuggestions,
          },
        }));
      } catch (err) {
        setReplacementSuggestions((prev) => ({
          ...prev,
          [result.href]: {
            loading: false,
            internalSuggestion: pickBestInternalSuggestion(result),
            externalSuggestions: [],
            error: err instanceof Error ? err.message : "Unexpected suggestion error.",
          },
        }));
      }
    },
    [baseDomain, pickBestInternalSuggestion, replacementSuggestions, siteUrl]
  );

  const startSiteScan = useCallback(async () => {
    const trimmedUrl = siteUrl.trim().replace(/\/$/, "");
    if (!trimmedUrl) return;

    setScanPhase("discovering");
    setScanResults([]);
    setScanFilter("all");
    setScanExpandedId(null);
    setScanError(null);
    setDiscoverProgress(null);
    setCheckProgress(null);
    setReplacementSuggestions({});
    setRedirectDecisions({});
    setBaseDomain("");

    try {
      const { data: discoverData, error: discoverError } = await supabase.functions.invoke("crawl-site-links", {
        body: { action: "discover", siteUrl: trimmedUrl },
      });

      if (discoverError || !discoverData) {
        setScanError(discoverError?.message ?? "Discovery failed — check the site URL");
        setScanPhase("idle");
        return;
      }

      const { links: foundLinks, baseDomain: discoveredDomain } = discoverData as {
        pages: Array<{ url: string; linkCount: number }>;
        links: Array<{ href: string; sources: Array<{ sourcePage: string; text: string }> }>;
        baseDomain: string;
      };

      if (foundLinks.length === 0) {
        setScanError("No links found — make sure the site has a /sitemap.xml or is publicly accessible");
        setScanPhase("idle");
        return;
      }

      setBaseDomain(discoveredDomain);
      setDiscoverProgress({ done: foundLinks.length, total: foundLinks.length });

      const initial: SiteScanResult[] = foundLinks.map((link) => ({
        href: link.href,
        sources: link.sources,
        type: (() => {
          try {
            return new URL(link.href).hostname === discoveredDomain ? "internal" : "external";
          } catch {
            return "internal";
          }
        })(),
        status: "pending",
        checked: false,
      }));

      setScanResults([...initial]);
      setScanPhase("checking");
      setCheckProgress({ done: 0, total: initial.length });

      const batchSize = 10;
      const updated = [...initial];

      for (let i = 0; i < initial.length; i += batchSize) {
        const batch = initial.slice(i, i + batchSize);

        for (let j = i; j < Math.min(i + batchSize, initial.length); j++) {
          updated[j] = { ...updated[j], status: "checking" };
        }
        setScanResults([...updated]);

        const { data: checkData, error: checkError } = await supabase.functions.invoke("crawl-site-links", {
          body: { action: "check", urls: batch.map((row) => row.href) },
        });

        const batchResults: Array<{
          url: string;
          status: SiteScanStatus;
          statusCode?: number;
          chain?: string[];
          finalUrl?: string;
          errorMessage?: string;
        }> =
          checkError || !checkData
            ? batch.map((row) => ({
                url: row.href,
                status: "error" as SiteScanStatus,
                errorMessage: "Request failed",
              }))
            : checkData.results;

        for (const result of batchResults) {
          const idx = updated.findIndex((row) => row.href === result.url);
          if (idx !== -1) {
            updated[idx] = { ...updated[idx], ...result, checked: true };
          }
        }

        setScanResults([...updated]);
        setCheckProgress({ done: Math.min(i + batchSize, initial.length), total: initial.length });
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      setScanPhase("done");
    } catch (err) {
      setScanError(err instanceof Error ? err.message : "Unexpected error");
      setScanPhase("idle");
    }
  }, [siteUrl]);

  const applyLinkFix = useCallback(
    async (result: SiteScanResult, replacementUrl: string): Promise<ApplyResultSummary | null> => {
      const key = result.href;
      if (applyLoadingByHref[key]) return null;

      const normalizedSite = siteUrl.trim().replace(/\/$/, "");
      const normalizedReplacementUrl = toAbsoluteUrl(replacementUrl, normalizedSite);
      const sourceGroups = new Map<string, Array<{ sourcePage: string; text: string }>>();
      const skippedSources: Array<{ sourcePage: string; text: string }> = [];

      for (const source of result.sources) {
        const slug = getBlogSlugFromSourcePage(source.sourcePage);
        if (!slug) {
          skippedSources.push(source);
          continue;
        }
        if (!sourceGroups.has(slug)) sourceGroups.set(slug, []);
        sourceGroups.get(slug)!.push(source);
      }

      if (sourceGroups.size === 0) {
        showToast("No editable blog sources found for this link. Static pages need manual updates.", "error");
        return { updatedSources: 0, skippedSources: skippedSources.length };
      }

      setApplyLoadingByHref((prev) => ({ ...prev, [key]: true }));
      setScanExpandedId(result.href);

      try {
        const oldUrlVariants = getLinkUrlVariants(result.href);
        let updatedSources = 0;
        const failedSlugs = new Set<string>();

        for (const [slug, sources] of sourceGroups.entries()) {
          try {
            let blocks = await fetchPostContent(slug);
            const before = JSON.stringify(blocks);

            for (const oldUrl of oldUrlVariants) {
              const regex = buildLinkRegex(oldUrl);
              blocks = blocks.map((block, blockIdx) =>
                applyToBlock(block, blockIdx, blockIdx, (text) =>
                  text.replace(regex, `[$1](${normalizedReplacementUrl})`)
                )
              );
            }

            if (JSON.stringify(blocks) !== before) {
              await savePostContent(slug, blocks);
              updatedSources += sources.length;
            }
          } catch {
            failedSlugs.add(slug);
          }
        }

        const failedSources = result.sources.filter((source) => {
          const slug = getBlogSlugFromSourcePage(source.sourcePage);
          return slug ? failedSlugs.has(slug) : false;
        });

        const remainingSources = [...skippedSources, ...failedSources];

        setScanResults((prev) =>
          prev.map((row) => {
            if (row.href !== key) return row;
            if (remainingSources.length === 0) {
              return {
                ...row,
                status: "ok" as SiteScanStatus,
                sources: [],
                errorMessage: undefined,
                chain: undefined,
                finalUrl: undefined,
              };
            }
            return {
              ...row,
              sources: remainingSources,
              errorMessage: "Some sources still need manual updates (non-blog pages or failed saves).",
            };
          })
        );

        if (updatedSources > 0) {
          showToast(
            remainingSources.length === 0
              ? `Applied fix to ${updatedSources} source link${updatedSources !== 1 ? "s" : ""}.`
              : `Applied ${updatedSources} updates, with ${remainingSources.length} source${remainingSources.length !== 1 ? "s" : ""} left for manual review.`,
            remainingSources.length === 0 ? "success" : "error"
          );
        } else {
          showToast("No matching markdown links were updated. Please verify the source content format.", "error");
        }

        return { updatedSources, skippedSources: remainingSources.length };
      } finally {
        setApplyLoadingByHref((prev) => ({ ...prev, [key]: false }));
      }
    },
    [applyLoadingByHref, showToast, siteUrl]
  );

  const scanSummary = useMemo(() => {
    if (scanResults.length === 0) return null;
    const checked = scanResults.filter((row) => row.checked);
    return {
      total: scanResults.length,
      checked: checked.length,
      ok: checked.filter((row) => row.status === "ok").length,
      broken: checked.filter((row) => row.status === "broken" || row.status === "error").length,
      redirect: checked.filter((row) => row.status === "redirect" && row.type === "internal").length,
      chain: checked.filter((row) => row.status === "redirect-chain" && row.type === "internal").length,
      internal: checked.filter((row) => row.type === "internal").length,
      external: checked.filter((row) => row.type === "external").length,
    };
  }, [scanResults]);

  const filteredScanResults = useMemo(() => {
    if (scanFilter === "all") return scanResults;
    if (scanFilter === "broken") return scanResults.filter((row) => row.status === "broken" || row.status === "error");
    if (scanFilter === "redirect") return scanResults.filter((row) => row.status === "redirect" && row.type === "internal");
    if (scanFilter === "redirect-chain") {
      return scanResults.filter((row) => row.status === "redirect-chain" && row.type === "internal");
    }
    if (scanFilter === "ok") return scanResults.filter((row) => row.status === "ok");
    return scanResults;
  }, [scanFilter, scanResults]);

  return (
    <div>
      <AdminPageHeader
        title="Link health"
        subtitle="Full-site scanner for broken links, redirects, and redirect chains with suggested next actions."
      />

      <div className="bg-white rounded-2xl border border-neutral-100 p-8 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#3d6f7f]/5 flex items-center justify-center flex-shrink-0">
            <i className="ri-global-line text-[#3d6f7f] text-xl"></i>
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900 mb-1">Full Site Link Scan</h2>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-2xl">
              Crawls your sitemap, checks every discovered link, and provides fix guidance for 404 links and redirects.
            </p>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <input
            type="url"
            value={siteUrl}
            onChange={(event) => setSiteUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && (scanPhase === "idle" || scanPhase === "done")) {
                startSiteScan();
              }
            }}
            placeholder="https://yourdomain.com"
            disabled={scanPhase !== "idle" && scanPhase !== "done"}
            className="flex-1 min-w-[280px] border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:border-[#3d6f7f] transition-colors disabled:opacity-50 disabled:bg-neutral-50"
          />
          <button
            onClick={startSiteScan}
            disabled={!siteUrl.trim() || (scanPhase !== "idle" && scanPhase !== "done")}
            className="flex items-center gap-2 bg-[#3d6f7f] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-6 py-2.5 rounded-xl hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {scanPhase !== "idle" && scanPhase !== "done" ? (
              <>
                <i className="ri-loader-4-line animate-spin text-sm"></i>
                Scanning...
              </>
            ) : (
              <>
                <i className="ri-radar-line text-sm"></i>
                {scanPhase === "done" ? "Re-Scan" : "Scan All Links"}
              </>
            )}
          </button>
        </div>

        {(scanPhase === "discovering" || scanPhase === "checking" || scanPhase === "done") && (
          <div className="mt-6 flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <i
                    className={`ri-map-2-line text-xs ${
                      scanPhase === "discovering" ? "animate-pulse text-[#3d6f7f]" : "text-emerald-600"
                    }`}
                  ></i>
                  {scanPhase === "discovering"
                    ? "Crawling sitemap and extracting links..."
                    : `Discovered ${discoverProgress?.done ?? 0} unique links`}
                </span>
                {discoverProgress && <span className="font-medium text-neutral-700">{discoverProgress.done} links</span>}
              </div>
              <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: scanPhase === "discovering" ? "40%" : "100%" }}
                />
              </div>
            </div>

            {(scanPhase === "checking" || scanPhase === "done") && checkProgress && (
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <i
                      className={`ri-shield-check-line text-xs ${
                        scanPhase === "checking" ? "animate-pulse text-[#3d6f7f]" : "text-emerald-600"
                      }`}
                    ></i>
                    {scanPhase === "checking"
                      ? `Checking links... ${checkProgress.done}/${checkProgress.total}`
                      : "All links checked"}
                  </span>
                  <span className="font-medium text-neutral-700">
                    {checkProgress.done} / {checkProgress.total}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#3d6f7f] rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((checkProgress.done / checkProgress.total) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {scanError && (
          <div className="mt-4 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <i className="ri-error-warning-line text-red-500 flex-shrink-0"></i>
            <p className="text-sm text-red-700">{scanError}</p>
          </div>
        )}
      </div>

      {scanSummary && scanSummary.checked > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {[
            { label: "Total Links", value: scanSummary.total, icon: "ri-links-line", color: "text-[#3d6f7f]", bg: "bg-[#3d6f7f]/5", filter: "all" as ScanFilter },
            { label: "Healthy", value: scanSummary.ok, icon: "ri-checkbox-circle-line", color: "text-emerald-600", bg: "bg-emerald-50", filter: "ok" as ScanFilter },
            { label: "Broken", value: scanSummary.broken, icon: "ri-error-warning-line", color: "text-red-600", bg: "bg-red-50", filter: "broken" as ScanFilter },
            { label: "Redirect", value: scanSummary.redirect, icon: "ri-arrow-right-circle-line", color: "text-amber-600", bg: "bg-amber-50", filter: "redirect" as ScanFilter },
            { label: "Redirect Chain", value: scanSummary.chain, icon: "ri-git-branch-line", color: "text-orange-600", bg: "bg-orange-50", filter: "redirect-chain" as ScanFilter },
            { label: "External", value: scanSummary.external, icon: "ri-external-link-line", color: "text-violet-600", bg: "bg-violet-50", filter: "all" as ScanFilter },
          ].map((stat) => (
            <button
              key={stat.label}
              onClick={() => setScanFilter(stat.filter)}
              className={`bg-white rounded-2xl border p-4 flex items-center gap-3 text-left transition-all cursor-pointer ${
                scanFilter === stat.filter && stat.filter !== "all"
                  ? "border-[#3d6f7f] ring-1 ring-[#3d6f7f]/20"
                  : "border-neutral-100 hover:border-neutral-200"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <i className={`${stat.icon} ${stat.color} text-base`}></i>
              </div>
              <div>
                <p className="text-xl font-bold text-neutral-900 leading-none">{stat.value}</p>
                <p className="text-[10px] text-neutral-400 mt-1 tracking-wide leading-tight">{stat.label}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {scanResults.length > 0 && (
        <>
          <div className="bg-white rounded-2xl border border-neutral-100 p-1 mb-4 flex gap-1 flex-wrap">
            {(["all", "broken", "redirect", "redirect-chain", "ok"] as ScanFilter[]).map((filterKey) => {
              const labels: Record<ScanFilter, string> = {
                all: "All",
                broken: "Broken",
                redirect: "Redirects",
                "redirect-chain": "Chains",
                ok: "Healthy",
              };
              const counts: Record<ScanFilter, number> = {
                all: scanResults.length,
                broken: scanSummary?.broken ?? 0,
                redirect: scanSummary?.redirect ?? 0,
                "redirect-chain": scanSummary?.chain ?? 0,
                ok: scanSummary?.ok ?? 0,
              };
              return (
                <button
                  key={filterKey}
                  onClick={() => setScanFilter(filterKey)}
                  className={`flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                    scanFilter === filterKey ? "bg-[#3d6f7f] text-white" : "text-neutral-500 hover:bg-neutral-50"
                  }`}
                >
                  {labels[filterKey]}
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      scanFilter === filterKey ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"
                    }`}
                  >
                    {counts[filterKey]}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredScanResults.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
              <i className="ri-checkbox-circle-line text-4xl text-emerald-200 mb-3 block"></i>
              <p className="text-sm text-neutral-500">No links in this category.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredScanResults.map((result, idx) => {
                const cfg = SCAN_STATUS_CONFIG[result.status];
                const isExpanded = scanExpandedId === result.href;
                const hasDetail = Boolean(result.chain || result.errorMessage || result.finalUrl || result.sources.length);
                const is404Like = result.status === "broken" && (result.statusCode === 404 || result.statusCode === 410);
                const chainSteps = result.chain ?? [];
                const replacementState = replacementSuggestions[result.href];
                const decision = redirectDecisions[result.href];
                const isRedirectRow = result.type === "internal" && (result.status === "redirect" || result.status === "redirect-chain");

                return (
                  <div
                    key={`${result.href}-${idx}`}
                    className={`bg-white rounded-2xl border transition-all ${
                      result.status === "broken" || result.status === "error"
                        ? "border-red-200"
                        : result.status === "redirect-chain"
                        ? "border-orange-200"
                        : result.status === "redirect"
                        ? "border-amber-200"
                        : "border-neutral-100"
                    }`}
                  >
                    <div className="flex items-start gap-4 px-5 py-4">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg flex-shrink-0 mt-0.5 ${cfg.bg}`}>
                        <i className={`${cfg.icon} ${cfg.color} text-xs ${result.status === "checking" ? "animate-spin" : ""}`}></i>
                        <span className={`text-[10px] tracking-wide font-bold ${cfg.color} whitespace-nowrap`}>{cfg.label}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              result.type === "internal" ? "bg-[#3d6f7f]/10 text-[#3d6f7f]" : "bg-violet-100 text-violet-700"
                            }`}
                          >
                            {result.type}
                          </span>
                          {result.statusCode && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 font-mono font-semibold">
                              {result.statusCode}
                            </span>
                          )}
                          {decision && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3d6f7f]/10 text-[#3d6f7f] font-semibold">
                              Decision: {DECISION_LABELS[decision]}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-neutral-700 mt-1 truncate">{result.href}</p>
                        {isRedirectRow && result.finalUrl && (
                          <p className="text-[11px] text-amber-700 mt-1">
                            {result.status === "redirect-chain"
                              ? "Chain detected: replace source links with final URL to remove extra hops."
                              : "Single redirect: consider replacing source links with the destination URL."}
                          </p>
                        )}
                        {result.sources.length > 0 && (
                          <p className="text-[10px] text-neutral-400 mt-0.5 truncate">
                            Found on: {result.sources[0].sourcePage}
                            {result.sources.length > 1 && ` + ${result.sources.length - 1} more`}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {is404Like && (
                          <button
                            onClick={() => fetch404Suggestions(result)}
                            disabled={replacementState?.loading}
                            className="flex items-center gap-1 bg-red-500 text-white text-[10px] tracking-wide font-bold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                          >
                            {replacementState?.loading ? (
                              <>
                                <i className="ri-loader-4-line animate-spin text-xs"></i>
                                Finding...
                              </>
                            ) : (
                              <>
                                <i className="ri-magic-line text-xs"></i>
                                Suggest Fixes
                              </>
                            )}
                          </button>
                        )}
                        {result.finalUrl && (
                          <a
                            href={result.finalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 bg-amber-500 text-white text-[10px] tracking-wide font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors cursor-pointer whitespace-nowrap"
                            title={`Open final URL: ${result.finalUrl}`}
                          >
                            <i className="ri-external-link-line text-xs"></i>
                            Final URL
                          </a>
                        )}
                        {isRedirectRow && result.finalUrl && (
                          <button
                            onClick={async () => {
                              const summary = await applyLinkFix(result, result.finalUrl!);
                              if (summary && summary.updatedSources > 0) {
                                setRedirectDecisions((prev) => ({
                                  ...prev,
                                  [result.href]: "replace-source",
                                }));
                              }
                            }}
                            disabled={Boolean(applyLoadingByHref[result.href])}
                            className="flex items-center gap-1 bg-[#3d6f7f] text-white text-[10px] tracking-wide font-bold px-3 py-1.5 rounded-lg hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                          >
                            {applyLoadingByHref[result.href] ? (
                              <>
                                <i className="ri-loader-4-line animate-spin text-xs"></i>
                                Applying...
                              </>
                            ) : (
                              <>
                                <i className="ri-check-line text-xs"></i>
                                Apply Final URL
                              </>
                            )}
                          </button>
                        )}
                        {hasDetail && (
                          <button
                            onClick={() => setScanExpandedId(isExpanded ? null : result.href)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                          >
                            <i className={`ri-information-line text-sm ${isExpanded ? "text-[#3d6f7f]" : ""}`}></i>
                          </button>
                        )}
                      </div>
                    </div>

                    {isRedirectRow && (
                      <div className="border-t border-neutral-100 px-5 py-3 bg-amber-50/40 rounded-b-2xl">
                        {chainSteps.length > 1 && (
                          <div className="mb-2">
                            <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 mb-1.5">
                              Redirect Chain Path
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              {chainSteps.map((step, chainIndex) => (
                                <div key={`${result.href}-inline-chain-${chainIndex}`} className="flex items-center gap-2">
                                  <span
                                    className={`text-[10px] font-mono px-2 py-1 rounded-lg ${
                                      chainIndex === 0
                                        ? "bg-neutral-200 text-neutral-700"
                                        : chainIndex === chainSteps.length - 1
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-amber-100 text-amber-700"
                                    }`}
                                  >
                                    {step}
                                  </span>
                                  {chainIndex < chainSteps.length - 1 && (
                                    <i className="ri-arrow-right-line text-neutral-400 text-xs flex-shrink-0"></i>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-2">
                          {(["replace-source", "keep-redirect", "review"] as RedirectDecision[]).map((option) => (
                            <button
                              key={option}
                              onClick={() =>
                                setRedirectDecisions((prev) => ({
                                  ...prev,
                                  [result.href]: option,
                                }))
                              }
                              className={`text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                                decision === option
                                  ? "border-[#3d6f7f] bg-[#3d6f7f]/10 text-[#3d6f7f]"
                                  : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-100"
                              }`}
                            >
                              {DECISION_LABELS[option]}
                            </button>
                          ))}
                        </div>
                        <p className="text-[11px] text-neutral-500 mt-2">
                          Known internal references from this scan: {result.sources.length}. External backlinks are not known here.
                        </p>
                      </div>
                    )}

                    {is404Like && replacementState && (
                      <div className="border-t border-neutral-100 px-5 py-4 bg-red-50/40 rounded-b-2xl">
                        <div className="rounded-xl border border-red-200 bg-red-50/60 p-4 space-y-3">
                          <p className="text-xs font-semibold text-red-800">404 Replacement Suggestions</p>
                          {replacementState.internalSuggestion ? (
                            <div className="text-xs text-red-800">
                              <p className="font-semibold mb-1">Best internal replacement</p>
                              <a
                                href={replacementState.internalSuggestion.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono underline decoration-dotted"
                              >
                                {replacementState.internalSuggestion.url}
                              </a>
                              <button
                                onClick={() => applyLinkFix(result, replacementState.internalSuggestion!.url)}
                                disabled={Boolean(applyLoadingByHref[result.href])}
                                className="ml-2 inline-flex items-center gap-1 rounded-lg bg-[#3d6f7f] px-2.5 py-1 text-[10px] font-bold tracking-wide text-white hover:bg-[#35636f] disabled:opacity-50"
                              >
                                {applyLoadingByHref[result.href] ? (
                                  <><i className="ri-loader-4-line animate-spin text-xs"></i>Applying...</>
                                ) : (
                                  <><i className="ri-check-line text-xs"></i>Apply Fix</>
                                )}
                              </button>
                              <p className="text-red-700 mt-1">{replacementState.internalSuggestion.reason}</p>
                            </div>
                          ) : (
                            <p className="text-xs text-red-700">No confident internal replacement found from current crawl results.</p>
                          )}

                          <div className="text-xs text-red-800">
                            <p className="font-semibold mb-1">External alternatives (top 3)</p>
                            {replacementState.externalSuggestions.length > 0 ? (
                              <ul className="space-y-1">
                                {replacementState.externalSuggestions.map((external, externalIdx) => (
                                  <li key={`${external.url}-${externalIdx}`}>
                                    <a
                                      href={external.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-mono underline decoration-dotted"
                                    >
                                      {external.url}
                                    </a>
                                    <button
                                      onClick={() => applyLinkFix(result, external.url)}
                                      disabled={Boolean(applyLoadingByHref[result.href])}
                                      className="ml-2 inline-flex items-center gap-1 rounded-lg border border-red-300 bg-white px-2 py-0.5 text-[10px] font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                                    >
                                      {applyLoadingByHref[result.href] ? (
                                        <><i className="ri-loader-4-line animate-spin text-xs"></i>Applying...</>
                                      ) : (
                                        <><i className="ri-check-line text-xs"></i>Apply</>
                                      )}
                                    </button>
                                    {external.title && <span className="text-red-700"> - {external.title}</span>}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-red-700">No external alternatives returned.</p>
                            )}
                          </div>

                          {replacementState.error && (
                            <p className="text-xs text-red-700 bg-white/70 rounded px-2 py-1">{replacementState.error}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {isExpanded && hasDetail && (
                      <div className="border-t border-neutral-100 px-5 py-4 bg-neutral-50/50 rounded-b-2xl space-y-3">
                        {chainSteps.length > 1 && (
                          <div>
                            <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 mb-2">
                              Redirect Chain ({chainSteps.length - 1} hop{chainSteps.length - 1 !== 1 ? "s" : ""})
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              {chainSteps.map((step, chainIndex) => (
                                <div key={chainIndex} className="flex items-center gap-2">
                                  <span
                                    className={`text-xs font-mono px-2.5 py-1 rounded-lg ${
                                      chainIndex === 0
                                        ? "bg-neutral-200 text-neutral-700"
                                        : chainIndex === chainSteps.length - 1
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-amber-100 text-amber-700"
                                    }`}
                                  >
                                    {step}
                                  </span>
                                  {chainIndex < chainSteps.length - 1 && (
                                    <i className="ri-arrow-right-line text-neutral-400 text-xs flex-shrink-0"></i>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {result.sources.length > 1 && (
                          <div>
                            <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 mb-2">
                              Found on {result.sources.length} pages
                            </p>
                            <div className="flex flex-col gap-1">
                              {result.sources.slice(0, 10).map((source, sourceIndex) => (
                                <div key={sourceIndex} className="flex items-center gap-2">
                                  <i className="ri-file-line text-neutral-300 text-xs flex-shrink-0"></i>
                                  <span className="text-xs font-mono text-neutral-500 truncate">{source.sourcePage}</span>
                                  {source.text && (
                                    <span className="text-[10px] text-neutral-400 italic truncate">&quot;{source.text}&quot;</span>
                                  )}
                                </div>
                              ))}
                              {result.sources.length > 10 && (
                                <p className="text-[10px] text-neutral-400">+ {result.sources.length - 10} more pages</p>
                              )}
                            </div>
                          </div>
                        )}

                        {result.errorMessage && (
                          <p className="text-xs text-red-600 font-mono bg-red-50 px-3 py-2 rounded-lg">{result.errorMessage}</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {scanResults.length === 0 && scanPhase === "idle" && (
        <div className="bg-white rounded-2xl border border-neutral-100 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#3d6f7f]/5 flex items-center justify-center mx-auto mb-4">
            <i className="ri-global-line text-[#3d6f7f] text-2xl"></i>
          </div>
          <h3 className="text-base font-semibold text-neutral-800 mb-2">Full Site Link Scanner</h3>
          <p className="text-sm text-neutral-400 max-w-sm mx-auto">
            Enter your site URL and run a full scan. You will get 404 replacements, redirect guidance, and chain cleanup recommendations.
          </p>
        </div>
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
            toast.type === "success" ? "bg-[#3d6f7f] text-white" : "bg-red-500 text-white"
          }`}
        >
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
