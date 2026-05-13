import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import Link from "next/link";

const fallback: Metadata = {
  title: "Insurance Coverage for Addiction Treatment | Northbound Treatment",
  description:
    "Northbound Treatment is in-network with Aetna, Anthem, Cigna, BlueCross BlueShield, and 15+ other major insurance plans. Verify your addiction treatment benefits for free — no obligation.",
  alternates: { canonical: "/insurance" },
};

const CARRIERS = [
  { label: "Aetna", href: "/insurance/aetna/" },
  { label: "Anthem Blue Cross", href: "/insurance/anthem-blue-cross/" },
  { label: "Beacon Health Options", href: "/insurance/beacon/" },
  { label: "BlueCross BlueShield", href: "/insurance/blue-cross-blue-shield/" },
  { label: "Cigna", href: "/insurance/cigna/" },
  { label: "ComPsych", href: "/insurance/compsych/" },
  { label: "First Health Network", href: "/insurance/first-health/" },
  { label: "GEHA", href: "/insurance/geha-insurance/" },
  { label: "Health Net", href: "/insurance/health-net/" },
  { label: "ILWU", href: "/insurance/ilwu/" },
  { label: "Magellan Health", href: "/insurance/magellan/" },
  { label: "MHN Insurance", href: "/insurance/mhn/" },
  { label: "NYSHIP", href: "/insurance/nyship/" },
  { label: "Premera Blue Cross", href: "/insurance/premera-blue-cross/" },
  { label: "TriCare", href: "/insurance/tricare/" },
  { label: "USAMCO", href: "/insurance/usamco/" },
];

const STEPS = [
  { n: "01", title: "Call or Submit", desc: "Contact our admissions team or fill out the online form with your insurance card ready." },
  { n: "02", title: "We Verify", desc: "Our benefits team contacts your insurer directly — usually within 1 business hour." },
  { n: "03", title: "You Get Answers", desc: "We explain your coverage, co-pays, and out-of-pocket costs in plain language." },
  { n: "04", title: "Start Treatment", desc: "If you're ready, we have a bed available. Same-day admissions are possible." },
];


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance", fallback);
}

export default function Page() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#3a6697] pb-16 pt-28 lg:pb-20 lg:pt-36">
        <div className="pointer-events-none absolute left-8 top-8 h-16 w-16 border-l-2 border-t-2 border-white/10" />
        <div className="pointer-events-none absolute right-8 top-8 h-16 w-16 border-r-2 border-t-2 border-white/10" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#e97a52]/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <nav className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]">
            <Link href="/" className="text-white/35 hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#e97a52]">Insurance</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e97a52]">Insurance & Coverage</p>
          <h1 className="font-heading mt-4 max-w-3xl text-5xl font-bold leading-tight text-white md:text-6xl">
            We accept <span className="italic text-[#e97a52]">most major</span> insurance plans
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
            Northbound Treatment is an in-network preferred provider with 15+ major insurance carriers.
            Our benefits team verifies your coverage for free — most clients pay little to nothing out-of-pocket.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:8888563990"
              className="flex items-center gap-2 bg-[#e97a52] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#3a6697]"
            >
              <i className="ri-phone-line" /> Verify My Benefits
            </a>
            <Link
              href="/contact-us/"
              className="flex items-center gap-2 border border-white/20 px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition-all hover:border-white/50 hover:text-white"
            >
              Submit Online
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e97a52] via-[#3a6697] to-[#e97a52]/30" />
      </section>

      {/* How it works */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-[2px] w-10 bg-[#e97a52]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">How It Works</span>
          </div>
          <h2 className="font-heading mb-12 text-4xl font-bold text-[#3a6697] md:text-5xl">
            Free benefits check — <span className="italic text-[#e97a52]">results in under an hour</span>
          </h2>

          <div className="grid grid-cols-1 gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-white p-8">
                <p className="font-heading text-4xl font-bold text-[#e97a52]/20">{s.n}</p>
                <h3 className="font-heading mt-3 text-lg font-bold text-[#3a6697]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrier grid */}
      <section className="bg-[#eef2f7] py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-[2px] w-10 bg-[#e97a52]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">In-Network Carriers</span>
          </div>
          <h2 className="font-heading mb-10 text-4xl font-bold text-[#3a6697] md:text-5xl">
            Accepted <span className="italic text-[#e97a52]">insurance plans</span>
          </h2>

          <div className="grid grid-cols-2 gap-px bg-[#cdd8e8] sm:grid-cols-3 lg:grid-cols-4">
            {CARRIERS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex items-center justify-between bg-white px-6 py-5 transition-colors hover:bg-[#3a6697]"
              >
                <div className="flex items-center gap-3">
                  <i className="ri-shield-check-line text-[#e97a52] text-lg" />
                  <span className="font-heading text-sm font-bold text-[#3a6697] transition-colors group-hover:text-white">
                    {c.label}
                  </span>
                </div>
                <i className="ri-arrow-right-line text-xs text-[#94a3b8] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-white group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          <p className="mt-6 text-sm text-[#64748b]">
            Don&apos;t see your carrier?{" "}
            <Link href="/contact-us/" className="font-semibold text-[#e97a52] underline underline-offset-2 hover:text-[#3a6697]">
              Call us
            </Link>{" "}
            — we work with many additional plans and can often negotiate out-of-network benefits.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#3a6697] py-16 md:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#e97a52]/10 blur-3xl" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e97a52]">Start Today</p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-white md:text-4xl">
            Cost should never prevent someone from getting <span className="italic text-[#e97a52]">help.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50">
            If your insurance doesn&apos;t cover the full cost of treatment, ask about the{" "}
            <Link href="/wahler-scholarship/" className="text-[#e97a52] underline underline-offset-2 hover:text-white">
              Wahler Scholarship
            </Link>{" "}
            and our flexible financial assistance programs.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:8888563990"
              className="flex items-center gap-2 bg-[#e97a52] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#3a6697]"
            >
              <i className="ri-phone-line" /> Call (888) 856-3990
            </a>
            <Link
              href="/financial-assistance/"
              className="border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition-all hover:border-white/50 hover:text-white"
            >
              Financial Assistance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
