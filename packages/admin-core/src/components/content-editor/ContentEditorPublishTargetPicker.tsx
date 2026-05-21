"use client";

import { useEffect, useMemo, useState } from "react";
import { ADMIN_OCEAN } from "../../lib/adminTheme";
import { supabase } from "../../lib/supabase";

export type PublishTargetChoice = "blog" | "page";

interface TrackedPageOption {
  id: string;
  route_path: string;
  page_title: string;
  content_editor_id: string | null;
}

interface ContentEditorPublishTargetPickerProps {
  open: boolean;
  keyword: string;
  editorId: string;
  submitting: boolean;
  onClose: () => void;
  onConfirm: (choice: {
    publishTarget: PublishTargetChoice;
    trackedPageId?: string;
  }) => void;
}

export default function ContentEditorPublishTargetPicker({
  open,
  keyword,
  editorId,
  submitting,
  onClose,
  onConfirm,
}: ContentEditorPublishTargetPickerProps) {
  const [step, setStep] = useState<"choose" | "page">("choose");
  const [pages, setPages] = useState<TrackedPageOption[]>([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [pageSearch, setPageSearch] = useState("");
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setStep("choose");
      setPageSearch("");
      setSelectedPageId(null);
      return;
    }
    setPagesLoading(true);
    void (async () => {
      const { data } = await supabase
        .from("tracked_pages")
        .select("id, route_path, page_title, content_editor_id")
        .eq("is_active", true)
        .order("route_path", { ascending: true })
        .limit(500);
      setPages((data as TrackedPageOption[] | null) ?? []);
      setPagesLoading(false);
    })();
  }, [open]);

  const filteredPages = useMemo(() => {
    const q = pageSearch.trim().toLowerCase();
    return pages.filter((p) => {
      const linkedElsewhere =
        p.content_editor_id != null && p.content_editor_id !== editorId;
      if (linkedElsewhere) return false;
      if (!q) return true;
      return (
        p.route_path.toLowerCase().includes(q) ||
        p.page_title.toLowerCase().includes(q)
      );
    });
  }, [pages, pageSearch, editorId]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xl"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#64748B]">
          Publish target
        </p>
        <p className="mt-1 text-[13px] text-[#334155]">
          Auto-Optimize will write a draft, then publish it. Choose where this brief
          should live for <span className="font-medium">&ldquo;{keyword}&rdquo;</span>.
        </p>

        {step === "choose" ? (
          <div className="mt-5 flex flex-col gap-2">
            <button
              type="button"
              disabled={submitting}
              onClick={() => onConfirm({ publishTarget: "blog" })}
              className="flex w-full flex-col items-start gap-1 rounded-xl border border-[#E2E8F0] px-4 py-3 text-left transition hover:border-[#7B9FD4] hover:bg-[#F4F7FB] disabled:opacity-50 cursor-pointer"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0A1F44]">
                <i className="ri-article-line" style={{ color: ADMIN_OCEAN }} />
                Blog post
              </span>
              <span className="text-[12px] text-[#64748B]">
                Creates a new draft post, optimizes it, and syncs the body to Blog Posts.
              </span>
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => setStep("page")}
              className="flex w-full flex-col items-start gap-1 rounded-xl border border-[#E2E8F0] px-4 py-3 text-left transition hover:border-[#7B9FD4] hover:bg-[#F4F7FB] disabled:opacity-50 cursor-pointer"
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0A1F44]">
                <i className="ri-pages-line" style={{ color: ADMIN_OCEAN }} />
                Marketing page
              </span>
              <span className="text-[12px] text-[#64748B]">
                Links an existing site page, optimizes against the brief, and applies SEO
                title + meta to that page.
              </span>
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <input
              type="search"
              value={pageSearch}
              onChange={(e) => setPageSearch(e.target.value)}
              placeholder="Search routes…"
              className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#0A1F44] focus:outline-none focus:border-[#7B9FD4]"
            />
            <div className="mt-2 max-h-52 overflow-y-auto rounded-lg border border-[#E2E8F0] divide-y divide-[#E2E8F0]">
              {pagesLoading ? (
                <p className="px-3 py-4 text-center text-[12px] text-[#64748B]">
                  <i className="ri-loader-4-line animate-spin mr-1" /> Loading pages…
                </p>
              ) : filteredPages.length === 0 ? (
                <p className="px-3 py-4 text-center text-[12px] text-[#64748B]">
                  No available pages. Sync pages from Site Map first.
                </p>
              ) : (
                filteredPages.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    disabled={submitting}
                    onClick={() => setSelectedPageId(p.id)}
                    className={`w-full px-3 py-2.5 text-left text-[12px] transition cursor-pointer ${
                      selectedPageId === p.id
                        ? "bg-[#0A1F44]/8 text-[#0A1F44]"
                        : "hover:bg-[#F4F7FB] text-[#334155]"
                    }`}
                  >
                    <span className="font-mono text-[11px] text-[#64748B]">{p.route_path}</span>
                    <span className="mt-0.5 block font-medium">{p.page_title}</span>
                  </button>
                ))
              )}
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                type="button"
                disabled={submitting}
                onClick={() => setStep("choose")}
                className="px-3 py-2 text-[11px] font-semibold text-[#64748B] hover:text-[#0A1F44]"
              >
                <i className="ri-arrow-left-line mr-1" /> Back
              </button>
              <button
                type="button"
                disabled={submitting || !selectedPageId}
                onClick={() => {
                  if (!selectedPageId) return;
                  onConfirm({ publishTarget: "page", trackedPageId: selectedPageId });
                }}
                className="px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-[0.1em] text-white disabled:opacity-50"
                style={{ backgroundColor: ADMIN_OCEAN }}
              >
                {submitting ? (
                  <><i className="ri-loader-4-line animate-spin" /> Starting…</>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </div>
        )}

        {step === "choose" ? (
          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="mt-4 w-full text-center text-[11px] font-semibold text-[#94A3B8] hover:text-[#64748B]"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  );
}
