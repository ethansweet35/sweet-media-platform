import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MethadonePage from "@/views/substance/methadone/MethadonePage";

const fallback: Metadata = {
  title: "Methadone Addiction Treatment",
  description:
    "Northbound Treatment offers medically supervised methadone dependency treatment including gradual taper protocols, dual-diagnosis care, and comprehensive aftercare. Call (866) 311-0003.",
  alternates: { canonical: "/treatment/methadone" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/methadone", fallback);
}

export default function Page() {
  return <MethadonePage />;
}
