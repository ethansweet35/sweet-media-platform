"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "ri-speed-up-line", label: "Core Web Vitals Optimization", text: "LCP, FID, and CLS improvements that satisfy Google's page experience signal, lift rankings, and reduce bounce rate caused by slow load times." },
  { icon: "ri-git-branch-line", label: "Site Architecture & Internal Linking", text: "Silo structures and link flows that concentrate authority on your highest-value pages and make it clear to Google what matters most." },
  { icon: "ri-code-s-slash-line", label: "Schema Markup Implementation", text: "Organization, LocalBusiness, MedicalOrganization, and FAQ schema that enables rich results and gives search engines full context about your facility." },
  { icon: "ri-bug-line", label: "Crawl Health & Indexation", text: "Robots.txt, canonical tags, redirect chains, and duplicate content resolved so Google crawls and indexes exactly what needs to rank." },
];

/* ─── Audit Items ────────────────────────────────────────────────── */
const AUDIT_ITEMS = [
  { label: "Core Web Vitals", status: "fixed", points: 18 },
  { label: "Schema Markup", status: "fixed", points: 14 },
  { label: "Crawl Errors Resolved", status: "fixed", points: 12 },
  { label: "Duplicate Content", status: "fixed", points: 10 },
  { label: "Page Speed (Mobile)", status: "fixed", points: 16 },
  { label: "Internal Link Structure", status: "fixed", points: 8 },
  { label: "Broken Redirects", status: "fixed", points: 6 },
];

const VITALS = [
  { label: "LCP", before: "4.8s", after: "1.2s", color: "#22c55e" },
  { label: "FID", before: "280ms", after: "42ms", color: "#22c55e" },
  { label: "CLS", before: "0.28", after: "0.04", color: "#22c55e" },
];

/* ─── Radial Score Gauge ─────────────────────────────────────────── */
function ScoreGauge({ score, animated }: { score: number; animated: boolean }) {
  const r = 52;
  const cx = 68;
  const cy = 68;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * r;
  const displayScore = animated ? score : 0;
  const offset = circumference - (displayScore / 100) * circumference;
  const color = score >= 90 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative flex items-center justify-center" style={{ width: 136, height: 136 }}>
      <svg width="136" height="136">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={strokeWidth} />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1), stroke 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-black leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
          {animated ? displayScore : 0}
        </span>
        <span className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Score</span>
      </div>
    </div>
  );
}

/* ─── Technical Audit Visual ─────────────────────────────────────── */
function TechnicalAuditVisual({ active }: { active: boolean }) {
  const [beforeScore] = useState(34);
  const [afterScore] = useState(96);
  const [showBefore, setShowBefore] = useState(true);
  const [itemsDone, setItemsDone] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState("Before");
  const [vitalFlip, setVitalFlip] = useState(false);
  const [trafficPct, setTrafficPct] = useState(0);

  useEffect(() => {
    if (!active) return;

    // Reveal audit items one by one
    AUDIT_ITEMS.forEach((_, i) => {
      setTimeout(() => setItemsDone(i + 1), 300 + i * 260);
    });

    // Flip to after score
    setTimeout(() => {
      setShowBefore(false);
      setPhaseLabel("After");
    }, 300 + AUDIT_ITEMS.length * 260 + 400);

    // Flip vitals
    setTimeout(() => setVitalFlip(true), 300 + AUDIT_ITEMS.length * 260 + 600);

    // Traffic counter
    let pct = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        pct += 4;
        setTrafficPct(Math.min(pct, 320));
        if (pct >= 320) clearInterval(iv);
      }, 25);
    }, 300 + AUDIT_ITEMS.length * 260 + 800);

    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Score + label */}
      <div className="bg-white rounded-2xl border border-black/8 p-4 flex items-center gap-5">
        <ScoreGauge score={showBefore ? beforeScore : afterScore} animated={active} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider transition-all duration-500 ${!showBefore ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
              {phaseLabel}
            </span>
          </div>
          <div className="text-sm font-bold text-black mb-1">Technical SEO Score</div>
          <div className="text-xs text-gray-400 leading-snug">
            {showBefore
              ? "Critical issues blocking ranking potential"
              : "All signals resolved. Full ranking authority unlocked."}
          </div>
          {!showBefore && (
            <div className="mt-2 flex items-center gap-1.5">
              <i className="ri-arrow-up-line text-green-500 text-sm"></i>
              <span className="text-sm font-bold text-green-600">+{trafficPct}% traffic lift</span>
            </div>
          )}
        </div>
      </div>

      {/* Audit checklist */}
      <div className="bg-white rounded-2xl border border-black/8 p-4 flex-1">
        <div className="text-[9px] tracking-[0.3em] uppercase text-black/30 font-medium mb-3">Issues Resolved</div>
        <div className="flex flex-col gap-1.5">
          {AUDIT_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 transition-all duration-400 ${i < itemsDone ? "opacity-100" : "opacity-20"}`}
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className={`w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ${i < itemsDone ? "bg-green-500" : "bg-gray-100"}`}>
                <i className={`ri-check-line text-[10px] ${i < itemsDone ? "text-white" : "text-gray-300"}`}></i>
              </div>
              <span className={`text-xs flex-1 font-medium transition-colors duration-300 ${i < itemsDone ? "text-black" : "text-gray-300"}`}>{item.label}</span>
              {i < itemsDone && (
                <span className="text-[10px] font-bold text-green-600 bg-green-50 rounded-full px-2 py-0.5">+{item.points} pts</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Core Vitals strip */}
      <div className="grid grid-cols-3 gap-2">
        {VITALS.map((v) => (
          <div key={v.label} className="bg-white rounded-xl border border-black/8 px-2.5 py-2 text-center">
            <div className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">{v.label}</div>
            <div
              className={`text-sm font-bold transition-all duration-700 ${vitalFlip ? "text-green-600" : "text-red-500"}`}
            >
              {vitalFlip ? v.after : v.before}
            </div>
            {vitalFlip && <i className="ri-checkbox-circle-fill text-green-500 text-[10px]"></i>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ─────────────────────────────────────────────────── */
export default function SeoTechnicalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#f4f6f9] py-[60px] md:py-[100px] overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20">
        <div className={`flex flex-col lg:flex-row-reverse gap-14 xl:gap-20 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Right — animated visual */}
          <div className="w-full lg:w-[460px] flex-shrink-0">
            <div className="bg-white rounded-3xl border border-black/8 p-6 h-[560px] flex flex-col">
              <TechnicalAuditVisual active={visible} />
            </div>
          </div>

          {/* Left — content */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <span className="text-[9px] tracking-[0.35em] uppercase font-bold text-black/30 border border-black/10 rounded-full px-3 py-1">Site-Level Authority</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Fix the Foundation,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Unlock the Ceiling.</em>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Site speed, crawlability, Core Web Vitals, and structured data — technical SEO is the infrastructure that determines whether Google can find, trust, and rank your content at all.
            </p>

            <div className="flex flex-wrap gap-8 pb-7 border-b border-black/8 mb-8 justify-center lg:justify-start">
              {[
                { val: "3.2x", label: "Avg. Traffic Lift" },
                { val: "30 Days", label: "Audit to Live" },
                { val: "100+", label: "Signals Fixed" },
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

        </div>
      </div>
    </section>
  );
}
