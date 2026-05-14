"use client";

import { useState } from "react";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

/**
 * Homepage "Get Started Today" lead form — dark-themed sibling of
 * `ContactUsForm`. Submits as JSON to `/api/contact` and renders inline
 * success/error states without a full page reload.
 */
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

const inputClass =
  "rounded border border-[#166C96]/35 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-[#AAB3B9]/55 outline-none focus:border-[#166C96]";

export default function HomeLeadForm() {
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

  if (status === "success") {
    return (
      <p
        className="rounded-lg border border-[#166C96]/40 bg-[#166C96]/15 px-4 py-3 text-sm font-medium text-white"
        role="status"
      >
        <AutoLinkedTextClient>{"Thank you — your message was sent. We'll be in touch within 24 hours."}</AutoLinkedTextClient>
      </p>
    );
  }

  return (
    <form className="mt-8 grid gap-5" onSubmit={onSubmit} noValidate suppressHydrationWarning>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          {formLabel("lead-first-name", "First Name")}
          <input
            id="lead-first-name"
            name="firstName"
            autoComplete="given-name"
            required
            placeholder="First Name"
            className={inputClass}
          />
        </div>
        <div className="grid gap-2">
          {formLabel("lead-last-name", "Last Name")}
          <input
            id="lead-last-name"
            name="lastName"
            autoComplete="family-name"
            required
            placeholder="Last Name"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-2">
        {formLabel("lead-email", "Email Address")}
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email Address"
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        {formLabel("lead-phone", "Phone Number")}
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Phone Number"
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        {formLabel("lead-service", "Practice / Facility Name")}
        <input
          id="lead-service"
          name="service"
          autoComplete="organization"
          placeholder="Practice / Facility Name"
          className={inputClass}
        />
      </div>

      <div className="grid gap-2">
        {formLabel("lead-message", "How Can We Help?")}
        <textarea
          id="lead-message"
          name="message"
          rows={4}
          placeholder="Message"
          className={`min-h-[120px] ${inputClass}`}
        />
      </div>

      {status === "error" && errorMessage ? (
        <p className="text-sm font-medium text-red-400" role="alert">
          <AutoLinkedTextClient>{errorMessage}</AutoLinkedTextClient>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded bg-[#166C96] py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[#145a82] disabled:opacity-60"
      >
        {status === "sending" ? "Sending\u2026" : "Send"}
      </button>

      <p className="text-center text-[11px] leading-[1.35] text-[#AAB3B9]">
        <AutoLinkedTextClient>{"By submitting this form, you agree to our privacy policy and consent to be contacted by Cipher Billing."}</AutoLinkedTextClient>
      </p>
    </form>
  );
}
