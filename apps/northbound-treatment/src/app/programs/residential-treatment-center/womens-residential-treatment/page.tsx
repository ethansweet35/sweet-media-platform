import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import WomensResidentialPage from "@/views/programs/womens/WomensResidentialPage";

const fallback: Metadata = {
  title: "Women's Residential Treatment",
  description:
    "Northbound Treatment offers gender-specific women's residential treatment — trauma-informed care, women's health focus, and a safe community dedicated to lasting recovery. Call (866) 311-0003.",
  alternates: { canonical: "/programs/residential-treatment-center/womens-residential-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/programs/residential-treatment-center/womens-residential-treatment",
    fallback,
  );
}

export default function Page() {
  return <WomensResidentialPage />;
}
