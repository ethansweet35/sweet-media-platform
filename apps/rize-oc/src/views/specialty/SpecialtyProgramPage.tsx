import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import InsuranceSection from "@/views/home/components/InsuranceSection";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Link from "next/link";

export interface SpecialtyProgramData {
  eyebrow: string;
  headline: string;
  subhead: string;
  overviewTitle: string;
  overviewBody: string[];
  features: { icon: string; title: string; desc: string }[];
  steps: { step: string; title: string; desc: string }[];
  whyRize: { icon: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  ctaLabel?: string;
}

export default function SpecialtyProgramPage({
  eyebrow,
  headline,
  subhead,
  overviewTitle,
  overviewBody,
  features,
  steps,
  whyRize,
  faqs,
  ctaLabel = "Speak With Our Team",
}: SpecialtyProgramData) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="min-w-0 w-full lg:max-w-[52rem]">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-5">{eyebrow}</p>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white mb-6"
              style={{ fontSize: "clamp(38px, 5vw, 72px)", lineHeight: 1.06 }}
            >
              {headline}
            </h1>
            <p className="text-base font-light leading-relaxed text-white/65 max-w-2xl mb-8">{subhead}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:9494612620"
                className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white hover:opacity-90 transition-opacity"
              >
                <i className="ri-phone-fill text-sm" />
                (949) 461-2620
              </a>
              <Link
                href="/verify-insurance"
                className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white hover:border-white/60 transition-colors"
              >
                Verify Insurance
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {[
                { icon: "ri-shield-check-line", text: "Confidential & HIPAA Compliant" },
                { icon: "ri-time-line",          text: "Same-Day Assessment Available" },
                { icon: "ri-hand-heart-line",    text: "Insurance Accepted" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs font-light text-white/50">
                  <i className={`${icon} text-accent text-sm`} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AccreditationsBar />

      {/* Overview + Features */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-[1300px] px-6">
          {/* Header */}
          <div className="mb-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">About This Program</p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-4"
              style={{ fontSize: "clamp(28px, 3vw, 46px)", lineHeight: 1.08 }}
            >
              {overviewTitle}
            </h2>
            <div className="w-12 h-[2px] bg-accent mb-5" />
            <div className="grid lg:grid-cols-3 gap-4">
              {overviewBody.map((para, i) => (
                <p key={i} className="text-sm font-light leading-relaxed text-ink/70">{para}</p>
              ))}
            </div>
          </div>
          {/* Features grid */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent mb-4">Program Features</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {features.map((f) => (
                <div key={f.title} className="border border-warm/40 bg-cream p-4">
                  <div className="flex items-center gap-3 mb-1.5">
                    <i className={`${f.icon} text-accent text-base`} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">{f.title}</span>
                  </div>
                  <p className="text-xs font-light leading-relaxed text-ink/60">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Getting Started</p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink"
              style={{ fontSize: "clamp(28px, 3vw, 46px)", lineHeight: 1.08 }}
            >
              How It Works
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="bg-white border border-warm/40 p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">{s.step}</span>
                  <div className="w-8 h-[1px] bg-warm" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-ink mb-3">{s.title}</h3>
                <p className="text-xs font-light leading-relaxed text-ink/60">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Rize */}
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Why Rize OC</p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white"
              style={{ fontSize: "clamp(28px, 3vw, 46px)", lineHeight: 1.08 }}
            >
              A Higher Standard of Care
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyRize.map((item) => (
              <div key={item.title} className="border border-white/10 bg-white/5 p-7">
                <i className={`${item.icon} text-accent text-2xl mb-5 block`} />
                <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-white mb-3">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="tel:9494612620"
              className="inline-flex items-center gap-2 bg-accent px-8 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-white hover:opacity-90 transition-opacity"
            >
              <i className="ri-phone-fill text-sm" />
              {ctaLabel}
            </a>
          </div>
        </div>
      </section>

      <InsuranceSection />

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-[860px] px-6">
            <div className="text-center mb-12">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Common Questions</p>
              <h2
                className="font-[family-name:var(--font-display)] font-normal text-ink"
                style={{ fontSize: "clamp(28px, 3vw, 42px)", lineHeight: 1.08 }}
              >
                Frequently Asked Questions
              </h2>
            </div>
            <FaqAccordion items={faqs} />
          </div>
        </section>
      )}
    </main>
  );
}
