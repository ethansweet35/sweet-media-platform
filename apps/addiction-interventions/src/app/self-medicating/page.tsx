import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SelfMedicatingPage from "@/views/self-medicating/page";

const fallbackMetadata: Metadata = {
  title: "Interventions for Self-Medicating | Dual Diagnosis Specialists",
  description:
    "When alcohol, cannabis, or prescription drugs are quietly being used to manage anxiety, depression, PTSD, or chronic pain, the substance use and the underlying condition both have to be treated. We specialise in dual diagnosis interventions.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/self-medicating", fallbackMetadata);
}

export default function Page() {
  return <SelfMedicatingPage />;
}
