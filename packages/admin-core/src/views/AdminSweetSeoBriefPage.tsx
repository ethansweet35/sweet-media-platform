"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { BlogSection } from "@sweetmedia/blog-core";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import { supabase } from "../lib/supabase";
import {
  blogContentToMarkdown,
  briefToMarkdown,
  useLinkedBlogPost,
  useSeoBrief,
} from "../hooks/useSeoBriefs";
import {
  SEO_BRIEF_MODELS,
  computeContentScore,
  computeDraftStats,
  countTermOccurrences,
  type RangeStatus,
  type SeoBriefRow,
  type SeoBriefStructure,
  type SeoBriefTerm,
} from "../types/seo-brief";

const AUTOSAVE_DELAY_MS = 1500;

interface AdminSweetSeoBriefPageProps {
  briefId?: string;
}

function statusClass(status: RangeStatus): string {
  switch (status) {
    case "ok":
      return "text-emerald-600";
    case "under":
      return "text-orange-500";
    case "over":
      return "text-rose-500";
    case "empty":
    default:
      return "text-neutral-300";
  }
}

function statusIcon(status: RangeStatus): string {
  switch (status) {
    case "ok":
      return "ri-checkbox-circle-fill";
    case "under":
      return "ri-arrow-down-circle-line";
    case "over":
      return "ri-error-warning-line";
    case "empty":
    default:
      return "ri-circle-line";
  }
}

function scoreColor(score: number): string {
  if (score >= 75) return "#0e9f6e"; // emerald
  if (score >= 50) return "#d97706"; // amber
  if (score > 0) return "#ea580c"; // orange
  return "#a3a3a3"; // neutral
}

function ScoreRing({ score }: { score: number }) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;
  const color = scoreColor(score);
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: 80, height: 80 }}>
      <svg width={80} height={80} viewBox="0 0 80 80">
        <circle cx={40} cy={40} r={radius} stroke="#f1f1f1" strokeWidth={6} fill="none" />
        <circle
          cx={40}
          cy={40}
          r={radius}
          stroke={color}
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 40 40)"
          style={{ transition: "stroke-dashoffset 0.4s ease, stroke 0.4s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[20px] font-bold leading-none" style={{ color }}>
          {score}
        </span>
        <span className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-bold mt-0.5">
          Score
        </span>
      </div>
    </div>
  );
}

function StructureRow({
  label,
  value,
  min,
  max,
  status,
}: {
  label: string;
  value: number;
  min: number;
  max: number | null;
  status: RangeStatus;
}) {
  const targetText = max === null ? `${min}+` : `${min}–${max}`;
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-[12px] text-neutral-600">{label}</span>
      <div className="flex items-center gap-3">
        <span className={`font-mono text-[12px] ${statusClass(status)}`}>{value}</span>
        <span className="text-[11px] text-neutral-400 font-mono">/ {targetText}</span>
        <i className={`${statusIcon(status)} text-base ${statusClass(status)}`} />
      </div>
    </div>
  );
}

function TermRow({ term, status, value, min, max }: { term: string; status: RangeStatus; value: number; min: number; max: number }) {
  return (
    <li className="flex items-center justify-between gap-3 py-1.5 px-3 rounded-lg hover:bg-neutral-50 transition-colors">
      <span className="text-[12px] text-neutral-700 truncate">{term}</span>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`font-mono text-[11px] ${statusClass(status)}`}>{value}</span>
        <span className="text-[10px] text-neutral-400 font-mono">/ {min}–{max}</span>
        <i className={`${statusIcon(status)} text-sm ${statusClass(status)}`} />
      </div>
    </li>
  );
}

export default function AdminSweetSeoBriefPage({ briefId: briefIdProp }: AdminSweetSeoBriefPageProps = {}) {
  const params = useParams();
  const rawId = params?.id;
  const briefIdFromRoute = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : undefined;
  const briefId = briefIdProp ?? briefIdFromRoute ?? null;
  const { brief, loading, error, saving, saveDraft, rerun, refresh } = useSeoBrief(briefId);
  const linked = useLinkedBlogPost(brief?.id ?? null);
  const [draft, setDraft] = useState("");
  const [activeTermFilter, setActiveTermFilter] = useState<"all" | "missing" | "ok" | "over">("all");
  const [showRerun, setShowRerun] = useState(false);
  const [rerunModel, setRerunModel] = useState<string>("");
  const [rewriting, setRewriting] = useState(false);
  const [rewriteError, setRewriteError] = useState<string | null>(null);
  const [rewriteSuccess, setRewriteSuccess] = useState(false);
  const dirtyRef = useRef(false);
  const lastSavedRef = useRef("");
  const seededFromPostRef = useRef(false);

  // Hydrate the editor whenever the brief loads/changes from server.
  useEffect(() => {
    if (!brief) return;
    if (!dirtyRef.current) {
      setDraft(brief.draft_content ?? "");
      lastSavedRef.current = brief.draft_content ?? "";
      if (!rerunModel) setRerunModel(brief.model ?? SEO_BRIEF_MODELS[0].id);
    }
  }, [brief, rerunModel]);

  // Seed the brief draft from the linked blog post's content on first load
  // when the brief has no draft yet. This makes the score reflect the actual
  // post immediately so the user can see what's missing before rewriting.
  useEffect(() => {
    if (!brief || !linked.post || linked.loading) return;
    if (seededFromPostRef.current) return;
    if ((brief.draft_content ?? "").trim()) {
      seededFromPostRef.current = true;
      return;
    }
    if (dirtyRef.current) return;

    const md = blogContentToMarkdown(linked.post.content);
    if (!md.trim()) {
      seededFromPostRef.current = true;
      return;
    }
    seededFromPostRef.current = true;
    setDraft(md);
  }, [brief, linked.post, linked.loading]);

  // Debounced autosave.
  useEffect(() => {
    if (!brief) return;
    if (draft === lastSavedRef.current) return;
    dirtyRef.current = true;
    const t = setTimeout(() => {
      void saveDraft(draft).then(() => {
        lastSavedRef.current = draft;
        dirtyRef.current = false;
      });
    }, AUTOSAVE_DELAY_MS);
    return () => clearTimeout(t);
  }, [draft, brief, saveDraft]);

  const stats = useMemo(() => computeDraftStats(draft), [draft]);
  const scoreBreakdown = useMemo(
    () => computeContentScore(draft, brief?.content_structure ?? null, brief?.important_terms ?? null),
    [draft, brief?.content_structure, brief?.important_terms],
  );

  const filteredTermChecks = useMemo(() => {
    if (activeTermFilter === "all") return scoreBreakdown.termChecks;
    if (activeTermFilter === "ok") return scoreBreakdown.termChecks.filter((t) => t.status === "ok");
    if (activeTermFilter === "over") return scoreBreakdown.termChecks.filter((t) => t.status === "over");
    return scoreBreakdown.termChecks.filter((t) => t.status === "under" || t.status === "empty");
  }, [scoreBreakdown.termChecks, activeTermFilter]);

  const insertText = useCallback((snippet: string) => {
    setDraft((prev) => (prev ? `${prev.trimEnd()}\n\n${snippet}\n` : `${snippet}\n`));
  }, []);

  const handleRewriteLinkedPost = useCallback(async () => {
    if (!brief || !linked.post) return;
    setRewriting(true);
    setRewriteError(null);
    setRewriteSuccess(false);
    try {
      const words = brief.content_structure?.words;
      const midpoint = words
        ? Math.round((words.min + words.max) / 2)
        : 2000;
      const targetWordCount = Math.max(800, Math.min(4000, midpoint));

      const res = await fetch("/api/admin/rewrite-blog-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: linked.post.title,
          primaryKeyword: brief.keyword,
          category: linked.post.category || undefined,
          targetWordCount,
          seoGuidelines: briefToMarkdown(brief),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        title?: string;
        excerpt?: string;
        metaDescription?: string;
        content?: BlogSection[];
        error?: string;
      };
      if (!res.ok || !json.ok || !json.content) {
        throw new Error(
          typeof json.error === "string" ? json.error : `HTTP ${res.status}`,
        );
      }

      const newContent = json.content;
      const words2 = JSON.stringify(newContent).split(/\s+/).filter(Boolean).length;
      const readTime = `${Math.max(1, Math.ceil(words2 / 200))} min read`;

      const { error: updateError } = await supabase
        .from("blog_posts")
        .update({
          title: json.title ?? linked.post.title,
          excerpt: json.excerpt ?? linked.post.excerpt ?? "",
          meta_description: json.metaDescription ?? linked.post.meta_description ?? "",
          content: JSON.stringify(newContent),
          read_time: readTime,
          seo_guidance_applied: true,
        })
        .eq("id", linked.post.id);

      if (updateError) throw new Error(updateError.message);

      const newMarkdown = blogContentToMarkdown(newContent);
      if (newMarkdown.trim()) setDraft(newMarkdown);

      setRewriteSuccess(true);
      await linked.refresh();
      window.setTimeout(() => setRewriteSuccess(false), 6000);
    } catch (err) {
      setRewriteError(err instanceof Error ? err.message : "Rewrite failed.");
    } finally {
      setRewriting(false);
    }
  }, [brief, linked]);

  if (loading) {
    return (
      <div className="p-10 text-center text-sm text-neutral-500">
        <i className="ri-loader-4-line animate-spin mr-2" /> Loading brief…
      </div>
    );
  }
  if (!brief || error) {
    return (
      <div className="mx-auto max-w-screen-md py-16 text-center">
        <i className="ri-error-warning-line text-4xl text-neutral-300" />
        <p className="mt-4 text-sm text-neutral-700">{error ?? "Brief not found."}</p>
        <Link
          href="/admin/sweet-seo"
          className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-200 text-[12px] font-semibold text-neutral-700 hover:border-neutral-400"
        >
          <i className="ri-arrow-left-line" /> Back to briefs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        title={brief.keyword}
        subtitle="Live-scored against the top-ranking pages on Google. Edits autosave."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {linked.post ? (
              <button
                type="button"
                onClick={() => void handleRewriteLinkedPost()}
                disabled={rewriting}
                className="px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] text-white disabled:opacity-50 cursor-pointer"
                style={{ backgroundColor: ADMIN_OCEAN }}
                title="Rewrite the linked blog post using this brief"
              >
                {rewriting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-1" />
                    Rewriting…
                  </>
                ) : (
                  <>
                    <i className="ri-sparkling-2-line mr-1" />
                    Rewrite Linked Post
                  </>
                )}
              </button>
            ) : null}
            <Link
              href={`/admin/blog-writer?brief_id=${brief.id}`}
              className={
                linked.post
                  ? "px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400"
                  : "px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] text-white"
              }
              style={linked.post ? undefined : { backgroundColor: ADMIN_OCEAN }}
              title={linked.post ? "Create a brand-new post from this brief" : undefined}
            >
              <i className="ri-quill-pen-line mr-1" />
              {linked.post ? "New Post" : "Use in Blog Writer"}
            </Link>
            <button
              type="button"
              onClick={() => setShowRerun((v) => !v)}
              className="px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400"
            >
              <i className="ri-refresh-line mr-1" /> Re-run
            </button>
            <Link
              href="/admin/sweet-seo"
              className="px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400"
            >
              <i className="ri-arrow-left-line mr-1" /> Briefs
            </Link>
          </div>
        }
      />

      {linked.post ? (
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5 min-w-0">
            <i className="ri-links-line text-emerald-700 text-base shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                Linked blog post
              </p>
              <p className="mt-0.5 text-[13px] text-neutral-800 truncate">
                {linked.post.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {rewriteSuccess ? (
              <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <i className="ri-check-line" /> Post updated
              </span>
            ) : null}
            {rewriteError ? (
              <span className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                <i className="ri-error-warning-line" />
                {rewriteError}
              </span>
            ) : null}
            <Link
              href={`/blog/${linked.post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-900 underline-offset-2 hover:underline flex items-center gap-1"
            >
              View post <i className="ri-external-link-line" />
            </Link>
          </div>
        </div>
      ) : null}

      {showRerun ? (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold text-amber-900">Re-run analysis with a different model</p>
            <p className="mt-0.5 text-[11px] text-amber-700">
              Overwrites the current targets, citations, and facts. Your draft content is preserved.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={rerunModel}
              onChange={(e) => setRerunModel(e.target.value)}
              className="px-3 py-2 text-[12px] rounded-lg border border-amber-300 bg-white"
            >
              {SEO_BRIEF_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.displayName}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={async () => {
                setShowRerun(false);
                await rerun(rerunModel);
                await refresh();
              }}
              className="px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] text-white bg-amber-700 hover:bg-amber-800"
            >
              Re-run
            </button>
          </div>
        </div>
      ) : null}

      {brief.status === "processing" ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 flex items-center gap-4">
          <i className="ri-loader-4-line animate-spin text-2xl text-amber-700" />
          <div>
            <p className="text-sm font-semibold text-amber-900">Researching the top-ranking pages…</p>
            <p className="mt-0.5 text-[12px] text-amber-700">
              This page will refresh automatically. Usually 30–90 seconds.
            </p>
          </div>
        </div>
      ) : brief.status === "error" ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-semibold text-red-900">Analysis failed.</p>
          <p className="mt-1 text-[12px] text-red-700 whitespace-pre-wrap">
            {brief.error_message ?? "Unknown error."}
          </p>
          <button
            type="button"
            onClick={() => void rerun()}
            className="mt-3 px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] text-white bg-red-700 hover:bg-red-800"
          >
            <i className="ri-refresh-line mr-1" /> Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)_320px] gap-6">
          {/* LEFT: structure + score */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <ScoreRing score={scoreBreakdown.score} />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                    Content score
                  </p>
                  <p className="mt-1 text-[13px] text-neutral-700">
                    {scoreBreakdown.passedChecks} / {scoreBreakdown.totalChecks} checks pass
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-400">
                    Structure {scoreBreakdown.structureScore} · Terms {scoreBreakdown.termsScore}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-3">
                Content structure
              </p>
              {brief.content_structure ? (
                <StructureGrid structure={brief.content_structure} checks={scoreBreakdown.structureChecks} />
              ) : (
                <p className="text-[12px] text-neutral-400 italic">No structure data.</p>
              )}
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-3">
                Live stats
              </p>
              <div className="space-y-1.5 text-[12px] text-neutral-600">
                <Row label="Characters" value={stats.characters} />
                <Row label="Words" value={stats.words} />
                <Row label="Headings" value={stats.headings} />
                <Row label="Paragraphs" value={stats.paragraphs} />
                <Row label="Images" value={stats.images} />
              </div>
            </div>

            {brief.citations?.length ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-3">
                  Sources analyzed
                </p>
                <ul className="space-y-1.5">
                  {brief.citations.map((c) => (
                    <li key={c.url}>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] text-neutral-600 hover:text-[#3d6f7f] flex items-start gap-1.5"
                      >
                        <i className="ri-external-link-line text-[11px] mt-0.5 shrink-0" />
                        <span className="truncate">{c.title || c.url}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>

          {/* CENTER: editor */}
          <section className="space-y-3">
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-neutral-100 flex items-center justify-between gap-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-700">
                  Draft
                </p>
                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  {saving ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" /> Saving…
                    </>
                  ) : dirtyRef.current ? (
                    <span>Editing…</span>
                  ) : (
                    <>
                      <i className="ri-cloud-line" /> Saved
                    </>
                  )}
                </div>
              </div>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`# Your title here\n\nStart writing the opening paragraph that names the problem and previews the solution…\n\n## First section heading\n\nBody copy here. Use markdown — \`#\` for headings, \`![alt](url)\` for images, blank lines between paragraphs.`}
                className="w-full min-h-[60vh] resize-y px-6 py-5 text-[14px] leading-relaxed text-neutral-800 placeholder-neutral-300 focus:outline-none font-mono"
                spellCheck
              />
            </div>
          </section>

          {/* RIGHT: terms, questions, facts */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                  Important terms
                </p>
                <div className="flex items-center gap-1">
                  {(["all", "missing", "ok", "over"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setActiveTermFilter(f)}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize transition-colors cursor-pointer ${
                        activeTermFilter === f
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-500 hover:bg-neutral-100"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              {filteredTermChecks.length === 0 ? (
                <p className="text-[12px] text-neutral-400 italic px-3 py-2">
                  No terms match the filter.
                </p>
              ) : (
                <ul className="max-h-80 overflow-y-auto -mx-2">
                  {filteredTermChecks.map((t) => (
                    <TermRow
                      key={t.term}
                      term={t.term}
                      status={t.status}
                      value={t.value}
                      min={t.min}
                      max={t.max}
                    />
                  ))}
                </ul>
              )}
            </div>

            {brief.questions?.length ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-3">
                  Questions to answer
                </p>
                <ul className="space-y-2">
                  {brief.questions.map((q) => (
                    <QuestionRow
                      key={q}
                      question={q}
                      mentioned={countTermOccurrences(draft, q.replace(/[?!.]+$/g, "")) > 0}
                      onInsert={() => insertText(`## ${q}\n\n`)}
                    />
                  ))}
                </ul>
              </div>
            ) : null}

            {brief.facts?.length ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-3">
                  Facts to include
                </p>
                <div className="space-y-4">
                  {brief.facts.map((g) => (
                    <div key={g.topic}>
                      <p className="text-[12px] font-bold text-neutral-700 mb-1.5">{g.topic}</p>
                      <ul className="space-y-1.5">
                        {g.points.map((p, idx) => (
                          <li
                            key={idx}
                            className="text-[12px] text-neutral-600 leading-relaxed flex items-start gap-2"
                          >
                            <i className="ri-checkbox-blank-circle-line text-[8px] mt-1.5 text-neutral-300 shrink-0" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="font-mono text-neutral-900">{value}</span>
    </div>
  );
}

function QuestionRow({
  question,
  mentioned,
  onInsert,
}: {
  question: string;
  mentioned: boolean;
  onInsert: () => void;
}) {
  return (
    <li className="flex items-start gap-2 group">
      <i
        className={`mt-0.5 text-[14px] shrink-0 ${
          mentioned ? "ri-checkbox-circle-fill text-emerald-500" : "ri-circle-line text-neutral-300"
        }`}
      />
      <span className="text-[12px] text-neutral-600 leading-relaxed flex-1">{question}</span>
      <button
        type="button"
        onClick={onInsert}
        title="Insert as H2 heading"
        className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded text-neutral-500 hover:bg-neutral-100"
      >
        +H2
      </button>
    </li>
  );
}

function StructureGrid({
  structure,
  checks,
}: {
  structure: SeoBriefStructure;
  checks: { key: string; status: RangeStatus; value: number; min: number; max: number | null }[];
}) {
  const map = new Map(checks.map((c) => [c.key, c]));
  const rows: { key: string; label: string; min: number; max: number | null }[] = [
    { key: "words", label: "Words", min: structure.words.min, max: structure.words.max },
    {
      key: "characters",
      label: "Characters",
      min: structure.characters.min,
      max: structure.characters.max,
    },
    { key: "headings", label: "Headings", min: structure.headings.min, max: structure.headings.max },
    {
      key: "paragraphs",
      label: "Paragraphs",
      min: structure.paragraphs.min,
      max: structure.paragraphs.max,
    },
    { key: "images", label: "Images", min: structure.images.min, max: structure.images.max },
  ];
  return (
    <div className="space-y-0.5">
      {rows.map((r) => {
        const c = map.get(r.key);
        return (
          <StructureRow
            key={r.key}
            label={r.label}
            value={c?.value ?? 0}
            min={r.min}
            max={r.max}
            status={c?.status ?? "empty"}
          />
        );
      })}
    </div>
  );
}

/* unused type re-exports — silence isolatedModules complaints */
export type { SeoBriefRow, SeoBriefTerm };
