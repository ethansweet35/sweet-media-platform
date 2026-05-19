import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ReferralsPage from "@/views/referrals/ReferralsPage";

const fallbackMetadata: Metadata = {
  title: "Professional Referrals Services",
  description:
    "Refer your patients to Northbound Treatment Services — 38+ years of clinical excellence, a full continuum of care, and dedicated clinical liaisons available 24/7. 15+ insurance contracts accepted.",
  alternates: { canonical: "/referring-professionals" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/referring-professionals", fallbackMetadata);
}

export default function Page() {
  return <ReferralsPage />;
}
