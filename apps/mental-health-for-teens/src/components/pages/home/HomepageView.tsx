import Link from "next/link";
import SunriseScene from "./SunriseScene";

const trustSignals = [
  "Adolescents 12–17",
  "Virtual care across California",
  "Family-centered approach",
  "San Diego based",
];

const supportSteps = [
  {
    title: "Reach out",
    body:
      "A confidential conversation with a real person on our team — no pressure, no rush.",
  },
  {
    title: "Find the right fit",
    body:
      "We recommend a level of care and weekly rhythm aligned with your teen and your family’s life.",
  },
  {
    title: "Begin together",
    body:
      "Therapy, groups, and skills happen virtually, with parent guidance running alongside.",
  },
];

const concerns = [
  { title: "Anxiety & worry", body: "Persistent unease, panic, avoidance." },
  { title: "Depression & low mood", body: "Withdrawal, exhaustion, hopelessness." },
  { title: "School avoidance", body: "Mornings that feel impossible." },
  { title: "Emotional regulation", body: "Big feelings, hard landings." },
  { title: "Social isolation", body: "Pulling away from friends or family." },
  { title: "Family communication", body: "Conversations that have changed shape." },
];

const parentPromises = [
  {
    title: "Clear communication on progress",
    body: "Regular check-ins so you understand the why behind every step.",
  },
  {
    title: "Tools for the hard moments",
    body: "Practical language and skills you can use at home — tonight.",
  },
  {
    title: "A team that knows your teen",
    body: "Real continuity. Real relationship. Real human voices.",
  },
];

const resources = [
  {
    eyebrow: "For parents",
    title: "What to say when your teen is struggling",
    body: "Gentle openings that lower the temperature and keep the door open.",
  },
  {
    eyebrow: "Understanding care",
    title: "IOP vs. OP: how to think about the difference",
    body: "A plain-language guide to choosing the right level of support.",
  },
  {
    eyebrow: "At home",
    title: "Small rituals that steady the week",
    body: "Quiet practices families can layer in between sessions.",
  },
];

export default function HomepageView() {
  return (
    <main className="bg-[var(--color-background)]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SunriseScene variant="dawn" className="h-full w-full" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(248,245,240,0.92) 0%, rgba(248,245,240,0.55) 28%, rgba(248,245,240,0.2) 60%, rgba(248,245,240,0.65) 100%)",
            }}
          />
        </div>

        <div className="mx-auto w-full max-w-6xl px-6 pb-32 pt-24 md:pb-40 md:pt-32">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/15 bg-white/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)] shadow-sm backdrop-blur">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              Virtual teen mental health · California
            </p>

            <h1 className="mt-8 text-[clamp(2.75rem,5.5vw,4.75rem)] font-semibold leading-[1.05] tracking-tight text-[var(--color-primary)]">
              Steady, compassionate care for the teen you love.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--color-primary)]/75 md:text-xl">
              Mental Health For Teens is a virtual practice for adolescents 12 to 17 and the families
              walking with them. We help families build calmer days, stronger skills, and steadier support
              — together.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(23,59,79,0.24)] transition-colors hover:bg-[#0f2e40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                Talk with our team
              </Link>
              <Link
                href="/levels-of-care"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-primary)]/25 bg-white/85 px-7 py-3.5 text-sm font-semibold text-[var(--color-primary)] backdrop-blur transition-colors hover:border-[var(--color-primary)]/45 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                See levels of care
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t border-[var(--color-primary)]/10 bg-white/60 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
              How we work
            </span>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[var(--color-primary)]/85">
              {trustSignals.map((signal) => (
                <li key={signal} className="flex items-center gap-3">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              A note from our team
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[var(--color-primary)] md:text-4xl">
              You are not late. You are not alone.
            </h2>
          </div>
          <div className="space-y-6 text-[17px] leading-8 text-[var(--color-primary)]/80">
            <p>
              If you’ve found your way here, something has likely been heavy for a while. Maybe the mornings
              feel harder than they used to. Maybe the conversations have quietly changed shape.
            </p>
            <p>
              Mental health support shouldn’t add another mountain to your week. Our virtual programs are
              built to fit into real family life — with structure, warmth, and clinical care that meets your
              teen exactly where they are.
            </p>
            <p>There is a path forward. We’d love to walk part of it with you.</p>
            <p className="pt-2 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)]/65">
              — The Mental Health For Teens clinical team
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-primary)]/10 bg-white/60 px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              How support unfolds
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[var(--color-primary)] md:text-4xl">
              A clear path, walked at your family’s pace.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--color-primary)]/70">
              No cold intake. No paperwork shuffle. Just a supported path from the first conversation to the
              rhythm of weekly care.
            </p>
          </div>

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {supportSteps.map((step, idx) => (
              <li
                key={step.title}
                className="rounded-3xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-[0_22px_60px_rgba(23,59,79,0.06)]"
              >
                <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Step 0{idx + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-[var(--color-primary)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[var(--color-primary)]/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                What we treat
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[var(--color-primary)] md:text-4xl">
                The struggles teens carry — and the spaces we hold for them.
              </h2>
            </div>
            <p className="text-base leading-7 text-[var(--color-primary)]/70">
              We support adolescents through the experiences that quietly shape their days, helping them
              build skills, language, and steadiness for what comes next.
            </p>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-[var(--color-primary)]/10 bg-[var(--color-primary)]/10 sm:grid-cols-2 lg:grid-cols-3">
            {concerns.map((concern) => (
              <li key={concern.title} className="bg-white p-7">
                <h3 className="text-[15px] font-semibold tracking-tight text-[var(--color-primary)]">
                  {concern.title}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-[var(--color-primary)]/65">{concern.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Link
              href="/what-we-treat"
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)] hover:text-[#0f2e40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              See the full list <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-primary)]/10 bg-white/60 px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Levels of care
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[var(--color-primary)] md:text-4xl">
              Two depths of support — chosen with you, not for you.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--color-primary)]/70">
              We help your family discern the right level of care today, with room to step up or step down
              as your teen’s needs change.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <article className="relative overflow-hidden rounded-3xl border border-[var(--color-primary)]/15 bg-[var(--color-primary)] p-10 text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 60% at 85% 0%, rgba(217,140,114,0.35), transparent 60%), radial-gradient(70% 60% at 0% 100%, rgba(111,143,163,0.3), transparent 65%)",
                }}
              />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                  Virtual IOP
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-tight md:text-[1.75rem]">
                  More structure, more contact, more steadiness.
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-white/85">
                  Multiple weekly groups, individual therapy, and strong parent partnership — designed for
                  teens who need a deeper container right now.
                </p>
                <Link
                  href="/levels-of-care"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)] hover:bg-[var(--color-background)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  Learn about IOP <span aria-hidden>→</span>
                </Link>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-3xl border border-[var(--color-primary)]/12 bg-white p-10 shadow-[0_22px_60px_rgba(23,59,79,0.08)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Virtual OP
              </p>
              <h3 className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-[var(--color-primary)] md:text-[1.75rem]">
                Lighter touch, lasting rhythm.
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[var(--color-primary)]/70">
                Ongoing outpatient support that keeps therapy and skills in your teen’s week without
                overcrowding it — ideal as a step-down or for more contained needs.
              </p>
              <Link
                href="/levels-of-care"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/25 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)] hover:border-[var(--color-primary)]/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                Learn about OP <span aria-hidden>→</span>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
              Walking with parents
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[var(--color-primary)] md:text-4xl">
              Care isn’t only for your teen. We hold space for the family around them too.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--color-primary)]/70">
              Sustainable progress happens when parents feel supported, informed, and equipped — not just
              looped in.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-white hover:bg-[#0f2e40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              Talk with a real person <span aria-hidden>→</span>
            </Link>
          </div>

          <ul className="divide-y divide-[var(--color-primary)]/10 rounded-3xl border border-[var(--color-primary)]/10 bg-white">
            {parentPromises.map((promise) => (
              <li key={promise.title} className="px-8 py-7">
                <h3 className="text-[16px] font-semibold tracking-tight text-[var(--color-primary)]">
                  {promise.title}
                </h3>
                <p className="mt-2 text-[14px] leading-6 text-[var(--color-primary)]/70">{promise.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-[var(--color-primary)]/10 bg-white/60 px-6 py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                Reading + resources
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[var(--color-primary)] md:text-4xl">
                Quiet, useful guidance for the moments you need it.
              </h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/25 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)] hover:border-[var(--color-primary)]/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              Visit resources <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {resources.map((resource) => (
              <article
                key={resource.title}
                className="rounded-3xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-[0_18px_50px_rgba(23,59,79,0.06)]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
                  {resource.eyebrow}
                </p>
                <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-[var(--color-primary)]">
                  {resource.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-[var(--color-primary)]/70">{resource.body}</p>
                <Link
                  href="/resources"
                  className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)] hover:text-[#0f2e40] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  Read <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SunriseScene variant="dusk" className="h-full w-full" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,44,59,0.15) 0%, rgba(15,44,59,0.55) 100%)",
            }}
          />
        </div>
        <div className="mx-auto w-full max-w-4xl px-6 py-28 text-center md:py-40">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#F4C9B5]">
            When you’re ready
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            We’ll be here — at the speed of trust.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/85 md:text-lg">
            Reach out for a confidential, no-pressure conversation. We’ll listen, share what’s possible, and
            help your family take the next gentle step.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-background)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start a confidential conversation
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center rounded-full border border-white/35 px-7 py-3.5 text-sm font-semibold text-white hover:border-white/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Read first
            </Link>
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-[12px] leading-6 text-white/65">
            If your teen is in crisis or unsafe right now, please call or text 988 to reach the Suicide
            &amp; Crisis Lifeline, or call 911. This site offers educational information and is not
            emergency care.
          </p>
        </div>
      </section>
    </main>
  );
}
