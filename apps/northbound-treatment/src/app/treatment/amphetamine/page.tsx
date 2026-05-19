import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AmphetaminePage from "@/views/substance/amphetamine/AmphetaminePage";

const fallback: Metadata = {
  title: "Amphetamine Addiction Treatment",
  description:
    "Northbound Treatment offers specialized stimulant and amphetamine addiction treatment — Adderall, Dexedrine, meth, and illicit forms. Residential care, dual-diagnosis expertise. Call (866) 311-0003.",
  alternates: { canonical: "/treatment/amphetamine" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/amphetamine", fallback);
}

export default function Page() {
  return <AmphetaminePage />;
}
