import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PrivacyPolicyPage from "@/views/privacy-policy/page";

const fallbackMetadata: Metadata = {
  title: "Privacy Policy | Cipher Billing",
  description:
    "Cipher Billing privacy policy: how we collect, use, disclose, and safeguard your personal information when you visit cipherbilling.com.",
  alternates: { canonical: "/privacy-policy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/privacy-policy", fallbackMetadata);
}

export default function Page() {
  return <PrivacyPolicyPage />;
}
