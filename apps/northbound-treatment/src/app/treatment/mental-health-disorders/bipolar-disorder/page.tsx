import { type Metadata } from "next";
import BipolarPage from "@/views/dualdiagnosis/bipolar/BipolarPage";

export const metadata: Metadata = {
  title: "Bipolar Disorder & Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound specializes in treating bipolar disorder and co-occurring addiction through integrated dual diagnosis care, psychiatric expertise, and DBT in Orange County, California.",
  alternates: { canonical: '/treatment/mental-health-disorders/bipolar-disorder' },
};

export default function Page() {
  return <BipolarPage />;
}
