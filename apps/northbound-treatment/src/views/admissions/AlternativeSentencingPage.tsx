import Link from "next/link";

const steps = [
  { icon: "ri-phone-line", title: "Call or Contact Us", body: "Reach out to our admissions team. We will assess your situation confidentially and determine whether alternative sentencing treatment is appropriate." },
  { icon: "ri-file-text-line", title: "Clinical Assessment", body: "Our clinical team conducts a thorough evaluation and prepares the necessary documentation for your attorney and the court." },
  { icon: "ri-scales-line", title: "Court Coordination", body: "We work directly with your attorney, probation officer, or the court to present your treatment plan and advocate for a treatment-based sentence." },
  { icon: "ri-home-heart-line", title: "Begin Treatment", body: "Once approved, you enter our program. Completion of the program satisfies the court requirement and helps you build a lasting foundation for recovery." },
];

const eligible = [
  "Recent arrest or pending charges related to substance use",
  "DUI or drug possession offenses",
  "Court-mandated referrals from probation or parole",
  "Drug court participants",
  "Individuals facing sentencing who have not yet been incarcerated",
  "Those seeking treatment as a condition of bail or plea agreement",
];

export default function AlternativeSentencingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#1b2a47] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Admissions</p>
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
            Alternative <span className="italic text-[#e97a52]">Sentencing</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            Northbound offers treatment specifically designed for individuals who have experienced
            legal repercussions as a result of their addiction. We have helped hundreds of clients
            avoid incarceration through the completion of our alternative sentencing program.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/admissions/" className="inline-flex items-center gap-2 bg-[#e97a52] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#f09068]">
              Start Admissions <i className="ri-arrow-right-line" />
            </Link>
            <Link href="/contact-us/" className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">Who This Helps</p>
              <h2 className="font-heading text-4xl font-bold text-[#1b2a47] mb-6 md:text-5xl">
                Treatment Instead of Incarceration
              </h2>
              <p className="text-sm leading-7 text-[#64748b] mb-4">
                Our clients often seek treatment as a result of a new or pending charge, and we have been
                successful in helping them avoid jail time through the completion of our alternative
                sentencing program. We understand that addiction and its resulting complications can cause
                stress to everyone involved — families are in crisis and everyone is scared about the future.
              </p>
              <p className="text-sm leading-7 text-[#64748b]">
                An impending conviction threatens the individual&apos;s freedom, safety, and future
                professional success. Our court services team will offer assistance to you and your
                attorney to help demonstrate to the court that treatment — not incarceration — is the
                right path forward.
              </p>
            </div>
            <div className="bg-[#eef2f7] p-8">
              <h3 className="font-heading text-xl font-bold text-[#1b2a47] mb-6">Who May Qualify</h3>
              <ul className="space-y-4">
                {eligible.map((e) => (
                  <li key={e} className="flex items-start gap-3">
                    <i className="ri-check-line text-[#e97a52] mt-0.5 shrink-0" />
                    <span className="text-sm leading-6 text-[#64748b]">{e}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#eef2f7]">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e97a52]">The Process</p>
            <h2 className="font-heading text-4xl font-bold text-[#1b2a47] md:text-5xl">How It Works</h2>
          </div>
          <div className="grid gap-px bg-[#cdd8e8] sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="bg-white p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center bg-[#e97a52] text-white text-xs font-bold">{i + 1}</span>
                  <i className={`${s.icon} text-xl text-[#1b2a47]`} />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#1b2a47]">{s.title}</h3>
                <p className="text-sm leading-7 text-[#64748b]">{s.body}</p>
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
              Time-sensitive? We move quickly.
            </h2>
            <p className="mt-3 text-white/70">Call us now — our admissions team is available 24/7.</p>
          </div>
          <a href="tel:8663110003" className="shrink-0 inline-flex items-center gap-2 bg-[#e97a52] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#f09068]">
            <i className="ri-phone-fill" /> (866) 311-0003
          </a>
        </div>
      </section>

    </div>
  );
}
