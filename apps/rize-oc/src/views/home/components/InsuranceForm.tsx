"use client";

import { useRef, useState } from "react";

const fieldClass = "w-full border border-warm bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-accent focus:outline-none transition-colors";
const labelClass = "block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink mb-1.5";

const insurers = [
  "Anthem", "Aetna", "Blue Cross Blue Shield", "Cigna", "Humana",
  "Kaiser", "Magellan", "MHN", "Optum", "United Healthcare",
  "Beacon Health", "Cenpatico", "Beacon", "Other",
];

export default function InsuranceForm({ showNotesField }: { showNotesField?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const fields = Object.fromEntries(fd.entries()) as Record<string, string>;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name,
          phone: fields.phone,
          message: fields.notes || undefined,
          insurance_provider: fields.insurance,
          member_id: fields.policy,
        }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
          <i className="ri-check-line text-2xl" />
        </span>
        <p className="text-sm font-semibold text-ink">We received your request!</p>
        <p className="text-xs font-light text-ink/55">Our team will contact you within 24 hours to verify your coverage.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className={labelClass}>Full Name*</label>
        <input name="name" type="text" placeholder="Full Name" required className={fieldClass} />
      </div>

      <div>
        <label className={labelClass}>Phone Number*</label>
        <input name="phone" type="tel" placeholder="Phone Number" required className={fieldClass} />
      </div>

      {showNotesField && (
        <div>
          <label className={labelClass}>What Are You Struggling With?</label>
          <textarea name="notes" placeholder="Notes" rows={3} className={`${fieldClass} resize-none`} />
        </div>
      )}

      <div>
        <label className={labelClass}>Insurance Provider*</label>
        <select name="insurance" required defaultValue="Anthem" className={fieldClass} style={{ colorScheme: "light" }}>
          {insurers.map((ins) => (
            <option key={ins} value={ins}>{ins}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Policy Number*</label>
        <input name="policy" type="text" placeholder="Policy Number" required className={fieldClass} />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-500">Something went wrong — please call us at (949) 461-2620.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 w-full bg-ink py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white hover:bg-ink/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === "loading" ? (
          <>Verifying… <i className="ri-loader-4-line animate-spin" /></>
        ) : (
          <>Verify Coverage <i className="ri-arrow-right-line" /></>
        )}
      </button>
    </form>
  );
}
