import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MarijuanaPage from "@/views/substance/marijuana/MarijuanaPage";

const fallback: Metadata = {
  title: "Marijuana Addiction Treatment | Northbound Treatment Services",
  description:
    "Cannabis use disorder is a real, clinically recognized condition. Northbound treats marijuana addiction with individualized therapy, dual-diagnosis care, and full continuum support. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/marijuana' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/marijuana", fallback);
}

export default function Page() {
  return <MarijuanaPage />;
}
