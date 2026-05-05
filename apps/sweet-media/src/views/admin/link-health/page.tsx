"use client";

import { useState, useCallback, useMemo } from "react";
import { AdminPageHeader } from "@sweetmedia/admin-core";
import { useInternalLinks } from "@sweetmedia/admin-core";
import { supabase } from "@/lib/supabase";
import Seo from "@/components/feature/Seo";

// ── Full Site Scan types ──────────────────────────────────────────────────────

type SiteScanStatus = "pending" | "checking" | "ok" | "broken" | "redirect" | "redirect-chain" | "error";

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

type ScanPhase = "idle" | "discovering" | "checking" | "done";
type ScanFilter = "all" | "broken" | "redirect" | "redirect-chain" | "ok";

const SCAN_STATUS_CONFIG: Record<SiteScanStatus, { label: string; color: string; bg: string; icon: string }> = {
  pending:          { label: "Pending",        color: "text-neutral-400", bg: "bg-neutral-100",  icon: "ri-time-line" },
  checking:         { label: "Checking...",    color: "text-amber-500",   bg: "bg-amber-50",     icon: "ri-loader-4-line" },
  ok:               { label: "OK",             color: "text-emerald-600", bg: "bg-emerald-50",   icon: "ri-checkbox-circle-line" },
  broken:           { label: "Broken",         color: "text-red-600",     bg: "bg-red-50",       icon: "ri-error-warning-line" },
  redirect:         { label: "Redirect",       color: "text-amber-600",   bg: "bg-amber-50",     icon: "ri-arrow-right-circle-line" },
  "redirect-chain": { label: "Redirect Chain", color: "text-orange-600",  bg: "bg-orange-50",    icon: "ri-git-branch-line" },
  error:            { label: "Error",          color: "text-red-500",     bg: "bg-red-50",       icon: "ri-close-circle-line" },
};

type LinkStatus = "pending" | "checking" | "ok" | "broken" | "redirect" | "redirect-chain" | "error";

interface LinkResult {
  id: string;
  keyword: string;
  href: string;
  priority: number;
  active: boolean;
  status: LinkStatus;
  finalUrl?: string;
  redirectChain?: string[];
  errorMessage?: string;
  checked: boolean;
}

type FilterType = "all" | "broken" | "redirect" | "redirect-chain" | "ok";

const STATUS_CONFIG: Record<LinkStatus, { label: string; color: string; bg: string; icon: string }> = {
  pending: { label: "Pending", color: "text-neutral-400", bg: "bg-neutral-100", icon: "ri-time-line" },
  checking: { label: "Checking...", color: "text-amber-500", bg: "bg-amber-50", icon: "ri-loader-4-line" },
  ok: { label: "OK", color: "text-emerald-600", bg: "bg-emerald-50", icon: "ri-checkbox-circle-line" },
  broken: { label: "Broken", color: "text-red-600", bg: "bg-red-50", icon: "ri-error-warning-line" },
  redirect: { label: "Redirect", color: "text-amber-600", bg: "bg-amber-50", icon: "ri-arrow-right-circle-line" },
  "redirect-chain": { label: "Redirect Chain", color: "text-orange-600", bg: "bg-orange-50", icon: "ri-links-line" },
  error: { label: "Error", color: "text-red-500", bg: "bg-red-50", icon: "ri-close-circle-line" },
};

// All static routes defined in the app (canonical App Router paths)
const STATIC_ROUTES = new Set([
  "/",
  "/industries",
  "/results",
  "/about",
  "/contact",
  "/blog",
  "/seo",
  "/paid-media",
  "/social-media",
  "/web-dev",
  "/case-studies/california-prime-recovery",
  "/case-studies/rize-oc",
]);

/** Legacy SPA paths → canonical URLs (marks internal links that should be updated) */
const REDIRECT_MAP: Record<string, string> = {
  "/about-us": "/about",
  "/contact-us": "/contact",
  "/services/seo": "/seo",
  "/services/paid-media": "/paid-media",
  "/services/social-media": "/social-media",
  "/services/web-development": "/web-dev",
};

// Fetch all published blog slugs from Supabase once per scan session
async function fetchPublishedSlugs(): Promise<Set<string>> {
  const { data } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");
  return new Set((data || []).map((r: { slug: string }) => r.slug));
}

// App-aware link checker — no HTTP fetching (SPA always returns 200)
function checkLinkAgainstApp(
  href: string,
  blogSlugs: Set<string>
): { status: LinkStatus; finalUrl?: string; redirectChain?: string[]; errorMessage?: string } {
  const clean = href.replace(/\/$/, "") || "/";

  // Known router redirect?
  if (REDIRECT_MAP[clean]) {
    const target = REDIRECT_MAP[clean];
    if (STATIC_ROUTES.has(target)) {
      return {
        status: "redirect",
        finalUrl: target,
        redirectChain: [clean, target],
      };
    }
    return {
      status: "broken",
      errorMessage: `Redirects to ${target} which has no matching page`,
    };
  }

  // Static route?
  if (STATIC_ROUTES.has(clean)) {
    return { status: "ok" };
  }

  // Blog post route?
  const blogMatch = clean.match(/^\/blog\/(.+)$/);
  if (blogMatch) {
    const slug = blogMatch[1];
    if (blogSlugs.has(slug)) {
      return { status: "ok" };
    }
    return {
      status: "broken",
      errorMessage: `Blog post "${slug}" not found or not published`,
    };
  }

  // No matching route
  return {
    status: "broken",
    errorMessage: `No page exists at "${clean}"`,
  };
}

export default function LinkHealthPage() {
  const { links, loading: linksLoading, updateLink, deleteLink } = useInternalLinks();

  // ── Tab ──────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<"mappings" | "site-scan">("mappings");

  // ── Full Site Scan state ──────────────────────────────────────────────────
  const [siteUrl, setSiteUrl] = useState("");
  const [scanPhase, setScanPhase] = useState<ScanPhase>("idle");
  const [discoverProgress, setDiscoverProgress] = useState<{ done: number; total: number } | null>(null);
  const [checkProgress, setCheckProgress] = useState<{ done: number; total: number } | null>(null);
  const [scanResults, setScanResults] = useState<SiteScanResult[]>([]);
  const [scanFilter, setScanFilter] = useState<ScanFilter>("all");
  const [scanExpandedId, setScanExpandedId] = useState<string | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

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

    try {
      // Phase 1: Discover all links via sitemap crawl
      const { data: discoverData, error: discoverError } = await supabase.functions.invoke("crawl-site-links", {
        body: { action: "discover", siteUrl: trimmedUrl },
      });

      if (discoverError || !discoverData) {
        setScanError(discoverError?.message ?? "Discovery failed — check the site URL");
        setScanPhase("idle");
        return;
      }

      const { links: foundLinks, baseDomain } = discoverData as {
        pages: Array<{ url: string; linkCount: number }>;
        links: Array<{ href: string; sources: Array<{ sourcePage: string; text: string }> }>;
        baseDomain: string;
      };

      if (foundLinks.length === 0) {
        setScanError("No links found — make sure the site has a /sitemap.xml or is publicly accessible");
        setScanPhase("idle");
        return;
      }

      setDiscoverProgress({ done: foundLinks.length, total: foundLinks.length });

      // Build initial results
      const initial: SiteScanResult[] = foundLinks.map(l => ({
        href: l.href,
        sources: l.sources,
        type: (() => {
          try { return new URL(l.href).hostname === baseDomain ? "internal" : "external"; }
          catch { return "internal"; }
        })(),
        status: "pending",
        checked: false,
      }));
      setScanResults([...initial]);
      setScanPhase("checking");
      setCheckProgress({ done: 0, total: initial.length });

      // Phase 2: Check all links in batches of 10
      const BATCH = 10;
      const updated = [...initial];
      for (let i = 0; i < initial.length; i += BATCH) {
        const batch = initial.slice(i, i + BATCH);

        // Mark batch as checking
        for (let j = i; j < Math.min(i + BATCH, initial.length); j++) {
          updated[j] = { ...updated[j], status: "checking" };
        }
        setScanResults([...updated]);

        const { data: checkData, error: checkError } = await supabase.functions.invoke("crawl-site-links", {
          body: { action: "check", urls: batch.map(r => r.href) },
        });

        const batchResults: Array<{
          url: string; status: SiteScanStatus; statusCode?: number;
          chain?: string[]; finalUrl?: string; errorMessage?: string;
        }> = checkError || !checkData ? batch.map(r => ({ url: r.href, status: "error" as SiteScanStatus, errorMessage: "Request failed" })) : checkData.results;

        for (const res of batchResults) {
          const idx = updated.findIndex(r => r.href === res.url);
          if (idx !== -1) {
            updated[idx] = { ...updated[idx], ...res, checked: true };
          }
        }
        setScanResults([...updated]);
        setCheckProgress({ done: Math.min(i + BATCH, initial.length), total: initial.length });

        // Brief yield between batches
        await new Promise(r => setTimeout(r, 50));
      }

      setScanPhase("done");
    } catch (err) {
      setScanError(err instanceof Error ? err.message : "Unexpected error");
      setScanPhase("idle");
    }
  }, [siteUrl]);

  const scanSummary = useMemo(() => {
    if (scanResults.length === 0) return null;
    const checked = scanResults.filter(r => r.checked);
    return {
      total: scanResults.length,
      checked: checked.length,
      ok: checked.filter(r => r.status === "ok").length,
      broken: checked.filter(r => r.status === "broken" || r.status === "error").length,
      redirect: checked.filter(r => r.status === "redirect").length,
      chain: checked.filter(r => r.status === "redirect-chain").length,
      internal: checked.filter(r => r.type === "internal").length,
      external: checked.filter(r => r.type === "external").length,
    };
  }, [scanResults]);

  const filteredScanResults = useMemo(() => {
    if (scanFilter === "all") return scanResults;
    if (scanFilter === "broken") return scanResults.filter(r => r.status === "broken" || r.status === "error");
    if (scanFilter === "redirect") return scanResults.filter(r => r.status === "redirect");
    if (scanFilter === "redirect-chain") return scanResults.filter(r => r.status === "redirect-chain");
    if (scanFilter === "ok") return scanResults.filter(r => r.status === "ok");
    return scanResults;
  }, [scanResults, scanFilter]);

  const [results, setResults] = useState<LinkResult[]>([]);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editHref, setEditHref] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const startScan = useCallback(async () => {
    if (links.length === 0) return;

    setScanning(true);
    setScanComplete(false);
    setProgress(0);
    setFilter("all");
    setEditingId(null);

    // Initialize all as pending
    const initial: LinkResult[] = links.map((l) => ({
      id: l.id,
      keyword: l.keyword,
      href: l.href,
      priority: l.priority,
      active: l.active,
      status: "pending",
      checked: false,
    }));
    setResults(initial);

    // Fetch all published blog slugs once upfront
    let blogSlugs: Set<string> = new Set();
    try {
      blogSlugs = await fetchPublishedSlugs();
    } catch {
      // If Supabase fails, we'll still check static routes
    }

    // Check all links — synchronous logic, no network calls needed
    const updated = [...initial];
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const idx = updated.findIndex((r) => r.id === link.id);
      if (idx !== -1) {
        updated[idx] = { ...updated[idx], status: "checking" };
      }
      setResults([...updated]);

      // Small yield to let React re-render the "checking" state
      await new Promise((resolve) => setTimeout(resolve, 20));

      const result = checkLinkAgainstApp(link.href, blogSlugs);
      if (idx !== -1) {
        updated[idx] = { ...updated[idx], ...result, checked: true };
      }
      setResults([...updated]);
      setProgress(Math.round(((i + 1) / links.length) * 100));
    }

    setScanning(false);
    setScanComplete(true);
  }, [links]);

  const filteredResults = useMemo(() => {
    if (filter === "all") return results;
    if (filter === "broken") return results.filter((r) => r.status === "broken" || r.status === "error");
    if (filter === "redirect") return results.filter((r) => r.status === "redirect");
    if (filter === "redirect-chain") return results.filter((r) => r.status === "redirect-chain");
    if (filter === "ok") return results.filter((r) => r.status === "ok");
    return results;
  }, [results, filter]);

  const summary = useMemo(() => {
    if (results.length === 0) return null;
    const checked = results.filter((r) => r.checked);
    return {
      total: results.length,
      checked: checked.length,
      ok: checked.filter((r) => r.status === "ok").length,
      broken: checked.filter((r) => r.status === "broken" || r.status === "error").length,
      redirect: checked.filter((r) => r.status === "redirect").length,
      chain: checked.filter((r) => r.status === "redirect-chain").length,
    };
  }, [results]);

  const handleSaveEdit = async (id: string) => {
    const trimmed = editHref.trim();
    if (!trimmed.startsWith("/")) {
      showToast("URL must start with /", "error");
      return;
    }
    setSavingId(id);
    const ok = await updateLink(id, { href: trimmed });
    setSavingId(null);
    if (ok) {
      showToast("Link updated — re-scan to verify");
      setEditingId(null);
      setResults((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, href: trimmed, status: "pending", checked: false, finalUrl: undefined, redirectChain: undefined, errorMessage: undefined }
            : r
        )
      );
    } else {
      showToast("Failed to update link", "error");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    const ok = await deleteLink(deletingId);
    setDeletingId(null);
    if (ok) {
      showToast("Link deleted");
      setResults((prev) => prev.filter((r) => r.id !== deletingId));
    } else {
      showToast("Failed to delete link", "error");
    }
  };

  const handleFixToFinalUrl = async (result: LinkResult) => {
    if (!result.finalUrl) return;
    setSavingId(result.id);
    const ok = await updateLink(result.id, { href: result.finalUrl });
    setSavingId(null);
    if (ok) {
      showToast("Updated to final destination URL");
      setResults((prev) =>
        prev.map((r) =>
          r.id === result.id
            ? { ...r, href: result.finalUrl!, status: "pending", checked: false, finalUrl: undefined, redirectChain: undefined }
            : r
        )
      );
    } else {
      showToast("Failed to update", "error");
    }
  };

  const issueCount = summary ? summary.broken + summary.redirect + summary.chain : 0;

  return (
    <div className="">
      <Seo title="Link Health | Admin" description="Scan and fix broken or redirecting internal links" noindex />

      <AdminPageHeader
        title="Link health"
        subtitle="Scan keyword mappings or crawl every link across your entire site to detect broken URLs and redirect chains."
      />

      {/* Tab switcher */}
      <div className="flex gap-1 bg-white border border-neutral-100 rounded-2xl p-1 mb-6 w-fit">
        {([
          { id: "mappings",  label: "Keyword Mappings", icon: "ri-links-line" },
          { id: "site-scan", label: "Full Site Scan",   icon: "ri-global-line" },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase font-bold py-2.5 px-5 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab.id ? "bg-[#3d6f7f] text-white" : "text-neutral-500 hover:bg-neutral-50"
            }`}
          >
            <i className={`${tab.icon} text-sm`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── FULL SITE SCAN TAB ─────────────────────────────────────────────── */}
      {activeTab === "site-scan" && (
        <div>
          {/* Config card */}
          <div className="bg-white rounded-2xl border border-neutral-100 p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#3d6f7f]/5 flex items-center justify-center flex-shrink-0">
                <i className="ri-global-line text-[#3d6f7f] text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 mb-1">Full Site Link Scan</h2>
                <p className="text-sm text-neutral-500 leading-relaxed max-w-2xl">
                  Crawls your site's sitemap, extracts every <code className="text-xs bg-neutral-100 px-1.5 py-0.5 rounded">&lt;a href&gt;</code> link found across all pages, then checks each one for broken status, single redirects, and multi-hop redirect chains — including external links.
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <input
                type="url"
                value={siteUrl}
                onChange={e => setSiteUrl(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && scanPhase === "idle") startSiteScan(); }}
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
                  <><i className="ri-loader-4-line animate-spin text-sm"></i>Scanning...</>
                ) : (
                  <><i className="ri-radar-line text-sm"></i>{scanPhase === "done" ? "Re-Scan" : "Scan All Links"}</>
                )}
              </button>
            </div>

            {/* Progress */}
            {(scanPhase === "discovering" || scanPhase === "checking" || scanPhase === "done") && (
              <div className="mt-6 flex flex-col gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <i className={`ri-map-2-line text-xs ${scanPhase === "discovering" ? "animate-pulse text-[#3d6f7f]" : "text-emerald-600"}`}></i>
                      {scanPhase === "discovering" ? "Crawling sitemap & extracting links..." : `Discovered ${discoverProgress?.done ?? 0} unique links`}
                    </span>
                    {discoverProgress && <span className="font-medium text-neutral-700">{discoverProgress.done} links</span>}
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: scanPhase === "discovering" ? "40%" : "100%" }} />
                  </div>
                </div>

                {(scanPhase === "checking" || scanPhase === "done") && checkProgress && (
                  <div>
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <i className={`ri-shield-check-line text-xs ${scanPhase === "checking" ? "animate-pulse text-[#3d6f7f]" : "text-emerald-600"}`}></i>
                        {scanPhase === "checking" ? `Checking links... ${checkProgress.done}/${checkProgress.total}` : "All links checked"}
                      </span>
                      <span className="font-medium text-neutral-700">{checkProgress.done} / {checkProgress.total}</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#3d6f7f] rounded-full transition-all duration-300" style={{ width: `${Math.round((checkProgress.done / checkProgress.total) * 100)}%` }} />
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

          {/* Summary stats */}
          {scanSummary && scanSummary.checked > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {[
                { label: "Total Links",    value: scanSummary.total,    icon: "ri-links-line",              color: "text-[#3d6f7f]",   bg: "bg-[#3d6f7f]/5", f: "all" as ScanFilter },
                { label: "Healthy",        value: scanSummary.ok,       icon: "ri-checkbox-circle-line",    color: "text-emerald-600", bg: "bg-emerald-50",  f: "ok" as ScanFilter },
                { label: "Broken",         value: scanSummary.broken,   icon: "ri-error-warning-line",      color: "text-red-600",     bg: "bg-red-50",      f: "broken" as ScanFilter },
                { label: "Redirect",       value: scanSummary.redirect, icon: "ri-arrow-right-circle-line", color: "text-amber-600",   bg: "bg-amber-50",    f: "redirect" as ScanFilter },
                { label: "Redirect Chain", value: scanSummary.chain,    icon: "ri-git-branch-line",         color: "text-orange-600",  bg: "bg-orange-50",   f: "redirect-chain" as ScanFilter },
                { label: "External",       value: scanSummary.external, icon: "ri-external-link-line",      color: "text-violet-600",  bg: "bg-violet-50",   f: "all" as ScanFilter },
              ].map(s => (
                <button key={s.label} onClick={() => setScanFilter(s.f)}
                  className={`bg-white rounded-2xl border p-4 flex items-center gap-3 text-left transition-all cursor-pointer ${
                    scanFilter === s.f && s.f !== "all" ? "border-[#3d6f7f] ring-1 ring-[#3d6f7f]/20" : "border-neutral-100 hover:border-neutral-200"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                    <i className={`${s.icon} ${s.color} text-base`}></i>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-neutral-900 leading-none">{s.value}</p>
                    <p className="text-[10px] text-neutral-400 mt-1 tracking-wide leading-tight">{s.label}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Results */}
          {scanResults.length > 0 && (
            <>
              {/* Filter tabs */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-1 mb-4 flex gap-1 flex-wrap">
                {(["all", "broken", "redirect", "redirect-chain", "ok"] as ScanFilter[]).map(f => {
                  const labels: Record<ScanFilter, string> = { all: "All", broken: "Broken", redirect: "Redirects", "redirect-chain": "Chains", ok: "Healthy" };
                  const counts: Record<ScanFilter, number> = {
                    all: scanResults.length,
                    broken: scanSummary?.broken ?? 0,
                    redirect: scanSummary?.redirect ?? 0,
                    "redirect-chain": scanSummary?.chain ?? 0,
                    ok: scanSummary?.ok ?? 0,
                  };
                  return (
                    <button key={f} onClick={() => setScanFilter(f)}
                      className={`flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                        scanFilter === f ? "bg-[#3d6f7f] text-white" : "text-neutral-500 hover:bg-neutral-50"
                      }`}
                    >
                      {labels[f]}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${scanFilter === f ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"}`}>
                        {counts[f]}
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
                    const hasDetail = result.chain || result.errorMessage || result.finalUrl;

                    return (
                      <div key={`${result.href}-${idx}`}
                        className={`bg-white rounded-2xl border transition-all ${
                          result.status === "broken" || result.status === "error" ? "border-red-200"
                          : result.status === "redirect-chain" ? "border-orange-200"
                          : result.status === "redirect" ? "border-amber-200"
                          : "border-neutral-100"
                        }`}
                      >
                        <div className="flex items-start gap-4 px-5 py-4">
                          {/* Status */}
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg flex-shrink-0 mt-0.5 ${cfg.bg}`}>
                            <i className={`${cfg.icon} ${cfg.color} text-xs ${result.status === "checking" ? "animate-spin" : ""}`}></i>
                            <span className={`text-[10px] tracking-wide font-bold ${cfg.color} whitespace-nowrap`}>{cfg.label}</span>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${result.type === "internal" ? "bg-[#3d6f7f]/10 text-[#3d6f7f]" : "bg-violet-100 text-violet-700"}`}>
                                {result.type}
                              </span>
                              {result.statusCode && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500 font-mono font-semibold">
                                  {result.statusCode}
                                </span>
                              )}
                            </div>
                            <p className="text-xs font-mono text-neutral-700 mt-1 truncate">{result.href}</p>
                            {result.sources.length > 0 && (
                              <p className="text-[10px] text-neutral-400 mt-0.5 truncate">
                                Found on: {result.sources[0].sourcePage}
                                {result.sources.length > 1 && ` + ${result.sources.length - 1} more`}
                              </p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {result.finalUrl && (
                              <a href={result.finalUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1 bg-amber-500 text-white text-[10px] tracking-wide font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors cursor-pointer whitespace-nowrap"
                                title={`Go to final URL: ${result.finalUrl}`}
                              >
                                <i className="ri-external-link-line text-xs"></i>Final URL
                              </a>
                            )}
                            {hasDetail && (
                              <button onClick={() => setScanExpandedId(isExpanded ? null : result.href)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                              >
                                <i className={`ri-information-line text-sm ${isExpanded ? "text-[#3d6f7f]" : ""}`}></i>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Expanded chain detail */}
                        {isExpanded && hasDetail && (
                          <div className="border-t border-neutral-100 px-5 py-4 bg-neutral-50/50 rounded-b-2xl">
                            {result.chain && result.chain.length > 1 && (
                              <div className="mb-3">
                                <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 mb-2">
                                  Redirect Chain ({result.chain.length - 1} hop{result.chain.length - 1 !== 1 ? "s" : ""})
                                </p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  {result.chain.map((step, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <span className={`text-xs font-mono px-2.5 py-1 rounded-lg ${
                                        i === 0 ? "bg-neutral-200 text-neutral-700"
                                        : i === result.chain!.length - 1 ? "bg-emerald-100 text-emerald-700"
                                        : "bg-amber-100 text-amber-700"
                                      }`}>{step}</span>
                                      {i < result.chain!.length - 1 && <i className="ri-arrow-right-line text-neutral-400 text-xs flex-shrink-0"></i>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {result.sources.length > 1 && (
                              <div className="mb-3">
                                <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 mb-2">Found on {result.sources.length} pages</p>
                                <div className="flex flex-col gap-1">
                                  {result.sources.slice(0, 10).map((s, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <i className="ri-file-line text-neutral-300 text-xs flex-shrink-0"></i>
                                      <span className="text-xs font-mono text-neutral-500 truncate">{s.sourcePage}</span>
                                      {s.text && <span className="text-[10px] text-neutral-400 italic truncate">"{s.text}"</span>}
                                    </div>
                                  ))}
                                  {result.sources.length > 10 && <p className="text-[10px] text-neutral-400">+ {result.sources.length - 10} more pages</p>}
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

          {/* Empty state */}
          {scanResults.length === 0 && scanPhase === "idle" && (
            <div className="bg-white rounded-2xl border border-neutral-100 p-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#3d6f7f]/5 flex items-center justify-center mx-auto mb-4">
                <i className="ri-global-line text-[#3d6f7f] text-2xl"></i>
              </div>
              <h3 className="text-base font-semibold text-neutral-800 mb-2">Full Site Link Scanner</h3>
              <p className="text-sm text-neutral-400 max-w-sm mx-auto">
                Enter your site URL above and click Scan All Links. The crawler will discover every page from your sitemap and check every link — including external URLs and redirect chains.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── KEYWORD MAPPINGS TAB ──────────────────────────────────────────── */}
      {activeTab === "mappings" && (
      <div className="">

        {/* Intro / Scan trigger */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-8 mb-6">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#3d6f7f]/5 flex items-center justify-center flex-shrink-0">
                <i className="ri-shield-check-line text-[#3d6f7f] text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 mb-1">Internal Link Health Scan</h2>
                <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
                  Checks every internal link mapping against your live site and published blog posts. Detects broken links (deleted posts, wrong slugs), known redirects, and multi-hop redirect chains.
                </p>
                {!linksLoading && (
                  <p className="text-xs text-neutral-400 mt-2">
                    <span className="font-semibold text-neutral-600">{links.length}</span> link mappings found in database
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={startScan}
              disabled={scanning || linksLoading || links.length === 0}
              className="flex items-center gap-2 bg-[#3d6f7f] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-6 py-3 rounded-xl hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {scanning ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-sm"></i>
                  Scanning...
                </>
              ) : (
                <>
                  <i className="ri-radar-line text-sm"></i>
                  {scanComplete ? "Re-Scan All Links" : "Start Scan"}
                </>
              )}
            </button>
          </div>

          {/* Progress bar */}
          {(scanning || (scanComplete && results.length > 0)) && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                <span>{scanning ? `Scanning... ${progress}%` : "Scan complete"}</span>
                <span>{summary?.checked ?? 0} / {results.length} checked</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3d6f7f] rounded-full transition-all duration-300"
                  style={{ width: `${scanning ? progress : 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Summary stats */}
        {summary && summary.checked > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { label: "Total Checked", value: summary.checked, icon: "ri-links-line", color: "text-[#3d6f7f]", bg: "bg-[#3d6f7f]/5", filterKey: "all" as FilterType },
              { label: "Healthy", value: summary.ok, icon: "ri-checkbox-circle-line", color: "text-emerald-600", bg: "bg-emerald-50", filterKey: "ok" as FilterType },
              { label: "Broken", value: summary.broken, icon: "ri-error-warning-line", color: "text-red-600", bg: "bg-red-50", filterKey: "broken" as FilterType },
              { label: "Single Redirect", value: summary.redirect, icon: "ri-arrow-right-circle-line", color: "text-amber-600", bg: "bg-amber-50", filterKey: "redirect" as FilterType },
              { label: "Redirect Chain", value: summary.chain, icon: "ri-git-branch-line", color: "text-orange-600", bg: "bg-orange-50", filterKey: "redirect-chain" as FilterType },
            ].map((stat) => (
              <button
                key={stat.label}
                onClick={() => setFilter(stat.filterKey)}
                className={`bg-white rounded-2xl border p-4 flex items-center gap-3 text-left transition-all cursor-pointer ${
                  filter === stat.filterKey ? "border-[#3d6f7f] ring-1 ring-[#3d6f7f]/20" : "border-neutral-100 hover:border-neutral-200"
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

        {/* Issue banner */}
        {scanComplete && issueCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 flex-shrink-0">
              <i className="ri-alert-line text-amber-600 text-sm"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-800">
                {issueCount} issue{issueCount !== 1 ? "s" : ""} found
              </p>
              <p className="text-xs text-amber-600 mt-0.5">
                {summary?.broken ? `${summary.broken} broken` : ""}
                {summary?.broken && (summary?.redirect || summary?.chain) ? " · " : ""}
                {summary?.redirect ? `${summary.redirect} redirect${summary.redirect !== 1 ? "s" : ""}` : ""}
                {summary?.redirect && summary?.chain ? " · " : ""}
                {summary?.chain ? `${summary.chain} redirect chain${summary.chain !== 1 ? "s" : ""}` : ""}
                {" — use the Fix or Delete buttons below to resolve them."}
              </p>
            </div>
            <button
              onClick={() => setFilter("broken")}
              className="text-[11px] tracking-[0.12em] uppercase font-bold text-amber-700 border border-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              Show Issues
            </button>
          </div>
        )}

        {/* All clear banner */}
        {scanComplete && issueCount === 0 && summary && summary.checked > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 flex-shrink-0">
              <i className="ri-shield-check-line text-emerald-600 text-sm"></i>
            </div>
            <p className="text-sm font-semibold text-emerald-800">
              All {summary.checked} links are healthy — no broken links or redirect chains found!
            </p>
          </div>
        )}

        {/* Results list */}
        {results.length > 0 && (
          <>
            {/* Filter tabs */}
            <div className="bg-white rounded-2xl border border-neutral-100 p-1 mb-4 flex gap-1 flex-wrap">
              {(["all", "broken", "redirect", "redirect-chain", "ok"] as FilterType[]).map((f) => {
                const labels: Record<FilterType, string> = {
                  all: "All",
                  broken: "Broken",
                  redirect: "Redirects",
                  "redirect-chain": "Chains",
                  ok: "Healthy",
                };
                const counts: Record<FilterType, number> = {
                  all: results.length,
                  broken: summary?.broken ?? 0,
                  redirect: summary?.redirect ?? 0,
                  "redirect-chain": summary?.chain ?? 0,
                  ok: summary?.ok ?? 0,
                };
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${
                      filter === f
                        ? "bg-[#3d6f7f] text-white"
                        : "text-neutral-500 hover:bg-neutral-50"
                    }`}
                  >
                    {labels[f]}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      filter === f ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"
                    }`}>
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
            </div>

            {filteredResults.length === 0 ? (
              <div className="bg-white rounded-2xl border border-neutral-100 p-12 text-center">
                <i className="ri-checkbox-circle-line text-4xl text-emerald-200 mb-3 block"></i>
                <p className="text-sm text-neutral-500">No links in this category.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredResults.map((result) => {
                  const cfg = STATUS_CONFIG[result.status];
                  const isEditing = editingId === result.id;
                  const isExpanded = expandedId === result.id;
                  const hasDetail = result.redirectChain || result.errorMessage || result.finalUrl;

                  return (
                    <div
                      key={result.id}
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
                      {/* Main row */}
                      <div className="flex items-center gap-4 px-5 py-4">
                        {/* Status badge */}
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg flex-shrink-0 ${cfg.bg}`}>
                          <i className={`${cfg.icon} ${cfg.color} text-xs ${result.status === "checking" ? "animate-spin" : ""}`}></i>
                          <span className={`text-[10px] tracking-wide font-bold ${cfg.color} whitespace-nowrap`}>{cfg.label}</span>
                        </div>

                        {/* Link info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold text-neutral-800 truncate">{result.keyword}</span>
                            {!result.active && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-400 font-semibold">Inactive</span>
                            )}
                          </div>
                          {isEditing ? (
                            <div className="flex items-center gap-2 mt-1.5">
                              <input
                                type="text"
                                value={editHref}
                                onChange={(e) => setEditHref(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") handleSaveEdit(result.id);
                                  if (e.key === "Escape") setEditingId(null);
                                }}
                                autoFocus
                                className="flex-1 border border-[#3d6f7f] rounded-lg px-3 py-1.5 text-xs text-neutral-800 focus:outline-none min-w-0"
                                placeholder="/new-url-path"
                              />
                              <button
                                onClick={() => handleSaveEdit(result.id)}
                                disabled={savingId === result.id}
                                className="flex items-center gap-1 bg-[#3d6f7f] text-white text-[10px] tracking-wide font-bold px-3 py-1.5 rounded-lg hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                              >
                                {savingId === result.id ? (
                                  <i className="ri-loader-4-line animate-spin text-xs"></i>
                                ) : (
                                  <i className="ri-save-line text-xs"></i>
                                )}
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="flex items-center gap-1 border border-neutral-200 text-neutral-500 text-[10px] tracking-wide font-bold px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-xs text-neutral-500 font-mono truncate">{result.href}</span>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        {!isEditing && (
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {/* Expand detail button */}
                            {hasDetail && (
                              <button
                                onClick={() => setExpandedId(isExpanded ? null : result.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                                title="View details"
                              >
                                <i className={`ri-information-line text-sm ${isExpanded ? "text-[#3d6f7f]" : ""}`}></i>
                              </button>
                            )}

                            {/* Fix to final URL (for redirects) */}
                            {(result.status === "redirect" || result.status === "redirect-chain") && result.finalUrl && (
                              <button
                                onClick={() => handleFixToFinalUrl(result)}
                                disabled={savingId === result.id}
                                className="flex items-center gap-1.5 bg-amber-500 text-white text-[10px] tracking-wide font-bold px-3 py-1.5 rounded-lg hover:bg-amber-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50"
                                title={`Update to final destination: ${result.finalUrl}`}
                              >
                                {savingId === result.id ? (
                                  <i className="ri-loader-4-line animate-spin text-xs"></i>
                                ) : (
                                  <i className="ri-arrow-right-circle-line text-xs"></i>
                                )}
                                Fix URL
                              </button>
                            )}

                            {/* Edit URL */}
                            <button
                              onClick={() => {
                                setEditingId(result.id);
                                setEditHref(result.href);
                              }}
                              className="flex items-center gap-1.5 border border-neutral-200 text-neutral-600 text-[10px] tracking-wide font-bold px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap"
                              title="Edit URL"
                            >
                              <i className="ri-pencil-line text-xs"></i>
                              Edit
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => setDeletingId(result.id)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                              title="Delete this link mapping"
                            >
                              <i className="ri-delete-bin-line text-sm"></i>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Expanded detail panel */}
                      {isExpanded && hasDetail && (
                        <div className="border-t border-neutral-100 px-5 py-4 bg-neutral-50/50 rounded-b-2xl">
                          {result.redirectChain && result.redirectChain.length > 0 && (
                            <div className="mb-3">
                              <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 mb-2">
                                {result.status === "redirect-chain" ? "Redirect Chain" : "Redirect Path"}
                              </p>
                              <div className="flex items-center gap-2 flex-wrap">
                                {result.redirectChain.map((step, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    <span className={`text-xs font-mono px-2.5 py-1 rounded-lg ${
                                      i === 0
                                        ? "bg-neutral-200 text-neutral-700"
                                        : i === result.redirectChain!.length - 1
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-amber-100 text-amber-700"
                                    }`}>
                                      {step}
                                    </span>
                                    {i < result.redirectChain!.length - 1 && (
                                      <i className="ri-arrow-right-line text-neutral-400 text-xs flex-shrink-0"></i>
                                    )}
                                  </div>
                                ))}
                              </div>
                              {result.status === "redirect" && (
                                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1.5">
                                  <i className="ri-information-line text-xs"></i>
                                  This URL has a router-level redirect. Click &quot;Fix URL&quot; to point directly to the final destination.
                                </p>
                              )}
                            </div>
                          )}
                          {result.errorMessage && (
                            <div>
                              <p className="text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 mb-1">Details</p>
                              <p className="text-xs text-red-600 font-mono bg-red-50 px-3 py-2 rounded-lg">{result.errorMessage}</p>
                            </div>
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

        {/* Empty state before scan */}
        {results.length === 0 && !scanning && (
          <div className="bg-white rounded-2xl border border-neutral-100 p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#3d6f7f]/5 flex items-center justify-center mx-auto mb-4">
              <i className="ri-radar-line text-[#3d6f7f] text-2xl"></i>
            </div>
            <h3 className="text-base font-semibold text-neutral-800 mb-2">Ready to scan</h3>
            <p className="text-sm text-neutral-400 max-w-sm mx-auto">
              {linksLoading
                ? "Loading your link mappings..."
                : links.length === 0
                ? "No link mappings found. Add some internal links first."
                : `Hit "Start Scan" to check all ${links.length} link mappings against your live pages and published blog posts.`}
            </p>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <i className="ri-delete-bin-line text-red-500 text-lg"></i>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Delete Link Mapping?</h3>
                <p className="text-xs text-neutral-400">
                  &quot;{results.find((r) => r.id === deletingId)?.keyword}&quot; will be permanently removed.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 border border-neutral-200 text-neutral-600 text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 ${
          toast.type === "success" ? "bg-[#3d6f7f] text-white" : "bg-red-500 text-white"
        }`}>
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
      </div>
      )} {/* end mappings tab */}
    </div>
  );
}
