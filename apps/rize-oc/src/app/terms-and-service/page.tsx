import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import Link from "next/link";

const fallback: Metadata = {
  title: "Terms of Service | Rize OC",
  description:
    "Rize OC's Terms of Service, including text messaging consent, opt-out instructions, and governing policies for use of our website and communications.",
  alternates: { canonical: "/terms-and-service" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/terms-and-service", fallback);
}

const terms = [
  {
    number: "1",
    heading: "Opt-In Consent",
    items: [
      "By providing your phone number on the Website or through any other interaction with Rize OC, you expressly consent to receive informational, marketing, or other text messages (SMS/MMS) from us.",
      "You understand that your wireless carrier's standard messaging and data rates apply to these communications.",
    ],
  },
  {
    number: "2",
    heading: "Opt-Out Instructions",
    items: [
      "You may revoke your consent and opt out of receiving text messages at any time by replying with any of the following keywords: STOP, END, CANCEL, UNSUBSCRIBE, or STOP2END.",
      "If you opt out of text messages, you acknowledge that you may still receive calls from our representatives.",
    ],
  },
  {
    number: "3",
    heading: "Purpose of Text Messages",
    body: "We may use your phone number to send you text messages for various purposes, including but not limited to:",
    items: [
      "Appointment reminders",
      "Treatment updates",
      "Promotional offers (if you have explicitly opted-in for those)",
      "Information and resources related to recovery",
    ],
  },
  {
    number: "4",
    heading: "No Guarantee of Delivery",
    items: [
      "We do not guarantee the delivery or timely receipt of all text messages. Message delivery is contingent on your wireless carrier and factors beyond our control.",
    ],
  },
  {
    number: "5",
    heading: "Disclaimer of Warranties",
    items: [
      'Our text messaging service is provided on an "as is" basis with no warranties, express or implied.',
    ],
  },
  {
    number: "6",
    heading: "Limitation of Liability",
    items: [
      "Rize OC is not liable for any damages arising from your use of the text messaging service, or from your inability to use the service.",
    ],
  },
  {
    number: "7",
    heading: "Changes",
    items: [
      "We reserve the right to modify these Terms at any time, with updates taking effect once posted on the Website. Your continued use of the website signifies acceptance of any revised Terms.",
    ],
  },
  {
    number: "8",
    heading: "Governing Law",
    items: [
      "These Terms are governed by the laws of the State of California.",
    ],
  },
];

export default function TermsAndServicePage() {
  return (
    <main>
      {/* Page header */}
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-[1300px] px-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-accent mb-4">Legal</p>
          <h1
            className="font-[family-name:var(--font-display)] font-normal text-white"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.08 }}
          >
            Terms &amp; Service
          </h1>
          <p className="mt-4 text-sm font-light text-white/60 max-w-2xl leading-relaxed">
            By accessing and using the Rize OC website, you automatically agree to these Text Messaging Terms and
            Service. Please read them carefully before submitting any contact or inquiry forms.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[860px] px-6">

          {/* Intro */}
          <p className="text-base font-light leading-relaxed text-ink/70 mb-12">
            These Terms &amp; Service (&ldquo;Terms&rdquo;) apply to all visitors and users of the Rize OC website
            located at{" "}
            <a
              href="https://rizeoc.com"
              className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              rizeoc.com
            </a>{" "}
            (&ldquo;Website&rdquo;). By accessing or using the Website, you agree to be bound by these Terms. If
            you do not agree, please do not use the Website.
          </p>

          {/* Numbered sections */}
          <div className="flex flex-col gap-10">
            {terms.map((t) => (
              <div key={t.number} className="border-t border-warm/50 pt-8">
                <div className="flex items-start gap-5">
                  <span className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-accent/30 text-accent text-xs font-semibold">
                    {t.number}
                  </span>
                  <div className="flex-1">
                    <h2
                      className="font-[family-name:var(--font-display)] font-normal text-ink mb-3"
                      style={{ fontSize: "clamp(20px, 2vw, 26px)" }}
                    >
                      {t.heading}
                    </h2>
                    {t.body && (
                      <p className="text-sm font-light leading-relaxed text-ink/70 mb-3">{t.body}</p>
                    )}
                    <ul className="flex flex-col gap-2">
                      {t.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <i className="ri-checkbox-circle-line text-accent text-sm shrink-0 mt-0.5" />
                          <span className="text-sm font-light leading-relaxed text-ink/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-14 border-t border-warm/50 pt-8 bg-cream px-6 py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-2">Questions?</p>
            <p className="text-sm font-light leading-relaxed text-ink/70">
              If you have any questions about these Terms, please contact our team at{" "}
              <a
                href="mailto:admissions@rizeocmentalhealth.com"
                className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                admissions@rizeocmentalhealth.com
              </a>{" "}
              or call us at{" "}
              <a
                href="tel:8443490077"
                className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                (844) 349-0077
              </a>
              .
            </p>
          </div>

          {/* Footer nav */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-ink/40">© {new Date().getFullYear()} Rize OC — All rights reserved.</p>
            <div className="flex items-center gap-5 text-xs text-ink/50">
              <Link href="/privacy-policy" className="hover:text-ink transition-colors">
                Privacy Policy
              </Link>
              <Link href="/admissions" className="hover:text-ink transition-colors">
                Admissions
              </Link>
              <Link href="/" className="hover:text-ink transition-colors">
                Back to Home
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
