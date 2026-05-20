import Image from "next/image";
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
    <section className="relative overflow-hidden bg-ink">
      {/* Background Image */}
      <Image
        src="https://uivbbrwuaffqujzkqjvr.supabase.co/storage/v1/object/public/site-assets/images/rize_home_hero01.jpg"
        alt="Rize OC Mental Health and Addiction Treatment Center"
        fill
        className="object-cover object-center opacity-40"
        priority
      />

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/20" />

      <div className="relative mx-auto max-w-[1300px] w-full px-[30px] lg:px-6 py-section grid lg:grid-cols-[1fr_460px] items-center gap-8 lg:gap-12">
        
        {/* Left — content */}
        <div className="relative flex flex-col justify-center">
          {/* Eyebrow pill */}
          <div className="flex items-center gap-2 mb-6">
            <div className="border border-white/20 px-4 py-1.5 flex items-center gap-2.5 bg-white/5 backdrop-blur-sm">
              <i className="ri-user-line text-accent text-sm" />
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white">
                California Sanctuary
              </span>
            </div>
          </div>

          <h1
            className="font-[family-name:var(--font-display)] font-normal text-white"
            style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.05 }}
          >
            Mental Health &amp; Addiction Treatment
            <br />
            <em className="italic text-white/90">In California</em>
          </h1>

          <div className="mt-6 mb-7 w-16 h-[2px] bg-accent" />

          <p className="max-w-lg text-base font-light leading-relaxed text-white/80">
            <AutoLinkedText>{"A profound sanctuary for recovery. We blend elite clinical methodology\n            with the quiet, restorative power of the Southern California coast."}</AutoLinkedText>
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {trustBadges.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <i className={`${icon} text-accent text-base`} />
                <span className="text-sm font-normal text-white/90">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="tel:9494612620"
              className="flex items-center gap-2 bg-accent px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white hover:bg-accent/90 transition-colors"
            >
              <i className="ri-phone-line text-sm" />
              (949)-461-2620
            </a>
            <a
              href="#programs"
              className="flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white hover:bg-white hover:text-ink transition-colors"
            >
              Explore Programs
            </a>
          </div>
        </div>

        {/* Right — floating form card */}
        <div id="verify" className="flex items-center justify-center">
          <div
            className="w-full bg-white border border-white/10"
            style={{ boxShadow: "0 24px 80px -12px rgba(0,0,0,0.5)" }}
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
                <AutoLinkedText>{"Your information is confidential and HIPAA compliant. We'll contact you within 24 hours."}</AutoLinkedText>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
