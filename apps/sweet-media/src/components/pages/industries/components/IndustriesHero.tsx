"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const pills = ["Residential", "Detox", "PHP", "IOP", "Sober Living", "Mental Health"];

export default function IndustriesHero() {
  const [visible, setVisible] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);
  const [formState, setFormData] = useState({ name: "", email: "", phone: "", program: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => {
      if (lineRef.current) lineRef.current.style.width = "100%";
    }, 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Lightweight CSS custom property parallax — no React state updates
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    let rafId = 0;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        hero.style.setProperty("--orb1-y", `${scrollY * 0.18}px`);
        hero.style.setProperty("--orb2-y", `${scrollY * 0.32}px`);
        hero.style.setProperty("--sweep-y", `${scrollY * 0.10}px`);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("scroll", onScroll); };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (charCount > 500) return;

    setSubmitting(true);
    setSubmitError(null);

    const formData: Record<string, unknown> = formState;
    let service = "General Inquiry";
    if ("service" in formData && formData["service"]) service = String(formData["service"]);
    else if ("program" in formData && formData["program"]) service = String(formData["program"]);
    else if ("budget" in formData && formData["budget"]) service = String(formData["budget"]);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          service,
          message: formState.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Contact form request failed");
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={heroRef} className="relative w-full min-h-screen flex items-center overflow-hidden" style={{ background: "#0A1F44" }}>

      {/* Animated gradient sweep */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(123,159,212,0.28) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(180,210,255,0.1) 0%, transparent 60%)",
        animation: "indSweep 12s ease-in-out infinite alternate",
        transform: "translateY(var(--sweep-y, 0px))",
      }} />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{
          width: "600px", height: "600px", top: "-180px", right: "-120px",
          background: "radial-gradient(circle, rgba(123,159,212,0.28) 0%, transparent 70%)",
          animation: "indOrb1 18s ease-in-out infinite alternate",
          transform: "translateY(var(--orb1-y, 0px))",
          willChange: "transform",
        }} />
        <div className="absolute rounded-full" style={{
          width: "420px", height: "420px", bottom: "-100px", left: "-80px",
          background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
          animation: "indOrb2 14s ease-in-out infinite alternate",
          transform: "translateY(var(--orb2-y, 0px))",
          willChange: "transform",
        }} />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="indDots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#indDots)" />
        </svg>
      </div>

      {/* Light beam */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(115deg, transparent 25%, rgba(255,255,255,0.07) 50%, transparent 75%)",
        animation: "indBeam 8s ease-in-out infinite alternate",
      }} />

      {/* Decorative vertical rule */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-20">
        <div className="w-px h-14 bg-white/15" />
        <p className="text-[8px] tracking-[0.45em] uppercase text-white/25 font-light" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          Behavioral Health · Marketing · Growth
        </p>
        <div className="w-px h-14 bg-white/15" />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 pt-32 pb-20">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-10 justify-center lg:justify-start">
          <Link href="/" className="text-[7px] md:text-[9px] tracking-[0.15em] md:tracking-[0.3em] uppercase text-white/35 hover:text-white/70 transition-colors cursor-pointer">Home</Link>
          <span className="text-white/20 text-[9px]">/</span>
          <span className="text-[7px] md:text-[9px] tracking-[0.15em] md:tracking-[0.3em] uppercase text-white/60">Industries</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-center">

          {/* LEFT */}
          <div className="flex-1 min-w-0">
            <div className={`flex items-center gap-3 mb-8 transition-all duration-700 justify-center lg:justify-start ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <div className="w-6 h-px bg-white/40 flex-shrink-0" />
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/50 font-medium">Industries We Serve</span>
            </div>

            <h1 className={`leading-[1.0] mb-6 transition-all duration-700 delay-100 text-center lg:text-left ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="block text-[42px] sm:text-[54px] md:text-[68px] font-light italic text-white/70">Marketing for</span>
              <span className="block text-[42px] sm:text-[54px] md:text-[68px] font-bold text-white">Behavioral Health.</span>
            </h1>

            <div ref={lineRef} className="h-px bg-white/20 mb-8 transition-all duration-1000 ease-out max-w-full" style={{ width: "0%" }} />

            <p className={`text-white/55 text-sm md:text-base leading-relaxed mb-10 max-w-xl font-light transition-all duration-700 delay-150 text-center lg:text-left mx-auto lg:mx-0 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              We don&apos;t serve every industry — we go deep on one. Every strategy is built on real behavioral health market knowledge, compliance expertise, and verified results across six core program types.
            </p>

            <div className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-200 justify-center lg:justify-start ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {pills.map((p) => (
                <span key={p} className="text-[9px] tracking-[0.12em] uppercase text-white/50 border border-white/15 px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap">{p}</span>
              ))}
            </div>

            <div className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 justify-center lg:justify-start ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a href="#industries-contact" className="inline-flex items-center gap-2.5 bg-white text-[#0A1F44] text-[11px] tracking-[0.2em] uppercase font-bold px-7 py-4 rounded-full hover:bg-white/90 transition-colors cursor-pointer whitespace-nowrap">
                Book a Strategy Call
                <i className="ri-arrow-right-line text-sm"></i>
              </a>
              <a href="#industries-detail" className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-medium text-white/40 hover:text-white transition-colors cursor-pointer whitespace-nowrap">
                Explore Industries
                <i className="ri-arrow-down-line text-xs"></i>
              </a>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className={`w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="bg-white/[0.07] border border-white/15 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="px-7 pt-7 pb-6 border-b border-white/10">
                <span className="inline-flex items-center gap-2 text-[9px] tracking-[0.35em] uppercase text-white/45 font-medium mb-4">
                  <span className="w-3 h-px bg-white/30" />
                  Free Strategy Call
                </span>
                <h2 className="text-[22px] font-semibold text-white mb-2 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Let&apos;s Talk About Your Program.
                </h2>
                <p className="text-white/45 text-xs leading-relaxed font-light">30-minute call — no pitch, just strategy tailored to your facility type.</p>
              </div>

              <div className="px-7 py-6">
                {submitted ? (
                  <div className="py-10 flex flex-col items-center text-center gap-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 border border-white/20">
                      <i className="ri-check-line text-white text-2xl" />
                    </div>
                    <p className="text-white font-semibold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Request Received</p>
                    <p className="text-white/50 text-xs leading-relaxed max-w-[260px] font-light">Our team will reach out within 24 hours to schedule your strategy call.</p>
                  </div>
                ) : (
                  <form id="industries-hero-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] tracking-[0.3em] uppercase text-white/45 font-medium">Full Name</label>
                        <input type="text" name="name" required placeholder="Jane Smith" value={formState.name} onChange={(e) => setFormData({ ...formState, name: e.target.value })} className="bg-white/10 border border-white/15 text-white text-sm px-3.5 py-2.5 rounded-xl placeholder-white/25 focus:outline-none focus:border-white/40 transition-all font-light" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] tracking-[0.3em] uppercase text-white/45 font-medium">Phone</label>
                        <input type="tel" name="phone" placeholder="(714) 300-5115" value={formState.phone} onChange={(e) => setFormData({ ...formState, phone: e.target.value })} className="bg-white/10 border border-white/15 text-white text-sm px-3.5 py-2.5 rounded-xl placeholder-white/25 focus:outline-none focus:border-white/40 transition-all font-light" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] tracking-[0.3em] uppercase text-white/45 font-medium">Work Email</label>
                      <input type="email" name="email" required placeholder="jane@treatmentcenter.com" value={formState.email} onChange={(e) => setFormData({ ...formState, email: e.target.value })} className="bg-white/10 border border-white/15 text-white text-sm px-3.5 py-2.5 rounded-xl placeholder-white/25 focus:outline-none focus:border-white/40 transition-all font-light" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] tracking-[0.3em] uppercase text-white/45 font-medium">Program Type</label>
                      <select name="program" value={formState.program} onChange={(e) => setFormData({ ...formState, program: e.target.value })} className="bg-white/10 border border-white/15 text-white/80 text-sm px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-white/40 transition-all font-light appearance-none cursor-pointer">
                        <option value="" className="text-black">Select program type...</option>
                        <option value="Residential Treatment" className="text-black">Residential Treatment</option>
                        <option value="Detox / PHP" className="text-black">Detox / PHP</option>
                        <option value="Outpatient / IOP" className="text-black">Outpatient / IOP</option>
                        <option value="Sober Living" className="text-black">Sober Living</option>
                        <option value="Mental Health" className="text-black">Mental Health Clinic</option>
                        <option value="Other" className="text-black">Other</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] tracking-[0.3em] uppercase text-white/45 font-medium">Website URL or Notes</label>
                      <textarea name="message" placeholder="Your website URL and any notes about your current marketing challenges..." rows={3} maxLength={500} value={formState.message} onChange={(e) => { setFormData({ ...formState, message: e.target.value }); setCharCount(e.target.value.length); }} className="bg-white/10 border border-white/15 text-white text-sm px-3.5 py-2.5 rounded-xl placeholder-white/25 focus:outline-none focus:border-white/40 transition-all font-light resize-none" />
                      <span className={`text-[10px] text-right ${charCount > 480 ? "text-red-400" : "text-white/25"}`}>{charCount}/500</span>
                    </div>
                    {submitError && (
                      <p className="text-red-500 text-xs">{submitError}</p>
                    )}
                    <button type="submit" disabled={submitting || charCount > 500} className="w-full bg-white text-[#0A1F44] text-[11px] tracking-[0.15em] uppercase font-bold py-3.5 rounded-xl hover:bg-white/90 active:scale-[0.99] transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 px-4">
                      {submitting ? "Sending..." : "Book My Strategy Call →"}
                    </button>
                    <p className="text-white/30 text-[10px] text-center leading-relaxed">No commitment · 30 minutes · 100% free</p>
                  </form>
                )}
              </div>
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
