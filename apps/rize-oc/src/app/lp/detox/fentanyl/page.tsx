import type { Metadata } from "next";
import FentanylPage from "@/views/lp/detox/FentanylPage";

export const metadata: Metadata = {
  title: "Specialized Fentanyl Detox & Withdrawal Treatment | Rize OC",
  description: "Safely overcome fentanyl withdrawal with our private, medically-assisted detox program. FDA-approved medications, 24/7 monitoring, insurance accepted.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <FentanylPage />;
}
