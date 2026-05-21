"use client";

import { useRef, useState } from "react";
import { AI_MODELS, DEFAULT_MODEL_ID } from "../../../../../lib/aiModels";

export interface RewriteResult {
  title: string;
  excerpt: string;
  metaDescription: string;
  content: unknown[];
}

export interface RewriteParams {
  topic: string;
  primaryKeyword: string;
  category: string;
  targetWordCount: number;
  model: string;
  /** SEO brief markdown / NLP guidelines (e.g. exported from a Content Editor brief) to follow. */
  seoGuidelines: string;
}

interface AiRewritePanelProps {
  initialTopic: string;
  initialKeyword: string;
  initialCategory: string;
  onStartGenerate: (params: RewriteParams) => void;
  onClose: () => void;
}

const inputCls =
  "w-full px-3.5 py-2.5 text-sm border border-[#E2E8F0] rounded-xl bg-[#F4F7FB] text-[#0A1F44] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0A1F44]/30 focus:border-[#7B9FD4] transition-all";
const labelCls =
  "block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#64748B] mb-1.5";

export default function AiRewritePanel({
  initialTopic,
  initialKeyword,
  initialCategory,
  onStartGenerate,
  onClose,
}: AiRewritePanelProps) {
  const [topic, setTopic] = useState(initialTopic);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [seoGuidelines, setSeoGuidelines] = useState("");
  const [model, setModel] = useState(DEFAULT_MODEL_ID);
  const [wordCount, setWordCount] = useState(2000);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setSeoGuidelines((ev.target?.result as string) ?? "");
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    if (!topic.trim() || !keyword.trim()) return;
    onStartGenerate({
      topic: topic.trim(),
      primaryKeyword: keyword.trim(),
      category: initialCategory,
      targetWordCount: wordCount,
      model,
      seoGuidelines: seoGuidelines.trim(),
    });
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[2px]" onClick={onClose} />

      <div className="fixed top-0 right-0 h-full w-[480px] max-w-full bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E2E8F0] flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center">
            <i className="ri-sparkling-2-line text-violet-600 text-base"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-[#0A1F44]">AI Rewrite</h2>
            <p className="text-[11px] text-[#94A3B8]">Runs in background — you can close this while it generates</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F4F7FB] text-[#94A3B8] transition-colors cursor-pointer">
            <i className="ri-close-line text-base"></i>
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div>
            <label className={labelCls}>Topic / Post Angle</label>
            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How to Choose a Residential Treatment Center"
              className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Primary Keyword</label>
            <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g. residential treatment center Los Angeles"
              className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Target Word Count</label>
            <select value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))}
              className={`${inputCls} cursor-pointer`}>
              {[800, 1200, 1500, 2000, 2500, 3000, 4000].map((n) => (
                <option key={n} value={n}>{n.toLocaleString()} words</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>AI Model</label>
            <select value={model} onChange={(e) => setModel(e.target.value)}
              className={`${inputCls} cursor-pointer`}>
              {AI_MODELS.map((m) => (
                <option key={m.id} value={m.id}>{m.displayName}</option>
              ))}
            </select>
            <p className="text-[11px] text-[#94A3B8] mt-1.5">
              {AI_MODELS.find((m) => m.id === model)?.description}
            </p>
          </div>

          {/* SEO brief */}
          <div>
            <label className={labelCls}>
              SEO Brief
              <span className="ml-1.5 normal-case font-normal text-[#94A3B8]">optional</span>
            </label>
            <div className="space-y-2">
              <button type="button" onClick={() => fileRef.current?.click()}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-[#E2E8F0] hover:border-[#0A1F44]/40 hover:bg-[#0A1F44]/4 text-[#64748B] hover:text-[#0A1F44] transition-all cursor-pointer">
                <i className="ri-file-upload-line text-base flex-shrink-0"></i>
                <span className="text-[12px] font-medium">
                  {seoGuidelines ? "Replace .txt file" : "Import brief (.txt / .md)"}
                </span>
                {seoGuidelines && (
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                    <i className="ri-check-line text-[9px]"></i>Loaded
                  </span>
                )}
              </button>
              <input ref={fileRef} type="file" accept=".txt,.md,text/plain,text/markdown" className="hidden" onChange={handleFileUpload} />
              <textarea value={seoGuidelines} onChange={(e) => setSeoGuidelines(e.target.value)}
                rows={4} placeholder="Or paste a SEO brief (NLP terms, structure targets, questions, facts)..."
                className={`${inputCls} resize-none`} />
              {seoGuidelines && (
                <p className="text-[11px] text-[#94A3B8]">
                  {seoGuidelines.length.toLocaleString()} chars loaded
                  {seoGuidelines.length > 12000 && <span className="text-amber-500"> (trimmed to 12,000)</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E2E8F0] flex items-center gap-3 flex-shrink-0">
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm font-semibold text-[#64748B] hover:bg-[#F4F7FB] transition-colors cursor-pointer">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={!topic.trim() || !keyword.trim()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors cursor-pointer">
            <i className="ri-sparkling-2-line text-sm"></i>
            Rewrite with AI
          </button>
        </div>
      </div>
    </>
  );
}
