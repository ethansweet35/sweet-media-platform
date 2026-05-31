import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LevelOfCareLayout from "@/components/levels-of-care/LevelOfCareLayout";
import LevelOfCareFaq from "@/components/levels-of-care/LevelOfCareFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Sober Living Homes in Springfield, MO | Missouri Behavioral Health",
  description:
    "Structured, peer-supported sober living homes in Springfield, MO. A safe, substance-free environment bridging treatment and independent living for individuals in recovery.",
  alternates: { canonical: "/sober-living-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/sober-living-springfield-mo", fallback);
}

const WHO_ITS_FOR = [
  { icon: "ri-home-2-line",        title: "Unstable or triggering home environment", desc: "If returning home puts your sobriety at risk, sober living provides a safe, substance-free alternative while treatment continues." },
  { icon: "ri-team-line",          title: "Seeking recovery community", desc: "Living alongside peers in recovery creates accountability, mutual support, and relationships that outlast formal treatment." },
  { icon: "ri-hospital-line",      title: "Transitioning out of residential or PHP", desc: "Sober living bridges the gap between the high structure of inpatient or PHP and the independence of standard outpatient life." },
  { icon: "ri-shield-check-line",  title: "Building independence with accountability", desc: "House rules, curfews, and community meetings provide structure while residents build employment, relationships, and life skills." },
];

const HOUSE_FEATURES = [
  { icon: "ri-shield-line",          label: "Zero-tolerance substance policy" },
  { icon: "ri-time-line",            label: "Structured curfew and check-in schedule" },
  { icon: "ri-group-line",           label: "Weekly house meetings" },
  { icon: "ri-task-line",            label: "Required participation in treatment or meetings" },
  { icon: "ri-tools-line",           label: "Chore responsibilities and life skills practice" },
  { icon: "ri-user-heart-line",      label: "House manager and peer support on-site" },
  { icon: "ri-briefcase-line",       label: "Employment and education support" },
  { icon: "ri-map-pin-2-line",       label: "Convenient location near MBH campus" },
];

const FAQS = [
  { q: "What is sober living and how does it differ from residential rehab?", a: "Residential rehab is a 24-hour clinical treatment environment where medical and therapeutic staff are present around the clock. Sober living is structured, peer-supported housing without on-site clinical staff — it's a step toward independence where house rules, community expectations, and mutual accountability replace clinical supervision." },
  { q: "Do I have to be enrolled in treatment to live in sober living?", a: "Yes — we require all sober living residents to be actively participating in outpatient treatment (IOP or standard outpatient) or attending community recovery meetings (AA/NA) regularly. Sober living is designed to complement treatment, not replace it." },
  { q: "How long can I stay in sober living?", a: "Length of stay is flexible and based on individual progress. Some residents stay for 30–60 days while transitioning to PHP or IOP. Others remain 6–12 months while building financial stability and independent living skills. There's no hard cutoff — progress and readiness guide the timeline." },
  { q: "What are the rules in sober living?", a: "Core rules include a zero-tolerance substance policy (random drug testing), adherence to curfew, participation in house meetings, contribution to household chores, active enrollment in treatment or recovery meetings, and respectful conduct toward housemates and staff. Violating substance rules results in immediate discharge." },
  { q: "Is sober living covered by insurance?", a: "Sober living housing costs are typically not covered by insurance as a standalone service. However, the outpatient treatment you attend while living in the home is generally covered. Our team can help you navigate costs and discuss payment options." },
  { q: "Can I work or go to school while in sober living?", a: "Absolutely — in fact, we encourage it. Rebuilding employment, education, and financial stability is a core part of recovery at this stage. House schedules are designed to accommodate work and school around treatment and meeting commitments." },
];

export default function SoberLivingPage() {
  return (
    <LevelOfCareLayout
      abbr="Sober Living"
      programName="Sober Living Homes"
      currentPath="/sober-living-springfield-mo"
      tagline="Structured, peer-supported housing that bridges treatment and independent life."
      schedule="Residential · 24/7 peer community"
      heroBody="Sober living provides a safe, substance-free home environment where recovery is the shared priority. With structure, accountability, and genuine community, our homes give you the stability to build the life that makes sobriety worth keeping."
      quickFacts={[
        { icon: "ri-home-heart-line",    label: "Environment",  value: "Substance-free residential" },
        { icon: "ri-group-line",         label: "Community",    value: "Peer-supported living" },
        { icon: "ri-shield-check-line",  label: "Drug testing", value: "Random testing required" },
        { icon: "ri-calendar-event-line",label: "Stay length",  value: "Flexible — 30 days to 12 months" },
      ]}
      daySchedule={[
        { time: "7:00 am",  activity: "Morning House Routine", detail: "Wake-up, personal hygiene, and assigned household chores. Structure in the morning sets a disciplined tone for the day." },
        { time: "8:30 am",  activity: "Breakfast & Connection", detail: "Shared community meal — one of the most important bonding rituals in peer recovery environments." },
        { time: "9:00 am",  activity: "Employment, School, or Treatment", detail: "Residents attend work, school, or their scheduled outpatient treatment sessions (IOP or standard outpatient)." },
        { time: "6:00 pm",  activity: "Return & Evening Check-In", detail: "Check-in with the house manager — mood, sobriety status, and any issues from the day are briefly discussed." },
        { time: "7:30 pm",  activity: "Recovery Meeting or Therapy", detail: "Attendance at AA/NA, SMART Recovery, or a scheduled outpatient therapy session is required most evenings." },
        { time: "10:00 pm", activity: "Curfew & Wind-Down", detail: "All residents must be home by curfew. Evening accountability supports consistent sleep and safety." },
      ]}
    >
      {/* ── Who it's for ─────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-start">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Who It's For</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                A home built around recovery.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Where you live matters enormously in recovery. Sober living removes the environmental triggers, isolation, and chaos that fuel relapse — and replaces them with structure, community, and shared accountability.
              </p>
              <div className="mt-10 space-y-6">
                {WHO_ITS_FOR.map((item) => (
                  <div key={item.title} className="flex gap-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10 mt-0.5">
                      <i className={`${item.icon} text-xl text-mbh-green`} aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{item.title}</p>
                      <p className="mt-1 font-body text-sm leading-relaxed text-mbh-body">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-mbh-forest/8 lg:sticky lg:top-28">
              <Image src={SITE_IMAGES.facilityInterior} alt="Missouri Behavioral Health sober living and recovery environment" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,46,24,0.4) 0%, transparent 55%)" }} />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">Peer-first</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-mbh-sage/70">Community recovery environment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── House features ─────────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">What to Expect</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Structure and community, under one roof.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Our sober living homes maintain clear expectations that create the safety and predictability recovery requires — without sacrificing the dignity and autonomy that come with moving forward in life.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOUSE_FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-3 rounded-2xl border border-mbh-forest/8 bg-white px-5 py-4 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${f.icon} text-base text-mbh-green`} aria-hidden />
                </span>
                <span className="font-body text-sm font-medium text-mbh-forest">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Combined with IOP callout ───────────────────────────────────────── */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Pair With Treatment</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                Sober living + IOP: the most effective combination.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Research consistently shows that combining structured sober living with an active IOP or outpatient program produces the highest long-term sobriety rates. The two programs reinforce each other — clinical skills practiced in sessions are tested and strengthened in the living environment.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "24/7 substance-free environment reinforcing daily therapy",
                  "Peer accountability extends clinical learning into real life",
                  "House manager support between therapy sessions",
                  "Immediate action if relapse risk is identified",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mbh-green/20">
                      <i className="ri-check-line text-[9px] text-mbh-sage" aria-hidden />
                    </span>
                    <span className="font-body text-sm text-white/65">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/iop-missouri" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-mbh-forest transition hover:bg-mbh-mint">
                  Learn about IOP <i className="ri-arrow-right-line" aria-hidden />
                </Link>
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/8">
                  <i className="ri-phone-line" aria-hidden /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image src={SITE_IMAGES.therapyGroup} alt="Group therapy session at Missouri Behavioral Health" width={1200} height={900} sizes="(min-width: 1024px) 50vw, 100vw" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,46,24,0.3) 0%, transparent 50%)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={`${CONTAINER} max-w-4xl`}>
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">FAQ</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Common questions about sober living.
            </h2>
          </div>
          <LevelOfCareFaq items={FAQS} />
        </div>
      </section>
    </LevelOfCareLayout>
  );
}
