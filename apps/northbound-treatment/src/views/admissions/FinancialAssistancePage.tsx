import Link from "next/link";

const options = [
  {
    icon: "ri-shield-check-line",
    title: "Insurance Coverage",
    body: "Northbound is in-network with 15+ major insurance providers including Aetna, Cigna, BlueCross BlueShield, Anthem, and more. Most clients find their insurance covers a significant portion of treatment costs.",
    cta: { label: "Verify Insurance", href: "/insurance/" },
  },
  {
    icon: "ri-bank-line",
    title: "Third-Party Financing",
    body: "We work with a variety of independent lending organizations. Loans can cover tuition and may even include transportation. Multiple loan products are available with competitive rates and current low interest rates — deferral of interest may also be possible.",
    cta: null,
  },
  {
    icon: "ri-heart-line",
    title: "Scholarships & Grants",
    body: "Northbound can help potential clients apply for scholarships with several non-profit foundations affiliated with our program, including the Wahler Scholarship. Financial assistance is available for those who qualify.",
    cta: { label: "Wahler Scholarship", href: "/wahler-scholarship/" },
  },
  {
    icon: "ri-calendar-line",
    title: "Payment Plans",
    body: "We can arrange payment schedules that work within your budget. Our financial counselors will work with you to create a plan that makes treatment accessible without adding unmanageable financial burden.",
    cta: null,
  },
];

export default function FinancialAssistancePage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#1b2a47] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Admissions</p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            Financial <span className="italic text-[#e97a52]">Assistance</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            We want to help you or your loved one get the healing and treatment that will be the start
            of a new life. We don&apos;t want money to prevent anyone from getting help. Northbound is
            committed to serving those who would ordinarily have difficulty affording our services.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/insurance/" className="inline-flex items-center gap-2 bg-[#e97a52] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f09068]">
              Verify Insurance <i className="ri-arrow-right-line" />
            </Link>
            <a href="tel:8663110003" className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
              <i className="ri-phone-fill" /> (866) 311-0003
            </a>
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-16 bg-[#eef2f7]">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <i className="ri-heart-pulse-line text-4xl text-[#e97a52]" />
          <p className="mt-4 font-heading text-2xl font-bold text-[#1b2a47] md:text-3xl leading-snug">
            &ldquo;We pledge that we will always try to find a way to get everyone who contacts us
            the treatment they need.&rdquo;
          </p>
          <p className="mt-4 text-sm text-[#64748b]">— Northbound Treatment Services®</p>
        </div>
      </section>

      {/* Options */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Your Options</p>
            <h2 className="font-heading text-4xl font-bold text-[#1b2a47] md:text-5xl">Ways to Pay for Treatment</h2>
          </div>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2">
            {options.map((o) => (
              <div key={o.title} className="bg-white p-10 flex flex-col gap-4">
                <span className="flex h-12 w-12 items-center justify-center bg-[#eef2f7] text-[#1b2a47]">
                  <i className={`${o.icon} text-2xl`} />
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#1b2a47]">{o.title}</h3>
                <p className="text-sm leading-7 text-[#64748b] flex-1">{o.body}</p>
                {o.cta && (
                  <Link href={o.cta.href} className="mt-2 self-start inline-flex items-center gap-1.5 text-sm font-semibold text-[#e97a52] hover:underline">
                    {o.cta.label} <i className="ri-arrow-right-line" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1b2a47] py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              Let&apos;s find a way to make treatment work.
            </h2>
            <p className="mt-3 text-white/70">Our financial counselors are ready to help — no commitment required.</p>
          </div>
          <Link href="/contact-us/" className="shrink-0 inline-flex items-center gap-2 bg-[#e97a52] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#f09068]">
            Talk to Us <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>

    </div>
  );
}
