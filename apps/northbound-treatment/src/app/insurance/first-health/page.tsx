import { type Metadata } from "next";
import FirstHealthPage from "@/views/insurance/firsthealth/FirstHealthPage";

export const metadata: Metadata = {
  title: "First Health Network Coverage for Addiction Treatment | Northbound",
  description:
    "Northbound accepts First Health Network PPO plans for addiction treatment. Verify your First Health benefits for detox, residential, PHP, and IOP — no cost to you.",
  alternates: { canonical: '/insurance/first-health' },
};

export default function Page() {
  return <FirstHealthPage />;
}
