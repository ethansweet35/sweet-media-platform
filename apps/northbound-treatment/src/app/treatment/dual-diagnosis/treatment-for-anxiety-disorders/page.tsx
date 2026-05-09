import { type Metadata } from "next";
import AnxietyPage from "@/views/dualdiagnosis/anxiety/AnxietyPage";

export const metadata: Metadata = {
  title: "Anxiety Disorder & Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound treats anxiety disorders and co-occurring addiction simultaneously through evidence-based dual diagnosis care. CBT, DBT, EMDR, and holistic programming in Southern California.",
  alternates: { canonical: '/treatment/dual-diagnosis/treatment-for-anxiety-disorders' },
};

export default function Page() {
  return <AnxietyPage />;
}
