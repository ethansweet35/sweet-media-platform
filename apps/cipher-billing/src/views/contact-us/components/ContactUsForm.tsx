"use client";

import { useState } from "react";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

function formLabel(id: string, text: string) {
  return (
    <label
      htmlFor={id}
      className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a6570]"
    >
      {text}
    </label>
  );
}

const ROLE_OPTIONS = [
  "Owner / CEO",
  "CFO / Finance Director",
  "Clinical Director",
  "Billing Manager",
  "Office Administrator",
  "Other",
] as const;

const FACILITY_OPTIONS = [
  "Outpatient Mental Health Clinic",
  "Substance Abuse / Addiction Treatment Center",
  "Residential Treatment Facility (RTF)",
  "Partial Hospitalization Program (PHP)",
  "Intensive Outpatient Program (IOP)",
  "Private Practice / Group Practice",
  "Other",
] as const;

const inputClass =
  "rounded border border-[#166C96]/35 bg-white px-3 py-2.5 text-sm text-[#0D1833] placeholder:text-[#7a8791]/75 outline-none focus:border-[#166C96]";

export default function ContactUsForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (typeof v === "string") payload[k] = v;
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
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  return (
    <div id="contact-form" className="rounded-xl border border-[#166C96]/20 bg-white p-8 shadow-sm md:p-10">
      <h3 className="font-marcellus text-xl font-medium text-[#0D1833] md:text-2xl">Send Us a Message</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#4a5565]">
        <AutoLinkedTextClient>{"Complete the form and our behavioral health billing specialists will follow up shortly."}</AutoLinkedTextClient>
      </p>

      {status === "success" ? (
        <p
          className="mt-8 rounded-lg border border-[#166C96]/40 bg-[#166C96]/10 px-4 py-3 text-sm font-medium text-[#0D1833]"
          role="status"
        >
          <AutoLinkedTextClient>{"Thank you — your message was sent. We&apos;ll be in touch within 24 hours."}</AutoLinkedTextClient>
        </p>
      ) : (
        <form className="mt-8 grid gap-5" onSubmit={onSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              {formLabel("contact-first-name", "First Name")}
              <input
                id="contact-first-name"
                name="firstName"
                autoComplete="given-name"
                required
                placeholder="First Name"
                className={inputClass}
              />
            </div>
            <div className="grid gap-2">
              {formLabel("contact-last-name", "Last Name")}
              <input
                id="contact-last-name"
                name="lastName"
                autoComplete="family-name"
                required
                placeholder="Last Name"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              {formLabel("contact-email", "Email Address")}
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email Address"
                className={inputClass}
              />
            </div>
            <div className="grid gap-2">
              {formLabel("contact-phone", "Phone Number")}
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Phone Number"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-2">
            {formLabel("contact-org", "Organization Name")}
            <input
              id="contact-org"
              name="organization"
              autoComplete="organization"
              required
              placeholder="Organization Name"
              className={inputClass}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              {formLabel("contact-role", "Your Role")}
              <select id="contact-role" name="role" required className={inputClass}>
                <option value="">Select…</option>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              {formLabel("contact-facility", "Facility Type")}
              <select id="contact-facility" name="facilityType" required className={inputClass}>
                <option value="">Select…</option>
                {FACILITY_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-2">
            {formLabel("contact-message", "How Can We Help?")}
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Tell us about your goals or challenges."
              className={`min-h-[120px] ${inputClass}`}
            />
          </div>

          {status === "error" && errorMessage ? (
            <p className="text-sm font-medium text-red-700" role="alert"><AutoLinkedTextClient>{errorMessage}</AutoLinkedTextClient></p>
          ) : null}

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded bg-[#050a14] py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white hover:bg-black disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>

          <p className="text-center text-[11px] leading-relaxed text-[#7a8791]">
            <AutoLinkedTextClient>{"By submitting this form, you agree to our privacy policy and consent to be contacted by Cipher Billing."}</AutoLinkedTextClient>
          </p>
        </form>
      )}
    </div>
  );
}
