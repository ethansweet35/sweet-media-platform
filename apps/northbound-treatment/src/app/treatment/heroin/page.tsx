import { type Metadata } from "next";
import HeroinPage from "@/views/substance/heroin/HeroinPage";

export const metadata: Metadata = {
  title: "Heroin Detox, Withdrawal & Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound provides medically supervised heroin detox, MAT, residential treatment, and full continuum care in Orange County. 38+ years of opioid expertise. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/heroin' },
};

export default function Page() {
  return <HeroinPage />;
}
