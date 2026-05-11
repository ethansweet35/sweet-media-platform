import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import UtahPage from "@/views/utah/page";

const fallbackMetadata: Metadata = {
  title: "Drug & Alcohol Intervention Services in Utah | Addiction Interventions",
  description: "Certified interventionists serving Utah. On-site addiction and mental health interventions — families helped within 24–48 hours. Free confidential consultation: 949-776-7093.",
  alternates: { canonical: "/service-areas/utah" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/utah", fallbackMetadata);
}

export default function Page() {
  return <UtahPage />;
}
