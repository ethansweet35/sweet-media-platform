import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OurTeamPage from "@/views/our-team/OurTeamPage";

const fallbackMetadata: Metadata = {
  title: "Our Team | Rize OC — Orange County Addiction & Mental Health Treatment",
  description:
    "Meet the licensed therapists, physicians, admissions specialists, and support staff behind Rize OC's evidence-based addiction and mental health treatment programs in Orange County, CA.",
  alternates: { canonical: "/our-team" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/our-team", fallbackMetadata);
}

export default OurTeamPage;
