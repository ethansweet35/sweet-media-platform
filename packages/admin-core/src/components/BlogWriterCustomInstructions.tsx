"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useContentEditors } from "../hooks/useContentEditors";
import { formatContentEditorBrief } from "../lib/formatContentEditorBrief";
import { readInstructionTextFile } from "../lib/readInstructionTextFile";
import {
  ADMIN_ACCENT,
  ADMIN_BORDER,
  ADMIN_NAVY,
  ADMIN_TEXT,
  ADMIN_TEXT_MUTED,
  adminFontSans,
  adminInputCls,
} from "../lib/adminTheme";
import type { ContentEditorListRow } from "../types/content-editor";

export type InstructionSource = "manual" | "file" | "editor";

interface BlogWriterCustomInstructionsProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  /** Pre-select a content editor from ?content_editor_id= */
  initialEditorId?: string | null;
  onEditorLinked?: (editor: ContentEditorListRow, briefText: string) => void;
}

interface ContentEditorApiState {
  ok: boolean;
  editor: ContentEditorListRow & {
    recommended_word_count_min?: number | null;
    recommended_word_count_max?: number | null;
    recommended_word_count_target?: number | null;
    recommended_h2_min?: number | null;
    recommended_h2_max?: number | null;
    target_score?: number | null;
    competitor_avg_score?: number | null;
  };
  terms?: Parameters<typeof formatContentEditorBrief>[0]["terms"];
  questions?: Parameters<typeof formatContentEditorBrief>[0]["questions"];
  facts?: Parameters<typeof formatContentEditorBrief>[0]["facts"];
  outline?: Parameters<typeof formatContentEditorBrief>[0]["outline"];
  error?: string;
}

export default function BlogWriterCustomInstructions({
  value,
  onChange,
  disabled,
  initialEditorId,
  onEditorLinked,
}: BlogWriterCustomInstructionsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { rows: editors, loading: editorsLoading } = useContentEditors();

  const [source, setSource] = useState<InstructionSource>("manual");
  const [fileName, setFileName] = useState<string | null>(null);
  const [linkedEditorId, setLinkedEditorId] = useState<string | null>(null);
  const [linkedEditorLabel, setLinkedEditorLabel] = useState<string | null>(null);
  const [selectedEditorId, setSelectedEditorId] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readyEditors = editors.filter((e) => e.status === "ready");

  const applyText = useCallback(
    (text: string, meta: { source: InstructionSource; fileName?: string | null; editorId?: string | null; editorLabel?: string | null }) => {
      onChange(text);
      setSource(meta.source);
      setFileName(meta.fileName ?? null);
      setLinkedEditorId(meta.editorId ?? null);
      setLinkedEditorLabel(meta.editorLabel ?? null);
      setError(null);
    },
    [onChange],
  );

  const loadFromFile = useCallback(
    async (file: File) => {
      setBusy(true);
      setError(null);
      try {
        const text = await readInstructionTextFile(file);
        applyText(text, { source: "file", fileName: file.name });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not read file.");
      } finally {
        setBusy(false);
      }
    },
    [applyText],
  );

  const syncFromEditor = useCallback(
    async (editorId: string) => {
      if (!editorId) return;
      setBusy(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/content-editor/${editorId}`);
        const json = (await res.json()) as ContentEditorApiState;
        if (!res.ok || !json.ok) {
          throw new Error(json.error ?? "Failed to load content editor.");
        }
        if (json.editor.status !== "ready") {
          throw new Error(
            `Brief is still processing (${json.editor.status.replace(/_/g, " ")}). Open the editor and try again when status is Ready.`,
          );
        }
        const brief = formatContentEditorBrief({
          editor: json.editor,
          terms: json.terms,
          questions: json.questions,
          facts: json.facts,
          outline: json.outline,
        });
        const label = json.editor.primary_keyword;
        applyText(brief, {
          source: "editor",
          editorId,
          editorLabel: label,
        });
        onEditorLinked?.(json.editor, brief);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not sync content editor.");
      } finally {
        setBusy(false);
      }
    },
    [applyText, onEditorLinked],
  );

  useEffect(() => {
    if (!initialEditorId || linkedEditorId === initialEditorId) return;
    void syncFromEditor(initialEditorId);
  }, [initialEditorId, linkedEditorId, syncFromEditor]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled || busy) return;
    const file = e.dataTransfer.files?.[0];
    if (file) void loadFromFile(file);
  };

  const clearSource = () => {
    applyText("", { source: "manual" });
    setSelectedEditorId("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={adminFontSans}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
        <label className="block text-sm font-medium" style={{ color: ADMIN_TEXT }}>
          Custom instructions
        </label>
        {(fileName || linkedEditorLabel || value.trim()) && !disabled ? (
          <button
            type="button"
            onClick={clearSource}
            className="text-[11px] font-semibold hover:underline cursor-pointer"
            style={{ color: ADMIN_TEXT_MUTED }}
          >
            Clear
          </button>
        ) : null}
      </div>

      {/* Source badges */}
      {source === "file" && fileName ? (
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800">
          <i className="ri-file-text-line" />
          {fileName}
        </div>
      ) : null}
      {source === "editor" && linkedEditorId && linkedEditorLabel ? (
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ backgroundColor: ADMIN_NAVY }}>
            <i className="ri-quill-pen-fill" />
            Content Editor · {linkedEditorLabel}
          </span>
          <Link
            href={`/admin/content-editor/${linkedEditorId}`}
            className="text-[11px] font-semibold hover:underline"
            style={{ color: ADMIN_ACCENT }}
          >
            Open brief
          </Link>
        </div>
      ) : null}

      {/* Drop zone + textarea */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled && !busy) setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`rounded-xl border-2 border-dashed transition-colors ${
          dragOver ? "border-[#7B9FD4] bg-[#7B9FD4]/8" : ""
        }`}
        style={{ borderColor: dragOver ? ADMIN_ACCENT : ADMIN_BORDER }}
      >
        <textarea
          rows={5}
          value={value}
          disabled={disabled || busy}
          placeholder="Angles, sources, emphasis… or drop a .txt brief here"
          onChange={(ev) => {
            setSource("manual");
            setFileName(null);
            setLinkedEditorId(null);
            setLinkedEditorLabel(null);
            onChange(ev.target.value);
          }}
          className={`${adminInputCls} resize-y min-h-[6rem] border-0 rounded-xl focus:ring-0`}
        />
        <div
          className="flex flex-wrap items-center justify-between gap-2 border-t px-3 py-2.5"
          style={{ borderColor: ADMIN_BORDER, backgroundColor: "#F4F7FB" }}
        >
          <p className="text-[11px]" style={{ color: ADMIN_TEXT_MUTED }}>
            Drop a <strong>.txt</strong> file or import from Content Editor
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={disabled || busy}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-1.5 text-[11px] font-semibold transition-colors hover:bg-white/80 disabled:opacity-50 cursor-pointer"
              style={{ borderColor: ADMIN_BORDER, color: ADMIN_NAVY }}
            >
              <i className="ri-upload-2-line" />
              Upload .txt
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,text/plain"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void loadFromFile(file);
              }}
            />
          </div>
        </div>
      </div>

      {/* Content Editor sync */}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1 min-w-0">
          <label className="block text-[11px] font-semibold uppercase tracking-wide mb-1.5" style={{ color: ADMIN_TEXT_MUTED }}>
            Sync from Content Editor
          </label>
          <select
            value={selectedEditorId}
            disabled={disabled || busy || editorsLoading}
            onChange={(e) => setSelectedEditorId(e.target.value)}
            className={adminInputCls}
          >
            <option value="">
              {editorsLoading
                ? "Loading editors…"
                : readyEditors.length === 0
                  ? "No ready briefs — create one in Content Editor"
                  : "Select a ready brief…"}
            </option>
            {readyEditors.map((ed) => (
              <option key={ed.id} value={ed.id}>
                {ed.primary_keyword}
                {ed.current_content_score != null ? ` · score ${Math.round(ed.current_content_score)}` : ""}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          disabled={disabled || busy || !selectedEditorId}
          onClick={() => void syncFromEditor(selectedEditorId)}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          style={{ backgroundColor: ADMIN_NAVY }}
        >
          {busy ? (
            <i className="ri-loader-4-line animate-spin" />
          ) : (
            <i className="ri-link" />
          )}
          Sync brief
        </button>
      </div>

      {error ? (
        <p className="mt-2 text-[12px] text-red-600">{error}</p>
      ) : (
        <p className="mt-2 text-[11px] leading-relaxed" style={{ color: ADMIN_TEXT_MUTED }}>
          Imported briefs include outline, NLP terms, questions, and facts from the Content Editor pipeline.
        </p>
      )}
    </div>
  );
}
