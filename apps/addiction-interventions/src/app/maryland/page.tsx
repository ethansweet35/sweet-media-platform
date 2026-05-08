import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MarylandPage from "@/views/maryland/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Maryland | Addiction Interventions",
  description: "Certified interventionists serving Maryland. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/maryland", fallbackMetadata);
}

export default function Page() {
  return <MarylandPage />;
}
