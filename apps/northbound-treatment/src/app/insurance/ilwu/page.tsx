import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import IlwuPage from "@/views/insurance/ilwu/IlwuPage";

const fallback: Metadata = {
  title: "ILWU Union Health Plan Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound accepts ILWU union health plan coverage for addiction treatment. Verify your ILWU-PMA benefits for detox, residential, PHP, and IOP addiction treatment programs.",
  alternates: { canonical: '/insurance/ilwu' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/ilwu", fallback);
}

export default function Page() {
  return <IlwuPage />;
}
