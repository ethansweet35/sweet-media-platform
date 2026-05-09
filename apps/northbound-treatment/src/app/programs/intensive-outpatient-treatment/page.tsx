import type { Metadata } from "next";
import IopPage from "@/views/programs/iop/IopPage";

export const metadata: Metadata = {
  title: "Intensive Outpatient Program (IOP) | Northbound Treatment Services",
  description:
    "Northbound's IOP in Orange County offers flexible 6–12 hour weekly schedules with individual therapy, group counseling, DBT, trauma care, and signature programs like Collegebound® and Careerbound®. Most insurance accepted.",
  alternates: { canonical: '/programs/intensive-outpatient-treatment' },
};

export default function Page() {
  return <IopPage />;
}
