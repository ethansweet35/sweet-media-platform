import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const values = [
  {
    icon: "ri-heart-line",
    title: "Mission Over Margin",
    body: "Our clients' healing always comes before profit. Every decision we make — from staffing ratios to length of stay recommendations — is driven by what produces the best clinical outcomes, not what maximizes revenue.",
  },
  {
    icon: "ri-history-line",
    title: "History Conveys Legitimacy",
    body: "With over 38 years in practice, our track record speaks for itself. We do not cut corners, chase trends, or make promises we cannot keep. Our longevity is the product of consistently doing the right thing.",
  },
  {
    icon: "ri-user-heart-line",
    title: "Client-Centered Care",
    body: "Every treatment plan is built around the individual. We believe in the dignity and worth of each person who walks through our doors, and we treat them accordingly — with compassion, respect, and unwavering support.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Transparency & Honesty",
    body: "We communicate clearly and honestly about what we offer, what it costs, and what clients can realistically expect. There are no hidden fees, misleading guarantees, or high-pressure sales tactics at Northbound.",
  },
  {
    icon: "ri-team-line",
    title: "Staff Integrity",
    body: "Our clinical staff are held to the highest professional and ethical standards. We invest in ongoing training, supervision, and professional development to ensure every member of our team operates with excellence and integrity.",
  },
  {
    icon: "ri-refresh-line",
    title: "Continuous Improvement",
    body: "We actively study outcomes, solicit feedback, and incorporate evidence-based advances in addiction medicine. Our commitment to improvement means our clients always receive care informed by the latest science.",
  },
];

export default function CodeOfEthicsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#3a6697] py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Our Values</p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            Code of <span className="italic text-[#e97a52]">Ethics</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedText>{"Northbound Treatment Services® was founded upon the principle that our clients' best interest\n            comes first — always. In order to impact as many lives as possible, we adhere to a strict set\n            of core values, operating principles, and bold goals."}</AutoLinkedText>
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#eef2f7]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Our Mission</p>
          <h2 className="font-heading text-3xl font-bold text-[#3a6697] md:text-4xl leading-snug">
            We assist in helping as many people as possible to achieve a successful and
            fulfilled life beyond addiction.
          </h2>
          <p className="mt-6 text-[#64748b] leading-7 max-w-3xl mx-auto">
            <AutoLinkedText>{"In the last year alone, Northbound Treatment transformed the lives of over 10,000 people.\n            We take that responsibility seriously — and our code of ethics is the foundation that makes it possible."}</AutoLinkedText>
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">How We Operate</p>
            <h2 className="font-heading text-4xl font-bold text-[#3a6697] md:text-5xl">Core Values</h2>
          </div>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-8 flex flex-col gap-4">
                <span className="flex h-12 w-12 items-center justify-center bg-[#eef2f7] text-[#3a6697]">
                  <i className={`${v.icon} text-2xl`} />
                </span>
                <h3 className="font-heading text-xl font-bold text-[#3a6697]">{v.title}</h3>
                <p className="text-sm leading-7 text-[#64748b]"><AutoLinkedText>{v.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#3a6697] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Experience the Northbound difference.
          </h2>
          <Link href="/admissions/" className="shrink-0 inline-flex items-center gap-2 bg-[#e97a52] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#f09068]">
            Start Admissions <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

    </div>
  );
}
