import Image from "next/image";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const SUPABASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const subPages = [
  { icon: "ri-history-line", label: "Our History", href: "/about/our-history/", desc: "38+ years of transforming lives in Orange County and beyond." },
  { icon: "ri-team-line", label: "Our Team", href: "/team/", desc: "Meet the executive, medical, and clinical leadership behind Northbound." },
  { icon: "ri-award-2-line", label: "Accreditation", href: "/about/accreditation-recognition/", desc: "JCAHO accredited — the highest standard in behavioral healthcare." },
  { icon: "ri-shield-check-line", label: "Code of Ethics", href: "/about/code-of-ethics/", desc: "The core values and operating principles that guide everything we do." },
  { icon: "ri-star-line", label: "Reviews & Testimonials", href: "/impact-reach/reviews-testimonials/", desc: "Hear from the clients and families whose lives Northbound has changed." },
  { icon: "ri-book-open-line", label: "Resources", href: "/resources/", desc: "Educational resources on addiction, treatment, and recovery." },
];

const philosophyPoints = [
  { icon: "ri-brain-line", title: "Disease Model", body: "Addiction is not a moral failing or lack of willpower. It is a primary, progressive, chronic, and potentially fatal disease centered in the brain — and it is treatable." },
  { icon: "ri-heart-pulse-line", title: "Whole-Person Care", body: "Treatment encompasses biological, social, spiritual, and psychological interventions. We treat the whole person, not just the substance." },
  { icon: "ri-flask-line", title: "Evidence-Based Practice", body: "Our programs are rooted in evidence-based therapies, our innovative In Vivo® model of care, and the principles of the 12 Steps." },
  { icon: "ri-user-line", title: "Individualized Treatment", body: "Clients work closely with an interdisciplinary treatment team to customize their care at every phase — because no two people experience addiction the same way." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#3a6697] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Who We Are</p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            About <span className="italic text-[#e97a52]">Northbound</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            <AutoLinkedText>{"Northbound Treatment Center is a leading drug and alcohol addiction treatment center\n            dedicated to transforming the lives of people struggling with addiction and co-occurring\n            mental health disorders — since 1988."}</AutoLinkedText>
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

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Our Story</p>
              <h2 className="font-heading text-4xl font-bold text-[#3a6697] mb-6 md:text-5xl">
                From a Local IOP to a National Leader
              </h2>
              <p className="text-sm leading-7 text-[#64748b] mb-4">
                <AutoLinkedText>{"Northbound was initially founded in 1988 under the name National Therapeutic Services\n                (NTS), opening an Intensive Outpatient Program in Costa Mesa, California. In 2008,\n                Paul Alexander acquired the organization and grew it from a local Orange County facility\n                into a nationally recognized treatment provider."}</AutoLinkedText>
              </p>
              <p className="text-sm leading-7 text-[#64748b] mb-4">
                <AutoLinkedText>{"Along with senior management, Alexander began rebranding NTS around a culture of\n                organizational health — built on top-down transparency, authenticity, and honesty.\n                The same values instilled in clients during treatment became the values the company\n                lived by internally."}</AutoLinkedText>
              </p>
              <p className="text-sm leading-7 text-[#64748b]">
                <AutoLinkedText>{"As leadership discussed this new direction, there was a reference to the Northbound\n                train and the positive connotations of &ldquo;heading north.&rdquo; The organization&apos;s\n                new name — Northbound — emerged."}</AutoLinkedText>
              </p>
            </div>
            <div className="relative">
              <div className="relative h-[480px] w-full overflow-hidden">
                <Image
                  src={`${SUPABASE}/nbt_about_leadership-team.jpg`}
                  alt="Northbound Treatment leadership and staff"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -left-6 bg-[#e97a52] px-8 py-6 shadow-xl">
                <p className="font-heading text-4xl font-bold text-white">38+</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/80">Years in Practice</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#3a6697]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Our Mission</p>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl leading-snug">
            To help as many people as possible achieve a successful and fulfilled life beyond addiction.
          </h2>
          <p className="mt-6 text-white/70 leading-7 max-w-3xl mx-auto">
            <AutoLinkedText>{"We believe that change is possible. We know firsthand that while in the depths of addiction,\n            embarking on recovery can feel overwhelming. We also know that not all treatment programs are\n            created equal — and that the right environment and support are critical to achieving lifelong recovery."}</AutoLinkedText>
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10">
            {[
              { value: "38+", label: "Years in Practice" },
              { value: "10K+", label: "Lives Transformed" },
              { value: "15+", label: "Insurance Plans" },
              { value: "4.6★", label: "Google Rating" },
            ].map((s) => (
              <div key={s.label} className="bg-[#3a6697] py-8 px-4">
                <p className="font-heading text-3xl font-bold text-[#e97a52]"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-white/60"><AutoLinkedText>{s.label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 bg-[#eef2f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="relative order-last lg:order-first">
              <div className="relative h-[420px] w-full overflow-hidden">
                <Image
                  src={`${SUPABASE}/nbt_about_compass.jpg`}
                  alt="Northbound compass — guiding recovery"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Our Philosophy</p>
              <h2 className="font-heading text-4xl font-bold text-[#3a6697] mb-10 md:text-5xl">
                How We Think About Recovery
              </h2>
              <div className="space-y-8">
                {philosophyPoints.map((p) => (
                  <div key={p.title} className="flex items-start gap-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#3a6697] text-white">
                      <i className={`${p.icon} text-xl`} />
                    </span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-[#3a6697] mb-1">{p.title}</h3>
                      <p className="text-sm leading-7 text-[#64748b]"><AutoLinkedText>{p.body}</AutoLinkedText></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Learn More</p>
            <h2 className="font-heading text-4xl font-bold text-[#3a6697] md:text-5xl">Explore Northbound</h2>
          </div>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-3">
            {subPages.map((p) => (
              <Link key={p.label} href={p.href} className="group bg-white p-8 flex flex-col gap-3 hover:bg-[#eef2f7] transition-colors">
                <span className="flex h-12 w-12 items-center justify-center bg-[#eef2f7] text-[#3a6697] group-hover:bg-white transition-colors">
                  <i className={`${p.icon} text-2xl`} />
                </span>
                <h3 className="font-heading text-xl font-bold text-[#3a6697]">{p.label}</h3>
                <p className="text-sm leading-6 text-[#64748b] flex-1"><AutoLinkedText>{p.desc}</AutoLinkedText></p>
                <span className="text-xs font-semibold text-[#e97a52] flex items-center gap-1 mt-1">
                  Learn more <i className="ri-arrow-right-line" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#3a6697] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Ready to start your recovery?
            </h2>
            <p className="mt-3 text-white/70"><AutoLinkedText>{"Our admissions team is available 24/7 — confidential and free."}</AutoLinkedText></p>
          </div>
          <Link href="/admissions/" className="shrink-0 inline-flex items-center gap-2 bg-[#e97a52] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#f09068]">
            Begin Admissions <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

    </div>
  );
}
