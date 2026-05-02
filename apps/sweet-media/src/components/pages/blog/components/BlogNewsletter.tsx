"use client";

import { useState } from "react";

export default function BlogNewsletter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Contact form request failed");
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="max-w-screen-xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — value props */}
          <div>
            <div className="flex items-center gap-3 mb-5 justify-center lg:justify-start">
              <div className="w-8 h-px bg-neutral-300" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 font-semibold">
                Stay Informed
              </span>
            </div>

            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-900 leading-snug mb-5 text-center lg:text-left"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Get BH Marketing{" "}
              <em className="italic" style={{ color: "#7B9FD4" }}>
                Insights
              </em>{" "}
              Delivered
            </h2>

            <p className="text-sm md:text-base text-neutral-500 leading-relaxed mb-8 max-w-md">
              Join 800+ treatment center executives who receive our weekly digest of compliance updates, strategy guides, and industry benchmarks.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { icon: "ri-shield-check-line", text: "HIPAA-compliant marketing updates" },
                { icon: "ri-bar-chart-box-line", text: "Monthly cost-per-admission benchmarks" },
                { icon: "ri-flashlight-line", text: "Platform policy changes that affect you" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0A1F44]/5 flex items-center justify-center flex-shrink-0">
                    <i className={`${item.icon} text-[#0A1F44] text-sm`}></i>
                  </div>
                  <span className="text-sm text-neutral-600">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-neutral-50 rounded-2xl p-6 md:p-10 border border-neutral-100">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                  <i className="ri-check-line text-emerald-500 text-xl"></i>
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">You&apos;re on the list</h3>
                <p className="text-sm text-neutral-500">
                  Watch your inbox for our next weekly digest.
                </p>
              </div>
            ) : (
              <form
                id="blog-newsletter"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase font-semibold text-neutral-500 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Smith"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-[#0A1F44] focus:ring-1 focus:ring-[#0A1F44]/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase font-semibold text-neutral-500 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@treatmentcenter.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-[#0A1F44] focus:ring-1 focus:ring-[#0A1F44]/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase font-semibold text-neutral-500 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(714) 300-5115"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-[#0A1F44] focus:ring-1 focus:ring-[#0A1F44]/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase font-semibold text-neutral-500 mb-2">
                    Service
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 focus:outline-none focus:border-[#0A1F44] focus:ring-1 focus:ring-[#0A1F44]/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select service</option>
                    <option value="SEO">SEO</option>
                    <option value="Paid Media">Paid Media</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Full Service">Full Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.15em] uppercase font-semibold text-neutral-500 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your goals and what support you need."
                    required
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-[#0A1F44] focus:ring-1 focus:ring-[#0A1F44]/10 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0A1F44] text-white text-[11px] tracking-[0.18em] uppercase font-bold px-6 py-3.5 rounded-xl hover:bg-[#0d2a5e] transition-colors cursor-pointer whitespace-nowrap mt-1 disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Request Free Strategy Call"}
                </button>
                {submitError && <p className="text-[11px] text-red-500 text-center">{submitError}</p>}

                <p className="text-[11px] text-neutral-400 text-center">
                  No spam. Unsubscribe anytime. We respect your privacy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}