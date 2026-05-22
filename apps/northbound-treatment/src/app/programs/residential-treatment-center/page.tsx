import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ResidentialPage from "@/views/programs/residential/ResidentialPage";

const fallback: Metadata = {
  title: "Residential Inpatient Treatment Services",
  description:
    "Northbound's co-ed residential inpatient program at The Grove in Garden Grove provides 24/7 immersive addiction treatment through the InVivo® model and a multidisciplinary clinical team. Verify your insurance today.",
  alternates: { canonical: '/programs/residential-treatment-center' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/residential-treatment-center", fallback);
}

export default function Page() {
  return <ResidentialPage />;
}
