import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ColoradoPage from "@/views/colorado/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Colorado | Addiction Interventions",
  description: "Certified interventionists serving Colorado. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/colorado", fallbackMetadata);
}

export default function Page() {
  return <ColoradoPage />;
}
