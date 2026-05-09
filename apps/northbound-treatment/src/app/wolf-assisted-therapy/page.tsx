import type { Metadata } from "next";
import WolfPage from "@/views/signature/wolf/WolfPage";

export const metadata: Metadata = {
  title: "Wolf-Assisted Therapy | Northbound Treatment",
  description:
    "Experience Northbound's pioneering Wolf-Assisted Therapy program — where the ancient wisdom of wolves meets evidence-based addiction treatment. Offered to residential and PHP clients in Southern California.",
  alternates: { canonical: '/wolf-assisted-therapy' },
};

export default function WolfTherapyPage() {
  return <WolfPage />;
}
