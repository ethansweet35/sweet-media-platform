import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ArizonaPage from "@/views/arizona/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Arizona | Addiction Interventions",
  description:
    "Certified interventionists serving Arizona — Phoenix, Tucson, Scottsdale & Sedona. On-site addiction and mental health interventions within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/arizona" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/arizona", fallbackMetadata);
}

export default function Page() {
  return <ArizonaPage />;
}
