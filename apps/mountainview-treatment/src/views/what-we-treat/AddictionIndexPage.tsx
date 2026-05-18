import Image from "next/image";
import Link from "next/link";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import { SITE } from "@/lib/site";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_addiction_hub_hero.jpg";

const SUBSTANCES = [
  { name: "Alcohol", href: "/what-we-treat/addiction/alcohol/", icon: "ri-drop-line", desc: "Evidence-based outpatient treatment for alcohol use disorder, including MAT options and dual diagnosis care." },
  { name: "Marijuana", href: "/what-we-treat/addiction/marijuana/", icon: "ri-leaf-line", desc: "Specialized behavioral treatment for cannabis use disorder — clinically recognized and increasingly prevalent." },
  { name: "Opioids", href: "/what-we-treat/addiction/opioids/", icon: "ri-capsule-line", desc: "FDA-approved MAT (buprenorphine, naltrexone) combined with structured behavioral therapy for opioid use disorder." },
  { name: "Prescription Drugs", href: "/what-we-treat/addiction/prescription/", icon: "ri-medicine-bottle-line", desc: "Expert care for dependency on opioid pain relievers, benzodiazepines, stimulants, and sleep medications." },
  { name: "Stimulants", href: "/what-we-treat/addiction/stimulants/", icon: "ri-flashlight-line", desc: "Evidence-based behavioral treatment including contingency management for methamphetamine and cocaine use disorder." },
];

const STATS = [
  { num: "1 in 7", label: "Americans experience a substance use disorder at some point in their lifetime" },
  { num: "10%", label: "Of those who need treatment for addiction actually receive it" },
  { num: "3×", label: "Higher recovery rates with professional treatment vs. attempting to quit alone" },
];

const BRAIN_FACTS = [
  { icon: "ri-brain-line", title: "Reward Circuit Hijacking", body: "Addictive substances flood the brain's nucleus accumbens with dopamine at levels 2–10× higher than natural rewards. Over time, the brain downregulates dopamine receptors, making normal pleasures feel flat and the substance feel necessary." },
  { icon: "ri-loop-right-line", title: "Compulsion, Not Choice", body: "Prolonged drug use impairs the prefrontal cortex — the region governing decision-making and impulse control. This is why willpower alone fails: the neural machinery for self-regulation has been structurally compromised." },
  { icon: "ri-dna-line", title: "Genetic Vulnerability", body: "40–60% of addiction risk is genetic. Having a first-degree relative with addiction roughly doubles your risk. This is not destiny — but it means the same exposure creates different risk profiles in different people." },
  { icon: "ri-shield-flash-line", title: "Trauma as a Driver", body: "Adverse childhood experiences (ACEs) dramatically increase addiction risk. Trauma dysregulates the stress response system, making substances an effective — if destructive — coping mechanism for unbearable emotional pain." },
  { icon: "ri-refresh-line", title: "Relapse Is Part of the Disease", body: "Relapse rates for addiction (40–60%) are comparable to those for asthma and hypertension. Relapse is not failure — it is a clinical event that signals a need to adjust treatment, not abandon it." },
  { icon: "ri-heart-pulse-line", title: "Recovery Is Real", body: "Millions of people sustain long-term recovery from addiction. With appropriate treatment, recovery is not just possible — it is the most common outcome for people who engage meaningfully with clinical care." },
];

const WARNING_SIGNS = [
  "Using more of a substance than you planned, or for longer than intended",
  "Repeated failed attempts to cut back or stop",
  "Spending significant time obtaining, using, or recovering from a substance",
  "Strong cravings that are difficult to ignore or resist",
  "Failing to meet responsibilities at work, school, or home",
  "Continuing to use despite relationship, social, or legal problems",
  "Giving up activities you once cared about",
  "Using in physically hazardous situations",
  "Needing more of the substance to get the same effect",
  "Experiencing withdrawal symptoms when you stop or reduce use",
  "Using to avoid or relieve withdrawal symptoms",
  "Feeling unable to function normally without the substance",
];

const JOURNEY_STEPS = [
  { num: "01", title: "Confidential Assessment", body: "A clinical intake — by phone or in person — evaluates your substance use history, withdrawal risk, co-occurring conditions, and life circumstances. There is no obligation. This conversation guides which level of care is clinically indicated.", icon: "ri-file-list-line" },
  { num: "02", title: "Benefits Verification", body: "Our admissions team contacts your insurance carrier directly to verify your specific coverage for PHP, IOP, and OP. You receive a clear picture of what your plan will cover before you commit to anything.", icon: "ri-shield-check-line" },
  { num: "03", title: "Medical Clearance & Detox (If Needed)", body: "If withdrawal management is medically necessary, we coordinate with a partner detox facility. Once medically stable, you transition directly into our outpatient programming — often within days.", icon: "ri-stethoscope-line" },
  { num: "04", title: "Structured Programming (PHP / IOP / OP)", body: "You enter the level of care that matches your clinical needs. PHP provides the most intensive structure; IOP and OP are designed around your work and family life. Most clients step through levels as they progress.", icon: "ri-calendar-check-line" },
  { num: "05", title: "Aftercare & Continuing Support", body: "Recovery doesn't end when programming does. We support the transition to ongoing outpatient care, peer support groups, alumni community, and community resources — sustaining the work you've done long-term.", icon: "ri-road-map-line" },
];

export default function AddictionIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[80vh] flex-col justify-end overflow-hidden text-white lg:min-h-[700px]">
        <Image src={IMG} alt="Addiction treatment in Seattle, WA — Mountain View Treatment" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: "linear-gradient(to top, #0a100d 0%, #0a100dec 42%, #0a100d55 68%, transparent 100%)" }} />
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 pt-32 lg:px-12 lg:pb-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--mvt-teal-light)]">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--mvt-teal-light)]" />
            What We Treat
          </p>
          <h1 className="mt-6 max-w-3xl font-heading text-[52px] leading-[1.0] tracking-tight text-white sm:text-[68px] lg:text-[84px]">
            Addiction <span className="italic text-[var(--mvt-teal-light)]">Treatment</span>
          </h1>
          <p className="mt-6 max-w-lg text-[16px] leading-7 text-white/70">
            Mountain View Treatment provides evidence-based outpatient care for substance use disorders in Seattle, Washington. Our clinical approach combines proven therapies with individualized support across our full continuum of care.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={SITE.phone.href} className="inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-[var(--mvt-ink)]">
              <i className="ri-phone-fill text-[15px]" aria-hidden="true" />
              {SITE.phone.display}
            </a>
            <Link href="/admissions/" className="inline-flex items-center gap-2.5 border border-white/40 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white/10">
              Verify Insurance <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Substance cards */}
      <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
            Substances We Treat
          </p>
          <h2 className="mt-5 font-heading text-[38px] leading-tight tracking-tight sm:text-[50px]">
            Specialized Care for <span className="italic">Every Substance</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--mvt-text)]">
            Each substance use disorder has distinct clinical features, withdrawal profiles, and evidence-based treatment approaches. Select your specific condition below for detailed information.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SUBSTANCES.map((s) => (
              <Link key={s.name} href={s.href} className="group flex flex-col justify-between border border-black/8 bg-white p-8 transition hover:border-[var(--mvt-teal)]/50 hover:shadow-lg">
                <div>
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-[var(--mvt-cream)] text-[var(--mvt-teal)] transition group-hover:bg-[var(--mvt-teal)] group-hover:text-white">
                    <i className={`${s.icon} text-2xl`} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-heading text-[28px] leading-tight">{s.name}</h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[var(--mvt-text)]">{s.desc}</p>
                </div>
                <div className="mt-7 flex items-center gap-2 border-t border-black/8 pt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-teal)] transition group-hover:gap-3">
                  Learn More <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding Addiction as a Disease */}
      <section className="bg-[var(--mvt-forest-deep)] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[var(--mvt-teal-light)]">
                The Science
              </p>
              <h2 className="mt-5 font-heading text-[38px] leading-[1.05] text-white sm:text-[50px]">
                Addiction Is a Brain Disease, <span className="italic">Not a Moral Failing</span>
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-white/70">
                Decades of neuroscience research have established beyond any reasonable doubt that substance use disorder is a chronic medical condition — one that changes brain structure and function in measurable, observable ways. Understanding this changes everything about how treatment works.
              </p>
              <div className="mt-8 border-l-2 border-[var(--mvt-teal-light)]/50 pl-5">
                <p className="text-[13px] italic leading-[1.65] text-white/60">
                  "Addiction is defined as a treatable, chronic medical disease involving complex interactions among brain circuits, genetics, the environment, and an individual's life experiences."
                </p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-teal-light)]/70">
                  — American Society of Addiction Medicine
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {BRAIN_FACTS.map((fact) => (
                <div key={fact.title} className="border border-white/10 bg-white/5 p-6">
                  <span className="inline-flex h-9 w-9 items-center justify-center border border-[var(--mvt-teal-light)]/30 text-[var(--mvt-teal-light)]">
                    <i className={`${fact.icon} text-lg`} aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-[13px] font-semibold text-white">{fact.title}</p>
                  <p className="mt-2 text-[12px] leading-[1.65] text-white/65">{fact.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[var(--mvt-ink)] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-12">
          <div className="grid gap-8 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
            {STATS.map((s) => (
              <div key={s.num} className="text-center sm:px-8">
                <p className="font-heading text-[52px] leading-none text-white">{s.num}</p>
                <p className="mt-3 text-[13px] leading-5 text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signs It's Time to Seek Help */}
      <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
                <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
                Self-Assessment
              </p>
              <h2 className="mt-5 font-heading text-[38px] leading-[1.05] tracking-tight sm:text-[50px]">
                Signs It May Be Time to <span className="italic">Seek Help</span>
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-[var(--mvt-text)]">
                The DSM-5 defines substance use disorder using 11 clinical criteria. The presence of just 2 or more within a 12-month period constitutes a diagnosable condition — regardless of the substance involved.
              </p>
              <p className="mt-4 text-[15px] leading-[1.75] text-[var(--mvt-text)]">
                If you recognize yourself or someone you love in the list below, it is worth a conversation with a clinician. A confidential assessment costs nothing and carries no obligation.
              </p>
              <a
                href={SITE.phone.href}
                className="mt-8 inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--mvt-ink)]"
              >
                <i className="ri-phone-fill" aria-hidden="true" />
                Free Confidential Assessment
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:content-start">
              {WARNING_SIGNS.map((sign, i) => (
                <div key={sign} className="flex items-start gap-4 border border-black/8 bg-white p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-[var(--mvt-cream)] font-heading text-[13px] font-light text-[var(--mvt-teal)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[13px] leading-[1.6] text-[var(--mvt-text)]">{sign}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="bg-white text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
                <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
                Our Approach
              </p>
              <h2 className="mt-5 font-heading text-[38px] leading-[1.05] tracking-tight sm:text-[50px]">
                Evidence-Based Care, <span className="italic">Delivered With Discretion</span>
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-[var(--mvt-text)]">
                Addiction is a complex brain condition, not a moral failing. Mountain View Treatment's clinical model integrates the highest-evidence behavioral therapies with individualized support — treating the whole person across the continuum of care that best fits their life.
              </p>
              <a href={SITE.phone.href} className="mt-8 inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--mvt-ink)]">
                <i className="ri-phone-fill" aria-hidden="true" />
                Speak With Admissions
              </a>
            </div>
            <div className="space-y-0 divide-y divide-black/8 border-y border-black/8">
              {[
                { icon: "ri-award-line", title: "Evidence-Based Protocols", body: "Every treatment modality we use — CBT, MAT, contingency management, EMDR, somatic experiencing — is supported by clinical research." },
                { icon: "ri-user-line", title: "Individualized Treatment Plans", body: "Your care plan is built around your specific substance use history, co-occurring conditions, life circumstances, and goals." },
                { icon: "ri-shield-check-line", title: "Dual Diagnosis Capable", body: "Depression, anxiety, trauma, and ADHD frequently co-occur with addiction. We treat both concurrently with an integrated clinical team." },
                { icon: "ri-lock-2-line", title: "Complete Confidentiality", body: "Substance use disorder treatment records are protected by both HIPAA and 42 CFR Part 2 — the highest level of federal health information privacy." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-6 py-6">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--mvt-cream)] text-[var(--mvt-teal)]">
                    <i className={`${item.icon} text-xl`} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold text-[var(--mvt-ink)]">{item.title}</p>
                    <p className="mt-1.5 text-[13px] leading-[1.65] text-[var(--mvt-text)]">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Journey */}
      <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="text-center">
            <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
              What to Expect
              <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
            </p>
            <h2 className="mt-5 font-heading text-[38px] leading-tight tracking-tight sm:text-[50px]">
              Your Path Through <span className="italic">Treatment</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[var(--mvt-text)]">
              From the first call to long-term recovery, here is what the journey looks like at Mountain View Treatment.
            </p>
          </div>

          <div className="mt-14 space-y-4">
            {JOURNEY_STEPS.map((step, i) => (
              <div key={step.num} className="grid items-start gap-6 border border-black/8 bg-white p-8 lg:grid-cols-[80px_1fr_2fr]">
                {/* Number */}
                <div className="flex items-center gap-4 lg:block">
                  <span className="font-heading text-[42px] font-light leading-none text-[var(--mvt-teal)]/25">
                    {step.num}
                  </span>
                </div>
                {/* Title + icon */}
                <div className="flex items-start gap-4 lg:flex-col lg:gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--mvt-cream)] text-[var(--mvt-teal)]">
                    <i className={`${step.icon} text-xl`} aria-hidden="true" />
                  </span>
                  <p className="font-heading text-[20px] leading-tight text-[var(--mvt-ink)] lg:mt-1">{step.title}</p>
                </div>
                {/* Body */}
                <p className="text-[14px] leading-[1.7] text-[var(--mvt-text)] lg:pt-1">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center gap-4">
            <a
              href={SITE.phone.href}
              className="inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--mvt-ink)]"
            >
              <i className="ri-phone-fill" aria-hidden="true" />
              {SITE.phone.display}
            </a>
            <Link
              href="/admissions/"
              className="inline-flex items-center gap-2.5 border border-[var(--mvt-ink)]/25 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-ink)] transition hover:border-[var(--mvt-ink)]"
            >
              Verify Insurance <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FinancialConcierge />
    </>
  );
}
