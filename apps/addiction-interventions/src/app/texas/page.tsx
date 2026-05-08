import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TexasPage from "@/views/texas/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Texas | Addiction Interventions",
  description: "Certified interventionists serving Texas. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/texas", fallbackMetadata);
}

export default function Page() {
  return <TexasPage />;
}
