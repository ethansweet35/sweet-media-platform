import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { BRAND_NAME } from "@/data/site";

const fallback: Metadata = {
  title: "Terms of Use | Missouri Behavioral Health",
  description:
    "The terms and conditions governing your use of the Missouri Behavioral Health website.",
  alternates: { canonical: "/terms" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/terms", fallback);
}

export default function TermsPage() {
  return (
    <LegalPageShell
      eyebrow="Legal"
      title="Terms of Use"
      lastUpdated="May 2026"
      intro={`By accessing or using the ${BRAND_NAME} website, you agree to these Terms of Use. Please read them carefully. If you do not agree, please do not use this site.`}
    >
      <h2>No medical advice</h2>
      <p>
        The content on this website is provided for general informational and educational purposes only.
        It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the
        advice of a qualified health provider with any questions about a medical condition. Using this
        site does not create a provider-patient relationship.
      </p>

      <h2>Medical emergencies</h2>
      <p>
        If you are experiencing a medical emergency, call 911 immediately. If you are in emotional crisis
        or having thoughts of suicide, call or text 988 to reach the Suicide &amp; Crisis Lifeline.
      </p>

      <h2>Use of the website</h2>
      <ul>
        <li>You agree to use this website only for lawful purposes</li>
        <li>You will not attempt to disrupt, damage, or gain unauthorized access to the site or its systems</li>
        <li>You will not submit false, misleading, or fraudulent information through our forms</li>
        <li>You will not use the site to harass, abuse, or harm another person</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        All content on this website — including text, graphics, logos, and images — is owned by or
        licensed to {BRAND_NAME} and is protected by applicable intellectual property laws. You may not
        reproduce, distribute, or create derivative works without our written permission.
      </p>

      <h2>Third-party links</h2>
      <p>
        Our website may contain links to third-party sites for your convenience. We are not responsible
        for the content, privacy practices, or accuracy of those external sites.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        This website is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied.
        We do not warrant that the site will be uninterrupted, error-free, or free of harmful components.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {BRAND_NAME} will not be liable for any indirect,
        incidental, or consequential damages arising from your use of this website.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may revise these Terms of Use at any time. Continued use of the website after changes are
        posted constitutes your acceptance of the updated terms.
      </p>
    </LegalPageShell>
  );
}
