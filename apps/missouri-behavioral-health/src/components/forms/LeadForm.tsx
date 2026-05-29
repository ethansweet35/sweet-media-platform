"use client";

import { useState } from "react";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

type FieldName =
  | "name"
  | "email"
  | "phone"
  | "insurance_provider"
  | "member_id"
  | "service"
  | "message";

interface LeadFormProps {
  /** Which fields to render, in order. */
  fields: FieldName[];
  /** Hidden context value sent as `program` so the inbox shows the source. */
  source: string;
  submitLabel: string;
  successTitle?: string;
  successBody?: string;
  /** Tailwind tone for inputs — light card vs. dark section. */
  tone?: "light" | "dark";
}

const SERVICE_OPTIONS = [
  "Partial Hospitalization (PHP)",
  "Intensive Outpatient (IOP)",
  "Outpatient Program",
  "Sober Living",
  "Mental Health Treatment",
  "Not sure yet",
];

const INSURANCE_OPTIONS = [
  "Aetna",
  "Anthem Blue Cross",
  "Blue Cross Blue Shield",
  "Cigna",
  "Beacon Health",
  "Carelon",
  "GEHA",
  "Cox Health",
  "Other / Not listed",
  "Self-pay",
];

const FIELD_META: Record<
  FieldName,
  { label: string; type: "text" | "email" | "tel" | "textarea" | "select"; required?: boolean; options?: string[]; full?: boolean }
> = {
  name: { label: "Full name", type: "text", required: true },
  email: { label: "Email", type: "email", required: true },
  phone: { label: "Phone", type: "tel", required: true },
  insurance_provider: { label: "Insurance provider", type: "select", required: true, options: INSURANCE_OPTIONS },
  member_id: { label: "Member ID (optional)", type: "text" },
  service: { label: "Program of interest", type: "select", options: SERVICE_OPTIONS },
  message: { label: "How can we help? (optional)", type: "textarea", full: true },
};

export default function LeadForm({
  fields,
  source,
  submitLabel,
  successTitle = "Thank you — we’ve received your request.",
  successBody = "An admissions coordinator will reach out shortly. For immediate help, call us anytime.",
  tone = "light",
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const isDark = tone === "dark";

  const labelClass = `mb-1.5 block font-body text-[11px] font-semibold uppercase tracking-[0.12em] ${
    isDark ? "text-white/55" : "text-mbh-forest/60"
  }`;
  const inputClass = `w-full rounded-xl border px-4 py-3 font-body text-sm outline-none transition focus:ring-2 ${
    isDark
      ? "border-white/15 bg-white/5 text-white placeholder:text-white/35 focus:border-mbh-sage focus:ring-mbh-sage/30"
      : "border-mbh-forest/15 bg-white text-mbh-ink placeholder:text-mbh-body/40 focus:border-mbh-green focus:ring-mbh-green/20"
  }`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, program: source }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-2xl border p-8 text-center ${
          isDark ? "border-white/15 bg-white/5" : "border-mbh-green/25 bg-mbh-green/8"
        }`}
      >
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-mbh-green text-white">
          <i className="ri-check-line text-2xl" aria-hidden />
        </span>
        <p className={`font-display text-lg font-semibold ${isDark ? "text-white" : "text-mbh-forest"}`}>
          {successTitle}
        </p>
        <p className={`mt-2 font-body text-sm leading-relaxed ${isDark ? "text-white/65" : "text-mbh-body"}`}>
          {successBody}
        </p>
        <a
          href={PHONE_HREF}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-mbh-green px-6 py-3 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
        >
          <i className="ri-phone-fill" aria-hidden />
          {PHONE_DISPLAY}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((name) => {
        const meta = FIELD_META[name];
        const span = meta.full || meta.type === "textarea" ? "sm:col-span-2" : "";
        return (
          <div key={name} className={span}>
            <label htmlFor={name} className={labelClass}>
              {meta.label}
            </label>
            {meta.type === "textarea" ? (
              <textarea
                id={name}
                name={name}
                rows={4}
                required={meta.required}
                className={inputClass}
              />
            ) : meta.type === "select" ? (
              <select id={name} name={name} required={meta.required} defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select…
                </option>
                {meta.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={name}
                name={name}
                type={meta.type}
                required={meta.required}
                className={inputClass}
              />
            )}
          </div>
        );
      })}

      {status === "error" ? (
        <p className="sm:col-span-2 font-body text-sm text-red-600">
          {error} You can also call us at{" "}
          <a href={PHONE_HREF} className="font-semibold underline">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-mbh-green px-8 py-4 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <i className="ri-loader-4-line animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              {submitLabel}
              <i className="ri-arrow-right-line" aria-hidden />
            </>
          )}
        </button>
        <p className={`mt-3 font-body text-[11px] ${isDark ? "text-white/40" : "text-mbh-body/50"}`}>
          <i className="ri-lock-line mr-1" aria-hidden />
          Your information is confidential and HIPAA-protected. Submitting this form does not create a
          provider relationship.
        </p>
      </div>
    </form>
  );
}
