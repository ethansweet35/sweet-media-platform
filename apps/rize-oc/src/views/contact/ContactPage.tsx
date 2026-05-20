"use client";

import Image from "next/image";
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const BASE = "https://nfjlvkxrbzytjefmcvhg.supabase.co/storage/v1/object/public/site-assets/images";

/* ─── Contact form ───────────────────────────────────────────────────────── */

type FormState = "idle" | "submitting" | "success" | "error";

const SERVICE_OPTIONS = [
  "Drug & Alcohol Detox",
  "Partial Hospitalization Program (PHP)",
  "Intensive Outpatient Program (IOP)",
  "Outpatient Program (OP)",
  "Virtual / Online Treatment",
  "Mental Health Treatment",
  "Dual Diagnosis",
  "General Inquiry",
];

function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setState("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 px-8 text-center border border-warm/30 bg-cream">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
          <i className="ri-check-line text-accent text-2xl" />
        </div>
        <div>
          <p className="font-[family-name:var(--font-display)] text-[28px] font-normal text-ink leading-snug">
            Message Received
          </p>
          <p className="mt-3 text-[15px] font-light text-ink/60 leading-relaxed max-w-[380px]">
            A member of our admissions team will be in touch within a few hours. For urgent matters, call us directly at (949) 461-2620.
          </p>
        </div>
        <button
          onClick={() => setState("idle")}
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent underline-offset-4 hover:underline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Row: Name + Phone */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Jane Smith"
            className="w-full border border-warm/40 bg-white px-4 py-3.5 text-[14px] text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none transition"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="(949) 000-0000"
            className="w-full border border-warm/40 bg-white px-4 py-3.5 text-[14px] text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none transition"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
          Email Address <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full border border-warm/40 bg-white px-4 py-3.5 text-[14px] text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none transition"
        />
      </div>

      {/* Row: Service + Insurance */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
            Program of Interest
          </label>
          <select
            name="service"
            className="w-full border border-warm/40 bg-white px-4 py-3.5 text-[14px] text-ink focus:border-accent focus:outline-none transition appearance-none"
          >
            <option value="">Select a program</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
            Insurance Provider
          </label>
          <input
            type="text"
            name="insurance"
            placeholder="Aetna, Cigna, UHC…"
            className="w-full border border-warm/40 bg-white px-4 py-3.5 text-[14px] text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none transition"
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
          Message
        </label>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us about your situation or what questions you have…"
          className="w-full border border-warm/40 bg-white px-4 py-3.5 text-[14px] text-ink placeholder:text-ink/30 focus:border-accent focus:outline-none transition resize-none"
        />
      </div>

      {state === "error" && (
        <p className="text-[13px] text-red-500">{errorMsg}</p>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex items-center gap-2 bg-accent px-8 py-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition hover:bg-accent/90 disabled:opacity-60"
        >
          {state === "submitting" ? (
            <>
              <i className="ri-loader-4-line animate-spin text-sm" /> Sending…
            </>
          ) : (
            <>
              Send Message <i className="ri-arrow-right-line text-xs" />
            </>
          )}
        </button>
        <p className="text-[12px] font-light text-ink/45">
          All inquiries are kept strictly confidential.
        </p>
      </div>
    </form>
  );
}

/* ─── Contact info cards ─────────────────────────────────────────────────── */

const contactMethods = [
  {
    icon: "ri-phone-line",
    label: "Call or Text",
    value: "(949) 461-2620",
    sub: "Available 24 hours, 7 days a week",
    href: "tel:9494612620",
    cta: "Call Now",
  },
  {
    icon: "ri-mail-line",
    label: "Email Admissions",
    value: "admissions@rizeoc.com",
    sub: "We respond within a few hours",
    href: "mailto:admissions@rizeoc.com",
    cta: "Send Email",
  },
  {
    icon: "ri-map-pin-2-line",
    label: "Visit Us",
    value: "Orange County, CA",
    sub: "Tours available by appointment",
    href: "/admissions",
    cta: "Schedule Visit",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function ContactPage() {
  return (
    <main className="min-h-screen">

      {/* ① Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-ink overflow-hidden min-h-[60vh]">
        <Image
          src={`${BASE}/contact_hero01.jpg`}
          alt="Rize OC treatment center entrance in Orange County California"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(44,48,46,0.55) 0%, rgba(44,48,46,0.2) 40%, rgba(44,48,46,0.92) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[1300px] px-[30px] lg:px-6 pb-14 lg:pb-16">
          <Eyebrow colorClass="text-accent">Get in Touch</Eyebrow>
          <h1
            className="font-[family-name:var(--font-display)] font-normal text-white mt-4"
            style={{ fontSize: "clamp(44px, 5.5vw, 84px)", lineHeight: 0.95 }}
          >
            We&apos;re Here<br />
            <em className="italic text-white/60">Whenever You&apos;re Ready</em>
          </h1>
        </div>
      </section>

      {/* ② Contact methods ──────────────────────────────────────────────── */}
      <div className="bg-ink border-t border-white/8">
        <div className="mx-auto w-full max-w-[1300px] px-[30px] lg:px-6">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/8">
            {contactMethods.map(({ icon, label, value, sub, href, cta }) => (
              <a
                key={label}
                href={href}
                className="group flex items-start gap-5 px-8 py-8 transition hover:bg-white/4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent transition group-hover:bg-accent group-hover:text-white">
                  <i className={`${icon} text-lg`} />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{label}</p>
                  <p className="text-[15px] font-medium text-white">{value}</p>
                  <p className="text-[12px] font-light text-white/50">{sub}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ③ Form + Info ──────────────────────────────────────────────────── */}
      <SectionWrapper bg="bg-white" py="py-[100px]">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 xl:gap-24">

          {/* Left — form */}
          <div>
            <Eyebrow colorClass="text-accent">Contact Form</Eyebrow>
            <SectionHeader as="h2" className="mt-3 mb-10">
              Send Us a Message
            </SectionHeader>
            <ContactForm />
          </div>

          {/* Right — sidebar info */}
          <div className="flex flex-col gap-8">
            {/* Hours card */}
            <div className="bg-ink p-8 relative overflow-hidden">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/8" />
              <div className="relative z-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent mb-5">
                  Admissions Hours
                </p>
                {[
                  { day: "Monday – Friday", hours: "8:00 AM – 8:00 PM" },
                  { day: "Saturday – Sunday", hours: "9:00 AM – 5:00 PM" },
                  { day: "Crisis Line", hours: "Available 24 / 7" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between items-baseline border-b border-white/8 py-3 last:border-0">
                    <span className="text-[13px] font-light text-white/65">{day}</span>
                    <span className="text-[13px] font-medium text-white">{hours}</span>
                  </div>
                ))}
                <div className="mt-7">
                  <Button href="tel:9494612620" variant="accent" size="sm" className="w-full justify-center">
                    <i className="ri-phone-line mr-2 text-xs" /> Call (949) 461-2620
                  </Button>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="border border-warm/30 p-8 bg-cream">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent mb-5">
                What Happens Next
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "ri-time-line",         text: "Our team responds within a few hours during business hours." },
                  { icon: "ri-user-heart-line",   text: "A dedicated admissions coordinator will reach out personally." },
                  { icon: "ri-shield-check-line", text: "We verify your insurance at no cost — before any commitment." },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <i className={`${icon} text-accent text-base mt-0.5 shrink-0`} />
                    <p className="text-[13px] font-light text-ink/65 leading-relaxed">
                      <AutoLinkedTextClient>{text}</AutoLinkedTextClient>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidentiality note */}
            <div className="flex items-start gap-4 px-6 py-5 border border-warm/20">
              <i className="ri-lock-line text-accent text-lg mt-0.5 shrink-0" />
              <p className="text-[13px] font-light text-ink/55 leading-relaxed">
                All communications with Rize OC are protected by HIPAA. Your information will never be shared without your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ④ CTA Banner ───────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-[80px]"
        style={{ background: "linear-gradient(135deg, #2c302e 0%, #3a3f3c 50%, #2c302e 100%)" }}
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/8" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-accent/6" />

        <div className="relative mx-auto w-full max-w-[1300px] px-[30px] lg:px-6">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <Eyebrow colorClass="text-accent">Prefer to Talk?</Eyebrow>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-white mt-3"
                style={{ fontSize: "clamp(28px, 3.2vw, 48px)", lineHeight: 1.08 }}
              >
                Our Admissions Team Answers
                <br />
                <em className="italic text-white/60">Every Call, Every Hour</em>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Button href="tel:9494612620" variant="accent" size="md">
                <i className="ri-phone-line mr-2" /> (949) 461-2620
              </Button>
              <Button href="/admissions" variant="outline-white" size="md">
                Start Admissions
              </Button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
