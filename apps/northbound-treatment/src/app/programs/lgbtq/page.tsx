import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import LgbtqPage from "@/views/programs/LgbtqPage";

const fallback: Metadata = {
  title: "LGBTQIA+ Drug Rehab Center",
  description: "Northbound Treatment provides fully affirming, judgment-free addiction treatment for LGBTQIA+ individuals. Our clinicians are trained in LGBTQ+-affirming care with a safe environment where every person can heal as their authentic self.",
  alternates: { canonical: "/programs/lgbtq" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/programs/lgbtq", fallback);
}

export default function Page() {
  return <LgbtqPage />;
}
