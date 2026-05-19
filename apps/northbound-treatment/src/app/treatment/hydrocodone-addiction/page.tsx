import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import HydrocodonePage from "@/views/substance/hydrocodone/HydrocodonePage";

const fallback: Metadata = {
  title: "Hydrocodone Addiction Treatment",
  description:
    "Northbound Treatment offers medically supervised Vicodin and hydrocodone addiction treatment — safe detox, residential care, and dual-diagnosis expertise. Call (866) 311-0003.",
  alternates: { canonical: "/treatment/hydrocodone-addiction" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/hydrocodone-addiction", fallback);
}

export default function Page() {
  return <HydrocodonePage />;
}
