"use client";

import { useState } from "react";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { CALLRAIL_PHONE_DISPLAY_PARENS } from "@/lib/callrailPhone";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  insurance: string;
  memberId: string;
  message: string;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  insurance: "",
  memberId: "",
  message: "",
};

const formShellClass =
  "rounded-sm border border-white/20 bg-black/20 p-6 shadow-lg backdrop-blur-[6px] md:p-8";

const inputClass =
  "w-full border border-white/25 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-[#8FA882] focus:bg-white/10";

export default function LandingHeroForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          insurance: form.insurance,
          member_id: form.memberId,
          message: form.message,
          program: "General Detox Landing Page",
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Something went wrong. Please call us instead.");
      }
      setSubmitted(true);
      setForm(INITIAL);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit. Please call admissions.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div id="get-help" className={`${formShellClass} text-center`}>
        <i className="ri-checkbox-circle-line mb-4 text-4xl text-[#8FA882]" aria-hidden />
        <h2
          className="mb-2 text-2xl font-light text-white"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Thank you
        </h2>
        <p className="text-sm leading-relaxed text-white/75" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Our admissions team will reach out shortly. For immediate help, call{" "}
          <CallRailPhoneLink className="text-[#D4C9B5] hover:underline">
            {CALLRAIL_PHONE_DISPLAY_PARENS}
          </CallRailPhoneLink>
          .
        </p>
      </div>
    );
  }

  return (
    <div id="get-help" className={formShellClass}>
      <h2
        className="mb-1 text-2xl font-light text-white"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Send us a message
      </h2>
      <p
        className="mb-6 text-sm text-white/70"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Verify insurance or ask about same-day admission — confidential, no obligation.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          required
          value={form.firstName}
          onChange={onChange}
          className={inputClass}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          required
          value={form.lastName}
          onChange={onChange}
          className={inputClass}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={onChange}
          className={inputClass}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          required
          value={form.phone}
          onChange={onChange}
          className={inputClass}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        />
        <input
          type="text"
          name="insurance"
          placeholder="Insurance type"
          value={form.insurance}
          onChange={onChange}
          className={inputClass}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        />
        <input
          type="text"
          name="memberId"
          placeholder="Member ID"
          value={form.memberId}
          onChange={onChange}
          className={inputClass}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        />
        <textarea
          name="message"
          placeholder="How can we help?"
          rows={3}
          value={form.message}
          onChange={onChange}
          className={`${inputClass} resize-none`}
          style={{ fontFamily: "var(--font-dm-sans)" }}
        />
        {error ? (
          <p className="text-sm text-red-300" style={{ fontFamily: "var(--font-dm-sans)" }}>
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={submitting}
          className="mt-1 w-full bg-[#8FA882]/90 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition hover:bg-[#7A9674] disabled:opacity-60"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {submitting ? "Sending…" : "Get help today"}
        </button>
      </form>
    </div>
  );
}
