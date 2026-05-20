import Link from "next/link";
import CtmLeadFormCard from "@/components/feature/CtmLeadFormCard";
import CtaBanner from "@/views/shared/CtaBanner";
import { AutoLinkedTextClient } from "@sweetmedia/blog-core";

const locations = [
  {
    name: "Garden Grove — The Grove (Flagship)",
    address: "12832 Garden Grove Blvd, Garden Grove, CA 92843",
    href: "/locations/california/garden-grove/",
    blurb: "Residential treatment & medically supervised detox",
  },
  {
    name: "Newport Beach",
    address: "3822 Campus Dr, Suite 200, Newport Beach, CA 92660",
    href: "/locations/california/newport-beach/",
    blurb: "Outpatient programs & administrative offices",
  },
  {
    name: "San Diego (La Jolla)",
    address: "7924 Ivanhoe Ave, Suite 7, La Jolla, CA 92037",
    href: "/locations/california/san-diego/",
    blurb: "Outpatient & boutique transitional programming",
  },
  {
    name: "Seattle, WA",
    address: "2120 1st Ave N, Unit 313, Seattle, WA 98109",
    href: "/locations/washington/seattle/",
    blurb: "Pacific Northwest outpatient & telehealth hub",
  },
];

const trust = [
  { icon: "ri-time-line", label: "24/7 Admissions" },
  { icon: "ri-shield-check-line", label: "15+ Insurance Plans" },
  { icon: "ri-award-line", label: "DHCS Licensed" },
  { icon: "ri-lock-line", label: "100% Confidential" },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-navy-light/40" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-terracotta/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/40">
            <Link href="/" className="transition hover:text-terracotta">Home</Link>
            <i className="ri-arrow-right-s-line text-white/20" />
            <span className="text-white/70">Contact</span>
          </nav>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
            We&rsquo;re Here to Help
          </p>
          <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Contact <span className="italic text-terracotta">Northbound</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            <AutoLinkedTextClient>{"Taking the first step toward recovery is hard — and you don't have to do it alone. Our admissions team is available 24/7 to answer questions, verify insurance, and help you build a plan."}</AutoLinkedTextClient>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-8">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-sm text-white/60">
                <i className={`${t.icon} text-terracotta`} />
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ────────────────────────────────────────── */}
      <section className="bg-sand py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">

            {/* Form column */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
                Start Your Journey
              </p>
              <h2 className="font-heading mb-3 text-3xl font-bold text-navy md:text-4xl">
                Tell Us About <span className="italic text-terracotta">Yourself</span>
              </h2>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-espresso/70">
                Fill out the form and an admissions counselor will reach out within minutes.
                All information is completely confidential.
              </p>

              <CtmLeadFormCard
                eyebrow="Available 24/7"
                title="Confidential Contact Form"
                subtitle="A counselor will respond within minutes."
              />

              <p className="mt-6 flex items-center justify-center gap-2 text-xs text-espresso/50">
                <i className="ri-lock-line" />
                Your information is 100% confidential and never shared.
              </p>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Phone CTA */}
              <div className="relative overflow-hidden bg-navy p-7">
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy-light/50" />
                <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-terracotta/15" />
                <div className="relative z-10">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta">
                      Immediate Help
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    Call us anytime — day or night.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    Our admissions team answers every call. No automated menus.
                  </p>
                  <a
                    href="tel:8663110003"
                    className="mt-5 flex items-center justify-center gap-2 bg-terracotta px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-terracotta-light"
                  >
                    <i className="ri-phone-fill text-base" />
                    (866) 311-0003
                  </a>
                </div>
              </div>

              {/* Insurance */}
              <div className="border border-sand-dark bg-white p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
                  Insurance
                </p>
                <h3 className="font-heading mb-3 text-base font-bold text-navy">
                  We&rsquo;re in-network with 15+ major plans.
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-espresso/70">
                  Verify your coverage at no cost — most clients are approved in minutes.
                </p>
                <Link
                  href="/insurance/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-navy transition hover:text-terracotta"
                >
                  Verify Insurance
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>

              {/* Trust card */}
              <div className="border border-sand-dark bg-white p-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
                  Why Northbound
                </p>
                <ul className="space-y-3">
                  {[
                    "38+ years of clinical experience (since 1988)",
                    "10,000+ lives transformed",
                    ">97% drug abstinence in our 2015 outcomes study",
                    "DHCS Licensed #300661CP · NAATP Member",
                    "4.6/5 Google rating from 224+ reviews",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-espresso/75">
                      <i className="ri-check-line mt-0.5 text-terracotta" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Locations strip ───────────────────────────────────────── */}
      <section className="border-t border-sand-dark bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">
            Find Us
          </p>
          <h2 className="font-heading mb-12 text-3xl font-bold text-navy md:text-4xl">
            Our <span className="italic text-terracotta">Treatment Centers</span>
          </h2>

          <div className="grid gap-px overflow-hidden border border-sand-dark bg-sand-dark sm:grid-cols-2 lg:grid-cols-4">
            {locations.map((loc) => (
              <Link
                key={loc.name}
                href={loc.href}
                className="group flex flex-col gap-3 bg-white p-7 transition-colors hover:bg-navy"
              >
                <i className="ri-map-pin-2-line text-2xl text-terracotta" />
                <p className="font-heading text-base font-bold leading-snug text-navy transition-colors group-hover:text-white">
                  {loc.name}
                </p>
                <p className="text-xs leading-relaxed text-espresso/60 transition-colors group-hover:text-white/60">
                  {loc.address}
                </p>
                <p className="text-xs italic leading-relaxed text-espresso/50 transition-colors group-hover:text-white/50">
                  {loc.blurb}
                </p>
                <span className="mt-auto flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-terracotta">
                  View location <i className="ri-arrow-right-line" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <CtaBanner
        eyebrow="Ready When You Are"
        headline="Recovery starts with a single conversation."
        body="Our admissions counselors are standing by 24/7 — there's no wrong time to call."
        primaryCta={{ label: "Verify Insurance", href: "/insurance/" }}
        secondaryCta={{ label: "(866) 311-0003", href: "tel:8663110003" }}
      />
    </>
  );
}
