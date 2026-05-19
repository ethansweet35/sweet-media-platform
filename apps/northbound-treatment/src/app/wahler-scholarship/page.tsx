import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WahlerScholarshipPage from "@/views/about/WahlerScholarshipPage";

const fallback: Metadata = {
  title: "Wahler Scholarship",
  description: "The Wahler Scholarship helps individuals who cannot afford addiction treatment access the care they deserve. Learn how to apply for financial assistance through Northbound Treatment.",
  alternates: { canonical: "/wahler-scholarship" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/wahler-scholarship", fallback);
}

export default function Page() {
  return <WahlerScholarshipPage />;
}
