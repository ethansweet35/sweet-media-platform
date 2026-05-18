"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

type FormState = "idle" | "submitting" | "success" | "error";

/** variant="default" — name / email / insurance / policy_id
 *  variant="concierge" — name / phone / insurance / policy_id (2-col grid) */
export default function InlineInquiryForm({
  variant = "default",
}: {
  variant?: "default" | "concierge";
}) {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
          <i className="ri-check-line text-xl text-white" aria-hidden="true" />
        </span>
        <div>
          <p className="font-heading text-xl font-light text-white">Message Received</p>
          <p className="mt-1.5 text-sm text-white/65">
            Our team will be in touch shortly. For immediate help, call{" "}
            <a href={SITE.phone.href} className="text-white underline-offset-2 hover:underline">
              {SITE.phone.display}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  const inputCls =
    "block w-full border-0 border-b border-white/30 bg-transparent px-0 pb-2 pt-1 text-base font-light text-white placeholder:text-white/65 focus:border-white focus:outline-none focus:ring-0";

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-6">
      {variant === "concierge" ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input type="text" name="name" placeholder="Name" required className={inputCls} />
            <input type="tel" name="phone" placeholder="Phone Number" required className={inputCls} />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <input type="text" name="insurance" placeholder="Insurance" className={inputCls} />
            <input type="text" name="policy_id" placeholder="Policy ID" className={inputCls} />
          </div>
        </>
      ) : (
        <>
          <input type="text" name="name" placeholder="Name" required className={inputCls} />
          <input type="email" name="email" placeholder="Email" required className={inputCls} />
          <input type="text" name="insurance" placeholder="Insurance" className={inputCls} />
          <input type="text" name="policy_id" placeholder="Policy ID" className={inputCls} />
        </>
      )}

      {state === "error" && (
        <p className="text-sm text-red-400">
          Something went wrong — please try again or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-3 w-full bg-white py-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)] transition hover:bg-[var(--mvt-cream)] disabled:opacity-60"
      >
        {state === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <i className="ri-loader-4-line animate-spin text-sm" aria-hidden="true" />
            Sending…
          </span>
        ) : (
          "Send"
        )}
      </button>
    </form>
  );
}
