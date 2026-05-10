import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import GehaPage from "@/views/insurance/geha/GehaPage";

const fallback: Metadata = {
  title: "GEHA Federal Employee Health Benefits for Addiction Treatment | Northbound",
  description:
    "Northbound accepts GEHA (FEHB) coverage for addiction treatment. Federal employees, retirees, and their families can verify GEHA benefits for detox, residential, PHP, and IOP.",
  alternates: { canonical: '/insurance/geha-insurance' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/geha-insurance", fallback);
}

export default function Page() {
  return <GehaPage />;
}
