import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AftercarePage from "@/views/programs/aftercare/AftercarePage";

const fallback: Metadata = {
  title: "Aftercare & Continuing Support Services",
  description:
    "Northbound's aftercare program provides personalized discharge planning, ongoing therapy referrals, 12-step integration, alumni community connection, and the unique Work Exchange Program for clients in Orange County, CA.",
  alternates: { canonical: '/programs/aftercare' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/aftercare", fallback);
}

export default function Page() {
  return <AftercarePage />;
}
