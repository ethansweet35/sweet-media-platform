import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const testimonials = [
  {
    quote: "Northbound is Trusted by Industry Leaders. Northbound Treatment offers a rehab center that lays a strong foundation for anyone struggling with addiction to start a new life. I feel confident sending anyone to Northbound.",
    author: "Dr. Stephanie Brown",
    role: "Addiction Medicine Specialist",
    stars: 5,
  },
  {
    quote: "Extremely supportive environment and excellent atmosphere. Most clients return to work at this facility because of the transformation they experience here. You set your goals and accomplish them while Northbound provides the structure to help you thrive.",
    author: "Former Client",
    role: "Newport Beach, CA",
    stars: 5,
  },
  {
    quote: "I came to Northbound broken. I left with a sense of purpose I hadn't felt in years. The staff genuinely cared about my recovery — not just while I was there, but long after I left. The alumni program kept me connected.",
    author: "Alumni Client",
    role: "Garden Grove Campus",
    stars: 5,
  },
  {
    quote: "As a family member of someone who went through Northbound's program, I can say the family services team changed our lives. They taught us how to support our loved one without enabling — and rebuilt our family.",
    author: "Family Member",
    role: "Orange County, CA",
    stars: 5,
  },
  {
    quote: "The adventure therapy and wolf-assisted program was unlike anything I'd experienced in treatment before. It broke through walls that years of traditional therapy couldn't. Northbound takes an innovative, whole-person approach.",
    author: "Program Graduate",
    role: "Residential Program",
    stars: 5,
  },
  {
    quote: "I was court-ordered into treatment and skeptical. Northbound's alternative sentencing team worked alongside my attorney and handled everything professionally. I completed the program and haven't looked back.",
    author: "Alternative Sentencing Client",
    role: "California",
    stars: 5,
  },
];

const stats = [
  { value: "4.6/5", label: "Google Rating", sub: "200+ verified reviews" },
  { value: "38+", label: "Years in Practice", sub: "Founded 1988" },
  { value: "10,000+", label: "Lives Transformed", sub: "In the last year alone" },
  { value: "15+", label: "Insurance Plans", sub: "In-network accepted" },
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="nb-hero-overlay bg-[#3a6697] py-28 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">What Clients Say</p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            Reviews &amp; <span className="italic text-[#e97a52]">Testimonials</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedText>{"We know that a lot of research goes into choosing the right treatment program. Let the people\n            who have experienced Northbound tell you firsthand — from Detox through Residential to\n            living a substance-free life."}</AutoLinkedText>
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#cdd8e8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#cdd8e8]">
            {stats.map((s) => (
              <div key={s.label} className="py-12 px-8 text-center">
                <p className="font-heading text-4xl font-bold text-[#e97a52]"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                <p className="mt-1 text-sm font-semibold text-[#3a6697]"><AutoLinkedText>{s.label}</AutoLinkedText></p>
                <p className="text-xs text-[#64748b]"><AutoLinkedText>{s.sub}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Stories of Recovery</p>
            <h2 className="font-heading text-4xl font-bold text-[#3a6697] md:text-5xl">Client Testimonials</h2>
          </div>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <i key={j} className="ri-star-fill text-[#e97a52] text-sm" />
                  ))}
                </div>
                <p className="text-sm leading-7 text-[#64748b] flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-[#3a6697]"><AutoLinkedText>{t.author}</AutoLinkedText></p>
                  <p className="text-xs text-[#64748b]"><AutoLinkedText>{t.role}</AutoLinkedText></p>
                </div>
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
              Ready to start your recovery story?
            </h2>
            <p className="mt-3 text-[#64748b]"><AutoLinkedText>{"Speak with an admissions specialist today — it&apos;s free and confidential."}</AutoLinkedText></p>
          </div>
          <Link href="/admissions/" className="shrink-0 inline-flex items-center gap-2 bg-[#e97a52] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#f09068]">
            Begin Admissions <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

    </div>
  );
}
