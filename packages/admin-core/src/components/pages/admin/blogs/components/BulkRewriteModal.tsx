"use client";

import { useRef, useState } from "react";
import { supabase } from "../../../../../lib/supabase";
import { AI_MODELS, DEFAULT_MODEL_ID } from "../../../../../lib/aiModels";
import type { BlogPost } from "@sweetmedia/blog-core";
import type { BlogSection } from "@sweetmedia/blog-core";

interface RowState {
  keyword: string;
  guidelines: string;
  guidelineFileName: string;
  status: "pending" | "generating" | "done" | "error";
  error?: string;
}

interface BulkRewriteModalProps {
  posts: BlogPost[];
  onClose: () => void;
  onComplete: () => void;
}

const inputCls =
  "w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3d6f7f]/20 focus:border-[#3d6f7f] transition-all";

function estimateReadTime(content: unknown[]): string {
  const words = JSON.stringify(content).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export default function BulkRewriteModal({ posts, onClose, onComplete }: BulkRewriteModalProps) {
  const [model, setModel] = useState(DEFAULT_MODEL_ID);
  const [wordCount, setWordCount] = useState(2000);
  const [rows, setRows] = useState<Record<string, RowState>>(() =>
    Object.fromEntries(
      posts.map((p) => [
        p.id,
        {
          keyword: p.focus_keyword ?? "",
          guidelines: "",
          guidelineFileName: "",
          status: "pending" as const,
        },
      ]),
    ),
  );
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const updateRow = (id: string, patch: Partial<RowState>) =>
    setRows((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const handleFileUpload = (postId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateRow(postId, {
        guidelines: (ev.target?.result as string) ?? "",
        guidelineFileName: file.name,
      });
    };
    reader.readAsText(file);
  };

  const completedCount = Object.values(rows).filter((r) => r.status === "done").length;
  const errorCount = Object.values(rows).filter((r) => r.status === "error").length;

  const handleRunAll = async () => {
    setRunning(true);

    for (const post of posts) {
      const row = rows[post.id];
      if (!row.keyword.trim()) {
        updateRow(post.id, { status: "error", error: "No keyword set — add one to this post first." });
        continue;
      }

      updateRow(post.id, { status: "generating" });

      try {
        const res = await fetch("/api/admin/rewrite-blog-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: post.title,
            primaryKeyword: row.keyword.trim(),
            category: post.category || undefined,
            targetWordCount: wordCount,
            seoGuidelines: row.guidelines.trim() || undefined,
            model,
          }),
        });

        let json: Record<string, unknown>;
        try {
          json = await res.json() as Record<string, unknown>;
        } catch {
          throw new Error(
            res.status === 504
              ? "Request timed out — try a shorter word count."
              : `Server returned an empty response (HTTP ${res.status}).`,
          );
        }
        if (!res.ok || !json.ok) {
          throw new Error(typeof json.error === "string" ? json.error : "Generation failed.");
        }

        const content = json.content as BlogSection[];
        const { error: saveErr } = await supabase
          .from("blog_posts")
          .update({
            title: String(json.title ?? post.title),
            excerpt: String(json.excerpt ?? post.excerpt),
            meta_description: String(json.metaDescription ?? post.metaDescription ?? ""),
            content: JSON.stringify(content),
            read_time: estimateReadTime(content as unknown[]),
          })
          .eq("id", post.id);

        if (saveErr) throw new Error(saveErr.message);
        updateRow(post.id, { status: "done" });
      } catch (err) {
        updateRow(post.id, {
          status: "error",
          error: err instanceof Error ? err.message : "Unknown error.",
        });
      }
    }

    setRunning(false);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={!running ? onClose : undefined} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-7 py-5 border-b border-neutral-100 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
            <i className="ri-sparkling-2-line text-violet-600 text-lg"></i>
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-neutral-900">Bulk AI Rewrite</h2>
            <p className="text-[12px] text-neutral-400">
              Rewrite {posts.length} post{posts.length !== 1 ? "s" : ""} with AI — optionally import a Sweet SEO brief per post
            </p>
          </div>
          {!running && (
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-400 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-base"></i>
            </button>
          )}
        </div>

        {/* Global settings */}
        <div className="px-7 py-4 border-b border-neutral-50 bg-neutral-50/60 flex items-center gap-5 flex-shrink-0 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-neutral-500">Model</span>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={running}
              className="text-sm border border-neutral-200 rounded-lg px-2.5 py-1.5 bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#3d6f7f]/30 cursor-pointer disabled:opacity-50"
            >
              {AI_MODELS.map((m) => (
                <option key={m.id} value={m.id}>{m.displayName}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-neutral-500">Words</span>
            <select
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              disabled={running}
              className="text-sm border border-neutral-200 rounded-lg px-2.5 py-1.5 bg-white text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#3d6f7f]/30 cursor-pointer disabled:opacity-50"
            >
              {[800, 1200, 1500, 2000, 2500, 3000, 4000].map((n) => (
                <option key={n} value={n}>{n.toLocaleString()}</option>
              ))}
            </select>
          </div>
          {done && (
            <span className="ml-auto text-[12px] font-medium text-emerald-600">
              {completedCount} done{errorCount > 0 ? `, ${errorCount} failed` : ""}
            </span>
          )}
        </div>

        {/* Post rows */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-50">
          {posts.map((post) => {
            const row = rows[post.id];
            return (
              <div key={post.id} className={`px-7 py-4 transition-colors ${
                row.status === "generating" ? "bg-violet-50/40" :
                row.status === "done" ? "bg-emerald-50/30" :
                row.status === "error" ? "bg-red-50/30" : ""
              }`}>
                <div className="flex items-start gap-4">
                  {/* Status icon */}
                  <div className="mt-1 w-6 h-6 flex items-center justify-center flex-shrink-0">
                    {row.status === "generating" ? (
                      <i className="ri-loader-4-line animate-spin text-violet-500 text-base"></i>
                    ) : row.status === "done" ? (
                      <i className="ri-check-circle-fill text-emerald-500 text-base"></i>
                    ) : row.status === "error" ? (
                      <i className="ri-error-warning-fill text-red-400 text-base"></i>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-neutral-300 mt-1"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="text-sm font-medium text-neutral-800 leading-snug line-clamp-1">
                      {post.title}
                    </p>

                    {row.status === "error" && row.error && (
                      <p className="text-[11px] text-red-500">{row.error}</p>
                    )}

                    {row.status !== "done" && row.status !== "generating" && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Keyword */}
                        <input
                          type="text"
                          value={row.keyword}
                          onChange={(e) => updateRow(post.id, { keyword: e.target.value })}
                          placeholder="Focus keyword..."
                          className={`${inputCls} max-w-[240px]`}
                          disabled={running}
                        />

                        {/* Sweet SEO brief file */}
                        <button
                          type="button"
                          onClick={() => fileRefs.current[post.id]?.click()}
                          disabled={running}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-neutral-300 hover:border-[#3d6f7f]/50 hover:bg-[#3d6f7f]/4 text-[11px] font-medium text-neutral-500 hover:text-[#3d6f7f] transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
                        >
                          <i className="ri-file-upload-line text-xs"></i>
                          {row.guidelineFileName || "Import Sweet SEO brief"}
                        </button>
                        <input
                          ref={(el) => { fileRefs.current[post.id] = el; }}
                          type="file"
                          accept=".txt,text/plain"
                          className="hidden"
                          onChange={(e) => handleFileUpload(post.id, e)}
                        />

                        {row.guidelines && (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                            <i className="ri-check-line text-[9px]"></i>
                            Guidelines loaded
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-neutral-100 flex items-center gap-3 flex-shrink-0 bg-white">
          {done ? (
            <>
              <p className="flex-1 text-sm text-neutral-500">
                Rewrites saved as drafts. Reload the posts list to see the updated content.
              </p>
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3d6f7f] hover:bg-[#35636f] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <i className="ri-check-line text-sm"></i>
                Done
              </button>
            </>
          ) : running ? (
            <div className="flex-1 flex items-center gap-3">
              <i className="ri-loader-4-line animate-spin text-violet-500 text-base"></i>
              <span className="text-sm text-violet-700 font-medium">
                Rewriting {completedCount + errorCount + 1} of {posts.length}...
              </span>
            </div>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <div className="flex-1 text-[12px] text-neutral-400">
                Posts will be saved automatically as drafts after rewriting.
              </div>
              <button
                onClick={handleRunAll}
                disabled={posts.every((p) => !rows[p.id].keyword.trim())}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <i className="ri-sparkling-2-line text-sm"></i>
                Rewrite All
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
