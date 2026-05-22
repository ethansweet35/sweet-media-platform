import Image from "next/image";
import { heroContentPad } from "@/lib/heroSpacing";
import Link from "next/link";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const CONDITIONS = [
  {
    name: "Anxiety Disorders",
    href: "/treatment/dual-diagnosis/treatment-for-anxiety-disorders/",
    icon: "ri-mental-health-line",
    description: "Generalized anxiety, panic disorder, social anxiety, and phobias — often treated with alcohol or benzodiazepines.",
    tag: "Most Common Co-Occurring",
  },
  {
    name: "Depression",
    href: "/treatment/mental-health-disorders/depression/",
    icon: "ri-heart-line",
    description: "Major depressive disorder, persistent depressive disorder, and situational depression co-occurring with substance use.",
    tag: "Dual Diagnosis",
  },
  {
    name: "PTSD",
    href: "/treatment/mental-health-disorders/ptsd/",
    icon: "ri-shield-flash-line",
    description: "Post-traumatic stress disorder driven by combat, abuse, accident, or other trauma — a leading driver of self-medication.",
    tag: "Trauma-Informed",
  },
  {
    name: "Bipolar Disorder",
    href: "/treatment/mental-health-disorders/bipolar-disorder/",
    icon: "ri-swap-line",
    description: "Bipolar I, II, and cyclothymia — mood cycling that often involves substance use during manic or depressive episodes.",
    tag: "Dual Diagnosis",
  },
  {
    name: "Borderline Personality",
    href: "/treatment/mental-health-disorders/borderline-personality-disorder/",
    icon: "ri-user-heart-line",
    description: "Emotional dysregulation, identity disturbance, and impulsivity frequently co-occurring with substance use disorders.",
    tag: "DBT Specialized",
  },
  {
    name: "Trauma",
    href: "/treatment/mental-health-disorders/trauma-therapy/",
    icon: "ri-pulse-line",
    description: "Complex trauma, developmental trauma, and adverse childhood experiences as root causes of addiction.",
    tag: "EMDR Available",
  },
  {
    name: "OCD",
    href: "/treatment/dual-diagnosis/ocd-treatment-and-counseling/",
    icon: "ri-loop-right-line",
    description: "Obsessive-compulsive disorder and its relationship to substance use, anxiety, and compulsive behavioral patterns.",
    tag: "Dual Diagnosis",
  },
  {
    name: "Eating Disorders",
    href: "/treatment/mental-health-disorders/eating-disorders/",
    icon: "ri-restaurant-line",
    description: "Anorexia, bulimia, and binge eating disorder — co-occurring with substance use at higher rates than most realize.",
    tag: "Integrated Treatment",
  },
  {
    name: "Codependency",
    href: "/treatment/mental-health-disorders/codependency/",
    icon: "ri-links-line",
    description: "Dysfunctional relationship patterns and enabling behaviors that sustain addiction within families and partnerships.",
    tag: "Family-Focused",
  },
];

const WHY = [
  {
    icon: "ri-brain-line",
    title: "Integrated Dual Diagnosis Treatment",
    body: "Northbound treats mental health and addiction simultaneously — not sequentially. Our clinical team understands that healing one without the other rarely produces lasting recovery.",
  },
  {
    icon: "ri-stethoscope-line",
    title: "On-Site Psychiatric Care",
    body: "Our psychiatrists provide comprehensive mental health evaluation, diagnosis, and medication management within the treatment program — no outside referrals required.",
  },
  {
    icon: "ri-award-line",
    title: "Evidence-Based Therapies",
    body: "CBT, DBT, EMDR, motivational interviewing, and mindfulness-based therapies are delivered by licensed clinicians — matching modality to diagnosis for maximum clinical impact.",
  },
  {
    icon: "ri-group-line",
    title: "Specialized Group Programming",
    body: "Our group therapy tracks are diagnosis-specific — clients with co-occurring depression, anxiety, or trauma work alongside peers who share their clinical profile.",
  },
  {
    icon: "ri-family-line",
    title: "Family Therapy Integration",
    body: "Mental health conditions affect families profoundly. Northbound's family program rebuilds relationships and equips loved ones with tools to support sustained recovery.",
  },
  {
    icon: "ri-shield-check-line",
    title: "38+ Years of Expertise",
    body: "Northbound has been treating co-occurring disorders since before \"dual diagnosis\" was a recognized clinical category. Our experience is unmatched in Southern California.",
  },
];

export default function MentalHealthHubPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="nb-hero-overlay relative overflow-hidden bg-[#3a6697]">
        <div className="absolute inset-0">
          <Image
            src={`${BASE}/nbt_mh_hub_hero01.jpg`}
            alt="Diverse group therapy session for co-occurring mental health and addiction treatment at Northbound"
            fill
            className="object-cover object-center opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#3a6697]/95 via-[#3a6697]/85 to-[#3a6697]/50" />
        </div>
        <div className={`relative z-10 mx-auto w-full max-w-7xl ${heroContentPad}`}>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e97a52]">
              <AutoLinkedText>{"Dual Diagnosis Treatment — Northbound Treatment Services"}</AutoLinkedText>
            </p>
            <h1 className="font-heading mt-4 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Mental <span className="italic text-[#e97a52]">Health</span> Disorder Treatment
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
              <AutoLinkedText>{"Addiction and mental health disorders are deeply interconnected — one rarely exists without the other. Northbound's integrated dual diagnosis program treats both simultaneously, delivering the complete clinical picture that lasting recovery requires."}</AutoLinkedText>
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="tel:8663110003"
                className="inline-flex items-center gap-2 bg-[#e97a52] px-7 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#f09068]"
              >
                <i className="ri-phone-fill text-base" />
                Call (866) 311-0003
              </Link>
              <Link
                href="/admissions/"
                className="inline-flex items-center gap-2 border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/8"
              >
                Verify Insurance — Free <i className="ri-arrow-right-line" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-7 gap-y-2">
              {["Available 24/7", "Insurance Accepted", "100% Confidential"].map((s) => (
                <span key={s} className="flex items-center gap-1.5 text-xs text-white/50">
                  <i className="ri-check-line text-[#e97a52]" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">
                <AutoLinkedText>{"Why Co-Occurring Disorders Require Integrated Care"}</AutoLinkedText>
              </p>
              <h2 className="font-heading mt-3 text-4xl font-bold text-[#3a6697] md:text-5xl">
                You Can&apos;t Treat One Without <span className="italic text-[#e97a52]">the Other</span>
              </h2>
              <p className="mt-5 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"More than half of people with a substance use disorder also have a co-occurring mental health condition — and more than half of people with a mental health disorder have a history of substance misuse. These are not coincidences; they share neurobiological pathways, and they reinforce each other in a cycle that neither willpower nor single-diagnosis treatment can break."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"When depression is left untreated, the pull to self-medicate with alcohol is overwhelming. When PTSD goes unaddressed, stimulant or opioid use becomes the only relief that feels real. When anxiety drives benzo use for years, treating the addiction without the anxiety produces nothing but rapid relapse."}</AutoLinkedText>
              </p>
              <p className="mt-4 leading-relaxed text-[#64748b]">
                <AutoLinkedText>{"Northbound's dual diagnosis model — developed over 38 years of clinical practice — integrates psychiatric care and addiction treatment into a single, coherent program. Every client receives both, from day one."}</AutoLinkedText>
              </p>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={`${BASE}/nbt_mh_hub_hero01.jpg`}
                  alt="Integrated group therapy session for co-occurring mental health and addiction treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#3a6697] px-6 py-5 shadow-xl">
                <p className="font-heading text-3xl font-bold text-white">50%+</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#e97a52]">
                  <AutoLinkedText>{"of addiction clients have co-occurring mental health conditions"}</AutoLinkedText>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONDITIONS GRID ───────────────────────────────────────────── */}
      <section className="bg-[#eef2f7] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">
              Conditions We Treat
            </p>
            <h2 className="font-heading mt-3 text-4xl font-bold text-[#3a6697] md:text-5xl">
              Mental Health Disorders We <span className="italic text-[#e97a52]">Specialize In</span>
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-[#64748b]">
              <AutoLinkedText>{"Each condition below links to a dedicated page with full clinical detail — symptoms, treatment approaches, and how Northbound addresses the intersection with addiction."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONDITIONS.map((cond) => (
              <Link
                key={cond.name}
                href={cond.href}
                className="group block border border-[#cdd8e8] bg-white p-7 transition hover:border-[#e97a52]/40 hover:shadow-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#e97a52]/10 transition group-hover:bg-[#e97a52]/20">
                    <i className={`${cond.icon} text-xl text-[#e97a52]`} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#64748b]">
                    {cond.tag}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#3a6697]">{cond.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]"><AutoLinkedText>{cond.description}</AutoLinkedText></p>
                <p className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#e97a52]">
                  Learn more <i className="ri-arrow-right-line transition group-hover:translate-x-1" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NORTHBOUND ────────────────────────────────────────────── */}
      <section className="bg-[#3a6697] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e97a52]">
              Why Northbound
            </p>
            <h2 className="font-heading mt-3 text-4xl font-bold text-white md:text-5xl">
              What Makes Our Dual Diagnosis Program <span className="italic text-[#e97a52]">Different</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((item) => (
              <div key={item.title} className="border border-white/10 bg-white/5 p-7">
                <div className="mb-4 flex h-10 w-10 items-center justify-center bg-[#e97a52]/20">
                  <i className={`${item.icon} text-xl text-[#e97a52]`} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60"><AutoLinkedText>{item.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-white/10 pt-12 grid gap-8 text-center sm:grid-cols-3">
            {[
              { value: "38+", label: "Years treating dual diagnosis" },
              { value: ">97%", label: "Drug abstinence rate (USC study)" },
              { value: "24/7", label: "Psychiatric & clinical support" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-heading text-5xl font-bold text-[#e97a52]"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.1em] text-white/50"><AutoLinkedText>{s.label}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-[#e97a52] py-14">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
                Mental Health Is Part of Addiction Recovery — Always.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80">
                <AutoLinkedText>{"Call our admissions team 24/7 for a free, confidential consultation. We&rsquo;ll help you understand what integrated dual diagnosis treatment looks like — and what it can mean for your recovery."}</AutoLinkedText>
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="tel:8663110003"
                className="inline-flex items-center gap-2 bg-white px-7 py-4 text-sm font-bold text-[#e97a52] shadow-sm transition hover:bg-white/90"
              >
                <i className="ri-phone-fill" /> (866) 311-0003
              </Link>
              <Link
                href="/admissions/"
                className="inline-flex items-center gap-2 border border-white/40 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10"
              >
                Verify Insurance Free <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
