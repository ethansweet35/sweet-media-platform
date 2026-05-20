import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import VirtualLpPage from "@/views/virtual-lp/VirtualLpPage";

const fallback: Metadata = {
  title: "Virtual Outpatient Treatment | Northbound Treatment Network",
  description:
    "Explore virtual outpatient treatment options through Northbound Treatment, Neurish Wellness, and Casa Capri Recovery. Find virtual addiction, mental health, women's-only, and eating disorder care from home.",
  alternates: { canonical: "/virtual-lp" },
  keywords: [
    "virtual outpatient treatment",
    "virtual IOP",
    "online IOP",
    "virtual addiction treatment",
    "virtual mental health outpatient",
    "virtual substance abuse treatment",
    "women's virtual IOP",
    "virtual eating disorder IOP",
    "online rehab",
    "telehealth IOP",
    "virtual dual diagnosis treatment",
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/virtual-lp", fallback);
}

export default function Page() {
  return <VirtualLpPage />;
}
