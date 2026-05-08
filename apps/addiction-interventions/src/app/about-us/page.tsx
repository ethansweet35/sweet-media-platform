import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AboutUsPage from "@/views/about-us/page";

const fallbackMetadata: Metadata = {
  title: "About Us | Addiction Interventions",
  description:
    "Meet the team behind 1,500+ successful interventions. Learn about David Gates, our family-centered methodology, and our commitment to lifelong recovery.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about-us", fallbackMetadata);
}

export default function Page() {
  return <AboutUsPage />;
}
