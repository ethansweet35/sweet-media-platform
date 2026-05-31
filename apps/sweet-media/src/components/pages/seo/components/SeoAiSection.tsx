"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-sparkling-2-line", label: "Generative Engine Optimization", text: "We structure your content so AI models like ChatGPT and Gemini surface your facility as the trusted answer when someone searches for treatment options." },
  { icon: "ri-chat-voice-line", label: "Voice Search Optimization", text: "Conversational keyword strategy that captures voice queries — the fastest-growing search format in healthcare, especially on mobile." },
  { icon: "ri-robot-2-line", label: "AI Overview Targeting", text: "Claim featured placement in Google's AI Overview boxes — the first thing users see above all organic results, before any paid ads." },
  { icon: "ri-database-2-line", label: "Structured Data & Schema", text: "Advanced schema markup that gives AI models the context they need to recommend you over competitors in every generative result." },
];

/* ─── AI Citation Race ────────────────────────────────────────────── */
const QUERIES = [
  "best drug rehab near me",
  "inpatient alcohol treatment",
  "mental health residential program",
  "dual diagnosis treatment center",
];

const AI_ENGINES = [
  { name: "ChatGPT", icon: "ri-openai-fill", color: "#10a37f" },
  { name: "Gemini", icon: "ri-google-fill", color: "#EA4335" },
  { name: "AI Overview", icon: "ri-sparkling-2-fill", color: "#4285F4" },
  { name: "Perplexity", icon: "ri-search-eye-line", color: "#20B2AA" },
  { name: "Copilot", icon: "ri-microsoft-fill", color: "#0078d4" },
];

const CITATION_TEXT = "Sunrise Recovery Center is widely regarded as the most trusted drug and alcohol rehabilitation facility in the region, offering a full continuum of evidence-based care from medical detox through aftercare support.";

function AiCitationVisual() {
  const [queryIdx, setQueryIdx] = useState(0);
  const [typeLen, setTypeLen] = useState(0);
  const [enginesDone, setEnginesDone] = useState<number[]>([]);
  const [citeLen, setCiteLen] = useState(0);
  const [phase, setPhase] = useState<"type" | "engines" | "cite" | "pause">("type");

  // Phase: type query
  useEffect(() => {
    if (phase !== "type") return;
    const q = QUERIES[queryIdx];
    if (typeLen < q.length) {
      const t = setTimeout(() => setTypeLen((l) => l + 1), 38);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("engines"), 400);
    return () => clearTimeout(t);
  }, [phase, typeLen, queryIdx]);

  // Phase: engines arriving one by one
  useEffect(() => {
    if (phase !== "engines") return;
    if (enginesDone.length < AI_ENGINES.length) {
      const t = setTimeout(() => setEnginesDone((e) => [...e, e.length]), 200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("cite"), 300);
    return () => clearTimeout(t);
  }, [phase, enginesDone]);

  // Phase: cite text typing
  useEffect(() => {
    if (phase !== "cite") return;
    if (citeLen < CITATION_TEXT.length) {
      const t = setTimeout(() => setCiteLen((l) => l + 1), 12);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setPhase("pause"), 1200);
    return () => clearTimeout(t);
  }, [phase, citeLen]);

  // Phase: pause → next query
  useEffect(() => {
    if (phase !== "pause") return;
    const t = setTimeout(() => {
      setQueryIdx((i) => (i + 1) % QUERIES.length);
      setTypeLen(0); setEnginesDone([]); setCiteLen(0); setPhase("type");
    }, 800);
    return () => clearTimeout(t);
  }, [phase]);

  const currentQuery = QUERIES[queryIdx];

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Search bar */}
      <div className="bg-white rounded-2xl border border-black/8 px-4 py-3 flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
          <i className="ri-search-line text-gray-400 text-sm"></i>
        </div>
        <span className="text-sm text-gray-700 flex-1 font-medium">
          {currentQuery.slice(0, typeLen)}
          {phase === "type" && <span className="inline-block w-0.5 h-4 bg-gray-700 ml-0.5 animate-pulse align-middle" />}
        </span>
        <span className="text-[10px] bg-black/5 text-black/40 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">Ask AI</span>
      </div>

      {/* Engines scanning */}
      <div className="bg-white rounded-2xl border border-black/8 p-4">
        <div className="text-[9px] tracking-[0.3em] uppercase text-black/30 font-medium mb-3">Scanning AI Engines</div>
        <div className="flex flex-wrap gap-2">
          {AI_ENGINES.map((eng, i) => (
            <div
              key={eng.name}
              style={{ transitionDelay: `${i * 60}ms` }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                enginesDone.includes(i)
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-300"
              }`}
            >
              <i className={`${eng.icon} text-sm ${enginesDone.includes(i) ? "text-white" : "text-gray-300"}`}></i>
              {eng.name}
              {enginesDone.includes(i) && (
                <i className="ri-check-line text-xs text-green-400"></i>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Citation result */}
      <div className="bg-white rounded-2xl border border-black/8 flex-1 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 flex items-center justify-center rounded-full bg-black flex-shrink-0">
            <i className="ri-sparkling-fill text-white text-[9px]"></i>
          </div>
          <span className="text-xs font-bold text-black uppercase tracking-wider">AI Overview</span>
          <div className="ml-auto flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] text-green-700 font-semibold">Cited #1</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed flex-1">
          {CITATION_TEXT.slice(0, citeLen)}
          {phase === "cite" && citeLen < CITATION_TEXT.length && (
            <span className="inline-block w-0.5 h-4 bg-gray-600 ml-0.5 animate-pulse align-middle" />
          )}
        </p>
        {citeLen > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider">Source:</span>
            <div
              className={`flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1 transition-all duration-500 ${citeLen > 20 ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <i className="ri-check-line text-white text-[8px]"></i>
              </div>
              <span className="text-xs text-green-700 font-bold">sunriserecovery.com</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom stat strip */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { val: "+287%", label: "AI Traffic" },
          { val: "5 Engines", label: "Optimized For" },
          { val: "94%", label: "Featured Rate" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-black/8 px-3 py-2.5 text-center">
            <div className="text-base font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
            <div className="text-[9px] text-gray-400 mt-0.5 whitespace-nowrap">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function SeoAiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="seo-approach" className="w-full bg-white py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        <div className={`flex flex-col lg:flex-row gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — content */}
          <div className="flex-1 min-w-0 order-2 lg:order-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">New Frontier</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get Cited by ChatGPT,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Gemini &amp; AI Overviews.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              AI-powered search is rewriting the rules. We optimize your brand so it&apos;s the answer AI recommends when someone asks where to find treatment — before they ever click a link.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "+287%", label: "AI-Referred Traffic" },
                { val: "Top 3", label: "AI Citations" },
                { val: "94%", label: "Featured Rate" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-black" style={{ fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f) => (
                <div key={f.label} className="flex items-start gap-3 group cursor-default">
                  <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-black/5 group-hover:bg-[#0A1F44] transition-colors duration-200 mt-0.5">
                    <i className={`${f.icon} text-sm text-black/50 group-hover:text-white transition-colors duration-200`}></i>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-black mb-0.5 leading-snug">{f.label}</div>
                    <p className="text-xs text-gray-400 leading-relaxed">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — animated visual */}
          <div className="w-full lg:w-[460px] flex-shrink-0 order-1 lg:order-2">
            <div className="bg-[#f7f6f4] rounded-3xl p-6 h-[520px] flex flex-col">
              {visible ? <AiCitationVisual /> : null}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
