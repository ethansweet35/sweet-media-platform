import InsuranceForm from "./InsuranceForm";
import IconCircle from "@/components/ui/IconCircle";
import { AutoLinkedText } from "@sweetmedia/blog-core";

const trustBadges = [
  { icon: "ri-checkbox-circle-line", label: "Licensed & Accredited" },
  { icon: "ri-checkbox-circle-line", label: "Insurance Accepted" },
  { icon: "ri-checkbox-circle-line", label: "24/7 Admissions" },
];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(145deg, #F8F6F3 0%, #F4F4F6 55%, #EEEEF1 100%)" }}
    >
      {/* Concentric arcs — bottom-left corner, evoking coastal ripples */}
      <div
        className="pointer-events-none absolute bottom-0 left-0"
        style={{ width: 520, height: 520 }}
        aria-hidden
      >
        <svg width="520" height="520" viewBox="0 0 520 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="520" r="200" stroke="#2C302E" strokeWidth="0.8" fill="none" opacity="0.07"/>
          <circle cx="0" cy="520" r="300" stroke="#2C302E" strokeWidth="0.8" fill="none" opacity="0.05"/>
          <circle cx="0" cy="520" r="400" stroke="#2C302E" strokeWidth="0.8" fill="none" opacity="0.035"/>
          <circle cx="0" cy="520" r="500" stroke="#2C302E" strokeWidth="0.8" fill="none" opacity="0.02"/>
        </svg>
      </div>

      {/* Thin amber left edge accent */}
      <div className="pointer-events-none absolute left-0 top-[15%] bottom-[15%] w-[2px] bg-accent/25" aria-hidden />

      <div className="mx-auto max-w-[1300px] w-full px-6 grid lg:grid-cols-[1fr_500px] min-h-[894px] items-center gap-0">

        {/* Left — content */}
        <div className="relative flex flex-col justify-center px-8 py-20 lg:px-16 lg:py-28">
          {/* Eyebrow pill */}
          <div className="flex items-center gap-2 mb-5">
            <div className="border border-ink/20 px-4 py-1.5 flex items-center gap-2.5">
              <i className="ri-user-line text-accent text-sm" />
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-ink">
                California Sanctuary
              </span>
            </div>
          </div>

          <h1
            className="font-[family-name:var(--font-display)] font-normal text-ink"
            style={{ fontSize: "clamp(50px, 6.5vw, 95px)", lineHeight: 0.95 }}
          >
            <span>Mental Health &amp; Addiction Treatment</span>
            <br />
            <em className="italic">In California</em>
          </h1>

          <div className="mt-5 mb-6 w-16 h-[2px] bg-accent" />

          <p className="max-w-md text-base font-light leading-relaxed text-ink/70">
            <AutoLinkedText>{"A profound sanctuary for recovery. We blend elite clinical methodology\n            with the quiet, restorative power of the Southern California coast."}</AutoLinkedText>
          </p>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {trustBadges.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <i className={`${icon} text-accent text-base`} />
                <span className="text-sm font-normal text-ink/80">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="tel:9494612620"
              className="flex items-center gap-2 bg-accent px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white hover:opacity-90 transition-opacity"
            >
              <i className="ri-phone-line text-sm" />
              (949)-461-2620
            </a>
            <a
              href="#programs"
              className="flex items-center gap-2 border border-ink px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-ink hover:bg-ink hover:text-white transition-colors"
            >
              Explore Programs
            </a>
          </div>
        </div>

        {/* Right — floating form card */}
        <div id="verify" className="flex items-center justify-center px-6 py-16 lg:px-10">
          <div
            className="w-full bg-white border border-warm/50"
            style={{ boxShadow: "0 48px 100px 0px rgba(217,138,83,0.42), 0 4px 16px -2px rgba(44,48,46,0.08)" }}
          >
            <div className="flex items-center gap-3 px-8 pt-8 pb-5">
              <IconCircle icon="ri-shield-check-line" variant="ink" size="md" iconSize="text-lg" />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink">Check Coverage</p>
                <p className="text-xs text-ink/50 mt-0.5"><AutoLinkedText>{"Verify your insurance in minutes"}</AutoLinkedText></p>
              </div>
            </div>

            <div className="px-8 pb-8">
              <InsuranceForm />
              <p className="mt-4 text-xs text-ink/40 leading-relaxed">
                <AutoLinkedText>{"Your information is confidential and HIPAA compliant. We&apos;ll contact you within 24 hours."}</AutoLinkedText>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
