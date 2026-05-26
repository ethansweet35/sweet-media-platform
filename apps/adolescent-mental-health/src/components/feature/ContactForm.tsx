"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-[#E8EEF4] bg-white px-4 py-3.5 text-sm text-[#0A0F14] placeholder:text-[#A0A8B0] outline-none transition focus:border-[#83B3DC]/60 focus:ring-2 focus:ring-[#83B3DC]/20";

function FieldLabel({ id, text, required }: { id: string; text: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="block text-[11px] font-bold uppercase tracking-[0.18em] text-[#54595F]">
      {text}
      {required ? <span className="ml-0.5 text-[#83B3DC]">*</span> : null}
    </label>
  );
}

const PROGRAM_OPTIONS = [
  "Virtual IOP for Teens",
  "Adolescent IOP",
  "Individual Therapy",
  "Online CBT",
  "Not sure — need guidance",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (typeof v === "string" && v.trim()) payload[k] = v.trim();
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again or call us directly.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or call us directly.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-3xl border border-[#83B3DC]/30 bg-[#F4F9FC] px-8 py-12 text-center"
        role="status"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#83B3DC]/15 text-[#83B3DC]">
          <i className="ri-check-double-line text-2xl" aria-hidden />
        </span>
        <h3 className="mt-5 text-xl font-bold text-[#0A0F14]" style={{ fontFamily: "var(--font-heebo)" }}>
          Message received
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#54595F]">
          Our admissions team will respond within one business day. For urgent questions, call us anytime.
        </p>
      </div>
    );
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <FieldLabel id="contact-name" text="Your name" required />
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            placeholder="Parent or caregiver name"
            className={inputClass}
          />
        </div>
        <div className="grid gap-2">
          <FieldLabel id="contact-phone" text="Phone" required />
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="Best number to reach you"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <FieldLabel id="contact-email" text="Email" required />
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@email.com"
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <FieldLabel id="contact-program" text="Program of interest" />
          <select id="contact-program" name="program" defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select a program
            </option>
            {PROGRAM_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <FieldLabel id="contact-insurance" text="Insurance provider" />
          <input
            id="contact-insurance"
            name="insurance"
            placeholder="e.g. Aetna, Anthem, UHC"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <FieldLabel id="contact-message" text="How can we help?" />
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell us about your teen's needs, timeline, or any questions you have."
          className={`${inputClass} resize-y min-h-[140px]`}
        />
      </div>

      {status === "error" && errorMsg ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {errorMsg}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0A0F14] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#0A0F14]/10 transition hover:bg-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#83B3DC] focus-visible:ring-offset-2 disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <i className="ri-send-plane-line text-[#83B3DC]" />
          </>
        )}
      </button>

      <p className="text-xs leading-6 text-[#7C848B]">
        By submitting, you agree we may contact you about care options. All information is confidential and protected
        under HIPAA.
      </p>
    </form>
  );
}
