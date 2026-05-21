import Link from "next/link";
import { PAGE_TOP_NAV_PADDING } from "@/lib/layout";
import { liveSessions } from "@/mocks/live-sessions";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/tfrf-nav";

const instagram = SOCIAL_LINKS.find((link) => link.label === "Instagram");
const youtube = SOCIAL_LINKS.find((link) => link.label === "YouTube");

export default function ThankYouPage() {
  return (
    <main className="bg-soft-white min-h-screen">
      <section className={`bg-pure-white ${PAGE_TOP_NAV_PADDING} pb-12 md:pb-16`}>
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-tfrf-blue/10 text-tfrf-blue">
              <i className="ri-checkbox-circle-line text-4xl" />
            </span>
            <p className="text-[12px] font-body font-semibold uppercase tracking-[0.2em] text-tfrf-blue mb-4">
              Registration confirmed
            </p>
            <h1 className="text-[clamp(32px,4vw,48px)] font-display text-deep-navy leading-[1.1] mb-6">
              Thank you for registering
            </h1>
            <p className="text-[17px] font-body text-slate leading-relaxed">
              We are humbled you chose us to walk your journey with you. Our mission is to ensure no
              family walks this journey alone.
            </p>
            <p className="mt-4 text-[15px] font-body text-stone-blue leading-relaxed">
              Check your inbox — we sent a confirmation email with session times and links to join.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto space-y-5">
            <h2 className="text-[22px] md:text-[26px] font-display text-deep-navy">
              Our service offerings
            </h2>
            {liveSessions.map((session) => (
              <article
                key={session.id}
                className="rounded-2xl border border-mist bg-pure-white p-6 md:p-8 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tfrf-blue/10 text-tfrf-blue">
                    <i className={`${session.icon} text-xl`} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[20px] font-display text-deep-navy">{session.title}</h3>
                    {session.subtitle ? (
                      <p className="mt-1 text-[14px] font-body font-medium text-tfrf-blue">
                        {session.subtitle}
                      </p>
                    ) : null}
                    <p className="mt-2 text-[13px] font-body font-semibold text-deep-navy/80">
                      {session.schedule}
                    </p>
                    <p className="mt-3 text-[15px] font-body text-slate leading-relaxed">
                      {session.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto rounded-2xl bg-mist/60 border border-mist p-6 md:p-8">
            <h2 className="text-[20px] font-display text-deep-navy mb-3">Missed a session?</h2>
            <p className="text-[15px] font-body text-slate leading-relaxed mb-5">
              Catch up anytime — watch the same videos we cover in group, or explore additional
              resources on our education page.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {youtube ? (
                <a
                  href={youtube.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-tfrf-blue hover:bg-pure-white transition-colors"
                >
                  <i className="ri-youtube-fill text-red-600" />
                  Watch on YouTube
                </a>
              ) : null}
              <Link
                href="/education"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-tfrf-blue hover:bg-pure-white transition-colors"
              >
                <i className="ri-book-open-line" />
                Explore our education page
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto rounded-2xl bg-deep-navy text-pure-white p-8 md:p-10 text-center">
            <p className="text-[12px] font-body font-semibold uppercase tracking-[0.2em] text-sky-blue mb-4">
              You are not alone
            </p>
            <p className="text-[17px] font-body leading-relaxed text-pure-white/90">
              As the world shifts around us, remember—healing is always possible. You matter. Your
              story matters. And we are honored to walk alongside you in this journey.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-mist bg-pure-white p-6 md:p-7">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-tfrf-blue/10 text-tfrf-blue">
                <i className="ri-instagram-line text-lg" />
              </span>
              <h3 className="text-[18px] font-display text-deep-navy mb-2">Want to connect even more?</h3>
              <p className="text-[15px] font-body text-slate leading-relaxed mb-4">
                Reply to your confirmation email with your Instagram handle, and we&apos;ll add you to
                our private Instagram family group.
              </p>
              {instagram ? (
                <a
                  href={instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-body font-semibold text-tfrf-blue hover:text-deep-navy"
                >
                  Follow @{instagram.href.split("/").pop()}
                  <i className="ri-arrow-right-line" />
                </a>
              ) : null}
            </article>

            <article className="rounded-2xl border border-mist bg-pure-white p-6 md:p-7">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-tfrf-blue/10 text-tfrf-blue">
                <i className="ri-user-heart-line text-lg" />
              </span>
              <h3 className="text-[18px] font-display text-deep-navy mb-2">Need personalized support?</h3>
              <p className="text-[15px] font-body text-slate leading-relaxed mb-4">
                We offer one-on-one services to meet your unique needs—please don&apos;t hesitate to
                reach out.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[14px] font-body font-semibold text-tfrf-blue hover:text-deep-navy"
              >
                Contact our team
                <i className="ri-arrow-right-line" />
              </Link>
              <p className="mt-3 text-[13px] font-body text-stone-blue">
                Or email{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-tfrf-blue hover:text-deep-navy">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </article>
          </div>

          <div className="max-w-3xl mx-auto mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/meetings"
              className="inline-flex items-center gap-2 rounded-full bg-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-pure-white hover:bg-deep-navy transition-colors"
            >
              View all meetings
            </Link>
            <Link
              href="/family-programming"
              className="inline-flex items-center gap-2 rounded-full border border-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-tfrf-blue hover:bg-mist transition-colors"
            >
              Family programming
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
