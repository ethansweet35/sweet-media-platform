import type { Metadata } from "next";
import { resolveTrackedPageMetadata, OptimizationStatusBanner } from "@sweetmedia/admin-core";
import Image from "next/image";
import Link from "next/link";

const fallbackMetadata: Metadata = {
  title: "Virtual IOP for Teens | Adolescent Mental Health Treatment",
  description:
    "Adolescent Mental Health provides Virtual Intensive Outpatient Programs for teens ages 12–17. Evidence-based care for anxiety, depression, trauma, and more. Insurance accepted. Call (949) 946-5876.",
  alternates: { canonical: "/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/", fallbackMetadata);
}

const PHONE = "(949) 946-5876";
const PHONE_HREF = "tel:+19499465876";
const SB = "https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";
const SB_ROOT = "https://almncgkbmooyuptdgkhe.supabase.co/storage/v1/object/public/site-assets/images";

const IMGS = {
  heroTeen:   `${SB_ROOT}/amh_hero_virtual_v1.jpg`,
  virtualIop: `${SB_ROOT}/amh_iop_section_v1.jpg`,
  blue:       `${SB}/blue.png`,
  resilience: `${SB_ROOT}/amh_resilience_bg_v1.jpg`,
  becn:       `${SB}/BECN_BIG-f197bb44.png`,
  umr:        `${SB}/umr.webp`,
  aetna:      `${SB}/Aetna-Logo.png`,
  anthem:     `${SB}/Anthem-Inc-Logo.png`,
  cigna:      `${SB}/Cigna-Logo.png`,
};

export default function HomePage() {
  return (
    <main style={{ fontFamily: "var(--font-montserrat)" }}>
      <OptimizationStatusBanner trackedPagePath="/" brandName="Adolescent Mental Health" />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col overflow-hidden">
        {/* Full-bleed photo */}
        <Image
          src={IMGS.heroTeen}
          alt="Virtual therapy session on laptop in a warm home setting"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />

        {/* Layered overlays — strong bottom-up gradient, light top tint */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Content — centered at the bottom of the hero */}
        <div className="relative z-10 mt-auto w-full px-6 pb-16 pt-24 lg:pb-20">
          <div className="mx-auto max-w-3xl text-center">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#83B3DC]">
              Virtual IOP · Ages 12–17 · Insurance Accepted
            </p>

            <h1
              className="text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
              style={{ fontFamily: "var(--font-heebo)" }}
            >
              Expert Mental Health Care for Your Teen, From Home
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/70">
              Structured virtual therapy from licensed clinicians — 9–20 hours per week of individual, group, and family care that fits your teen&apos;s life without disrupting it.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#000000] shadow-xl transition hover:bg-white/90"
              >
                <i className="ri-phone-fill text-base"></i>
                Free Consultation — {PHONE}
              </a>
              <a
                href="/virtual-iop-for-teens"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/8"
              >
                How It Works
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {[
                { icon: "ri-shield-check-line", label: "Licensed Clinicians" },
                { icon: "ri-heart-pulse-line",  label: "Insurance Accepted" },
                { icon: "ri-lock-line",          label: "HIPAA Compliant" },
                { icon: "ri-time-line",          label: "Start in 24–48 hrs" },
              ].map((b) => (
                <span key={b.label} className="flex items-center gap-2 text-xs font-semibold text-white/55">
                  <i className={`${b.icon} text-[#83B3DC] text-sm`}></i>
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Conditions + Consultation bar ── */}
      <section className="border-b border-[#E8EEF4] bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_280px] md:items-center md:divide-x md:divide-[#E8EEF4]">

            {/* Conditions */}
            <div className="pr-0 md:pr-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">
                Conditions We Treat
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { label: "Depression",       path: "/conditions/depression" },
                  { label: "Anxiety",          path: "/conditions/anxiety" },
                  { label: "OCD",              path: "/conditions/ocd" },
                  { label: "ADD / ADHD",       path: "/conditions/adhd" },
                  { label: "Bipolar",          path: "/conditions/bipolar" },
                  { label: "Insomnia",         path: "/online-insomnia-treatment-for-teens" },
                  { label: "Schizoaffective",  path: "/conditions/schizoaffective" },
                  { label: "Gender Dysphoria", path: "/conditions/gender-dysphoria" },
                ].map((c) => (
                  <Link
                    key={c.path}
                    href={c.path}
                    className="rounded-full border border-[#CBE6EC] bg-[#F4F9FC] px-4 py-1.5 text-center text-xs font-semibold text-[#1F2124] transition hover:border-[#83B3DC] hover:bg-[#83B3DC]/10 hover:text-[#1F2124]"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Consultation */}
            <div className="flex flex-col justify-center border-t border-[#E8EEF4] md:border-t-0 md:pl-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">
                Free Consultation
              </p>
              <p className="mt-1 text-xs text-[#7C848B]">30 minutes · No obligation</p>
              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2.5 rounded-lg bg-[#000000] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#111111]"
                >
                  <i className="ri-phone-fill flex-shrink-0"></i>
                  {PHONE}
                </a>
                <a
                  href="mailto:admissions@adolescentmentalhealth.com"
                  className="flex items-center gap-2.5 rounded-lg border border-[#CBE6EC] px-4 py-3 text-xs font-semibold text-[#54595F] transition hover:border-[#83B3DC] hover:text-[#1F2124]"
                >
                  <i className="ri-mail-line flex-shrink-0 text-[#83B3DC]"></i>
                  <span className="truncate">admissions@adolescentmentalhealth.com</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── What Is A Virtual IOP ── */}
      <section className="relative overflow-hidden px-6 py-[100px] lg:px-10">
        {/* Blurred photo substrate */}
        <Image
          src={IMGS.virtualIop}
          alt=""
          fill
          className="object-cover object-center scale-110"
          style={{ filter: "blur(28px)" }}
          aria-hidden
        />
        {/* Color wash over the blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a52]/80 via-[#2a5a7a]/70 to-[#83B3DC]/50" />

        {/* Bento grid */}
        <div className="relative z-10 mx-auto max-w-[1350px]">
          <div className="grid gap-3 lg:grid-cols-[1fr_320px] lg:grid-rows-[1fr_auto]">

            {/* Cell 1 — main content */}
            <div
              className="flex flex-col justify-between rounded-3xl p-10 lg:p-12"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 20px 60px rgba(0,0,0,0.25)",
              }}
            >
              <div>
                <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.3em] text-white/60">
                  Virtual IOP · Ages 12–17
                </p>
                <h2
                  className="text-4xl font-bold leading-[1.08] text-white lg:text-5xl"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  What Is A Virtual Intensive Outpatient Program?
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-8 text-white/65">
                  A structured alternative to weekly therapy — our Virtual IOP gives teens 9–20 hours of evidence-based care per week from licensed clinicians, all delivered from home without disrupting school or family life.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/virtual-iop-for-teens"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-[#000000] transition hover:bg-white/90"
                >
                  Learn More
                  <i className="ri-arrow-right-line"></i>
                </Link>
                <a href={PHONE_HREF} className="text-sm font-semibold text-white/50 transition hover:text-white">
                  {PHONE} →
                </a>
              </div>
            </div>

            {/* Cell 2 — image, spans both rows */}
            <div
              className="relative min-h-[300px] overflow-hidden rounded-3xl lg:row-span-2"
              style={{
                border: "1px solid rgba(255,255,255,0.22)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              <Image
                src={IMGS.virtualIop}
                alt="Teen's bedroom desk with laptop open for a virtual therapy session"
                fill
                className="object-cover object-center"
                sizes="320px"
              />
              {/* Glass sheen edge */}
              <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)" }} />
            </div>

            {/* Cell 3 — three stat tiles */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "ri-user-heart-line", value: "12–17",     label: "Age Range" },
                { icon: "ri-time-line",        value: "9–20h",     label: "Per Week" },
                { icon: "ri-bank-card-line",   value: "Insurance", label: "Accepted" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col justify-between rounded-3xl px-5 py-6"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.20)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.30), 0 8px 32px rgba(0,0,0,0.15)",
                  }}
                >
                  <i className={`${s.icon} text-xl text-white/50`}></i>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>{s.value}</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/45">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Why Choose Virtual IOP ── */}
      <section className="bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">

          {/* Header */}
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">
                Mental Health Treatment for Teens
              </p>
              <h2
                className="text-4xl font-bold leading-tight text-[#0A0F14] md:text-5xl"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                Why Choose A Virtual<br className="hidden lg:block" /> Intensive Outpatient Program?
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-8 text-[#7C848B] lg:text-right">
              Many families struggle with time and logistics. Our virtual program eliminates those barriers — delivering structured, intensive therapy from home.
            </p>
          </div>

          {/* Feature rows */}
          {[
            {
              num: "01",
              img: `${SB}/teenager-participating-in-a-virtual-therapy-session-at-home-07ee975a-f307-4933-a.jpg`,
              alt: "Teen in virtual therapy session at home",
              title: "Convenience For Busy Families",
              body: "Our online therapy services fit into the schedules of busy families, providing care without the hassle of commuting to a clinic.",
              link: { label: "Explore Virtual IOP", href: "/virtual-iop-for-teens" },
            },
            {
              num: "02",
              img: `${SB}/teen-participating-in-a-virtual-therapy-session-to-manage-sensory-overload-53bcf.jpg`,
              alt: "Teen with therapist in professional support session",
              title: "Licensed Professional Support",
              body: "Our team includes social workers, teen therapists, and mental health professionals trained in Cognitive Behavioral Therapy and Dialectical Behavior Therapy.",
              link: { label: "Meet Our Team", href: "/about" },
            },
            {
              num: "03",
              img: `${SB}/parent-and-teenager-in-a-supportive-conversation-highlighting-the-importance-of-.jpg`,
              alt: "Parent and teenager in insurance consultation",
              title: "Covered By Your Insurance",
              body: "We work with major insurance plans and offer affordable out-of-pocket costs to ensure every teen can access the care they need.",
              link: { label: "Verify Your Insurance", href: "/insurance-coverage" },
            },
          ].map((item, i) => (
            <div
              key={item.num}
              className={`grid grid-cols-1 gap-8 border-t border-[#E8EEF4] py-10 lg:grid-cols-[80px_1fr_320px] lg:items-center ${i === 2 ? "border-b" : ""}`}
            >
              {/* Number */}
              <p
                className="text-5xl font-bold text-[#E8EEF4] lg:text-6xl"
                style={{ fontFamily: "var(--font-heebo)" }}
              >
                {item.num}
              </p>

              {/* Text */}
              <div>
                <h3
                  className="text-2xl font-bold text-[#0A0F14]"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  {item.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-8 text-[#54595F]">{item.body}</p>
                <Link
                  href={item.link.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#83B3DC] transition hover:text-[#5A8FC0]"
                >
                  {item.link.label}
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>

              {/* Photo */}
              <div className="relative h-52 overflow-hidden rounded-2xl lg:h-44">
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  className="object-cover object-center transition duration-500 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ── Traditional vs Outpatient ── */}
      <section className="bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">

          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Our Difference</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Traditional vs. Virtual IOP
            </h2>
          </div>

          {/* Column headers */}
          <div className="mb-2 grid grid-cols-[1fr_1fr_1fr] gap-4 px-4">
            <div />
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-white/30">Traditional Therapy</p>
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Virtual IOP</p>
          </div>

          {/* Comparison rows */}
          <div className="overflow-hidden rounded-2xl border border-white/8">
            {[
              {
                label:       "Weekly Therapy",
                traditional: "~1 hour",
                iop:         "9–20 hours",
              },
              {
                label:       "Setting",
                traditional: "Sterile clinic office",
                iop:         "Comfort of home",
              },
              {
                label:       "Parent Involvement",
                traditional: "Often excluded",
                iop:         "Dedicated coaching track",
              },
              {
                label:       "Wait Time",
                traditional: "Weeks to months",
                iop:         "Admissions in 24–48 hrs",
              },
              {
                label:       "Insurance",
                traditional: "Varies widely",
                iop:         "Most major plans accepted",
              },
              {
                label:       "Crisis Support",
                traditional: "Limited between sessions",
                iop:         "Multi-day structured support",
              },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_1fr_1fr] gap-4 px-6 py-5 ${i % 2 === 0 ? "bg-white/[0.03]" : ""} border-b border-white/5 last:border-b-0`}
              >
                {/* Label */}
                <p className="flex items-center text-xs font-bold uppercase tracking-wider text-white/40">{row.label}</p>

                {/* Traditional — muted */}
                <div className="flex items-center justify-center gap-2">
                  <i className="ri-close-line flex-shrink-0 text-sm text-red-400/70"></i>
                  <span className="text-sm text-white/35 line-through">{row.traditional}</span>
                </div>

                {/* IOP — highlighted */}
                <div
                  className="flex items-center justify-center gap-2 rounded-xl px-3 py-2"
                  style={{
                    background: "rgba(131,179,220,0.12)",
                    border: "1px solid rgba(131,179,220,0.2)",
                  }}
                >
                  <i className="ri-check-line flex-shrink-0 text-sm text-[#83B3DC]"></i>
                  <span className="text-sm font-semibold text-white">{row.iop}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#000000] transition hover:bg-white/90"
            >
              <i className="ri-phone-fill"></i>
              Get Started — Free Consultation
            </a>
          </div>

        </div>
      </section>

      {/* ── Conditions Treated ── */}
      <section className="bg-[#F0F4F8] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">

          {/* Header */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Conditions Treated</p>
            <h2 className="text-4xl font-bold text-[#0A0F14] md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Mental Health Conditions We Treat
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#54595F]">
              Evidence-based virtual care for teens navigating a wide range of emotional and behavioral challenges.
            </p>
          </div>

          {/* 3-col grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "ri-mental-health-line",  title: "Anxiety Disorders",       tagline: "GAD, Social Anxiety & Panic Attacks",      path: "/conditions/anxiety" },
              { icon: "ri-heart-pulse-line",     title: "Depression",              tagline: "Major Depressive Disorder & Dysthymia",     path: "/conditions/depression" },
              { icon: "ri-shield-flash-line",    title: "Trauma & PTSD",           tagline: "PTSD, Acute Stress & Complex Trauma",      path: "/conditions/trauma-ptsd" },
              { icon: "ri-hand-heart-line",      title: "Self-Harming Behaviors",  tagline: "Safe, non-judgmental NSSI intervention",   path: "/conditions/self-harm" },
              { icon: "ri-brain-line",           title: "ADD & ADHD",              tagline: "Focus, executive function & regulation",   path: "/conditions/adhd" },
              { icon: "ri-book-open-line",       title: "School Avoidance",        tagline: "Academic reintegration for anxious teens", path: "/conditions/school-avoidance" },
            ].map((c, i) => (
              <Link
                key={c.path}
                href={c.path}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#E8EEF4] transition hover:shadow-lg hover:ring-[#83B3DC]/50"
              >
                {/* Gradient header wash */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#EEF5FB] to-transparent transition group-hover:from-[#83B3DC]/10" />

                {/* Watermark number */}
                <span
                  className="pointer-events-none absolute -right-2 -top-3 select-none text-[88px] font-bold leading-none text-[#E8EEF4] transition group-hover:text-[#83B3DC]/10"
                  style={{ fontFamily: "var(--font-heebo)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#E8EEF4] text-[#83B3DC] transition group-hover:bg-[#83B3DC] group-hover:text-white group-hover:ring-[#83B3DC]">
                  <i className={`${c.icon} text-xl`}></i>
                </span>

                {/* Text */}
                <div className="relative z-10 mt-5 flex-1">
                  <p className="text-base font-bold text-[#0A0F14] transition group-hover:text-[#83B3DC]" style={{ fontFamily: "var(--font-heebo)" }}>
                    {c.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-[#7C848B]">{c.tagline}</p>
                </div>

                {/* Footer link */}
                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-[#F0F4F8] pt-4">
                  <span className="text-xs font-semibold text-[#83B3DC]/50 transition group-hover:text-[#83B3DC]">
                    Learn more
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F0F4F8] text-[#83B3DC]/50 transition group-hover:bg-[#83B3DC] group-hover:text-white">
                    <i className="ri-arrow-right-line text-xs"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/conditions"
              className="inline-flex items-center gap-2 rounded-full border border-[#CBE6EC] bg-white px-7 py-3.5 text-sm font-semibold text-[#0A0F14] transition hover:border-[#83B3DC] hover:text-[#83B3DC]"
            >
              See All Conditions
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

        </div>
      </section>

      {/* ── A Structured Path ── */}
      <section className="bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">

          {/* Header */}
          <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Our Process</p>
              <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
                A Structured Path<br className="hidden lg:block" /> for Adolescents
              </h2>
            </div>
            <a
              href={PHONE_HREF}
              className="self-start inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#000000] transition hover:bg-white/90 lg:self-auto"
            >
              <i className="ri-phone-fill"></i>
              {PHONE}
            </a>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting rail — desktop only */}
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/10 lg:block" />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6">
              {[
                {
                  num: "01",
                  icon: "ri-clipboard-line",
                  title: "Initial Assessment",
                  body: "A full clinical evaluation to understand your teen's history, challenges, and treatment goals.",
                },
                {
                  num: "02",
                  icon: "ri-file-list-3-line",
                  title: "Personalized Plan",
                  body: "A custom treatment roadmap built around your teen's unique emotional and behavioral profile.",
                },
                {
                  num: "03",
                  icon: "ri-brain-line",
                  title: "Active Therapy",
                  body: "DBT, experiential therapy, and family sessions — 9–20 hours of structured care each week.",
                },
                {
                  num: "04",
                  icon: "ri-heart-pulse-line",
                  title: "Lasting Recovery",
                  body: "Motivational coaching and ongoing family integration to sustain progress beyond the program.",
                },
              ].map((step) => (
                <div key={step.num} className="relative flex flex-col lg:items-start">
                  {/* Step node — sits on the rail */}
                  <div className="mb-6 flex items-center gap-4 lg:flex-col lg:items-start lg:gap-0">
                    <div
                      className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#83B3DC] lg:mb-8"
                      style={{ boxShadow: "0 0 0 4px rgba(131,179,220,0.15)" }}
                    >
                      <i className={`${step.icon} text-sm text-white`}></i>
                    </div>

                    {/* Mobile: number + title inline */}
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 lg:hidden">
                      Step {step.num}
                    </p>
                  </div>

                  {/* Step number — desktop decorative */}
                  <p
                    className="mb-2 hidden text-xs font-bold uppercase tracking-[0.2em] text-white/25 lg:block"
                  >
                    Step {step.num}
                  </p>

                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-white/50">{step.body}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <Image
          src={IMGS.resilience}
          alt="Calm sunrise over a misty lake"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black/80" />

        <div className="relative z-10 px-6 py-[100px] lg:px-10">
          <div className="mx-auto max-w-[1350px]">

            {/* Header */}
            <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">What Parents Say</p>
                <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
                  Families Who Found<br className="hidden lg:block" /> Their Way Through
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className="ri-star-fill text-[#83B3DC] text-lg"></i>
                ))}
                <span className="ml-2 text-sm font-semibold text-white/60">4.9 average rating</span>
              </div>
            </div>

            {/* Testimonial grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote: "We were skeptical about online therapy for our daughter, but the team at AMH made every session feel personal and safe. Within 6 weeks we saw a real shift in how she handled her anxiety.",
                  name: "Sarah M.",
                  detail: "Parent of a 15-year-old",
                  icon: "ri-user-heart-line",
                },
                {
                  quote: "The flexibility of virtual IOP was a game-changer for us. My son could attend sessions after school without missing anything. His therapist really understood teen culture and didn't talk down to him.",
                  name: "David & Renee K.",
                  detail: "Parents of a 17-year-old",
                  icon: "ri-group-line",
                },
                {
                  quote: "After two years of struggling with depression, our daughter finally feels heard. The group sessions gave her connection she didn't know she needed. I wish we'd found AMH sooner.",
                  name: "Maria T.",
                  detail: "Parent of a 14-year-old",
                  icon: "ri-user-heart-line",
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col gap-5 rounded-3xl p-7"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                  }}
                >
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className="ri-star-fill text-[#83B3DC] text-xs"></i>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="flex-1 text-sm leading-8 text-white/75">&ldquo;{t.quote}&rdquo;</p>

                  {/* Attribution */}
                  <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#83B3DC]/15 text-[#83B3DC]">
                      <i className={`${t.icon} text-sm`}></i>
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{t.name}</p>
                      <p className="text-xs text-white/40">{t.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Who Benefits ── */}
      <section className="bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:items-start">

            {/* Left — criteria */}
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Online Treatment</p>
              <h2 className="text-4xl font-bold text-white md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
                Is Virtual IOP Right<br className="hidden lg:block" /> for Your Teen?
              </h2>
              <p className="mt-4 text-sm text-white/45">Our program is ideal for teens who meet any of the following:</p>

              <ul className="mt-8 divide-y divide-white/8">
                {[
                  { icon: "ri-add-line",            label: "Require more than once-weekly therapy",                    sub: "Escalating mental health needs beyond standard outpatient" },
                  { icon: "ri-arrow-down-line",      label: "Stepping down from PHP or residential care",              sub: "A bridge to support continued progress at home" },
                  { icon: "ri-links-line",           label: "Co-occurring disorders or dual diagnoses",                sub: "Integrated care for anxiety, trauma, and substance use" },
                  { icon: "ri-home-2-line",          label: "Struggling with daily functioning",                       sub: "Difficulty at school, home, or in relationships" },
                  { icon: "ri-computer-line",        label: "Need intensive care without disrupting school",           sub: "Flexible scheduling designed around teen life" },
                ].map((item) => (
                  <li key={item.label} className="group flex items-start gap-5 py-5">
                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#83B3DC]/10 text-[#83B3DC]">
                      <i className={`${item.icon} text-base`}></i>
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{item.label}</p>
                      <p className="mt-0.5 text-xs text-white/40">{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — insurance glass card */}
            <div className="lg:sticky lg:top-24">
              <div
                className="rounded-3xl p-7"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
                }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Insurance & Payment</p>
                <p className="mt-3 text-base font-bold leading-snug text-white" style={{ fontFamily: "var(--font-heebo)" }}>
                  Most Major Insurance Plans Accepted
                </p>
                <p className="mt-3 text-xs leading-6 text-white/45">
                  Our admissions team verifies your coverage, explains your benefits, and guides you through enrollment — step by step.
                </p>

                {/* Insurer logos — row of 3 + row of 2 centered */}
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {[
                    { name: "Cigna",   src: IMGS.cigna },
                    { name: "Anthem",  src: IMGS.anthem },
                    { name: "Aetna",   src: IMGS.aetna },
                    { name: "BCEN",    src: IMGS.becn },
                    { name: "UMR",     src: IMGS.umr },
                  ].map((ins) => (
                    <div
                      key={ins.name}
                      className="flex w-[30%] items-center justify-center rounded-xl bg-white px-3 py-2.5"
                    >
                      <Image src={ins.src} alt={ins.name} width={80} height={32} className="h-6 w-auto object-contain" />
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-[11px] text-white/30">+ Medicaid, self-pay, and more options available</p>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center justify-center gap-2.5 rounded-xl bg-white py-3.5 text-sm font-bold text-[#000000] transition hover:bg-white/90"
                  >
                    <i className="ri-phone-fill"></i>
                    Verify My Insurance
                  </a>
                  <a
                    href="mailto:admissions@adolescentmentalhealth.com"
                    className="flex items-center justify-center gap-2.5 rounded-xl border border-white/15 py-3.5 text-sm font-semibold text-white/70 transition hover:border-white/30 hover:text-white"
                  >
                    <i className="ri-mail-line text-[#83B3DC]"></i>
                    Email Admissions
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white px-6 py-[100px] lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-16 lg:grid-cols-[320px_1fr] lg:items-start">

            {/* Left — sticky heading */}
            <div className="lg:sticky lg:top-24">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">FAQ</p>
              <h2 className="text-4xl font-bold leading-tight text-[#0A0F14] md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
                Questions Parents Ask
              </h2>
              <p className="mt-5 text-sm leading-8 text-[#54595F]">
                Still have questions? Our admissions team is available to walk you through every step.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2.5 rounded-xl bg-[#0A0F14] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#111111]"
                >
                  <i className="ri-phone-fill flex-shrink-0 text-[#83B3DC]"></i>
                  {PHONE}
                </a>
                <a
                  href="mailto:admissions@adolescentmentalhealth.com"
                  className="flex items-center gap-2.5 rounded-xl border border-[#E8EEF4] px-5 py-3.5 text-sm font-semibold text-[#54595F] transition hover:border-[#83B3DC] hover:text-[#0A0F14]"
                >
                  <i className="ri-mail-line flex-shrink-0 text-[#83B3DC]"></i>
                  Email Admissions
                </a>
              </div>
            </div>

            {/* Right — accordions */}
            <div className="divide-y divide-[#F0F4F8]">
              {[
                {
                  q: "My teen is skeptical about therapy, especially online. How do you engage them?",
                  a: "Our therapists use role-playing, group activities, and creative exercises to keep teens engaged. Virtual IOPs are designed to feel personal and relatable — not clinical — and teens often adapt quickly.",
                },
                {
                  q: "What kind of support is available between scheduled sessions?",
                  a: "We offer online support groups, educational materials, self-care strategies, and access to a crisis line — so your teen is never without support between appointments.",
                },
                {
                  q: "How do you handle cyberbullying and social media pressures?",
                  a: "Our programs address digital-age challenges head-on: cyberbullying, social media anxiety, online safety, and screen dependency. Teens build healthy coping skills specific to their digital environment.",
                },
                {
                  q: "My teen has a busy school schedule. How flexible are you?",
                  a: "We work around school and extracurricular schedules. Our admissions team will help find session times that don't conflict with classes, and rescheduling support is always available.",
                },
                {
                  q: "How is confidentiality maintained in virtual sessions?",
                  a: "All sessions use HIPAA-compliant, encrypted video conferencing. Personal information is never shared without explicit consent, and our strict privacy policy governs all digital interactions.",
                },
                {
                  q: "How do you match my teen with the right therapist?",
                  a: "We match based on your teen's specific needs — LGBTQ+ identity, gaming anxiety, academic pressure, family conflict, and more. We prioritize therapeutic fit and adjust when needed.",
                },
              ].map((faq, i) => (
                <details key={i} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <span
                        className="mt-0.5 flex-shrink-0 text-xs font-bold text-[#83B3DC]/40"
                        style={{ fontFamily: "var(--font-heebo)", minWidth: "1.5rem" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base font-bold text-[#0A0F14] group-open:text-[#83B3DC] transition-colors" style={{ fontFamily: "var(--font-heebo)" }}>
                        {faq.q}
                      </span>
                    </div>
                    <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#F0F4F8] text-[#83B3DC] transition group-open:bg-[#83B3DC] group-open:text-white">
                      <i className="ri-add-line text-sm group-open:hidden"></i>
                      <i className="ri-subtract-line text-sm hidden group-open:block"></i>
                    </span>
                  </summary>
                  <p className="mt-4 pl-10 text-sm leading-8 text-[#54595F]">{faq.a}</p>
                </details>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden bg-[#0A0F14] px-6 py-[100px] lg:px-10">
        {/* Decorative ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#83B3DC]/8 blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#83B3DC]/5 blur-[80px]" />

        <div className="relative mx-auto max-w-[1350px]">

          {/* Top row — label + trust pills */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#83B3DC]">Get Started Today</p>
            <div className="flex flex-wrap gap-2">
              {["HIPAA Compliant", "Ages 12–17", "Insurance Accepted", "Same-Week Intake"].map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[11px] font-semibold text-white/50">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Main content row */}
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">

            {/* Left — headline */}
            <div>
              <h2 className="text-5xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl" style={{ fontFamily: "var(--font-heebo)" }}>
                Your Teen Deserves<br />
                <span className="text-[#83B3DC]">More Than Weekly</span><br />
                Therapy.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-white/50">
                Adolescent Mental Health delivers structured, insurance-accepted virtual IOP — built around your teen's schedule, not the other way around.
              </p>
            </div>

            {/* Right — glass action card */}
            <div
              className="rounded-3xl p-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "rgba(255,255,255,0.07) 0px 1px 0px inset",
              }}
            >
              <p className="text-sm font-semibold text-white/70">Ready to take the first step?</p>
              <p className="mt-1 text-xs text-white/30">All calls are 100% free and confidential</p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={PHONE_HREF}
                  className="flex items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-4 text-sm font-bold text-[#0A0F14] transition hover:bg-white/90"
                >
                  <i className="ri-phone-fill text-[#83B3DC]"></i>
                  Call Now — {PHONE}
                </a>
                <Link
                  href="/admissions"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
                >
                  Start Online Intake
                  <i className="ri-arrow-right-line text-[#83B3DC]"></i>
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/8 pt-6">
                {[
                  { icon: "ri-shield-check-line", label: "HIPAA Compliant" },
                  { icon: "ri-time-line", label: "Same-Week Intake" },
                  { icon: "ri-heart-pulse-line", label: "Evidence-Based" },
                  { icon: "ri-group-line", label: "Family Involved" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <i className={`${item.icon} text-sm text-[#83B3DC]`}></i>
                    <span className="text-xs text-white/40">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
