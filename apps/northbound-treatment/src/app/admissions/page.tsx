import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AdmissionsPage from "@/views/admissions/AdmissionsPage";

const fallbackMetadata: Metadata = {
  title: "Admissions For Our Rehab Center: What to Expect | Northbound Treatment",
  description:
    "Learn about Northbound Treatment's simple 5-step admissions process. We accept 15+ major insurance plans and our team is available 24/7 to help you start recovery in Orange County, CA.",
  alternates: { canonical: "/admissions" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions", fallbackMetadata);
}

export default function Page() {
  return <AdmissionsPage />;
}
