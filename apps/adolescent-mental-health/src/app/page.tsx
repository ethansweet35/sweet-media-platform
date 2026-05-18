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
  becn:       `${SB}/BECN_BIG-f197bb44.png`,
  umr:        `${SB}/umr.webp`,
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
      <section className="border-b border-[#E8EEF4] bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_280px] md:items-center md:divide-x md:divide-[#E8EEF4]">

            {/* Conditions */}
            <div className="py-8 pr-0 md:pr-10">
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
            <div className="flex flex-col justify-center border-t border-[#E8EEF4] py-8 md:border-t-0 md:pl-10">
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
      <section className="relative overflow-hidden py-12 px-6 lg:px-10 lg:py-14">
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
        <div className="relative z-10 mx-auto max-w-6xl">
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
      <section className="bg-white px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">

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
      <section className="bg-white px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Our Difference</p>
            <h2 className="text-4xl font-bold text-[#1F2124] md:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Traditional Vs Outpatient Therapy
            </h2>
            <p className="mt-4 text-sm leading-8 text-[#7C848B]">
              While traditional weekly therapy is effective for maintenance, it is often insufficient for those facing acute crisis or complex challenges. We bridge the gap between occasional office visits and hospitalization by offering a higher level of frequency, family involvement, and immediate support.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {/* Traditional — dark gray card */}
            <div className="rounded-2xl bg-[#6B7280] p-8">
              <h3 className="mb-5 text-xl font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>
                Traditional Therapy
              </h3>
              <ul className="space-y-3.5">
                {[
                  "1 hour per week (often insufficient for crisis)",
                  "Clinical, sterile office environments",
                  "Parents often excluded from the process",
                  "Long waitlists for appointments",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/90">
                    <i className="ri-close-line flex-shrink-0 text-base text-red-300"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Outpatient — brand blue card */}
            <div className="rounded-2xl bg-[#83B3DC] p-8">
              <h3 className="mb-5 text-xl font-bold text-white" style={{ fontFamily: "var(--font-heebo)" }}>
                Outpatient Therapy
              </h3>
              <ul className="space-y-3.5">
                {[
                  "9-20 hours of therapy per week",
                  "Comfort of home, removing stigma",
                  "Comprehensive Parent Coaching track",
                  "Admissions within 24-48 hours",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/30">
                      <i className="ri-check-line text-xs text-white"></i>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Conditions Treated (dark navy) ── */}
      <section className="bg-[#000000] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">
              Conditions Treated
            </p>
            <h2 className="text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Adolescent Mental Health: Conditions We Treat
            </h2>
            <p className="mt-4 text-base leading-8 text-white/60">
              Our specialized virtual therapy programs provide evidence-based care for teens struggling with emotional and behavioral challenges.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Anxiety Disorders",
                body: "Treatment for Generalized Anxiety Disorder (GAD), Social Anxiety, and Panic Attacks. We help teens build coping mechanisms for overwhelming stress and worry.",
                path: "/conditions/anxiety",
              },
              {
                title: "Depression",
                body: "Compassionate care for Major Depressive Disorder and Dysthymia. Support for teens facing persistent sadness, hopelessness, or mood dysregulation.",
                path: "/conditions/depression",
              },
              {
                title: "Trauma & PTSD",
                body: "Trauma-informed therapy for PTSD, Acute Stress, and Complex Trauma. Helping adolescents process past events and restore emotional safety.",
                path: "/conditions/trauma-ptsd",
              },
              {
                title: "Self-Harming Behaviors",
                body: "Intervention for non-suicidal self-injury (NSSI). Safe, non-judgmental support to address the root causes of self-harm and develop healthier emotional outlets.",
                path: "/conditions/self-harm",
              },
              {
                title: "ADD & ADHD",
                body: "Executive function coaching and therapy for ADD & ADHD, improving focus, organization, and emotional regulation for academic and social success.",
                path: "/conditions/adhd",
              },
              {
                title: "School Avoidance",
                body: "Support for school refusal and avoidance. We provide academic reintegration strategies to help anxious teens return to the classroom with confidence.",
                path: "/conditions/school-avoidance",
              },
            ].map((c) => (
              <Link
                key={c.path}
                href={c.path}
                className="group rounded-3xl border border-white/10 bg-white/5 p-7 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-lg font-bold text-white group-hover:text-[#83B3DC] transition-colors" style={{ fontFamily: "var(--font-heebo)" }}>
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/60">{c.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── A Structured Path ── */}
      <section className="bg-white px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Our Process</p>
              <h2 className="text-3xl font-bold text-[#1F2124] md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                A Structured Path for Adolescents
              </h2>
              <p className="mt-5 text-base leading-8 text-[#7C848B]">
                Every teen begins with a comprehensive intake appointment, where we conduct a full clinical assessment and set clear treatment goals. We then develop a personalized treatment plan tailored to each teen&apos;s emotional and behavioral profile.
              </p>
              <a
                href={PHONE_HREF}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#000000] px-6 py-3.5 text-sm font-bold text-white hover:bg-[#111111] transition-colors"
              >
                <i className="ri-phone-fill"></i>
                Call Now | {PHONE}
              </a>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { label: "Evidence-Based Therapy, such as Dialectical Behavior Therapy", icon: "ri-brain-line" },
                { label: "Engaging experiential therapy through movement, art, or music", icon: "ri-palette-line" },
                { label: "Family sessions and parental support to involve the entire family", icon: "ri-home-heart-line" },
                { label: "Motivational interviewing to build commitment to a lasting recovery", icon: "ri-heart-pulse-line" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-4 rounded-2xl border border-[#CBE6EC] bg-[#F4F9FC] px-5 py-4"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#83B3DC]/15 text-[#83B3DC]">
                    <i className={`${s.icon} text-lg`}></i>
                  </span>
                  <span className="text-sm font-semibold text-[#1F2124]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Building Resilience (full-width bg image) ── */}
      <section className="relative overflow-hidden">
        <Image
          src={IMGS.heroTeen}
          alt="Teen mental health care"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#000000]/80" />
        <div className="relative px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Building Resilience: Specialized Mental Health Care for Teens
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/75">
              Navigating adolescence is difficult, but your family doesn&apos;t have to do it alone. We offer specialized virtual mental health programs designed to help teenagers manage anxiety, depression, and behavioral challenges. Our secure online environment provides the professional support teens need to build resilience and achieve lasting well-being.
            </p>
            <a
              href={PHONE_HREF}
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#000000] hover:bg-white/90 transition-colors shadow-lg"
            >
              <i className="ri-phone-fill text-base"></i>
              Call Now | {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ── Who Benefits ── */}
      <section className="bg-white px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">Online Treatment</p>
              <h2 className="text-3xl font-bold text-[#1F2124] md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
                Who Benefits from a Virtual IOP?
              </h2>
              <p className="mt-4 text-base leading-8 text-[#7C848B]">
                Our Intensive Outpatient Programs are ideal for teens who:
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "Require more than a session per week to address escalating mental health disorders",
                  "Are transitioning out of a partial hospitalization program or residential treatment program",
                  "Need integrated care for co-occurring anxiety disorders, substance use disorders, or emotional distress",
                  "Struggle with functional life tasks due to anxiety, depression, or trauma",
                  "Need enhanced therapy intensity without leaving home or school",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[#7C848B]">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#83B3DC] text-white">
                      <i className="ri-check-line text-xs"></i>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={PHONE_HREF}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#000000] hover:bg-white/90 transition-colors"
              >
                <i className="ri-phone-fill"></i>
                Call Now {PHONE}
              </a>
            </div>

            {/* Insurance card */}
            <div className="rounded-3xl border border-[#CBE6EC] bg-[#F4F9FC] p-8">
              <h3 className="text-xl font-bold text-[#1F2124]" style={{ fontFamily: "var(--font-heebo)" }}>
                Insurance and Payment Options for Virtual IOP for Teens
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#7C848B]">
                Adolescent Mental Health partners with major insurance providers to make our Virtual IOP for Teens accessible and affordable. Our admissions team will verify your insurance coverage, explain your benefits, and guide you through the enrollment process step by step.
              </p>
              <p className="mt-3 text-sm leading-7 text-[#7C848B]">
                Whether your family uses private insurance, Medicaid, or is exploring self-pay options, we will work with you to reduce the financial stress of treatment.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {[
                  { name: "BCBS", src: IMGS.blue },
                  { name: "BCEN", src: IMGS.becn },
                  { name: "UMR", src: IMGS.umr },
                ].map((ins) => (
                  <div key={ins.name} className="rounded-xl border border-[#CBE6EC] bg-white p-3">
                    <Image src={ins.src} alt={ins.name} width={80} height={36} className="h-8 w-auto object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#F4F9FC] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#83B3DC]">FAQ</p>
            <h2 className="text-3xl font-bold text-[#1F2124] md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-[#7C848B]">For more information, please contact us today.</p>
          </div>

          <div className="mt-10 divide-y divide-[#CBE6EC] overflow-hidden rounded-3xl border border-[#CBE6EC]">
            {[
              {
                q: "My teen is skeptical about therapy, especially online. How do you make the virtual experience engaging and relatable for them?",
                a: "We offer a variety of programs including virtual intensive outpatient programs. These are designed to be engaging and interactive, with a focus on building strong relationships between teens and their therapists. Our online therapists use role-playing, group activities, and creative exercises to keep teens engaged.",
              },
              {
                q: "Beyond scheduled sessions, what kind of support does Adolescent Mental Health offer between appointments?",
                a: "We offer online forums and support groups, educational materials on mental health topics, self-care tips and strategies, and access to a crisis hotline — so your teen is never without support.",
              },
              {
                q: "How does your online therapy address cyberbullying and social media pressures?",
                a: "Our virtual programs address the unique challenges teens face in the digital age, providing education and support on cyberbullying, social media use, and online safety. We help teens develop healthy coping mechanisms for digital stress.",
              },
              {
                q: "My teen has a busy schedule with school. How flexible are appointment times?",
                a: "We offer flexible appointment times for our virtual programs and have a dedicated team who can help with rescheduling appointments if needed. We work around school and extracurricular schedules.",
              },
              {
                q: "How does Adolescent Mental Health ensure the confidentiality of online sessions?",
                a: "All of our virtual programs use secure, HIPAA-compliant video conferencing platforms. We have a strict policy in place regarding the sharing of personal information.",
              },
              {
                q: "How do you match teens with therapists who have relevant expertise?",
                a: "We have a team of experienced therapists who specialize in working with teens with a variety of mental health concerns — including LGBTQ+ identity, gaming-related anxiety, academic pressure, and family conflict. We match carefully for the best fit.",
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white px-7 py-5 open:bg-[#F4F9FC]">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-bold text-[#1F2124]" style={{ fontFamily: "var(--font-heebo)" }}>
                  {faq.q}
                  <i className="ri-add-line flex-shrink-0 text-[#83B3DC] text-lg group-open:hidden mt-0.5"></i>
                  <i className="ri-subtract-line flex-shrink-0 text-[#83B3DC] text-lg hidden group-open:block mt-0.5"></i>
                </summary>
                <p className="mt-4 text-sm leading-7 text-[#7C848B]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[#000000] px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl" style={{ fontFamily: "var(--font-heebo)" }}>
            Empower Your Teen for Tomorrow
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/70">
            Compassionate support, expert guidance, and tailored programs for adolescent mental health. Connect with Adolescent Mental Health today. Let us guide your teenager towards resilience and well-being.
          </p>
          <p className="mt-2 text-sm text-white/40">All calls are 100% free and confidential</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#000000] hover:bg-white/90 transition-colors shadow-lg"
            >
              <i className="ri-phone-fill text-base"></i>
              Call Now | {PHONE}
            </a>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-sm font-semibold text-white hover:border-white hover:bg-white/10 transition-colors"
            >
              Get Started Online
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
