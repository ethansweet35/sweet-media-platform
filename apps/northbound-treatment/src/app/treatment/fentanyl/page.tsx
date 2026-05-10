import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import FentanylPage from "@/views/substance/fentanyl/FentanylPage";

const fallback: Metadata = {
  title: "Fentanyl Addiction Treatment | Northbound Treatment",
  description:
    "Northbound Treatment offers medically supervised fentanyl detox, medication-assisted treatment, and residential care for opioid addiction. 24/7 admissions — call (866) 311-0003.",
  alternates: { canonical: "/treatment/fentanyl" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/fentanyl", fallback);
}

export default function Page() {
  return <FentanylPage />;
}
