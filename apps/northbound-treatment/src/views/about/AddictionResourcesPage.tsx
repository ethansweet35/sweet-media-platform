import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const programs = [
  { icon: "ri-first-aid-kit-line", label: "Medical Detox", href: "/programs/detox/", desc: "Safe, 24/7 medically supervised withdrawal management." },
  { icon: "ri-home-heart-line", label: "Residential Treatment", href: "/programs/residential-treatment-center/", desc: "Immersive inpatient care — 28 to 90 days." },
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)", href: "/programs/partial-hospitalization-program/", desc: "4–8 hours of structured day treatment daily." },
  { icon: "ri-calendar-check-line", label: "Intensive Outpatient (IOP)", href: "/programs/intensive-outpatient-treatment/", desc: "Flexible evening and weekend clinical programming." },
  { icon: "ri-wifi-line", label: "Telehealth IOP", href: "/telehealth-iop-services/", desc: "Licensed online treatment from anywhere in California." },
  { icon: "ri-building-2-line", label: "Sober Living", href: "/treatment/transitional-living-programs/sober-living/", desc: "Structured, supportive housing for sustained recovery." },
  { icon: "ri-refresh-line", label: "Aftercare", href: "/programs/aftercare/", desc: "Continued support after primary treatment ends." },
  { icon: "ri-team-line", label: "Alumni Program", href: "/community/alumni/", desc: "Ongoing community, events, and peer support." },
];

const substances = [
  { label: "Alcohol", href: "/treatment/alcoholism/" },
  { label: "Heroin", href: "/treatment/heroin/" },
  { label: "Meth", href: "/treatment/meth/" },
  { label: "Opioids", href: "/treatment/opioid/" },
  { label: "Cocaine / Crack", href: "/treatment/crack-cocaine/" },
  { label: "Prescription Drugs", href: "/treatment/prescription/" },
  { label: "Adderall", href: "/treatment/adderall/" },
  { label: "Marijuana", href: "/treatment/marijuana/" },
  { label: "Suboxone", href: "/treatment/suboxone/" },
];

export default function AddictionResourcesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#1b2a47] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">What We Treat</p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            Addiction Treatment <span className="italic text-[#e97a52]">Resources</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedText>{"Finding the right addiction treatment program — and the right timing — can make the\n            difference between relapse and recovery. We offer a wide range of drug and alcohol addiction\n            programs to help each individual find the perfect treatment option for their personal journey."}</AutoLinkedText>
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Levels of Care</p>
            <h2 className="font-heading text-4xl font-bold text-[#1b2a47] md:text-5xl">Treatment Programs</h2>
            <p className="mt-4 max-w-2xl text-[#64748b] leading-7">
              <AutoLinkedText>{"We understand that everyone&apos;s addiction story is different. Our full continuum of care\n              ensures every client gets exactly the level of support they need — from acute medical\n              detox through long-term sober living."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p) => (
              <Link key={p.label} href={p.href} className="group bg-white p-8 flex flex-col gap-3 hover:bg-[#eef2f7] transition-colors">
                <span className="flex h-12 w-12 items-center justify-center bg-[#eef2f7] text-[#1b2a47] group-hover:bg-white transition-colors">
                  <i className={`${p.icon} text-2xl`} />
                </span>
                <h3 className="font-heading text-lg font-bold text-[#1b2a47]">{p.label}</h3>
                <p className="text-sm text-[#64748b] leading-6"><AutoLinkedText>{p.desc}</AutoLinkedText></p>
                <span className="mt-auto text-xs font-semibold text-[#e97a52] flex items-center gap-1">
                  Learn more <i className="ri-arrow-right-line" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Substance types */}
      <section className="py-24 bg-[#eef2f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Substance Addiction</p>
            <h2 className="font-heading text-4xl font-bold text-[#1b2a47] md:text-5xl">What We Treat</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {substances.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="border border-[#cdd8e8] bg-white px-5 py-3 text-sm font-semibold text-[#1b2a47] hover:border-[#e97a52] hover:text-[#e97a52] transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1b2a47] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Not sure where to start?</h2>
            <p className="mt-3 text-white/70"><AutoLinkedText>{"Our admissions specialists will guide you to the right program — at no cost."}</AutoLinkedText></p>
          </div>
          <Link href="/admissions/" className="shrink-0 inline-flex items-center gap-2 bg-[#e97a52] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#f09068]">
            Speak with Admissions <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

    </div>
  );
}
