"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function AboutHero() {
  const [visible, setVisible] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => {
      if (lineRef.current) lineRef.current.style.width = "100%";
    }, 600);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener("scroll", onScroll); };
  }, []);

  const orb1Y = scrollY * 0.18;
  const orb2Y = scrollY * 0.32;
  const sweepY = scrollY * 0.10;

  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden" style={{ background: "#0A1F44" }}>

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(123,159,212,0.28) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(180,210,255,0.1) 0%, transparent 60%)",
        animation: "abtSweep 12s ease-in-out infinite alternate",
        transform: `translateY(${sweepY}px)`,
      }} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: "600px", height: "600px", top: "-180px", right: "-120px", background: "radial-gradient(circle, rgba(123,159,212,0.28) 0%, transparent 70%)", animation: "abtOrb1 18s ease-in-out infinite alternate", transform: `translateY(${orb1Y}px)`, willChange: "transform" }} />
        <div className="absolute rounded-full" style={{ width: "420px", height: "420px", bottom: "-100px", left: "-80px", background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)", animation: "abtOrb2 14s ease-in-out infinite alternate", transform: `translateY(${orb2Y}px)`, willChange: "transform" }} />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="abtDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#abtDots)" />
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.07) 50%, transparent 75%)", animation: "abtBeam 8s ease-in-out infinite alternate" }} />

      <style>{`
        @keyframes abtOrb1 { 0% { transform: translate(0px,0px) scale(1); } 50% { transform: translate(-70px,50px) scale(1.12); } 100% { transform: translate(40px,-80px) scale(0.93); } }
        @keyframes abtOrb2 { 0% { transform: translate(0px,0px) scale(1); } 50% { transform: translate(55px,-45px) scale(1.15); } 100% { transform: translate(-40px,65px) scale(0.9); } }
        @keyframes abtSweep { 0% { opacity:0.7; transform:scale(1) translateX(0px); } 100% { opacity:1; transform:scale(1.08) translateX(50px); } }
        @keyframes abtBeam { 0% { opacity:0; transform:translateX(-80px); } 35% { opacity:1; } 100% { opacity:0; transform:translateX(80px); } }
      `}</style>

      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-20">
        <div className="w-px h-14 bg-white/15" />
        <p className="text-[8px] tracking-[0.45em] uppercase text-white/25 font-light" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>Costa Mesa · California · Est. 2023</p>
        <div className="w-px h-14 bg-white/15" />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 md:px-6 pt-32 pb-20">

        <div className="flex items-center gap-1.5 mb-10 justify-center lg:justify-start">
          <Link href="/" className="text-[7px] md:text-[9px] tracking-[0.15em] md:tracking-[0.3em] uppercase text-white/35 hover:text-white/70 transition-colors cursor-pointer">Home</Link>
          <span className="text-white/20 text-[9px]">/</span>
          <span className="text-[7px] md:text-[9px] tracking-[0.15em] md:tracking-[0.3em] uppercase text-white/60">About</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — headline */}
          <div>
            <div className={`flex items-center gap-3 mb-8 transition-all duration-700 justify-center lg:justify-start ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="w-6 h-px bg-white/40 flex-shrink-0" />
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/50 font-medium">About Sweet Media</span>
            </div>

            <h1 className={`leading-[1.0] mb-6 transition-all duration-700 delay-100 text-center lg:text-left ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="block text-[42px] sm:text-[54px] md:text-[64px] font-light italic text-white/70">Built for</span>
              <span className="block text-[42px] sm:text-[54px] md:text-[64px] font-bold text-white">Behavioral Health.</span>
              <span className="block text-[42px] sm:text-[54px] md:text-[64px] font-light italic text-white/70">Nothing Else.</span>
            </h1>

            <div ref={lineRef} className="h-px bg-white/20 mb-8 transition-all duration-1000 ease-out max-w-full" style={{ width: "0%" }} />

            <p className={`text-white/55 text-sm md:text-base leading-relaxed mb-10 max-w-lg font-light transition-all duration-700 delay-150 text-center lg:text-left mx-auto lg:mx-0 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              Sweet Media is a boutique digital marketing agency founded in Costa Mesa, California. We work exclusively with behavioral health treatment centers — residential programs, detox facilities, IOP clinics, sober living homes, and mental health practices.
            </p>

            <div className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 justify-center lg:justify-start ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a href="#about-team" className="inline-flex items-center gap-2.5 bg-white text-[#0A1F44] text-[11px] tracking-[0.2em] uppercase font-bold px-7 py-4 rounded-full hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap">
                Meet the Team
                <i className="ri-arrow-right-line text-sm"></i>
              </a>
              <a href="#about-contact" className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-white/40 hover:text-white transition-colors cursor-pointer whitespace-nowrap">
                Get in Touch
                <i className="ri-arrow-down-line text-xs"></i>
              </a>
            </div>
          </div>

          {/* Right — quick facts */}
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "ri-map-pin-2-line", label: "Headquarters", val: "Costa Mesa, CA" },
                { icon: "ri-calendar-line", label: "Founded", val: "2023" },
                { icon: "ri-team-line", label: "Team Size", val: "5 Specialists" },
                { icon: "ri-hospital-line", label: "Clients Served", val: "40+ Facilities" },
                { icon: "ri-focus-3-line", label: "Industry Focus", val: "100% Behavioral Health" },
                { icon: "ri-award-line", label: "Avg. Client Rating", val: "4.9 / 5.0 ★" },
              ].map((f) => (
                <div key={f.label} className="bg-white/[0.07] border border-white/12 rounded-2xl p-5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 mb-3">
                    <i className={`${f.icon} text-white/60 text-sm`}></i>
                  </div>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-white/35 mb-1">{f.label}</div>
                  <div className="text-sm font-semibold text-white">{f.val}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-20">
        <div className="w-px h-8 bg-white/20" />
        <p className="text-[8px] tracking-[0.35em] uppercase text-white/30">Scroll</p>
      </div>
    </section>
  );
}