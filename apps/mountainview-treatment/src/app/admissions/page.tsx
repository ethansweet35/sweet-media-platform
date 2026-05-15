import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AdmissionsPage from "@/views/admissions/AdmissionsPage";

const fallbackMetadata: Metadata = {
  title: "Admissions | Mountain View Treatment Seattle",
  description:
    "Start your recovery today. Same-day admissions, free assessment, and insurance verification \u2014 Mountain View Treatment\u2019s compassionate admissions team is available 24/7.",
  alternates: { canonical: "/admissions/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions/", fallbackMetadata);
}

export default function Page() {
  return <AdmissionsPage />;
}
