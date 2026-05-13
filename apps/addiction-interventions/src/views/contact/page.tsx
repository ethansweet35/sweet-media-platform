"use client";

import { useState } from "react";
import PageHero from "@/components/sections/PageHero";
import { PHONE_DISPLAY, PHONE_HREF, TRUST_SIGNALS } from "@/data/site";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

type FormStatus = "idle" | "submitting" | "success" | "error";

const SITUATIONS = [
  "Alcohol use",
  "Drug use",
  "Mental health crisis",
  "Dual diagnosis",
  "Crisis / immediate danger",
  "Family / codependency support",
  "Not sure yet",
];

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Submission failed.");
      }
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Speak With a Specialist"
        headline="We're here when you're ready to act."
        body="Your first call is free, confidential, and judgment-free. We listen first, then walk you through exactly what comes next for your family."
        primaryCta={{ label: `Call ${PHONE_DISPLAY}`, href: PHONE_HREF }}
        secondaryCta={undefined as unknown as { label: string; href: string }}
        showTrustLine={false}
        image="https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ai_contact_hero01.jpg"
        imageAlt="Addiction interventionist consulting with a family at a table"
      />

      {/* Why families hesitate — and why they should call anyway */}
      <section className="bg-[#F5F3E7] py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="grid gap-6 text-sm leading-relaxed text-[#4B4B4B] md:grid-cols-3">
            <div>
              <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                <i className="ri-time-line text-lg"></i>
              </span>
              <h3 className="font-heading mb-2 text-base font-bold text-[#1A1A17]">&ldquo;Is it the right time?&rdquo;</h3>
              <p><AutoLinkedTextClient>{"Most families wait too long. There is no perfect window — but there is a right one. Our first call helps you honestly assess where your loved one is, whether the situation warrants intervention now, and what the risk of waiting actually looks like."}</AutoLinkedTextClient></p>
            </div>
            <div>
              <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                <i className="ri-lock-line text-lg"></i>
              </span>
              <h3 className="font-heading mb-2 text-base font-bold text-[#1A1A17]">&ldquo;Is this confidential?&rdquo;</h3>
              <p><AutoLinkedTextClient>{"Completely. We never share family information with employers, insurance companies, or anyone outside your immediate care team without your written consent. Everything discussed on the first call stays between you and our interventionist."}</AutoLinkedTextClient></p>
            </div>
            <div>
              <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                <i className="ri-money-dollar-circle-line text-lg"></i>
              </span>
              <h3 className="font-heading mb-2 text-base font-bold text-[#1A1A17]">&ldquo;What does this cost?&rdquo;</h3>
              <p><AutoLinkedTextClient>{"The first consultation is always free. We quote honest, transparent pricing on that call — and we believe our fee is always less than the cost of one more month of continued addiction or untreated mental illness. We also work with families across a range of budgets."}</AutoLinkedTextClient></p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Form column */}
          <div>
            <p className="brand-eyebrow text-[var(--color-sage-deep)]">
              Get Help Right Now
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-ink)] md:text-4xl">
              Request a private consultation.
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-ink-muted)]">
              <AutoLinkedTextClient>{"Tell us a bit about your situation. We respond fast — usually\n              within minutes — and never share your information with anyone\n              outside our team."}</AutoLinkedTextClient>
            </p>

            {status === "success" ? (
              <div className="mt-8 rounded-2xl border border-[var(--color-sage)] bg-[var(--color-cream)] p-7">
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill mt-0.5 text-2xl text-[var(--color-sage-deep)]"></i>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                      Message received.
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-ink-muted)]">
                      A certified interventionist will reach out shortly. If
                      this is urgent, please call{" "}
                      <a
                        href={PHONE_HREF}
                        className="font-semibold text-[var(--color-sage-deep)] hover:underline"
                      >
                        {PHONE_DISPLAY}
                      </a>{" "}
                      now.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 grid gap-5">
                <Field label="Your name" name="name" required />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                    What's the situation?
                  </label>
                  <select
                    name="service"
                    className="mt-2 w-full rounded-xl border border-[var(--color-divider)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] focus:border-[var(--color-sage)] focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose one…
                    </option>
                    {SITUATIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]">
                    Anything else we should know? (optional)
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-[var(--color-divider)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] focus:border-[var(--color-sage)] focus:outline-none"
                    placeholder="Tell us a little about your loved one and what's been happening."
                  />
                </div>

                {errorMsg && (
                  <p className="text-sm text-red-600">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-sage)] px-7 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-sage-deep)] disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>
                      Sending…
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-fill"></i>
                      Send My Message
                    </>
                  )}
                </button>

                <p className="text-xs text-[var(--color-ink-muted)]">
                  <AutoLinkedTextClient>{"By submitting, you agree to be contacted by a member of our\n                  team. We never share your information."}</AutoLinkedTextClient>
                </p>
              </form>
            )}
          </div>

          {/* Info sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl bg-[var(--color-cream)] p-7">
              <p className="brand-eyebrow text-[var(--color-sage-deep)]"><AutoLinkedTextClient>{TRUST_SIGNALS.availability}</AutoLinkedTextClient></p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-ink)]">
                Speak with us right now.
              </h3>
              <a
                href={PHONE_HREF}
                className="mt-5 flex items-center gap-3 text-2xl font-semibold text-[var(--color-ink)] hover:text-[var(--color-sage-deep)]"
              >
                <i className="ri-phone-fill text-[var(--color-sage-deep)]"></i>
                {PHONE_DISPLAY}
              </a>
              <p className="mt-3 text-sm leading-6 text-[var(--color-ink-muted)]">
                <AutoLinkedTextClient>{"A certified interventionist answers every call. No bots, no\n                voicemails, no hold music — just real help when you need it."}</AutoLinkedTextClient>
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--color-divider)] bg-white p-7">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                What happens next?
              </h3>
              <ol className="mt-4 grid gap-3 text-sm leading-6 text-[var(--color-ink-muted)]">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--color-cream)] text-xs font-semibold text-[var(--color-sage-deep)]">
                    1
                  </span>
                  We listen — no pressure, no script.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--color-cream)] text-xs font-semibold text-[var(--color-sage-deep)]">
                    2
                  </span>
                  We assess the situation and tell you honestly what we'd do
                  if it were our family.
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[var(--color-cream)] text-xs font-semibold text-[var(--color-sage-deep)]">
                    3
                  </span>
                  If you decide to move forward, we mobilise within 24–48
                  hours (or same day for crises).
                </li>
              </ol>
            </div>

            <div className="rounded-2xl border border-[var(--color-divider)] bg-white p-7">
              <h3 className="text-lg font-semibold tracking-tight text-[var(--color-ink)]">
                Trust signals
              </h3>
              <ul className="mt-4 grid gap-3 text-sm text-[var(--color-ink-muted)]">
                <li className="flex items-start gap-3">
                  <i className="ri-shield-check-line text-lg text-[var(--color-sage-deep)]"></i>
                  {TRUST_SIGNALS.accreditation}
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-group-line text-lg text-[var(--color-sage-deep)]"></i>
                  {TRUST_SIGNALS.familiesHelpedTagline}
                </li>
                <li className="flex items-start gap-3">
                  <i className="ri-map-pin-line text-lg text-[var(--color-sage-deep)]"></i>
                  Nationwide on-site coverage
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-ink-muted)]"
      >
        {label} {required && <span className="text-[var(--color-sage-deep)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-[var(--color-divider)] bg-white px-4 py-3 text-sm text-[var(--color-ink)] focus:border-[var(--color-sage)] focus:outline-none"
      />
    </div>
  );
}
