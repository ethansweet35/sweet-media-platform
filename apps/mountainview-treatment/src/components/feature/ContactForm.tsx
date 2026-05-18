"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

type FormState = "idle" | "submitting" | "success" | "error";

const SERVICES = [
  "Partial Hospitalization Program (PHP)",
  "Intensive Outpatient Program (IOP)",
  "Outpatient Program (OP)",
  "Not sure — need guidance",
];

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong.");
      }

      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-16 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--mvt-teal-light)]/15">
          <i className="ri-check-line text-3xl text-[var(--mvt-teal-light)]" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading text-2xl font-light text-white">Message Received</p>
          <p className="mt-2 text-sm leading-6 text-white/70">
            A member of our admissions team will reach out to you shortly.
            For immediate assistance, call us at{" "}
            <a href={SITE.phone.href} className="text-[var(--mvt-teal-light)] hover:underline">
              {SITE.phone.display}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" type="text" label="Full Name" required />
        <Field name="email" type="email" label="Email Address" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="phone" type="tel" label="Phone Number" />
        <div>
          <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Program Interest
          </label>
          <select
            name="service"
            className="w-full border-0 border-b border-white/25 bg-transparent pb-2 pt-1 text-sm text-white focus:border-white focus:outline-none focus:ring-0"
          >
            <option value="" className="bg-[var(--mvt-forest-deep)] text-white">Select a program</option>
            {SERVICES.map((s) => (
              <option key={s} value={s} className="bg-[var(--mvt-forest-deep)] text-white">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
          Message <span className="normal-case font-normal text-white/40">(optional)</span>
        </label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us a little about your situation or what you're looking for…"
          className="w-full resize-none border-0 border-b border-white/25 bg-transparent pb-2 pt-1 text-sm text-white placeholder:text-white/35 focus:border-white focus:outline-none focus:ring-0"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-400">
          <i className="ri-error-warning-line mr-1.5" aria-hidden="true" />
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-2 w-full bg-white py-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)] transition hover:bg-[var(--mvt-cream)] disabled:opacity-60"
      >
        {state === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <i className="ri-loader-4-line animate-spin text-sm" aria-hidden="true" />
            Sending…
          </span>
        ) : (
          "Send Confidential Inquiry"
        )}
      </button>

      <p className="text-center text-[10px] leading-5 text-white/40">
        <i className="ri-lock-line mr-1" aria-hidden="true" />
        100% confidential. HIPAA-compliant. We never share your information.
      </p>
    </form>
  );
}

function Field({
  name,
  type,
  label,
  required,
}: {
  name: string;
  type: "text" | "email" | "tel";
  label: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
        {label}{required && <span className="ml-0.5 text-[var(--mvt-teal-light)]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="block w-full border-0 border-b border-white/25 bg-transparent pb-2 pt-1 text-sm text-white placeholder:text-white/35 focus:border-white focus:outline-none focus:ring-0"
      />
    </div>
  );
}
