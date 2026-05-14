import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import Link from "next/link";

const fallback: Metadata = {
  title: "Privacy Policy & HIPAA Notice | Rize OC",
  description:
    "Rize OC's HIPAA Notice of Privacy Practices. Learn how we use and protect your protected health information (PHI) in accordance with federal law.",
  alternates: { canonical: "/privacy-policy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/privacy-policy", fallback);
}

const sections = [
  {
    heading: "Uses and Disclosures of Protected Health Information",
    body: "Your protected health information may be used and disclosed by our organization, our office staff and others outside of our office that are involved in your care and treatment for the purpose of providing health care services to you, to pay your health care bills, to support the operation of the organization, and any other use required by law.",
  },
  {
    heading: "Treatment",
    body: "We will use and disclose your protected health information to provide, coordinate, or manage your health care and any related services. This includes the coordination or management of your health care with a third party. For example, your protected health information may be provided to a physician to whom you have been referred to ensure that the physician has the necessary information to diagnose or treat you.",
  },
  {
    heading: "Payment",
    body: "Your protected health information will be used, as needed, to obtain payment for your health care services. For example, obtaining approval for a treatment program may require that your relevant protected health information be disclosed to the health plan to obtain approval for coverage.",
  },
  {
    heading: "Healthcare Operations",
    body: "We may use or disclose your protected health information in order to support the business activities of our organization. These activities include, but are not limited to, quality assessment activities, employee review activities, accreditation activities, and conducting or arranging for other business activities. We may also call you by name while you are at our facility.",
  },
  {
    heading: "Other Permitted Uses and Disclosures",
    body: "We may use or disclose your protected health information in the following situations without your authorization: as Required By Law, Public Health issues as required by law, Communicable Diseases, Health Oversight, Abuse or Neglect, Food and Drug Administration requirements, Legal Proceedings, Law Enforcement, Criminal Activity, Inmates, Military Activity, National Security, and Workers' Compensation. Other permitted and required uses and disclosures will be made only with your consent, authorization or opportunity to object, unless required by law. You may revoke this authorization, at any time, in writing, except to the extent that your physician or this organization has taken an action in reliance on the use or disclosure indicated in the authorization.",
  },
];

const rights = [
  "Inspect and copy your protected health information (certain records are excluded under federal law).",
  "Request a restriction on how your protected health information is used or disclosed for treatment, payment, or operations.",
  "Request to receive confidential communications from us by alternative means or at an alternative location.",
  "Obtain a paper copy of this notice upon request, even if you have agreed to receive it electronically.",
  "Request that our organization amend your protected health information. If denied, you may file a statement of disagreement.",
  "Receive an accounting of certain disclosures we have made of your protected health information.",
  "Be informed of any changes to the terms of this notice.",
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy &amp; HIPAA Notice
          </h1>
          <p className="mt-4 text-sm font-light text-white/60 max-w-2xl leading-relaxed">
            HIPAA Notice of Privacy Practices — as required by the Privacy Regulations Promulgated Pursuant to the
            Health Insurance Portability and Accountability Act of 1996.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[860px] px-6">

          {/* Alert banner */}
          <div className="mb-12 border-l-4 border-accent bg-cream px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-1">Important Notice</p>
            <p className="text-sm font-light leading-relaxed text-ink/80">
              This notice describes how medical information about you may be used and disclosed, and how you can
              get access to this information. <strong className="font-semibold">Please review it carefully.</strong>
            </p>
          </div>

          {/* Intro */}
          <p className="text-base font-light leading-relaxed text-ink/70 mb-10">
            This Notice of Privacy Practices describes how we may use and disclose your protected health information
            (PHI) to carry out treatment, payment or health care operations (TPO) and for other purposes that are
            permitted or required by law. It also describes your rights to access and control your protected health
            information. &ldquo;Protected health information&rdquo; is information about you, including demographic
            information, that may identify you and that relates to your past, present or future physical or mental
            health or condition and related health care services.
          </p>

          {/* Sections */}
          <div className="flex flex-col gap-10">
            {sections.map((s, i) => (
              <div key={i} className="border-t border-warm/50 pt-8">
                <h2
                  className="font-[family-name:var(--font-display)] font-normal text-ink mb-3"
                  style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
                >
                  {s.heading}
                </h2>
                <p className="text-sm font-light leading-relaxed text-ink/70">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Your Rights */}
          <div className="mt-12 border-t border-warm/50 pt-8">
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-4"
              style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
            >
              Your Rights
            </h2>
            <p className="text-sm font-light leading-relaxed text-ink/70 mb-6">
              Following is a statement of your rights with respect to your protected health information.
              Our organization is not required to agree to every restriction you may request. If our organization
              believes it is in your best interest to permit use and disclosure of your protected health information,
              your protected health information will not be restricted, and you then have the right to use another
              healthcare professional.
            </p>
            <ul className="flex flex-col gap-3">
              {rights.map((right, i) => (
                <li key={i} className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-line text-accent text-sm shrink-0 mt-0.5" />
                  <span className="text-sm font-light leading-relaxed text-ink/70">{right}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Complaints */}
          <div className="mt-12 border-t border-warm/50 pt-8">
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-3"
              style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
            >
              Complaints
            </h2>
            <p className="text-sm font-light leading-relaxed text-ink/70">
              You may complain to us or to the Secretary of Health and Human Services if you believe your privacy
              rights have been violated by us. You may file a complaint with us by notifying{" "}
              <a
                href="mailto:admissions@rizeocmentalhealth.com"
                className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                admissions@rizeocmentalhealth.com
              </a>{" "}
              of your complaint. We will not retaliate against you for filing a complaint.
            </p>
          </div>

          {/* Legal notice */}
          <div className="mt-12 border-t border-warm/50 pt-8">
            <h2
              className="font-[family-name:var(--font-display)] font-normal text-ink mb-3"
              style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
            >
              Legal Duty
            </h2>
            <p className="text-sm font-light leading-relaxed text-ink/70 mb-4">
              We are required by law to maintain the privacy of, and provide individuals with, this notice of our
              legal duties and privacy practices with respect to protected health information. We reserve the right
              to change the terms of this notice and will inform you of any changes. You then have the right to
              object or withdraw as provided in this notice.
            </p>
            <p className="text-sm font-light leading-relaxed text-ink/70">
              If you have any questions or objections, please speak with our admissions team in person or call us at{" "}
              <a
                href="tel:8443490077"
                className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                (844) 349-0077
              </a>
              . For more information, visit{" "}
              <a
                href="https://www.hhs.gov/hipaa/for-individuals/notice-privacy-practices/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                HHS.gov HIPAA Privacy Practices
              </a>
              .
            </p>
          </div>

          {/* Footer nav */}
          <div className="mt-14 border-t border-warm/50 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-ink/40">© {new Date().getFullYear()} Rize OC — All rights reserved.</p>
            <div className="flex items-center gap-5 text-xs text-ink/50">
              <Link href="/terms-and-service" className="hover:text-ink transition-colors">
                Terms &amp; Service
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
