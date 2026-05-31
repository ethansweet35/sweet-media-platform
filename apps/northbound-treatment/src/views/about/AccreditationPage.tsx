import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const accreditations = [
  {
    icon: "ri-award-line",
    name: "Joint Commission (JCAHO)",
    body: "In 2016, Northbound became accredited by the Joint Commission on Accreditation of Healthcare Organizations — the industry's most sought-after stamp of approval, bestowed only on organizations that provide the safest, highest quality, best-value healthcare. We wear our JCAHO accreditation with pride.",
  },
  {
    icon: "ri-building-4-line",
    name: "National Association of Addiction Treatment Providers (NAATP)",
    body: "Northbound is a proud member of NAATP, the leading national advocacy organization for addiction treatment. Membership signifies adherence to rigorous ethical standards and a commitment to advancing quality care across the field.",
  },
  {
    icon: "ri-shield-star-line",
    name: "California Department of Health Care Services (DHCS)",
    body: "Our facilities are licensed and certified by the California Department of Health Care Services, ensuring every level of care we provide — from medical detox through outpatient — meets state regulatory standards.",
  },
  {
    icon: "ri-verified-badge-line",
    name: "National Association of Therapeutic Schools and Programs (NATSAP)",
    body: "Northbound's specialty programming meets the professional standards set by NATSAP, reflecting our commitment to individualized, therapeutic approaches that address the full spectrum of each client's needs.",
  },
  {
    icon: "ri-heart-pulse-line",
    name: "Substance Abuse and Mental Health Services Administration (SAMHSA)",
    body: "Northbound is listed in the SAMHSA National Treatment Directory, the federal government's authoritative resource for Americans seeking behavioral health treatment.",
  },
];

const awards = [
  "Psychology Today Verified Treatment Center",
  "Newsweek America's Best Addiction Treatment Centers",
  "4.6/5 stars — 200+ verified Google Reviews",
  "Orange County's Most Trusted Rehab Center (multiple years)",
  "Veterans Affairs Community Care Network Provider",
];

export default function AccreditationPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="nb-hero-overlay bg-[#3a6697] py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Our Standards</p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            Accreditation &amp; <span className="italic text-[#e97a52]">Recognition</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedText>{"Not every treatment center is worthy of your trust. Northbound Treatment is proud to hold\n            accreditation from the industry's top organizations — recognizing our programs for impact,\n            safety, and quality of care."}</AutoLinkedText>
          </p>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]"><AutoLinkedText>{"Certified &amp; Accredited"}</AutoLinkedText></p>
            <h2 className="font-heading text-4xl font-bold text-[#3a6697] md:text-5xl">Our Accreditations</h2>
          </div>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-3">
            {accreditations.map((a) => (
              <div key={a.name} className="bg-white p-8 flex flex-col gap-4">
                <span className="flex h-12 w-12 items-center justify-center bg-[#eef2f7] text-[#3a6697]">
                  <i className={`${a.icon} text-2xl`} />
                </span>
                <h3 className="font-heading text-lg font-bold text-[#3a6697]">{a.name}</h3>
                <p className="text-sm leading-7 text-[#64748b]"><AutoLinkedText>{a.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 bg-[#eef2f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]"><AutoLinkedText>{"Recognized Excellence"}</AutoLinkedText></p>
            <h2 className="font-heading text-4xl font-bold text-[#3a6697] md:text-5xl">Awards &amp; Recognition</h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((a) => (
              <li key={a} className="flex items-start gap-3 bg-white border border-[#cdd8e8] px-6 py-5">
                <i className="ri-star-fill text-[#e97a52] mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-[#3a6697]">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#3a6697] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Choose a program you can trust.
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            <AutoLinkedText>{"Verify your insurance and speak with an admissions specialist today — at no cost to you."}</AutoLinkedText>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/admissions/" className="inline-flex items-center gap-2 bg-[#e97a52] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#f09068]">
              Start Admissions <i className="ri-arrow-right-line" />
            </Link>
            <Link href="/insurance/" className="inline-flex items-center gap-2 border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10">
              Verify Insurance
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
