import { type Metadata } from "next";
import AlcoholPage from "@/views/substance/alcohol/AlcoholPage";

export const metadata: Metadata = {
  title: "Alcohol Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound Treatment provides medically supervised alcohol detox, residential treatment, PHP, and IOP for alcohol use disorder. 38+ years of experience. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/alcoholism' },
};

export default function Page() {
  return <AlcoholPage />;
}
