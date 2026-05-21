"use client";

import { useRef, useState } from "react";
import { supabase } from "../../../../../lib/supabase";
import { AI_MODELS, DEFAULT_MODEL_ID } from "../../../../../lib/aiModels";
import type { BlogPost } from "@sweetmedia/blog-core";
import type { BlogSection } from "@sweetmedia/blog-core";

// ─── Types ───────────────────────────────────────────────────────────────────

type RowStatus =
  | "pending"
  | "creating_brief"
  | "brief_running"
  | "brief_failed"
  | "optimizing"
  | "writing"
  | "done"
  | "error";

const PIPELINE_BUSY = new Set([
  "pending",
  "fetching_serp",
  "extracting_content",
  "analyzing_nlp",
  "extracting_facts",
  "computing_guidelines",
]);

interface RowState {
  keyword: string;
  // Manual brief override — if the user uploads a file, we skip auto-brief.
  manualBrief: string;
  manualBriefFileName: string;
  status: RowStatus;
  /** Human-readable pipeline status message polled from the editor row. */
  briefStatusMsg?: string;
  editorId?: string;
  error?: string;
}

interface ContentEditorTermRow {
  term: string;
  min_recommended_uses: number;
  max_recommended_uses: number;
  user_blacklisted: boolean;
  user_included: boolean;
}
interface ContentEditorQuestionRow {
  question: string;
  user_dismissed: boolean;
}
interface ContentEditorFactRow {
  fact_text: string;
  user_dismissed: boolean;
}
interface ContentEditorOutlineRow {
  heading_level: number;
  heading_text: string;
  position: number;
}
interface ContentEditorEditorRow {
  id: string;
  status: string;
  status_message?: string | null;
  error?: string | null;
  primary_keyword: string;
  recommended_word_count_min?: number | null;
  recommended_word_count_max?: number | null;
  recommended_h2_min?: number | null;
  recommended_h2_max?: number | null;
}
interface ContentEditorStateResponse {
  ok: boolean;
  editor: ContentEditorEditorRow;
  terms: ContentEditorTermRow[];
  questions: ContentEditorQuestionRow[];
  facts: ContentEditorFactRow[];
  outline: ContentEditorOutlineRow[];
  currentDraft?: {
    body_markdown?: string | null;
    updated_at?: string | null;
  } | null;
  error?: string;
}

interface BulkRewriteModalProps {
  posts: BlogPost[];
  onClose: () => void;
  onComplete: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const inputCls =
  "w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-white text-[#0A1F44] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/20 focus:border-[#7B9FD4] transition-all";

function estimateReadTime(content: unknown[]): string {
  const words = JSON.stringify(content).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function BulkRewriteModal({ posts, onClose, onComplete }: BulkRewriteModalProps) {
  const [model, setModel] = useState(DEFAULT_MODEL_ID);
  const [wordCount, setWordCount] = useState(2000);
  const [rows, setRows] = useState<Record<string, RowState>>(() =>
    Object.fromEntries(
      posts.map((p) => [
        p.id,
        {
          keyword: p.focus_keyword ?? "",
          manualBrief: "",
          manualBriefFileName: "",
          status: "pending" as RowStatus,
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
        manualBrief: (ev.target?.result as string) ?? "",
        manualBriefFileName: file.name,
      });
    };
    reader.readAsText(file);
  };

  const completedCount = Object.values(rows).filter((r) => r.status === "done").length;
  const errorCount = Object.values(rows).filter(
    (r) => r.status === "error" || r.status === "brief_failed",
  ).length;

  // ── Per-post pipeline ──────────────────────────────────────────────────────

  /**
   * Polls /api/admin/content-editor/{id} every 5 s until status=ready or failed.
   * Updates the row's briefStatusMsg on each tick. Returns the final state.
   */
  async function pollUntilReady(
    postId: string,
    editorId: string,
  ): Promise<ContentEditorStateResponse> {
    const MAX_POLLS = 72; // 72 × 5s = 6 min max
    for (let i = 0; i < MAX_POLLS; i++) {
      await new Promise((r) => setTimeout(r, 5000));
      const res = await fetch(`/api/admin/content-editor/${editorId}`);
      const json = (await res.json()) as ContentEditorStateResponse;
      if (!json.ok) throw new Error(json.error ?? "Failed to fetch brief status");
      const status = json.editor.status;
      if (status === "ready") return json;
      if (status === "failed")
        throw new Error(json.editor.error ?? "Brief pipeline failed.");
      updateRow(postId, {
        briefStatusMsg: json.editor.status_message ?? status,
      });
    }
    throw new Error("Brief pipeline timed out after 6 minutes.");
  }

  /** Reuse linked editor or create one tied to this blog post. */
  async function ensureEditorForPost(post: BlogPost, keyword: string): Promise<string> {
    if (post.content_editor_id) {
      const res = await fetch(`/api/admin/content-editor/${post.content_editor_id}`);
      const json = (await res.json()) as ContentEditorStateResponse;
      if (json.ok) {
        const status = json.editor.status;
        if (status === "ready") return post.content_editor_id;
        if (PIPELINE_BUSY.has(status)) {
          updateRow(post.id, {
            status: "brief_running",
            editorId: post.content_editor_id,
            briefStatusMsg: json.editor.status_message ?? "Brief running…",
          });
          await pollUntilReady(post.id, post.content_editor_id);
          return post.content_editor_id;
        }
        if (status === "failed") {
          updateRow(post.id, {
            status: "brief_running",
            editorId: post.content_editor_id,
            briefStatusMsg: "Retrying brief…",
          });
          await fetch(`/api/admin/content-editor/${post.content_editor_id}/run`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ force: true }),
          });
          await pollUntilReady(post.id, post.content_editor_id);
          return post.content_editor_id;
        }
      }
    }

    updateRow(post.id, { status: "creating_brief", briefStatusMsg: "Creating brief…" });
    const createRes = await fetch("/api/admin/content-editor/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        primaryKeyword: keyword.trim(),
        blogPostId: post.id,
        analysisMode: "lite",
      }),
    });
    const createJson = (await createRes.json()) as {
      ok: boolean;
      editor?: { id: string };
      error?: string;
    };
    if (!createRes.ok || !createJson.ok || !createJson.editor?.id) {
      throw new Error(createJson.error ?? "Failed to create brief.");
    }
    const editorId = createJson.editor.id;
    await supabase
      .from("blog_posts")
      .update({ content_editor_id: editorId, updated_at: new Date().toISOString() })
      .eq("id", post.id);
    updateRow(post.id, {
      status: "brief_running",
      editorId,
      briefStatusMsg: "Analyzing competitors…",
    });
    await pollUntilReady(post.id, editorId);
    return editorId;
  }

  async function pollUntilOptimized(
    postId: string,
    editorId: string,
    optimizeStartedAt: number,
  ): Promise<void> {
    const MAX_POLLS = 72;
    for (let i = 0; i < MAX_POLLS; i++) {
      await new Promise((r) => setTimeout(r, 5000));
      const res = await fetch(`/api/admin/content-editor/${editorId}`);
      const json = (await res.json()) as ContentEditorStateResponse;
      if (!json.ok) throw new Error(json.error ?? "Failed to fetch editor status.");
      const draft = json.currentDraft;
      const body = draft?.body_markdown?.trim() ?? "";
      const updatedAt = draft?.updated_at ? Date.parse(draft.updated_at) : NaN;
      if (body && Number.isFinite(updatedAt) && updatedAt > optimizeStartedAt) {
        return;
      }
      updateRow(postId, {
        briefStatusMsg: "Auto-Optimize running…",
      });
    }
    throw new Error("Auto-Optimize timed out after 6 minutes.");
  }

  async function markPostDraftForReview(postId: string): Promise<void> {
    const { error } = await supabase
      .from("blog_posts")
      .update({
        status: "draft",
        approved_for_publish: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", postId);
    if (error) throw new Error(error.message);
  }

  async function processPost(post: BlogPost): Promise<void> {
    const row = rows[post.id];
    if (!row.keyword.trim()) {
      updateRow(post.id, { status: "error", error: "No keyword — add one to this post first." });
      return;
    }

    // ── Manual brief override: legacy rewrite API (no Content Editor pipeline) ──
    if (row.manualBrief.trim()) {
      try {
        updateRow(post.id, { status: "writing", briefStatusMsg: "Writing from uploaded brief…" });
        const res = await fetch("/api/admin/rewrite-blog-post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: post.title,
            primaryKeyword: row.keyword.trim(),
            category: post.category || undefined,
            targetWordCount: wordCount,
            seoGuidelines: row.manualBrief.trim(),
            model,
          }),
        });
        let json: Record<string, unknown>;
        try {
          json = (await res.json()) as Record<string, unknown>;
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
            status: "draft",
            approved_for_publish: false,
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
      return;
    }

    // ── Default: Content Editor brief → Auto-Optimize → sync to blog post ──
    try {
      const editorId = await ensureEditorForPost(post, row.keyword.trim());
      updateRow(post.id, {
        status: "optimizing",
        editorId,
        briefStatusMsg: "Starting Auto-Optimize…",
      });

      const optimizeStartedAt = Date.now();
      const optimizeRes = await fetch(`/api/admin/content-editor/${editorId}/auto-optimize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          autoPublish: true,
          publishTarget: "blog",
          customInstructions:
            wordCount > 0
              ? `Target word count for this article: approximately ${wordCount} words.`
              : undefined,
        }),
      });
      const optimizeJson = (await optimizeRes.json()) as { ok?: boolean; error?: string };
      if (!optimizeRes.ok || optimizeJson.ok === false) {
        throw new Error(optimizeJson.error ?? "Auto-Optimize failed to start.");
      }

      await pollUntilOptimized(post.id, editorId, optimizeStartedAt);
      await markPostDraftForReview(post.id);
      updateRow(post.id, { status: "done", briefStatusMsg: "Synced · set to draft" });
    } catch (err) {
      updateRow(post.id, {
        status: err instanceof Error && err.message.includes("brief") ? "brief_failed" : "error",
        error: err instanceof Error ? err.message : "Unknown error.",
      });
    }
  }

  const handleRunAll = async () => {
    setRunning(true);
    for (const post of posts) {
      await processPost(post);
    }
    setRunning(false);
    setDone(true);
  };

  // ── Status label helpers ───────────────────────────────────────────────────

  function statusLabel(row: RowState): string {
    switch (row.status) {
      case "creating_brief": return "Creating brief…";
      case "brief_running": return row.briefStatusMsg ?? "Analyzing…";
      case "brief_failed": return row.error ?? "Brief failed";
      case "optimizing": return row.briefStatusMsg ?? "Auto-Optimizing…";
      case "writing": return "Writing content…";
      case "done": return "Done";
      case "error": return row.error ?? "Error";
      default: return "Pending";
    }
  }

  function statusIcon(row: RowState) {
    if (
      row.status === "creating_brief" ||
      row.status === "brief_running" ||
      row.status === "optimizing" ||
      row.status === "writing"
    ) {
      return <i className="ri-loader-4-line animate-spin text-violet-500 text-base"></i>;
    }
    if (row.status === "done") {
      return <i className="ri-check-circle-fill text-emerald-500 text-base"></i>;
    }
    if (row.status === "error" || row.status === "brief_failed") {
      return <i className="ri-error-warning-fill text-red-400 text-base"></i>;
    }
    return <span className="w-2 h-2 rounded-full bg-[#CBD5E1] mt-1 block"></span>;
  }

  function rowBg(row: RowState): string {
    if (
      row.status === "creating_brief" ||
      row.status === "brief_running" ||
      row.status === "optimizing" ||
      row.status === "writing"
    ) {
      return "bg-violet-50/40";
    }
    if (row.status === "done") return "bg-emerald-50/30";
    if (row.status === "error" || row.status === "brief_failed") return "bg-red-50/30";
    return "";
  }

  // Phase label shown during run
  function phaseLabel(): string {
    const briefPhases: RowStatus[] = ["creating_brief", "brief_running"];
    if (posts.some((p) => briefPhases.includes(rows[p.id].status))) {
      const done = posts.filter((p) => !briefPhases.includes(rows[p.id].status) && rows[p.id].status !== "pending").length;
      return `Building briefs — ${done} of ${posts.length} complete…`;
    }
    if (posts.some((p) => rows[p.id].status === "optimizing")) {
      const done = posts.filter((p) => rows[p.id].status === "done" || rows[p.id].status === "error").length;
      return `Auto-Optimizing — ${done} of ${posts.length} complete…`;
    }
    return `Processing — ${completedCount + errorCount} of ${posts.length} complete…`;
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={!running ? onClose : undefined} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-7 py-5 border-b border-[#E2E8F0] flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
            <i className="ri-sparkling-2-line text-violet-600 text-lg"></i>
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-[#0A1F44]">Bulk Auto-Optimize</h2>
            <p className="text-[12px] text-[#94A3B8]">
              {posts.length} post{posts.length !== 1 ? "s" : ""}: creates or reuses a Content Editor brief per post, runs
              Auto-Optimize, syncs to the blog, and sets each post to <strong>draft</strong> (clears publish approval).
            </p>
          </div>
          {!running && (
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F4F7FB] text-[#94A3B8] transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-base"></i>
            </button>
          )}
        </div>

        {/* Global settings */}
        <div className="px-7 py-4 border-b border-[#F4F7FB] bg-[#F4F7FB]/60 flex items-center gap-5 flex-shrink-0 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#64748B]">Model</span>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={running}
              className="text-sm border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 bg-white text-[#0A1F44] focus:outline-none focus:ring-1 focus:ring-[#0A1F44]/30 cursor-pointer disabled:opacity-50"
            >
              {AI_MODELS.map((m) => (
                <option key={m.id} value={m.id}>{m.displayName}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#64748B]">Words</span>
            <select
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              disabled={running}
              className="text-sm border border-[#E2E8F0] rounded-lg px-2.5 py-1.5 bg-white text-[#0A1F44] focus:outline-none focus:ring-1 focus:ring-[#0A1F44]/30 cursor-pointer disabled:opacity-50"
            >
              {[800, 1200, 1500, 2000, 2500, 3000, 4000].map((n) => (
                <option key={n} value={n}>{n.toLocaleString()}</option>
              ))}
            </select>
          </div>
          {/* Info chip */}
          <div className="ml-auto flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
            <i className="ri-information-line text-xs"></i>
            <span>~3–5 min per post (brief + optimize)</span>
          </div>
          {done && (
            <span className="text-[12px] font-medium text-emerald-600">
              {completedCount} done{errorCount > 0 ? `, ${errorCount} failed` : ""}
            </span>
          )}
        </div>

        {/* Post rows */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#F4F7FB]">
          {posts.map((post) => {
            const row = rows[post.id];
            const isActive = ["creating_brief", "brief_running", "optimizing", "writing"].includes(
              row.status,
            );
            const isTerminal = row.status === "done" || row.status === "error" || row.status === "brief_failed";
            const isPending = row.status === "pending";
            return (
              <div
                key={post.id}
                className={`px-7 py-4 transition-colors ${rowBg(row)}`}
              >
                <div className="flex items-start gap-4">
                  {/* Status icon */}
                  <div className="mt-1 w-6 h-6 flex items-center justify-center flex-shrink-0">
                    {statusIcon(row)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="text-sm font-medium text-[#0A1F44] leading-snug line-clamp-1">
                      {post.title}
                    </p>

                    {/* Active / terminal status message */}
                    {(isActive || isTerminal) && (
                      <p className={`text-[11px] font-medium ${
                        row.status === "done" ? "text-emerald-600" :
                        row.status === "error" || row.status === "brief_failed" ? "text-red-500" :
                        "text-violet-600"
                      }`}>
                        {statusLabel(row)}
                      </p>
                    )}

                    {/* Editable controls — shown only when not yet started */}
                    {isPending && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <input
                          type="text"
                          value={row.keyword}
                          onChange={(e) => updateRow(post.id, { keyword: e.target.value })}
                          placeholder="Focus keyword…"
                          className={`${inputCls} max-w-[240px]`}
                          disabled={running}
                        />

                        {/* Optional manual brief override */}
                        <button
                          type="button"
                          onClick={() => fileRefs.current[post.id]?.click()}
                          disabled={running}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-[#CBD5E1] hover:border-[#0A1F44]/50 hover:bg-[#0A1F44]/4 text-[11px] font-medium text-[#64748B] hover:text-[#0A1F44] transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
                        >
                          <i className="ri-file-upload-line text-xs"></i>
                          {row.manualBriefFileName || "Override brief"}
                        </button>
                        <input
                          ref={(el) => { fileRefs.current[post.id] = el; }}
                          type="file"
                          accept=".txt,text/plain"
                          className="hidden"
                          onChange={(e) => handleFileUpload(post.id, e)}
                        />

                        {row.manualBrief && (
                          <span className="flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full font-bold">
                            <i className="ri-file-text-line text-[9px]"></i>
                            Manual brief (auto-gen skipped)
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
        <div className="px-7 py-4 border-t border-[#E2E8F0] flex items-center gap-3 flex-shrink-0 bg-white">
          {done ? (
            <>
              <p className="flex-1 text-sm text-[#64748B]">
                Rewrites saved as drafts. Reload the posts list to see updated content.
              </p>
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0A1F44] hover:bg-[#0d2a5e] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <i className="ri-check-line text-sm"></i>
                Done
              </button>
            </>
          ) : running ? (
            <div className="flex-1 flex items-center gap-3">
              <i className="ri-loader-4-line animate-spin text-violet-500 text-base"></i>
              <span className="text-sm text-violet-700 font-medium">{phaseLabel()}</span>
            </div>
          ) : (
            <>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm font-semibold text-[#64748B] hover:bg-[#F4F7FB] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <div className="flex-1 text-[12px] text-[#94A3B8]">
                Each post: auto-generate SEO brief → write content → save as draft.
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
