"use client";

import { useState } from "react";
import CallRailPhoneLink from "@/components/ui/CallRailPhoneLink";
import { CALLRAIL_PHONE_DISPLAY_PARENS } from "@/lib/callrailPhone";

const BG =
  "https://knvkrhwlflkulybcmgmq.supabase.co/storage/v1/object/public/site-assets/images/sr_contact_bg01.jpg";

const EMAIL = "admissions@sullivanrecovery.com";
const ADDRESS = "24731 Via San Fernando, Mission Viejo, CA 92692";

const inputClass =
  "w-full border border-white/25 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-[var(--sr-sage)] focus:bg-white/10";

export default function HomeFooterContact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    insurance: "",
    memberId: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          insurance: form.insurance,
          member_id: form.memberId,
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(30,31,27,0.94) 0%, rgba(44,57,40,0.9) 100%)",
        }}
      />

      <div className="relative z-10 py-[100px]">
        <div className="sr-container">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Copy */}
            <div className="flex flex-col justify-center">
              <h2
                className="mb-4 text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05] text-white"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Send Us a Message
              </h2>
              <p
                className="mb-6 text-[15px] leading-[1.85] text-white/75"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                We are available around the clock to assist you, every day of the year.
              </p>
              <p
                className="mb-10 text-[14px] leading-[1.85] text-white/65"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Starting your journey to recovery is as simple as reaching out. Text, call, or
                email us today to begin a confidential conversation about your needs. Our
                compassionate team is ready to guide you through our straightforward admissions
                process.
              </p>

              <ul className="flex flex-col gap-5 border-t border-white/15 pt-8">
                <li>
                  <CallRailPhoneLink className="group flex items-center gap-4 text-white/80 transition hover:text-white">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-[var(--sr-sage)]">
                      <i className="ri-phone-line text-lg" />
                    </span>
                    <span style={{ fontFamily: "var(--font-dm-sans)" }}>
                      <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-white/45">
                        Phone
                      </span>
                      <span className="text-sm">{CALLRAIL_PHONE_DISPLAY_PARENS}</span>
                    </span>
                  </CallRailPhoneLink>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="group flex items-center gap-4 text-white/80 transition hover:text-white"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-[var(--sr-sage)]">
                      <i className="ri-mail-line text-lg" />
                    </span>
                    <span style={{ fontFamily: "var(--font-dm-sans)" }}>
                      <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-white/45">
                        E-mail
                      </span>
                      <span className="text-sm">{EMAIL}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-4 text-white/80">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/20 text-[var(--sr-sage)]">
                    <i className="ri-map-pin-line text-lg" />
                  </span>
                  <span style={{ fontFamily: "var(--font-dm-sans)" }}>
                    <span className="block text-[10px] font-medium uppercase tracking-[0.15em] text-white/45">
                      Address
                    </span>
                    <span className="text-sm leading-relaxed">{ADDRESS}</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Form */}
            <div className="border border-white/15 bg-[var(--sr-charcoal)]/40 p-8 backdrop-blur-sm md:p-10">
              {submitted ? (
                <div className="flex flex-col items-start gap-4 py-8">
                  <i className="ri-checkbox-circle-line text-4xl text-[var(--sr-sage)]" />
                  <h3
                    className="text-2xl font-light text-white"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    Thank you — we&apos;ll be in touch shortly.
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-white/65"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    A member of our admissions team will reach out soon. For immediate help,
                    call{" "}
                    <CallRailPhoneLink className="text-[var(--sr-sage)] hover:underline">
                      {CALLRAIL_PHONE_DISPLAY_PARENS}
                    </CallRailPhoneLink>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      value={form.firstName}
                      onChange={onChange}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      value={form.lastName}
                      onChange={onChange}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={form.email}
                      onChange={onChange}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={onChange}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      name="insurance"
                      placeholder="Insurance Type"
                      value={form.insurance}
                      onChange={onChange}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    />
                    <input
                      type="text"
                      name="memberId"
                      placeholder="ID #"
                      value={form.memberId}
                      onChange={onChange}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-dm-sans)" }}
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={4}
                    value={form.message}
                    onChange={onChange}
                    className={`${inputClass} resize-none`}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  />
                  {error && (
                    <p className="text-sm text-red-300" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 w-full bg-white py-4 text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--sr-ink)] transition hover:bg-[var(--sr-sage)] disabled:opacity-60"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {submitting ? "Sending…" : "Submit"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
