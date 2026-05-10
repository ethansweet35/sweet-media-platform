import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import TransitionalLivingPage from "@/views/programs/transitional/TransitionalLivingPage";

const fallback: Metadata = {
  title: "Transitional Living Programs | Northbound Treatment",
  description:
    "Northbound Treatment offers sober living, PHP, IOP, Collegebound®, and Careerbound® transitional programs — structured support for the critical bridge between treatment and independent life. Call (866) 311-0003.",
  alternates: { canonical: "/treatment/transitional-living-programs" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/transitional-living-programs", fallback);
}

export default function Page() {
  return <TransitionalLivingPage />;
}
