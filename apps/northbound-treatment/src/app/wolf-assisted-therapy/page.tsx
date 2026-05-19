import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WolfPage from "@/views/signature/wolf/WolfPage";

const fallback: Metadata = {
  title: "Wolf-Assisted Therapy",
  description:
    "Experience Northbound's pioneering Wolf-Assisted Therapy program — where the ancient wisdom of wolves meets evidence-based addiction treatment. Offered to residential and PHP clients in Southern California.",
  alternates: { canonical: '/wolf-assisted-therapy' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/wolf-assisted-therapy", fallback);
}

export default function WolfTherapyPage() {
  return <WolfPage />;
}
