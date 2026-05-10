import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MensResidentialPage from "@/views/programs/mens/MensResidentialPage";

const fallback: Metadata = {
  title: "Men's Residential Treatment | Northbound Treatment",
  description:
    "Northbound Treatment offers gender-specific men's residential treatment — brotherhood, accountability, trauma care, Veterans Track, and Careerbound® vocational support. Call (866) 311-0003.",
  alternates: { canonical: "/programs/residential-treatment-center/mens-residential-treatment" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata(
    "/programs/residential-treatment-center/mens-residential-treatment",
    fallback,
  );
}

export default function Page() {
  return <MensResidentialPage />;
}
