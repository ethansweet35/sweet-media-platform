import Image from "next/image";
import Link from "next/link";
import HeroContactForm from "@/components/feature/HeroContactForm";
import FaqAccordion from "@/components/sections/FaqAccordion";
import BottomCta from "@/components/sections/BottomCta";
import { PHONE_DISPLAY, PHONE_HREF } from "@/data/site";

const HERO_IMAGE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ca_hero01.jpg";
const INTERVENTION_IMAGE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ca_intervention01.jpg";
const RECOVERY_IMAGE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ca_recovery01.jpg";
const CITIES_IMAGE =
  "https://bxtwcdgjzzjxjvqdiuvn.supabase.co/storage/v1/object/public/site-assets/images/ca_cities01.jpg";

const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-10";

const CA_STATS = [
  {
    value: "10,898",
    label: "Californians lost to overdose in 2023",
    sublabel: "California Dept. of Public Health",
  },
  {
    value: "2.6M",
    label: "Adults in CA with a substance use disorder",
    sublabel: "SAMHSA 2023 NSDUH",
  },
  {
    value: "1 in 8",
    label: "Californians experience serious mental illness",
    sublabel: "California Health Care Foundation",
  },
  {
    value: "24–48 hrs",
    label: "Our team is on the ground in CA",
    sublabel: "Same-day mobilisation for active crises",
  },
];

const CA_REGIONS = [
  {
    name: "Greater Los Angeles",
    cities: "Beverly Hills · Pasadena · Long Beach · Santa Monica · Burbank",
    href: "/los-angeles",
    image: "ri-sun-line",
  },
  {
    name: "Orange County",
    cities: "Newport Beach · Irvine · Laguna · Huntington Beach · Anaheim",
    href: "/contact",
    image: "ri-leaf-line",
  },
  {
    name: "San Diego County",
    cities: "Downtown · La Jolla · Carlsbad · Encinitas · Chula Vista",
    href: "/san-diego",
    image: "ri-anchor-line",
  },
  {
    name: "San Francisco Bay Area",
    cities: "SF · Oakland · Berkeley · San Jose · Marin · Palo Alto",
    href: "/contact",
    image: "ri-bridge-line",
  },
  {
    name: "Sacramento & Central Valley",
    cities: "Sacramento · Stockton · Modesto · Fresno · Bakersfield",
    href: "/contact",
    image: "ri-government-line",
  },
  {
    name: "Inland Empire & Coachella",
    cities: "Riverside · San Bernardino · Palm Springs · Indio · Temecula",
    href: "/contact",
    image: "ri-fire-line",
  },
];

const CA_DIFFERENTIATORS = [
  {
    icon: "ri-map-pin-2-line",
    title: "We come to your California home",
    body: "Our certified interventionists fly into LAX, SAN, SFO, OAK, SMF, and SNA — and into smaller regionals when families need rural support. No telehealth-only intervention.",
  },
  {
    icon: "ri-shield-check-line",
    title: "We know California's treatment landscape",
    body: "From Newport Beach luxury rehabs to East LA county systems, NorCal medical detox, and Coachella Valley recovery communities — we vet every program before we recommend it.",
  },
  {
    icon: "ri-bank-line",
    title: "We work with California insurance",
    body: "We help families navigate Kaiser Permanente, Anthem Blue Cross of CA, Blue Shield of CA, Health Net, and the protections of California's Mental Health Parity Act (SB 855).",
  },
  {
    icon: "ri-time-line",
    title: "We work on California's clock",
    body: "California crises happen at 3am Friday after a Vegas bender, or noon Sunday in Tahoe. Our team is on call 24/7 PT and can coordinate hand-offs across the state same-day.",
  },
];

const CA_PROCESS = [
  {
    number: "01",
    title: "First confidential call",
    body: "Tell us what's happening in your family right now — drinking patterns, mental health, recent crises. We listen first, then explain whether a California intervention is the right next step.",
  },
  {
    number: "02",
    title: "Family preparation (CA-specific)",
    body: "We build a private intervention plan that matches your loved one's California life: their job, their friend group, their access to alcohol or substances, the treatment programs that fit your zip code.",
  },
  {
    number: "03",
    title: "Interventionist arrives in California",
    body: "Your interventionist flies in the day before, meets the family privately, conducts a full rehearsal, and stays nearby to answer 11pm phone calls before the morning intervention.",
  },
  {
    number: "04",
    title: "The intervention conversation",
    body: "We lead the conversation in your California home, business, or a neutral location. Most loved ones say yes that day. The few who don't get a structured second-attempt plan within the week.",
  },
  {
    number: "05",
    title: "Direct transport to treatment",
    body: "We physically escort your loved one — by car within California or by air to an out-of-state program — and remain on the line with the family during admission.",
  },
  {
    number: "06",
    title: "Long-term California family coaching",
    body: "We don't disappear after admission. We coach the California family through 12 months of recovery — the visit weekend, the relapse risk, the return home, and the boundaries that keep recovery alive.",
  },
];

const CA_CONDITIONS = [
  { label: "Alcohol abuse", href: "/substance-abuse-interventions/alcohol" },
  { label: "Cocaine addiction", href: "/substance-abuse-interventions/cocaine" },
  { label: "Heroin / opioids", href: "/substance-abuse-interventions/heroin" },
  { label: "Meth use", href: "/substance-abuse-interventions/meth" },
  { label: "Ketamine misuse", href: "/substance-abuse-interventions/ketamine" },
  { label: "Prescription drugs", href: "/substance-abuse-interventions/opioid" },
  { label: "Anxiety crises", href: "/mental-health-interventions/anxiety" },
  { label: "Depression", href: "/mental-health-interventions/depression" },
  { label: "Self-medicating", href: "/mental-health-interventions/self-medicating" },
  { label: "Dual diagnosis", href: "/dual-diagnosis-interventions" },
  { label: "Teen interventions", href: "/interventions-for-teens" },
  { label: "Executive interventions", href: "/interventions-for-executives" },
];

const CA_FAQS = [
  {
    question: "Do you only help families in Los Angeles and San Francisco?",
    answer: "No. We come to every part of California — coastal, central valley, mountain, and desert communities. We've conducted interventions in Eureka, Fresno, Bakersfield, Mammoth Lakes, Big Bear, Palm Springs, and small towns most directories never mention.",
  },
  {
    question: "How quickly can a certified interventionist reach my California home?",
    answer: "Most California cases are on the ground within 24–48 hours of the first call. Same-day mobilisation is available for active crises — overdose, suicidal ideation, or imminent danger. We can usually have a clinician on a flight to LAX, SAN, SFO, OAK, or SMF within hours.",
  },
  {
    question: "Will my Kaiser, Blue Shield, or Anthem plan cover treatment?",
    answer: "California's Mental Health Parity Act (SB 855) requires commercial health plans to cover medically necessary substance use and mental health treatment at parity with physical care. We help families read their plans, file authorisations, and appeal denials. We also know which California treatment centres are in-network with each major carrier.",
  },
  {
    question: "Should we keep our loved one in California, or send them out of state?",
    answer: "It depends on the case. California has world-class treatment in Malibu, Newport Beach, the Bay Area, and Lake Arrowhead — but proximity to drug-using friends, job stress, or romantic relationships in California can also undermine recovery. We help your family weigh both options honestly. Sometimes 30 days in Arizona, Tennessee, or Florida is the most loving thing a family can do.",
  },
  {
    question: "Can the intervention happen at the family home, or does it have to be neutral ground?",
    answer: "Either works. Many California interventions happen in a family living room because that's where the conversation feels safest. For executives, public figures, or families where the loved one might run, we'll arrange a hotel suite, a private office, or a treatment-program family room.",
  },
  {
    question: "What if my loved one is undocumented or doesn't have insurance?",
    answer: "We help. California has a strong public behavioural health system through county Behavioural Health Services agencies, plus Medi-Cal coverage for many residents regardless of immigration status. We know which treatment centres in your county accept self-pay, sliding scale, or Medi-Cal — and we'll never let cost stop the conversation.",
  },
  {
    question: "How much does a California intervention cost?",
    answer: "Our intervention services are quoted transparently on the first call — no celebrity-style premium pricing. The cost of a structured family intervention is almost always less than one continued month of active addiction.",
  },
  {
    question: "Can you help with a Prop 36 / drug court / DUI court case?",
    answer: "Yes. We've coordinated with California probation officers, Prop 36 case managers, and DUI court programs. A documented intervention and admission to a state-approved treatment program is often viewed favourably by California courts.",
  },
];

export default function CaliforniaPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO: split layout with form ──────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#1A1A17]">
        <Image
          src={HERO_IMAGE}
          alt="California Pacific coastline at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/85 via-[#1A1A17]/65 to-[#3E5B50]/40" />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-[#507969]/30 blur-3xl" />

        <div className={`relative ${CONTAINER} py-20 md:py-28`}>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="brand-eyebrow mb-4 text-[#8FAC87] flex items-center gap-2">
                <i className="ri-shield-check-line text-base" />
                Certified Interventionists Serving California 24/7
              </p>
              <h1 className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Interventions across <span className="italic text-[#8FAC87]">California</span> — from Eureka to Chula Vista.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                On-site addiction and mental health interventions in every California county. Our team is on the ground in 24–48 hours, vetted across the state's treatment landscape, and stays with your family for the full recovery year.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6F8E68]"
                >
                  <i className="ri-phone-fill text-base" />
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href="#contact-ca"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
                >
                  Talk to a CA specialist
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                {[
                  { icon: "ri-time-line", text: "Available 24/7 PT" },
                  { icon: "ri-shield-check-line", text: "100% Confidential" },
                  { icon: "ri-award-line", text: "Joint Commission Accredited" },
                  { icon: "ri-map-pin-2-line", text: "All 58 CA counties" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8FAC87]/25 text-[#8FAC87]">
                      <i className={`${b.icon} text-xs`} />
                    </span>
                    <span className="text-sm font-medium text-white/85">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inline lead form */}
            <div id="contact-ca">
              <HeroContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── CA STATS STRIP ────────────────────────────────────────────── */}
      <section className="bg-[#3E5B50] py-12 md:py-16">
        <div className={CONTAINER}>
          <p className="brand-eyebrow text-[#8FAC87] mb-4 text-center">
            The California Reality
          </p>
          <h2 className="font-heading text-center text-2xl font-bold text-white md:text-3xl mb-10 max-w-3xl mx-auto">
            California has the largest behavioural health crisis in the country. Your family isn't alone in this.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CA_STATS.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                <p className="font-heading text-3xl md:text-4xl font-bold text-[#8FAC87]">{s.value}</p>
                <p className="mt-2 text-sm font-semibold text-white">{s.label}</p>
                <p className="mt-1 text-[11px] text-white/55 uppercase tracking-wider">{s.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CALIFORNIA FAMILIES CALL US ──────────────────────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="relative min-h-[380px] rounded-3xl overflow-hidden ring-1 ring-[#EFEFEF] order-2 lg:order-1">
              <Image
                src={INTERVENTION_IMAGE}
                alt="California family meeting with an interventionist in their living room"
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-[#3E5B50] px-6 py-5 shadow-xl">
                <p className="font-heading text-3xl font-bold text-white">300+</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8FAC87]">
                  CA families helped
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">Why California Families Choose Us</p>
              <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl lg:text-5xl">
                We don't run a generic <span className="italic text-[#507969]">national</span> playbook in California.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
                California is its own country when it comes to addiction, mental health, and treatment. Our team has spent more than two decades learning the state's geography, its insurance carriers, and its clinical strengths and gaps.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {CA_DIFFERENTIATORS.map((d) => (
                  <div key={d.title} className="rounded-2xl bg-[#F5F3E7] p-5 ring-1 ring-[#EFEFEF]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FAC87] text-white">
                      <i className={`${d.icon} text-lg`} />
                    </span>
                    <h3 className="mt-4 font-heading text-base font-bold text-[#1A1A17]">{d.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4B4B4B]">{d.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CA REGIONS ────────────────────────────────────────────────── */}
      <section className="bg-[#F5F3E7] py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end mb-12">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">California Coverage</p>
              <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl lg:text-5xl">
                We cover every <span className="italic text-[#507969]">region</span> of California.
              </h2>
            </div>
            <p className="text-base leading-relaxed text-[#4B4B4B] md:text-lg">
              From the redwood country in the north to the Mexican border in the south — and from coastal communities to the Sierra. Click your region for the city-specific page or call us for any community we don't yet have a dedicated page for.
            </p>
          </div>

          <div className="relative aspect-[21/8] w-full overflow-hidden rounded-3xl mb-10">
            <Image
              src={CITIES_IMAGE}
              alt="California cities — Los Angeles, San Francisco, San Diego"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A17]/40 via-transparent to-transparent" />
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-[#EFEFEF] bg-[#EFEFEF] sm:grid-cols-2 lg:grid-cols-3">
            {CA_REGIONS.map((r, i) => (
              <Link
                key={r.name}
                href={r.href}
                className={`group p-6 transition hover:bg-white ${i % 2 === 0 ? "bg-white" : "bg-[#F5F3E7]/70"}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FAC87]/15 text-[#507969]">
                  <i className={`${r.image} text-lg`} />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-[#1A1A17]">{r.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4B4B4B]/80">{r.cities}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#507969] group-hover:underline underline-offset-4">
                  Learn more
                  <i className="ri-arrow-right-line text-xs transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS IN CALIFORNIA ───────────────────────────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="text-center max-w-3xl mx-auto">
            <p className="brand-eyebrow mb-3 text-[#8FAC87]">The California Process</p>
            <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl lg:text-5xl">
              From first call to one-year recovery, mapped <span className="italic text-[#507969]">step by step</span>.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
              You don't have to figure this out. We've done it 1,500+ times — and several hundred of them have been in California.
            </p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {CA_PROCESS.map((step) => (
              <div key={step.number} className="flex gap-5 rounded-2xl bg-[#F5F3E7] p-6 ring-1 ring-[#EFEFEF]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3E5B50] font-heading text-base font-bold text-[#8FAC87]">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#1A1A17]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B4B4B]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK CTA STRIP ───────────────────────────────────────────── */}
      <section className="relative bg-[#3E5B50] py-16 md:py-20 overflow-hidden">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#507969]/40" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-[#8FAC87]/15" />
        <div className={`relative ${CONTAINER}`}>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">Don't wait for the next California crisis</p>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Most California families wait <span className="italic text-[#8FAC87]">six years</span> too long.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg max-w-2xl">
                Every weekend you wait is another DUI, another overdose risk, another job loss, another fractured relationship. The first call is free, judgment-free, and takes about 20 minutes.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8FAC87] px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill text-base" />
                Call {PHONE_DISPLAY} — answered 24/7
              </a>
              <Link
                href="#contact-ca"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
              >
                Use the contact form
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONDITIONS WE TREAT IN CA ────────────────────────────────── */}
      <section className="bg-white py-20 md:py-24">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">Every Kind of California Case</p>
              <h2 className="font-heading text-3xl font-bold text-[#1A1A17] md:text-4xl">
                What we handle <span className="italic text-[#507969]">across</span> California.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#4B4B4B] md:text-lg">
                Substance use, mental health, dual diagnosis, executive cases, teens — we run interventions for the full spectrum of behavioural health crises in California families.
              </p>
              <a
                href={PHONE_HREF}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#8FAC87] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6F8E68]"
              >
                <i className="ri-phone-fill text-sm" />
                Talk to a CA specialist
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CA_CONDITIONS.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="group flex items-center justify-between rounded-2xl border border-[#EFEFEF] bg-white px-5 py-4 transition hover:border-[#8FAC87] hover:bg-[#F5F3E7]"
                >
                  <span className="text-sm font-semibold text-[#1A1A17]">{c.label}</span>
                  <i className="ri-arrow-right-line text-sm text-[#507969] transition group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOPE / RECOVERY IMAGE BAND ───────────────────────────────── */}
      <section className="relative w-full">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src={RECOVERY_IMAGE}
            alt="Person walking on a California beach at sunrise — symbolising recovery"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A17]/70 via-[#1A1A17]/30 to-transparent" />
          <div className={`absolute inset-0 flex items-center ${CONTAINER}`}>
            <div className="max-w-xl">
              <p className="brand-eyebrow mb-3 text-[#8FAC87]">Recovery is real in California</p>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Your loved one's next sunrise can look <span className="italic text-[#8FAC87]">different</span>.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">
                We've watched fathers come back to their families in Newport Beach. Daughters get sober in Sacramento. Executives rebuild in San Francisco. The first step is a phone call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ─────────────────────────────────────────────────────── */}
      <FaqAccordion
        title="California intervention questions, answered."
        faqs={CA_FAQS}
      />

      <BottomCta
        title="Ready to act for your family in California?"
        body="Your first call is free, confidential, and judgment-free. We listen first, then tell you exactly what comes next — and we don't disappear after admission."
      />
    </main>
  );
}
