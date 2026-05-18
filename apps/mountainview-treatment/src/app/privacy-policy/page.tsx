import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PrivacyPolicyPage from "@/views/legal/PrivacyPolicyPage";

const fallback: Metadata = {
  title: "Privacy Policy | Mountain View Treatment",
  description:
    "How Mountain View Treatment collects, uses, and protects your personal information. Learn about our data practices and your privacy rights.",
  alternates: { canonical: "/privacy-policy/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/privacy-policy/", fallback);
}

export default function Page() {
  return <PrivacyPolicyPage />;
}
