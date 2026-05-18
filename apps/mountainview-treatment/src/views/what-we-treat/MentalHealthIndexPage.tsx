import Image from "next/image";
import Link from "next/link";
import FinancialConcierge from "@/components/feature/FinancialConcierge";
import { SITE } from "@/lib/site";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_mh_hub.jpg";

const CONDITIONS = [
  { name: "Anxiety", href: "/what-we-treat/mental-health/anxiety/", icon: "ri-mental-health-line", desc: "Evidence-based outpatient treatment for GAD, panic disorder, social anxiety, and related anxiety presentations." },
  { name: "Depression", href: "/what-we-treat/mental-health/depression/", icon: "ri-emotion-unhappy-line", desc: "Integrated care for major depressive disorder, persistent depressive disorder, and treatment-resistant depression." },
  { name: "Bipolar Disorder", href: "/what-we-treat/mental-health/bipolar/", icon: "ri-toggle-line", desc: "Specialized outpatient care for all bipolar spectrum presentations, with expert medication coordination and IPSRT." },
  { name: "Trauma & PTSD", href: "/what-we-treat/mental-health/trauma/", icon: "ri-ghost-2-line", desc: "EMDR, trauma-focused CBT, and somatic experiencing for PTSD, complex trauma, and trauma-related conditions." },
  { name: "Personality Disorders", href: "/what-we-treat/mental-health/personality-disorders/", icon: "ri-scales-line", desc: "DBT and schema therapy for BPD and the full personality disorder spectrum, with specialized group programming." },
  { name: "Schizoaffective Disorder", href: "/what-we-treat/mental-health/schizoaffective/", icon: "ri-brain-line", desc: "Integrated medication management and psychosocial support for schizoaffective disorder and psychosis-spectrum conditions." },
];

const PRINCIPLES = [
  { icon: "ri-award-line", title: "Evidence-Based First", body: "Every treatment modality we use is supported by clinical research. We don't experiment with your wellbeing — we apply the therapies that have proven most effective." },
  { icon: "ri-user-line", title: "Individualized Care", body: "No two presentations of depression, anxiety, or trauma are identical. Your treatment plan is built around your specific clinical picture, history, and goals." },
  { icon: "ri-shield-check-line", title: "Dual Diagnosis Capable", body: "Mental health conditions rarely present in isolation. Co-occurring substance use, trauma, and other psychiatric diagnoses are addressed concurrently by our integrated team." },
  { icon: "ri-lock-2-line", title: "Complete Confidentiality", body: "HIPAA-protected care in a private, discreet environment. Your employer, family, and community receive no information without your explicit consent." },
];

const STATS = [
  { num: "1 in 5", label: "Americans experience a mental health condition each year" },
  { num: "55%", label: "Of adults with mental illness receive no treatment in a given year" },
  { num: "11 yrs", label: "Average delay between symptom onset and first mental health treatment" },
];

export default function MentalHealthIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[80vh] flex-col justify-end overflow-hidden text-white lg:min-h-[700px]">
        <Image src={IMG} alt="Mental health treatment in Seattle, WA — Mountain View Treatment" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: "linear-gradient(to top, #0a100d 0%, #0a100dec 42%, #0a100d55 68%, transparent 100%)" }} />
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-16 pt-32 lg:px-12 lg:pb-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--mvt-teal-light)]">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-[var(--mvt-teal-light)]" />
            What We Treat
          </p>
          <h1 className="mt-6 max-w-3xl font-heading text-[52px] leading-[1.0] tracking-tight text-white sm:text-[68px] lg:text-[84px]">
            Mental Health <span className="italic text-[var(--mvt-teal-light)]">Treatment</span>
          </h1>
          <p className="mt-6 max-w-lg text-[16px] leading-7 text-white/70">
            Mountain View Treatment provides evidence-based outpatient care for the full spectrum of mental health conditions in Seattle, Washington — from anxiety and depression to trauma, bipolar disorder, and complex psychiatric presentations.
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

      {/* Condition cards */}
      <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
            Conditions We Treat
          </p>
          <h2 className="mt-5 font-heading text-[38px] leading-tight tracking-tight sm:text-[50px]">
            Specialized Care for <span className="italic">Every Condition</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--mvt-text)]">
            Each mental health condition has distinct clinical features, evidence-based treatments, and unique presentations. Select your specific condition for detailed information about how we approach treatment.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONDITIONS.map((c) => (
              <Link key={c.name} href={c.href} className="group flex flex-col justify-between border border-black/8 bg-white p-8 transition hover:border-[var(--mvt-teal)]/50 hover:shadow-lg">
                <div>
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-[var(--mvt-cream)] text-[var(--mvt-teal)] transition group-hover:bg-[var(--mvt-teal)] group-hover:text-white">
                    <i className={`${c.icon} text-2xl`} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-heading text-[26px] leading-tight">{c.name}</h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[var(--mvt-text)]">{c.desc}</p>
                </div>
                <div className="mt-7 flex items-center gap-2 border-t border-black/8 pt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--mvt-teal)] transition group-hover:gap-3">
                  Learn More <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Mental health is medical */}
      <section className="bg-white text-[var(--mvt-ink)]">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-muted)]">
                <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-stone)]" />
                The Science
              </p>
              <h2 className="mt-5 font-heading text-[38px] leading-[1.05] tracking-tight sm:text-[50px]">
                Mental Health Conditions Are <span className="italic">Medical Conditions</span>
              </h2>
              <p className="mt-5 text-[15px] leading-[1.75] text-[var(--mvt-text)]">
                Decades of neuroscience, genetics, and clinical research have established beyond any reasonable doubt that mental health conditions involve measurable changes in brain structure, neurochemistry, immune function, and nervous system regulation. They are not character flaws, weakness, or a failure of willpower.
              </p>
              <p className="mt-4 text-[15px] leading-[1.75] text-[var(--mvt-text)]">
                This matters clinically because it changes how we treat them. Evidence-based approaches that directly address the underlying neurobiology and learned behavioral patterns — not just symptom management — produce lasting change.
              </p>
              <a href={SITE.phone.href} className="mt-8 inline-flex items-center gap-3 bg-[var(--mvt-teal)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-[var(--mvt-ink)]">
                <i className="ri-phone-fill" aria-hidden="true" />
                Speak With Our Team
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:content-start">
              {[
                { icon: "ri-brain-line", title: "Neurological Basis", body: "Brain imaging consistently shows measurable differences in structure and function in depression, anxiety, PTSD, and bipolar disorder. Treatment produces observable neurological change." },
                { icon: "ri-dna-line", title: "Genetic Component", body: "Most mental health conditions have significant heritability — genetic factors contribute to risk, though environment and experience determine whether vulnerability becomes disorder." },
                { icon: "ri-refresh-line", title: "Neuroplasticity", body: "The brain's capacity for change is the biological basis of psychotherapy's effectiveness. Evidence-based treatment produces lasting neurological change — not just temporary symptom relief." },
                { icon: "ri-heart-pulse-line", title: "Mind-Body Integration", body: "Mental health conditions manifest physically — in sleep, appetite, energy, pain, and immune function. Effective treatment addresses the full-body nature of psychiatric illness." },
                { icon: "ri-shield-flash-line", title: "Trauma Neuroscience", body: "Trauma alters the stress response system, hippocampal volume, and prefrontal cortex function in ways that directly explain PTSD symptoms — and that respond to trauma-focused treatment." },
                { icon: "ri-award-line", title: "Treatable with Evidence", body: "Every condition we treat has an established evidence base. Properly matched, evidence-based treatment produces meaningful, lasting improvement for the large majority of individuals who engage with it." },
              ].map((item) => (
                <div key={item.title} className="border border-black/8 bg-[var(--mvt-cream)] p-6">
                  <span className="inline-flex h-9 w-9 items-center justify-center bg-white text-[var(--mvt-teal)]">
                    <i className={`${item.icon} text-lg`} aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-[13px] font-semibold text-[var(--mvt-ink)]">{item.title}</p>
                  <p className="mt-2 text-[12px] leading-[1.65] text-[var(--mvt-text)]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="bg-[var(--mvt-forest-deep)] text-white">
        <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.30em] text-[var(--mvt-teal-light)]">Our Approach</p>
          <h2 className="mt-5 max-w-2xl font-heading text-[38px] leading-[1.05] text-white sm:text-[50px]">
            Evidence-Based Care, <span className="italic">Delivered With Discretion</span>
          </h2>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="border border-white/10 bg-white/5 p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center border border-[var(--mvt-teal-light)]/30 text-[var(--mvt-teal-light)]">
                  <i className={`${p.icon} text-xl`} aria-hidden="true" />
                </span>
                <p className="mt-5 text-[14px] font-semibold text-white">{p.title}</p>
                <p className="mt-2 text-[13px] leading-[1.6] text-white/65">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={SITE.phone.href} className="inline-flex items-center gap-3 bg-white px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-ink)] transition hover:bg-[var(--mvt-teal)] hover:text-white">
              <i className="ri-phone-fill" aria-hidden="true" />
              {SITE.phone.display}
            </a>
            <Link href="/admissions/" className="inline-flex items-center gap-2.5 border border-white/40 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white/10">
              Verify Insurance <i className="ri-arrow-right-line text-xs" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FinancialConcierge />
    </>
  );
}
