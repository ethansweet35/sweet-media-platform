type Schedule = {
  label: string;
  days: string;
  time: string;
  body: string;
  tags: string[];
  icon: string;
};

const SCHEDULES: Schedule[] = [
  {
    label: "Morning IOP",
    days: "Mon / Wed / Fri",
    time: "9:00 AM – 12:00 PM",
    body:
      "Ideal for those with afternoon/evening commitments or those who prefer morning structure.",
    tags: ["Evening workers", "Parents (during school)", "Self-employed professionals"],
    icon: "ri-sun-line",
  },
  {
    label: "Afternoon IOP",
    days: "Tue / Thurs / Sat",
    time: "1:00 PM – 4:00 PM",
    body:
      "The ideal schedule for students, shift workers, or those with morning obligations.",
    tags: ["College students", "Night shift workers", "Flexible schedules"],
    icon: "ri-sun-cloudy-line",
  },
  {
    label: "Evening IOP",
    days: "Mon / Tues / Thurs",
    time: "6:00 PM – 9:00 PM",
    body:
      "Most popular option for working professionals maintaining full-time employment.",
    tags: ["Working professionals", "9-5 employees", "Parents (after dinner)"],
    icon: "ri-moon-line",
  },
];

const SESSION = [
  {
    title: "Group Therapy",
    duration: "90 Minutes",
    body: "Process groups focusing on addiction recovery, emotional regulation, and peer support.",
  },
  {
    title: "Psychoeducation",
    duration: "45 Minutes",
    body: "Educational workshops on relapse prevention, coping skills, and life skills training.",
  },
  {
    title: "Individual / Holistic",
    duration: "45 Minutes",
    body: "One-on-one therapy, medication management, or holistic activities (yoga, mindfulness).",
  },
];

export default function IopScheduleSection() {
  return (
    <section className="bg-[var(--mvt-cream)] text-[var(--mvt-ink)]">
      <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-12 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--mvt-ink)]">
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
            Flexible Scheduling
            <span aria-hidden="true" className="inline-block h-px w-7 bg-[var(--mvt-ink)]" />
          </p>
          <h2 className="mt-6 font-heading text-[40px] leading-tight tracking-tight text-[var(--mvt-ink)] sm:text-5xl lg:text-[52px]">
            IOP Schedule Options
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[var(--mvt-text)]">
            We offer morning, afternoon, and evening IOP tracks to accommodate
            your work, school, or family schedule. Choose the time that fits
            your life best.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SCHEDULES.map((s) => (
            <article
              key={s.label}
              className="bg-white p-7 shadow-sm ring-1 ring-black/5"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--mvt-teal)]/10 text-[var(--mvt-teal)]">
                <i className={`${s.icon} text-xl`} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[18px] font-semibold text-[var(--mvt-ink)]">
                {s.label}
              </h3>
              <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--mvt-muted)]">
                {s.days}
              </p>
              <p className="mt-1 font-heading text-[22px] text-[var(--mvt-teal)]">
                {s.time}
              </p>
              <p className="mt-4 text-[14px] leading-6 text-[var(--mvt-text)]">
                {s.body}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex items-center bg-[var(--mvt-cream)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--mvt-ink)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Typical 3-hour session breakdown */}
        <div className="mx-auto mt-16 max-w-4xl border border-black/10 bg-white p-8 sm:p-10">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--mvt-ink)]">
            Inside the Session
          </p>
          <h3 className="mt-3 text-center font-heading text-3xl leading-tight text-[var(--mvt-ink)] sm:text-4xl">
            Typical 3-Hour IOP Session
          </h3>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {SESSION.map((s) => (
              <li key={s.title} className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--mvt-teal)]">
                  {s.duration}
                </p>
                <h4 className="mt-2 text-[16px] font-semibold text-[var(--mvt-ink)]">
                  {s.title}
                </h4>
                <p className="mt-3 text-[13px] leading-6 text-[var(--mvt-text)]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
