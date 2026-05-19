import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HeroinPage from "@/views/substance/heroin/HeroinPage";

const fallback: Metadata = {
  title: "Heroin Detox, Withdrawal & Addiction Treatment Services",
  description:
    "Northbound provides medically supervised heroin detox, MAT, residential treatment, and full continuum care in Orange County. 38+ years of opioid expertise. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/heroin' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/heroin", fallback);
}

export default function Page() {
  return <HeroinPage />;
}
