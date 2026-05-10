import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import CocainePage from "@/views/substance/cocaine/CocainePage";

const fallback: Metadata = {
  title: "Cocaine Addiction Treatment | Northbound Treatment",
  description:
    "Northbound Treatment offers residential and outpatient cocaine and crack cocaine addiction treatment in Orange County, CA. Evidence-based care, dual-diagnosis expertise. Call (866) 311-0003.",
  alternates: { canonical: "/treatment/cocaine" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/cocaine", fallback);
}

export default function Page() {
  return <CocainePage />;
}
