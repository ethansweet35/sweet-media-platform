"use client";

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  insurance_provider: string;
  member_id: string;
  message: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  insurance_provider: "",
  member_id: "",
  message: "",
};

const inputClass =
  "w-full border border-[var(--sr-sand)] bg-[var(--sr-linen)] px-4 py-3 text-sm text-[var(--sr-ink)] placeholder:text-[var(--sr-muted)]/50 outline-none transition focus:border-[var(--sr-moss)] focus:ring-1 focus:ring-[var(--sr-moss)]/20";

const labelClass =
  "text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--sr-muted)]";

export default function InsuranceVerifyForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          program: "Insurance Verification",
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
      <div className="flex flex-col items-center gap-5 py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--sr-moss)]/10 text-[var(--sr-moss)]">
          <i className="ri-checkbox-circle-line text-3xl" aria-hidden />
        </span>
        <h3
          className="text-2xl font-light text-[var(--sr-ink)]"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Request received
        </h3>
        <p
          className="max-w-xs text-sm leading-relaxed text-[var(--sr-muted)]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Our admissions team will verify your benefits and reach out shortly — usually within
          one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mb-3 flex items-start justify-between gap-4 border-b border-[var(--sr-sand)] pb-5">
        <div>
          <h3
            className="text-2xl font-light text-[var(--sr-ink)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Verify my benefits
          </h3>
          <p
            className="mt-1 text-[12px] text-[var(--sr-muted)]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Free · Confidential · No commitment
          </p>
        </div>
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--sr-moss)]/10 text-[var(--sr-moss)]"
          aria-hidden
        >
          <i className="ri-shield-check-line text-xl" />
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="ins-name" className={labelClass}>
            Full name *
          </label>
          <input
            id="ins-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ins-email" className={labelClass}>
            Email *
          </label>
          <input
            id="ins-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="you@email.com"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ins-phone" className={labelClass}>
            Phone *
          </label>
          <input
            id="ins-phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
            placeholder="(949) 000-0000"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="ins-provider" className={labelClass}>
            Insurance provider *
          </label>
          <input
            id="ins-provider"
            type="text"
            name="insurance_provider"
            value={form.insurance_provider}
            onChange={handleChange}
            required
            placeholder="e.g. Aetna, Anthem, Cigna"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="ins-member" className={labelClass}>
            Member ID
          </label>
          <input
            id="ins-member"
            type="text"
            name="member_id"
            value={form.member_id}
            onChange={handleChange}
            placeholder="On your insurance card"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="ins-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="ins-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            placeholder="Optional — questions about coverage or admission timing"
            className={`${inputClass} resize-y min-h-[88px]`}
          />
        </div>
      </div>

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 inline-flex w-full items-center justify-center gap-2 bg-[var(--sr-moss)] px-6 py-3.5 text-[12px] font-semibold uppercase tracking-wider text-[var(--sr-parchment)] transition hover:bg-[var(--sr-fern)] disabled:opacity-60"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {submitting ? "Submitting…" : "Check my coverage"}
        <i className="ri-arrow-right-line text-sm" aria-hidden />
      </button>

      <p
        className="text-center text-[11px] leading-relaxed text-[var(--sr-muted)]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        Your information is confidential. We never sell or share your data.
      </p>
    </form>
  );
}
