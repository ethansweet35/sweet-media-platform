"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  { val: "SEO", label: "Search Engine Optimization" },
  { val: "Paid Media", label: "Paid Media (Google / Meta / TV)" },
  { val: "Web Development", label: "Website Development" },
  { val: "Social Media", label: "Social Media Marketing" },
  { val: "Full Service", label: "Full-Service Partnership" },
  { val: "Not Sure", label: "Not Sure Yet" },
];

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [formState, setFormData] = useState({
    name: "", email: "", phone: "", facility: "", program: "", service: "", budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
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
    <section ref={sectionRef} id="contact-form" className="w-full bg-white py-[60px] md:py-[100px] px-4 md:px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-20 items-start">

          {/* Left — what to expect */}
          <div className={`lg:col-span-2 lg:sticky lg:top-28 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <div className="w-8 h-px bg-[#0A1F44]" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-[#0A1F44] font-semibold">What Happens Next</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6 text-center lg:text-left" style={{ fontFamily: "'Playfair Display', serif" }}>
              Simple Process,
              <br /><em className="font-light italic" style={{color:'#0A1F44'}}>Real Results.</em>
            </h2>
            <p className="text-black/55 text-sm leading-relaxed mb-10">
              We keep it simple. No lengthy sales process, no pressure. Just a straightforward conversation about your facility and how we can help.
            </p>

            <div className="flex flex-col gap-0">
              {[
                { num: "01", title: "Submit Your Info", desc: "Fill out the form with details about your facility and what you're looking to achieve.", time: "2 min" },
                { num: "02", title: "We Review & Reach Out", desc: "Our team reviews your submission and reaches out within 24 hours to schedule a call.", time: "Within 24 hrs" },
                { num: "03", title: "Free Strategy Call", desc: "30-minute call with a senior strategist. We'll audit your current presence and share honest recommendations.", time: "30 min" },
                { num: "04", title: "Custom Proposal", desc: "If it's a fit, we'll send a tailored proposal with specific strategies, timelines, and projected outcomes.", time: "5 business days" },
              ].map((step, i) => (
                <div key={step.num} className="flex gap-5 group">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0A1F44] text-white text-xs font-bold flex-shrink-0">
                      {step.num}
                    </div>
                    {i < 3 && <div className="w-px flex-1 bg-black/8 my-2 min-h-[32px]" />}
                  </div>
                  <div className={`pb-8 ${i < 3 ? "" : ""}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-bold text-black">{step.title}</h4>
                      <span className="text-[9px] tracking-widest uppercase text-black/30 bg-black/5 px-2 py-0.5 rounded-full whitespace-nowrap">{step.time}</span>
                    </div>
                    <p className="text-xs text-black/55 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                { icon: "ri-shield-check-line", label: "HIPAA-Aware" },
                { icon: "ri-award-line", label: "BH Specialists" },
                { icon: "ri-lock-line", label: "No Long Contracts" },
                { icon: "ri-time-line", label: "24-Hour Response" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 bg-[#f4f6f9] rounded-lg px-3 py-2.5">
                  <i className={`${b.icon} text-[#0A1F44]/50 text-sm`}></i>
                  <span className="text-xs text-black/55 font-medium whitespace-nowrap">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="bg-[#f4f6f9] rounded-3xl overflow-hidden">
              <div className="px-8 pt-8 pb-6 border-b border-black/6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-px bg-[#0A1F44]/40" />
                  <span className="text-[9px] tracking-[0.4em] uppercase text-[#0A1F44]/60 font-medium">Free Strategy Call</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Tell Us About Your Facility.
                </h3>
                <p className="text-black/45 text-xs leading-relaxed">
                  The more detail you share, the more useful our first call will be.
                </p>
              </div>

              <div className="px-8 py-8">
                {submitted ? (
                  <div className="py-16 flex flex-col items-center text-center gap-5">
                    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#0A1F44]">
                      <i className="ri-check-line text-white text-2xl" />
                    </div>
                    <div>
                      <p className="text-black font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Message Received</p>
                      <p className="text-black/50 text-sm leading-relaxed max-w-sm">
                        Our team will review your submission and reach out within 24 hours to schedule your free strategy call.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center mt-2">
                      {[
                        { icon: "ri-phone-line", label: "(714) 300-5115" },
                        { icon: "ri-mail-line", label: "emma@sweetmediaservices.com" },
                      ].map((c) => (
                        <div key={c.label} className="flex items-center gap-2 bg-white border border-black/8 rounded-xl px-4 py-2.5">
                          <i className={`${c.icon} text-[#0A1F44] text-sm`}></i>
                          <span className="text-xs font-medium text-black">{c.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form id="contact-page-form" onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] tracking-[0.3em] uppercase text-black/45 font-semibold">Full Name *</label>
                        <input type="text" name="name" required placeholder="Jane Smith" value={formState.name} onChange={(e) => setFormData({ ...formState, name: e.target.value })} className="bg-white border border-black/10 text-black text-sm px-4 py-3 rounded-xl placeholder-black/25 focus:outline-none focus:border-[#0A1F44]/40 transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] tracking-[0.3em] uppercase text-black/45 font-semibold">Phone Number</label>
                        <input type="tel" name="phone" placeholder="(714) 300-5115" value={formState.phone} onChange={(e) => setFormData({ ...formState, phone: e.target.value })} className="bg-white border border-black/10 text-black text-sm px-4 py-3 rounded-xl placeholder-black/25 focus:outline-none focus:border-[#0A1F44]/40 transition-all" />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] tracking-[0.3em] uppercase text-black/45 font-semibold">Work Email *</label>
                        <input type="email" name="email" required placeholder="jane@treatmentcenter.com" value={formState.email} onChange={(e) => setFormData({ ...formState, email: e.target.value })} className="bg-white border border-black/10 text-black text-sm px-4 py-3 rounded-xl placeholder-black/25 focus:outline-none focus:border-[#0A1F44]/40 transition-all" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] tracking-[0.3em] uppercase text-black/45 font-semibold">Facility Name</label>
                        <input type="text" name="facility" placeholder="Sunrise Recovery Center" value={formState.facility} onChange={(e) => setFormData({ ...formState, facility: e.target.value })} className="bg-white border border-black/10 text-black text-sm px-4 py-3 rounded-xl placeholder-black/25 focus:outline-none focus:border-[#0A1F44]/40 transition-all" />
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] tracking-[0.3em] uppercase text-black/45 font-semibold">Program Type</label>
                        <select name="program" value={formState.program} onChange={(e) => setFormData({ ...formState, program: e.target.value })} className="bg-white border border-black/10 text-black text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#0A1F44]/40 transition-all appearance-none cursor-pointer">
                          <option value="">Select program type...</option>
                          <option value="Residential Treatment">Residential Treatment</option>
                          <option value="Detox / PHP">Detox / PHP</option>
                          <option value="Outpatient / IOP">Outpatient / IOP</option>
                          <option value="Sober Living">Sober Living</option>
                          <option value="Dual Diagnosis">Dual Diagnosis</option>
                          <option value="Mental Health">Mental Health Clinic</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] tracking-[0.3em] uppercase text-black/45 font-semibold">Monthly Budget</label>
                        <select name="budget" value={formState.budget} onChange={(e) => setFormData({ ...formState, budget: e.target.value })} className="bg-white border border-black/10 text-black text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#0A1F44]/40 transition-all appearance-none cursor-pointer">
                          <option value="">Select budget range...</option>
                          <option value="Under $2,500">Under $2,500/mo</option>
                          <option value="$2,500–$5,000">$2,500–$5,000/mo</option>
                          <option value="$5,000–$10,000">$5,000–$10,000/mo</option>
                          <option value="$10,000–$25,000">$10,000–$25,000/mo</option>
                          <option value="$25,000+">$25,000+/mo</option>
                          <option value="Not Sure">Not Sure Yet</option>
                        </select>
                      </div>
                    </div>

                    {/* Service interest */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[9px] tracking-[0.3em] uppercase text-black/45 font-semibold">Services You're Interested In</label>
                      <div className="flex flex-wrap gap-2">
                        {services.map((s) => (
                          <button
                            key={s.val}
                            type="button"
                            onClick={() => setFormData({ ...formState, service: formState.service === s.val ? "" : s.val })}
                            className={`text-[10px] tracking-[0.1em] uppercase font-semibold px-3.5 py-2 rounded-full border transition-all duration-150 cursor-pointer whitespace-nowrap ${
                              formState.service === s.val
                                ? "bg-[#0A1F44] text-white border-[#0A1F44]"
                                : "bg-white text-black/55 border-black/12 hover:border-black/30"
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="service" value={formState.service} />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] tracking-[0.3em] uppercase text-black/45 font-semibold">Tell Us About Your Goals</label>
                      <textarea name="message" placeholder="What are your current marketing challenges? What does success look like for your facility in the next 12 months?" rows={4} maxLength={500} value={formState.message} onChange={(e) => { setFormData({ ...formState, message: e.target.value }); setCharCount(e.target.value.length); }} className="bg-white border border-black/10 text-black text-sm px-4 py-3 rounded-xl placeholder-black/25 focus:outline-none focus:border-[#0A1F44]/40 transition-all resize-none" />
                      <span className={`text-[10px] text-right ${charCount > 480 ? "text-red-500" : "text-black/25"}`}>{charCount}/500</span>
                    </div>

                    {submitError && (
                      <p className="text-red-500 text-xs">{submitError}</p>
                    )}
                    <button type="submit" disabled={submitting || charCount > 500} className="w-full bg-[#0A1F44] text-white text-[11px] tracking-[0.2em] uppercase font-bold py-4 rounded-xl hover:bg-[#0d2a5e] active:scale-[0.99] transition-all duration-200 cursor-pointer whitespace-nowrap disabled:opacity-50 px-4">
                      {submitting ? "Sending..." : <span className="flex items-center justify-center gap-2">Book My Free Strategy Call <i className="ri-arrow-right-line"></i></span>}
                    </button>

                    <p className="text-black/30 text-[10px] text-center leading-relaxed">
                      No commitment · 30-minute call · Response within 24 hours
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}