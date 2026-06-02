import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import VerifyInsuranceLanding from "@/components/landing/VerifyInsuranceLanding";

const fallback: Metadata = {
  title: "Verify Insurance (FB) | Missouri Behavioral Health",
  description:
    "Free insurance verification for mental health and addiction treatment at Missouri Behavioral Health in Springfield, MO. Private insurance accepted. Confidential, no obligation.",
  alternates: { canonical: "/verify-insurance-fb" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/verify-insurance-fb", fallback);
}

export default function VerifyInsuranceFbPage() {
  return (
    <VerifyInsuranceLanding
      formSource="Verify Insurance (FB)"
      breadcrumbLabel="Verify Insurance"
      variant="facebook"
    />
  );
}
