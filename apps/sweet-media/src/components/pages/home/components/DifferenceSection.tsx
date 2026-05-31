"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Animated Counter ──────────────────────────────────────────── */
function Counter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(parseFloat((ease * target).toFixed(decimals)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? val.toFixed(decimals) : val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Proof Rail ─────────────────────────────────────────────────── */
const proofStats = [
  {
    val: 40,
    suffix: "+",
    label: "BH Clients",
    sub: "Active partnerships",
    icon: "ri-hospital-line",
  },
  {
    val: 312,
    suffix: "%",
    label: "Avg. Traffic Lift",
    sub: "Within 6 months",
    icon: "ri-line-chart-line",
  },
  {
    val: 420,
    prefix: "$",
    label: "Avg. Cost-Per-Admission",
    sub: "vs. $2,100 benchmark",
    icon: "ri-money-dollar-circle-line",
  },
  {
    val: 4.9,
    suffix: "★",
    label: "Avg. Client Rating",
    sub: "Across all accounts",
    icon: "ri-star-line",
    decimals: 1,
  },
];

/* ─── Methodology Steps ──────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    icon: "ri-search-eye-line",
    title: "Deep-Dive Audit",
    desc: "We start with a comprehensive audit of your digital presence — SEO gaps, ad waste, content holes, and competitor advantages. No assumptions, only data.",
    accent: "Week 1",
  },
  {
    num: "02",
    icon: "ri-draft-line",
    title: "Custom Strategy",
    desc: "Every roadmap is built from scratch for your facility, your market, and your census goals. We don't recycle playbooks — we write new ones.",
    accent: "Week 2–3",
  },
  {
    num: "03",
    icon: "ri-flashlight-line",
    title: "Rapid Execution",
    desc: "While other agencies plan, we launch. Campaigns go live, content ships, and tracking is wired within your first 30 days.",
    accent: "Day 30",
  },
  {
    num: "04",
    icon: "ri-pulse-line",
    title: "Live Optimization",
    desc: "Weekly reviews, real-time dashboards, and strategic pivots happen automatically — so performance compounds month over month.",
    accent: "Ongoing",
  },
];

/* ─── Comparison Rows ────────────────────────────────────────────── */
const compRows = [
  { label: "Industry Focus", us: "Behavioral health only", them: "All industries" },
  { label: "Success Metric", us: "Admissions & census", them: "Impressions & clicks" },
  { label: "Account Management", us: "Senior strategists", them: "Junior coordinators" },
  { label: "Reporting", us: "Full transparency, real-time", them: "Monthly PDF summary" },
  { label: "Creative Team", us: "In-house, dedicated", them: "Outsourced freelancers" },
  { label: "Strategy Cadence", us: "Weekly optimization", them: "Quarterly reviews" },
];

/* ─── Main Component ─────────────────────────────────────────────── */
export default function DifferenceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* Auto-advance methodology steps */
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setActiveStep((s) => (s + 1) % steps.length), 2800);
    return () => clearInterval(t);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      id="difference"
      className="w-full bg-white py-[50px] md:py-[100px] px-4 md:px-6 overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">

        {/* ── Section Header ─────────────────────────────────────── */}
        <div
          className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-end">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
                <div className="w-8 h-px bg-[#0A1F44]" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">Our Difference</span>
              </div>
              <h2
                className="text-[36px] md:text-5xl font-bold text-black leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Why Top Behavioral Health
                <br />
                Leaders{" "}
                <em className="font-light italic" style={{color:'#0A1F44'}}>Choose Sweet Media.</em>
              </h2>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-black/60 text-sm leading-relaxed max-w-md mx-auto lg:ml-auto lg:mr-0">
                We're not a generalist agency that added a healthcare vertical. We were built from
                day one for behavioral health — and that specialization changes everything from
                strategy to results.
              </p>
              <div className="mt-6 flex items-center gap-3 justify-center lg:justify-end">
                <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
                <span className="text-[11px] tracking-[0.25em] uppercase text-black/30 font-medium">
                  Costa Mesa, CA
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
                <span className="text-[11px] tracking-[0.25em] uppercase text-black/30 font-medium">
                  Est. 2023
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Proof Stats Rail ───────────────────────────────────── */}
        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-16 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {proofStats.map((s, i) => (
            <div
              key={s.label}
              className="bg-[#f4f6f9] border border-black/5 rounded-2xl px-4 md:px-7 py-5 md:py-6 flex items-start gap-3 md:gap-4 hover:bg-[#eef1f8] hover:border-black/10 transition-colors duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-xl bg-[#0A1F44] flex-shrink-0 mt-0.5">
                <i className={`${s.icon} text-white text-sm`}></i>
              </div>
              <div className="min-w-0">
                <div
                  className="text-xl md:text-2xl font-bold text-black leading-none mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <Counter
                    target={s.val}
                    suffix={s.suffix ?? ""}
                    prefix={s.prefix ?? ""}
                    decimals={s.decimals ?? 0}
                  />
                </div>
                <div className="text-xs font-semibold text-black leading-tight">{s.label}</div>
                <div className="text-[10px] text-black/45 mt-0.5 hidden sm:block">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* -- Comparison Block -- */}
        <div
          className={`rounded-3xl overflow-hidden border border-black/8 mb-16 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Top banner — dark typographic, no image */}
          <div className="bg-black px-8 md:px-14 py-10 md:py-12">
            <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
              {/* Quote */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-5 h-px bg-white/25"></div>
                  <span className="text-[9px] tracking-[0.4em] uppercase text-white/35 font-medium">Sweet Media · Costa Mesa, CA</span>
                </div>
                <p
                  className="text-[20px] md:text-[28px] text-white font-light leading-[1.4] max-w-xl"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  We don&apos;t work with everyone. We work with behavioral health —
                  <em className="italic" style={{color:'#7B9FD4'}}> exclusively.</em> That focus means
                  faster results, sharper strategy, and a team that already speaks your language.
                </p>
              </div>
              {/* Key stats */}
              <div className="flex flex-row md:flex-col gap-6 md:gap-5 md:items-end flex-shrink-0">
                {[
                  { val: "100%", label: "BH-Exclusive" },
                  { val: "7+", label: "Years of Focus" },
                  { val: "40+", label: "Active Clients" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col md:items-end gap-2">
                    <span
                      className="text-3xl font-bold text-white leading-none"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {s.val}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/35">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom — comparison table */}
          <div className="bg-white">

            {/* ── Desktop table (md+) ── */}
            <div className="hidden md:block">
              {/* Column headers */}
              <div className="grid grid-cols-3 bg-black/[0.03] border-b border-gray-100">
                <div className="px-6 py-4 border-r border-gray-100">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Criteria</span>
                </div>
                <div className="px-6 py-4 border-r border-gray-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0A1F44] flex-shrink-0"></div>
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest">Sweet Media</span>
                </div>
                <div className="px-6 py-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Typical Agency</span>
                </div>
              </div>
              {/* Data rows */}
              <div className="divide-y divide-gray-100">
                {compRows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-3 transition-colors duration-150 cursor-default ${hoveredRow === i ? "bg-gray-50" : ""}`}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <div className="px-6 py-4 border-r border-gray-100 flex items-center">
                      <span className="text-xs font-semibold text-gray-400 leading-snug">{row.label}</span>
                    </div>
                    <div className="px-6 py-4 border-r border-gray-100 flex items-center gap-2.5">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full bg-[#0A1F44] flex-shrink-0">
                        <i className="ri-check-line text-white text-[10px]"></i>
                      </div>
                      <span className="text-xs font-semibold text-black leading-snug">{row.us}</span>
                    </div>
                    <div className="px-6 py-4 flex items-center gap-2.5">
                      <div className="w-5 h-5 flex items-center justify-center rounded-full border border-gray-200 flex-shrink-0">
                        <i className="ri-close-line text-gray-300 text-[10px]"></i>
                      </div>
                      <span className="text-xs text-gray-400 leading-snug">{row.them}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Mobile cards (< md) ── */}
            <div className="md:hidden divide-y divide-gray-100">
              {/* Column legend */}
              <div className="grid grid-cols-2 bg-black/[0.03] px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0A1F44] flex-shrink-0"></div>
                  <span className="text-[10px] font-bold text-black uppercase tracking-widest">Sweet Media</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0"></div>
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Typical Agency</span>
                </div>
              </div>
              {compRows.map((row) => (
                <div key={row.label} className="px-4 py-4">
                  {/* Row label */}
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">{row.label}</p>
                  {/* Two-col value comparison */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Us */}
                    <div className="flex items-start gap-2 bg-black/[0.02] rounded-xl px-3 py-2.5">
                      <div className="w-4 h-4 flex items-center justify-center rounded-full bg-[#0A1F44] flex-shrink-0 mt-0.5">
                        <i className="ri-check-line text-white text-[9px]"></i>
                      </div>
                      <span className="text-xs font-semibold text-black leading-snug">{row.us}</span>
                    </div>
                    {/* Them */}
                    <div className="flex items-start gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
                      <div className="w-4 h-4 flex items-center justify-center rounded-full border border-gray-200 flex-shrink-0 mt-0.5">
                        <i className="ri-close-line text-gray-300 text-[9px]"></i>
                      </div>
                      <span className="text-xs text-gray-400 leading-snug">{row.them}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 px-6 py-3.5 flex items-center gap-2 bg-gray-50/40">
              <i className="ri-information-line text-gray-300 text-sm flex-shrink-0"></i>
              <span className="text-[10px] text-gray-400">
                Based on analysis of 40+ behavioral health marketing agencies.
              </span>
            </div>
          </div>
        </div>

        {/* ── Methodology Strip ──────────────────────────────────── */}
        <div
          className={`mb-16 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px bg-black/20"></div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-black/35 font-medium">
              How We Work
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Step indicators */}
            <div className="flex flex-col gap-3">
              {steps.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() => setActiveStep(i)}
                  className={`group w-full text-left rounded-2xl border transition-all duration-300 cursor-pointer px-5 md:px-6 py-4 md:py-5 flex items-center gap-4 md:gap-5 ${
                    activeStep === i
                      ? "bg-[#0A1F44] border-[#0A1F44]"
                      : "bg-[#f4f6f9] border-black/5 hover:border-black/15"
                  }`}
                >
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0 transition-colors duration-300 ${
                      activeStep === i ? "bg-white/10" : "bg-black/5 group-hover:bg-[#0A1F44]/10"
                    }`}
                  >
                    <i
                      className={`${s.icon} text-base transition-colors duration-300 ${
                        activeStep === i ? "text-white" : "text-black/50"
                      }`}
                    ></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-bold transition-colors duration-300 ${
                        activeStep === i ? "text-white" : "text-black"
                      }`}
                    >
                      {s.title}
                    </div>
                    <div
                      className={`text-[10px] font-medium uppercase tracking-widest mt-0.5 transition-colors duration-300 ${
                        activeStep === i ? "text-white/40" : "text-gray-400"
                      }`}
                    >
                      {s.accent}
                    </div>
                  </div>
                  <span
                    className={`text-2xl font-bold transition-colors duration-300 flex-shrink-0 ${
                      activeStep === i ? "text-white/15" : "text-black/8"
                    }`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {s.num}
                  </span>
                </button>
              ))}
            </div>

            {/* Active step detail */}
            <div className="bg-[#f4f6f9] border border-black/5 rounded-3xl p-7 md:p-10 flex flex-col justify-between min-h-[280px] md:min-h-[340px]">
              <div>
                <span className="text-[10px] tracking-[0.35em] uppercase font-bold text-black/30 mb-4 block">
                  {steps[activeStep].accent}
                </span>
                <div
                  className="text-[80px] font-bold text-black/5 leading-none select-none -mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {steps[activeStep].num}
                </div>
                <h3
                  className="text-2xl font-bold text-black mb-4 leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {steps[activeStep].title}
                </h3>
                <p className="text-sm text-black/60 leading-relaxed">
                  {steps[activeStep].desc}
                </p>
              </div>
              {/* Progress dots */}
              <div className="flex items-center gap-2 mt-8">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`cursor-pointer transition-all duration-300 rounded-full ${
                      activeStep === i ? "w-6 h-2 bg-[#0A1F44]" : "w-2 h-2 bg-black/15 hover:bg-black/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Stat Bar ─────────────────────────────────────── */}
        <div
          className={`border-t border-gray-200 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {[
            { num: "7+", label: "Years in Behavioral Health" },
            { num: "40+", label: "Active Client Partnerships" },
            { num: "100%", label: "BH-Exclusive Agency" },
            { num: "$420", label: "Avg. Cost-Per-Admission" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-2xl font-bold text-black"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {s.num}
              </div>
              <div className="text-[10px] tracking-widest uppercase text-gray-400 mt-3">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
