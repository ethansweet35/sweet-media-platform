import Image from "next/image";
import Link from "next/link";

const SUPABASE_IMG =
  "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const SCHEDULE_CTA =
  "https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=13219022";

const heroCategories = [
  { label: "Weight Loss", href: "/weight-loss/" },
  { label: "Skin & Hair", href: "/skin-hair/" },
  { label: "Peptides", href: "/peptides/" },
  { label: "& More", href: "/pricing/" },
];

const heroStats = [
  { value: "-12.4 lbs", label: "Average Weight Loss (12 Weeks)", progress: 73, bar: "#C67B5C" },
  { value: "92%", label: "Clearer Skin in 6-8 Weeks", progress: 92, bar: "#6B7456" },
  { value: "78%", label: "Improved Symptoms", progress: 78, bar: "#3A3A3A" },
  { value: "86%", label: "Hair Growth In 3 Months", progress: 86, bar: "#C67B5C" },
];

const heroCategoryIcons: Record<string, string> = {
  "Weight Loss": "ri-pulse-line",
  "Skin & Hair": "ri-magic-line",
  "Peptides": "ri-flask-line",
  "& More": "ri-add-line",
};

type Service = {
  title: string;
  description: string;
  icon: string;
  stats: { value: string; label: string }[];
  features: string[];
  available: string[];
  price: string;
  href: string;
  accent: string;
  accentText: string;
};

const services: Service[] = [
  {
    title: "Weight Loss",
    description:
      "FDA-approved GLP-1 medications combined with personalized nutrition and lifestyle coaching for sustainable results.",
    icon: "ri-scales-3-line",
    stats: [
      { value: "20.9%", label: "Avg. weight loss" },
      { value: "5", label: "Medication options" },
    ],
    features: [
      "Monthly physician monitoring",
      "Personalized dosing strategy",
      "Ongoing support & adjustments",
      "Evidence-based protocols",
    ],
    available: ["Semaglutide", "Tirzepatide", "Retatrutide"],
    price: "$270",
    href: "/weight-loss/",
    accent: "#C67B5C",
    accentText: "text-[#B86B4E]",
  },
  {
    title: "Skin & Hair",
    description:
      "Medical-grade treatments for clear skin and hair restoration. Evidence-based therapies for acne, aging, and hair loss.",
    icon: "ri-sparkling-2-line",
    stats: [
      { value: "90%", label: "See improvement" },
      { value: "8+", label: "Treatment options" },
    ],
    features: [
      "Custom skincare formulations",
      "Hair regrowth protocols",
      "Board-certified dermatology",
      "Ongoing prescription refills",
    ],
    available: ["Tretinoin", "Finasteride", "Minoxidil", "Spironolactone"],
    price: "$285",
    href: "/skin-hair/",
    accent: "#2B81AA",
    accentText: "text-[#226689]",
  },
  {
    title: "Peptides",
    description:
      "Cutting-edge peptide therapies designed to optimize recovery, enhance performance, and support longevity.",
    icon: "ri-flashlight-line",
    stats: [
      { value: "15+", label: "Peptide options" },
      { value: "Fast", label: "Recovery times" },
    ],
    features: [
      "Athletic performance support",
      "Injury recovery protocols",
      "Anti-aging therapies",
      "Licensed pharmacy sourcing",
    ],
    available: ["BPC-157", "TB-500", "CJC-1295", "Ipamorelin"],
    price: "$280",
    href: "/peptides/",
    accent: "#6B7456",
    accentText: "text-[#4A5436]",
  },
];

const profileLeft = [
  { label: "Name", value: "Tommy" },
  { label: "Age", value: "38" },
  { label: "Weight", value: "203 lbs" },
  { label: "Goal", value: "175 lbs" },
  { label: "History", value: "Pre-Diabetic" },
];

const profileRight = [
  { label: "Protein", value: "150g / day" },
  { label: "Movement", value: "3x / Week" },
  { label: "Sleep", value: "7-9 hrs / night" },
  { label: "Water", value: "64oz / day" },
];

const processSteps = [
  {
    title: "Answer Questions",
    duration: "2 minutes",
    description:
      "Quick intake, no guessing. Take our secure medical questionnaire covers your history, symptoms, and goals.",
    icon: "ri-questionnaire-line",
  },
  {
    title: "Book Your Time",
    duration: "24 hours",
    description:
      "Video visit on your schedule. Licensed physician reviews your case and schedules a personalized consultation.",
    icon: "ri-calendar-check-line",
  },
  {
    title: "Get Your Plan",
    duration: "2-3 Days",
    description:
      "Prescriptions shipped discreetly. Custom treatment plan with meds delivered to your door in discreet packaging.",
    icon: "ri-truck-line",
  },
  {
    title: "Track Progress",
    duration: "Ongoing",
    description:
      "Ongoing support with zero hassle. 24/7 messaging with your care team and unlimited prescription adjustments.",
    icon: "ri-line-chart-line",
  },
];

const testimonials = [
  {
    quote: "Down 35 lbs in 4 months. I finally feel like myself again.",
    author: "Sarah, 32",
    detail: "Weight Loss",
  },
  {
    quote: "My productivity has tripled. I wish I'd started this years ago.",
    author: "Michael, 28",
    detail: "ADHD Management",
  },
  {
    quote: "More energy, better sleep, clearer thinking. This is life-changing.",
    author: "Jessica, 41",
    detail: "Longevity Peptides",
  },
];

const trustBadges = ["Board Certified Providers", "HIPAA Compliant", "National Coverage"];

const pricingTiers = [
  {
    label: "Generic Consultation",
    description: "Routine medications, skincare basics, peptide entry.",
    firstVisit: "$400",
    followUp: "$150",
  },
  {
    label: "Specialized Consultation",
    description: "GLP-1 therapy, hair restoration, mental health.",
    firstVisit: "$300",
    followUp: "$150",
  },
  {
    label: "Peptide Consultation",
    description: "Advanced peptide stacks and longevity protocols.",
    firstVisit: "$200",
    followUp: "$100",
  },
];

const coverageLegend = [
  { color: "#C67B5C", label: "All Services", desc: "Full access" },
  { color: "#E5B49E", label: "Partial Services", desc: "Some restrictions apply" },
  { color: "#3A3A3A", label: "Coming Soon", desc: "Not yet available" },
];

const COVERAGE_MAP_URL =
  "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/usa-coverage-map.png";

const containerCx = "mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12";

const primaryCta =
  "inline-flex items-center gap-2 rounded-md bg-[#C67B5C] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-all hover:bg-[#A66647] hover:shadow-md";

const secondaryCta =
  "inline-flex items-center gap-2 rounded-md bg-[#3A3A3A] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-all hover:bg-black hover:shadow-md";

export default function HomePage() {
  return (
    <div className="bg-[#FAF7F4] text-[#3A3A3A]">
      {/* ─── Hero — 2 column: copy on left, stats grid on right ──────────── */}
      <section className="relative overflow-hidden bg-[#FAF7F4] pt-12 pb-10 md:pt-16 md:pb-12 lg:pt-20 lg:pb-14">
        {/* Decorative background — soft blobs + dotted texture */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#C67B5C]/10 blur-3xl" />
          <div className="absolute top-40 -right-32 h-[26rem] w-[26rem] rounded-full bg-[#6B7456]/8 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#C67B5C]/5 blur-2xl" />
          {/* Dotted grid texture */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="heroDots" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#3A3A3A" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroDots)" />
          </svg>
        </div>

        <div className={`relative ${containerCx} grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16`}>
          {/* Left — headline + CTAs */}
          <div className="relative">
            {/* Decorative sparkle accent */}
            <div className="pointer-events-none absolute -top-4 -left-6 hidden lg:block">
              <i className="ri-sparkling-2-fill text-2xl text-[#C67B5C]/30" />
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-[#C67B5C]/25 bg-[#C67B5C]/12 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#C67B5C]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C67B5C] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C67B5C]" />
              </span>
              Telehealth Reimagined
            </span>
            <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.05] text-[#3A3A3A] md:text-[3.2rem] md:leading-[1.04] lg:text-[3.6rem] lg:leading-[1.04]">
              <span className="block">Simple,</span>
              <span className="relative inline-block text-[#C67B5C]">
                On-Demand
                {/* Hand-drawn style underline accent */}
                <svg
                  aria-hidden
                  viewBox="0 0 280 12"
                  className="pointer-events-none absolute -bottom-1.5 left-0 h-3 w-full"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 Q70 2 140 6 T278 4"
                    stroke="#C67B5C"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.35"
                  />
                </svg>
              </span>
              <span className="block whitespace-nowrap">Telehealth Services</span>
            </h1>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-7 font-normal text-[#555555]">
              Access the new standard of care — from GLP-1 weight loss and longevity peptides to
              dermatology and mental wellness. Skip the waiting room with our concierge membership and
              get 24/7 access to doctors who actually return your messages.
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {heroCategories.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E8E2D9] bg-white px-4 py-2 text-[0.78rem] font-medium text-[#3A3A3A] shadow-sm transition-colors hover:border-[#C67B5C] hover:text-[#C67B5C]"
                  >
                    <i className={`${heroCategoryIcons[cat.label] || "ri-leaf-line"} text-base text-[#C67B5C]`} />
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={SCHEDULE_CTA}
                target="_blank"
                rel="noopener noreferrer"
                className={primaryCta}
              >
                Get Started
              </a>
              <Link href="/pricing/" className={secondaryCta}>
                Explore Services
              </Link>
            </div>

            {/* Trust strip — single unified card */}
            <div className="mt-9 inline-flex flex-wrap items-stretch divide-x divide-[#EDE7DD] rounded-2xl border border-[#E8E2D9] bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-3 px-5 py-3">
                <div className="flex -space-x-2">
                  {[
                    { bg: "#C67B5C", char: "M" },
                    { bg: "#6B7456", char: "J" },
                    { bg: "#3A3A3A", char: "A" },
                    { bg: "#A66647", char: "L" },
                  ].map((a) => (
                    <span
                      key={a.char}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[0.7rem] font-semibold text-white"
                      style={{ backgroundColor: a.bg }}
                    >
                      {a.char}
                    </span>
                  ))}
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <i key={i} className="ri-star-fill text-[0.7rem] text-[#C67B5C]" />
                    ))}
                    <span className="ml-1 text-[0.78rem] font-semibold text-[#3A3A3A]">4.9</span>
                  </div>
                  <p className="text-[0.68rem] text-[#888]">10,000+ patients treated</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6B7456]/12">
                  <i className="ri-shield-check-fill text-base text-[#6B7456]" />
                </span>
                <div className="leading-tight">
                  <p className="text-[0.78rem] font-semibold text-[#3A3A3A]">HIPAA Compliant</p>
                  <p className="text-[0.68rem] text-[#888]">Secure &amp; confidential</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — stats panel (white card with shadow) */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-md">
              {/* Card header strip */}
              <div className="relative overflow-hidden border-b border-[#F2EDE5] bg-gradient-to-r from-[#FAF7F4] via-[#FAF7F4] to-white px-8 py-5 md:px-10">
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#C67B5C]/5 to-transparent" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C67B5C]/12">
                        <i className="ri-line-chart-line text-sm text-[#C67B5C]" />
                      </span>
                      <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[#C67B5C]">
                        Outcomes Report
                      </p>
                    </div>
                    <h2 className="mt-3 font-serif text-2xl text-[#3A3A3A] md:text-[1.95rem] md:leading-tight">
                      Real results.{" "}
                      <span className="italic text-[#C67B5C]">Real science.</span>
                    </h2>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#6B7456]/20 bg-[#6B7456]/8 px-2.5 py-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6B7456] opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#6B7456]" />
                    </span>
                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-[#6B7456]">
                      Live
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats body */}
              <div className="px-8 py-7 md:px-10 md:py-8">
                <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#888]">
                  Average patient outcomes
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="relative">
                      <div className="flex items-baseline gap-2">
                        <p className="font-serif text-[1.85rem] leading-none text-[#3A3A3A]">
                          {stat.value}
                        </p>
                        <span
                          className="text-[0.7rem] font-semibold"
                          style={{ color: stat.bar }}
                        >
                          <i className="ri-arrow-up-line align-middle" />
                        </span>
                      </div>
                      <p className="mt-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-[#6B7456]">
                        {stat.label}
                      </p>
                      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#F2EDE5]">
                        <span
                          className="block h-full rounded-full"
                          style={{ width: `${stat.progress}%`, backgroundColor: stat.bar }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card footer attribution */}
              <div className="flex items-center justify-between gap-3 border-t border-[#F2EDE5] bg-[#FAF7F4]/60 px-8 py-3 md:px-10">
                <p className="text-[0.66rem] text-[#888]">
                  Aggregated from clinical follow-ups · Updated quarterly
                </p>
                <div className="flex items-center gap-1.5 text-[0.66rem] font-semibold text-[#6B7456]">
                  <i className="ri-shield-check-fill text-sm" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services Cards (colored backgrounds) ───────────────────────── */}
      <section className="pt-10 pb-20 md:pt-12 md:pb-24">
        <div className={containerCx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Our Services
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#3A3A3A] md:text-[2.4rem]">
              Designed for modern life
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555555]">
              Expert care for your body and mind, all from home.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="group flex flex-col overflow-hidden rounded-3xl shadow-sm ring-1 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ backgroundColor: `${s.accent}14`, borderColor: `${s.accent}38` }}
              >
                <div className="flex flex-1 flex-col px-7 pb-8 pt-7">
                  {/* Icon */}
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${s.accent}22`, color: s.accent }}
                  >
                    <i className={`${s.icon} text-xl`} aria-hidden />
                  </span>

                  {/* Title + description */}
                  <h3 className="mt-5 font-serif text-[1.65rem] leading-tight tracking-[-0.015em] text-[#2A2A2A]">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-[1.75] text-[#555]">{s.description}</p>

                  {/* Stats — plain two-column text, no box */}
                  <div className="mt-6 flex gap-8">
                    {s.stats.map((st) => (
                      <div key={st.label}>
                        <p className={`font-serif text-[1.55rem] leading-none font-medium ${s.accentText}`}>
                          {st.value}
                        </p>
                        <p className="mt-1.5 text-[0.68rem] text-[#777]">{st.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Feature checklist */}
                  <ul className="mt-6 space-y-2.5">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <i
                          className="ri-check-line mt-[1px] shrink-0 text-[0.95rem]"
                          style={{ color: s.accent }}
                          aria-hidden
                        />
                        <span className="text-sm text-[#3A3A3A]">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Available line */}
                  <p className="mt-6 text-xs text-[#888]">
                    <span className="font-semibold text-[#555]">Available: </span>
                    {s.available.join(", ")}
                  </p>

                  {/* Price + CTA */}
                  <div className="mt-auto pt-7">
                    <p className="flex items-baseline gap-2">
                      <span className={`font-serif text-[1.9rem] font-semibold leading-none ${s.accentText}`}>
                        {s.price}
                      </span>
                      <span className="text-sm text-[#888]">+ consultation</span>
                    </p>
                    <Link
                      href={s.href}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white/60 px-5 py-3.5 text-sm font-medium text-[#3A3A3A] ring-1 ring-black/10 transition hover:bg-white/90"
                    >
                      Learn More
                      <i className="ri-arrow-right-line transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Personalized Care — 3 col: copy / photo / GLP-1 ──────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className={containerCx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Personalized Care
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#3A3A3A] md:text-[2.4rem]">
              It's more than a plan, it's personal.
            </h2>
            <p className="mt-5 mx-auto max-w-2xl text-sm leading-7 text-[#555555]">
              A provider licensed in your state will review your information, so that they can
              combine guidance on nutrition, activity, sleep, and more into a plan designed around
              your body's needs.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-center">
            {/* Left column — patient profile */}
            <div className="rounded-2xl border border-[#E8E2D9] bg-white p-7 shadow-sm">
              <dl className="grid gap-5">
                {profileLeft.map((p) => (
                  <div key={p.label} className="flex items-center justify-between border-b border-[#E8E2D9] pb-3 last:border-0 last:pb-0">
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#6B7456]">
                      {p.label}
                    </dt>
                    <dd className="font-serif text-lg text-[#C67B5C]">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Center — photo */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#E8E2D9]">
                <Image
                  src={`${SUPABASE_IMG}/Untitled-design-2026-02-09T212820-575.png`}
                  alt="Patient receiving personalized telehealth care"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right column — protocol + lifestyle */}
            <div className="rounded-2xl border border-[#E8E2D9] bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#E8E2D9] pb-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C67B5C]/15 text-[#C67B5C]">
                  <i className="ri-capsule-line text-base" />
                </span>
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#C67B5C]">
                    Compounded GLP-1
                  </p>
                  <p className="font-serif text-base text-[#3A3A3A]">
                    Semaglutide 0.5mg weekly
                  </p>
                </div>
              </div>
              <dl className="mt-5 grid gap-5">
                {profileRight.map((p) => (
                  <div key={p.label} className="flex items-center justify-between border-b border-[#E8E2D9] pb-3 last:border-0 last:pb-0">
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#6B7456]">
                      {p.label}
                    </dt>
                    <dd className="font-serif text-lg text-[#C67B5C]">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href={SCHEDULE_CTA} target="_blank" rel="noopener noreferrer" className={primaryCta}>
              Get Started
              <i className="ri-arrow-right-line text-base" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Simple Process ────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] py-20 md:py-24">
        <div className={containerCx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Simple Process
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#3A3A3A] md:text-[2.4rem]">
              From click to care in days, not weeks.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#555555]">
              No waiting rooms. No insurance hassles. 94% of patients start treatment within 48 hours.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-[#E8E2D9] bg-white p-7 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C67B5C]/15 text-[#C67B5C]">
                  <i className={`${step.icon} text-xl`} />
                </span>
                <h3 className="mt-6 font-serif text-xl text-[#3A3A3A]">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#555555]">{step.description}</p>
                <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#C67B5C]">
                  {step.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className={containerCx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Testimonials
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#3A3A3A] md:text-[2.6rem]">
              Real People. Real Results.
            </h2>
            <p className="mt-4 text-sm text-[#555555]">
              Join thousands who've transformed their health.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.author}
                className="flex flex-col rounded-2xl border border-[#E8E2D9] bg-[#FAF7F4] p-6"
              >
                <div className="flex gap-0.5 text-[#C67B5C]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className="ri-star-fill text-sm" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-6 text-[#3A3A3A]">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 border-t border-[#E8E2D9] pt-3">
                  <p className="font-serif text-base text-[#3A3A3A]">{t.author}</p>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#6B7456]">
                    {t.detail}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustBadges.map((label, i) => (
              <div key={label} className="flex items-center gap-6 md:gap-10">
                <p className="font-serif text-base text-[#3A3A3A] md:text-lg">{label}</p>
                {i < trustBadges.length - 1 && (
                  <span className="hidden h-5 w-px bg-[#C67B5C]/40 md:inline-block" aria-hidden />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Coverage map ──────────────────────────────────────────────── */}
      <section className="bg-[#FAF7F4] py-20 md:py-24">
        <div className={containerCx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              National Coverage
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#3A3A3A] md:text-[2.4rem]">
              Available where you are
            </h2>
            <p className="mt-4 text-sm text-[#555555]">
              Check if Simple Health serves your state
            </p>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.75fr_1.6fr]">
            <ul className="space-y-7">
              {coverageLegend.map((c) => (
                <li key={c.label} className="flex items-start gap-3">
                  <span
                    className="mt-1 inline-block h-6 w-6 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: c.color }}
                    aria-hidden
                  />
                  <div>
                    <p className="font-serif text-base font-semibold text-[#3A3A3A]">{c.label}</p>
                    <p className="mt-1 text-xs text-[#555555]">{c.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="relative aspect-square w-full max-w-2xl justify-self-center md:aspect-[4/3]">
              <Image
                src={COVERAGE_MAP_URL}
                alt="Simple Health coverage map of the United States"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing (3-tier) ──────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className={containerCx}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#C67B5C]">
              Transparent Pricing
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#3A3A3A] md:text-[2.6rem]">
              Consultation Fees
            </h2>
            <p className="mt-4 text-sm text-[#555555]">
              Physician-guided care with complete pricing clarity. Includes any &amp; all services.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.label}
                className="flex flex-col rounded-2xl border border-[#E8E2D9] bg-[#FAF7F4] p-8 shadow-sm"
              >
                <h3 className="font-serif text-xl text-[#3A3A3A]">{tier.label}</h3>
                <p className="mt-2 text-xs leading-5 text-[#555555]">{tier.description}</p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white px-4 py-4 text-center">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#6B7456]">
                      First Visit
                    </p>
                    <p className="mt-1 font-serif text-2xl text-[#3A3A3A]">{tier.firstVisit}</p>
                  </div>
                  <div className="rounded-xl bg-white px-4 py-4 text-center">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#6B7456]">
                      Follow-Up
                    </p>
                    <p className="mt-1 font-serif text-2xl text-[#3A3A3A]">{tier.followUp}</p>
                  </div>
                </div>

                <a
                  href={SCHEDULE_CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#C67B5C] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#A66647]"
                >
                  Schedule Consultation
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
