import type { Metadata } from "next";
import PhpPage from "@/views/programs/php/PhpPage";

export const metadata: Metadata = {
  title: "Partial Hospitalization Program (PHP) | Northbound Treatment Services",
  description:
    "Northbound's PHP in Orange County offers up to 6 hours of structured clinical programming daily — the ideal step between residential care and outpatient treatment. In-network with 15+ major insurance plans.",
  alternates: { canonical: '/programs/partial-hospitalization-program' },
};

export default function Page() {
  return <PhpPage />;
}
