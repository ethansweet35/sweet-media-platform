import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SomaticPage from "@/views/therapies/SomaticPage";

const fallbackMetadata: Metadata = {
  title: "Somatic Experiencing Therapy in Seattle | Mountain View Treatment",
  description: "Body-based, evidence-informed Somatic Experiencing therapy for trauma, PTSD, anxiety, and addiction in Seattle \u2014 delivered by certified SE practitioners.",
  alternates: { canonical: "/therapies/somatic-experiencing/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapies/somatic-experiencing/", fallbackMetadata);
}

export default function Page() {
  return <SomaticPage />;
}
