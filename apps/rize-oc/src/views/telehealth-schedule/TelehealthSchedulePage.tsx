import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Eyebrow from "@/components/ui/Eyebrow";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";

/* ─────────────────────────────────────────────────── Schedule data ─────── */

const schedule = [
  {
    day: "Monday",
    times: ["9AM", "10AM", "6PM"],
    topic: "Coping With Stress",
    description:
      "Learn to create and utilize healthy coping skills, to identify stressful triggers and to manage your obligations in a sustainable way.",
    icon: "ri-mental-health-line",
  },
  {
    day: "Tuesday",
    times: ["9AM", "10AM", "6PM"],
    topic: "Overcoming Self-Sabotage",
    description:
      "If you find yourself struggling with creating lasting change, or wonder why despite your best efforts you find yourself falling back into old patterns, you may be suffering with self-sabotage. Learn to overcome this pattern.",
    icon: "ri-refresh-line",
  },
  {
    day: "Wednesday",
    times: ["9AM", "10AM", "6PM"],
    topic: "Creating School / Work / Life Balance",
    description:
      "Learn how to create balance within life demands to avoid burnout & maintain healthy mental well-being in the process.",
    icon: "ri-scales-3-line",
  },
  {
    day: "Thursday",
    times: ["9AM", "10AM", "6PM"],
    topic: "Nutrition & Mental Wellness",
    description:
      "Nutrition is an important aspect of maintaining mental wellness. Learn how these two concepts are related and how to implement them into your life.",
    icon: "ri-seedling-line",
  },
  {
    day: "Friday",
    times: ["9AM", "10AM", "6PM"],
    topic: "Relationships & Communication",
    description:
      "Learn the art of effective communication in order to better know and communicate your needs, build healthy boundaries, and improve relationships.",
    icon: "ri-team-line",
  },
];

const benefits = [
  {
    icon: "ri-home-heart-line",
    title: "Attend From Home",
    body: "Join live sessions from anywhere — your home, office, or any private space. No commute, no disruption to your daily routine.",
  },
  {
    icon: "ri-time-line",
    title: "Flexible Session Times",
    body: "Three time slots every weekday — 9AM, 10AM, and 6PM — designed to work around work, school, and family commitments.",
  },
  {
    icon: "ri-user-heart-line",
    title: "Licensed Therapists",
    body: "Every telehealth session is facilitated by a licensed Rize OC clinician using the same evidence-based curriculum as our in-person programs.",
  },
  {
    icon: "ri-shield-check-line",
    title: "HIPAA-Compliant Platform",
    body: "Your privacy is protected. All sessions are conducted through a fully encrypted, HIPAA-compliant video platform.",
  },
];

/* ─────────────────────────────────────────────────── Component ─────── */

export default function TelehealthSchedulePage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">

      {/* ①  Hero ────────────────────────────────────────────────────────── */}
      <section className="bg-ink relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/5" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent/5" />

        <div className="relative mx-auto w-full max-w-[1300px] px-6 lg:px-10">
          <div className="max-w-[640px]">
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/about"
                className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-accent transition-colors"
              >
                About Rize
              </Link>
              <span className="text-white/25 text-xs">/</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent">
                Telehealth Schedule
              </span>
            </div>

            <Eyebrow colorClass="text-accent">Virtual Group Sessions</Eyebrow>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mb-6"
              style={{ fontSize: "clamp(44px, 5vw, 76px)", lineHeight: 0.96 }}
            >
              Weekly Telehealth
              <br />
              <em className="italic text-white/60">Schedule</em>
            </h1>
            <p className="text-[16px] font-light leading-relaxed text-white/80 max-w-[500px] mb-10">
              Live, clinician-led group sessions every weekday — morning and evening slots available. Join from anywhere, on a schedule that fits your life.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/admissions" variant="accent" size="md">
                Enroll Today
              </Button>
              <Button href="tel:9494612620" variant="outline-white" size="md">
                <i className="ri-phone-line mr-2 text-sm" /> (949) 461-2620
              </Button>
            </div>
          </div>

          {/* Quick info strip */}
          <div className="mt-14 flex flex-wrap gap-8">
            {[
              { icon: "ri-calendar-line",    text: "Monday – Friday" },
              { icon: "ri-time-line",        text: "9AM · 10AM · 6PM" },
              { icon: "ri-video-line",       text: "Live Video Sessions" },
              { icon: "ri-lock-line",        text: "HIPAA Compliant" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <i className={`${icon} text-accent text-sm`} />
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/65">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ②  Weekly Schedule Grid ─────────────────────────────────────────── */}
      <SectionWrapper bg="bg-[#F8F4ED]" py="py-[100px]">
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <Eyebrow colorClass="text-accent">This Week&apos;s Topics</Eyebrow>
          <SectionHeader as="h2" className="mt-3">
            Weekly Program Schedule
          </SectionHeader>
          <p className="mt-5 text-[15px] text-ink/65 leading-relaxed">
            Each session runs 60 minutes and is open to current Rize OC clients and qualifying new enrollees. Topics rotate weekly within a structured evidence-based curriculum.
          </p>
        </div>

        {/* Desktop 5-column table */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-px bg-warm/30 border border-warm/30 overflow-hidden">
          {/* Day headers */}
          {schedule.map(({ day }) => (
            <div key={day} className="bg-ink px-6 py-4 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white">{day}</p>
            </div>
          ))}

          {/* Time slots row */}
          {schedule.map(({ day, times }) => (
            <div key={`time-${day}`} className="bg-cream-tile px-6 py-5 text-center border-b border-warm/30">
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {times.map((t, i) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <span className="inline-block rounded-sm bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent tracking-[0.1em]">
                      {t}
                    </span>
                    {i < times.length - 1 && (
                      <span className="text-[10px] font-medium text-ink/30 uppercase tracking-widest">or</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Topic + description cards */}
          {schedule.map(({ day, topic, description, icon }) => (
            <div key={`card-${day}`} className="bg-white px-6 py-8 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10 rounded-sm">
                  <i className={`${icon} text-accent text-base`} />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Topic</p>
              </div>
              <h3 className="font-[family-name:var(--font-display)] font-normal text-ink leading-tight"
                style={{ fontSize: "clamp(17px, 1.4vw, 22px)" }}
              >
                {topic}
              </h3>
              <p className="text-[13px] text-ink/65 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Mobile stacked cards */}
        <div className="flex flex-col gap-4 lg:hidden">
          {schedule.map(({ day, times, topic, description, icon }) => (
            <div key={day} className="bg-white border border-warm/30 overflow-hidden">
              {/* Day header */}
              <div className="bg-ink px-6 py-3 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white">{day}</p>
                <div className="flex items-center gap-1.5">
                  {times.map((t, i) => (
                    <span key={t} className="flex items-center gap-1.5">
                      <span className="inline-block rounded-sm bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent tracking-[0.1em]">
                        {t}
                      </span>
                      {i < times.length - 1 && (
                        <span className="text-[9px] font-medium text-white/40 uppercase">or</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
              {/* Card body */}
              <div className="px-6 py-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent/10 rounded-sm">
                    <i className={`${icon} text-accent text-base`} />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] font-normal text-ink text-xl leading-tight">
                    {topic}
                  </h3>
                </div>
                <p className="text-[14px] text-ink/65 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ③  Why Telehealth ───────────────────────────────────────────────── */}
      <SectionWrapper bg="bg-white" py="py-[100px]">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-center">

          {/* Left — narrative */}
          <div>
            <Eyebrow colorClass="text-accent">Why Telehealth</Eyebrow>
            <SectionHeader as="h2" className="mt-3">
              Rize-Quality Care,
              <br />
              <span className="font-normal italic text-muted">Anywhere You Are</span>
            </SectionHeader>
            <p className="mt-6 text-[15px] text-ink/70 leading-[1.85]">
              Our telehealth program brings the same evidence-based group therapy model used in our Orange County facility to clients who need flexible access — whether due to location, schedule, or personal preference.
            </p>
            <p className="mt-4 text-[15px] text-ink/70 leading-[1.85]">
              Sessions are conducted live — not pre-recorded — so every participant benefits from real-time clinical facilitation, peer interaction, and the therapeutic group dynamic that is central to effective treatment.
            </p>
            <div className="mt-8">
              <Button href="/admissions" variant="accent" size="sm">
                Check Eligibility <i className="ri-arrow-right-line ml-2 text-xs" />
              </Button>
            </div>
          </div>

          {/* Right — benefit cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map(({ icon, title, body }) => (
              <div key={title} className="flex flex-col gap-4 p-6 border border-warm/30 bg-cream-tile">
                <div className="flex h-10 w-10 items-center justify-center bg-accent/10 rounded-sm">
                  <i className={`${icon} text-accent text-lg`} />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-ink uppercase tracking-[0.08em]">{title}</h3>
                  <p className="mt-2 text-[13px] text-ink/65 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ④  CTA Banner ──────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-[100px]"
        style={{ background: "linear-gradient(135deg, #2c302e 0%, #3a3f3c 50%, #2c302e 100%)" }}
      >
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent/8" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-accent/6" />

        <div className="relative mx-auto w-full max-w-[1300px] px-6 lg:px-10 text-center">
          <Eyebrow colorClass="text-accent">Ready to Start?</Eyebrow>
          <h2
            className="font-[family-name:var(--font-display)] font-normal text-white mt-4 mx-auto"
            style={{ fontSize: "clamp(34px, 4vw, 60px)", lineHeight: 1.05, maxWidth: "660px" }}
          >
            Join a Live Session
            <br />
            <em className="italic text-white/60">As Early as Today</em>
          </h2>
          <p className="mt-6 text-[16px] font-light text-white/80 leading-relaxed max-w-[480px] mx-auto">
            Our admissions team will verify your benefits and confirm your first session time — same-day enrollment available.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/admissions" variant="accent" size="lg">
              Enroll in Telehealth
            </Button>
            <Button href="tel:9494612620" variant="outline-white" size="lg">
              <i className="ri-phone-line mr-2" /> (949) 461-2620
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { icon: "ri-video-line",        text: "Live Group Sessions" },
              { icon: "ri-calendar-check-line", text: "5 Days a Week" },
              { icon: "ri-shield-check-line", text: "Insurance Accepted" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <i className={`${icon} text-accent text-sm`} />
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/70">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
