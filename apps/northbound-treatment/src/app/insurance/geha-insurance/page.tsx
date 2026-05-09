import { type Metadata } from "next";
import GehaPage from "@/views/insurance/geha/GehaPage";

export const metadata: Metadata = {
  title: "GEHA Federal Employee Health Benefits for Addiction Treatment | Northbound",
  description:
    "Northbound accepts GEHA (FEHB) coverage for addiction treatment. Federal employees, retirees, and their families can verify GEHA benefits for detox, residential, PHP, and IOP.",
  alternates: { canonical: '/insurance/geha-insurance' },
};

export default function Page() {
  return <GehaPage />;
}
