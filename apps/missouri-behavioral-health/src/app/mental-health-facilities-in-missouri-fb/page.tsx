import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MentalHealthFbLanding from "@/components/landing/MentalHealthFbLanding";

const fallback: Metadata = {
  title: "Mental Health Facilities In Missouri | Missouri Behavioral Health",
  description:
    "Top outpatient mental health treatment in Missouri. Depression, anxiety, PTSD, bipolar, OCD, trauma, and more. PHP, IOP, and virtual care. Free assessment — call 24/7.",
  alternates: { canonical: "/mental-health-facilities-in-missouri-fb" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health-facilities-in-missouri-fb", fallback);
}

export default function MentalHealthFacilitiesFbPage() {
  return <MentalHealthFbLanding />;
}
