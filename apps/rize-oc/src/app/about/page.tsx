import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AboutPage from "@/views/about/AboutPage";

const fallbackMetadata: Metadata = {
  title: "About Rize Recovery | Orange County Addiction & Mental Health Treatment",
  description:
    "Rize Recovery was founded by addiction medicine specialists to deliver premium, evidence-based care that treats the whole person — mind, body, and spirit — in Orange County, California.",
  alternates: { canonical: "/about" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/about", fallbackMetadata);
}

export default AboutPage;
