import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { BRAND_NAME } from "@/data/site";

const fallback: Metadata = {
  title: "Accessibility Statement | Missouri Behavioral Health",
  description:
    "Missouri Behavioral Health is committed to digital accessibility for all visitors, including people with disabilities.",
  alternates: { canonical: "/accessibility" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/accessibility", fallback);
}

export default function AccessibilityPage() {
  return (
    <LegalPageShell
      eyebrow="Commitment"
      title="Accessibility Statement"
      lastUpdated="May 2026"
      intro={`${BRAND_NAME} is committed to ensuring our website is accessible to everyone, including people with disabilities. We believe access to mental health and addiction care information should never be limited by ability.`}
    >
      <h2>Our commitment</h2>
      <p>
        We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These
        guidelines explain how to make web content more accessible to people with a wide range of
        disabilities, including visual, auditory, cognitive, and motor impairments.
      </p>

      <h2>Measures we take</h2>
      <ul>
        <li>Semantic HTML and descriptive labels for assistive technologies</li>
        <li>Sufficient color contrast for text and interactive elements</li>
        <li>Keyboard-navigable menus, forms, and controls</li>
        <li>Alternative text for meaningful images</li>
        <li>Responsive layouts that adapt to different devices and zoom levels</li>
      </ul>

      <h2>Ongoing effort</h2>
      <p>
        Accessibility is an ongoing process. We regularly review our website and work to improve the
        experience for all users. Some content provided by third parties may not yet fully meet our
        standards, and we are actively working to address those areas.
      </p>

      <h2>Need help or found a barrier?</h2>
      <p>
        If you encounter any difficulty using our website, or need information in an alternative format,
        please contact us using the details below. We will do our best to provide the information you
        need and to resolve the issue promptly. Your feedback helps us improve accessibility for
        everyone.
      </p>
    </LegalPageShell>
  );
}
