"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ADMIN_NAVY, ADMIN_OCEAN } from "../../lib/adminTheme";

export type ContentEditorAnalysisModeChoice = "lite" | "deep";

interface ContentEditorBriefModePickerProps {
  open: boolean;
  keyword: string;
  submitting: ContentEditorAnalysisModeChoice | null;
  onClose: () => void;
  onSelect: (mode: ContentEditorAnalysisModeChoice) => void;
}

export default function ContentEditorBriefModePicker({
  open,
  keyword,
  submitting,
  onClose,
  onSelect,
}: ContentEditorBriefModePickerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, submitting, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0A1F44]/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ce-brief-mode-title"
      onClick={() => {
        if (!submitting) onClose();
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="ce-brief-mode-title"
          className="text-lg font-semibold text-[#0A1F44]"
        >
          Run content brief
        </h2>
        <p className="mt-1 text-sm text-[#64748B]">
          Choose analysis depth for{" "}
          <span className="font-medium text-[#334155]">&ldquo;{keyword}&rdquo;</span>
        </p>

        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            disabled={!!submitting}
            onClick={() => onSelect("lite")}
            className="flex w-full flex-col items-start gap-1 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3.5 text-left transition hover:border-[#7B9FD4] hover:bg-[#F4F7FB] disabled:opacity-50 cursor-pointer"
          >
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[#0A1F44]">
              {submitting === "lite" ? (
                <i className="ri-loader-4-line animate-spin" />
              ) : (
                <i className="ri-sparkling-2-line" style={{ color: ADMIN_OCEAN }} />
              )}
              Analyze
            </span>
            <span className="text-[11px] leading-relaxed text-[#64748B]">
              Top 10 SERP, hybrid scrape, rules-based terms. ~60–120s, ~$0.08–0.15.
            </span>
          </button>

          <button
            type="button"
            disabled={!!submitting}
            onClick={() => onSelect("deep")}
            className="flex w-full flex-col items-start gap-1 rounded-xl border border-[#7B9FD4]/50 bg-[#F8FAFC] px-4 py-3.5 text-left transition hover:border-[#7B9FD4] hover:bg-[#EFF6FF] disabled:opacity-50 cursor-pointer"
          >
            <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-[#0A1F44]">
              {submitting === "deep" ? (
                <i className="ri-loader-4-line animate-spin" />
              ) : (
                <i className="ri-flask-line" style={{ color: ADMIN_NAVY }} />
              )}
              Deep analyze
            </span>
            <span className="text-[11px] leading-relaxed text-[#64748B]">
              Top 20 SERP, full Firecrawl + Sonnet curation. ~90–180s, ~$0.30.
            </span>
          </button>
        </div>

        <button
          type="button"
          disabled={!!submitting}
          onClick={onClose}
          className="mt-4 w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748B] hover:bg-[#F4F7FB] disabled:opacity-50 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>,
    document.body,
  );
}
