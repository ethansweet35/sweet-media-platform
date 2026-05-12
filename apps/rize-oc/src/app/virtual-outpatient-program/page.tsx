import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import VirtualPage from "@/views/levels-of-care/virtual/page";

const fallback: Metadata = {
  title: "Virtual Outpatient Program | Rize OC — California Telehealth",
  description:
    "HIPAA-compliant virtual IOP and outpatient therapy available statewide in California. Rize OC brings evidence-based behavioral health care directly to your home.",
  alternates: { canonical: "/virtual-outpatient-program" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/virtual-outpatient-program", fallback);
}

export default function Page() {
  return <VirtualPage />;
}
