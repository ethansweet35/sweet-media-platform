import Link from "next/link";
import Image from "next/image";
import { CONTAINER } from "@/data/site";

/**
 * Section 2 — About intro
 * Design: cream background, editorial asymmetric split.
 * Left: large real therapy group photo with a floating stat card.
 * Right: eyebrow + oversized heading + body + two value-prop rows + CTA.
 */
const THERAPY_GROUP_IMG =
  "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images/mbh_about_therapy_group.png";

export default function HomeAbout() {
  return (
    <section className="bg-cream py-[100px]">
      <div className={CONTAINER}>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">

          {/* Photo column */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-mbh-forest/10">
              <Image
                src={THERAPY_GROUP_IMG}
                alt="Missouri Behavioral Health therapy group session"
                width={1000}
                height={1250}
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading="lazy"
                className="w-full object-cover"
                style={{ aspectRatio: "4/5", objectPosition: "center top" }}
              />
              {/* Dark gradient at bottom */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(18,46,24,0.35) 0%, transparent 50%)" }}
                aria-hidden
              />
            </div>

            {/* Floating stat card — bottom right */}
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-mbh-forest px-7 py-6 shadow-2xl lg:-right-8">
              <p className="font-display text-4xl font-semibold leading-none text-white">24/7</p>
              <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Confidential Support
              </p>
            </div>

            {/* Thin decorative rule left edge */}
            <div className="absolute -left-4 top-16 hidden h-2/3 w-px bg-mbh-green/30 lg:block" aria-hidden />
          </div>

          {/* Copy column */}
          <div>
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                About Us
              </span>
            </div>

            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest">
              Transforming lives through{" "}
              <span className="italic font-medium text-mbh-green">expert guidance.</span>
            </h2>

            <p className="mt-6 font-body text-base leading-relaxed text-mbh-body">
              Missouri Behavioral Health is dedicated to providing high-quality mental health
              and addiction treatment across Missouri — offering a full range of drug, alcohol,
              and mental health services designed to support individuals at every stage of their
              recovery journey.
            </p>

            {/* Value props */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: "ri-heart-pulse-line",
                  title: "Personalized Therapy",
                  body: "Tailored treatment plans built around your unique needs, history, and goals.",
                },
                {
                  icon: "ri-award-line",
                  title: "Trusted Professionals",
                  body: "Licensed clinicians, counselors, and medical staff dedicated to your care.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-cream-alt bg-white p-5 shadow-sm"
                >
                  <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-mbh-green/10">
                    <i className={`${item.icon} text-lg text-mbh-green`} aria-hidden />
                  </span>
                  <p className="font-display text-sm font-semibold text-mbh-ink">{item.title}</p>
                  <p className="mt-1 font-body text-sm leading-relaxed text-mbh-body">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/about#team"
                className="inline-flex items-center gap-2 rounded-full bg-mbh-forest px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-forest-deep"
              >
                Meet our team
                <i className="ri-arrow-right-line" aria-hidden />
              </Link>
              <Link
                href="/verify-insurance"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-green underline-offset-4 hover:underline"
              >
                Verify your insurance
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
