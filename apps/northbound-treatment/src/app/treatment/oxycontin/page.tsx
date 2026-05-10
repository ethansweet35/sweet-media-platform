import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import OxycontinPage from "@/views/substance/oxycontin/OxycontinPage";

const fallback: Metadata = {
  title: "OxyContin Addiction Treatment | Northbound Treatment",
  description:
    "Northbound Treatment provides medically supervised OxyContin and oxycodone addiction treatment — detox, residential, PHP, and IOP. MAT available. Call (866) 311-0003.",
  alternates: { canonical: "/treatment/oxycontin" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/oxycontin", fallback);
}

export default function Page() {
  return <OxycontinPage />;
}
