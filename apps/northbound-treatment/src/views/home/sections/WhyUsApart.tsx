import Image from "next/image";
import Link from "next/link";
import { WHY_US_IMAGE } from "../assets";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const DIFFERENTIATORS = [
  {
    number: "01",
    heading: "Personalized Treatment",
    body: "Every client works side-by-side with our clinical team to build a care plan that fits their life — not a one-size program. Evidence-based therapies, flexible levels of care, and a 1:1 staff-to-client ratio mean your treatment is yours alone.",
    icon: "ri-heart-line",
  },
  {
    number: "02",
    heading: "Clinical Leadership",
    body: "Our leadership team brings more than 200 years of combined behavioral healthcare expertise — including our double board-certified Medical Director in Psychiatry and Addiction Medicine. Top credentials. Genuine compassion.",
    icon: "ri-award-line",
  },
  {
    number: "03",
    heading: "Trauma-Informed Care",
    body: "We treat the root, not just the symptom. Trauma underlies nearly every addiction, which is why our clinical model integrates EMDR, somatic approaches, and evidence-based therapy to create lasting healing — not just short-term sobriety.",
    icon: "ri-shield-check-line",
  },
];

const TRUST_STATS = [
  { value: "38+", label: "Years in Operation" },
  { value: "10k+", label: "Lives Transformed" },
  { value: ">97%", label: "Client Outcomes" },
];

export default function WhyUsApart() {
  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* subtle decorative ring */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full border border-navy/5" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-terracotta/5" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
        {/* — grid: content left, image right — */}
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">

          {/* LEFT: content */}
          <div className="flex flex-col gap-10">
            {/* header */}
            <div>
              <p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                Why Northbound
              </p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                What Sets Our{" "}
                <span className="italic text-terracotta">Rehab</span> Apart
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-espresso/70">
                <AutoLinkedText>{"For over 38 years, Northbound has built its reputation on a single\n                conviction: every person deserves treatment designed around their\n                story. Here's what that looks like in practice."}</AutoLinkedText>
              </p>
            </div>

            {/* numbered differentiators */}
            <div className="flex flex-col divide-y divide-navy/10">
              {DIFFERENTIATORS.map((item) => (
                <div
                  key={item.number}
                  className="group flex gap-6 py-7 first:pt-0 last:pb-0"
                >
                  {/* number badge */}
                  <div className="flex shrink-0 flex-col items-center gap-2 pt-1">
                    <span className="font-heading text-2xl font-bold leading-none text-terracotta">
                      {item.number}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta/10 text-terracotta transition group-hover:bg-terracotta group-hover:text-white">
                      <i className={`${item.icon} text-base`} />
                    </span>
                  </div>

                  {/* text */}
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy">
                      {item.heading}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-espresso/70"><AutoLinkedText>{item.body}</AutoLinkedText></p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-light"
              >
                Our Story
                <i className="ri-arrow-right-line" />
              </Link>
              <Link
                href="tel:9497767093"
                className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 px-7 py-3.5 text-sm font-semibold text-terracotta transition hover:border-terracotta hover:bg-terracotta/5"
              >
                <i className="ri-phone-line" />
                949-776-7093
              </Link>
            </div>
          </div>

          {/* RIGHT: image + overlays */}
          <div className="relative">
            {/* "Est. 1988" pill — top-right */}
            <div className="absolute -top-5 right-6 z-10 rounded-full bg-terracotta px-5 py-2 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-white">
                Est. 1988
              </p>
            </div>

            {/* main photo */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={WHY_US_IMAGE}
                alt="Compassionate therapist working one-on-one with a client at Northbound Treatment's Southern California facility"
                width={680}
                height={780}
                className="h-[520px] w-full object-cover object-center lg:h-[640px]"
              />
              {/* gradient vignette for card legibility */}
              <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-navy/80 to-transparent" />

              {/* stat card — pinned inside image at bottom-left */}
              <div className="absolute bottom-5 left-5 z-10 max-w-[280px]">
                <div className="mb-3 flex gap-6">
                  {TRUST_STATS.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-heading text-2xl font-bold text-white"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-terracotta"><AutoLinkedText>{s.label}</AutoLinkedText></p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 border-t border-white/20 pt-3">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className="ri-star-fill text-terracotta text-xs" />
                    ))}
                  </div>
                  <p className="text-[11px] font-semibold text-white/80">
                    <AutoLinkedText>{"4.6 · 224+ Google Reviews"}</AutoLinkedText>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
