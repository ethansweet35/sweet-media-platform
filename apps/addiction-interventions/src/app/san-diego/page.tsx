import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import SanDiegoPage from "@/views/san-diego/page";

const fallbackMetadata: Metadata = {
  title: "Addiction Intervention San Diego | Addiction Interventions",
  description: "",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/san-diego", fallbackMetadata);
}

export default function Page() {
  return <SanDiegoPage />;
}
