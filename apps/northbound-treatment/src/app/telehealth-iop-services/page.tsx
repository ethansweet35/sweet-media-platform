import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TelehealthPage from "@/views/programs/telehealth/TelehealthPage";

const fallback: Metadata = {
  title: "Online IOP & Virtual Substance Abuse Treatment Services",
  description:
    "Northbound's HomeBound virtual IOP program delivers evidence-based individual therapy, group counseling, psychiatry, and case management online — available in California and Washington. Most insurance accepted.",
  alternates: { canonical: '/telehealth-iop-services' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/telehealth-iop-services", fallback);
}

export default function Page() {
  return <TelehealthPage />;
}
