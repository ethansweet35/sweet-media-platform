import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import DepressionPage from "@/views/dualdiagnosis/depression/DepressionPage";

const fallback: Metadata = {
  title: "Depression & Addiction Treatment in Orange County | Northbound Treatment Services",
  description:
    "Northbound's Orange County depression treatment center treats major depressive disorder and co-occurring addiction through integrated dual diagnosis care, CBT, and holistic programming.",
  alternates: { canonical: '/treatment/mental-health-disorders/depression' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/mental-health-disorders/depression", fallback);
}

export default function Page() {
  return <DepressionPage />;
}
