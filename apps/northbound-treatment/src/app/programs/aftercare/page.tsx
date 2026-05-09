import type { Metadata } from "next";
import AftercarePage from "@/views/programs/aftercare/AftercarePage";

export const metadata: Metadata = {
  title: "Aftercare & Continuing Support | Northbound Treatment Services",
  description:
    "Northbound's aftercare program provides personalized discharge planning, ongoing therapy referrals, 12-step integration, alumni community connection, and the unique Work Exchange Program for clients in Orange County, CA.",
};

export default function Page() {
  return <AftercarePage />;
}
