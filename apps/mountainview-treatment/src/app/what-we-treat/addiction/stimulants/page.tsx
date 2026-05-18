import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import StimulantsPage from "@/views/what-we-treat/StimulantsPage";

const fallback: Metadata = {
  title: "Stimulant Addiction Treatment Seattle | Mountain View Treatment",
  description: "Outpatient treatment for methamphetamine, cocaine, and stimulant use disorder in Seattle, WA. Contingency management, CBT, and dual diagnosis care. Insurance accepted.",
  alternates: { canonical: "/what-we-treat/addiction/stimulants/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/addiction/stimulants/", fallback);
}

export default function Page() {
  return <StimulantsPage />;
}
