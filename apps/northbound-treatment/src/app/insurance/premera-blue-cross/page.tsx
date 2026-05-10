import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PremeraPage from "@/views/insurance/premera/PremeraPage";

const fallback: Metadata = {
  title: "Premera Blue Cross Coverage for Addiction Treatment | Northbound Treatment",
  description:
    "Northbound accepts Premera Blue Cross for Washington and Alaska members. Verify your Premera coverage for detox, residential, PHP, and IOP addiction treatment in California.",
  alternates: { canonical: '/insurance/premera-blue-cross' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/premera-blue-cross", fallback);
}

export default function Page() {
  return <PremeraPage />;
}
