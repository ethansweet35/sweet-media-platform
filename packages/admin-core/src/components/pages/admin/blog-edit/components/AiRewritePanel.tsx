"use client";

import { useRef, useState } from "react";
import { AI_MODELS, DEFAULT_MODEL_ID } from "../../../../../lib/aiModels";
import type { BlogSection } from "@sweetmedia/blog-core";

export interface RewriteResult {
  title: string;
  excerpt: string;
  metaDescription: string;
  content: BlogSection[];
}

interface AiRewritePanelProps {
  initialTopic: string;
  initialKeyword: string;
  initialCategory: string;
  onApply: (result: RewriteResult) => void;
  onClose: () => void;
}

type Stage = "idle" | "generating" | "preview";

const inputCls =
  "w-full px-3.5 py-2.5 text-sm border border-neutral-200 rounded-xl bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3d6f7f]/30 focus:border-[#3d6f7f] transition-all";
const labelCls =
  "block text-[10px] tracking-[0.15em] uppercase font-semibold text-neutral-500 mb-1.5";

export default function AiRewritePanel({
  initialTopic,
  initialKeyword,
  initialCategory,
  onApply,
  onClose,
}: AiRewritePanelProps) {
  const [topic, setTopic] = useState(initialTopic);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [surferGuidelines, setSurferGuidelines] = useState("");
  const [model, setModel] = useState(DEFAULT_MODEL_ID);
  const [wordCount, setWordCount] = useState(2000);
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RewriteResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setSurferGuidelines((ev.target?.result as string) ?? "");
    };
    reader.readAsText(file);
  };

  const handleGenerate = async () => {
    if (!topic.trim() || !keyword.trim()) {
      setError("Topic and primary keyword are required.");
      return;
    }
    setError(null);
    setStage("generating");

    try {
      const res = await fetch("/api/admin/rewrite-blog-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          primaryKeyword: keyword.trim(),
          category: initialCategory || undefined,
          targetWordCount: wordCount,
          surferGuidelines: surferGuidelines.trim() || undefined,
          model,
        }),
      });
      let json: Record<string, unknown>;
      try {
        json = await res.json() as Record<string, unknown>;
      } catch {
        throw new Error(
          res.status === 504
            ? "Request timed out — try a shorter word count or smaller Surfer guidelines file."
            : `Server error (HTTP ${res.status}) — check Vercel function logs for details.`,
        );
      }
      if (!res.ok || !json.ok) {
        throw new Error(typeof json.error === "string" ? json.error : "Generation failed.");
      }
      setResult({
        title: String(json.title ?? ""),
        excerpt: String(json.excerpt ?? ""),
        metaDescription: String(json.metaDescription ?? ""),
        content: (json.content as BlogSection[]) ?? [],
      });
      setStage("preview");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
      setStage("idle");
    }
  };

  const handleApply = () => {
    if (result) {
      onApply(result);
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-[480px] max-w-full bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
            <i className="ri-sparkling-2-line text-violet-600 text-base"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-neutral-900">AI Rewrite</h2>
            <p className="text-[11px] text-neutral-400">Regenerate this post with AI guidance</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-400 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-base"></i>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {stage === "preview" && result ? (
            /* ── Preview ──────────────────────────── */
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-600">
                  Generation complete — review before applying
                </span>
              </div>

              <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-4 space-y-3">
                <div>
                  <p className={labelCls}>New Title</p>
                  <p className="text-sm font-semibold text-neutral-900 leading-snug">{result.title}</p>
                </div>
                <div className="border-t border-neutral-200 pt-3">
                  <p className={labelCls}>New Meta Description</p>
                  <p className="text-sm text-neutral-600 leading-relaxed">{result.metaDescription}</p>
                  <p className={`text-[10px] mt-1 ${result.metaDescription.length > 160 ? "text-red-500" : "text-neutral-400"}`}>
                    {result.metaDescription.length} chars
                  </p>
                </div>
                <div className="border-t border-neutral-200 pt-3">
                  <p className={labelCls}>New Excerpt</p>
                  <p className="text-sm text-neutral-500 leading-relaxed">{result.excerpt}</p>
                </div>
                <div className="border-t border-neutral-200 pt-3">
                  <p className={labelCls}>Content</p>
                  <p className="text-sm text-neutral-500">
                    {result.content.length} content blocks generated.
                    <span className="text-neutral-400"> Scroll the editor to preview after applying.</span>
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl border border-amber-200 px-4 py-3 flex items-start gap-2">
                <i className="ri-error-warning-line text-amber-500 text-sm mt-0.5 flex-shrink-0"></i>
                <p className="text-[12px] text-amber-700 leading-relaxed">
                  Applying will replace your current title, excerpt, meta description, and all content blocks.
                  The post won&apos;t be saved automatically — you&apos;ll still need to hit Save.
                </p>
              </div>
            </div>
          ) : (
            /* ── Form ─────────────────────────────── */
            <>
              <div>
                <label className={labelCls}>Topic / Post Angle</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. How to Choose a Residential Treatment Center"
                  className={inputCls}
                  disabled={stage === "generating"}
                />
              </div>

              <div>
                <label className={labelCls}>Primary Keyword</label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="e.g. residential treatment center Los Angeles"
                  className={inputCls}
                  disabled={stage === "generating"}
                />
              </div>

              <div>
                <label className={labelCls}>Target Word Count</label>
                <select
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value))}
                  className={`${inputCls} cursor-pointer`}
                  disabled={stage === "generating"}
                >
                  {[800, 1200, 1500, 2000, 2500, 3000, 4000].map((n) => (
                    <option key={n} value={n}>{n.toLocaleString()} words</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>AI Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={`${inputCls} cursor-pointer`}
                  disabled={stage === "generating"}
                >
                  {AI_MODELS.map((m) => (
                    <option key={m.id} value={m.id}>{m.displayName}</option>
                  ))}
                </select>
                <p className="text-[11px] text-neutral-400 mt-1.5">
                  {AI_MODELS.find((m) => m.id === model)?.description}
                </p>
              </div>

              {/* Surfer Guidelines */}
              <div>
                <label className={labelCls}>
                  Surfer SEO Guidelines
                  <span className="ml-1.5 normal-case font-normal text-neutral-400">optional</span>
                </label>
                <div className="space-y-2">
                  {/* File drop */}
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={stage === "generating"}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-neutral-200 hover:border-[#3d6f7f]/40 hover:bg-[#3d6f7f]/4 text-neutral-500 hover:text-[#3d6f7f] transition-all cursor-pointer disabled:opacity-50"
                  >
                    <i className="ri-file-upload-line text-base flex-shrink-0"></i>
                    <span className="text-[12px] font-medium">
                      {surferGuidelines ? "Replace .txt file" : "Import Surfer guidelines (.txt)"}
                    </span>
                    {surferGuidelines && (
                      <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                        <i className="ri-check-line text-[9px]"></i>
                        Loaded
                      </span>
                    )}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".txt,text/plain"
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  {/* Or paste */}
                  <textarea
                    value={surferGuidelines}
                    onChange={(e) => setSurferGuidelines(e.target.value)}
                    rows={4}
                    placeholder="Or paste your Surfer SEO guidelines here — NLP terms, word count targets, structure notes..."
                    className={`${inputCls} resize-none`}
                    disabled={stage === "generating"}
                  />
                  {surferGuidelines && (
                    <p className="text-[11px] text-neutral-400">
                      {surferGuidelines.length.toLocaleString()} chars loaded
                      {surferGuidelines.length > 12000 && (
                        <span className="text-amber-500"> (will be trimmed to 12,000)</span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
                  <i className="ri-error-warning-line text-red-400 text-sm mt-0.5 flex-shrink-0"></i>
                  <p className="text-[12px] text-red-600">{error}</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-neutral-100 flex items-center gap-3 flex-shrink-0">
          {stage === "preview" && result ? (
            <>
              <button
                onClick={() => { setStage("idle"); setResult(null); }}
                className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleApply}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <i className="ri-check-line text-sm"></i>
                Apply to Post
              </button>
            </>
          ) : stage === "generating" ? (
            <div className="flex-1 flex items-center justify-center gap-3 py-3 bg-violet-50 rounded-xl">
              <i className="ri-loader-4-line animate-spin text-violet-500 text-base"></i>
              <span className="text-sm font-medium text-violet-700">Writing with AI...</span>
            </div>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                disabled={!topic.trim() || !keyword.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <i className="ri-sparkling-2-line text-sm"></i>
                Rewrite with AI
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
