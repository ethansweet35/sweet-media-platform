"use client";

import { useMemo, useState } from "react";
import { ADMIN_OCEAN } from "../../lib/adminTheme";
import { parseBulkCreateLines } from "../../lib/contentEditorBulkCreateParse";
import type { ContentEditorBulkPublishTarget } from "../../types/content-editor-bulk-job";

const MAX_LINES = 25;

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onSubmit: (input: {
    publishTarget: ContentEditorBulkPublishTarget;
    analysisMode: "lite" | "deep";
    lines: string;
  }) => void | Promise<void>;
}

export default function ContentEditorBulkCreateModal({
  open,
  loading,
  onClose,
  onSubmit,
}: Props) {
  const [publishTarget, setPublishTarget] = useState<ContentEditorBulkPublishTarget>("blog");
  const [analysisMode, setAnalysisMode] = useState<"lite" | "deep">("lite");
  const [lines, setLines] = useState("");
  const [error, setError] = useState<string | null>(null);

  const preview = useMemo(() => {
    if (!lines.trim()) return [];
    try {
      return parseBulkCreateLines(lines, publishTarget).slice(0, MAX_LINES);
    } catch {
      return [];
    }
  }, [lines, publishTarget]);

  if (!open) return null;

  const handleSubmit = () => {
    setError(null);
    const parsed = parseBulkCreateLines(lines, publishTarget);
    if (parsed.length === 0) {
      setError("Add at least one line.");
      return;
    }
    if (parsed.length > MAX_LINES) {
      setError(`Maximum ${MAX_LINES} items per batch.`);
      return;
    }
    void onSubmit({ publishTarget, analysisMode, lines });
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-xl"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="border-b border-[#E2E8F0] px-6 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748B]">
            Bulk create
          </p>
          <h2 className="mt-1 text-lg font-bold text-[#0A1F44]">
            Create up to {MAX_LINES} editors at once
          </h2>
          <p className="mt-1 text-[12px] text-[#64748B] leading-relaxed">
            Each line starts a full SERP analysis in the background. For blogs we also create a draft
            post. For pages we link to an existing marketing route. You can leave this page while
            jobs run — watch the activity badge at bottom left.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setPublishTarget("blog")}
              className={`rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] border ${
                publishTarget === "blog"
                  ? "border-[#0A1F44] bg-[#0A1F44] text-white"
                  : "border-[#E2E8F0] text-[#334155] hover:border-[#7B9FD4]"
              }`}
            >
              <i className="ri-article-line mr-1" /> Blogs
            </button>
            <button
              type="button"
              onClick={() => setPublishTarget("page")}
              className={`rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] border ${
                publishTarget === "page"
                  ? "border-[#0A1F44] bg-[#0A1F44] text-white"
                  : "border-[#E2E8F0] text-[#334155] hover:border-[#7B9FD4]"
              }`}
            >
              <i className="ri-pages-line mr-1" /> Pages
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setAnalysisMode("lite")}
              className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] border ${
                analysisMode === "lite"
                  ? "border-[#7B9FD4] bg-[#F4F7FB] text-[#0A1F44]"
                  : "border-[#E2E8F0] text-[#64748B]"
              }`}
            >
              Analyze (lite)
            </button>
            <button
              type="button"
              onClick={() => setAnalysisMode("deep")}
              className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] border ${
                analysisMode === "deep"
                  ? "border-[#7B9FD4] bg-[#F4F7FB] text-[#0A1F44]"
                  : "border-[#E2E8F0] text-[#64748B]"
              }`}
            >
              Deep analyze
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748B] mb-1.5">
              {publishTarget === "blog" ? "Keywords (one per line)" : "Pages (one per line)"}
            </label>
            <textarea
              value={lines}
              onChange={(e) => setLines(e.target.value)}
              rows={10}
              disabled={loading}
              placeholder={
                publishTarget === "blog"
                  ? `what happens after intervention colorado\nalcohol intervention specialist\nfamily intervention services`
                  : `/intervention-types/alcohol | alcohol intervention colorado\n/about\n/contact`
              }
              className="w-full rounded-xl border border-[#E2E8F0] px-4 py-3 text-sm font-mono text-[#0A1F44] placeholder-[#94A3B8] focus:border-[#7B9FD4] focus:outline-none"
            />
            <p className="mt-1.5 text-[11px] text-[#94A3B8]">
              {publishTarget === "page" ? (
                <>
                  Use <code className="text-[#64748B]">/route-path</code> or{" "}
                  <code className="text-[#64748B]">/route | primary keyword</code>. Route must exist in
                  Pages / tracked pages.
                </>
              ) : (
                <>Each keyword becomes a new editor + draft blog post.</>
              )}
            </p>
          </div>

          {preview.length > 0 ? (
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748B]">
                Preview ({preview.length} item{preview.length === 1 ? "" : "s"})
              </p>
              <ul className="mt-2 max-h-32 overflow-y-auto text-[12px] text-[#334155] space-y-1">
                {preview.map((item, i) => (
                  <li key={i} className="truncate">
                    {publishTarget === "page" && item.route_path ? (
                      <>
                        <span className="font-mono text-[#0A1F44]">{item.route_path}</span>
                        <span className="text-[#94A3B8]"> · </span>
                        {item.keyword}
                      </>
                    ) : (
                      item.keyword
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {error ? (
            <p className="text-[12px] text-red-600">
              <i className="ri-error-warning-line mr-1" />
              {error}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end gap-2 border-t border-[#E2E8F0] px-6 py-4">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#334155] hover:border-[#7B9FD4] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading || !lines.trim()}
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white disabled:opacity-50"
            style={{ backgroundColor: ADMIN_OCEAN }}
          >
            {loading ? (
              <>
                <i className="ri-loader-4-line animate-spin" /> Starting…
              </>
            ) : (
              <>
                <i className="ri-stack-line" /> Start bulk create
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
