import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PrivacyPolicyPage from "@/views/privacy-policy/page";

const fallbackMetadata: Metadata = {
  title: "Privacy Policy & HIPAA Notice | Sullivan Recovery",
  description:
    "Sullivan Recovery Notice of Privacy Practices under HIPAA — how we use, disclose, and protect your protected health information.",
  alternates: { canonical: "/privacy-policy/" },
  robots: { index: true, follow: true },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/privacy-policy/", fallbackMetadata);
}

export default function Page() {
  return <PrivacyPolicyPage />;
}
