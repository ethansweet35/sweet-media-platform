import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MarijuanaPage from "@/views/what-we-treat/MarijuanaPage";

const fallback: Metadata = {
  title: "Marijuana & Cannabis Use Disorder Treatment Seattle | Mountain View Treatment",
  description: "Outpatient treatment for cannabis use disorder in Seattle, WA. CBT, motivational enhancement therapy, and dual diagnosis care. Insurance accepted.",
  alternates: { canonical: "/what-we-treat/addiction/marijuana/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/addiction/marijuana/", fallback);
}

export default function Page() {
  return <MarijuanaPage />;
}
