import type { Metadata } from "next";
import FamilyPage from "@/views/signature/family/FamilyPage";

export const metadata: Metadata = {
  title: "Family Therapy Program | Northbound Treatment Services",
  description:
    "Northbound's Family Therapy Program brings your entire family into the healing process — at no additional cost. Multi-day monthly sessions include Family Sculpt, Al-Anon integration, and co-dependency work.",
  alternates: { canonical: '/programs/family-therapy' },
};

export default function FamilyTherapyPage() {
  return <FamilyPage />;
}
