import type { Metadata } from "next";
import Link from "next/link";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LevelOfCareLayout from "@/components/levels-of-care/LevelOfCareLayout";
import LevelOfCareFaq from "@/components/levels-of-care/LevelOfCareFaq";
import { CONTAINER, PHONE_DISPLAY, PHONE_HREF, SITE_IMAGES } from "@/data/site";

const fallback: Metadata = {
  title: "Outpatient Rehab in Springfield, MO | Missouri Behavioral Health",
  description:
    "Outpatient addiction and mental health treatment in Springfield, MO. Weekly individual and group counseling for long-term recovery maintenance and relapse prevention.",
  alternates: { canonical: "/outpatient-rehab-springfield-mo" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/outpatient-rehab-springfield-mo", fallback);
}

const WHO_ITS_FOR = [
  { icon: "ri-graduation-cap-line",  title: "Completing a higher level of care", desc: "Outpatient is the natural progression after PHP or IOP — maintaining clinical contact and accountability while building independence." },
  { icon: "ri-home-heart-line",      title: "Strong home and support environment", desc: "With a stable, supportive home base, outpatient allows you to practice recovery skills in real-life settings while checking in weekly." },
  { icon: "ri-calendar-check-line",  title: "Busy schedules with minimal flex time", desc: "One or two weekly sessions fit into virtually any schedule — making outpatient the most sustainable long-term care model." },
  { icon: "ri-leaf-line",            title: "Long-term relapse prevention focus", desc: "For individuals months into recovery who want continued therapeutic support without intensive programming commitments." },
];

const SERVICES = [
  { icon: "ri-user-heart-line",   label: "Individual Therapy", desc: "Weekly one-on-one sessions with a licensed counselor — exploring progress, setbacks, and evolving life challenges in recovery." },
  { icon: "ri-group-line",        label: "Group Counseling", desc: "Regular peer-support groups building community, accountability, and shared experience — a cornerstone of sustained sobriety." },
  { icon: "ri-parent-line",       label: "Family Therapy", desc: "Structured sessions with key family members, rebuilding communication patterns and establishing healthy relational boundaries." },
  { icon: "ri-brain-line",        label: "CBT & DBT Skills", desc: "Continued skill reinforcement for managing triggers, emotional dysregulation, and relapse risk as life's pressures increase." },
  { icon: "ri-compass-3-line",    label: "Relapse Prevention Planning", desc: "Individualized written relapse prevention plans with trigger mapping, early warning signs, and coping response strategies." },
  { icon: "ri-computer-line",     label: "Telehealth Options", desc: "All outpatient services are available via secure telehealth — ideal for clients in rural Missouri or with transportation barriers." },
];

const FAQS = [
  { q: "Who is outpatient treatment designed for?", a: "Outpatient treatment is best suited for individuals with a stable home environment who have completed a higher level of care (PHP or IOP), or for those whose addiction or mental health challenges are mild-to-moderate in severity and don't require intensive daily programming." },
  { q: "How often do I need to attend outpatient sessions?", a: "Most outpatient clients attend 1–2 sessions per week. This typically includes one individual therapy appointment and one group counseling session. Session frequency can be adjusted based on clinical progress and life circumstances." },
  { q: "Is outpatient treatment effective for long-term sobriety?", a: "Yes — outpatient therapy is one of the most evidence-supported tools for maintaining long-term recovery. Regular therapeutic contact reduces relapse risk, provides early intervention when warning signs appear, and reinforces the coping skills developed in more intensive programs." },
  { q: "Can outpatient treatment address mental health conditions?", a: "Absolutely. Our outpatient program treats both substance use and co-occurring mental health conditions including anxiety, depression, PTSD, and bipolar disorder. Many clients use outpatient sessions primarily for mental health maintenance after completing addiction treatment." },
  { q: "Is telehealth outpatient available?", a: "Yes — all of our outpatient services are available via HIPAA-compliant telehealth. This makes care accessible to clients across Missouri who live in rural areas, lack transportation, or prefer to receive treatment from home." },
];

export default function OutpatientPage() {
  return (
    <LevelOfCareLayout
      abbr="Outpatient"
      programName="Outpatient Program"
      currentPath="/outpatient-rehab-springfield-mo"
      tagline="Flexible weekly counseling for long-term recovery maintenance and relapse prevention."
      schedule="1–2 sessions/week · In-person or virtual"
      heroBody="Outpatient care is where recovery becomes a lifestyle. Weekly individual and group sessions give you continued therapeutic support, relapse prevention skill-building, and clinical accountability — designed to fit naturally around work, school, and family life."
      quickFacts={[
        { icon: "ri-time-line",          label: "Frequency",     value: "1–2 sessions per week" },
        { icon: "ri-timer-line",          label: "Session length",value: "60–90 minutes" },
        { icon: "ri-computer-line",       label: "Format",        value: "In-person or telehealth" },
        { icon: "ri-calendar-event-line", label: "Duration",      value: "Ongoing — as long as needed" },
      ]}
      daySchedule={[
        { time: "Session opens",  activity: "Check-In & Progress Review", detail: "Brief update on the week — wins, struggles, triggers encountered, and any relapse concerns. Sets the agenda for the session." },
        { time: "15 min in",      activity: "Primary Therapy Work", detail: "Core CBT, DBT, or trauma-focused session work based on your individualized treatment plan and current goals." },
        { time: "45 min in",      activity: "Skill Practice & Rehearsal", detail: "Applying the session's clinical content to upcoming real-world situations — rehearsing responses to identified triggers." },
        { time: "75 min in",      activity: "Relapse Prevention Review", detail: "Update to written relapse prevention plan, checking warning signs, and refining coping strategies for the week ahead." },
        { time: "Session close",   activity: "Between-Session Homework", detail: "Practical exercises for the coming week — journaling prompts, behavioral experiments, or community meeting attendance goals." },
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
                Recovery that fits your life.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Outpatient treatment isn't the end of care — it's where recovery takes root in real life. Regular sessions maintain clinical accountability while giving you the freedom to live, work, and build the future your sobriety is creating.
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
              <img src={SITE_IMAGES.facilityInterior} alt="Outpatient counseling room at Missouri Behavioral Health" className="w-full object-cover" style={{ aspectRatio: "4/3", objectPosition: "center" }} />
              <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,46,24,0.4) 0%, transparent 55%)" }} />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-mbh-forest px-5 py-4 shadow-xl">
                <p className="font-display text-2xl font-semibold text-white">In-person</p>
                <p className="mt-0.5 font-body text-[10px] font-semibold uppercase tracking-widest text-mbh-sage/70">& virtual statewide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────────── */}
      <section className="bg-cream py-[100px]">
        <div className={CONTAINER}>
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-mbh-green" aria-hidden />
              <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">What We Offer</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
              Services in our outpatient program.
            </h2>
            <p className="mt-3 max-w-2xl font-body text-[0.9375rem] leading-relaxed text-mbh-body">
              Outpatient at MBH isn't just check-ins — it's evidence-based clinical work delivered consistently over time to create durable change.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.label} className="flex flex-col gap-4 rounded-2xl border border-mbh-forest/8 bg-white p-6 shadow-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mbh-green/10">
                  <i className={`${s.icon} text-xl text-mbh-green`} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-[0.9375rem] font-semibold text-mbh-forest">{s.label}</p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-mbh-body">{s.desc}</p>
                </div>
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
                Outpatient therapy is covered by insurance.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                Individual and group outpatient therapy is covered by most private insurance plans. We verify your benefits before treatment begins and handle all insurance communication on your behalf.
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

      {/* ── TELEHEALTH OUTPATIENT ───────────────────────────────────────────── */}
      <section className="bg-mbh-forest-deep py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-20 items-center">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-sage" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-sage">
                  Telehealth
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-white">
                Outpatient therapy, anywhere in Missouri.
              </h2>
              <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-white/60">
                All of our outpatient services are available via HIPAA-compliant telehealth. Whether you live in rural Missouri, don't have reliable transportation, or simply prefer the privacy of attending from home — you get the same licensed clinicians and evidence-based care.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-white/45">
                Telehealth outpatient therapy has the same clinical rigor as in-person care. Sessions use a secure video platform, and group therapy is conducted via virtual meeting rooms with real-time interaction. No recording, no compromise on HIPAA compliance.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Individual therapy via secure video — same licensed therapist every session",
                  "Virtual group counseling with real-time peer interaction",
                  "All Missouri residents eligible — no geographical limitation",
                  "Smartphone, tablet, or laptop — any device with a camera works",
                  "Consistent scheduling — weekly recurring appointment blocks",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mbh-green/20">
                      <i className="ri-check-line text-[10px] text-mbh-sage" aria-hidden />
                    </span>
                    <span className="font-body text-sm text-white/65">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center gap-2 rounded-full bg-mbh-green px-7 py-3.5 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
                >
                  <i className="ri-phone-fill" aria-hidden /> Ask about telehealth options
                </a>
              </div>
            </div>
            <div className="grid gap-4">
              {[
                { icon: "ri-road-map-line",  title: "Rural Missouri residents",       desc: "High-quality outpatient care no longer requires driving to Springfield. Attend from your home, wherever you are in Missouri." },
                { icon: "ri-car-line",       title: "No transportation barrier",       desc: "For clients without a vehicle or reliable transportation, telehealth removes the most common barrier to consistent care." },
                { icon: "ri-lock-2-line",    title: "Complete privacy at home",        desc: "Some clients prefer that neighbors or coworkers not observe them entering a clinic. Telehealth keeps your treatment entirely private." },
                { icon: "ri-parent-line",    title: "Parents & caregivers",            desc: "Attend from home while your family is present — no need to arrange childcare or disrupt your household for each appointment." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 px-5 py-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/15 text-mbh-sage">
                    <i className={`${item.icon} text-lg`} aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 font-body text-xs leading-relaxed text-white/45">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTINUING CARE ─────────────────────────────────────────────────── */}
      <section className="bg-white py-[100px]">
        <div className={CONTAINER}>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-mbh-green" aria-hidden />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-mbh-green">
                  Long-Term Recovery
                </span>
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold tracking-tight text-mbh-forest">
                Recovery doesn't end when treatment does.
              </h2>
              <p className="mt-4 font-body text-[0.9375rem] leading-relaxed text-mbh-body">
                Outpatient is often the final clinical phase of treatment — but it's really just the beginning of long-term recovery. Our outpatient program is designed with one goal in mind: building the internal resources, relationships, and habits that sustain sobriety for a lifetime.
              </p>
              <p className="mt-4 font-body text-sm leading-relaxed text-mbh-body/70">
                We collaborate with every outpatient client to build a written continuing care plan before discharge — identifying community resources, peer support networks, alumni activities, and relapse prevention protocols that keep you connected to recovery long after weekly sessions end.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: "ri-file-list-3-line", title: "Written continuing care plan", desc: "A documented, personalized roadmap covering community meetings, support contacts, early warning signs, and crisis response steps." },
                  { icon: "ri-group-line",        title: "Alumni peer support groups",  desc: "Join ongoing alumni groups for continued peer connection, shared accountability, and long-term community in recovery." },
                  { icon: "ri-refresh-line",      title: "Step-up available if needed", desc: "Life is unpredictable. If relapse or crisis occurs, you can step back up to IOP or PHP within MBH without starting over." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10 mt-0.5">
                      <i className={`${item.icon} text-lg text-mbh-green`} aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-sm font-semibold text-mbh-forest">{item.title}</p>
                      <p className="mt-1 font-body text-sm leading-relaxed text-mbh-body">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-mbh-forest/8 bg-cream p-8">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.22em] text-mbh-forest/35 mb-6">
                  What outpatient clients build
                </p>
                <ul className="space-y-5">
                  {[
                    { icon: "ri-user-smile-line",  label: "Emotional regulation skills",     desc: "Identifying and managing difficult emotions without turning to substances — the foundational skill of lasting sobriety." },
                    { icon: "ri-community-line",   label: "Recovery community",               desc: "A network of peers, sponsors, alumni, and clinical supporters who remain part of your life beyond formal treatment." },
                    { icon: "ri-compass-3-line",   label: "Relapse prevention playbook",      desc: "A clear, written plan you own — triggers mapped, warning signs named, and coping strategies practiced until automatic." },
                    { icon: "ri-sun-line",         label: "Daily structure and purpose",      desc: "Rebuilding routine, employment, relationships, and meaningful activity — the infrastructure that makes recovery sustainable." },
                  ].map((item) => (
                    <li key={item.label} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                        <i className={`${item.icon} text-base text-mbh-green`} aria-hidden />
                      </span>
                      <div>
                        <p className="font-display text-sm font-semibold text-mbh-forest">{item.label}</p>
                        <p className="mt-0.5 font-body text-xs leading-relaxed text-mbh-body">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 rounded-2xl bg-mbh-green py-4 font-body text-sm font-semibold text-white transition hover:bg-mbh-green-hover"
              >
                <i className="ri-phone-fill" aria-hidden /> Call {PHONE_DISPLAY}
              </a>
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
              Common questions about outpatient care.
            </h2>
          </div>
          <LevelOfCareFaq items={FAQS} />
        </div>
      </section>
    </LevelOfCareLayout>
  );
}
