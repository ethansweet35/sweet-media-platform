"use client";

import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { FoundLink, Suggestion, BulkAutoResult } from "@sweetmedia/admin-core";

interface BulkAutoReplaceModalProps {
  links: FoundLink[];
  onClose: () => void;
  onComplete: (results: BulkAutoResult[]) => void;
}

type ItemState = "pending" | "searching" | "found" | "skipped" | "error";

interface ItemResult {
  uid: string;
  state: ItemState;
  bestUrl?: string;
  reason?: string;
}

export default function BulkAutoReplaceModal({ links, onClose, onComplete }: BulkAutoReplaceModalProps) {
  const [items, setItems] = useState<ItemResult[]>(links.map((l) => ({ uid: l.uid, state: "pending" })));
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(-1);

  const updateItem = (uid: string, patch: Partial<ItemResult>) => {
    setItems((prev) => prev.map((i) => (i.uid === uid ? { ...i, ...patch } : i)));
  };

  const runBulk = useCallback(async () => {
    setRunning(true);
    const results: BulkAutoResult[] = [];

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      setCurrentIdx(i);
      updateItem(link.uid, { state: "searching" });

      try {
        const { data, error: fnError } = await supabase.functions.invoke("suggest-replacement-link", {
          body: { anchorText: link.anchorText, currentUrl: link.url, brokenUrl: link.url, isExternal: link.isExternal },
        });
        if (fnError) throw fnError;

        const suggestions: Suggestion[] = data?.suggestions || [];
        if (suggestions.length === 0) {
          updateItem(link.uid, { state: "skipped", reason: "No suggestions found" });
          results.push({ uid: link.uid, skipped: true, reason: "No suggestions found" });
          continue;
        }

        const best = suggestions.find((s) => s.source === "internal") || suggestions[0];
        updateItem(link.uid, { state: "found", bestUrl: best.url });
        results.push({ uid: link.uid, newUrl: best.url });
      } catch (err) {
        const reason = err instanceof Error ? err.message : "Search failed";
        updateItem(link.uid, { state: "error", reason });
        results.push({ uid: link.uid, skipped: true, reason });
      }

      await new Promise((r) => setTimeout(r, 300));
    }

    setRunning(false);
    setDone(true);
    setCurrentIdx(-1);
    onComplete(results);
  }, [links, onComplete]);

  const foundCount = items.filter((i) => i.state === "found").length;
  const skippedCount = items.filter((i) => i.state === "skipped" || i.state === "error").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-start gap-3 p-6 border-b border-neutral-100">
          <div className="w-10 h-10 rounded-xl bg-[#3d6f7f]/5 flex items-center justify-center flex-shrink-0">
            <i className="ri-magic-line text-[#3d6f7f] text-lg"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-neutral-900 mb-0.5">Bulk Auto Replace</h3>
            <p className="text-xs text-neutral-500">
              Searching for the best replacement for each of the <strong>{links.length}</strong> selected link{links.length !== 1 ? "s" : ""}.
              The top result will be applied automatically.
            </p>
          </div>
          {!running && (
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-400 transition-colors cursor-pointer flex-shrink-0">
              <i className="ri-close-line text-base"></i>
            </button>
          )}
        </div>

        {!running && !done && (
          <div className="p-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex items-start gap-3">
              <i className="ri-information-line text-amber-600 text-base mt-0.5 flex-shrink-0"></i>
              <div>
                <p className="text-xs font-semibold text-amber-800 mb-1">How this works</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  For each selected link, we'll search your blog posts and the web for the best replacement.
                  Internal blog posts are preferred. If no match is found, that link will be skipped.
                </p>
              </div>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto mb-5">
              {links.map((l) => (
                <div key={l.uid} className="flex items-center gap-2 px-3 py-2 bg-neutral-50 rounded-lg">
                  <i className={`text-xs flex-shrink-0 ${l.status === "broken" || l.status === "error" ? "ri-error-warning-line text-red-400" : "ri-arrow-right-circle-line text-amber-400"}`}></i>
                  <span className="text-xs text-neutral-700 font-medium truncate flex-1">{l.anchorText}</span>
                  <span className="text-[10px] font-mono text-neutral-400 truncate max-w-[140px]">{l.url.length > 35 ? l.url.slice(0, 35) + "…" : l.url}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 border border-neutral-200 text-neutral-600 text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap">Cancel</button>
              <button onClick={runBulk} className="flex-1 bg-[#3d6f7f] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2">
                <i className="ri-magic-line text-xs"></i>Start Auto Replace
              </button>
            </div>
          </div>
        )}

        {(running || done) && (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              {running && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                    <span>Processing {currentIdx + 1} of {links.length}...</span>
                    <span>{foundCount} found · {skippedCount} skipped</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3d6f7f] rounded-full transition-all duration-500"
                      style={{ width: `${Math.round(((currentIdx + 1) / links.length) * 100)}%` }} />
                  </div>
                </div>
              )}
              {done && (
                <div className="mb-4 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3">
                  <i className="ri-checkbox-circle-line text-emerald-600 text-base flex-shrink-0"></i>
                  <p className="text-xs font-semibold text-emerald-800">
                    Done! {foundCount} link{foundCount !== 1 ? "s" : ""} replaced · {skippedCount} skipped
                  </p>
                </div>
              )}
              <div className="space-y-2">
                {items.map((item, idx) => {
                  const link = links[idx];
                  return (
                    <div key={item.uid} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                      item.state === "found" ? "border-emerald-200 bg-emerald-50/50" :
                      item.state === "skipped" || item.state === "error" ? "border-neutral-200 bg-neutral-50" :
                      item.state === "searching" ? "border-amber-200 bg-amber-50/50" :
                      "border-neutral-100 bg-white"
                    }`}>
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {item.state === "pending" && <i className="ri-time-line text-neutral-300 text-sm"></i>}
                        {item.state === "searching" && <i className="ri-loader-4-line text-amber-500 text-sm animate-spin"></i>}
                        {item.state === "found" && <i className="ri-checkbox-circle-line text-emerald-500 text-sm"></i>}
                        {(item.state === "skipped" || item.state === "error") && <i className="ri-subtract-line text-neutral-400 text-sm"></i>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-neutral-800 truncate">{link.anchorText}</p>
                        {item.state === "found" && item.bestUrl && (
                          <p className="text-[10px] font-mono text-emerald-700 mt-0.5 truncate">
                            <i className="ri-arrow-right-line mr-1"></i>{item.bestUrl}
                          </p>
                        )}
                        {(item.state === "skipped" || item.state === "error") && item.reason && (
                          <p className="text-[10px] text-neutral-400 mt-0.5">{item.reason}</p>
                        )}
                        {item.state === "searching" && <p className="text-[10px] text-amber-600 mt-0.5">Searching...</p>}
                        {item.state === "pending" && (
                          <p className="text-[10px] text-neutral-400 mt-0.5 font-mono truncate">{link.url.length > 40 ? link.url.slice(0, 40) + "…" : link.url}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {done && (
              <div className="border-t border-neutral-100 p-4">
                <button onClick={onClose} className="w-full bg-[#3d6f7f] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap">
                  Done
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
