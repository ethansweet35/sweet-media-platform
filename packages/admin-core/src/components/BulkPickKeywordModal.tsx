"use client";

import { useMemo, useState } from "react";
import { ADMIN_OCEAN } from "../lib/adminTheme";
import type {
  KeywordPickModeDTO,
  SemrushAutoPickResponse,
  SemrushIntentDTO,
} from "../types/semrush";

const INTENT_LABEL: Record<SemrushIntentDTO, string> = {
  0: "Commercial",
  1: "Informational",
  2: "Navigational",
  3: "Transactional",
};

const INTENT_COLOR: Record<SemrushIntentDTO, string> = {
  0: "bg-blue-50 text-blue-700",       // commercial
  1: "bg-amber-50 text-amber-700",     // informational
  2: "bg-neutral-100 text-neutral-600",// navigational
  3: "bg-emerald-50 text-emerald-700", // transactional
};

interface BulkPickRow {
  /** Stable row id (post id, page id, etc.) */
  id: string;
  /** Display title shown to the user. */
  title: string;
  /** Seed phrase fed to Semrush. Usually the title; pages may use page_title. */
  seed: string;
  /** Existing keyword on the row, if any — shown to the user before picking. */
  currentKeyword?: string | null;
}

interface RowState {
  status: "pending" | "fetching" | "suggested" | "applied" | "skipped" | "error";
  pick?: { phrase: string; volume: number; difficulty: number; intent: SemrushIntentDTO[] };
  reason?: string;
  error?: string;
  /** User-edited phrase (defaults to pick.phrase). */
  edited?: string;
  /** Whether this row is included in the final apply step. */
  included: boolean;
}

interface BulkPickKeywordModalProps {
  rows: BulkPickRow[];
  mode: KeywordPickModeDTO;
  /**
   * Persist the chosen keyword for this row. Return true on success.
   * Called once per included row during the apply step.
   */
  onApplyRow: (row: BulkPickRow, keyword: string) => Promise<boolean>;
  /** Close handler. */
  onClose: () => void;
  /** Called after apply finishes (so the parent can refetch). */
  onComplete?: () => void;
}

const labelByMode: Record<KeywordPickModeDTO, string> = {
  page: "Pages — high-intent keywords",
  blog: "Blog posts — flexible keywords",
};

const helpByMode: Record<KeywordPickModeDTO, string> = {
  page:
    "For pages, the AI prefers commercial or transactional intent. If no high-intent matches exist, it falls back to the highest-volume option.",
  blog:
    "For blog posts, the AI picks the highest-volume broad-match keyword and gives a small boost to informational intent.",
};

export default function BulkPickKeywordModal({
  rows,
  mode,
  onApplyRow,
  onClose,
  onComplete,
}: BulkPickKeywordModalProps) {
  const [rowStates, setRowStates] = useState<Record<string, RowState>>(() =>
    Object.fromEntries(rows.map((r) => [r.id, { status: "pending" as const, included: true }])),
  );
  const [picking, setPicking] = useState(false);
  const [applying, setApplying] = useState(false);
  const [done, setDone] = useState(false);

  const updateRow = (id: string, patch: Partial<RowState>) =>
    setRowStates((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const counts = useMemo(() => {
    const states = Object.values(rowStates);
    return {
      total: rows.length,
      suggested: states.filter((s) => s.status === "suggested").length,
      applied: states.filter((s) => s.status === "applied").length,
      errored: states.filter((s) => s.status === "error").length,
      included: states.filter((s) => s.included && s.status === "suggested").length,
    };
  }, [rowStates, rows.length]);

  const allFetched = Object.values(rowStates).every(
    (s) => s.status === "suggested" || s.status === "error" || s.status === "applied",
  );

  const handlePickAll = async () => {
    if (picking) return;
    setPicking(true);
    for (const row of rows) {
      const state = rowStates[row.id];
      if (state.status === "applied") continue;

      updateRow(row.id, { status: "fetching" });
      try {
        const res = await fetch("/api/admin/semrush/auto-pick", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ seed: row.seed, mode }),
        });
        const data = (await res.json()) as SemrushAutoPickResponse;
        if (!res.ok || !data.ok) {
          throw new Error(data.error ?? `HTTP ${res.status}`);
        }
        if (!data.pick) {
          updateRow(row.id, {
            status: "skipped",
            reason: data.reason,
            included: false,
          });
        } else {
          updateRow(row.id, {
            status: "suggested",
            pick: {
              phrase: data.pick.phrase,
              volume: data.pick.searchVolume,
              difficulty: data.pick.difficulty,
              intent: data.pick.intent,
            },
            edited: data.pick.phrase,
            reason: data.reason,
            included: true,
          });
        }
      } catch (err) {
        updateRow(row.id, {
          status: "error",
          error: err instanceof Error ? err.message : "Auto-pick failed",
          included: false,
        });
      }
    }
    setPicking(false);
  };

  const handleApplyAll = async () => {
    if (applying) return;
    setApplying(true);
    for (const row of rows) {
      const state = rowStates[row.id];
      if (!state.included || state.status !== "suggested") continue;
      const phrase = (state.edited ?? state.pick?.phrase ?? "").trim();
      if (!phrase) continue;
      try {
        const ok = await onApplyRow(row, phrase);
        if (ok) {
          updateRow(row.id, { status: "applied" });
        } else {
          updateRow(row.id, { status: "error", error: "DB save failed" });
        }
      } catch (err) {
        updateRow(row.id, {
          status: "error",
          error: err instanceof Error ? err.message : "Save failed",
        });
      }
    }
    setApplying(false);
    setDone(true);
  };

  const handleClose = () => {
    if (done && onComplete) onComplete();
    onClose();
  };

  const busy = picking || applying;
  const estimatedUnits = rows.length * 400; // ~400 units per row (1 phrase_fullsearch × 10 rows)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={busy ? undefined : handleClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-7 py-5 border-b border-neutral-100 flex items-center gap-3 flex-shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${ADMIN_OCEAN}18` }}
          >
            <i className="ri-search-eye-line text-lg" style={{ color: ADMIN_OCEAN }} />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-neutral-900">Auto-pick Primary Keywords</h2>
            <p className="text-[12px] text-neutral-500">
              {labelByMode[mode]} · {rows.length} {rows.length === 1 ? "row" : "rows"}
            </p>
          </div>
          {!busy && (
            <button
              type="button"
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-400 cursor-pointer transition-colors"
            >
              <i className="ri-close-line text-base" />
            </button>
          )}
        </div>

        {/* Help banner */}
        <div className="px-7 py-3 bg-neutral-50 border-b border-neutral-100 text-[12px] text-neutral-600 leading-relaxed">
          {helpByMode[mode]}{" "}
          <span className="text-neutral-400">
            (~{estimatedUnits.toLocaleString()} Semrush API units)
          </span>
        </div>

        {/* Rows list */}
        <div className="flex-1 overflow-y-auto divide-y divide-neutral-100">
          {rows.map((row) => {
            const state = rowStates[row.id];
            return (
              <div
                key={row.id}
                className={`px-7 py-4 transition-colors ${
                  state.status === "fetching"
                    ? "bg-blue-50/50"
                    : state.status === "applied"
                      ? "bg-emerald-50/40"
                      : state.status === "error"
                        ? "bg-red-50/30"
                        : state.status === "skipped"
                          ? "bg-amber-50/30"
                          : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Status dot */}
                  <div className="mt-1 w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {state.status === "fetching" ? (
                      <i className="ri-loader-4-line animate-spin text-blue-500 text-base" />
                    ) : state.status === "applied" ? (
                      <i className="ri-check-circle-fill text-emerald-500 text-base" />
                    ) : state.status === "error" ? (
                      <i className="ri-error-warning-fill text-red-400 text-base" />
                    ) : state.status === "skipped" ? (
                      <i className="ri-information-line text-amber-500 text-base" />
                    ) : state.status === "suggested" ? (
                      <i className="ri-sparkling-2-fill text-base" style={{ color: ADMIN_OCEAN }} />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-neutral-300" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="text-[13px] font-medium text-neutral-800 leading-snug truncate">
                      {row.title}
                    </p>
                    {row.currentKeyword && state.status !== "applied" && (
                      <p className="text-[10px] text-neutral-400">
                        Current:{" "}
                        <span className="font-mono text-neutral-500">{row.currentKeyword}</span>
                      </p>
                    )}

                    {state.status === "suggested" && state.pick && (
                      <div className="flex items-center gap-2 flex-wrap mt-1.5">
                        <input
                          type="checkbox"
                          checked={state.included}
                          onChange={(e) => updateRow(row.id, { included: e.target.checked })}
                          className="w-4 h-4 rounded border-neutral-300 cursor-pointer accent-[#3d6f7f]"
                          title="Include in apply"
                        />
                        <input
                          type="text"
                          value={state.edited ?? state.pick.phrase}
                          onChange={(e) => updateRow(row.id, { edited: e.target.value })}
                          disabled={!state.included || applying}
                          className="flex-1 min-w-[180px] max-w-[320px] px-2.5 py-1.5 text-[12px] border border-neutral-300 rounded-md bg-white text-neutral-900 focus:outline-none focus:border-[#3d6f7f] disabled:opacity-50"
                        />
                        <span className="text-[10px] font-mono text-neutral-500">
                          Vol {state.pick.volume.toLocaleString()} · KD {state.pick.difficulty || "—"}
                        </span>
                        {state.pick.intent.length > 0 && (
                          <div className="flex items-center gap-1">
                            {state.pick.intent.map((i) => (
                              <span
                                key={i}
                                className={`text-[9px] font-bold uppercase tracking-[0.05em] px-1.5 py-0.5 rounded ${INTENT_COLOR[i]}`}
                              >
                                {INTENT_LABEL[i]}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {state.status === "applied" && state.pick && (
                      <p className="text-[12px] text-emerald-700">
                        Saved:{" "}
                        <span className="font-mono">{state.edited ?? state.pick.phrase}</span>
                      </p>
                    )}

                    {state.status === "skipped" && state.reason && (
                      <p className="text-[11px] text-amber-700">{state.reason}</p>
                    )}

                    {state.status === "error" && state.error && (
                      <p className="text-[11px] text-red-600">{state.error}</p>
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
                {counts.applied} keyword{counts.applied !== 1 ? "s" : ""} saved
                {counts.errored > 0 ? `, ${counts.errored} failed` : ""}.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ADMIN_OCEAN }}
              >
                <i className="ri-check-line text-sm" />
                Done
              </button>
            </>
          ) : applying ? (
            <div className="flex-1 flex items-center gap-3">
              <i className="ri-loader-4-line animate-spin text-base" style={{ color: ADMIN_OCEAN }} />
              <span className="text-sm text-neutral-700 font-medium">
                Saving {counts.applied + 1} of {counts.included}…
              </span>
            </div>
          ) : picking ? (
            <div className="flex-1 flex items-center gap-3">
              <i className="ri-loader-4-line animate-spin text-blue-500 text-base" />
              <span className="text-sm text-blue-700 font-medium">
                Picking keywords {counts.suggested + counts.errored + 1} of {counts.total}…
              </span>
            </div>
          ) : allFetched && counts.suggested > 0 ? (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <div className="flex-1 text-[12px] text-neutral-500">
                {counts.included} of {counts.suggested} ready to apply.{" "}
                Uncheck rows you don&apos;t want to overwrite.
              </div>
              <button
                type="button"
                onClick={handleApplyAll}
                disabled={counts.included === 0}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ADMIN_OCEAN }}
              >
                <i className="ri-check-line text-sm" />
                Apply {counts.included} keyword{counts.included !== 1 ? "s" : ""}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <div className="flex-1 text-[12px] text-neutral-500">
                One Semrush call per row. You&apos;ll review &amp; approve before anything saves.
              </div>
              <button
                type="button"
                onClick={handlePickAll}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                style={{ backgroundColor: ADMIN_OCEAN }}
              >
                <i className="ri-search-eye-line text-sm" />
                Pick Keywords
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
