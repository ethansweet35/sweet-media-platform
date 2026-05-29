import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TherapyModalityHero from "@/components/therapy/TherapyModalityHero";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF } from "@/data/site";
import SubstanceFaq from "@/components/addiction/SubstanceFaq";

const SUPABASE = "https://yfwyxafsgexejjebkwor.supabase.co/storage/v1/object/public/site-assets/images";

const HERO_IMAGE = `${SUPABASE}/mbh_therapy_services_hero01.jpg`;

const fallback: Metadata = {
  title: "Therapy Types | Missouri Behavioral Health — Springfield, MO",
  description:
    "Evidence-based therapy services at Missouri Behavioral Health — CBT, DBT, EMDR, family, group, holistic, music, and yoga therapy in Springfield, MO and via telehealth statewide.",
  alternates: { canonical: "/services" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/services", fallback);
}

const THERAPIES = [
  {
    abbr: "CBT",
    label: "Cognitive Behavioral Therapy",
    href: "/cognitive-behavioral-therapy-springfield-mo",
    icon: "ri-brain-line",
    category: "Evidence-Based",
    desc: "Identifies and restructures the thought patterns that drive addictive behavior and emotional dysregulation. The most researched therapy in behavioral health.",
  },
  {
    abbr: "DBT",
    label: "Dialectical Behavior Therapy",
    href: "/dialectical-behavioral-therapy-springfield-mo",
    icon: "ri-heart-pulse-line",
    category: "Evidence-Based",
    desc: "Builds four core skill sets — mindfulness, distress tolerance, emotional regulation, and interpersonal effectiveness — essential for lasting recovery.",
  },
  {
    abbr: "EMDR",
    label: "EMDR Therapy",
    href: "/emdr-therapy-springfield-mo",
    icon: "ri-eye-line",
    category: "Trauma-Focused",
    desc: "Eye Movement Desensitization and Reprocessing targets traumatic memories at the neurological level — particularly effective for PTSD, trauma, and addiction with trauma roots.",
  },
  {
    abbr: "Family",
    label: "Family Therapy",
    href: "/family-therapy-springfield-mo",
    icon: "ri-parent-line",
    category: "Relational",
    desc: "Rebuilds communication, establishes healthy boundaries, and helps families become an asset to recovery rather than an unintentional obstacle.",
  },
  {
    abbr: "Group",
    label: "Group Therapy",
    href: "/group-therapy-springfield-mo",
    icon: "ri-group-line",
    category: "Peer-Based",
    desc: "Structured peer group sessions that build community, accountability, and shared understanding — a cornerstone of every level of care at MBH.",
  },
  {
    abbr: "Holistic",
    label: "Holistic Therapy",
    href: "/holistic-therapy-springfield",
    icon: "ri-leaf-line",
    category: "Integrative",
    desc: "Mindfulness, breathwork, meditation, and body-based practices that address the neurological and physical dimensions of addiction alongside clinical work.",
  },
  {
    abbr: "Music",
    label: "Music Therapy",
    href: "/music-therapy-springfield",
    icon: "ri-music-line",
    category: "Expressive",
    desc: "Uses musical engagement to access emotions, reduce stress, and process experiences that are difficult to articulate verbally — particularly effective in early recovery.",
  },
  {
    abbr: "Yoga",
    label: "Yoga Therapy",
    href: "/yoga-therapy-springfield",
    icon: "ri-mental-health-line",
    category: "Somatic",
    desc: "Therapeutic yoga rebuilds the mind-body connection disrupted by addiction, reduces cravings and anxiety, and develops somatic self-regulation skills.",
  },
  {
    abbr: "Therapists",
    label: "Our Therapists",
    href: "/therapist-springfield-mo",
    icon: "ri-user-heart-line",
    category: "Our Team",
    desc: "Meet the licensed counselors, therapists, and psychiatric professionals who deliver individualized care across every program at Missouri Behavioral Health.",
  },
];

const APPROACH_PILLARS = [
  {
    icon: "ri-file-list-3-line",
    title: "Individualized treatment plans",
    desc: "No two clients follow the same combination of therapies. Your clinical team designs a plan based on your specific diagnoses, history, and goals — and updates it as you progress.",
  },
  {
    icon: "ri-refresh-line",
    title: "Modality integration",
    desc: "Our therapies are designed to complement each other. CBT and DBT skills reinforce what you process in EMDR; group therapy builds the community that holistic practices ground you in.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Evidence-based standard",
    desc: "Every therapy we offer has a strong clinical evidence base. We use what works — and we measure outcomes to confirm that it's working for each individual client.",
  },
  {
    icon: "ri-mental-health-line",
    title: "Dual-diagnosis capable",
    desc: "All therapeutic modalities are delivered with co-occurring mental health conditions in mind. Our clinicians are trained to treat the full clinical picture, not just the addiction.",
  },
];

const FAQS = [
  {
    q: "How do I know which therapy is right for me?",
    a: "Your clinical team conducts a comprehensive intake assessment that examines your history, diagnoses, trauma background, and treatment goals. Based on that assessment, a personalized treatment plan identifies which therapies — and in what combination — are most clinically appropriate for you. You'll also have ongoing input as your plan evolves.",
  },
  {
    q: "Can I receive multiple types of therapy at the same time?",
    a: "Yes — and in most cases, you will. Evidence shows that combining modalities produces better outcomes than single-modality treatment. For example, a client in PHP might receive CBT and DBT in group formats, individual EMDR for trauma, and yoga therapy as a somatic complement. Your plan is designed for integration.",
  },
  {
    q: "Are your therapists licensed?",
    a: "All therapists at Missouri Behavioral Health hold active Missouri state licensure — LPC (Licensed Professional Counselor), LCSW (Licensed Clinical Social Worker), or equivalent. Many hold additional certifications in specific modalities such as EMDR, DBT-Linehan Board certified, or Registered Yoga Therapist (C-IAYT).",
  },
  {
    q: "Does insurance cover therapy at MBH?",
    a: "Yes. Individual and group therapy is covered by most private insurance plans under mental health and substance use disorder benefits. We verify your benefits before treatment begins — at no cost to you. We accept Aetna, Anthem, BCBS, Cigna, Beacon, Carelon, GEHA, and Cox Health.",
  },
  {
    q: "Is telehealth therapy available?",
    a: "Yes — individual therapy and some group therapy formats are available via HIPAA-compliant telehealth. This makes evidence-based clinical care accessible to clients throughout Missouri who cannot attend in person.",
  },
];

export default function TherapyServicesPage() {
  return (
    <main>
      <TherapyModalityHero
        variant="hub"
        heroImage={HERO_IMAGE}
        heroImageAlt="Licensed therapist at Missouri Behavioral Health"
      />

      {/* ── THERAPY DIRECTORY ─────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]" id="therapies">
        <div className={CONTAINER}>
          <div className="mb-14">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                All Therapy Types
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              The full clinical toolkit.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Therapy at MBH is not one-size-fits-all. Your plan draws from the modalities best suited to your specific diagnoses, history, and recovery goals.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {THERAPIES.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex flex-col gap-5 rounded-3xl border border-mbh-forest/8 bg-cream p-7 transition-all hover:border-mbh-green/25 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mbh-green/10 transition-colors group-hover:bg-mbh-green/15">
                    <i className={`${t.icon} text-2xl text-mbh-green`} aria-hidden />
                  </span>
                  <span className="rounded-full bg-mbh-forest/5 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-mbh-forest/50">
                    {t.category}
                  </span>
                </div>
                <div>
                  <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-mbh-green/70">{t.abbr}</p>
                  <p className="font-display text-[1rem] font-semibold leading-snug text-mbh-forest">{t.label}</p>
                  <p className="mt-2.5 font-body text-sm leading-relaxed text-mbh-body">{t.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 font-body text-xs font-semibold text-mbh-green opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <i className="ri-arrow-right-line" aria-hidden />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ──────────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Our Philosophy
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Therapy is most effective when it's integrated.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              A single modality can help. A carefully combined treatment plan, aligned across clinicians and levels of care, creates lasting change.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {APPROACH_PILLARS.map((p) => (
              <div key={p.title} className="flex gap-5 rounded-3xl border border-mbh-forest/8 bg-white p-8 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mbh-green/10 mt-0.5">
                  <i className={`${p.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{p.title}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSURANCE ─────────────────────────────────────────────────────── */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Coverage</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                Most insurance covers therapy at MBH.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Individual, group, and specialized therapy is covered by most private insurance plans under mental health and substance use disorder benefits. We verify your coverage before treatment begins — at no cost.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/verify-insurance" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:bg-mbh-mint">
                  <i className="ri-shield-check-line" aria-hidden /> Verify my coverage
                </Link>
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">
                  <i className="ri-phone-line" aria-hidden /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Aetna", "Anthem Blue Cross", "Blue Cross Blue Shield", "Cigna", "Beacon Health", "Carelon", "GEHA", "Cox Health"].map((c) => (
                <div key={c} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/6 px-4 py-3">
                  <i className="ri-check-line text-mbh-sage text-sm" aria-hidden />
                  <span className="font-body text-sm text-white/80">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={`${CONTAINER} max-w-4xl`}>
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">FAQ</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Questions about therapy at MBH.
            </h2>
          </div>
          <SubstanceFaq items={FAQS} />
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Start Today</p>
              <h2 className="mt-2 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold text-white">
                Ready to find the right therapist?
              </h2>
              <p className="mt-2 font-body text-sm text-white/50">
                Our clinical team will match you with the right modalities and clinician for your situation.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 font-body text-sm font-semibold text-mbh-forest shadow-xl transition hover:bg-mbh-mint">
                <i className="ri-phone-fill" aria-hidden /> Call Now — {PHONE_DISPLAY}
              </a>
              <Link href="/verify-insurance" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">
                Verify Insurance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
