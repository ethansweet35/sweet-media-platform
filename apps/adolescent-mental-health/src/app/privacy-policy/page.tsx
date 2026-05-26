import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PrivacyPolicyPage from "@/views/legal/PrivacyPolicyPage";

const fallbackMetadata: Metadata = {
  title: "Privacy Policy | Adolescent Mental Health",
  description: "Privacy policy for Adolescent Mental Health website visitors and contact form submissions.",
  alternates: { canonical: "/privacy-policy" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/privacy-policy", fallbackMetadata);
}

export default function Page() {
  return <PrivacyPolicyPage />;
}
