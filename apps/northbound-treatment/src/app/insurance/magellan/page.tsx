import { type Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import MagellanPage from "@/views/insurance/magellan/MagellanPage";

const fallback: Metadata = {
  title: "Magellan Health Coverage for Addiction Treatment",
  description:
    "Northbound is an accepted provider with Magellan Health. Verify your Magellan behavioral health benefits for detox, residential, PHP, and IOP addiction treatment programs.",
  alternates: { canonical: '/insurance/magellan' },
};


export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/magellan", fallback);
}

export default function Page() {
  return <MagellanPage />;
}
