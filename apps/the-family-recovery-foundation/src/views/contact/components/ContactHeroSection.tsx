'use client';

import { useState, useEffect, useRef, FormEvent } from "react";

export default function ContactHeroSection() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [messageLength, setMessageLength] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get("first_name") ?? "");
    const lastName = String(formData.get("last_name") ?? "");
    const seekingHelp = formData.getAll("seeking_help_for").map(String).join(", ");

    const payload = {
      form_type: "Get Help",
      name: [firstName, lastName].filter(Boolean).join(" "),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      seeking_help_for: seekingHelp,
      how_found: String(formData.get("how_found") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setMessageLength(0);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-md border border-mist bg-pure-white text-body-s font-body text-deep-navy placeholder:text-stone-blue focus:outline-none focus:border-tfrf-blue focus:ring-1 focus:ring-tfrf-blue/20 transition-all duration-200";

  return (
    <section ref={ref} className="bg-soft-white py-16 md:py-24 lg:py-32">
      <div className="max-w-content mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Message */}
          <div
            className="transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
            }}
          >
            <span className="inline-block text-eyebrow font-body font-semibold uppercase tracking-[0.15em] text-tfrf-blue mb-4">
              Connect with The Family Recovery Foundation
            </span>
            <h1 className="text-display-m font-display text-deep-navy mb-8">
              Get Help
            </h1>
            <div className="space-y-6">
              <p className="text-body-l font-body text-slate leading-relaxed italic">
                If you&apos;re facing addiction&apos;s challenges, whether personally or supporting a loved one, remember you&apos;re not alone. As someone who&apos;s witnessed its impact personally, I understand the importance of support. Fill out the form on this page, and our team will reach out ASAP. Let&apos;s journey towards healing together.
              </p>
              <div className="pt-2">
                <p className="text-body-m font-body text-deep-navy font-semibold">
                  Warmly, Beth Durling MS, CADCII, ICADC
                </p>
                <p className="text-body-s font-body text-slate">
                  Executive Director
                </p>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div
            className="transition-all duration-700 delay-150"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
            }}
          >
            <form
              id="contact-get-help"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name row */}
              <div>
                <label className="block text-body-m font-body font-semibold text-deep-navy mb-3">
                  Name
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first_name" className="block text-caption font-body text-slate mb-1.5">
                      First Name <span className="text-stone-blue">(required)</span>
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      required
                      placeholder="First Name"
                      maxLength={50}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-caption font-body text-slate mb-1.5">
                      Last Name <span className="text-stone-blue">(required)</span>
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      required
                      placeholder="Last Name"
                      maxLength={50}
                      className={inputBase}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-body-m font-body font-semibold text-deep-navy mb-3">
                  Email <span className="text-stone-blue font-normal">(required)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  className={inputBase}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-body-m font-body font-semibold text-deep-navy mb-3">
                  Phone <span className="text-stone-blue font-normal">(required)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone Number"
                  className={inputBase}
                />
              </div>

              {/* Seeking Help For */}
              <div>
                <label className="block text-body-m font-body font-semibold text-deep-navy mb-3">
                  Seeking Help For <span className="text-stone-blue font-normal">(required)</span>
                </label>
                <div className="flex flex-col gap-2.5">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="seeking_help_for"
                      value="Self"
                      className="w-[18px] h-[18px] rounded border border-mist accent-tfrf-blue cursor-pointer"
                    />
                    <span className="text-body-s font-body text-deep-navy group-hover:text-tfrf-blue transition-colors duration-200">
                      Self
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="seeking_help_for"
                      value="Love One"
                      className="w-[18px] h-[18px] rounded border border-mist accent-tfrf-blue cursor-pointer"
                    />
                    <span className="text-body-s font-body text-deep-navy group-hover:text-tfrf-blue transition-colors duration-200">
                      Love One
                    </span>
                  </label>
                </div>
              </div>

              {/* How Did You Find Us */}
              <div>
                <label htmlFor="how_found" className="block text-body-m font-body font-semibold text-deep-navy mb-3">
                  How Did You Find Us? <span className="text-stone-blue font-normal">(required)</span>
                </label>
                <input
                  id="how_found"
                  name="how_found"
                  type="text"
                  required
                  placeholder="How did you hear about us?"
                  className={inputBase}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-body-m font-body font-semibold text-deep-navy mb-3">
                  Message For Our Team
                </label>
                <p className="text-caption font-body text-stone-blue mb-2">Optional</p>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={500}
                  placeholder="Share any details that might help us support you better..."
                  onChange={(e) => setMessageLength(e.target.value.length)}
                  className={inputBase + " resize-none"}
                />
                <p className="text-caption font-body text-stone-blue mt-1.5 text-right">
                  {messageLength}/500
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center gap-2 bg-deep-navy text-pure-white px-8 py-4 rounded-md text-body-s font-body font-semibold hover:bg-tfrf-blue transition-colors duration-200 whitespace-nowrap cursor-pointer disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <i className="ri-loader-4-line w-4 h-4 flex items-center justify-center animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-powder-blue/30 border border-tfrf-blue/20">
                  <i className="ri-check-line w-5 h-5 flex items-center justify-center text-tfrf-blue mt-0.5 shrink-0" />
                  <div>
                    <p className="text-body-s font-body font-semibold text-deep-navy">
                      Thank you for reaching out.
                    </p>
                    <p className="text-caption font-body text-slate mt-0.5">
                      Our team will be in touch with you as soon as possible.
                    </p>
                  </div>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                  <i className="ri-error-warning-line w-5 h-5 flex items-center justify-center text-red-600 mt-0.5 shrink-0" />
                  <p className="text-body-s font-body text-red-700">
                    Something went wrong. Please try again or call us directly at{" "}
                    <a href="tel:888-964-8825" className="underline hover:text-red-900">
                      888-964-8825
                    </a>
                    .
                  </p>
                </div>
              )}

              {/* HIPAA disclaimer */}
              <div className="pt-2">
                <p className="text-caption font-body text-stone-blue leading-relaxed">
                  To assess your needs, we need to collect protected health information (PHI) from you. To comply with the Health Insurance Portability and Accountability Act of 1996, more commonly known as HIPAA, we will treat your PHI as confidential information and not disclose it to anyone other than as necessary to provide you with products and services. However, please note and understand that this form is not HIPAA compliant and the information is sent via encrypted emails that are also not HIPAA compliant. By submitting information through this form, you acknowledge and understand the terms.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}