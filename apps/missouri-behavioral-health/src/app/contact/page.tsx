import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LeadForm from "@/components/forms/LeadForm";
import {
  CONTAINER,
  EMAIL,
  FACILITY_ADDRESS,
  PHONE_DISPLAY,
  PHONE_HREF,
} from "@/data/site";

const fallback: Metadata = {
  title: "Contact Missouri Behavioral Health | Springfield, MO",
  description:
    "Contact Missouri Behavioral Health in Springfield, MO. Call 417-771-5305 or send a message about mental health and addiction treatment. Admissions available 24/7.",
  alternates: { canonical: "/contact" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/contact", fallback);
}

const CONTACT_METHODS = [
  {
    icon: "ri-phone-fill",
    label: "Call us 24/7",
    value: PHONE_DISPLAY,
    href: PHONE_HREF,
    note: "Admissions coordinators available around the clock",
  },
  {
    icon: "ri-mail-line",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    note: "We respond to messages within one business day",
  },
  {
    icon: "ri-map-pin-2-line",
    label: "Visit us",
    value: FACILITY_ADDRESS,
    href: "https://maps.google.com/?q=2942+E+Battlefield+Rd,+Springfield,+MO+65804",
    note: "Springfield, Missouri — and statewide via telehealth",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="bg-mbh-forest-deep py-16 text-white lg:py-20">
        <div className={CONTAINER}>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-mbh-sage" aria-hidden />
            <span className="font-body text-[11px] font-semibold uppercase tracking-[0.32em] text-mbh-sage">
              Contact Us
            </span>
          </div>
          <h1
            className="max-w-3xl font-display font-semibold leading-[1.05] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            We&apos;re here whenever you&apos;re ready.
          </h1>
          <p className="mt-5 max-w-xl font-body text-[1.0625rem] leading-relaxed text-white/65">
            Reach out for confidential answers about treatment, admissions, or insurance. Every
            conversation is judgment-free and protected by HIPAA.
          </p>
        </div>
      </section>

      {/* Methods + form */}
      <section className="py-[88px]">
        <div className={`${CONTAINER} grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16`}>
          <div>
            <h2 className="font-display text-2xl font-semibold text-mbh-forest">Get in touch</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-mbh-body">
              Call for the fastest response, or use any of the options below. If it&apos;s a medical
              emergency, dial 911.
            </p>

            <div className="mt-8 space-y-4">
              {CONTACT_METHODS.map((m) => (
                <a
                  key={m.label}
                  href={m.href}
                  className="group flex items-start gap-4 rounded-2xl border border-mbh-forest/10 bg-white p-5 transition hover:border-mbh-green/30 hover:shadow-md hover:shadow-mbh-forest/5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mbh-green/10">
                    <i className={`${m.icon} text-xl text-mbh-green`} aria-hidden />
                  </span>
                  <div>
                    <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-mbh-forest/55">
                      {m.label}
                    </p>
                    <p className="mt-0.5 font-display text-base font-semibold text-mbh-forest transition group-hover:text-mbh-green">
                      {m.value}
                    </p>
                    <p className="mt-1 font-body text-xs leading-relaxed text-mbh-body/70">{m.note}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-mbh-forest px-6 py-5 text-white">
              <p className="font-display text-sm font-semibold">In crisis right now?</p>
              <p className="mt-1.5 font-body text-xs leading-relaxed text-white/70">
                Call or text the 988 Suicide &amp; Crisis Lifeline, or dial 911 for emergencies. If you
                are not in immediate danger, our team is here 24/7.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-mbh-forest/10 bg-white p-6 shadow-lg shadow-mbh-forest/5 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-mbh-forest">Send us a message</h2>
            <p className="mt-1.5 font-body text-sm text-mbh-body">
              Tell us a little about what you need and we&apos;ll be in touch.
            </p>
            <div className="mt-6">
              <LeadForm
                source="Contact Page"
                submitLabel="Send message"
                fields={["name", "email", "phone", "service", "message"]}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
