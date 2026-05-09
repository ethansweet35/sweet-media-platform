import { type Metadata } from "next";
import IlwuPage from "@/views/insurance/ilwu/IlwuPage";

export const metadata: Metadata = {
  title: "ILWU Union Health Plan Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound accepts ILWU union health plan coverage for addiction treatment. Verify your ILWU-PMA benefits for detox, residential, PHP, and IOP addiction treatment programs.",
};

export default function Page() {
  return <IlwuPage />;
}
