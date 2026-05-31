"use client";

import { useState } from "react";

export default function SeoContact() {
  const [formState, setFormData] = useState({ name: "", email: "", phone: "", program: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);

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
    <section id="seo-contact" className="w-full bg-[#0A1F44] py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — value props */}
          <div className="text-center lg:text-left">
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 font-medium mb-4">Get Started</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get Your Free
              <br /><em className="font-light italic text-white/70">SEO Audit.</em>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-md mx-auto lg:mx-0">
              We'll analyze your current search presence, identify your biggest ranking gaps, and hand you a prioritized roadmap — no pitch, no commitment required.
            </p>

            <div className="flex flex-col gap-4 mb-12">
              {[
                { icon: "ri-search-line", title: "Full Technical Audit", desc: "Site speed, crawlability, Core Web Vitals, and indexation issues — all documented." },
                { icon: "ri-bar-chart-line", title: "Keyword Gap Analysis", desc: "Every high-value search term your competitors rank for that you're missing." },
                { icon: "ri-map-pin-line", title: "Local SEO Assessment", desc: "Your Google Business Profile, citation health, and map pack ranking position." },
                { icon: "ri-file-list-3-line", title: "90-Day SEO Roadmap", desc: "A prioritized action plan with projected outcomes, delivered within 5 business days." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/15 flex-shrink-0">
                    <i className={`${item.icon} text-white text-sm`}></i>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-0.5">{item.title}</div>
                    <p className="text-xs text-white/45 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: "ri-shield-check-line", label: "HIPAA-Aware Strategy" },
                { icon: "ri-award-line", label: "BH Specialists Only" },
                { icon: "ri-lock-line", label: "No Long Contracts" },
                { icon: "ri-time-line", label: "5-Day Delivery" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 bg-white/[0.07] border border-white/12 rounded-lg px-3 py-2.5">
                  <i className={`${b.icon} text-white/40 text-sm`}></i>
                  <span className="text-xs text-white/60 font-medium whitespace-nowrap">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white/[0.06] border border-white/12 rounded-2xl overflow-hidden backdrop-blur-sm">
            <div className="px-7 pt-8 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-px bg-white/30" />
                <span className="text-[9px] tracking-[0.4em] uppercase text-white/45 font-medium">Free SEO Audit</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Let&apos;s See Where You Stand.
              </h3>
              <p className="text-white/45 text-xs leading-relaxed font-light">
                Tell us about your facility and we&apos;ll put together a complete SEO audit — free, no strings.
              </p>
            </div>

            <div className="px-7 py-7">
              {submitted ? (
                <div className="py-10 flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 border border-white/15">
                    <i className="ri-check-line text-white text-2xl" />
                  </div>
                  <p className="text-white font-semibold text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Audit Request Received</p>
                  <p className="text-white/45 text-xs leading-relaxed max-w-[260px] font-light">
                    Our SEO team will review your site and deliver your audit within 5 business days.
                  </p>
                </div>
              ) : (
                <form
                 
                  id="seo-audit-form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] tracking-[0.3em] uppercase text-white/45 font-medium">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Jane Smith"
                        value={formState.name}
                        onChange={(e) => setFormData({ ...formState, name: e.target.value })}
                        className="bg-white/10 border border-white/15 text-white text-sm px-4 py-3 rounded-xl placeholder-white/25 focus:outline-none focus:border-white/40 transition-all font-light"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] tracking-[0.3em] uppercase text-white/45 font-medium">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="(714) 300-5115"
                        value={formState.phone}
                        onChange={(e) => setFormData({ ...formState, phone: e.target.value })}
                        className="bg-white/10 border border-white/15 text-white text-sm px-4 py-3 rounded-xl placeholder-white/25 focus:outline-none focus:border-white/40 transition-all font-light"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] tracking-[0.3em] uppercase text-white/45 font-medium">Work Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@treatmentcenter.com"
                      value={formState.email}
                      onChange={(e) => setFormData({ ...formState, email: e.target.value })}
                      className="bg-white/10 border border-white/15 text-white text-sm px-4 py-3 rounded-xl placeholder-white/25 focus:outline-none focus:border-white/40 transition-all font-light"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] tracking-[0.3em] uppercase text-white/45 font-medium">Program Type</label>
                    <select
                      name="program"
                      value={formState.program}
                      onChange={(e) => setFormData({ ...formState, program: e.target.value })}
                      className="bg-white/10 border border-white/15 text-white/80 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-white/40 transition-all font-light appearance-none cursor-pointer"
                    >
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
                    <textarea
                      name="message"
                      placeholder="Your website URL and any notes about your current SEO challenges..."
                      rows={3}
                      maxLength={500}
                      value={formState.message}
                      onChange={(e) => { setFormData({ ...formState, message: e.target.value }); setCharCount(e.target.value.length); }}
                      className="bg-white/10 border border-white/15 text-white text-sm px-4 py-3 rounded-xl placeholder-white/25 focus:outline-none focus:border-white/40 transition-all font-light resize-none"
                    />
                    <span className={`text-[10px] text-right ${charCount > 480 ? "text-red-400" : "text-white/25"}`}>{charCount}/500</span>
                  </div>

                  {submitError && (
                    <p className="text-red-400 text-xs">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting || charCount > 500}
                    className="mt-1 w-full bg-white text-[#0A1F44] text-[11px] tracking-[0.15em] uppercase font-bold py-4 rounded-xl hover:bg-white/90 active:scale-[0.99] transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 px-4"
                  >
                    {submitting ? "Sending..." : "Request My Free SEO Audit →"}
                  </button>

                  <p className="text-white/25 text-[10px] text-center leading-relaxed">
                    No commitment · Delivered in 5 business days · 100% free
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
