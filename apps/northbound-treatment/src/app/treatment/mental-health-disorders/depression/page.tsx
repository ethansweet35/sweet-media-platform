import { type Metadata } from "next";
import DepressionPage from "@/views/dualdiagnosis/depression/DepressionPage";

export const metadata: Metadata = {
  title: "Depression & Addiction Treatment in Orange County | Northbound Treatment Services",
  description:
    "Northbound's Orange County depression treatment center treats major depressive disorder and co-occurring addiction through integrated dual diagnosis care, CBT, and holistic programming.",
  alternates: { canonical: '/treatment/mental-health-disorders/depression' },
};

export default function Page() {
  return <DepressionPage />;
}
