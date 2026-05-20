import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const features = [
  { icon: "ri-user-heart-line", title: "LGBTQ+-Affirming Clinicians", body: "Our therapists and clinical staff are trained in LGBTQ+-affirming care and understand the unique stressors — including minority stress, discrimination, and family rejection — that compound addiction risk in the community." },
  { icon: "ri-shield-check-line", title: "Safe, Judgment-Free Environment", body: "Every Northbound campus is a space where LGBTQ+ clients can be fully themselves. We do not tolerate discrimination of any kind, and our community norms are explicitly inclusive." },
  { icon: "ri-brain-line", title: "Dual Diagnosis Integration", body: "LGBTQ+ individuals have significantly higher rates of co-occurring mental health conditions including anxiety, depression, and PTSD. Our dual diagnosis program addresses both addiction and underlying mental health simultaneously." },
  { icon: "ri-group-line", title: "Peer Community", body: "Group therapy and community support are integral to recovery. We foster peer connections among LGBTQ+ clients and create group settings where shared experience deepens the healing process." },
  { icon: "ri-family-line", title: "Family & Chosen Family", body: "We recognize that 'family' means different things for different LGBTQ+ people. Our family services program is open to biological family, chosen family, and partners — whoever is part of your support network." },
  { icon: "ri-lock-line", title: "Confidential & Private", body: "Your identity and your story are yours. We maintain the strictest confidentiality standards and will never disclose any information about your treatment without your explicit consent." },
];

const stats = [
  { value: "9%", label: "Opioid use rate in LGBTQ+ community vs. 3.8% in general population (NIDA)" },
  { value: "86%", label: "Of LGBTQ+ individuals with addiction had no desire to seek treatment (SAMHSA, 2019)" },
  { value: "2–3×", label: "Higher rates of substance use disorders among LGBTQ+ adults" },
];

export default function LgbtqPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#3a6697] py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]"><AutoLinkedText>{"Specialized Programs"}</AutoLinkedText></p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            LGBTQIA+ <span className="italic text-[#e97a52]">Drug Rehab</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedText>{"Historically, members of the LGBTQ+ community have faced discrimination when seeking\n            help for medical and mental health concerns. Northbound Treatment provides a fully affirming,\n            judgment-free environment where every person can heal as their authentic self."}</AutoLinkedText>
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/admissions/" className="inline-flex items-center gap-2 bg-[#e97a52] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f09068]">
              Start Admissions <i className="ri-arrow-right-line" />
            </Link>
            <a href="tel:8663110003" className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
              <i className="ri-phone-fill" /> (866) 311-0003
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#eef2f7] border-b border-[#cdd8e8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#cdd8e8]">
            {stats.map((s) => (
              <div key={s.value} className="py-10 px-8">
                <p className="font-heading text-4xl font-bold text-[#e97a52]"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                <p className="mt-2 text-sm text-[#64748b] leading-6"><AutoLinkedText>{s.label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why specialized care matters */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Why It Matters</p>
              <h2 className="font-heading text-4xl font-bold text-[#3a6697] mb-6 md:text-5xl">
                Affirming Care Changes Outcomes
              </h2>
              <p className="text-sm leading-7 text-[#64748b] mb-4">
                <AutoLinkedText>{"According to SAMHSA, approximately 86% of LGBTQ+ individuals struggling with addiction\n                had no desire to seek treatment — largely due to fear of discrimination or lack of\n                culturally competent care. That staggering number illustrates why affirming environments\n                aren&apos;t just nice to have: they&apos;re clinically essential."}</AutoLinkedText>
              </p>
              <p className="text-sm leading-7 text-[#64748b]">
                <AutoLinkedText>{"At Northbound, we have worked to actively dismantle those barriers. Our staff receive\n                ongoing training in LGBTQ+-affirming practices, and our community norms ensure every\n                client — regardless of identity — feels safe, respected, and ready to do the work of recovery."}</AutoLinkedText>
              </p>
            </div>
            <div className="bg-[#eef2f7] p-8">
              <h3 className="font-heading text-xl font-bold text-[#3a6697] mb-6">Our Commitment to You</h3>
              <ul className="space-y-4">
                {[
                  "No discrimination based on sexual orientation or gender identity",
                  "Use of preferred names and pronouns",
                  "Staff trained in LGBTQ+ affirming care practices",
                  "Peer community that honors all identities",
                  "Inclusive family therapy that recognizes chosen family",
                  "Confidential care — your identity is always protected",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <i className="ri-check-line text-[#e97a52] mt-0.5 shrink-0" />
                    <span className="text-sm leading-6 text-[#64748b]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#eef2f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Program Features</p>
            <h2 className="font-heading text-4xl font-bold text-[#3a6697] md:text-5xl">What Makes Our Program Different</h2>
          </div>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="bg-white p-8 flex flex-col gap-4">
                <span className="flex h-12 w-12 items-center justify-center bg-[#eef2f7] text-[#3a6697]">
                  <i className={`${f.icon} text-2xl`} />
                </span>
                <h3 className="font-heading text-xl font-bold text-[#3a6697]">{f.title}</h3>
                <p className="text-sm leading-7 text-[#64748b]"><AutoLinkedText>{f.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#3a6697] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 text-center">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            You deserve care that sees all of you.
          </h2>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            <AutoLinkedText>{"Our admissions team is available 24/7 — reach out confidentially, any time."}</AutoLinkedText>
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
