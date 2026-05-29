import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LevelOfCareLayout from "@/components/levels-of-care/LevelOfCareLayout";
import LevelOfCareFaq from "@/components/levels-of-care/LevelOfCareFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Intensive Outpatient Program (IOP) | Missouri Behavioral Health",
  description:
    "IOP at Missouri Behavioral Health — 9–15 hours per week of structured group and individual therapy with morning and evening scheduling. Serving Springfield, MO and statewide virtually.",
  alternates: { canonical: "/iop-missouri" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/iop-missouri", fallback);
}

const WHO_ITS_FOR = [
  { icon: "ri-briefcase-line",     title: "Working adults and students", desc: "Morning and evening IOP tracks let you maintain your career, school, or family obligations while receiving meaningful clinical care." },
  { icon: "ri-arrow-down-line",    title: "Stepping down from PHP", desc: "IOP is the natural next step after PHP — maintaining therapeutic momentum as you gain independence and build life skills." },
  { icon: "ri-home-2-line",        title: "Stable home environment", desc: "IOP is ideal when you have a safe, substance-free place to return to each evening. Sober living + IOP is a powerful combination." },
  { icon: "ri-group-line",         title: "Seeking peer community", desc: "Group therapy is central to IOP — you'll build genuine connections with others at the same stage of recovery." },
];

const TRACKS = [
  { label: "Morning Track", time: "Mon / Wed / Thu · 9am–12pm", desc: "Designed for those who work evenings or have afternoon family commitments. Three mornings per week of group and individual therapy." },
  { label: "Evening Track",  time: "Tue / Thu / Fri · 5:30pm–8:30pm", desc: "Our most popular schedule — ideal for working adults, students, and parents who need to be available during the day." },
  { label: "Virtual IOP",    time: "Flexible scheduling statewide", desc: "Full IOP program delivered via secure telehealth — the same clinical content without the commute. Available to all Missouri residents." },
];

const THERAPIES = [
  { icon: "ri-brain-line",          label: "Cognitive Behavioral Therapy (CBT)" },
  { icon: "ri-heart-pulse-line",    label: "Dialectical Behavior Therapy (DBT)" },
  { icon: "ri-group-line",          label: "Peer Process Groups" },
  { icon: "ri-parent-line",         label: "Family Therapy Sessions" },
  { icon: "ri-discuss-line",        label: "Motivational Interviewing" },
  { icon: "ri-leaf-line",           label: "Trauma-Informed Approaches" },
  { icon: "ri-shield-check-line",   label: "Relapse Prevention Planning" },
  { icon: "ri-compass-3-line",      label: "Life Skills & Coping Tools" },
];

const FAQS = [
  { q: "How is IOP different from PHP?", a: "PHP runs 5–7 days per week for 6+ hours daily — it's the most intensive outpatient option and designed for those needing near-residential structure. IOP is 3–5 days per week, 3 hours per session, allowing you to hold a job, attend school, or fulfill family duties while still receiving structured clinical care." },
  { q: "How long does IOP last?", a: "Most clients participate in IOP for 6–10 weeks, though this is guided by individual clinical progress. We assess regularly and adjust the plan — stepping up to PHP if needed or stepping down to standard outpatient as you gain stability." },
  { q: "What does a typical IOP week look like?", a: "Most clients attend 3 sessions per week, each running 3 hours. Sessions include group process therapy, psychoeducation, skill-building, and periodic individual sessions. Some plans include weekly family therapy appointments outside of standard group hours." },
  { q: "Can I attend IOP while working full-time?", a: "Yes — that's one of IOP's biggest advantages. Our evening track (typically 5:30–8:30pm) runs three evenings per week and is specifically designed for working adults. Our virtual IOP track adds additional scheduling flexibility for clients across Missouri." },
  { q: "Is virtual IOP as effective as in-person?", a: "Research consistently shows that telehealth IOP produces comparable outcomes to in-person IOP for most clients. Our virtual program uses the same evidence-based modalities, licensed clinicians, and structured schedule as our in-person track." },
];

export default function IOPPage() {
  return (
    <LevelOfCareLayout
      abbr="IOP"
      programName="Intensive Outpatient Program"
      currentPath="/iop-missouri"
      tagline="Structured therapy that fits your life — morning and evening tracks available."
      schedule="3–5 days/week · 3 hrs/session"
      heroBody="IOP delivers meaningful clinical treatment without requiring you to step away from work, school, or family. With morning, evening, and virtual options, you choose the schedule that makes recovery sustainable alongside your real life."
      quickFacts={[
        { icon: "ri-time-line",          label: "Frequency",    value: "3–5 days per week" },
        { icon: "ri-timer-line",          label: "Hours/session",value: "3 hours per session" },
        { icon: "ri-sun-line",            label: "Tracks",       value: "Morning · Evening · Virtual" },
        { icon: "ri-calendar-event-line", label: "Duration",     value: "Typically 6–10 weeks" },
      ]}
      daySchedule={[
        { time: "5:30 pm", activity: "Arrival & Check-In", detail: "Quick mood and safety check-in with the group facilitator. Weekly goal review and accountability circle." },
        { time: "5:45 pm", activity: "Psychoeducation", detail: "Evidence-based topic covering relapse triggers, emotional regulation, sleep, communication, or the neuroscience of addiction." },
        { time: "6:30 pm", activity: "Group Process Therapy", detail: "Facilitated peer group exploring personal progress, setbacks, cravings, and interpersonal patterns in recovery." },
        { time: "7:30 pm", activity: "Skills Workshop or Individual Session", detail: "DBT skills practice, mindfulness, or a scheduled one-on-one session with your primary counselor." },
        { time: "8:15 pm", activity: "Wrap-Up & Evening Safety Plan", detail: "Close of session with coping plan review, sober support confirmation, and reflection on the session's key insight." },
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
                IOP is built for real life.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                IOP is the most widely utilized level of care in outpatient treatment — and for good reason. It delivers the clinical depth of structured treatment while letting you stay connected to the relationships, responsibilities, and routines that make recovery worth fighting for.
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SITE_IMAGES.therapyGroup} alt="IOP group therapy session at Missouri Behavioral Health" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,46,24,0.4) 0%, transparent 55%)" }} />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">3 Tracks</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-mbh-sage/70">Morning · Evening · Virtual</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Schedule tracks ────────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Scheduling</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Choose the track that fits your schedule.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {TRACKS.map((t) => (
              <div key={t.label} className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-white p-8 shadow-sm">
                <div>
                  <p className="font-display text-lg font-semibold text-mbh-forest">{t.label}</p>
                  <p className="mt-1 font-body text-xs font-semibold uppercase tracking-[0.16em] text-mbh-green">{t.time}</p>
                </div>
                <p className="font-body text-sm leading-relaxed text-mbh-body">{t.desc}</p>
                <a href={PHONE_HREF} className="mt-auto inline-flex items-center gap-1.5 font-body text-xs font-semibold text-mbh-green underline-offset-4 hover:underline">
                  Check availability <i className="ri-arrow-right-line" aria-hidden />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Therapy modalities ─────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">Clinical Approach</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              What happens in IOP sessions.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              IOP combines structured group therapy, individual counseling, and skills-based programming — all drawn from proven clinical frameworks.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {THERAPIES.map((t) => (
              <div key={t.label} className="flex items-center gap-3 rounded-2xl border border-mbh-forest/8 bg-cream px-5 py-4 shadow-sm">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${t.icon} text-base text-mbh-green`} aria-hidden />
                </span>
                <span className="font-body text-sm font-medium text-mbh-forest">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insurance ──────────────────────────────────────────────────────── */}
      <section className="bg-mbh-forest py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">Coverage</span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                Insurance typically covers IOP.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                IOP is covered by most major private insurance plans under mental health and substance use disorder benefits. We handle all benefit verification before treatment begins — at no cost to you.
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

      {/* ── VIRTUAL IOP ─────────────────────────────────────────────────────── */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                  Virtual IOP
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                Full IOP. No commute. Available statewide.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Our virtual IOP program delivers the same clinical content, licensed therapists, and structured group process as our in-person track — through a secure HIPAA-compliant telehealth platform accessible from anywhere in Missouri.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/45">
                Virtual IOP is not a lesser version of care. Research consistently shows equivalent outcomes to in-person IOP for most clients — and for many, the flexibility of telehealth makes it the only sustainable option for completing treatment.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: "ri-map-pin-2-line",   label: "Available to all Missouri residents" },
                  { icon: "ri-lock-line",         label: "HIPAA-compliant secure platform" },
                  { icon: "ri-group-line",        label: "Same group therapy structure" },
                  { icon: "ri-user-heart-line",   label: "Licensed MBH clinicians only" },
                  { icon: "ri-wifi-line",         label: "All you need is internet access" },
                  { icon: "ri-calendar-line",     label: "Morning & evening slots available" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-3">
                    <i className={`${item.icon} text-mbh-sage text-sm`} aria-hidden />
                    <span className="font-body text-sm text-white/70">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
                >
                  <i className="ri-phone-fill" aria-hidden /> Ask about virtual IOP
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-mbh-sage/60 mb-4">
                  Who virtual IOP is ideal for
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: "ri-road-map-line",      label: "Rural Missouri residents", desc: "Access the same clinical quality without a 1–3 hour round-trip commute to Springfield." },
                    { icon: "ri-car-line",            label: "No transportation access", desc: "No vehicle, no license, no problem. Treatment comes to you via any smartphone, tablet, or laptop." },
                    { icon: "ri-parent-line",         label: "Caregivers and parents", desc: "Attend sessions from home while children nap or are at school — without needing to arrange childcare." },
                    { icon: "ri-briefcase-line",      label: "Remote workers", desc: "If you work from home, virtual IOP blends seamlessly into your schedule without exposing your treatment status." },
                  ].map((item) => (
                    <li key={item.label} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mbh-green/15 text-mbh-sage">
                        <i className={`${item.icon} text-base`} aria-hidden />
                      </span>
                      <div>
                        <p className="font-display text-sm font-semibold text-white">{item.label}</p>
                        <p className="mt-0.5 font-body text-xs leading-relaxed text-white/45">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY MBH IOP ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                Why MBH
              </span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              What makes our IOP different.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              IOP at Missouri Behavioral Health is built around flexibility and clinical depth — because real recovery has to coexist with real life.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "ri-sun-line",
                title: "Three scheduling tracks",
                desc: "Morning, evening, and virtual IOP tracks give you genuine scheduling flexibility — not just a single time slot that may or may not work with your life.",
              },
              {
                icon: "ri-user-heart-line",
                title: "Dedicated primary counselor",
                desc: "You're assigned a primary therapist who attends your individual sessions, tracks your progress, and is your consistent point of contact throughout IOP.",
              },
              {
                icon: "ri-arrow-up-down-line",
                title: "Step-up ready",
                desc: "If your needs increase, your clinical team can step you up to PHP without disruption — same facility, same clinical team, no new intake process required.",
              },
              {
                icon: "ri-shield-check-line",
                title: "JCAHO accredited program",
                desc: "Our IOP meets the Joint Commission's stringent standards for clinical quality, safety, and evidence-based practice — the gold standard in behavioral health.",
              },
              {
                icon: "ri-mental-health-line",
                title: "Dual-diagnosis integrated",
                desc: "Co-occurring anxiety, depression, PTSD, and bipolar disorder are treated alongside addiction — in the same program, with the same clinical team.",
              },
              {
                icon: "ri-community-line",
                title: "Alumni community",
                desc: "IOP graduates join an active alumni network with ongoing support groups, peer events, and long-term connection to the MBH recovery community.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-4 rounded-3xl border border-mbh-forest/8 bg-cream p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mbh-green/10">
                  <i className={`${item.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{item.title}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{item.desc}</p>
                </div>
              </div>
            ))}
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
              Common questions about IOP.
            </h2>
          </div>
          <LevelOfCareFaq items={FAQS} />
        </div>
      </section>
    </LevelOfCareLayout>
  );
}
