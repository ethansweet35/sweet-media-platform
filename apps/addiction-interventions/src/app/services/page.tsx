import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import ServicesPage from "@/views/services/page";

const fallbackMetadata: Metadata = {
  title: "Intervention Services | Addiction Interventions",
  description:
    "The full spectrum of professional intervention services — substance abuse, mental health, crisis, teen, executive, and every combination. Every plan is built for one family.",
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/services", fallbackMetadata);
}

export default function Page() {
  return <ServicesPage />;
}
