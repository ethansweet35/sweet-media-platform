import Image from "next/image";
import Link from "next/link";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";
import { MBH_TEAM } from "@/data/team";
import TeamGrid from "@/components/team/TeamGrid";
import {
  CONTAINER,
  FACILITY_ADDRESS,
  PHONE_DISPLAY,
  PHONE_HREF,
  SITE_IMAGES,
} from "@/data/site";

const VALUES = [
  {
    icon: "ri-heart-pulse-line",
    title: "Whole-person care",
    body: "We treat addiction and mental health together — not as separate problems — with medical, clinical, and peer support under one roof.",
  },
  {
    icon: "ri-user-search-line",
    title: "Individualized plans",
    body: "Every client receives a tailored treatment plan built around diagnosis, history, goals, and the level of care that fits their life.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Trauma-informed practice",
    body: "Our clinicians use evidence-based, trauma-informed approaches so you can heal safely without re-traumatization.",
  },
  {
    icon: "ri-community-line",
    title: "Accessible across Missouri",
    body: "In-person programming in Springfield plus HIPAA-compliant telehealth so clients statewide can access IOP and outpatient care.",
  },
] as const;

const DIFFERENTIATORS = [
  { value: "24/7", label: "Admissions availability" },
  { value: "PHP · IOP", label: "Structured outpatient levels" },
  { value: "Dual", label: "Diagnosis expertise" },
  { value: "Same Day", label: "Assessments when possible" },
] as const;

const FAQS = [
  {
    q: "Where is Missouri Behavioral Health located?",
    a: `Our primary campus is at ${FACILITY_ADDRESS}. We serve clients throughout Missouri through in-person programming and secure telehealth.`,
  },
  {
    q: "What levels of care do you offer?",
    a: "We offer Partial Hospitalization (PHP), Intensive Outpatient (IOP), standard outpatient therapy, and virtual outpatient services. We do not provide 24-hour residential or inpatient hospitalization — we specialize in structured outpatient care.",
  },
  {
    q: "Who leads clinical care at MBH?",
    a: "Our Medical Director is double board-certified in Family Medicine and Addiction Medicine. Our Clinical Director is a licensed professional counselor. Licensed therapists, counselors, and psychiatric providers deliver day-to-day treatment under their oversight.",
  },
  {
    q: "What insurance do you accept?",
    a: "Missouri Behavioral Health accepts private health insurance and private pay options. Our administrative team helps verify your coverage at no cost so you understand your benefits before beginning care.",
  },
  {
    q: "How do I get started?",
    a: "Call our admissions line any time — a live coordinator answers 24/7. We schedule a confidential clinical assessment, verify insurance if applicable, and help you begin the appropriate level of care, often within 24 hours.",
  },
] as const;

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[72vh] flex-col overflow-hidden bg-mbh-forest-deep">
        <Image
          src={SITE_IMAGES.aboutHeroLandscape}
          alt="Rolling Missouri countryside landscape at golden hour"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(18,46,24,0.88) 0%, rgba(18,46,24,0.55) 45%, rgba(18,46,24,0.92) 100%)",
          }}
        />
        <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-mbh-green/10" aria-hidden />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-mbh-mint/10" aria-hidden />

        <div className={`${CONTAINER} relative z-10 flex flex-1 flex-col justify-end pb-14 pt-28 lg:pb-20 lg:pt-32`}>
          <nav
            className="mb-8 flex items-center gap-2 font-body text-[11px] text-white/40"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="transition hover:text-white/70">
              Home
            </Link>
            <i className="ri-arrow-right-s-line" aria-hidden />
            <span className="text-white/65">About Us</span>
          </nav>

          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-mbh-sage" aria-hidden />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-mbh-sage">
              Springfield, Missouri
            </span>
          </div>

          <h1
            className="max-w-4xl font-display font-semibold leading-[1.04] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
          >
            Compassionate care.{" "}
            <span className="italic font-medium text-mbh-mint">Clinical excellence.</span>
          </h1>
          <p className="mt-5 max-w-2xl font-body text-[1.0625rem] leading-relaxed text-white/65">
            Missouri Behavioral Health helps individuals and families across Missouri recover from
            addiction and mental health challenges through evidence-based outpatient treatment —
            delivered by a dedicated, licensed clinical team.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-8 py-4 font-body text-sm font-semibold text-white shadow-lg shadow-black/25 transition hover:bg-mbh-green-hover"
            >
              <i className="ri-phone-fill" aria-hidden />
              Call 24/7 — {PHONE_DISPLAY}
            </a>
            <Link
              href="/admissions"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-body text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/8"
            >
              How admissions works
              <i className="ri-arrow-right-line" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-mbh-forest/10">
                <Image
                  src={SITE_IMAGES.therapyGroup}
                  alt="Therapy group session at Missouri Behavioral Health"
                  width={800}
                  height={1000}
                  className="h-auto w-full object-cover"
                  style={{ aspectRatio: "4/5", objectPosition: "center top" }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(18,46,24,0.35) 0%, transparent 50%)",
                  }}
                  aria-hidden
                />
              </div>
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-mbh-forest px-7 py-6 shadow-2xl lg:-right-8">
                <p className="font-display text-4xl font-semibold leading-none text-white">24/7</p>
                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Confidential support
                </p>
              </div>
            </div>

            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Our story
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest">
                A Missouri treatment center built for{" "}
                <span className="italic font-medium text-mbh-green">real recovery.</span>
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-mbh-body">
                Missouri Behavioral Health was founded to fill a critical gap: high-quality,
                structured addiction and mental health treatment that does not require leaving
                home for 30 or 90 days. We believe recovery happens in the context of your life —
                with the right clinical intensity, medical oversight, and community support.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-mbh-body">
                From our Springfield campus, we offer Partial Hospitalization, Intensive
                Outpatient, and outpatient therapy for substance use disorders and co-occurring
                mental health conditions. Telehealth extends that same standard of care to clients
                across the state.
              </p>
              <p className="mt-4 font-body text-base leading-relaxed text-mbh-body">
                Every person who walks through our doors — or joins us virtually — is met with
                dignity, confidentiality, and a treatment plan designed around their unique
                circumstances, not a one-size-fits-all program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                What guides us
              </span>
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest">
              Our mission is simple: help you heal and stay well.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-cream-alt bg-cream/50 p-7 ring-1 ring-mbh-forest/5"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${item.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <p className="font-display text-lg font-semibold text-mbh-forest">{item.title}</p>
                <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators strip */}
      <section className="relative overflow-hidden bg-mbh-forest py-16 text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-mbh-green/20" aria-hidden />
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                Why families choose MBH
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.12] text-white">
                Structured outpatient care with the intensity recovery often requires.
              </h2>
              <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-white/65">
                We combine medical direction, licensed therapy, group process, and holistic
                modalities — so you receive comprehensive treatment without the disruption of
                residential placement when a lower level of care is clinically appropriate.
              </p>
              <Link
                href="/levels-of-care-missouri"
                className="mt-6 inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-mint underline-offset-4 hover:underline"
              >
                Explore levels of care
                <i className="ri-arrow-right-line" aria-hidden />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {DIFFERENTIATORS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`px-5 py-6 text-center ${i % 2 === 0 ? "bg-white/5" : "bg-white/[0.08]"}`}
                >
                  <p className="font-display text-2xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-1 font-body text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinical approach */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Clinical approach
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-mbh-forest">
                Evidence-based therapies, integrated under one team.
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-mbh-body">
                Our clinicians draw on CBT, DBT, EMDR, group therapy, family therapy, and holistic
                practices including yoga and music therapy. Psychiatric evaluation and medication
                management are available when clinically appropriate.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Addiction treatment for alcohol, opioids, stimulants, and more",
                  "Mental health care for depression, anxiety, PTSD, OCD, and trauma",
                  "Dual-diagnosis treatment when both are present",
                  "Family involvement and discharge planning",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/15">
                      <i className="ri-check-line text-[11px] text-mbh-green" aria-hidden />
                    </span>
                    <span className="font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full bg-mbh-forest px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-forest-deep"
                >
                  View all therapies
                  <i className="ri-arrow-right-line" aria-hidden />
                </Link>
                <Link
                  href="/missouri-addiction-treatment"
                  className="inline-flex items-center gap-2 rounded-full border border-mbh-forest/20 px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:border-mbh-forest hover:bg-mbh-forest hover:text-white"
                >
                  Addiction treatment
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-mbh-forest/8">
              <Image
                src={SITE_IMAGES.facilityInterior}
                alt="Missouri Behavioral Health facility interior common area"
                width={900}
                height={600}
                className="h-full min-h-[320px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-mbh-forest-deep/90 to-transparent p-6 pt-16">
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.22em] text-mbh-sage">
                  Our Springfield campus
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-white">
                  {FACILITY_ADDRESS}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TeamGrid
        members={MBH_TEAM}
        grouped
        intro="From leadership and admissions to therapists, psychiatric providers, and recovery advocates — meet the people who make Missouri Behavioral Health a trusted place to heal."
      />

      {/* FAQ */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Common questions
              </span>
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-mbh-forest">
              About Missouri Behavioral Health
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl">
            <SubstanceFaq items={[...FAQS]} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-mbh-forest-deep py-20 text-white">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-mbh-green/15" aria-hidden />
        <div className={`${CONTAINER} relative text-center`}>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold leading-[1.1] text-white">
            Ready to take the first step?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-white/60">
            Our admissions team is available 24/7. Every call is confidential, HIPAA-compliant, and
            judgment-free.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-8 py-4 font-body text-sm font-semibold text-white shadow-lg transition hover:bg-mbh-green-hover"
            >
              <i className="ri-phone-fill" aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <Link
              href="/verify-insurance"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-body text-sm font-semibold text-white transition hover:border-white/45 hover:bg-white/8"
            >
              Verify insurance
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-mbh-mint underline-offset-4 hover:underline"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
