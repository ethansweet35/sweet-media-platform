"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Free Marketing Audit",
    desc: "We review your SEO, ads, and website — and show you exactly where you're losing admissions.",
  },
  {
    num: "02",
    title: "Custom Growth Roadmap",
    desc: "A strategy built around your facility type, your market, and your census goals. Not a template.",
  },
  {
    num: "03",
    title: "Clear Revenue Projections",
    desc: "We model out your expected admissions growth, cost-per-admission targets, and ROI timeline before you spend a dollar.",
  },
  {
    num: "04",
    title: "No-Pressure Decision",
    desc: "Take value from the call regardless of next steps. Zero obligation, zero hard sell.",
  },
];

const badges = [
  { icon: "ri-shield-check-line", label: "HIPAA-Aware Campaigns" },
  { icon: "ri-award-line", label: "BH Specialists" },
  { icon: "ri-lock-line", label: "No Long-Term Contracts" },
  { icon: "ri-time-line", label: "1-Day Response" },
];

export default function GettingStartedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const message = String(data.get("message") ?? "");
    if (message.length > 500) return;

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? "General Inquiry"),
      message,
    };

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Contact form request failed");
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="getting-started"
      className="w-full bg-[#0A1F44] overflow-hidden"
    >
      {/* ── Grid texture (same as Results) ──────────────────────── */}
      <div className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ctaGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ctaGrid)" />
          </svg>
        </div>

        {/* ── Divider from Results ─────────────────────────────── */}
        <div className="w-full h-px bg-white/[0.12]" />

        <div className="relative max-w-screen-xl mx-auto px-4 md:px-6 pt-[50px] md:pt-[100px] pb-[50px] md:pb-[100px]">

          {/* ── Section header ───────────────────────────────────── */}
          <div className={`mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex flex-col gap-6 items-center text-center">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-white/25" />
                <span className="text-[9px] tracking-[0.45em] uppercase text-white/50 font-medium">
                  Get Started
                </span>
              </div>
              <h2
                className="text-[36px] md:text-5xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to Fill
                <br />
                <em className="font-light italic" style={{color:'#7B9FD4'}}>Your Census?</em>
              </h2>
              <p className="text-white/60 text-[15px] md:text-base leading-relaxed max-w-lg font-light mx-auto">
                Schedule a free 30-minute strategy call with a senior behavioral health
                marketing specialist. No pressure, no jargon — just a direct conversation
                about your goals.
              </p>
              {/* Badges row */}
              <div className="flex flex-wrap gap-2 justify-center">
                {badges.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-center gap-2 bg-white/[0.07] border border-white/[0.12] rounded-full px-4 py-2"
                  >
                    <i className={`${b.icon} text-white/55 text-xs`}></i>
                    <span className="text-[11px] text-white/55 font-medium whitespace-nowrap">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Main content grid ────────────────────────────────── */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-0 border border-white/[0.15] rounded-3xl overflow-hidden transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >

            {/* Left — steps + testimonial */}
            <div className="border-b lg:border-b-0 lg:border-r border-white/[0.15] p-7 md:p-14 flex flex-col justify-between">

              {/* Steps */}
              <div>
                <p className="text-[9px] tracking-[0.4em] uppercase text-white/50 font-medium mb-6">
                  What to Expect
                </p>
                <div className="flex flex-col divide-y divide-white/[0.12]">
                  {steps.map((s) => (
                    <div key={s.num} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="text-[10px] font-bold text-white/30 tracking-[0.2em]">{s.num}</span>
                        <h4 className="text-sm font-bold text-white/85">{s.title}</h4>
                      </div>
                      <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <div className="mt-10 pt-8 border-t border-white/[0.15]">
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map((s) => (
                    <i key={s} className="ri-star-fill text-white/50 text-xs"></i>
                  ))}
                </div>
                <p
                  className="text-base font-light leading-relaxed italic mb-5 max-w-sm"
                  style={{ color: '#7B9FD4', fontFamily: "'Playfair Display', serif" }}
                >
                  &ldquo;Our census went from 68% to 94% in six months. Best investment
                  we&apos;ve made in five years.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                    <span className="text-[10px] font-bold text-white/55">TR</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white/60">Thomas Reeves</div>
                    <div className="text-[10px] text-white/35">COO, California Prime Recovery</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form (fully dark) */}
            <div className="p-6 md:p-12 bg-white/[0.05]">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/10 border border-white/15 mb-6">
                    <i className="ri-check-line text-white text-2xl"></i>
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    We&apos;ll Be in Touch Soon
                  </h3>
                  <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                    Thank you for reaching out. A senior strategist will contact you within one business day.
                  </p>
                </div>
              ) : (
                <>
                  <h3
                    className="text-xl font-bold text-white mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Book a Free Strategy Call
                  </h3>
                  <p className="text-white/55 text-sm mb-8">
                    Tell us about your program — we&apos;ll do the rest.
                  </p>

                  <form
                    id="getting-started-form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <div>
                        <label className="text-[10px] tracking-widest uppercase text-white/50 font-semibold block mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="John Smith"
                          className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/35 focus:bg-white/[0.09] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-white/50 font-semibold block mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@treatmentcenter.com"
                        className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/35 focus:bg-white/[0.09] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-white/30 font-semibold block mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="(714) 300-5115"
                        className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/35 focus:bg-white/[0.09] transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-white/50 font-semibold block mb-1.5">
                        Service
                      </label>
                      <select
                        name="service"
                        required
                        className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white/70 focus:outline-none focus:border-white/35 focus:bg-white/[0.09] transition-all cursor-pointer"
                        style={{ colorScheme: "dark" }}
                      >
                        <option value="" className="bg-zinc-900">Select a service</option>
                        <option value="SEO" className="bg-zinc-900">SEO</option>
                        <option value="Paid Media" className="bg-zinc-900">Paid Media</option>
                        <option value="Web Development" className="bg-zinc-900">Web Development</option>
                        <option value="Social Media" className="bg-zinc-900">Social Media</option>
                        <option value="Full Service" className="bg-zinc-900">Full Service</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] tracking-widest uppercase text-white/50 font-semibold block mb-1.5">
                        Goals &amp; Challenges
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        maxLength={500}
                        placeholder="What are your current marketing challenges and census goals?"
                        onChange={(e) => setCharCount(e.target.value.length)}
                        className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/35 focus:bg-white/[0.09] transition-all resize-none"
                      />
                      <div className="flex justify-end mt-1">
                        <span className={`text-[10px] ${charCount > 450 ? "text-red-400" : "text-white/20"}`}>
                          {charCount}/500
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-white text-black text-[11px] tracking-[0.22em] uppercase font-bold py-4 rounded-xl hover:bg-white/90 active:scale-[0.99] transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 mt-2"
                    >
                      {submitting ? "Sending…" : "Free Strategy Call"}
                    </button>
                    {submitError && <p className="text-red-400 text-xs text-center">{submitError}</p>}

                    <p className="text-[10px] text-white/40 text-center leading-relaxed">
                      No commitment required · Response within 1 business day
                    </p>
                  </form>
                </>
              )}
            </div>

          </div>

          {/* ── Bottom stat bar (same DNA as Results) ───────────── */}
          <div
            className={`border-t border-white/[0.15] mt-16 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {[
              { num: "7+", label: "Years in Behavioral Health" },
              { num: "40+", label: "Active Client Partnerships" },
              { num: "100%", label: "BH-Exclusive Agency" },
              { num: "$420", label: "Avg. Cost-Per-Admission" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.num}
                </div>
                <div className="text-[10px] tracking-widest uppercase text-white/45 mt-3">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
