import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IopPage from "@/views/programs/iop/IopPage";

const fallback: Metadata = {
  title: "Intensive Outpatient Program (IOP) | Northbound Treatment Services",
  description:
    "Northbound's IOP in Orange County offers flexible 6–12 hour weekly schedules with individual therapy, group counseling, DBT, trauma care, and signature programs like Collegebound® and Careerbound®. Most insurance accepted.",
  alternates: { canonical: '/programs/intensive-outpatient-treatment' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/intensive-outpatient-treatment", fallback);
}

export default function Page() {
  return <IopPage />;
}
