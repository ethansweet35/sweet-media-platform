import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import BenzodiazepinePage from "@/views/substance/benzodiazepine/BenzodiazepinePage";

const fallback: Metadata = {
  title: "Benzodiazepine Addiction Treatment",
  description:
    "Northbound Treatment offers medically supervised benzodiazepine detox and comprehensive benzo addiction treatment. Xanax, Valium, Klonopin — safe tapering and dual-diagnosis care. Call (866) 311-0003.",
  alternates: { canonical: "/treatment/benzodiazepine-addiction" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/treatment/benzodiazepine-addiction", fallback);
}

export default function Page() {
  return <BenzodiazepinePage />;
}
