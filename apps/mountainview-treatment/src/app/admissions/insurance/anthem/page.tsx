import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AnthemPage from "@/views/insurance/AnthemPage";

const fallback: Metadata = {
  title: "Anthem Insurance Coverage | Mountain View Treatment",
  description:
    "Mountain View Treatment accepts Anthem Blue Cross Blue Shield insurance for PHP, IOP, and outpatient addiction and mental health treatment in Seattle, WA. Verify your Anthem benefits at no cost.",
  alternates: { canonical: "/admissions/insurance/anthem/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/admissions/insurance/anthem/", fallback);
}

export default function Page() {
  return <AnthemPage />;
}
