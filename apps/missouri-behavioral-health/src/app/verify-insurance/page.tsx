import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import VerifyInsuranceLanding from "@/components/landing/VerifyInsuranceLanding";

const fallback: Metadata = {
  title: "Verify Your Insurance | Missouri Behavioral Health",
  description:
    "Confidentially verify your insurance benefits for mental health and addiction treatment at Missouri Behavioral Health in Springfield, MO. Most major plans accepted. Call 24/7.",
  alternates: { canonical: "/verify-insurance" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/verify-insurance", fallback);
}

export default function VerifyInsurancePage() {
  return <VerifyInsuranceLanding formSource="Verify Insurance" />;
}
