import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/views/shared/CtaBanner";
import PageHero from "@/views/shared/PageHero";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const HERO =
  "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images/nbt_referrals_hero01.jpg";

/* ─── Data ─────────────────────────────────────────────────── */

const WHY_REFER = [
  {
    icon: "ri-award-line",
    title: "38+ Years of Clinical Excellence",
    body: "Since 1988, Northbound has built one of the most trusted treatment programs in Southern California. Our longevity and outcomes give referring clinicians confidence that their patients are in experienced hands.",
  },
  {
    icon: "ri-team-line",
    title: "200+ Years Combined Leadership Expertise",
    body: "Our clinical leadership team — including a double board-certified Medical Director in Psychiatry and Addiction Medicine — brings unmatched depth to complex, co-occurring presentations.",
  },
  {
    icon: "ri-heart-pulse-line",
    title: "1:1 Staff-to-Client Ratio",
    body: "Our staffing model ensures each client receives highly individualized attention. With 1/3 of our staff being alumni themselves, clinical empathy runs throughout every level of care.",
  },
  {
    icon: "ri-test-tube-line",
    title: "Evidence-Based & Trauma-Informed",
    body: "We use validated clinical modalities — CBT, DBT, EMDR, MAT, somatic therapy — combined with trauma-informed care to address root causes, not just symptoms.",
  },
  {
    icon: "ri-file-chart-line",
    title: "Independent Outcomes Data",
    body: "A 2015 USC-affiliated outcomes study found >97% abstinence from illicit drugs and >95% from alcohol among clients 6–12 months post-treatment, along with a 97% reduction in depressive and anxiety symptoms.",
  },
  {
    icon: "ri-refresh-line",
    title: "Full Continuum of Care",
    body: "Detox → Residential → PHP → IOP → Sober Living → Aftercare. We can receive patients at any point in their treatment journey and step them up or down as clinically indicated.",
  },
];

const REFERRAL_STEPS = [
  {
    number: "01",
    title: "Contact Our Clinical Liaison",
    body: "Call (866) 311-0003 or submit a referral form. You'll be connected with our dedicated clinical liaison team — clinicians, not call center staff.",
  },
  {
    number: "02",
    title: "Clinical Consultation",
    body: "We conduct a thorough clinical review of your patient's history, presentation, and needs so we can confirm appropriate placement and level of care.",
  },
  {
    number: "03",
    title: "Insurance & Financial Clearance",
    body: "Our admissions team verifies benefits and coordinates financial arrangements, removing this burden from the referring provider and the patient's family.",
  },
  {
    number: "04",
    title: "Seamless Transfer",
    body: "We coordinate all travel logistics, medical record transfer, and medication management — ensuring a smooth, low-stress transition into our care.",
  },
  {
    number: "05",
    title: "Ongoing Collaboration",
    body: "We provide referring providers with regular progress updates (with appropriate release of information) and coordinate discharge planning for continuity of care.",
  },
];

const PROGRAMS = [
  { icon: "ri-capsule-line", label: "Medically Supervised Detox (MAT available)" },
  { icon: "ri-home-heart-line", label: "Residential Treatment" },
  { icon: "ri-hospital-line", label: "Partial Hospitalization (PHP)" },
  { icon: "ri-calendar-check-line", label: "Intensive Outpatient (IOP)" },
  { icon: "ri-building-line", label: "Sober Living / Transitional Housing" },
  { icon: "ri-wifi-line", label: "Virtual/Telehealth IOP (CA & WA)" },
  { icon: "ri-brain-line", label: "Dual Diagnosis / Co-Occurring Disorders" },
  { icon: "ri-family-line", label: "Family Therapy & Education" },
  { icon: "ri-graduation-cap-line", label: "Collegebound® & Careerbound® Programs" },
  { icon: "ri-shield-star-line", label: "VA Mental Health & Veterans Track" },
];

/* ─── Page ─────────────────────────────────────────────────── */

export default function ReferralsPage() {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow="Professional Referrals"
        headline="Refer Your Patients to Northbound"
        italicWord="Northbound"
        body="Northbound Treatment Services has been a trusted clinical partner for physicians, therapists, hospitals, and EAPs across the country for over 38 years. Our dedicated referral liaison team makes every transfer seamless."
        image={HERO}
        imageAlt="Clinical professionals reviewing a patient referral at a Southern California treatment center"
        breadcrumbs={[{ label: "Admissions", href: "/admissions/" }, { label: "Professional Referrals" }]}
        primaryCta={{ label: "Submit a Referral", href: "tel:8663110003" }}
        secondaryCta={{ label: "Download Referral Form", href: "/admissions/" }}
      />

      {/* 2 — Intro (white) */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">
                <AutoLinkedText>{"Why Refer to Northbound"}</AutoLinkedText>
              </p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                A Partner Your{" "}
                <span className="italic text-terracotta">Patients Can Trust</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-espresso/70">
                <AutoLinkedText>{"When you refer a patient to Northbound, you're partnering with a program\n                that has been transforming lives since 1988. We understand what referring\n                clinicians need: clear communication, fast intake, clinical transparency,\n                and the confidence that your patient will receive exceptional care."}</AutoLinkedText>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/70">
                <AutoLinkedText>{"Our clinical team — led by licensed MDs, PhDs, LMFTs, LCSWs, and\n                CADCs — operates with organizational health principles that mirror the\n                recovery values we teach. That means transparency, honesty, and genuine\n                partnership at every step."}</AutoLinkedText>
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:8663110003"
                  className="inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta"
                >
                  <i className="ri-phone-line" />
                  Speak with Our Liaison Team
                </a>
              </div>
            </div>
            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-sand-dark bg-sand-dark">
              {[
                { value: "38+", label: "Years in Operation", icon: "ri-time-line" },
                { value: "10,000+", label: "Patients Served", icon: "ri-user-heart-line" },
                { value: ">97%", label: "Abstinence Outcomes", icon: "ri-bar-chart-line" },
                { value: "1:1", label: "Staff-to-Client Ratio", icon: "ri-team-line" },
              ].map((s, i) => (
                <div key={s.label} className={`flex flex-col gap-3 p-8 ${i % 2 === 0 ? "bg-white" : "bg-sand"}`}>
                  <i className={`${s.icon} text-xl text-terracotta`} />
                  <p className="font-heading text-3xl font-bold text-navy"><AutoLinkedText>{s.value}</AutoLinkedText></p>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-espresso/50"><AutoLinkedText>{s.label}</AutoLinkedText></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Why Refer (navy) */}
      <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-navy-light/50" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-terracotta/10" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Clinical Confidence</p>
            <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Why Clinicians <span className="italic text-terracotta">Choose Northbound</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHY_REFER.map((item) => (
              <div key={item.title} className="border border-white/10 bg-white/5 p-8 transition hover:bg-white/8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center bg-terracotta/20">
                  <i className={`${item.icon} text-xl text-terracotta`} />
                </div>
                <h3 className="font-heading text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65"><AutoLinkedText>{item.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Programs We Accept (slate) */}
      <section className="bg-sand py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Levels of Care</p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-navy md:text-5xl">
                Programs We <span className="italic text-terracotta">Offer</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-espresso/70">
                <AutoLinkedText>{"We provide a full continuum of care so you can refer patients at any stage\n                of their journey. From acute medically supervised detox to outpatient\n                alumni support, we have a clinically appropriate placement for virtually\n                every presentation."}</AutoLinkedText>
              </p>
              <p className="mt-4 text-base leading-relaxed text-espresso/70">
                <AutoLinkedText>{"We specialize in complex dual-diagnosis cases, co-occurring trauma,\n                young adults (Collegebound® and Careerbound®), veterans, and clients\n                with high treatment resistance."}</AutoLinkedText>
              </p>
              <a
                href="tel:8663110003"
                className="mt-8 inline-flex items-center gap-2 bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta"
              >
                <i className="ri-phone-line" />
                Discuss a Specific Case
              </a>
            </div>
            <div className="grid grid-cols-1 gap-px overflow-hidden border border-sand-dark bg-sand-dark sm:grid-cols-2">
              {PROGRAMS.map((p, i) => (
                <div key={p.label} className={`flex items-center gap-4 p-5 ${i % 2 === 0 ? "bg-white" : "bg-sand"}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy/5">
                    <i className={`${p.icon} text-base text-navy`} />
                  </span>
                  <span className="text-sm font-semibold text-navy">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Referral Process (white) */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Simple & Fast</p>
            <h2 className="font-heading text-4xl font-bold text-navy md:text-5xl">
              The Referral <span className="italic text-terracotta">Process</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-espresso/70">
              <AutoLinkedText>{"We've designed our referral intake to be as frictionless as possible.\n              Most referrals are processed and confirmed within hours."}</AutoLinkedText>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REFERRAL_STEPS.map((step, i) => (
              <div key={step.number} className={`border border-sand-dark p-8 ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                <span className="font-heading text-4xl font-bold text-navy/10">{step.number}</span>
                <h3 className="font-heading mt-4 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/65"><AutoLinkedText>{step.body}</AutoLinkedText></p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <a
              href="tel:8663110003"
              className="inline-flex items-center gap-2 bg-terracotta px-8 py-4 text-sm font-semibold text-white transition hover:bg-terracotta-light"
            >
              <i className="ri-phone-line" />
              Call Our Referral Liaison — (866) 311-0003
            </a>
          </div>
        </div>
      </section>

      {/* 6 — Insurance accepted (navy) */}
      <section className="bg-navy py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-terracotta">Insurance</p>
              <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
                We Accept 15+ Major Insurance Plans
              </h3>
              <p className="mt-2 text-sm text-white/60">
                <AutoLinkedText>{"Aetna · Anthem · BCBS · Cigna · Health Net · Magellan · TriCare · Compsych · and more"}</AutoLinkedText>
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-4">
              <Link
                href="/insurance/"
                className="inline-flex items-center gap-2 bg-terracotta px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-terracotta-light"
              >
                View All Insurance
                <i className="ri-arrow-right-line" />
              </Link>
              <a
                href="tel:8663110003"
                className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <i className="ri-phone-line" />
                Verify Benefits
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — CTA Banner */}
      <CtaBanner
        eyebrow="Partner With Us"
        headline="Ready to Refer Your Patient to Northbound?"
        body="Our clinical liaison team is available 24 hours a day. We make the referral process fast, transparent, and collaborative."
        primaryCta={{ label: "Submit a Referral Now", href: "tel:8663110003" }}
        secondaryCta={{ label: "(866) 311-0003", href: "tel:8663110003" }}
      />
    </>
  );
}
