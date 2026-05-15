import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HolisticPage from "@/views/therapies/HolisticPage";

const fallbackMetadata: Metadata = {
  title: "Holistic Integration Therapy in Seattle | Mountain View Treatment",
  description: "Whole-person healing through mindfulness, somatic therapy, nutrition, and movement \u2014 integrated with evidence-based clinical care for addiction and mental health in Seattle.",
  alternates: { canonical: "/therapies/holistic-integration/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/therapies/holistic-integration/", fallbackMetadata);
}

export default function Page() {
  return <HolisticPage />;
}
