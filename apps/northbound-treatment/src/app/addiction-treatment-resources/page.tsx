import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import AddictionResourcesPage from "@/views/about/AddictionResourcesPage";

const fallback: Metadata = {
  title: "Addiction Treatment Resources",
  description: "Find the right drug and alcohol addiction treatment program for you. Northbound offers a full continuum of care — from medical detox through virtual IOP and alumni support — tailored to every individual's journey.",
  alternates: { canonical: "/addiction-treatment-resources" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/addiction-treatment-resources", fallback);
}

export default function Page() {
  return <AddictionResourcesPage />;
}
