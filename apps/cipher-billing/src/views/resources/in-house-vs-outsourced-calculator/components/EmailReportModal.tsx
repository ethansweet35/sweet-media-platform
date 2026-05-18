"use client";

import { useState } from "react";

interface CalculatorInputSnapshot {
  monthlyClaimVolume: number;
  avgClaimValue: number;
  currentDenialRate: number;
  daysInAR: number;
  numBillers: number;
  avgSalary: number;
  benefitsLoad: number;
  managerMode: "full" | "percent";
  managerSalary: number;
  managerPercent: number;
  billingSoftwareMonthly: number;
  clearinghouseFeesMonthly: number;
  overheadPerBiller: number;
  inHouseTotalCost: number;
  outsourcedTotalCost: number;
  annualSavings: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  inputs: CalculatorInputSnapshot;
}

const labelCls =
  "block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5a6570]";
const inputCls =
  "w-full rounded border border-[#166C96]/30 bg-white px-3 py-2.5 text-sm text-[#0D1833] outline-none focus:border-[#166C96] focus:ring-1 focus:ring-[#166C96]/20";

export default function EmailReportModal({ open, onClose, inputs }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const fields: Record<string, string> = {};
    fd.forEach((v, k) => { if (typeof v === "string") fields[k] = v; });

    const savings = Math.round(inputs.annualSavings);
    const inHouse = Math.round(inputs.inHouseTotalCost);
    const outsourced = Math.round(inputs.outsourcedTotalCost);

    // TODO: wire a dedicated /api/calculator-report endpoint that sends a
    // formatted HTML email with the full breakdown table. For now this posts
    // to the standard contact API which forwards the data to the team inbox.
    // See docs/in-house-vs-outsourced-calculator-readme.md for endpoint spec.
    const payload = {
      ...fields,
      source: "in-house-vs-outsourced-calculator",
      // Calculator snapshot — forwarded to the contact API as extra fields
      calculator_monthly_claims: String(inputs.monthlyClaimVolume),
      calculator_avg_claim_value: String(inputs.avgClaimValue),
      calculator_denial_rate: String(inputs.currentDenialRate),
      calculator_days_in_ar: String(inputs.daysInAR),
      calculator_num_billers: String(inputs.numBillers),
      calculator_avg_salary: String(inputs.avgSalary),
      calculator_in_house_total: String(inHouse),
      calculator_outsourced_total: String(outsourced),
      calculator_annual_savings: String(savings),
      message: `Cost calculator report request.\n\nIn-house est.: $${inHouse.toLocaleString()}/yr\nOutsourced est.: $${outsourced.toLocaleString()}/yr\nEst. savings: $${savings.toLocaleString()}/yr\n\nInputs: ${inputs.monthlyClaimVolume} claims/mo @ $${inputs.avgClaimValue} avg, ${inputs.currentDenialRate}% denial rate, ${inputs.daysInAR} days A/R, ${inputs.numBillers} billers @ $${inputs.avgSalary.toLocaleString()} salary.`,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="Email this report"
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[#e2e8f0] text-[#8a9299] transition hover:border-[#166C96]/40 hover:text-[#166C96]"
          aria-label="Close"
        >
          <i className="ri-close-line text-base" />
        </button>

        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#166C96]">
          Save Your Results
        </p>
        <h3 className="mt-2 font-[var(--font-heading)] text-xl font-medium text-[#0D1833]">
          Email Me This Report
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#4a5565]">
          We&rsquo;ll send a summary of your cost comparison. Our team may also follow up with a personalized assessment.
        </p>

        {status === "success" ? (
          <div className="mt-6 rounded-lg border border-[#166C96]/30 bg-[#166C96]/8 px-4 py-4 text-sm font-medium text-[#0D1833]">
            Sent — check your inbox. We&rsquo;ll be in touch shortly.
          </div>
        ) : (
          <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate suppressHydrationWarning>
            <div className="grid gap-1.5">
              <label htmlFor="modal-first" className={labelCls}>First Name</label>
              <input
                id="modal-first"
                name="firstName"
                required
                autoComplete="given-name"
                placeholder="First name"
                className={inputCls}
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="modal-email" className={labelCls}>Work Email</label>
              <input
                id="modal-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@yourfacility.com"
                className={inputCls}
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="modal-facility" className={labelCls}>Facility Name</label>
              <input
                id="modal-facility"
                name="service"
                autoComplete="organization"
                placeholder="Your facility or practice name"
                className={inputCls}
              />
            </div>

            {status === "error" && error ? (
              <p className="text-sm font-medium text-red-600" role="alert">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 w-full rounded bg-[#166C96] py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#145a82] disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send Report"}
            </button>

            <p className="text-center text-[10.5px] leading-relaxed text-[#8a9299]">
              We respect your privacy and won&rsquo;t share your information.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
