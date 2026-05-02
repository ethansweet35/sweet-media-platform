"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { supabase } from "@/lib/supabase";
import Seo from "@/components/feature/Seo";
import AutoReplaceModal from "@/components/pages/admin/content-links/components/AutoReplaceModal";
import BulkAutoReplaceModal from "@/components/pages/admin/content-links/components/BulkAutoReplaceModal";
import {
  type FoundLink, type FilterType, type ActionModal, type ContentBlock, type BulkAutoResult,
  STATUS_CONFIG, STATIC_ROUTES, REDIRECT_MAP,
} from "@/types/content-links";
import { extractLinksFromBlock, isExternalUrl, buildLinkRegex, applyToBlock, fetchPostContent, savePostContent } from "@/lib/content-links-utils";

export default function ContentLinksPage() {
  const [links, setLinks] = useState<FoundLink[]>([]);
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [actionModal, setActionModal] = useState<ActionModal>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [replaceUrl, setReplaceUrl] = useState("");
  const replaceInputRef = useRef<HTMLInputElement>(null);

  // Bulk selection
  const [selectedUids, setSelectedUids] = useState<Set<string>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Extract links ─────────────────────────────────────────────────────────────
  const extractAllLinks = useCallback(async (): Promise<FoundLink[]> => {
    setProgressLabel("Loading blog posts...");
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("slug, title, content")
      .eq("status", "published");

    if (error || !posts) throw new Error(error?.message || "Failed to load posts");

    const found: FoundLink[] = [];
    for (const post of posts) {
      let blocks: ContentBlock[] = [];
      try {
        blocks = typeof post.content === "string" ? JSON.parse(post.content) : post.content;
      } catch { continue; }
      if (!Array.isArray(blocks)) continue;

      blocks.forEach((block, blockIndex) => {
        extractLinksFromBlock(block).forEach(({ anchorText, url }) => {
          found.push({
            uid: `${post.slug}::${blockIndex}::${url}`,
            postSlug: post.slug,
            postTitle: post.title,
            anchorText,
            url,
            isExternal: isExternalUrl(url),
            blockIndex,
            blockType: block.type,
            status: "pending",
            checked: false,
          });
        });
      });
    }
    return found;
  }, []);

  // ── Internal check ────────────────────────────────────────────────────────────
  function checkInternal(url: string, blogSlugs: Set<string>): { status: FoundLink["status"]; finalUrl?: string; errorMessage?: string } {
    const clean = url.replace(/\/$/, "") || "/";
    if (REDIRECT_MAP[clean]) {
      const target = REDIRECT_MAP[clean];
      return STATIC_ROUTES.has(target)
        ? { status: "redirect", finalUrl: target }
        : { status: "broken", errorMessage: `Redirects to ${target} which has no matching page` };
    }
    if (STATIC_ROUTES.has(clean)) return { status: "ok" };
    const blogMatch = clean.match(/^\/blog\/(.+)$/);
    if (blogMatch) {
      return blogSlugs.has(blogMatch[1])
        ? { status: "ok" }
        : { status: "broken", errorMessage: `Blog post "${blogMatch[1]}" not found or not published` };
    }
    return { status: "broken", errorMessage: `No page exists at "${clean}"` };
  }

  // ── External check ────────────────────────────────────────────────────────────
  async function checkExternalBatch(urls: string[]): Promise<Map<string, { status: FoundLink["status"]; statusCode?: number; finalUrl?: string; errorMessage?: string }>> {
    const map = new Map<string, { status: FoundLink["status"]; statusCode?: number; finalUrl?: string; errorMessage?: string }>();
    try {
      const { data, error } = await supabase.functions.invoke("check-url-health", { body: { urls } });
      if (error) throw error;
      for (const r of (data?.results || [])) {
        map.set(r.url, { status: r.status, statusCode: r.statusCode, finalUrl: r.finalUrl, errorMessage: r.errorMessage });
      }
    } catch {
      for (const url of urls) map.set(url, { status: "error", errorMessage: "Could not reach check service" });
    }
    return map;
  }

  // ── Main scan ─────────────────────────────────────────────────────────────────
  const startScan = useCallback(async () => {
    setScanning(true);
    setScanComplete(false);
    setProgress(0);
    setFilter("all");
    setLinks([]);
    setSelectedUids(new Set());

    try {
      const allLinks = await extractAllLinks();
      setLinks(allLinks.map((l) => ({ ...l, status: "pending" })));
      if (allLinks.length === 0) { setScanning(false); setScanComplete(true); return; }

      setProgressLabel("Loading published blog slugs...");
      const { data: slugData } = await supabase.from("blog_posts").select("slug").eq("status", "published");
      const blogSlugs = new Set((slugData || []).map((r: { slug: string }) => r.slug));

      const internalLinks = allLinks.filter((l) => !l.isExternal);
      const externalLinks = allLinks.filter((l) => l.isExternal);
      const uniqueExternalUrls = [...new Set(externalLinks.map((l) => l.url))];
      const updated = [...allLinks];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const externalResultsMap = new Map<string, any>();

      setProgressLabel("Checking internal links...");
      for (const link of internalLinks) {
        const idx = updated.findIndex((l) => l.uid === link.uid);
        if (idx !== -1) updated[idx] = { ...updated[idx], status: "checking" };
      }
      setLinks([...updated]);

      for (const link of internalLinks) {
        const result = checkInternal(link.url, blogSlugs);
        const idx = updated.findIndex((l) => l.uid === link.uid);
        if (idx !== -1) updated[idx] = { ...updated[idx], ...result, checked: true };
      }
      setLinks([...updated]);
      setProgress(Math.round((internalLinks.length / allLinks.length) * 40));

      const BATCH_SIZE = 10;
      for (let i = 0; i < uniqueExternalUrls.length; i += BATCH_SIZE) {
        const batch = uniqueExternalUrls.slice(i, i + BATCH_SIZE);
        setProgressLabel(`Checking external links... (${Math.min(i + BATCH_SIZE, uniqueExternalUrls.length)}/${uniqueExternalUrls.length})`);

        for (const link of externalLinks.filter((l) => batch.includes(l.url))) {
          const idx = updated.findIndex((l) => l.uid === link.uid);
          if (idx !== -1) updated[idx] = { ...updated[idx], status: "checking" };
        }
        setLinks([...updated]);

        const batchResults = await checkExternalBatch(batch);
        batchResults.forEach((v, k) => externalResultsMap.set(k, v));

        for (const link of externalLinks.filter((l) => batch.includes(l.url))) {
          const result = externalResultsMap.get(link.url);
          const idx = updated.findIndex((l) => l.uid === link.uid);
          if (idx !== -1 && result) updated[idx] = { ...updated[idx], ...result, checked: true };
        }
        setLinks([...updated]);

        const externalDone = Math.min(i + BATCH_SIZE, uniqueExternalUrls.length);
        setProgress(40 + Math.round((externalDone / Math.max(uniqueExternalUrls.length, 1)) * 60));
      }

      for (const link of externalLinks) {
        const idx = updated.findIndex((l) => l.uid === link.uid);
        if (idx !== -1 && !updated[idx].checked) {
          const result = externalResultsMap.get(link.url);
          if (result) updated[idx] = { ...updated[idx], ...result, checked: true };
        }
      }
      setLinks([...updated]);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Scan failed", "error");
    }

    setProgress(100);
    setProgressLabel("Scan complete");
    setScanning(false);
    setScanComplete(true);
  }, [extractAllLinks]);

  // ── Action: Remove ────────────────────────────────────────────────────────────
  const handleRemove = useCallback(async (link: FoundLink) => {
    setActionLoading(true);
    try {
      const blocks = await fetchPostContent(link.postSlug);
      const regex = buildLinkRegex(link.url);
      const updated = blocks.map((block, idx) =>
        applyToBlock(block, idx, link.blockIndex, (text) => text.replace(regex, "$1"))
      );
      await savePostContent(link.postSlug, updated);
      setLinks((prev) => prev.filter((l) => l.uid !== link.uid));
      setSelectedUids((prev) => { const n = new Set(prev); n.delete(link.uid); return n; });
      showToast(`Link removed from "${link.postTitle}"`);
      setActionModal(null);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to remove link", "error");
    }
    setActionLoading(false);
  }, []);

  // ── Action: Replace ───────────────────────────────────────────────────────────
  const handleReplace = useCallback(async (link: FoundLink, newUrl: string) => {
    if (!newUrl.trim()) return;
    setActionLoading(true);
    try {
      const blocks = await fetchPostContent(link.postSlug);
      const regex = buildLinkRegex(link.url);
      const updated = blocks.map((block, idx) =>
        applyToBlock(block, idx, link.blockIndex, (text) =>
          text.replace(regex, `[$1](${newUrl.trim()})`)
        )
      );
      await savePostContent(link.postSlug, updated);
      setLinks((prev) =>
        prev.map((l) =>
          l.uid === link.uid
            ? { ...l, url: newUrl.trim(), status: "ok", checked: true, finalUrl: undefined, errorMessage: undefined }
            : l
        )
      );
      setSelectedUids((prev) => { const n = new Set(prev); n.delete(link.uid); return n; });
      showToast(`Link updated in "${link.postTitle}"`);
      setActionModal(null);
      setReplaceUrl("");
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to replace link", "error");
    }
    setActionLoading(false);
  }, []);

  // ── Action: Use Final URL ─────────────────────────────────────────────────────
  const handleUseFinalUrl = useCallback(async (link: FoundLink) => {
    if (!link.finalUrl) return;
    setActionLoading(true);
    try {
      const blocks = await fetchPostContent(link.postSlug);
      const regex = buildLinkRegex(link.url);
      const updated = blocks.map((block, idx) =>
        applyToBlock(block, idx, link.blockIndex, (text) =>
          text.replace(regex, `[$1](${link.finalUrl})`)
        )
      );
      await savePostContent(link.postSlug, updated);
      setLinks((prev) =>
        prev.map((l) =>
          l.uid === link.uid
            ? { ...l, url: link.finalUrl!, status: "ok", checked: true, finalUrl: undefined, errorMessage: undefined }
            : l
        )
      );
      setSelectedUids((prev) => { const n = new Set(prev); n.delete(link.uid); return n; });
      showToast(`Redirect resolved — link now points directly to ${link.finalUrl}`);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to update link", "error");
    }
    setActionLoading(false);
  }, []);

  // ── Bulk: Remove ──────────────────────────────────────────────────────────────
  const handleBulkRemove = useCallback(async () => {
    const toRemove = links.filter((l) => selectedUids.has(l.uid));
    if (toRemove.length === 0) return;
    setBulkLoading(true);
    setActionModal(null);

    const bySlug = new Map<string, FoundLink[]>();
    for (const link of toRemove) {
      if (!bySlug.has(link.postSlug)) bySlug.set(link.postSlug, []);
      bySlug.get(link.postSlug)!.push(link);
    }

    let successCount = 0;
    let errorCount = 0;

    for (const [slug, slugLinks] of bySlug) {
      try {
        let blocks = await fetchPostContent(slug);
        for (const link of slugLinks) {
          const regex = buildLinkRegex(link.url);
          blocks = blocks.map((block, idx) =>
            applyToBlock(block, idx, link.blockIndex, (text) => text.replace(regex, "$1"))
          );
        }
        await savePostContent(slug, blocks);
        successCount += slugLinks.length;
      } catch {
        errorCount += slugLinks.length;
      }
    }

    const removedUids = new Set(toRemove.map((l) => l.uid));
    setLinks((prev) => prev.filter((l) => !removedUids.has(l.uid)));
    setSelectedUids(new Set());
    setBulkLoading(false);

    if (errorCount === 0) showToast(`${successCount} link${successCount !== 1 ? "s" : ""} removed successfully`);
    else showToast(`${successCount} removed, ${errorCount} failed`, "error");
  }, [links, selectedUids]);

  // ── Bulk: Use Final URL ───────────────────────────────────────────────────────
  const handleBulkFinalUrl = useCallback(async () => {
    const toReplace = links.filter((l) => selectedUids.has(l.uid) && l.status === "redirect" && l.finalUrl);
    if (toReplace.length === 0) return;
    setBulkLoading(true);

    const bySlug = new Map<string, FoundLink[]>();
    for (const link of toReplace) {
      if (!bySlug.has(link.postSlug)) bySlug.set(link.postSlug, []);
      bySlug.get(link.postSlug)!.push(link);
    }

    let successCount = 0;
    let errorCount = 0;

    for (const [slug, slugLinks] of bySlug) {
      try {
        let blocks = await fetchPostContent(slug);
        for (const link of slugLinks) {
          const regex = buildLinkRegex(link.url);
          blocks = blocks.map((block, idx) =>
            applyToBlock(block, idx, link.blockIndex, (text) =>
              text.replace(regex, `[$1](${link.finalUrl})`)
            )
          );
        }
        await savePostContent(slug, blocks);
        successCount += slugLinks.length;
      } catch {
        errorCount += slugLinks.length;
      }
    }

    const replacedUids = new Set(toReplace.map((l) => l.uid));
    setLinks((prev) =>
      prev.map((l) =>
        replacedUids.has(l.uid)
          ? { ...l, url: l.finalUrl!, status: "ok", checked: true, finalUrl: undefined, errorMessage: undefined }
          : l
      )
    );
    setSelectedUids((prev) => {
      const n = new Set(prev);
      replacedUids.forEach((uid) => n.delete(uid));
      return n;
    });
    setBulkLoading(false);

    if (errorCount === 0) showToast(`${successCount} redirect${successCount !== 1 ? "s" : ""} resolved to final URL`);
    else showToast(`${successCount} resolved, ${errorCount} failed`, "error");
  }, [links, selectedUids]);

  // ── Bulk: Auto Replace complete ───────────────────────────────────────────────
  const handleBulkAutoComplete = useCallback(async (results: BulkAutoResult[]) => {
    setBulkLoading(true);
    setActionModal(null);

    const toApply = results.filter((r): r is { uid: string; newUrl: string } => !("skipped" in r));
    const bySlug = new Map<string, Array<{ link: FoundLink; newUrl: string }>>();

    for (const r of toApply) {
      const link = links.find((l) => l.uid === r.uid);
      if (!link) continue;
      if (!bySlug.has(link.postSlug)) bySlug.set(link.postSlug, []);
      bySlug.get(link.postSlug)!.push({ link, newUrl: r.newUrl });
    }

    let successCount = 0;
    let errorCount = 0;

    for (const [slug, items] of bySlug) {
      try {
        let blocks = await fetchPostContent(slug);
        for (const { link, newUrl } of items) {
          const regex = buildLinkRegex(link.url);
          blocks = blocks.map((block, idx) =>
            applyToBlock(block, idx, link.blockIndex, (text) =>
              text.replace(regex, `[$1](${newUrl})`)
            )
          );
        }
        await savePostContent(slug, blocks);
        successCount += items.length;
      } catch {
        errorCount += items.length;
      }
    }

    const appliedUids = new Set(toApply.map((r) => r.uid));
    setLinks((prev) =>
      prev.map((l) => {
        const r = toApply.find((x) => x.uid === l.uid);
        if (!r) return l;
        return { ...l, url: r.newUrl, status: "ok", checked: true, finalUrl: undefined, errorMessage: undefined };
      })
    );
    setSelectedUids((prev) => {
      const n = new Set(prev);
      appliedUids.forEach((uid) => n.delete(uid));
      return n;
    });
    setBulkLoading(false);

    const skipped = results.filter((r) => "skipped" in r).length;
    if (errorCount === 0) showToast(`${successCount} link${successCount !== 1 ? "s" : ""} auto-replaced${skipped > 0 ? ` · ${skipped} skipped` : ""}`);
    else showToast(`${successCount} replaced, ${errorCount} failed, ${skipped} skipped`, "error");
  }, [links]);

  // ── Selection helpers ─────────────────────────────────────────────────────────
  const issueLinks = useMemo(() => links.filter((l) => l.status === "broken" || l.status === "error" || l.status === "redirect"), [links]);
  const brokenOnlyLinks = useMemo(() => links.filter((l) => l.status === "broken" || l.status === "error"), [links]);
  const redirectLinks = useMemo(() => links.filter((l) => l.status === "redirect" && l.finalUrl), [links]);

  const toggleSelect = (uid: string) => {
    setSelectedUids((prev) => {
      const n = new Set(prev);
      if (n.has(uid)) n.delete(uid); else n.add(uid);
      return n;
    });
  };

  const selectAllIssues = () => setSelectedUids(new Set(issueLinks.map((l) => l.uid)));
  const selectAllBroken = () => setSelectedUids(new Set(brokenOnlyLinks.map((l) => l.uid)));
  const selectAllRedirects = () => setSelectedUids(new Set(redirectLinks.map((l) => l.uid)));
  const clearSelection = () => setSelectedUids(new Set());

  const selectedLinks = useMemo(() => links.filter((l) => selectedUids.has(l.uid)), [links, selectedUids]);
  const selectedRedirects = useMemo(() => selectedLinks.filter((l) => l.status === "redirect" && l.finalUrl), [selectedLinks]);
  const selectedIssues = useMemo(() => selectedLinks.filter((l) => l.status === "broken" || l.status === "error" || l.status === "redirect"), [selectedLinks]);

  // ── Derived data ──────────────────────────────────────────────────────────────
  const summary = useMemo(() => {
    const checked = links.filter((l) => l.checked);
    return {
      total: links.length,
      checked: checked.length,
      ok: checked.filter((l) => l.status === "ok").length,
      broken: checked.filter((l) => l.status === "broken" || l.status === "error").length,
      redirect: checked.filter((l) => l.status === "redirect").length,
      external: links.filter((l) => l.isExternal).length,
    };
  }, [links]);

  const filteredLinks = useMemo(() => {
    if (filter === "broken") return links.filter((l) => l.status === "broken" || l.status === "error");
    if (filter === "redirect") return links.filter((l) => l.status === "redirect");
    if (filter === "ok") return links.filter((l) => l.status === "ok");
    return links;
  }, [links, filter]);

  const groupedByPost = useMemo(() => {
    const groups = new Map<string, { slug: string; title: string; links: FoundLink[] }>();
    for (const link of filteredLinks) {
      if (!groups.has(link.postSlug)) {
        groups.set(link.postSlug, { slug: link.postSlug, title: link.postTitle, links: [] });
      }
      groups.get(link.postSlug)!.links.push(link);
    }
    return [...groups.values()].sort((a, b) => {
      const aBroken = a.links.filter((l) => l.status === "broken" || l.status === "error").length;
      const bBroken = b.links.filter((l) => l.status === "broken" || l.status === "error").length;
      return bBroken - aBroken;
    });
  }, [filteredLinks]);

  const issueCount = summary.broken + summary.redirect;

  const openReplace = (link: FoundLink) => {
    setReplaceUrl(link.finalUrl || link.url);
    setActionModal({ type: "replace", link });
    setTimeout(() => replaceInputRef.current?.select(), 80);
  };

  return (
    <div className="">
      <Seo title="Content Link Health | Admin" description="Scan blog post content for broken or redirecting links" noindex />

      <AdminPageHeader
        title="Content links"
        subtitle="Scan published posts for brittle URLs — pair with Mapping Link Health for keyword redirect tables."
      />

      <div className="">

        {/* Intro card */}
        <div className="bg-white rounded-2xl border border-neutral-100 p-8 mb-6">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#3d6f7f]/5 flex items-center justify-center flex-shrink-0">
                <i className="ri-file-search-line text-[#3d6f7f] text-xl"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold text-neutral-900 mb-1">Blog Content Link Scanner</h2>
                <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
                  Scans every link inside your published blog posts. Finds 404s, broken URLs, and redirects.
                  Fix issues one-by-one or use <strong className="text-neutral-700">bulk actions</strong> to resolve multiple links at once.
                </p>
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <i className="ri-checkbox-multiple-line text-neutral-300"></i>
                    Select multiple links for bulk actions
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <i className="ri-magic-line text-neutral-300"></i>
                    Auto Replace searches your blog + the web
                  </span>
                </div>
              </div>
            </div>
            <button onClick={startScan} disabled={scanning}
              className="flex items-center gap-2 bg-[#3d6f7f] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-6 py-3 rounded-xl hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
              {scanning ? <><i className="ri-loader-4-line animate-spin text-sm"></i>Scanning...</> : <><i className="ri-radar-line text-sm"></i>{scanComplete ? "Re-Scan All Posts" : "Start Scan"}</>}
            </button>
          </div>

          {(scanning || scanComplete) && links.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                <span>{scanning ? progressLabel : "Scan complete"}</span>
                <span>{summary.checked} / {summary.total} links checked</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#3d6f7f] rounded-full transition-all duration-500" style={{ width: `${scanning ? progress : 100}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Summary stats */}
        {scanComplete && summary.checked > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              { label: "Total Links",    value: summary.total,    icon: "ri-links-line",              color: "text-[#3d6f7f]",    bg: "bg-[#3d6f7f]/5",  f: "all"      as FilterType },
              { label: "Healthy",        value: summary.ok,       icon: "ri-checkbox-circle-line",    color: "text-emerald-600", bg: "bg-emerald-50",   f: "ok"       as FilterType },
              { label: "Broken / Error", value: summary.broken,   icon: "ri-error-warning-line",      color: "text-red-600",     bg: "bg-red-50",       f: "broken"   as FilterType },
              { label: "Redirects",      value: summary.redirect, icon: "ri-arrow-right-circle-line", color: "text-amber-600",   bg: "bg-amber-50",     f: "redirect" as FilterType },
              { label: "External Links", value: summary.external, icon: "ri-global-line",             color: "text-neutral-500", bg: "bg-neutral-100",  f: "all"      as FilterType },
            ].map((s) => (
              <button key={s.label} onClick={() => setFilter(s.f)}
                className={`bg-white rounded-2xl border p-4 flex items-center gap-3 text-left transition-all cursor-pointer ${filter === s.f && s.f !== "all" ? "border-[#3d6f7f] ring-1 ring-[#3d6f7f]/20" : "border-neutral-100 hover:border-neutral-200"}`}>
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

        {/* Issue banner */}
        {scanComplete && issueCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-3 flex-wrap">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-100 flex-shrink-0">
              <i className="ri-alert-line text-red-600 text-sm"></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-red-800">
                {issueCount} issue{issueCount !== 1 ? "s" : ""} found across your blog posts
              </p>
              <p className="text-xs text-red-600 mt-0.5">
                {summary.broken > 0 ? `${summary.broken} broken/error` : ""}
                {summary.broken > 0 && summary.redirect > 0 ? " · " : ""}
                {summary.redirect > 0 ? `${summary.redirect} redirect${summary.redirect !== 1 ? "s" : ""}` : ""}
                {" — use bulk actions to fix multiple at once, or handle each link individually."}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {summary.broken > 0 && (
                <button onClick={selectAllBroken}
                  className="text-[11px] tracking-[0.12em] uppercase font-bold text-red-700 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap">
                  Select Broken ({summary.broken})
                </button>
              )}
              {summary.redirect > 0 && (
                <button onClick={selectAllRedirects}
                  className="text-[11px] tracking-[0.12em] uppercase font-bold text-amber-700 border border-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap">
                  Select Redirects ({summary.redirect})
                </button>
              )}
              <button onClick={selectAllIssues}
                className="text-[11px] tracking-[0.12em] uppercase font-bold text-neutral-600 border border-neutral-300 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer whitespace-nowrap">
                Select All Issues
              </button>
            </div>
          </div>
        )}

        {scanComplete && issueCount === 0 && summary.checked > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-100 flex-shrink-0">
              <i className="ri-shield-check-line text-emerald-600 text-sm"></i>
            </div>
            <p className="text-sm font-semibold text-emerald-800">All {summary.checked} links across your blog posts are healthy!</p>
          </div>
        )}

        {/* ── Bulk Action Toolbar ─────────────────────────────────────────────── */}
        {selectedUids.size > 0 && (
          <div className="sticky top-[73px] z-20 mb-4">
            <div className="bg-[#3d6f7f] rounded-2xl px-5 py-3.5 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <i className="ri-checkbox-multiple-line text-white text-sm"></i>
                </div>
                <div>
                  <span className="text-sm font-bold text-white whitespace-nowrap">{selectedUids.size} selected</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    {selectedLinks.filter((l) => l.status === "broken" || l.status === "error").length > 0 && (
                      <span className="text-[10px] font-semibold text-red-300 whitespace-nowrap">
                        {selectedLinks.filter((l) => l.status === "broken" || l.status === "error").length} broken
                      </span>
                    )}
                    {selectedRedirects.length > 0 && (
                      <span className="text-[10px] font-semibold text-amber-300 whitespace-nowrap">
                        {selectedRedirects.length} redirect{selectedRedirects.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 h-px bg-white/10 hidden sm:block"></div>

              <div className="flex items-center gap-2 flex-wrap">
                {selectedIssues.length > 0 && (
                  <button onClick={() => setActionModal({ type: "bulk-auto" })} disabled={bulkLoading}
                    className="flex items-center gap-1.5 bg-white text-[#3d6f7f] text-[10px] tracking-[0.12em] uppercase font-bold px-3 py-2 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50">
                    <i className="ri-magic-line text-xs"></i>
                    Auto Replace ({selectedIssues.length})
                  </button>
                )}
                {selectedRedirects.length > 0 && (
                  <button onClick={handleBulkFinalUrl} disabled={bulkLoading}
                    className="flex items-center gap-1.5 bg-amber-400 text-amber-900 text-[10px] tracking-[0.12em] uppercase font-bold px-3 py-2 rounded-xl hover:bg-amber-300 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50">
                    {bulkLoading ? <i className="ri-loader-4-line animate-spin text-xs"></i> : <i className="ri-arrow-right-up-line text-xs"></i>}
                    Use Final URL ({selectedRedirects.length})
                  </button>
                )}
                <button onClick={() => setActionModal({ type: "bulk-remove" })} disabled={bulkLoading}
                  className="flex items-center gap-1.5 bg-red-500 text-white text-[10px] tracking-[0.12em] uppercase font-bold px-3 py-2 rounded-xl hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50">
                  <i className="ri-delete-bin-line text-xs"></i>
                  Remove ({selectedUids.size})
                </button>
                <button onClick={clearSelection}
                  className="flex items-center gap-1 text-white/60 hover:text-white text-[10px] font-bold px-2 py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-close-line text-xs"></i>Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filter tabs + quick-select */}
        {groupedByPost.length > 0 && (
          <>
            <div className="bg-white rounded-2xl border border-neutral-100 p-1 mb-4 flex gap-1 flex-wrap items-center">
              {(["all", "broken", "redirect", "ok"] as FilterType[]).map((f) => {
                const labels: Record<FilterType, string> = { all: "All Links", broken: "Broken", redirect: "Redirects", ok: "Healthy" };
                const counts: Record<FilterType, number> = { all: summary.total, broken: summary.broken, redirect: summary.redirect, ok: summary.ok };
                return (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`flex items-center gap-1.5 text-[11px] tracking-[0.1em] uppercase font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${filter === f ? "bg-[#3d6f7f] text-white" : "text-neutral-500 hover:bg-neutral-50"}`}>
                    {labels[f]}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${filter === f ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"}`}>
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
              {scanComplete && issueCount > 0 && (
                <div className="ml-auto flex items-center gap-1 pr-1">
                  {summary.broken > 0 && (
                    <button onClick={selectAllBroken}
                      className="text-[10px] tracking-[0.1em] uppercase font-bold text-neutral-400 hover:text-red-600 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-error-warning-line mr-1"></i>Broken ({summary.broken})
                    </button>
                  )}
                  {summary.redirect > 0 && (
                    <button onClick={selectAllRedirects}
                      className="text-[10px] tracking-[0.1em] uppercase font-bold text-neutral-400 hover:text-amber-600 px-3 py-2 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer whitespace-nowrap">
                      <i className="ri-arrow-right-circle-line mr-1"></i>Redirects ({summary.redirect})
                    </button>
                  )}
                  <button onClick={selectAllIssues}
                    className="text-[10px] tracking-[0.1em] uppercase font-bold text-neutral-400 hover:text-[#3d6f7f] px-3 py-2 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-checkbox-multiple-line mr-1"></i>All Issues
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {groupedByPost.map((group) => {
                const brokenCount = group.links.filter((l) => l.status === "broken" || l.status === "error").length;
                const redirectCount = group.links.filter((l) => l.status === "redirect").length;
                const isExpanded = expandedPost === group.slug;
                const groupIssueLinks = group.links.filter((l) => l.status === "broken" || l.status === "error" || l.status === "redirect");
                const allGroupSelected = groupIssueLinks.length > 0 && groupIssueLinks.every((l) => selectedUids.has(l.uid));
                const someGroupSelected = groupIssueLinks.some((l) => selectedUids.has(l.uid));

                const toggleGroupSelect = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  setSelectedUids((prev) => {
                    const n = new Set(prev);
                    if (allGroupSelected) groupIssueLinks.forEach((l) => n.delete(l.uid));
                    else groupIssueLinks.forEach((l) => n.add(l.uid));
                    return n;
                  });
                };

                return (
                  <div key={group.slug} className={`bg-white rounded-2xl border overflow-hidden ${brokenCount > 0 ? "border-red-200" : redirectCount > 0 ? "border-amber-200" : "border-neutral-100"}`}>
                    <button onClick={() => setExpandedPost(isExpanded ? null : group.slug)}
                      className="w-full flex items-center gap-3 px-5 py-4 hover:bg-neutral-50/50 transition-colors text-left cursor-pointer">
                      {groupIssueLinks.length > 0 && (
                        <div onClick={toggleGroupSelect}
                          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                            allGroupSelected ? "border-[#3d6f7f] bg-[#3d6f7f]" :
                            someGroupSelected ? "border-[#3d6f7f] bg-[#3d6f7f]/20" :
                            "border-neutral-300 hover:border-[#3d6f7f]"
                          }`}>
                          {allGroupSelected && <i className="ri-check-line text-white text-[9px]"></i>}
                          {someGroupSelected && !allGroupSelected && <div className="w-2 h-0.5 bg-[#3d6f7f] rounded-full"></div>}
                        </div>
                      )}
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-100 flex-shrink-0">
                        <i className={`ri-arrow-right-s-line text-neutral-500 transition-transform ${isExpanded ? "rotate-90" : ""}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-800 truncate">{group.title}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <a href={`/blog/${group.slug}`} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[10px] text-[#3d6f7f] hover:underline font-mono cursor-pointer">
                            /blog/{group.slug}
                          </a>
                          <span className="text-[10px] text-neutral-400">{group.links.length} link{group.links.length !== 1 ? "s" : ""}</span>
                          {brokenCount > 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600">{brokenCount} broken</span>}
                          {redirectCount > 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">{redirectCount} redirect</span>}
                        </div>
                      </div>
                      <a href={`/admin/blog-edit/${group.slug}`} onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 border border-neutral-200 text-neutral-500 text-[10px] tracking-wide font-bold px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap flex-shrink-0">
                        <i className="ri-pencil-line text-xs"></i>Edit Post
                      </a>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-neutral-100 overflow-x-auto">
                        <table className="w-full min-w-[860px]">
                          <thead>
                            <tr className="bg-neutral-50/50 border-b border-neutral-100">
                              <th className="px-4 py-2.5 w-10"></th>
                              <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-4 py-2.5 w-28">Status</th>
                              <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-4 py-2.5">Anchor Text</th>
                              <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-4 py-2.5">URL</th>
                              <th className="text-left text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-4 py-2.5 w-20">Type</th>
                              <th className="text-right text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-400 px-4 py-2.5 w-72">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.links.map((link) => {
                              const cfg = STATUS_CONFIG[link.status];
                              const isIssue = link.status === "broken" || link.status === "error" || link.status === "redirect";
                              const isSelected = selectedUids.has(link.uid);

                              return (
                                <tr key={link.uid} className={`border-b border-neutral-50 transition-colors ${isSelected ? "bg-[#3d6f7f]/[0.03]" : "hover:bg-neutral-50/30"}`}>
                                  <td className="px-4 py-3 w-10">
                                    {isIssue && (
                                      <div onClick={() => toggleSelect(link.uid)}
                                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center cursor-pointer transition-all ${isSelected ? "border-[#3d6f7f] bg-[#3d6f7f]" : "border-neutral-300 hover:border-[#3d6f7f]"}`}>
                                        {isSelected && <i className="ri-check-line text-white text-[9px]"></i>}
                                      </div>
                                    )}
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg ${cfg.bg}`}>
                                      <i className={`${cfg.icon} ${cfg.color} text-xs ${link.status === "checking" ? "animate-spin" : ""}`}></i>
                                      <span className={`text-[10px] font-bold ${cfg.color} whitespace-nowrap`}>{cfg.label}</span>
                                      {link.statusCode && <span className={`text-[9px] font-mono font-bold ${cfg.color} opacity-70`}>{link.statusCode}</span>}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className="text-xs font-medium text-neutral-700">{link.anchorText}</span>
                                  </td>
                                  <td className="px-4 py-3 max-w-[220px]">
                                    <a href={link.isExternal ? link.url : undefined} target={link.isExternal ? "_blank" : undefined} rel="noopener noreferrer"
                                      className="text-xs font-mono text-neutral-500 hover:text-[#3d6f7f] truncate block transition-colors cursor-pointer" title={link.url}>
                                      {link.url.length > 40 ? link.url.slice(0, 40) + "…" : link.url}
                                    </a>
                                    {link.errorMessage && <p className="text-[10px] text-red-500 mt-0.5 leading-tight">{link.errorMessage}</p>}
                                    {link.finalUrl && link.status === "redirect" && (
                                      <p className="text-[10px] text-amber-600 mt-0.5 leading-tight flex items-center gap-1">
                                        <i className="ri-arrow-right-line text-[9px]"></i>
                                        {link.finalUrl.length > 38 ? link.finalUrl.slice(0, 38) + "…" : link.finalUrl}
                                      </p>
                                    )}
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${link.isExternal ? "bg-neutral-100 text-neutral-500" : "bg-[#3d6f7f]/5 text-[#3d6f7f]"}`}>
                                      {link.isExternal ? "External" : "Internal"}
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">
                                    {isIssue && (
                                      <div className="flex items-center gap-1.5 justify-end flex-wrap">
                                        <button onClick={() => setActionModal({ type: "auto", link })}
                                          className="flex items-center gap-1 bg-[#3d6f7f] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap">
                                          <i className="ri-magic-line text-xs"></i>Auto Replace
                                        </button>
                                        {link.status === "redirect" && link.finalUrl && (
                                          <button onClick={() => handleUseFinalUrl(link)} title={`Replace with: ${link.finalUrl}`}
                                            className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-amber-100 transition-colors cursor-pointer whitespace-nowrap">
                                            <i className="ri-arrow-right-up-line text-xs"></i>Final URL
                                          </button>
                                        )}
                                        <button onClick={() => openReplace(link)}
                                          className="flex items-center gap-1 bg-neutral-100 text-neutral-600 border border-neutral-200 text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer whitespace-nowrap">
                                          <i className="ri-edit-line text-xs"></i>Replace
                                        </button>
                                        <button onClick={() => setActionModal({ type: "remove", link })}
                                          className="flex items-center gap-1 bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap">
                                          <i className="ri-delete-bin-line text-xs"></i>Remove
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Empty state */}
        {!scanning && links.length === 0 && (
          <div className="bg-white rounded-2xl border border-neutral-100 p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#3d6f7f]/5 flex items-center justify-center mx-auto mb-4">
              <i className="ri-file-search-line text-[#3d6f7f] text-2xl"></i>
            </div>
            <h3 className="text-base font-semibold text-neutral-800 mb-2">Ready to scan</h3>
            <p className="text-sm text-neutral-400 max-w-sm mx-auto">
              {scanComplete ? "No links found in your published blog posts." : "Hit \"Start Scan\" to check every link inside your published blog posts for broken URLs and 404s."}
            </p>
          </div>
        )}
      </div>

      {/* ── Modals ────────────────────────────────────────────────────────────── */}

      {actionModal?.type === "auto" && (
        <AutoReplaceModal link={actionModal.link} onClose={() => setActionModal(null)} onReplace={handleReplace} actionLoading={actionLoading} />
      )}

      {actionModal?.type === "bulk-auto" && (
        <BulkAutoReplaceModal links={selectedIssues} onClose={() => setActionModal(null)} onComplete={handleBulkAutoComplete} />
      )}

      {actionModal?.type === "bulk-remove" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <i className="ri-delete-bin-line text-red-500 text-lg"></i>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">Remove {selectedUids.size} link{selectedUids.size !== 1 ? "s" : ""}?</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Hyperlinks will be stripped from the selected {selectedUids.size} link{selectedUids.size !== 1 ? "s" : ""}. Anchor text stays in the posts.
                </p>
                <div className="mt-3 max-h-32 overflow-y-auto space-y-1">
                  {selectedLinks.slice(0, 8).map((l) => (
                    <div key={l.uid} className="flex items-center gap-2 text-[10px] text-neutral-500">
                      <i className="ri-subtract-line text-neutral-300 flex-shrink-0"></i>
                      <span className="font-medium truncate">{l.anchorText}</span>
                    </div>
                  ))}
                  {selectedLinks.length > 8 && <p className="text-[10px] text-neutral-400 pl-4">...and {selectedLinks.length - 8} more</p>}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setActionModal(null)} disabled={bulkLoading}
                className="flex-1 border border-neutral-200 text-neutral-600 text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50">
                Cancel
              </button>
              <button onClick={handleBulkRemove} disabled={bulkLoading}
                className="flex-1 bg-red-500 text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 flex items-center justify-center gap-2">
                {bulkLoading ? <><i className="ri-loader-4-line animate-spin text-xs"></i>Removing...</> : `Remove ${selectedUids.size} Link${selectedUids.size !== 1 ? "s" : ""}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {actionModal?.type === "remove" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                <i className="ri-delete-bin-line text-red-500 text-lg"></i>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">Remove this link?</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  The anchor text <strong>&quot;{actionModal.link.anchorText}&quot;</strong> will stay in the post, but the hyperlink to{" "}
                  <span className="font-mono text-neutral-700 break-all">{actionModal.link.url}</span> will be stripped out.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setActionModal(null)} disabled={actionLoading}
                className="flex-1 border border-neutral-200 text-neutral-600 text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50">
                Cancel
              </button>
              <button onClick={() => handleRemove(actionModal.link)} disabled={actionLoading}
                className="flex-1 bg-red-500 text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50">
                {actionLoading ? <><i className="ri-loader-4-line animate-spin text-xs mr-1"></i>Removing...</> : "Remove Link"}
              </button>
            </div>
          </div>
        </div>
      )}

      {actionModal?.type === "replace" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#3d6f7f]/5 flex items-center justify-center flex-shrink-0">
                <i className="ri-edit-line text-[#3d6f7f] text-lg"></i>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-neutral-900 mb-1">Replace link URL</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Updating the link for anchor text <strong>&quot;{actionModal.link.anchorText}&quot;</strong>.
                  {actionModal.link.status === "redirect" && actionModal.link.finalUrl && (
                    <span className="block mt-1 text-amber-600">
                      <i className="ri-information-line mr-1"></i>
                      This link redirects to <span className="font-mono">{actionModal.link.finalUrl}</span>.
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="mb-3">
              <p className="text-[10px] tracking-[0.12em] uppercase font-semibold text-neutral-400 mb-1.5">Current URL</p>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2.5 font-mono text-xs text-neutral-500 break-all">{actionModal.link.url}</div>
            </div>
            <div className="mb-5">
              <p className="text-[10px] tracking-[0.12em] uppercase font-semibold text-neutral-400 mb-1.5">New URL</p>
              <input ref={replaceInputRef} type="url" value={replaceUrl} onChange={(e) => setReplaceUrl(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && replaceUrl.trim()) handleReplace(actionModal.link, replaceUrl); }}
                placeholder="https://example.com/new-page"
                className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm font-mono text-neutral-800 focus:outline-none focus:border-[#3d6f7f] transition-colors" />
              {actionModal.link.finalUrl && actionModal.link.finalUrl !== replaceUrl && (
                <button onClick={() => setReplaceUrl(actionModal.link.finalUrl!)} className="mt-2 text-[10px] text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer">
                  <i className="ri-arrow-right-up-line text-xs"></i>
                  Use final destination: <span className="font-mono ml-1">{actionModal.link.finalUrl}</span>
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setActionModal(null); setReplaceUrl(""); }} disabled={actionLoading}
                className="flex-1 border border-neutral-200 text-neutral-600 text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50">
                Cancel
              </button>
              <button onClick={() => handleReplace(actionModal.link, replaceUrl)} disabled={actionLoading || !replaceUrl.trim()}
                className="flex-1 bg-[#3d6f7f] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50">
                {actionLoading ? <><i className="ri-loader-4-line animate-spin text-xs mr-1"></i>Saving...</> : "Save New URL"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 ${toast.type === "success" ? "bg-[#3d6f7f] text-white" : "bg-red-500 text-white"}`}>
          <i className={`text-base ${toast.type === "success" ? "ri-check-line" : "ri-error-warning-line"}`}></i>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
