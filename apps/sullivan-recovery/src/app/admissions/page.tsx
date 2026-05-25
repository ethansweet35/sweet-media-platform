import type { Metadata } from "next";
import { resolveTrackedPageMetadata, withDraftPageRobots } from "@sweetmedia/admin-core";
import DraftPageShell from "@/components/pages/DraftPageShell";

const fallbackMetadata: Metadata = {
  title: "Admissions | Sullivan Recovery",
  description: "Begin treatment at Sullivan Recovery.",
  alternates: { canonical: "/admissions/" },
  robots: { index: false, follow: false },
};

export async function generateMetadata(): Promise<Metadata> {
  const resolved = await resolveTrackedPageMetadata("/admissions/", fallbackMetadata);
  return withDraftPageRobots(resolved);
}

export default function Page() {
  return <DraftPageShell title="Admissions" />;
}
