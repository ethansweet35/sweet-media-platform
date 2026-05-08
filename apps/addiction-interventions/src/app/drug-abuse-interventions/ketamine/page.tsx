import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import KetamineAddictionPage from "@/views/ketamine-addiction/page";

const fallbackMetadata: Metadata = {
  title: "Ketamine Addiction Intervention | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/drug-abuse-interventions/ketamine", fallbackMetadata);
}

export default function Page() {
  return <KetamineAddictionPage />;
}
