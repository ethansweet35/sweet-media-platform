"use client";

import { useEffect, useRef, useState } from "react";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const leadIntro =
  "Schedule a complimentary consultation with our billing experts to review your current revenue cycle and identify opportunities for improvement.";

const testimonials = [
  {
    quote:
      "We needed a billing company that conducted business similarly to how we do, prompt and intentional. Cipher has exceeded our expectations. They've continued to be easily accessible & helpful with all our billing needs!",
    attribution: "Tony H.",
  },
  {
    quote:
      "My business was nearly in jeopardy because of the lackluster service from our billing company. Then I switched to Cipher, and they helped turn around our revenue, allowing us to flourish. I am a clinician, not a business person. I needed a billing company that would handle everything billing-related so that I could focus on what mattered — providing exceptional clinical care to patients. Cipher has been that partner for me.",
    attribution: "Dr. Matthew T.",
  },
] as const;

const contactPhoneDisplay = "949-676-2252";
const contactPhoneHref = "tel:949-676-2252";
const contactEmail = "info@cipherbilling.com";

function formLabel(id: string, text: string) {
  return (
    <label
      htmlFor={id}
      className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#AAB3B9]"
    >
      {text}
    </label>
  );
}

export default function OurCompanyLeadSection() {
  const [index, setIndex] = useState(0);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(t);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => { if (typeof v === "string") payload[k] = v; });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setFormStatus("error");
        setFormError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setFormStatus("success");
      formRef.current?.reset();
    } catch {
      setFormStatus("error");
      setFormError("Network error. Please try again.");
    }
  }

  const active = testimonials[index];

  return (
    <section className="bg-[#0D1833] text-white">
      <div className="mx-auto grid max-w-[1140px] gap-14 px-6 py-20 md:grid-cols-[1.08fr_0.92fr] md:items-start md:py-28">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">
            <AutoLinkedTextClient>{"READY TO TRANSFORM YOUR REVENUE CYCLE?"}</AutoLinkedTextClient>
          </p>
          <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-medium leading-[1.15] md:text-[2.65rem]">
            Let's Discuss How We Can <span className="text-[#166C96]">Maximize Your Revenue.</span>
          </h2>
          <p className="mt-6 text-sm leading-[1.42] text-white/90"><AutoLinkedTextClient>{leadIntro}</AutoLinkedTextClient></p>

          <blockquote className="mt-10 border-none p-0">
            <p
              key={active.attribution}
              className="font-[var(--font-body)] text-sm italic leading-[1.35] text-white/95 md:text-[15px]"
            >
              &ldquo;{active.quote}&rdquo;
            </p>
            <footer className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#166C96]">
              {active.attribution.toUpperCase()}
            </footer>
          </blockquote>

          <div className="mt-4 flex gap-2" aria-label="Testimonial slides">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={`h-2 w-8 rounded-full transition-colors ${i === index ? "bg-[#166C96]" : "bg-white/25 hover:bg-white/40"}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-marcellus text-xl font-medium text-white md:text-2xl">Contact Information</h3>

            <div className="mt-8 flex gap-4 border-b border-white/15 pb-8">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white"
                aria-hidden
              >
                <i className="ri-phone-line text-lg leading-none" />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">Phone</p>
                <a href={contactPhoneHref} suppressHydrationWarning className="mt-1 block text-sm font-medium text-white hover:text-[#166C96]">
                  {contactPhoneDisplay}
                </a>
                <p className="mt-1 text-xs leading-[1.35] text-white/75"><AutoLinkedTextClient>{"Mon–Fri, 8AM–5:30PM PST"}</AutoLinkedTextClient></p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/5 text-white"
                aria-hidden
              >
                <i className="ri-mail-line text-lg leading-none" />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90">Email</p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-1 block text-sm font-medium text-white hover:text-[#166C96]"
                >
                  {contactEmail}
                </a>
                <p className="mt-1 text-xs leading-[1.35] text-white/75">General inquiries</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#101E3F] p-8 shadow-lg md:p-10">
          <h3 className="font-marcellus text-2xl font-medium text-white md:text-[1.75rem]">Get Started Today</h3>
          <p className="mt-3 max-w-md font-[var(--font-body)] text-sm leading-[1.42] text-white/85">
            <AutoLinkedTextClient>{"Fill out the form below and we'll contact you within 24 hours."}</AutoLinkedTextClient>
          </p>

          {formStatus === "success" ? (
            <p
              className="mt-8 rounded-lg border border-[#166C96]/40 bg-[#166C96]/15 px-4 py-3 text-sm font-medium text-white"
              role="status"
            >
              <AutoLinkedTextClient>{"Thank you \u2014 your message was sent. We'll be in touch within 24 hours."}</AutoLinkedTextClient>
            </p>
          ) : (
            <form ref={formRef} className="mt-8 grid gap-5" onSubmit={handleSubmit} noValidate suppressHydrationWarning>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  {formLabel("ourco-first-name", "First Name")}
                  <input
                    id="ourco-first-name"
                    name="firstName"
                    autoComplete="given-name"
                    required
                    placeholder="First Name"
                    className="rounded border border-[#166C96]/35 bg-[#0a1428] px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                  />
                </div>
                <div className="grid gap-2">
                  {formLabel("ourco-last-name", "Last Name")}
                  <input
                    id="ourco-last-name"
                    name="lastName"
                    autoComplete="family-name"
                    required
                    placeholder="Last Name"
                    className="rounded border border-[#166C96]/35 bg-[#0a1428] px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                {formLabel("ourco-email", "Email Address")}
                <input
                  id="ourco-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email Address"
                  className="rounded border border-[#166C96]/35 bg-[#0a1428] px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                />
              </div>

              <div className="grid gap-2">
                {formLabel("ourco-phone", "Phone Number")}
                <input
                  id="ourco-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone Number"
                  className="rounded border border-[#166C96]/35 bg-[#0a1428] px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                />
              </div>

              <div className="grid gap-2">
                {formLabel("ourco-service", "Practice / Facility Name")}
                <input
                  id="ourco-service"
                  name="service"
                  autoComplete="organization"
                  placeholder="Practice / Facility Name"
                  className="rounded border border-[#166C96]/35 bg-[#0a1428] px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                />
              </div>

              <div className="grid gap-2">
                {formLabel("ourco-message", "How Can We Help?")}
                <textarea
                  id="ourco-message"
                  name="message"
                  rows={4}
                  placeholder="Message"
                  className="min-h-[120px] rounded border border-[#166C96]/35 bg-[#0a1428] px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]"
                />
              </div>

              {formStatus === "error" && formError ? (
                <p className="text-sm font-medium text-red-400" role="alert">
                  <AutoLinkedTextClient>{formError}</AutoLinkedTextClient>
                </p>
              ) : null}

              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full rounded bg-[#050a14] py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-black disabled:opacity-60"
              >
                {formStatus === "sending" ? "Sending\u2026" : "Send"}
              </button>

              <p className="text-center text-[11px] leading-[1.35] text-[#AAB3B9]">
                <AutoLinkedTextClient>{"By submitting this form, you agree to our privacy policy and consent to be contacted by Cipher Billing."}</AutoLinkedTextClient>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
