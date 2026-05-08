import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import NorthCarolinaPage from "@/views/north-carolina/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in North Carolina | Addiction Interventions",
  description: "Certified interventionists serving North Carolina. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/north-carolina", fallbackMetadata);
}

export default function Page() {
  return <NorthCarolinaPage />;
}
