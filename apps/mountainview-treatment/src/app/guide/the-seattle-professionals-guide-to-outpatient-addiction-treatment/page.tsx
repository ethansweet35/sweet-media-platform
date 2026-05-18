import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ProfessionalsGuidePage from "@/views/guide/ProfessionalsGuidePage";

const fallback: Metadata = {
  title:
    "The Seattle Professional's Guide to Outpatient Addiction Treatment | Mountain View Treatment",
  description:
    "Confidential, schedule-flexible treatment options for working professionals. Covers IOP tracks, HIPAA protections, FMLA/PFML leave, and planning a smooth return to full professional capacity.",
  alternates: {
    canonical: "/guide/the-seattle-professionals-guide-to-outpatient-addiction-treatment/",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/guide/the-seattle-professionals-guide-to-outpatient-addiction-treatment/",
    fallback,
  );
}

export default function Page() {
  return <ProfessionalsGuidePage />;
}
