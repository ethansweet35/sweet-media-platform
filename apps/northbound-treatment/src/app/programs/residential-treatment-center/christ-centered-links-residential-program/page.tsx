import type { Metadata } from "next";
import FaithPage from "@/views/signature/faith/FaithPage";

export const metadata: Metadata = {
  title: "Faith-Based Recovery: LINKS Christ-Centered Program | Northbound Treatment",
  description:
    "Northbound's LINKS program bridges the best of addiction medicine with the principles of Christianity — offering faith-integrated residential treatment along the Orange County coastline. Call (866) 311-0003.",
  alternates: { canonical: '/programs/residential-treatment-center/christ-centered-links-residential-program' },
};

export default function ChristCenteredLinksPage() {
  return <FaithPage />;
}
