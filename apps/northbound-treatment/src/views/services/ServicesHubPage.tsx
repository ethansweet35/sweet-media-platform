import Link from "next/link";
import { heroSectionPad } from "@/lib/heroSpacing";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const LEVELS = [
  {
    icon: "ri-capsule-line",
    label: "Drug & Alcohol Detox",
    href: "/programs/detox/",
    desc: "24/7 medically supervised withdrawal management with dual-diagnosis screening — the safe first step.",
  },
  {
    icon: "ri-home-heart-line",
    label: "Residential Treatment",
    href: "/programs/residential-treatment-center/",
    desc: "Co-ed, structured inpatient care with individual therapy, group sessions, and holistic programming.",
  },
  {
    icon: "ri-hospital-line",
    label: "Partial Hospitalization (PHP)",
    href: "/programs/partial-hospitalization-program/",
    desc: "Up to 6 hours of structured daily clinical programming — the bridge from residential to outpatient.",
  },
  {
    icon: "ri-capsule-line",
    label: "Medication-Assisted Treatment",
    href: "/treatment/medication-assisted-treatment/",
    desc: "FDA-approved medications paired with counseling for opioid and alcohol use disorders.",
  },
  {
    icon: "ri-wifi-line",
    label: "Virtual IOP (HomeBound)",
    href: "/telehealth-iop-services/",
    desc: "Evidence-based virtual IOP available throughout California and Washington — therapy from home.",
  },
  {
    icon: "ri-refresh-line",
    label: "Aftercare & Alumni",
    href: "/programs/aftercare/",
    desc: "Personalized discharge plans, ongoing therapy referrals, alumni events, and lifelong community.",
  },
];

const SIGNATURE = [
  { icon: "ri-compass-3-line", label: "Adventure Therapy", href: "/adventure-therapy-program/" },
  { icon: "ri-brain-line", label: "Dual-Diagnosis", href: "/treatment/dual-diagnosis/" },
  { icon: "ri-heart-2-line", label: "Faith-Based Recovery", href: "/programs/residential-treatment-center/christ-centered-links-residential-program/" },
  { icon: "ri-team-line", label: "Family Services", href: "/programs/family-therapy/" },
  { icon: "ri-rainbow-line", label: "LGBTQIA+ Program", href: "/programs/lgbtq/" },
  { icon: "ri-leaf-line", label: "Wolf Assisted Therapy", href: "/wolf-assisted-therapy/" },
];

const STATS = [
  { value: "38+", label: "Years in practice" },
  { value: "10k+", label: "Lives changed" },
  { value: ">97%", label: "Abstinence rate" },
  { value: "15+", label: "Insurance plans accepted" },
];

export default function ServicesHubPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section className={`relative overflow-hidden bg-[#3a6697] ${heroSectionPad}`}>
        <div className="pointer-events-none absolute left-8 top-8 h-16 w-16 border-l-2 border-t-2 border-white/10" />
        <div className="pointer-events-none absolute right-8 top-8 h-16 w-16 border-r-2 border-t-2 border-white/10" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#e97a52]/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <nav className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]">
            <Link href="/" className="text-white/35 hover:text-white/70 transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <span className="text-[#e97a52]">Treatment Services</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#e97a52]"><AutoLinkedText>{"Full Continuum of Care"}</AutoLinkedText></p>
          <h1 className="font-heading mt-4 max-w-3xl text-5xl font-bold leading-tight text-white md:text-6xl">
            Treatment <span className="italic text-[#e97a52]">Services</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
            <AutoLinkedText>{"Northbound provides evidence-based, individualized addiction treatment across every level of care —\n            from medical detox and residential through outpatient, virtual IOP, and long-term aftercare support."}</AutoLinkedText>
          </p>

          {/* Stats strip */}
          <div className="mt-10 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#3a6697] px-6 py-5 text-center">
                <p className="font-heading text-3xl font-bold text-[#e97a52]"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40"><AutoLinkedText>{s.label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e97a52] via-[#3a6697] to-[#e97a52]/30" />
      </section>

      {/* ── Levels of Care ── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-[2px] w-10 bg-[#e97a52]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">Levels of Care</span>
          </div>
          <h2 className="font-heading mb-12 max-w-2xl text-4xl font-bold text-[#3a6697] md:text-5xl">
            A program for every <span className="italic text-[#e97a52]">stage of recovery</span>
          </h2>

          <div className="grid grid-cols-1 gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-3">
            {LEVELS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col gap-4 bg-white p-8 transition-colors hover:bg-[#eef2f7]"
              >
                <div className="flex h-10 w-10 items-center justify-center border border-[#cdd8e8] bg-[#eef2f7] text-[#3a6697] transition-colors group-hover:border-[#e97a52] group-hover:bg-[#e97a52] group-hover:text-white">
                  <i className={`${item.icon} text-lg`} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[#3a6697] transition-colors group-hover:text-[#e97a52]">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748b]"><AutoLinkedText>{item.desc}</AutoLinkedText></p>
                </div>
                <span className="mt-auto flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#e97a52]">
                  Learn More <i className="ri-arrow-right-line text-xs transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature Programs ── */}
      <section className="bg-[#eef2f7] py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-[2px] w-10 bg-[#e97a52]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e97a52]">Signature Programs</span>
          </div>
          <h2 className="font-heading mb-10 max-w-2xl text-4xl font-bold text-[#3a6697] md:text-5xl">
            What makes Northbound <span className="italic text-[#e97a52]">different</span>
          </h2>

          <div className="grid grid-cols-2 gap-px bg-[#cdd8e8] sm:grid-cols-4">
            {SIGNATURE.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center gap-3 bg-white p-6 text-center transition-colors hover:bg-[#3a6697]"
              >
                <div className="flex h-12 w-12 items-center justify-center bg-[#eef2f7] text-[#3a6697] transition-colors group-hover:bg-[#e97a52]/20 group-hover:text-[#e97a52]">
                  <i className={`${item.icon} text-xl`} />
                </div>
                <span className="font-heading text-sm font-bold text-[#3a6697] transition-colors group-hover:text-white">
                  {item.label}
                </span>
                <i className="ri-arrow-right-line text-xs text-[#e97a52] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#3a6697] py-16 md:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#e97a52]/10 blur-3xl" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e97a52]">Get Started Today</p>
              <h2 className="font-heading mt-3 max-w-lg text-3xl font-bold text-white md:text-4xl">
                Ready to find the right <span className="italic text-[#e97a52]">level of care?</span>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
                <AutoLinkedText>{"Our admissions team is available 24/7. One call is all it takes to get started — confidential, no obligation."}</AutoLinkedText>
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <a
                href="tel:8888563990"
                className="flex items-center justify-center gap-2 bg-[#e97a52] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#3a6697]"
              >
                <i className="ri-phone-line" />
                Call Us 24/7
              </a>
              <Link
                href="/contact-us/"
                className="flex items-center justify-center gap-2 border border-white/20 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition-all hover:border-white/50 hover:text-white"
              >
                Verify Insurance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
