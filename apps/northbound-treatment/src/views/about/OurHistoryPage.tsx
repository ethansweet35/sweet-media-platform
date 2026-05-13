import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const milestones = [
  {
    year: "1988",
    title: "The Beginning of Northbound",
    body: "Northbound Treatment was originally founded under the name National Therapeutic Services (NTS®) by Marilyn and Bob Stevens. That same year, they opened an Intensive Outpatient Program called the RAP Center in Costa Mesa, California.",
  },
  {
    year: "1995",
    title: "Expanding Our Reach",
    body: "Northbound grew its residential capacity and began accepting clients from across the United States, building a reputation for individualized, evidence-based care that went beyond the standard 28-day model.",
  },
  {
    year: "2002",
    title: "Leadership & Innovation",
    body: "Paul Alexander joined the organization and was awarded the Outstanding Alumni Service Award by Saddleback College. His leadership ushered in a new era of integrated, whole-person treatment philosophy.",
  },
  {
    year: "2010",
    title: "Signature Programs Launched",
    body: "Northbound launched several nationally recognized specialty tracks including Adventure Therapy, Wolf Assisted Therapy, and the Veterans Mental Health Program — programs designed to reach clients that traditional models couldn't.",
  },
  {
    year: "2016",
    title: "JCAHO Accreditation",
    body: "Northbound earned accreditation from the Joint Commission on Accreditation of Healthcare Organizations (JCAHO) — the highest standard in behavioral healthcare — recognizing our commitment to safety, quality, and outcomes.",
  },
  {
    year: "2020",
    title: "Telehealth & COVID Response",
    body: "Northbound rapidly deployed a fully licensed telehealth IOP platform so clients could continue treatment safely during the pandemic, cementing our commitment to access regardless of circumstance.",
  },
  {
    year: "Today",
    title: "38+ Years of Transforming Lives",
    body: "Northbound Treatment Services® continues to serve clients across Southern California and the Pacific Northwest. Over 38 years, we have helped thousands of individuals and families achieve lasting recovery and live fulfilling, healthy lives.",
  },
];

export default function OurHistoryPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#3a6697] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">About Northbound</p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            Our <span className="italic text-[#e97a52]">History</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedText>{"Over 38 years, Northbound Treatment has helped thousands achieve recovery and go on to live\n            fulfilling, healthy, successful lives. Here is our story."}</AutoLinkedText>
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="relative border-l-2 border-[#cdd8e8] pl-10 space-y-16">
            {milestones.map((m) => (
              <div key={m.year} className="relative">
                <div className="absolute -left-[2.85rem] flex h-10 w-10 items-center justify-center bg-[#e97a52] text-white text-xs font-bold">
                  {m.year.length <= 4 ? m.year.slice(-2) : "★"}
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52] mb-1"><AutoLinkedText>{m.year}</AutoLinkedText></p>
                <h3 className="font-heading text-2xl font-bold text-[#3a6697] mb-3">{m.title}</h3>
                <p className="text-sm leading-7 text-[#64748b] max-w-2xl"><AutoLinkedText>{m.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#eef2f7] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-[#3a6697] md:text-4xl">
              Ready to write your own recovery story?
            </h2>
            <p className="mt-3 text-[#64748b]"><AutoLinkedText>{"Our admissions team is available 24/7."}</AutoLinkedText></p>
          </div>
          <Link
            href="/admissions/"
            className="shrink-0 inline-flex items-center gap-2 bg-[#e97a52] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#f09068]"
          >
            Begin Admissions <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

    </div>
  );
}
