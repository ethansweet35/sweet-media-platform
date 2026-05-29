import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { BRAND_NAME } from "@/data/site";

const fallback: Metadata = {
  title: "Privacy Policy | Missouri Behavioral Health",
  description:
    "How Missouri Behavioral Health collects, uses, and protects your information, including HIPAA-protected health information.",
  alternates: { canonical: "/privacy-policy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/privacy-policy", fallback);
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="May 2026"
      intro={`${BRAND_NAME} is committed to protecting your privacy. This policy explains what information we collect through this website, how we use it, and the choices you have. Protected health information is also governed by our HIPAA Notice of Privacy Practices.`}
    >
      <h2>Information we collect</h2>
      <p>
        We collect information you voluntarily provide through our contact and insurance-verification
        forms — such as your name, email address, phone number, insurance details, and any message you
        send us. We also automatically collect limited technical data (such as IP address, browser type,
        and pages visited) through standard web analytics.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your inquiries and provide the information or care you request</li>
        <li>To verify your insurance benefits when you ask us to</li>
        <li>To coordinate admissions and treatment services</li>
        <li>To improve our website and understand how visitors use it</li>
        <li>To comply with legal and regulatory obligations</li>
      </ul>

      <h2>Protected health information (HIPAA)</h2>
      <p>
        Any health information you share with us is treated as Protected Health Information (PHI) under
        the Health Insurance Portability and Accountability Act (HIPAA). We maintain administrative,
        physical, and technical safeguards to protect it and use or disclose it only as permitted by law
        and described in our Notice of Privacy Practices.
      </p>

      <h2>How we share information</h2>
      <p>
        We do not sell your personal information. We may share information with trusted service providers
        who help us operate our website and communications (such as email delivery), with insurers when
        you request benefit verification, and when required by law.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        Our website may use cookies and similar technologies to support functionality and measure
        performance. You can control cookies through your browser settings; disabling them may affect
        some features.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You may request access to, correction of, or deletion of the personal information you have
        provided to us by contacting us using the details below. You can also opt out of non-essential
        communications at any time.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This website is intended for adults. We do not knowingly collect personal information from
        children under 13 without appropriate consent.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy periodically. Material changes will be reflected by the
        &ldquo;Last updated&rdquo; date above.
      </p>
    </LegalPageShell>
  );
}
