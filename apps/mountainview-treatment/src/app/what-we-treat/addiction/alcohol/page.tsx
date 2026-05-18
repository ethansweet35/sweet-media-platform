import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AlcoholPage from "@/views/what-we-treat/AlcoholPage";

const fallback: Metadata = {
  title: "Alcohol Addiction Treatment in Seattle, WA | Mountain View Treatment",
  description: "Expert outpatient alcohol use disorder treatment in Seattle. Mountain View Treatment offers PHP, IOP, and OP with MAT options, CBT, and dual diagnosis care. Insurance accepted.",
  alternates: { canonical: "/what-we-treat/addiction/alcohol/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/what-we-treat/addiction/alcohol/", fallback);
}

export default function Page() {
  return <AlcoholPage />;
}
