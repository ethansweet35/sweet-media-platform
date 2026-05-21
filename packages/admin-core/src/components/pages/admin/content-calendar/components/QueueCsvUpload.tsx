"use client";

import { useCallback, useState } from "react";
import { ADMIN_OCEAN } from "../../../../../lib/adminTheme";
import type { BlogQueueItemInput } from "../../../../../types/blog-queue";

type RowPreview = {
  rowIndex: number;
  values: BlogQueueItemInput;
  valid: boolean;
  error?: string;
};

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let i = 0;
  let inQuotes = false;

  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (c === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (c === "\r") {
      i++;
      continue;
    }
    if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }
    field += c;
    i++;
  }

  row.push(field);
  const nonempty = row.some((cell) => cell.trim().length > 0);
  if (nonempty) rows.push(row);
  return rows;
}

function parseScheduleCell(raw: string): { ok: true; iso: string } | { ok: false; reason: string } {
  const t = raw.trim();
  if (!t) return { ok: false, reason: "scheduled_publish_at is required" };

  const ymdOnly = /^\d{4}-\d{2}-\d{2}$/;
  if (ymdOnly.test(t)) {
    const iso = `${t}T09:00:00.000Z`;
    const verify = Date.parse(iso);
    if (Number.isNaN(verify)) return { ok: false, reason: "invalid date value" };
    return { ok: true, iso };
  }

  const d = Date.parse(t);
  if (Number.isNaN(d)) {
    return { ok: false, reason: "use ISO 8601 or YYYY-MM-DD (9:00 UTC for date-only)" };
  }

  return { ok: true, iso: new Date(d).toISOString() };
}

const REQUIRED_HEADERS = [
  "primary_keyword",
  "blog_title",
  "url_slug",
  "writing_guidelines",
  "scheduled_publish_at",
] as const;

function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().replace(/\s+/g, "_");
}

function normalizeCsvSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function validateNormalizedSlug(slug: string): string | null {
  if (!slug) return "url_slug is required";
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
    ? null
    : "url_slug must use letters, digits, and single hyphens only";
}

interface QueueCsvUploadProps {
  batchModelId: string;
  createItems: (
    rows: BlogQueueItemInput[],
    opts?: { batchModelId?: string | null },
  ) => Promise<{ success: number; failed: number }>;
  notify: (message: string, kind: "success" | "error") => void;
}

export default function QueueCsvUpload({ batchModelId, createItems, notify }: QueueCsvUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previews, setPreviews] = useState<RowPreview[]>([]);
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setFileName(null);
    setPreviews([]);
  };

  const processText = useCallback((name: string | null, contents: string) => {
    setFileName(name);
    const rows = parseCsv(contents);
    if (rows.length < 2) {
      setPreviews([
        {
          rowIndex: 0,
          values: {
            primary_keyword: "",
            blog_title: "",
            url_slug: "",
            writing_guidelines: null,
            scheduled_publish_at: "",
          },
          valid: false,
          error: "CSV must include a header row and at least one data row.",
        },
      ]);
      return;
    }

    const headerCells = rows[0].map(normalizeHeader);
    const missing = REQUIRED_HEADERS.filter((h) => !headerCells.includes(h));

    if (missing.length > 0) {
      setPreviews([
        {
          rowIndex: 0,
          values: {
            primary_keyword: "",
            blog_title: "",
            url_slug: "",
            writing_guidelines: null,
            scheduled_publish_at: "",
          },
          valid: false,
          error: `Missing required columns: ${missing.join(", ")}.`,
        },
      ]);
      return;
    }

    const colIndex = (key: string) => headerCells.indexOf(key);

    const nextPreview: RowPreview[] = [];

    for (let r = 1; r < rows.length; r++) {
      const cols = [...rows[r]];
      while (cols.length < headerCells.length) cols.push("");

      if (cols.every((c) => !(c ?? "").trim())) continue;

      const primary_keyword = cols[colIndex("primary_keyword")]?.trim() ?? "";
      const blog_title = cols[colIndex("blog_title")]?.trim() ?? "";
      const url_slug = normalizeCsvSlug(cols[colIndex("url_slug")] ?? "");
      const wgRaw = cols[colIndex("writing_guidelines")] ?? "";
      const scheduledRaw = cols[colIndex("scheduled_publish_at")] ?? "";

      const errs: string[] = [];
      if (!primary_keyword) errs.push("primary_keyword empty");
      if (!blog_title) errs.push("blog_title empty");

      const slugErr = validateNormalizedSlug(url_slug);
      if (slugErr) errs.push(slugErr);

      const sched = parseScheduleCell(scheduledRaw);
      if (!sched.ok) errs.push(sched.reason);

      const writing_guidelines = wgRaw.trim() ? wgRaw.trim() : null;

      nextPreview.push({
        rowIndex: r + 1,
        values: {
          primary_keyword,
          blog_title,
          url_slug,
          writing_guidelines,
          scheduled_publish_at: sched.ok ? sched.iso : "",
        },
        valid: errs.length === 0,
        error: errs.length ? errs.join(" · ") : undefined,
      });
    }

    setPreviews(nextPreview);
  }, []);

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      processText(file.name, text);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.type === "text/csv" || f.name.endsWith(".csv"))) onFile(f);
    else notify("Please drop a .csv file", "error");
  };

  const allValid = previews.length > 0 && previews.every((p) => p.valid);
  const anyInvalid = previews.some((p) => !p.valid);

  const handleQueue = async () => {
    if (!allValid) return;
    setBusy(true);
    const rows = previews.map((p) => p.values);
    const { success, failed } = await createItems(rows, { batchModelId });
    setBusy(false);
    if (success > 0 && failed === 0) {
      notify(`Queued ${success} ${success === 1 ? "post" : "posts"}.`, "success");
      reset();
    } else {
      notify("Could not insert queue rows. Check permissions and try again.", "error");
    }
  };

  return (
    <div
      className={`rounded-2xl border border-black/[0.06] bg-white/80 p-6 shadow-sm transition-colors ${
        dragActive ? "ring-2 ring-[#0A1F44]/40" : ""
      }`}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className={`text-lg font-semibold tracking-tight ${"[font-family:var(--font-cormorant-garamond),serif]"}`}>
            Upload schedule (CSV)
          </h2>
          <p className="mt-1 text-sm text-black/55 [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
            Headers:{" "}
            <span className="font-mono text-xs text-black/70">
              primary_keyword, blog_title, url_slug, writing_guidelines, scheduled_publish_at
            </span>
          </p>
        </div>
        <label className="mt-3 inline-flex cursor-pointer items-center justify-center rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white sm:mt-0 [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
          <input
            type="file"
            accept=".csv,text/csv"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
              e.target.value = "";
            }}
          />
          <span
            className="rounded-xl px-4 py-2 shadow-[0_2px_12px_rgba(10,31,68,0.15)]"
            style={{ backgroundColor: ADMIN_OCEAN }}
          >
            Choose file
          </span>
        </label>
      </div>

      <p className="mt-4 text-xs text-black/45 [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
        Or drag and drop a CSV here. Date-only cells use 09:00 UTC. All rows must pass validation before
        queuing. Rows use the <strong>model chosen above</strong> for this batch.
      </p>

      {fileName && (
        <p className="mt-3 text-xs font-medium text-black/60 [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
          {fileName}
        </p>
      )}

      {previews.length > 0 && (
        <div className="mt-5 overflow-x-auto rounded-xl border border-black/[0.06]">
          <table className="min-w-full text-left text-sm [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
            <thead className="bg-black/[0.03] text-[10px] font-bold uppercase tracking-[0.08em] text-black/45">
              <tr>
                <th className="px-3 py-2">Row</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Keyword</th>
                <th className="px-3 py-2">Slug</th>
                <th className="px-3 py-2">Scheduled (UTC)</th>
              </tr>
            </thead>
            <tbody>
              {previews.map((p) => (
                <tr key={p.rowIndex} className="border-t border-black/[0.05]">
                  <td className="px-3 py-2 font-mono text-xs text-black/55">{p.rowIndex}</td>
                  <td className="px-3 py-2">
                    {p.valid ? (
                      <span className="text-emerald-700">✓ valid</span>
                    ) : (
                      <span className="text-red-600">✗ {p.error}</span>
                    )}
                  </td>
                  <td className="max-w-[220px] truncate px-3 py-2 text-black/80">{p.values.blog_title || "—"}</td>
                  <td className="max-w-[160px] truncate px-3 py-2 text-black/65">{p.values.primary_keyword || "—"}</td>
                  <td className="px-3 py-2 font-mono text-xs text-black/70">{p.values.url_slug || "—"}</td>
                  <td className="px-3 py-2 font-mono text-xs text-black/70">{p.values.scheduled_publish_at || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={!allValid || busy}
          onClick={handleQueue}
          className="rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40 [font-family:var(--font-outfit-sans),system-ui,sans-serif]"
          style={{ backgroundColor: ADMIN_OCEAN }}
        >
          {busy ? "Queuing…" : `Queue ${previews.filter((p) => p.valid).length} posts`}
        </button>
        {previews.length > 0 && (
          <button
            type="button"
            onClick={reset}
            className="text-xs font-semibold uppercase tracking-[0.1em] text-black/45 hover:text-black/65 [font-family:var(--font-outfit-sans),system-ui,sans-serif]"
          >
            Clear preview
          </button>
        )}
        {anyInvalid && previews.length > 0 && (
          <span className="text-xs text-red-600 [font-family:var(--font-outfit-sans),system-ui,sans-serif]">
            Fix CSV errors above to enable queueing.
          </span>
        )}
      </div>
    </div>
  );
}
