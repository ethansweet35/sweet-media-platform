import { type Metadata } from "next";
import MarijuanaPage from "@/views/substance/marijuana/MarijuanaPage";

export const metadata: Metadata = {
  title: "Marijuana Addiction Treatment | Northbound Treatment Services",
  description:
    "Cannabis use disorder is a real, clinically recognized condition. Northbound treats marijuana addiction with individualized therapy, dual-diagnosis care, and full continuum support. Call (866) 311-0003.",
  alternates: { canonical: '/treatment/marijuana' },
};

export default function Page() {
  return <MarijuanaPage />;
}
