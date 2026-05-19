import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AlcoholPage from "@/views/substance/alcohol/AlcoholPage";

const fallback: Metadata = {
  title: "Alcohol Addiction Treatment Services",
  description:
    "Northbound Treatment provides medically supervised alcohol detox, residential treatment, PHP, and IOP for alcohol use disorder. 38+ years of experience. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/alcoholism' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/alcoholism", fallback);
}

export default function Page() {
  return <AlcoholPage />;
}
