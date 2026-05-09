import { type Metadata } from "next";
import PremeraPage from "@/views/insurance/premera/PremeraPage";

export const metadata: Metadata = {
  title: "Premera Blue Cross Coverage for Addiction Treatment | Northbound Treatment",
  description:
    "Northbound accepts Premera Blue Cross for Washington and Alaska members. Verify your Premera coverage for detox, residential, PHP, and IOP addiction treatment in California.",
  alternates: { canonical: '/insurance/premera-blue-cross' },
};

export default function Page() {
  return <PremeraPage />;
}
