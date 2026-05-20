import Link from "next/link";
import MarketingPageHero, { MarketingCtaLink } from "@/components/marketing/MarketingPageHero";
import { programsList } from "@/mocks/family-programming";

const registrationHref: Record<string, string> = {
  "fix-your-family": "/registration/fix-your-family",
  "family-room": "/registration/the-family-room",
  "morning-meditation": "/registration/morning-meditation",
  "courage-to-detach": "/family-programming",
  "one-on-one-coaching": "/contact",
  "family-education": "/family-programming",
  "private-messaging": "/family-programming",
  "financial-aid": "/get-help",
};

export default function MeetingsPage() {
  return (
    <main className="bg-soft-white">
      <MarketingPageHero
        eyebrow="Weekly Live Sessions"
        title="Meetings"
        body="Through weekly live sessions, we dive into essential skills for personal recovery, establishing healthy boundaries, and finding our way to the life we were intended to live. Our comprehensive approach includes clinical expertise, peer support, and practical tools for families."
      >
        <MarketingCtaLink href="/family-programming" label="View all programming" primary />
      </MarketingPageHero>

      <section className="pb-16 md:pb-24">
        <div className="max-w-content mx-auto px-6 lg:px-16">
          <div className="grid gap-4 md:gap-5">
            {programsList.map((program) => {
              const href = registrationHref[program.id] ?? "/family-programming";
              return (
                <article
                  key={program.id}
                  className="rounded-2xl bg-pure-white border border-mist/60 p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                >
                  <div className="max-w-2xl">
                    <h2 className="text-[20px] md:text-[22px] font-display text-deep-navy mb-2">
                      {program.title}
                    </h2>
                    <p className="text-[13px] font-body font-semibold text-tfrf-blue mb-3">
                      {program.schedule}
                    </p>
                    <p className="text-[15px] font-body text-slate leading-relaxed">{program.description}</p>
                  </div>
                  <Link
                    href={href}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-tfrf-blue px-6 py-3 text-[14px] font-body font-semibold text-pure-white hover:bg-deep-navy transition-colors"
                  >
                    Register
                    <i className="ri-arrow-right-line" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
