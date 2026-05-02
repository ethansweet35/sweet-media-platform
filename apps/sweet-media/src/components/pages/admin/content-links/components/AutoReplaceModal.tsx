"use client";

import { useState, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import type { FoundLink, Suggestion } from "@sweetmedia/admin-core";

interface AutoReplaceModalProps {
  link: FoundLink;
  onClose: () => void;
  onReplace: (link: FoundLink, newUrl: string) => Promise<void>;
  actionLoading: boolean;
}

function SuggestionCard({ suggestion, selected, onSelect }: { suggestion: Suggestion; selected: boolean; onSelect: () => void }) {
  const isInternal = suggestion.source === "internal";
  const displayUrl = suggestion.url.length > 60 ? suggestion.url.slice(0, 60) + "…" : suggestion.url;
  return (
    <button onClick={onSelect}
      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${selected ? "border-[#3d6f7f] bg-[#3d6f7f]/5 ring-1 ring-[#3d6f7f]/20" : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50"}`}>
      <div className="flex items-start gap-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${isInternal ? "bg-[#3d6f7f]/10" : "bg-neutral-100"}`}>
          <i className={`text-xs ${isInternal ? "ri-article-line text-[#3d6f7f]" : "ri-global-line text-neutral-500"}`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-semibold text-neutral-800 leading-tight">{suggestion.title}</p>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isInternal ? "bg-[#3d6f7f]/10 text-[#3d6f7f]" : "bg-neutral-100 text-neutral-500"}`}>
              {isInternal ? "Internal" : "Web"}
            </span>
          </div>
          <p className="text-[10px] font-mono text-neutral-400 mt-0.5 truncate">{displayUrl}</p>
          {suggestion.description && <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed line-clamp-2">{suggestion.description}</p>}
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${selected ? "border-[#3d6f7f] bg-[#3d6f7f]" : "border-neutral-300"}`}>
          {selected && <i className="ri-check-line text-white text-[9px]"></i>}
        </div>
      </div>
    </button>
  );
}

export default function AutoReplaceModal({ link, onClose, onReplace, actionLoading }: AutoReplaceModalProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [customUrl, setCustomUrl] = useState("");
  const [tab, setTab] = useState<"suggestions" | "custom">("suggestions");
  const [customQuery, setCustomQuery] = useState("");
  const [showQueryInput, setShowQueryInput] = useState(false);

  const fetchSuggestions = useCallback(async (overrideQuery?: string) => {
    setLoading(true);
    setError(null);
    setSuggestions([]);
    setSelected(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("suggest-replacement-link", {
        body: { anchorText: overrideQuery || link.anchorText, currentUrl: link.url, brokenUrl: link.url, isExternal: link.isExternal },
      });
      if (fnError) throw fnError;
      setSuggestions(data?.suggestions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch suggestions");
    }
    setLoading(false);
  }, [link]);

  useMemo(() => { fetchSuggestions(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const internalSuggestions = suggestions.filter((s) => s.source === "internal");
  const webSuggestions = suggestions.filter((s) => s.source === "web");
  const activeUrl = tab === "custom" ? customUrl.trim() : selected;

  const handleApply = async () => {
    if (!activeUrl) return;
    await onReplace(link, activeUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-start gap-3 p-6 border-b border-neutral-100">
          <div className="w-10 h-10 rounded-xl bg-[#3d6f7f]/5 flex items-center justify-center flex-shrink-0">
            <i className="ri-magic-line text-[#3d6f7f] text-lg"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-neutral-900 mb-0.5">Auto Replace</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Finding replacement links for <strong>&quot;{link.anchorText}&quot;</strong> — searching your blog posts and the web.
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 text-neutral-400 transition-colors cursor-pointer flex-shrink-0">
            <i className="ri-close-line text-base"></i>
          </button>
        </div>

        <div className="flex gap-1 px-6 pt-4 pb-0">
          {(["suggestions", "custom"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`text-[11px] tracking-[0.1em] uppercase font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer whitespace-nowrap ${tab === t ? "bg-[#3d6f7f] text-white" : "text-neutral-500 hover:bg-neutral-50"}`}>
              <i className={`${t === "suggestions" ? "ri-sparkling-line" : "ri-edit-line"} mr-1.5`}></i>
              {t === "suggestions" ? "Suggestions" : "Custom URL"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {tab === "suggestions" && (
            <>
              {loading && (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3d6f7f]/5 flex items-center justify-center">
                    <i className="ri-loader-4-line text-[#3d6f7f] text-xl animate-spin"></i>
                  </div>
                  <p className="text-sm text-neutral-500">Searching for replacement links...</p>
                  <p className="text-xs text-neutral-400">Checking your blog posts and the web</p>
                </div>
              )}
              {!loading && error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <i className="ri-error-warning-line text-red-500 text-base mt-0.5"></i>
                  <div>
                    <p className="text-sm font-semibold text-red-800">Could not fetch suggestions</p>
                    <p className="text-xs text-red-600 mt-0.5">{error}</p>
                    <button onClick={() => fetchSuggestions()} className="mt-2 text-xs text-red-700 font-semibold hover:underline cursor-pointer">Try again</button>
                  </div>
                </div>
              )}
              {!loading && !error && suggestions.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mx-auto mb-3">
                    <i className="ri-search-line text-neutral-400 text-xl"></i>
                  </div>
                  <p className="text-sm font-semibold text-neutral-700 mb-1">No suggestions found</p>
                  <p className="text-xs text-neutral-400 mb-4">Try searching with different keywords or enter a URL manually.</p>
                  <button onClick={() => setShowQueryInput(true)} className="text-xs font-semibold text-[#3d6f7f] border border-[#3d6f7f]/20 px-4 py-2 rounded-xl hover:bg-[#3d6f7f]/5 transition-colors cursor-pointer">
                    <i className="ri-search-2-line mr-1.5"></i>Search with different keywords
                  </button>
                </div>
              )}
              {!loading && (showQueryInput || suggestions.length > 0) && (
                <div className="mb-4">
                  {showQueryInput ? (
                    <div className="flex gap-2">
                      <input type="text" value={customQuery} onChange={(e) => setCustomQuery(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter" && customQuery.trim()) { fetchSuggestions(customQuery.trim()); setShowQueryInput(false); } }}
                        placeholder={`e.g. "${link.anchorText} official site"`} autoFocus
                        className="flex-1 border border-neutral-200 rounded-xl px-3 py-2 text-sm text-neutral-800 focus:outline-none focus:border-[#3d6f7f] transition-colors" />
                      <button onClick={() => { if (customQuery.trim()) { fetchSuggestions(customQuery.trim()); setShowQueryInput(false); } }} disabled={!customQuery.trim()}
                        className="bg-[#3d6f7f] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50">Search</button>
                      <button onClick={() => setShowQueryInput(false)} className="border border-neutral-200 text-neutral-500 text-xs font-bold px-3 py-2 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] text-neutral-400">Searched for: <span className="font-semibold text-neutral-600">&quot;{link.anchorText}&quot;</span></p>
                      <button onClick={() => { setShowQueryInput(true); setCustomQuery(link.anchorText); }} className="text-[10px] text-[#3d6f7f] font-semibold hover:underline cursor-pointer flex items-center gap-1">
                        <i className="ri-search-2-line text-xs"></i>Refine search
                      </button>
                    </div>
                  )}
                </div>
              )}
              {!loading && !error && suggestions.length > 0 && (
                <div className="space-y-4">
                  {internalSuggestions.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] tracking-[0.15em] uppercase font-bold text-[#3d6f7f]"><i className="ri-links-line mr-1"></i>Your Blog Posts</span>
                        <div className="flex-1 h-px bg-[#3d6f7f]/10"></div>
                        <span className="text-[10px] text-neutral-400">{internalSuggestions.length} match{internalSuggestions.length !== 1 ? "es" : ""}</span>
                      </div>
                      <div className="space-y-2">
                        {internalSuggestions.map((s) => (
                          <SuggestionCard key={s.url} suggestion={s} selected={selected === s.url} onSelect={() => setSelected(selected === s.url ? null : s.url)} />
                        ))}
                      </div>
                    </div>
                  )}
                  {webSuggestions.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] tracking-[0.15em] uppercase font-bold text-neutral-500"><i className="ri-global-line mr-1"></i>Web Results</span>
                        <div className="flex-1 h-px bg-neutral-200"></div>
                        <span className="text-[10px] text-neutral-400">{webSuggestions.length} result{webSuggestions.length !== 1 ? "s" : ""}</span>
                      </div>
                      <div className="space-y-2">
                        {webSuggestions.map((s) => (
                          <SuggestionCard key={s.url} suggestion={s} selected={selected === s.url} onSelect={() => setSelected(selected === s.url ? null : s.url)} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          {tab === "custom" && (
            <div>
              <p className="text-[10px] tracking-[0.12em] uppercase font-semibold text-neutral-400 mb-2">Enter replacement URL</p>
              <input type="url" value={customUrl} onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/relevant-page" autoFocus
                className="w-full border border-neutral-200 rounded-xl px-3 py-2.5 text-sm font-mono text-neutral-800 focus:outline-none focus:border-[#3d6f7f] transition-colors" />
              <p className="text-xs text-neutral-400 mt-2">The anchor text <strong className="text-neutral-600">&quot;{link.anchorText}&quot;</strong> will stay the same — only the URL changes.</p>
              {link.finalUrl && (
                <button onClick={() => setCustomUrl(link.finalUrl!)} className="mt-3 flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-700 cursor-pointer">
                  <i className="ri-arrow-right-up-line text-xs"></i>
                  Use redirect destination: <span className="font-mono ml-1">{link.finalUrl}</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="border-t border-neutral-100 p-4 flex items-center gap-2">
          {activeUrl ? (
            <div className="flex-1 min-w-0 mr-2">
              <p className="text-[10px] text-neutral-400 mb-0.5">Will replace with:</p>
              <p className="text-xs font-mono text-neutral-700 truncate">{activeUrl}</p>
            </div>
          ) : <div className="flex-1" />}
          <button onClick={onClose} disabled={actionLoading} className="border border-neutral-200 text-neutral-600 text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50">Cancel</button>
          <button onClick={handleApply} disabled={actionLoading || !activeUrl}
            className="bg-[#3d6f7f] text-white text-[11px] tracking-[0.12em] uppercase font-bold px-5 py-2.5 rounded-xl hover:bg-[#35636f] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 flex items-center gap-2">
            {actionLoading ? <><i className="ri-loader-4-line animate-spin text-xs"></i>Applying...</> : <><i className="ri-check-line text-xs"></i>Apply Replacement</>}
          </button>
        </div>
      </div>
    </div>
  );
}
