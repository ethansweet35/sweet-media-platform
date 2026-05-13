"use client";

import Link from "next/link";
import { useState } from "react";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const locations = [
  {
    name: "Garden Grove — The Grove (Flagship)",
    address: "12832 Garden Grove Blvd, Garden Grove, CA 92843",
    phone: "(866) 311-0003",
    href: "/locations/california/garden-grove/",
    icon: "ri-map-pin-2-line",
  },
  {
    name: "Newport Beach",
    address: "Newport Beach, CA",
    phone: "(866) 311-0003",
    href: "/locations/california/newport-beach/",
    icon: "ri-map-pin-2-line",
  },
  {
    name: "San Diego",
    address: "San Diego, CA",
    phone: "(866) 311-0003",
    href: "/locations/california/san-diego/",
    icon: "ri-map-pin-2-line",
  },
  {
    name: "Seattle, WA",
    address: "Seattle, WA",
    phone: "(866) 311-0003",
    href: "/locations/washington/seattle/",
    icon: "ri-map-pin-2-line",
  },
];

const trust = [
  { icon: "ri-award-2-line", label: "JCAHO Accredited" },
  { icon: "ri-shield-check-line", label: "15+ Insurance Plans Accepted" },
  { icon: "ri-time-line", label: "24/7 Admissions" },
  { icon: "ri-lock-line", label: "100% Confidential" },
];

type FormState = "idle" | "submitting" | "success" | "error";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#3a6697] mb-1.5">
      {children}
    </label>
  );
}

const inputCls =
  "w-full border border-[#cdd8e8] bg-white px-4 py-3 text-sm text-[#3a6697] placeholder:text-[#94a3b8] focus:border-[#e97a52] focus:outline-none transition-colors";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [seekingFor, setSeekingFor] = useState<"Myself" | "A Loved One">("Myself");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    const fd = new FormData(e.currentTarget);
    fd.set("seeking_for", seekingFor);

    const firstName = fd.get("first_name") as string;
    const lastName = fd.get("last_name") as string;
    fd.set("name", `${firstName} ${lastName}`.trim());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(fd)),
        headers: { "Content-Type": "application/json" },
      });
      setFormState(res.ok ? "success" : "error");
    } catch {
      setFormState("error");
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#3a6697] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]"><AutoLinkedTextClient>{"We&apos;re Here to Help"}</AutoLinkedTextClient></p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            Contact <span className="italic text-[#e97a52]">Northbound</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedTextClient>{"We know how difficult it can be to take that first step toward recovery. At Northbound,\n            you will never be alone on this path. Our admissions team is available 24 hours a day,\n            7 days a week."}</AutoLinkedTextClient>
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-sm text-white/80">
                <i className={`${t.icon} text-[#e97a52]`} />
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">

            {/* Form */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Start Your Journey</p>
              <h2 className="font-heading text-3xl font-bold text-[#3a6697] mb-8">
                Tell Us About Yourself
              </h2>

              {formState === "success" ? (
                <div className="border border-[#cdd8e8] bg-[#eef2f7] p-10 text-center">
                  <i className="ri-checkbox-circle-line text-4xl text-[#e97a52]" />
                  <h3 className="font-heading text-2xl font-bold text-[#3a6697] mt-4">Thank you — we&apos;ll be in touch shortly.</h3>
                  <p className="mt-3 text-sm text-[#64748b] max-w-md mx-auto">
                    One of our admissions specialists will reach out to you within 24 hours.
                    For immediate help, call us at <a href="tel:8663110003" className="font-semibold text-[#e97a52]">(866) 311-0003</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Seeking for */}
                  <div>
                    <Label>I Need Help For</Label>
                    <div className="flex gap-0">
                      {(["Myself", "A Loved One"] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSeekingFor(opt)}
                          className={`flex-1 py-3 text-sm font-semibold border transition-colors ${
                            seekingFor === opt
                              ? "bg-[#3a6697] text-white border-[#3a6697]"
                              : "bg-white text-[#64748b] border-[#cdd8e8] hover:border-[#3a6697]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name row */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>First Name *</Label>
                      <input name="first_name" required placeholder="First name" className={inputCls} />
                    </div>
                    <div>
                      <Label>Last Name *</Label>
                      <input name="last_name" required placeholder="Last name" className={inputCls} />
                    </div>
                  </div>

                  {/* Contact row */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Email Address *</Label>
                      <input name="email" type="email" required placeholder="you@email.com" className={inputCls} />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <input name="phone" type="tel" placeholder="(000) 000-0000" className={inputCls} />
                    </div>
                  </div>

                  {/* How heard */}
                  <div>
                    <Label>How Did You Hear About Us?</Label>
                    <select name="how_heard" className={inputCls}>
                      <option value="">Select one…</option>
                      <option>Google Search</option>
                      <option>Google Ads</option>
                      <option>Facebook</option>
                      <option>Instagram</option>
                      <option>Referring Professional</option>
                      <option>Friend or Family</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Paying with */}
                  <div>
                    <Label>Paying With</Label>
                    <select name="paying_with" className={inputCls}>
                      <option value="">Select one…</option>
                      <option>Private Insurance &amp; Can Spend $10,000+</option>
                      <option>No Private Insurance, But Can Spend $10,000+</option>
                      <option>Have Private Insurance, But No Money to Spend</option>
                      <option>Medicaid / Medicare &amp; No Money to Spend</option>
                      <option>Unsure</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <Label>Tell Us Your Story</Label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Share anything that will help us understand your situation and how we can best help you or your loved one…"
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {formState === "error" && (
                    <p className="text-sm text-red-600 font-medium">
                      <AutoLinkedTextClient>{"Something went wrong. Please try again or call us at (866) 311-0003."}</AutoLinkedTextClient>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full bg-[#e97a52] py-4 text-sm font-semibold text-white transition hover:bg-[#f09068] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formState === "submitting" ? (
                      <><i className="ri-loader-4-line animate-spin" /> Sending…</>
                    ) : (
                      <><i className="ri-send-plane-line" /> Send Message</>
                    )}
                  </button>

                  <p className="text-xs text-[#94a3b8] text-center">
                    <AutoLinkedTextClient>{"Your information is 100% confidential and never shared."}</AutoLinkedTextClient>
                  </p>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">

              {/* Phone CTA */}
              <div className="bg-[#3a6697] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#e97a52] mb-3">
                  Immediate Help
                </p>
                <p className="text-white/80 text-sm leading-6 mb-5">
                  <AutoLinkedTextClient>{"For immediate assistance, call our 24/7 admissions hotline. We answer every call."}</AutoLinkedTextClient>
                </p>
                <a
                  href="tel:8663110003"
                  className="flex items-center gap-3 bg-[#e97a52] px-6 py-4 text-white font-semibold hover:bg-[#f09068] transition-colors"
                >
                  <i className="ri-phone-fill text-xl" />
                  <span>
                    <span className="block text-xs font-normal opacity-80">Call us anytime</span>
                    (866) 311-0003
                  </span>
                </a>
              </div>

              {/* Insurance */}
              <div className="border border-[#cdd8e8] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#e97a52] mb-3">Insurance</p>
                <p className="text-sm text-[#64748b] leading-6 mb-4">
                  <AutoLinkedTextClient>{"We&apos;re in-network with 15+ major insurance plans. Verify your coverage at no cost — in minutes."}</AutoLinkedTextClient>
                </p>
                <Link href="/insurance/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3a6697] hover:text-[#e97a52] transition-colors">
                  Verify Insurance <i className="ri-arrow-right-line" />
                </Link>
              </div>

              {/* Locations */}
              <div className="border border-[#cdd8e8] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#e97a52] mb-4">Our Locations</p>
                <div className="space-y-4">
                  {locations.map((loc) => (
                    <Link key={loc.name} href={loc.href} className="group flex items-start gap-3 hover:text-[#e97a52] transition-colors">
                      <i className={`${loc.icon} text-[#e97a52] mt-0.5 shrink-0`} />
                      <div>
                        <p className="text-sm font-semibold text-[#3a6697] group-hover:text-[#e97a52] transition-colors"><AutoLinkedTextClient>{loc.name}</AutoLinkedTextClient></p>
                        <p className="text-xs text-[#64748b]"><AutoLinkedTextClient>{loc.address}</AutoLinkedTextClient></p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Accreditation badges */}
              <div className="bg-[#eef2f7] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <i className="ri-award-2-line text-[#e97a52] text-xl" />
                  <p className="text-sm font-semibold text-[#3a6697]">JCAHO Accredited</p>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-star-fill text-[#e97a52]" />
                  <p className="text-sm text-[#64748b]"><AutoLinkedTextClient>{"4.6★ on Google — 224+ reviews"}</AutoLinkedTextClient></p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Locations strip */}
      <section className="py-16 bg-[#eef2f7] border-t border-[#cdd8e8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Find Us</p>
          <h2 className="font-heading text-3xl font-bold text-[#3a6697] mb-10">Our Treatment Centers</h2>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((loc) => (
              <Link key={loc.name} href={loc.href} className="group bg-white p-6 flex flex-col gap-3 hover:bg-[#3a6697] transition-colors">
                <i className={`${loc.icon} text-2xl text-[#e97a52]`} />
                <p className="font-heading text-base font-bold text-[#3a6697] group-hover:text-white transition-colors"><AutoLinkedTextClient>{loc.name}</AutoLinkedTextClient></p>
                <p className="text-xs text-[#64748b] group-hover:text-white/70 transition-colors"><AutoLinkedTextClient>{loc.address}</AutoLinkedTextClient></p>
                <span className="mt-auto text-xs font-semibold text-[#e97a52] flex items-center gap-1">
                  View location <i className="ri-arrow-right-line" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
