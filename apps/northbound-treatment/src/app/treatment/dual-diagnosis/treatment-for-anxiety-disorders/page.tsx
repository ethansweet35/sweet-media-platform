import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AnxietyPage from "@/views/dualdiagnosis/anxiety/AnxietyPage";

const fallback: Metadata = {
  title: "Anxiety Disorder & Addiction Treatment | Northbound Treatment Services",
  description:
    "Northbound treats anxiety disorders and co-occurring addiction simultaneously through evidence-based dual diagnosis care. CBT, DBT, EMDR, and holistic programming in Southern California.",
  alternates: { canonical: '/treatment/dual-diagnosis/treatment-for-anxiety-disorders' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/dual-diagnosis/treatment-for-anxiety-disorders", fallback);
}

export default function Page() {
  return <AnxietyPage />;
}
