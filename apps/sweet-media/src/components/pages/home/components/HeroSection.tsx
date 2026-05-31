"use client";

import { useEffect, useRef, useState, useMemo } from "react";

// Seeded pseudo-random — deterministic so SSR/hydration never mismatches
function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

interface Particle {
  x: number;
  y: number;
  r: number;
  opacity: number;
  dur: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  const rand = seededRand(42);
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 100,
    r: rand() * 1.4 + 0.4,
    opacity: rand() * 0.45 + 0.1,
    dur: rand() * 4 + 3,
    delay: rand() * 6,
  }));
}

const metrics = [
  { num: "40+", label: "Behavioral Health Clients" },
  { num: "$68", label: "Average Cost Per Lead" },
  { num: "3.2×", label: "Google Ads ROAS" },
  { num: "92%", label: "Client Retention Rate" },
];

const orbitItems = [
  { angle: 0,   label: "SEO",        icon: "ri-search-line",       delay: 0 },
  { angle: 72,  label: "Paid Media", icon: "ri-funds-line",        delay: 0.3 },
  { angle: 144, label: "Social",     icon: "ri-instagram-line",    delay: 0.6 },
  { angle: 216, label: "Web Dev",    icon: "ri-code-s-slash-line", delay: 0.9 },
  { angle: 288, label: "Analytics",  icon: "ri-bar-chart-line",    delay: 1.2 },
];

const RADIUS = 185;
/** Orbit pivot (440×440 ring), used so counter‑rotation stays true upright */
const ORBIT_CX = 220;
const ORBIT_CY = 220;
/** Approx. cluster bbox (icon + gap + longest label); keeps upright spin origin stable */
const ORBIT_CLUSTER_W = 112;
const ORBIT_CLUSTER_H = 68;

/** One canvas layer replaces dozens of absolutely-positioned divs (fewer DOM nodes, same sparkle look). */
function ParticleCanvasLayer() {
  const ref = useRef<HTMLCanvasElement>(null);
  const particles = useMemo(() => generateParticles(35), []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const root = canvas.parentElement;
    if (!root) return;

    let rafId = 0;
    const start = performance.now();
    let resizeRaf = 0;

    const layout = () => {
      const rect = root.getBoundingClientRect();
      const dpr = Math.min(globalThis.devicePixelRatio || 1, 2);
      const wCss = rect.width || 800;
      const hCss = rect.height || 600;
      canvas.width = Math.max(1, Math.floor(wCss * dpr));
      canvas.height = Math.max(1, Math.floor(hCss * dpr));
      canvas.style.width = `${wCss}px`;
      canvas.style.height = `${hCss}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const scheduleLayout = () => {
      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        layout();
      });
    };

    layout();
    const ro = new ResizeObserver(scheduleLayout);
    ro.observe(root);

    const loop = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const elapsed = (t - start) / 1000;

      for (const p of particles) {
        const local = elapsed + p.delay;
        const phase = (Math.sin((local / p.dur) * Math.PI * 2) + 1) / 2;
        const opacity = p.opacity * 0.3 + phase * (p.opacity - p.opacity * 0.3);
        const px = (p.x / 100) * w;
        const py = (p.y / 100) * h;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      ro.disconnect();
    };
  }, [particles]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <canvas ref={ref} className="absolute inset-0 block h-full w-full" aria-hidden />
    </div>
  );
}

const serif = "var(--font-cormorant-garamond), Georgia, 'Times New Roman', serif";

export default function HeroSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [census, setCensus] = useState(40);
  const [graphicScale, setGraphicScale] = useState(1);
  // Defer heavy orbit animation until after first paint
  const [orbitReady, setOrbitReady] = useState(false);

  useEffect(() => {
    let raf = 0;
    const calcScale = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const vw = window.innerWidth;
        if (vw < 1024) {
          setGraphicScale(Math.max(0.52, Math.min(1, (vw - 32) / 440)));
        } else {
          setGraphicScale(1.15);
        }
      });
    };
    calcScale();
    window.addEventListener("resize", calcScale, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", calcScale);
    };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => {
      if (lineRef.current) lineRef.current.style.width = "32px";
    }, 700);
    // Defer orbit spin until after LCP — avoids competing with paint
    const t3 = setTimeout(() => setOrbitReady(true), 800);

    // Census counter — runs once, short-lived
    let count = 40;
    const counter = setInterval(() => {
      count += 1;
      setCensus(count);
      if (count >= 94) clearInterval(counter);
    }, 28);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(counter);
    };
  }, []);

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#0A1F44" }}>

      {/* ── Static gradient tint — no animation, pure CSS paint ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(123,159,212,0.32) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 15% 75%, rgba(180,210,255,0.14) 0%, transparent 60%)",
      }} />

      {/* ── Static accent orbs — no animation, just depth ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width:"700px", height:"700px", top:"-200px", right:"-150px", background:"radial-gradient(circle, rgba(123,159,212,0.22) 0%, transparent 70%)" }} />
        <div className="absolute rounded-full" style={{ width:"450px", height:"450px", bottom:"-120px", left:"-100px", background:"radial-gradient(circle, rgba(180,210,255,0.14) 0%, transparent 70%)" }} />
      </div>

      {/* ── Dot grid ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg className="w-full h-full opacity-[0.09]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      {/* ── Particle / star field ── */}
      <ParticleCanvasLayer />

      {/* ── Static light tint — no animation ── */}
      <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ background:"linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)" }} />

      <style>{`
        /* Orbit ring spins via CSS — only animation remaining in hero */
        .orbit-ring { animation: orbitSpin 18s linear infinite; will-change: transform; transform-origin: center center; }

        /* Outer pulse ring */
        .pulse-ring  { animation: pulseRing 3s ease-in-out infinite; will-change: transform; }

        @keyframes orbitSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulseRing  { 0%,100%{transform:scale(1);opacity:0.4} 50%{transform:scale(1.05);opacity:0.8} }
      `}</style>

      {/* ── Main layout ── */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-5 md:px-6 pt-28 md:pt-36 pb-10 md:pb-14">
        <div className="flex flex-col lg:flex-row items-center gap-0 lg:gap-0">

          {/* ══ LEFT COLUMN ══ */}
          <div
            className={`flex-1 min-w-0 pb-2 lg:pb-12 text-center lg:text-left transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 lg:mb-8">
              <div
                ref={lineRef}
                className="h-px transition-all duration-1000 ease-out flex-shrink-0 bg-white/40"
                style={{ width: "0px" }}
              />
              <span className="text-[10px] sm:text-[9px] tracking-[0.18em] uppercase font-semibold text-white/50">
                Digital Marketing · Behavioral Health
              </span>
            </div>

            <h1 className="leading-[1.05] mb-5 md:mb-6" style={{ fontFamily: serif }}>
              <span className="block text-[40px] sm:text-[46px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-light italic text-white/70">
                Marketing That
              </span>
              <span className="block text-[40px] sm:text-[46px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-bold text-white">
                Fills Treatment
              </span>
              <span className="block text-[40px] sm:text-[46px] md:text-[56px] lg:text-[64px] xl:text-[72px] font-bold text-white">
                Centers.
              </span>
            </h1>

            <div className="w-16 h-px bg-white/20 mb-5 md:mb-6 mx-auto lg:mx-0" />

            <p className="text-[15px] leading-relaxed mb-7 md:mb-8 max-w-[540px] font-light text-white/55 mx-auto lg:mx-0">
              We help residential programs, detox facilities, and outpatient clinics grow census — through SEO, paid media, and web strategy built specifically for behavioral health.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-3 md:mb-8">
              <a
                href="#results"
                className="inline-flex items-center justify-center gap-2.5 text-[12px] tracking-[0.2em] uppercase font-bold px-7 py-4 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap bg-white text-[#0A1F44] hover:bg-white/90"
              >
                View Our Results
                <i className="ri-arrow-right-line text-sm" />
              </a>
              <a
                href="#getting-started"
                className="inline-flex items-center justify-center gap-2 text-[12px] tracking-[0.2em] uppercase font-medium text-white/45 hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                Get Started
                <i className="ri-arrow-right-line text-xs" />
              </a>
            </div>
          </div>

          {/* ══ RIGHT COLUMN — CSS-animated orbit ══ */}
          <div
            className={`flex-1 min-w-0 flex items-center justify-center relative transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ height: `${Math.round(440 * graphicScale)}px` }}
          >
            <div
              className="relative flex items-center justify-center origin-center"
              style={{ width: "440px", height: "440px", transform: `scale(${graphicScale})` }}
            >

              {/* Outer pulse ring — scale only, no layout reflow */}
              <div
                className="absolute rounded-full pulse-ring"
                style={{
                  width: "410px",
                  height: "410px",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              />

              {/* Mid ring */}
              <div className="absolute rounded-full" style={{ width:"340px", height:"340px", border:"1px dashed rgba(255,255,255,0.12)" }} />

              {/* Inner ring */}
              <div className="absolute rounded-full" style={{ width:"250px", height:"250px", border:"1px solid rgba(255,255,255,0.08)" }} />

              {/* CSS orbit ring — deferred until after LCP to avoid competing with paint */}
              <div className={orbitReady ? "orbit-ring absolute" : "absolute"} style={{ width:"440px", height:"440px" }}>
                {orbitItems.map((item, i) => {
                  const angle = toRad(item.angle);
                  const cx = ORBIT_CX + Math.cos(angle) * RADIUS;
                  const cy = ORBIT_CY + Math.sin(angle) * RADIUS;
                  /* transform-origin must be orbit center mapped into this node's local coords (neutralizes ring spin). */
                  const originX = ORBIT_CX - cx + ORBIT_CLUSTER_W / 2;
                  const originY = ORBIT_CY - cy + ORBIT_CLUSTER_H / 2;
                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${cx}px`,
                        top: `${cy}px`,
                        transform: "translate(-50%, -50%)",
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.7s ease ${item.delay}s`,
                      }}
                    >
                      <div
                        className="flex flex-col items-center gap-1"
                        style={{
                          width: ORBIT_CLUSTER_W,
                          ...(orbitReady
                            ? {
                                animation: "orbitSpin 18s linear infinite reverse",
                                transformOrigin: `${originX}px ${originY}px`,
                              }
                            : {}),
                        }}
                      >
                        <div
                          className="w-10 h-10 flex items-center justify-center rounded-full shrink-0"
                          style={{ background: "#0A1F44", boxShadow: "0 4px 20px rgba(10,31,68,0.25)" }}
                        >
                          <i className={`${item.icon} text-white text-sm`} />
                        </div>
                        <span className="text-[8px] tracking-[0.1em] uppercase font-semibold whitespace-nowrap text-white/70 text-center leading-tight">
                          {item.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center circle — census counter */}
              <div
                className="relative flex flex-col items-center justify-center rounded-full z-10"
                style={{ width:"190px", height:"190px", background:"#0A1F44" }}
              >
                <span className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-medium mb-1">Census</span>
                <span
                  className="text-5xl font-bold text-white leading-none"
                  style={{ fontFamily: serif }}
                >
                  {census}%
                </span>
                <span className="text-[9px] text-white/35 mt-1.5 font-light">occupancy</span>

                <svg
                  className="absolute inset-0"
                  width="190" height="190"
                  viewBox="0 0 190 190"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle cx="95" cy="95" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                  <circle
                    cx="95" cy="95" r="90"
                    fill="none"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 90}`}
                    strokeDashoffset={`${2 * Math.PI * 90 * (1 - census / 100)}`}
                    style={{ transition: "stroke-dashoffset 0.1s linear" }}
                  />
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ══ METRICS STRIP ══ */}
      <div className="relative z-10 w-full border-t border-white/10">
        <div className="max-w-screen-xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`py-6 md:py-7 px-4 md:px-6 flex flex-col gap-2.5 md:gap-3 ${
                  i === 0 ? "border-r border-b md:border-b-0 border-white/10" :
                  i === 1 ? "md:border-r border-white/10 border-b md:border-b-0" :
                  i === 2 ? "border-r border-white/10" : ""
                }`}
              >
                <span
                  className="font-bold text-white leading-none"
                  style={{ fontFamily: serif, fontSize: "clamp(24px, 2.8vw, 38px)" }}
                >
                  {m.num}
                </span>
                <span className="text-[11px] tracking-[0.08em] uppercase text-white/40 font-medium">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
