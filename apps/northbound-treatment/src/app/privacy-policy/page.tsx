import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PrivacyPolicyPage from "@/views/legal/PrivacyPolicyPage";

const fallback: Metadata = {
  title: "Privacy Policy",
  description:
    "Northbound Treatment Services privacy policy — how we collect, use, and protect your personal and health information, including our HIPAA Notice of Health Information Practices.",
  alternates: { canonical: "/privacy-policy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/privacy-policy", fallback);
}

export default function Page() {
  return <PrivacyPolicyPage />;
}
