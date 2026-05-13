import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HawaiiPage from "@/views/hawaii/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Intervention Services in Hawaii | Get Help Now",
  description:
    "Seeking addiction intervention services in Hawaii? Our experienced interventionists provide compassionate support and guidance. Find help for your loved one today. Learn more.",
  alternates: { canonical: "/service-areas/hawaii" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/service-areas/hawaii", fallbackMetadata);
}

export default function Page() {
  return <HawaiiPage />;
}
