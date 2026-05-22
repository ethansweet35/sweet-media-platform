"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded border border-[#166C96]/30 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-[#166C96]";

function FieldLabel({ id, text, required }: { id: string; text: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
      {text}
      {required ? <span className="ml-0.5 text-[#5eb5e0]">*</span> : null}
    </label>
  );
}

type Props = {
  programLabel: string;
};

export default function ServiceLandingLeadForm({ programLabel }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = { program: programLabel };
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
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-[#166C96]/40 bg-[#166C96]/15 px-5 py-6 text-center" role="status">
        <i className="ri-check-double-line text-3xl text-[#5eb5e0]" aria-hidden />
        <p className="mt-3 text-sm font-medium text-white">Thank you — a billing specialist will contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate suppressHydrationWarning>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <FieldLabel id="svc-first" text="First Name" required />
          <input id="svc-first" name="firstName" autoComplete="given-name" required placeholder="First Name" className={inputClass} />
        </div>
        <div className="grid gap-1.5">
          <FieldLabel id="svc-last" text="Last Name" required />
          <input id="svc-last" name="lastName" autoComplete="family-name" required placeholder="Last Name" className={inputClass} />
        </div>
      </div>
      <div className="grid gap-1.5">
        <FieldLabel id="svc-email" text="Email" required />
        <input id="svc-email" name="email" type="email" autoComplete="email" required placeholder="Email" className={inputClass} />
      </div>
      <div className="grid gap-1.5">
        <FieldLabel id="svc-phone" text="Phone" required />
        <input id="svc-phone" name="phone" type="tel" autoComplete="tel" required placeholder="Phone" className={inputClass} />
      </div>
      <div className="grid gap-1.5">
        <FieldLabel id="svc-facility" text="Facility / Practice Name" required />
        <input id="svc-facility" name="facilityName" required placeholder="Facility Name" className={inputClass} />
      </div>
      {status === "error" && errorMsg ? (
        <p className="text-[13px] text-red-300" role="alert">
          {errorMsg}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 w-full rounded-md bg-[#1a8fd4] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#166C96] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request consultation"}
      </button>
    </form>
  );
}
