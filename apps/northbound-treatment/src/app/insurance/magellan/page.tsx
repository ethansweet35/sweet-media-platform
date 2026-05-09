import { type Metadata } from "next";
import MagellanPage from "@/views/insurance/magellan/MagellanPage";

export const metadata: Metadata = {
  title: "Magellan Health Coverage for Addiction Treatment | Northbound Treatment",
  description:
    "Northbound is an accepted provider with Magellan Health. Verify your Magellan behavioral health benefits for detox, residential, PHP, and IOP addiction treatment programs.",
};

export default function Page() {
  return <MagellanPage />;
}
