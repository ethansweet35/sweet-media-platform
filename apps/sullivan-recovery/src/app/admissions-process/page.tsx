import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AdmissionsProcessPage from "@/views/admissions-process/page";

const fallbackMetadata: Metadata = {
  title: "Admissions Process | Sullivan Recovery",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions-process", fallbackMetadata);
}

export default function Page() {
  return <AdmissionsProcessPage />;
}
