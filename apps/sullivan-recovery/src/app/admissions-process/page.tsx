import type { Metadata } from "next";
import { resolveTrackedPageMetadata, withDraftPageRobots } from "@sweetmedia/admin-core";
import AdmissionsProcessPage from "@/views/admissions-process/page";

const fallbackMetadata: Metadata = {
  title: "Admissions Process | Sullivan Recovery",
  description: "How to begin treatment at Sullivan Recovery.",
  alternates: { canonical: "/admissions-process/" },
  robots: { index: false, follow: false },
};

export async function generateMetadata(): Promise<Metadata> {
  const resolved = await resolveTrackedPageMetadata("/admissions-process/", fallbackMetadata);
  return withDraftPageRobots(resolved);
}

export default function Page() {
  return <AdmissionsProcessPage />;
}
