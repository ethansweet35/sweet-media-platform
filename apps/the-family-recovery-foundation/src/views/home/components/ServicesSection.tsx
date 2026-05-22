import Link from "next/link";
import { services } from "@/mocks/services";
import { CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/lib/tfrf-nav";

const LIVE_SESSION_IDS = new Set([
  "fix-your-family",
  "family-room",
  "morning-meditation",
  "courage-to-detach",
]);

const PROGRAM_ICONS: Record<string, string> = {
  "fix-your-family": "ri-group-line",
  "family-room": "ri-chat-smile-3-line",
  "morning-meditation": "ri-sun-line",
  "courage-to-detach": "ri-heart-line",
  "family-coaching": "ri-user-heart-line",
  "education-resources": "ri-book-open-line",
  "private-messaging": "ri-message-3-line",
  "financial-aid": "ri-hand-heart-line",
};

const liveSessions = services.filter((s) => LIVE_SESSION_IDS.has(s.id));
const additionalSupport = services.filter((s) => !LIVE_SESSION_IDS.has(s.id));

export default function ServicesSection() {
  return (
    <section
      id="family-programming"
      className="relative border-t border-mist/80 bg-soft-white py-16 md:py-20 lg:py-28 overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-[min(90vw,520px)] -translate-x-1/2 rounded-full bg-powder-blue/40 blur-3xl" />

      <div className="relative max-w-content mx-auto px-6 lg:px-16">
        <div className="mx-auto max-w-2xl text-center mb-10 md:mb-12 lg:mb-14">
          <p className="text-eyebrow font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
            Family Programming
          </p>
          <h2 className="text-[clamp(26px,3vw,44px)] font-display text-deep-navy leading-[1.15] mb-4 md:mb-5">
            Free Programs for <em className="italic">Every</em> Stage of Recovery
          </h2>
          <p className="text-body-m font-body text-slate leading-relaxed mb-6 md:mb-8">
            Join live weekly sessions online — no cost, no commitment. Families nationwide connect
            with certified facilitators and peers who understand the journey you are on.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-body-s font-body font-semibold text-deep-navy">
            <li className="inline-flex items-center gap-2">
              <i className="ri-video-line text-tfrf-blue text-lg" aria-hidden />
              Live online sessions
            </li>
            <li className="inline-flex items-center gap-2">
              <i className="ri-price-tag-3-line text-tfrf-blue text-lg" aria-hidden />
              Always free
            </li>
            <li className="inline-flex items-center gap-2">
              <i className="ri-global-line text-tfrf-blue text-lg" aria-hidden />
              Open to families nationwide
            </li>
          </ul>
        </div>

        <div>
          <p className="text-caption font-body font-semibold uppercase tracking-[0.12em] text-tfrf-blue mb-5 md:mb-6">
            Weekly live sessions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            {liveSessions.map((program) => (
              <article
                key={program.id}
                className="rounded-2xl border border-mist/90 bg-pure-white p-6 md:p-7 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tfrf-blue/10 text-tfrf-blue"
                    aria-hidden
                  >
                    <i className={`${PROGRAM_ICONS[program.id]} text-2xl`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-x-4">
                      <h3 className="text-[22px] md:text-[24px] font-display text-deep-navy leading-tight">
                        {program.title}
                      </h3>
                      <p className="inline-flex w-fit items-center rounded-full bg-soft-white px-3 py-1 text-caption font-body font-semibold uppercase tracking-wider text-tfrf-blue ring-1 ring-mist">
                        {program.schedule}
                      </p>
                    </div>
                    <p className="mt-3 text-body-m font-body text-slate leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20">
          <p className="text-caption font-body font-semibold uppercase tracking-[0.12em] text-tfrf-blue mb-5 md:mb-6">
            More ways we support your family
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 lg:gap-5">
            {additionalSupport.map((program) => (
              <li key={program.id}>
                <div className="flex h-full gap-4 rounded-xl border border-mist/80 bg-pure-white/80 px-5 py-4 md:px-6 md:py-5">
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tfrf-blue/10 text-tfrf-blue"
                    aria-hidden
                  >
                    <i className={`${PROGRAM_ICONS[program.id]} text-xl`} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-body-m font-body font-semibold text-deep-navy">
                      {program.title}
                    </h3>
                    <p className="text-caption font-body font-semibold uppercase tracking-wider text-tfrf-blue mt-1">
                      {program.schedule}
                    </p>
                    <p className="mt-2 text-body-s font-body text-slate leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 md:mt-16 flex flex-col items-center gap-5 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
            <Link
              href="/family-programming#family-programming-registration"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-tfrf-blue px-8 py-3.5 text-body-s font-body font-semibold text-pure-white shadow-sm transition hover:bg-deep-navy"
            >
              Register for a session
              <i className="ri-arrow-right-line text-lg" aria-hidden />
            </Link>
            <Link
              href="/family-programming"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-mist bg-pure-white px-8 py-3.5 text-body-s font-body font-semibold text-deep-navy transition hover:border-tfrf-blue hover:text-tfrf-blue"
            >
              View all programs
            </Link>
          </div>
          <p className="text-body-s font-body text-slate">
            Questions about registration? Call{" "}
            <a
              href={CONTACT_PHONE_HREF}
              className="font-semibold text-tfrf-blue hover:text-deep-navy transition-colors"
            >
              {CONTACT_PHONE}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
