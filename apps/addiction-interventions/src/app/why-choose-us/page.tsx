import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WhyChooseUsPage from "@/views/why-choose-us/page";

const fallbackMetadata: Metadata = {
  title: "Why Choose Us | Addiction Interventions",
  description:
    "1,500+ families helped, accredited by The Joint Commission, family-system focused, and active long after day one. Here's what makes our intervention process different.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/why-choose-us", fallbackMetadata);
}

export default function Page() {
  return <WhyChooseUsPage />;
}
