"use client";

import { useEffect, useRef } from "react";
import { ADMIN_NAVY, ADMIN_OCEAN } from "../../lib/adminTheme";

export type ContentEditorAnalysisModeChoice = "lite" | "deep";

interface ContentEditorBriefModePickerProps {
  open: boolean;
  keyword: string;
  submitting: ContentEditorAnalysisModeChoice | null;
  onClose: () => void;
  onSelect: (mode: ContentEditorAnalysisModeChoice) => void;
  /** Anchored popover (default) — avoids the “same click hits Analyze” bug with centered modals. */
  variant?: "popover" | "modal";
}

export default function ContentEditorBriefModePicker({
  open,
  keyword,
  submitting,
  onClose,
  onSelect,
  variant = "popover",
}: ContentEditorBriefModePickerProps) {
  const openedAtRef = useRef(0);

  useEffect(() => {
    if (!open) return;
    openedAtRef.current = Date.now();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, submitting, onClose]);

  useEffect(() => {
    if (!open || submitting) return;
    const onPointerDown = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest("[data-ce-brief-picker]")) return;
      if (Date.now() - openedAtRef.current < 250) return;
      onClose();
    };
    window.addEventListener("pointerdown", onPointerDown, true);
    return () => window.removeEventListener("pointerdown", onPointerDown, true);
  }, [open, submitting, onClose]);

  if (!open) return null;

  const panel = (
    <div
      data-ce-brief-picker
      className={
        variant === "modal"
          ? "w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xl"
          : "w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-xl"
      }
      onPointerDown={(e) => e.stopPropagation()}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748B]">
        Run content brief
      </p>
      <p className="mt-1 text-[12px] text-[#334155]">
        Keyword: <span className="font-medium">&ldquo;{keyword}&rdquo;</span>
      </p>

      <div className={`flex flex-col gap-2 ${variant === "modal" ? "mt-5" : "mt-3"}`}>
        <button
          type="button"
          disabled={!!submitting}
          onClick={() => onSelect("lite")}
          className="flex w-full flex-col items-start gap-0.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-left transition hover:border-[#7B9FD4] hover:bg-[#F4F7FB] disabled:opacity-50 cursor-pointer"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0A1F44]">
            {submitting === "lite" ? (
              <i className="ri-loader-4-line animate-spin" />
            ) : (
              <i className="ri-sparkling-2-line" style={{ color: ADMIN_OCEAN }} />
            )}
            Analyze
          </span>
          <span className="text-[10px] leading-snug text-[#64748B]">
            Top 10 SERP · ~60–120s · ~$0.08–0.15
          </span>
        </button>

        <button
          type="button"
          disabled={!!submitting}
          onClick={() => onSelect("deep")}
          className="flex w-full flex-col items-start gap-0.5 rounded-lg border border-[#7B9FD4]/40 bg-[#F8FAFC] px-3 py-2.5 text-left transition hover:border-[#7B9FD4] hover:bg-[#EFF6FF] disabled:opacity-50 cursor-pointer"
        >
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0A1F44]">
            {submitting === "deep" ? (
              <i className="ri-loader-4-line animate-spin" />
            ) : (
              <i className="ri-flask-line" style={{ color: ADMIN_NAVY }} />
            )}
            Deep analyze
          </span>
          <span className="text-[10px] leading-snug text-[#64748B]">
            Top 20 SERP · ~90–180s · ~$0.30
          </span>
        </button>
      </div>

      <button
        type="button"
        disabled={!!submitting}
        onClick={onClose}
        className="mt-3 w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#64748B] hover:bg-[#F4F7FB] disabled:opacity-50 cursor-pointer"
      >
        Cancel
      </button>
    </div>
  );

  if (variant === "popover") {
    return (
      <div
        data-ce-brief-picker
        className="absolute left-0 top-full z-[9999] mt-1"
        role="dialog"
        aria-modal="true"
        aria-label="Choose content brief analysis mode"
      >
        {panel}
      </div>
    );
  }

  if (typeof document === "undefined") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A1F44]/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Choose content brief analysis mode"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget && Date.now() - openedAtRef.current >= 250) {
          onClose();
        }
      }}
    >
      <div data-ce-brief-picker onPointerDown={(e) => e.stopPropagation()}>
        {panel}
      </div>
    </div>
  );
}
