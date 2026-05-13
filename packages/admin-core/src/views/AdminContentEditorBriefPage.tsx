"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AdminPageHeader from "../components/AdminPageHeader";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import {
  useContentEditor,
  useDraftAutosave,
  useLiveScore,
  type DraftInputs,
} from "../hooks/useContentEditors";
import {
  EEAT_CHECK_LABELS,
  STATUS_IS_PROCESSING,
  STATUS_LABELS,
  type ContentEditorFactRow,
  type ContentEditorQuestionRow,
  type ContentEditorTermRow,
  type EeatBreakdown,
  type ScoreBreakdown,
  type StructuralCheck,
  type TermUsage,
} from "../types/content-editor";

interface Props {
  briefId?: string;
}

function scoreColor(score: number): string {
  if (score >= 75) return "#0e9f6e"; // emerald
  if (score >= 50) return "#d97706"; // amber
  if (score > 0) return "#ea580c"; // orange
  return "#a3a3a3"; // neutral
}

function statusColor(status: TermUsage["status"]): string {
  switch (status) {
    case "good": return "text-emerald-600";
    case "under": return "text-orange-500";
    case "over": return "text-rose-500";
    case "missing":
    default: return "text-neutral-300";
  }
}

function statusIcon(status: TermUsage["status"]): string {
  switch (status) {
    case "good": return "ri-checkbox-circle-fill";
    case "under": return "ri-arrow-down-circle-line";
    case "over": return "ri-error-warning-line";
    case "missing":
    default: return "ri-circle-line";
  }
}

function structuralColor(status: StructuralCheck["status"]): string {
  switch (status) {
    case "good": return "text-emerald-600";
    case "under": return "text-orange-500";
    case "over": return "text-rose-500";
    case "missing":
    default: return "text-neutral-300";
  }
}

function structuralIcon(status: StructuralCheck["status"]): string {
  switch (status) {
    case "good": return "ri-checkbox-circle-fill";
    case "under": return "ri-arrow-down-circle-line";
    case "over": return "ri-error-warning-line";
    case "missing":
    default: return "ri-circle-line";
  }
}

function ScoreRing({ score, label, size = 80 }: { score: number; label?: string; size?: number }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, score));
  const offset = circumference - (clamped / 100) * circumference;
  const color = scoreColor(score);
  const cx = size / 2;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cx} r={radius} stroke="#f1f1f1" strokeWidth={6} fill="none" />
        <circle
          cx={cx}
          cy={cx}
          r={radius}
          stroke={color}
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cx})`}
          style={{ transition: "stroke-dashoffset 0.4s ease, stroke 0.4s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span
          className="font-bold tracking-tight"
          style={{
            color,
            fontSize: Math.round(size * (label ? 0.26 : 0.32)),
            lineHeight: 1,
          }}
        >
          {Math.round(score)}
        </span>
        {label ? (
          <span
            className="uppercase text-neutral-400 font-semibold"
            style={{
              fontSize: Math.max(6, Math.round(size * 0.08)),
              letterSpacing: "0.08em",
              lineHeight: 1,
              marginTop: Math.round(size * 0.04),
            }}
          >
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function TermsList({
  terms,
  termUsage,
  filter,
}: {
  terms: ContentEditorTermRow[];
  termUsage: TermUsage[];
  filter: "all" | "missing" | "good" | "over";
}) {
  const usageMap = useMemo(() => {
    const m = new Map<string, TermUsage>();
    for (const u of termUsage) m.set(u.term.toLowerCase(), u);
    return m;
  }, [termUsage]);

  const filtered = terms.filter((t) => {
    if (t.user_blacklisted) return false;
    const usage = usageMap.get(t.term.toLowerCase());
    const status = usage?.status ?? "missing";
    if (filter === "all") return true;
    if (filter === "missing") return status === "missing" || status === "under";
    if (filter === "good") return status === "good";
    if (filter === "over") return status === "over";
    return true;
  });

  if (!filtered.length) {
    return <p className="text-[12px] text-neutral-400 italic px-3 py-2">No terms match the filter.</p>;
  }

  return (
    <ul className="max-h-96 overflow-y-auto -mx-2">
      {filtered.map((t) => {
        const usage = usageMap.get(t.term.toLowerCase());
        const status: TermUsage["status"] = usage?.status ?? "missing";
        const value = usage?.occurrences ?? 0;
        return (
          <li
            key={t.id}
            className="flex items-center justify-between gap-3 py-1.5 px-3 rounded-lg hover:bg-neutral-50 transition-colors"
            title={t.is_heading_recommended ? "Recommended for a heading" : undefined}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              {t.is_primary_keyword ? (
                <i className="ri-star-fill text-amber-500 text-[10px] shrink-0" />
              ) : null}
              <span className="text-[12px] text-neutral-700 truncate">{t.term}</span>
              {t.is_heading_recommended ? (
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider shrink-0">H</span>
              ) : null}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`font-mono text-[11px] ${statusColor(status)}`}>{value}</span>
              <span className="text-[10px] text-neutral-400 font-mono">
                /{t.min_recommended_uses}–{t.max_recommended_uses}
              </span>
              <i className={`${statusIcon(status)} text-sm ${statusColor(status)}`} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function StructuralPanel({
  checks,
  score,
}: {
  checks: StructuralCheck[];
  score: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
          Content structure
        </p>
        <span className="text-[11px] font-bold" style={{ color: scoreColor(score) }}>
          {Math.round(score)}/100
        </span>
      </div>
      <div className="space-y-1.5">
        {checks.map((c) => (
          <div key={c.key} className="flex items-center justify-between text-[12px]">
            <span className="text-neutral-600 capitalize">{c.key.replace(/_/g, " ")}</span>
            <div className="flex items-center gap-2">
              <span className={`font-mono text-[12px] ${structuralColor(c.status)}`}>{c.value}</span>
              <span className="text-[11px] text-neutral-400 font-mono">/{c.min}–{c.max}</span>
              <i className={`${structuralIcon(c.status)} text-base ${structuralColor(c.status)}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionsPanel({ questions, score }: { questions: ContentEditorQuestionRow[]; score: number | undefined }) {
  if (!questions.length) return null;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
          Questions to answer
          <span className="ml-1.5 text-neutral-300 normal-case font-normal tracking-normal">
            ({questions.length})
          </span>
        </p>
        {score != null ? (
          <span className="text-[11px] font-bold" style={{ color: scoreColor(score) }}>
            {Math.round(score)}/100
          </span>
        ) : null}
      </div>
      <ul className="space-y-2 max-h-72 overflow-y-auto">
        {questions.slice(0, 30).map((q) => (
          <li key={q.id} className="text-[12px] text-neutral-600 leading-relaxed flex items-start gap-2">
            <i className="ri-question-line text-[12px] mt-0.5 text-neutral-300 shrink-0" />
            <span>{q.question}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FactsPanel({ facts }: { facts: ContentEditorFactRow[] }) {
  if (!facts.length) return null;

  // Group by topic_cluster
  const grouped = facts.reduce<Record<string, ContentEditorFactRow[]>>((acc, f) => {
    const key = f.topic_cluster ?? "General";
    if (!acc[key]) acc[key] = [];
    acc[key].push(f);
    return acc;
  }, {});

  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-3">
        Facts to include
        <span className="ml-1.5 text-neutral-300 normal-case font-normal tracking-normal">
          ({facts.length})
        </span>
      </p>
      <div className="space-y-4 max-h-[28rem] overflow-y-auto">
        {Object.entries(grouped).map(([topic, group]) => (
          <div key={topic}>
            <p className="text-[11px] font-bold text-neutral-700 mb-1.5">{topic}</p>
            <ul className="space-y-1.5">
              {group.map((f) => (
                <li
                  key={f.id}
                  className="text-[12px] text-neutral-600 leading-relaxed flex items-start gap-2"
                  title={`${f.source_count} source(s) — ${f.source_domain}`}
                >
                  <span
                    className="mt-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px] font-bold shrink-0"
                    style={{
                      backgroundColor: f.source_count >= 2 ? "#ecfdf5" : "#f5f5f5",
                      color: f.source_count >= 2 ? "#047857" : "#737373",
                    }}
                  >
                    {f.source_count}
                  </span>
                  <span>{f.fact_text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function EeatPanel({ eeat }: { eeat: EeatBreakdown }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
            E-E-A-T (YMYL)
          </p>
          <p className="text-[10px] text-neutral-400 mt-0.5">
            Expertise · Authoritativeness · Trustworthiness
          </p>
        </div>
        <span className="text-[14px] font-bold" style={{ color: scoreColor(eeat.score) }}>
          {Math.round(eeat.score)}/100
        </span>
      </div>
      <ul className="space-y-1.5">
        {eeat.checks.map((c) => (
          <li
            key={c.key}
            className="flex items-start justify-between gap-2 text-[12px]"
            title={c.detail}
          >
            <span className={`flex items-center gap-1.5 ${c.passed ? "text-neutral-700" : "text-neutral-400"}`}>
              <i
                className={
                  c.passed
                    ? "ri-checkbox-circle-fill text-emerald-500 text-sm"
                    : "ri-close-circle-line text-neutral-300 text-sm"
                }
              />
              {EEAT_CHECK_LABELS[c.key]}
            </span>
            <span className={`text-[10px] font-mono ${c.passed ? "text-emerald-600" : "text-neutral-300"}`}>
              {c.passed ? `+${c.weight}` : `−${c.weight}`}
            </span>
          </li>
        ))}
      </ul>
      {eeat.authoritative_citation_count > 0 ? (
        <p className="mt-3 pt-3 border-t border-neutral-100 text-[10px] text-neutral-400 leading-relaxed">
          <span className="font-bold text-emerald-700">{eeat.authoritative_citation_count}</span> unique
          authoritative source{eeat.authoritative_citation_count === 1 ? "" : "s"} cited (.gov, .edu, SAMHSA, NIH, Mayo, etc.)
        </p>
      ) : (
        <p className="mt-3 pt-3 border-t border-neutral-100 text-[10px] text-neutral-400 leading-relaxed">
          Link to .gov, .edu, samhsa.gov, nih.gov, apa.org, or mayoclinic.org to boost authority.
        </p>
      )}
    </div>
  );
}

function CompetitorsPanel({ competitors }: { competitors: { id: string; serp_position: number; url: string; domain: string; word_count: number | null; individual_content_score: number | null; included_in_benchmark: boolean }[] }) {
  if (!competitors.length) return null;
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-3">
        Competitors analyzed
      </p>
      <ul className="space-y-1.5 max-h-64 overflow-y-auto -mx-2">
        {competitors.map((c) => (
          <li
            key={c.id}
            className="px-3 py-1.5 rounded-lg hover:bg-neutral-50 flex items-center justify-between gap-2"
          >
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-neutral-600 hover:text-[#3d6f7f] flex items-center gap-1.5 min-w-0"
            >
              <span className="font-mono text-neutral-300 shrink-0">#{c.serp_position}</span>
              <span className="truncate">{c.domain}</span>
              <i className="ri-external-link-line text-[10px] shrink-0 opacity-50" />
            </a>
            <div className="flex items-center gap-2 shrink-0">
              {c.word_count ? (
                <span className="text-[10px] text-neutral-400 font-mono">{c.word_count}w</span>
              ) : null}
              {c.individual_content_score != null ? (
                <span
                  className="text-[10px] font-bold font-mono"
                  style={{ color: scoreColor(c.individual_content_score) }}
                >
                  {Math.round(c.individual_content_score)}
                </span>
              ) : null}
              {!c.included_in_benchmark ? (
                <i className="ri-eye-off-line text-[10px] text-neutral-300" title="Excluded from benchmark" />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Auto-Optimize helpers ────────────────────────────────────────────────────

function buildSeoGuidelines(
  editor: { primary_keyword: string; recommended_word_count_min?: number | null; recommended_word_count_max?: number | null; recommended_word_count_target?: number | null; recommended_h2_count?: number | null; recommended_h3_count?: number | null },
  terms: ContentEditorTermRow[],
  questions: ContentEditorQuestionRow[],
  facts: ContentEditorFactRow[],
): string {
  const lines: string[] = [];

  lines.push(`# CONTENT BRIEF — STRICT REQUIREMENTS`);
  lines.push(``);
  lines.push(`This brief was generated by analyzing the top-ranking competitor pages for "${editor.primary_keyword}". Every requirement below is MANDATORY. The article will be automatically scored against this brief — coverage of these terms, questions, and facts directly determines the content score.`);
  lines.push(``);

  // ── Structural targets ─────────────────────────────────────────────
  const wMin = editor.recommended_word_count_min;
  const wMax = editor.recommended_word_count_max;
  const wTarget = editor.recommended_word_count_target ?? (wMin && wMax ? Math.round((wMin + wMax) / 2) : null);
  if (wTarget) {
    lines.push(`## STRUCTURAL TARGETS (mandatory)`);
    lines.push(`- Word count: ${wMin ?? "?"}–${wMax ?? "?"} words. Aim for ~${wTarget}.`);
    if (editor.recommended_h2_count) lines.push(`- H2 headings: ~${editor.recommended_h2_count}`);
    if (editor.recommended_h3_count) lines.push(`- H3 headings: ~${editor.recommended_h3_count}`);
    lines.push(``);
  }

  // ── Terms ──────────────────────────────────────────────────────────
  const sorted = [...terms]
    .filter((t) => !t.user_blacklisted)
    .sort((a, b) => (b.relevance_score ?? 0) - (a.relevance_score ?? 0));
  const topTerms = sorted.slice(0, 50);
  if (topTerms.length) {
    lines.push(`## NLP TERMS — USE EVERY ONE OF THESE (mandatory)`);
    lines.push(``);
    lines.push(`Each term below MUST appear in the article at least the minimum number of times listed. The minimum is calibrated against what competitors do — falling short on any term will hurt the content score.`);
    lines.push(``);
    lines.push(`Treat this as a checklist. Before finishing, verify every term is used at least its minimum count.`);
    lines.push(``);
    let idx = 1;
    for (const t of topTerms) {
      const minU = t.min_recommended_uses ?? 1;
      const maxU = t.max_recommended_uses ?? minU * 2;
      const headingNote = t.is_heading_recommended ? " — USE AS A HEADING" : "";
      lines.push(`${idx}. "${t.term}" → use ${minU}–${maxU} times${headingNote}`);
      idx++;
    }
    lines.push(``);
  }

  // ── Questions ──────────────────────────────────────────────────────
  const activeQuestions = questions.filter((q) => !q.user_dismissed).slice(0, 15);
  if (activeQuestions.length) {
    lines.push(`## QUESTIONS — ANSWER EVERY ONE OF THESE (mandatory)`);
    lines.push(``);
    lines.push(`The article MUST answer every question below — either as a dedicated H3 in the FAQ section near the end, or organically in body sections. Use the question text directly as the heading.`);
    lines.push(``);
    let idx = 1;
    for (const q of activeQuestions) {
      lines.push(`${idx}. ${q.question}`);
      idx++;
    }
    lines.push(``);
  }

  // ── Facts ──────────────────────────────────────────────────────────
  const topFacts = facts.filter((f) => !f.user_dismissed).slice(0, 20);
  if (topFacts.length) {
    lines.push(`## FACTS — INCORPORATE EVERY ONE OF THESE (mandatory)`);
    lines.push(``);
    lines.push(`The article MUST cover every fact below. Paraphrase each one into prose — do NOT copy verbatim. Distribute them naturally across the article (intro, body sections, FAQ answers, conclusion). Missing facts will hurt the AI-search readiness score.`);
    lines.push(``);
    let idx = 1;
    for (const f of topFacts) {
      lines.push(`${idx}. ${f.fact_text}`);
      idx++;
    }
    lines.push(``);
  }

  lines.push(`## FINAL VERIFICATION`);
  lines.push(``);
  lines.push(`Before returning your output, mentally check off this list:`);
  lines.push(`- [ ] Every NLP term above appears at least its minimum count`);
  lines.push(`- [ ] Every question above is answered in the article`);
  lines.push(`- [ ] Every fact above is paraphrased into the article`);
  lines.push(`- [ ] Word count is within the structural target range`);
  lines.push(`- [ ] The primary keyword appears in title, meta description, first paragraph, and at least one H2`);

  return lines.join("\n").trim();
}

interface ContentBlock {
  type: string;
  text?: string;
  items?: string[];
  variant?: string;
  stats?: { value: string; label: string }[];
  tableHeaders?: string[];
  tableRows?: string[][];
}

function blocksToMarkdown(blocks: ContentBlock[]): string {
  const parts: string[] = [];
  for (const b of blocks) {
    switch (b.type) {
      case "h1": parts.push(`# ${b.text ?? ""}\n`); break;
      case "h2": parts.push(`## ${b.text ?? ""}\n`); break;
      case "h3": parts.push(`### ${b.text ?? ""}\n`); break;
      case "h4": parts.push(`#### ${b.text ?? ""}\n`); break;
      case "paragraph": parts.push(`${b.text ?? ""}\n`); break;
      case "pullquote": parts.push(`> ${b.text ?? ""}\n`); break;
      case "callout": parts.push(`> **${b.variant ? b.variant.toUpperCase() + ": " : ""}**${b.text ?? ""}\n`); break;
      case "divider": parts.push(`---\n`); break;
      case "list":
        if (b.items?.length) parts.push(b.items.map((i) => `- ${i}`).join("\n") + "\n");
        break;
      case "numbered":
        if (b.items?.length) parts.push(b.items.map((i, idx) => `${idx + 1}. ${i}`).join("\n") + "\n");
        break;
      case "stat-row":
        if (b.stats?.length) {
          parts.push(b.stats.map((s) => `**${s.value}** — ${s.label}`).join(" | ") + "\n");
        }
        break;
      case "table":
        if (b.tableHeaders?.length) {
          parts.push("| " + b.tableHeaders.join(" | ") + " |");
          parts.push("|" + b.tableHeaders.map(() => " --- ").join("|") + "|");
          for (const row of b.tableRows ?? []) {
            parts.push("| " + row.join(" | ") + " |");
          }
          parts.push("");
        }
        break;
    }
  }
  return parts.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

// ────────────────────────────────────────────────────────────────────────────

export default function AdminContentEditorBriefPage({ briefId: briefIdProp }: Props = {}) {
  const params = useParams();
  const rawId = params?.id;
  const idFromRoute = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : undefined;
  const editorId = briefIdProp ?? idFromRoute ?? null;

  const { state, loading, error, rerun, refresh } = useContentEditor(editorId);

  const [drafts, setDrafts] = useState<DraftInputs>({
    titleTag: "",
    metaDescription: "",
    h1Text: "",
    bodyMarkdown: "",
  });
  const [filter, setFilter] = useState<"all" | "missing" | "good" | "over">("all");
  const [factCoverageEnabled, setFactCoverageEnabled] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [optimizeError, setOptimizeError] = useState<string | null>(null);

  // Hydrate draft from server when state loads / changes.
  useEffect(() => {
    if (!state?.currentDraft) return;
    setDrafts({
      titleTag: state.currentDraft.title_tag ?? "",
      metaDescription: state.currentDraft.meta_description ?? "",
      h1Text: state.currentDraft.h1_text ?? "",
      bodyMarkdown: state.currentDraft.body_markdown ?? "",
    });
  }, [state?.currentDraft]);

  const { score, scoring } = useLiveScore(drafts, {
    editorId,
    includeFactCoverage: factCoverageEnabled,
    debounceMs: 1200,
  });
  const { saving, saved } = useDraftAutosave(drafts, editorId, 4000);

  async function handleAutoOptimize() {
    if (!state) return;
    const { editor, terms, questions, facts } = state;
    const confirmed = window.confirm(
      "Auto-Optimize will replace your current draft with an AI-written version optimized against this brief. Continue?",
    );
    if (!confirmed) return;
    setOptimizing(true);
    setOptimizeError(null);
    try {
      const wTarget =
        editor.recommended_word_count_target ??
        (Math.round(((editor.recommended_word_count_min ?? 0) + (editor.recommended_word_count_max ?? 0)) / 2) || 2000);
      const guidelines = buildSeoGuidelines(editor, terms, questions, facts);
      const res = await fetch("/api/admin/rewrite-blog-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: editor.primary_keyword,
          primaryKeyword: editor.primary_keyword,
          targetWordCount: wTarget,
          seoGuidelines: guidelines,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        title?: string;
        metaDescription?: string;
        content?: ContentBlock[];
      };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Auto-Optimize failed.");
      const markdown = blocksToMarkdown(data.content ?? []);
      setDrafts({
        titleTag: data.title ?? drafts.titleTag,
        metaDescription: data.metaDescription ?? drafts.metaDescription,
        h1Text: data.title ?? drafts.h1Text,
        bodyMarkdown: markdown,
      });
    } catch (err) {
      setOptimizeError(String(err));
    } finally {
      setOptimizing(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-sm text-neutral-500">
        <i className="ri-loader-4-line animate-spin mr-2" /> Loading editor…
      </div>
    );
  }

  if (!state || error) {
    return (
      <div className="mx-auto max-w-screen-md py-16 text-center">
        <i className="ri-error-warning-line text-4xl text-neutral-300" />
        <p className="mt-4 text-sm text-neutral-700">{error ?? "Editor not found."}</p>
        <Link
          href="/admin/content-editor"
          className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-200 text-[12px] font-semibold text-neutral-700 hover:border-neutral-400"
        >
          <i className="ri-arrow-left-line" /> Back to editors
        </Link>
      </div>
    );
  }

  const { editor, competitors, terms, questions, facts } = state;
  const processing = STATUS_IS_PROCESSING[editor.status];

  // Build a structural-targets display block from editor's recommended_* fields.
  const wordTarget = editor.recommended_word_count_target ??
    Math.round(((editor.recommended_word_count_min ?? 0) + (editor.recommended_word_count_max ?? 0)) / 2);

  return (
    <div>
      <AdminPageHeader
        title={editor.primary_keyword}
        subtitle={
          processing
            ? STATUS_LABELS[editor.status] + "…"
            : editor.status === "failed"
              ? "Pipeline failed — view error below"
              : "Live-scored against the top-ranking competitors. Edits autosave."
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void handleAutoOptimize()}
              disabled={optimizing || processing}
              className="px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] bg-[#3d6f7f] text-white hover:bg-[#2f5a6b] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              title="Generate a fully-optimized draft from this brief using AI"
            >
              {optimizing ? (
                <><i className="ri-loader-4-line animate-spin" /> Optimizing…</>
              ) : (
                <><i className="ri-magic-line" /> Auto-Optimize</>
              )}
            </button>
            <button
              type="button"
              onClick={() => void rerun()}
              className="px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400"
            >
              <i className="ri-refresh-line mr-1" /> Re-run
            </button>
            <Link
              href="/admin/content-editor"
              className="px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] border border-neutral-200 text-neutral-700 hover:border-neutral-400"
            >
              <i className="ri-arrow-left-line mr-1" /> Editors
            </Link>
          </div>
        }
      />

      {optimizeError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
          <i className="ri-error-warning-line text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-red-900">Auto-Optimize failed</p>
            <p className="mt-0.5 text-[11px] text-red-700">{optimizeError}</p>
          </div>
          <button
            type="button"
            onClick={() => setOptimizeError(null)}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            <i className="ri-close-line" />
          </button>
        </div>
      ) : null}

      {processing ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 flex items-center gap-4">
          <i className="ri-loader-4-line animate-spin text-2xl text-amber-700" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-900">
              {STATUS_LABELS[editor.status]}…
            </p>
            <p className="mt-0.5 text-[12px] text-amber-700">
              {editor.status_message ?? "This usually takes 90–180 seconds. The page auto-refreshes."}
            </p>
          </div>
        </div>
      ) : editor.status === "failed" ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-semibold text-red-900">Pipeline failed.</p>
          <p className="mt-1 text-[12px] text-red-700 whitespace-pre-wrap">
            {editor.error ?? "Unknown error."}
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
        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_320px] gap-6">
          {/* LEFT: score, structure, competitors */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <ScoreRing score={score?.content_score ?? 0} label="Content" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                    Content score
                  </p>
                  <p className="mt-1 text-[13px] text-neutral-700">
                    Target: <span className="font-bold">{Math.round(editor.target_score ?? 0)}</span>
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-400">
                    Competitor avg: {Math.round(editor.competitor_avg_score ?? 0)}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400">Coverage</p>
                  <p className="text-[14px] font-mono font-bold text-neutral-700">{Math.round(score?.coverage_score ?? 0)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400">Freq</p>
                  <p className="text-[14px] font-mono font-bold text-neutral-700">{Math.round(score?.frequency_score ?? 0)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400">Place</p>
                  <p className="text-[14px] font-mono font-bold text-neutral-700">{Math.round(score?.placement_score ?? 0)}</p>
                </div>
              </div>
            </div>

            {/* AI Search score */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                  AI Search readiness
                </p>
                <button
                  type="button"
                  onClick={() => setFactCoverageEnabled((v) => !v)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${factCoverageEnabled ? "bg-emerald-50 text-emerald-700" : "text-neutral-400 hover:bg-neutral-100"}`}
                  title="Enable embedding-based fact coverage (~$0.001 per score)"
                >
                  {factCoverageEnabled ? "Facts: ON" : "Facts: OFF"}
                </button>
              </div>
              <div className="flex items-center gap-3">
                <ScoreRing
                  score={score?.ai_search_score ?? score?.citable_structure_score ?? 0}
                  label="AI"
                  size={64}
                />
                <div className="text-[11px] text-neutral-500 leading-relaxed">
                  {score?.question_coverage_score != null ? (
                    <p>Questions: <span className="font-mono font-bold">{Math.round(score.question_coverage_score)}</span></p>
                  ) : null}
                  {score?.citable_structure_score != null ? (
                    <p>Citable: <span className="font-mono font-bold">{Math.round(score.citable_structure_score)}</span></p>
                  ) : null}
                  {score?.fact_coverage_score != null ? (
                    <p>Facts: <span className="font-mono font-bold">{Math.round(score.fact_coverage_score)}</span></p>
                  ) : factCoverageEnabled ? (
                    <p className="text-neutral-300">Facts: scoring…</p>
                  ) : null}
                </div>
              </div>
            </div>

            {score?.structural_checks?.length ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <StructuralPanel
                  checks={score.structural_checks}
                  score={score.structural_alignment ?? 0}
                />
              </div>
            ) : null}

            {score?.eeat ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <EeatPanel eeat={score.eeat} />
              </div>
            ) : null}

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <CompetitorsPanel competitors={competitors} />
            </div>
          </aside>

          {/* CENTER: editor */}
          <section className="space-y-3">
            <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-neutral-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-1">
                    Title tag
                  </label>
                  <input
                    type="text"
                    value={drafts.titleTag}
                    onChange={(e) => setDrafts((d) => ({ ...d, titleTag: e.target.value }))}
                    placeholder="60-char SEO title…"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white focus:outline-none focus:border-[#3d6f7f]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-1">
                    H1
                  </label>
                  <input
                    type="text"
                    value={drafts.h1Text}
                    onChange={(e) => setDrafts((d) => ({ ...d, h1Text: e.target.value }))}
                    placeholder="The visible page headline…"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white focus:outline-none focus:border-[#3d6f7f]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-1">
                    Meta description
                  </label>
                  <input
                    type="text"
                    value={drafts.metaDescription}
                    onChange={(e) => setDrafts((d) => ({ ...d, metaDescription: e.target.value }))}
                    placeholder="150-160 char description…"
                    className="w-full px-3 py-2 text-sm border border-neutral-200 rounded-lg bg-white focus:outline-none focus:border-[#3d6f7f]"
                  />
                </div>
              </div>
              <div className="px-5 py-2.5 border-b border-neutral-100 flex items-center justify-between gap-3 text-[11px]">
                <p className="font-bold uppercase tracking-[0.12em] text-neutral-700">Draft</p>
                <div className="flex items-center gap-3 text-neutral-400">
                  <span>Words: <span className="font-mono font-bold text-neutral-700">
                    {drafts.bodyMarkdown.trim() ? drafts.bodyMarkdown.trim().split(/\s+/).filter(Boolean).length : 0}
                  </span> / {wordTarget}</span>
                  {scoring ? <span><i className="ri-loader-4-line animate-spin" /> Scoring</span> : null}
                  {saving ? <span><i className="ri-loader-4-line animate-spin" /> Saving</span> : saved ? <span><i className="ri-cloud-line" /> Saved</span> : null}
                </div>
              </div>
              <textarea
                value={drafts.bodyMarkdown}
                onChange={(e) => setDrafts((d) => ({ ...d, bodyMarkdown: e.target.value }))}
                placeholder={`# ${editor.primary_keyword}

Start writing the opening paragraph that names the problem and previews the solution…

## First section heading

Body copy here. Use markdown — \`#\` headings, \`![alt](url)\` images, \`-\` bullets.`}
                className="w-full min-h-[70vh] resize-y px-6 py-5 text-[14px] leading-relaxed text-neutral-800 placeholder-neutral-300 focus:outline-none font-mono"
                spellCheck
              />
            </div>

            {/* Placement checks */}
            {score?.placement_checks ? (
              <PlacementBar checks={score.placement_checks} />
            ) : null}
          </section>

          {/* RIGHT: terms, questions, facts */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                  Important terms
                  <span className="ml-1.5 text-neutral-300 normal-case font-normal tracking-normal">
                    ({terms.length})
                  </span>
                </p>
                <div className="flex items-center gap-1">
                  {(["all", "missing", "good", "over"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize transition-colors cursor-pointer ${
                        filter === f
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-500 hover:bg-neutral-100"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <TermsList terms={terms} termUsage={score?.term_usage ?? []} filter={filter} />
            </div>

            {questions.length > 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <QuestionsPanel
                  questions={questions.filter((q) => !q.user_dismissed)}
                  score={score?.question_coverage_score}
                />
              </div>
            ) : null}

            {facts.length > 0 ? (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <FactsPanel facts={facts.filter((f) => !f.user_dismissed)} />
              </div>
            ) : null}
          </aside>
        </div>
      )}

      {/* Hidden helper to keep refresh fn referenced (used by polling in hook) */}
      <button type="button" onClick={() => void refresh()} className="hidden">refresh</button>
    </div>
  );
}

function PlacementBar({ checks }: { checks: ScoreBreakdown["placement_checks"] }) {
  const items: Array<{ key: keyof ScoreBreakdown["placement_checks"]; label: string }> = [
    { key: "primary_kw_in_title", label: "Title" },
    { key: "primary_kw_in_h1", label: "H1" },
    { key: "primary_kw_in_meta", label: "Meta" },
    { key: "primary_kw_in_first_100", label: "First 100" },
    { key: "primary_kw_in_early_heading", label: "Early H2/H3" },
  ];
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm flex items-center gap-3 flex-wrap">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
        Primary keyword placement
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        {items.map((it) => {
          const ok = checks[it.key];
          return (
            <span
              key={it.key}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold ${
                ok ? "bg-emerald-50 text-emerald-700" : "bg-neutral-50 text-neutral-400"
              }`}
            >
              <i className={ok ? "ri-checkbox-circle-fill" : "ri-circle-line"} />
              {it.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
