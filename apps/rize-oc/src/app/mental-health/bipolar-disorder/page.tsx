import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SubPage from "@/views/what-we-treat/mental-health/bipolar-disorder";

const fallback: Metadata = {
  title: "Bipolar Disorder Treatment in Orange County | Rize OC",
  description: "Specialized bipolar disorder treatment — accurate diagnosis, mood stabilization, IPSRT, and integrated psychiatric care at Rize OC in Orange County, CA.",
  alternates: { canonical: "/mental-health/bipolar-disorder" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/mental-health/bipolar-disorder", fallback);
}

export default SubPage;
