import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BipolarPage from "@/views/dualdiagnosis/bipolar/BipolarPage";

const fallback: Metadata = {
  title: "Bipolar Disorder & Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound specializes in treating bipolar disorder and co-occurring addiction through integrated dual diagnosis care, psychiatric expertise, and DBT in Orange County, California.",
  alternates: { canonical: '/treatment/mental-health-disorders/bipolar-disorder' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/mental-health-disorders/bipolar-disorder", fallback);
}

export default function Page() {
  return <BipolarPage />;
}
