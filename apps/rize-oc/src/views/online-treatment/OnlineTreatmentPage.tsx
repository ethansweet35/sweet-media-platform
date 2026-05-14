import AccreditationsBar from "@/views/home/components/AccreditationsBar";
import InsuranceSection from "@/views/home/components/InsuranceSection";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Link from "next/link";

export interface OnlineTreatmentData {
  eyebrow: string;
  headline: string;
  subhead: string;
  conditionName: string;
  overviewTitle: string;
  overviewBody: string[];
  whatWeProvide: { icon: string; title: string; desc: string }[];
  howItWorks: { step: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const virtualLevels = [
  { icon: "ri-hospital-line",       label: "PHP",       desc: "5–6 hrs/day, 5–7 days/week — highest virtual intensity" },
  { icon: "ri-calendar-check-line", label: "IOP",       desc: "3–5 days/week, 3 hrs/session — structured and flexible" },
  { icon: "ri-chat-3-line",         label: "Outpatient",desc: "Weekly individual & group sessions for ongoing support" },
];

export default function OnlineTreatmentPage({
  eyebrow,
  headline,
  subhead,
  conditionName,
  overviewTitle,
  overviewBody,
  whatWeProvide,
  howItWorks,
  faqs,
}: OnlineTreatmentData) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-[1300px] px-6 grid lg:grid-cols-[1fr_420px] gap-16 items-center">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-5">{eyebrow}</p>
            <h1
              className="font-[family-name:var(--font-display)] font-normal text-white mb-6"
              style={{ fontSize: "clamp(38px, 5vw, 72px)", lineHeight: 1.06 }}
            >
              {headline}
            </h1>
            <p className="text-base font-light leading-relaxed text-white/65 max-w-xl mb-8">{subhead}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:9494612620"
                className="inline-flex items-center gap-2 bg-accent px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white hover:opacity-90 transition-opacity"
              >
                <i className="ri-phone-fill text-sm" />
                (949) 461-2620
              </a>
              <Link
                href="/admissions#inquiry-form"
                className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white hover:border-white/60 transition-colors"
              >
                Verify Insurance
              </Link>
            </div>
            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {[
                { icon: "ri-shield-check-line", text: "HIPAA Compliant" },
                { icon: "ri-wifi-line",          text: "Available Across California" },
                { icon: "ri-time-line",          text: "Same-Day Intake Available" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs font-light text-white/50">
                  <i className={`${icon} text-accent text-sm`} />
                  {text}
                </div>
              ))}
            </div>
          </div>
          {/* Info card */}
          <div className="bg-white/5 border border-white/10 p-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent mb-5">Virtual Care Benefits</p>
            <div className="flex flex-col gap-4">
              {[
                "Attend from anywhere in California",
                "No commute — full access from home",
                "Same evidence-based care as in-person",
                "Flexible scheduling for working adults",
                "Most PPO insurance plans accepted",
                "Secure, HIPAA-compliant video platform",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-line text-accent text-sm shrink-0 mt-0.5" />
                  <span className="text-sm font-light text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AccreditationsBar />

      {/* Clinical Overview */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="mb-10">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Clinical Overview</p>
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
          {/* What we provide */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-accent mb-4">What We Provide</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {whatWeProvide.map((item) => (
                <div key={item.title} className="border border-warm/40 bg-cream p-4">
                  <div className="flex items-center gap-3 mb-1.5">
                    <i className={`${item.icon} text-accent text-base`} />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink">{item.title}</span>
                  </div>
                  <p className="text-xs font-light leading-relaxed text-ink/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="text-center mb-14">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Getting Started</p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink"
              style={{ fontSize: "clamp(28px, 3vw, 46px)", lineHeight: 1.08 }}
            >
              How Online {conditionName} Treatment Works
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <div key={step.step} className="bg-white border border-warm/40 p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">{step.step}</span>
                  <div className="w-8 h-[1px] bg-warm" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-ink mb-3">{step.title}</h3>
                <p className="text-xs font-light leading-relaxed text-ink/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Levels of Care */}
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-[1300px] px-6">
          <div className="text-center mb-12">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-3">Virtual Programs</p>
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-white"
              style={{ fontSize: "clamp(28px, 3vw, 46px)", lineHeight: 1.08 }}
            >
              Levels of Virtual Care Available
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm font-light text-white/60">
              Our virtual {conditionName.toLowerCase()} treatment is available across multiple levels of care — matched to your clinical needs and schedule.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {virtualLevels.map((level) => (
              <div key={level.label} className="border border-white/10 bg-white/5 p-8 text-center">
                <i className={`${level.icon} text-accent text-3xl mb-4 block`} />
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white mb-2">{level.label}</h3>
                <p className="text-xs font-light text-white/50 leading-relaxed">{level.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="tel:9494612620"
              className="inline-flex items-center gap-2 bg-accent px-8 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-white hover:opacity-90 transition-opacity"
            >
              <i className="ri-phone-fill text-sm" />
              Call Now — Free Assessment
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
