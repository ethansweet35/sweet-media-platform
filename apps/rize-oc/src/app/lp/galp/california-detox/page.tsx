import type { Metadata } from "next";
import LpGalpDetoxPage from "@/views/lp/LpGalpDetoxPage";

export const metadata: Metadata = {
  title: "Premier 24/7 Detox Care In California | Rize OC",
  description: "Find detox treatment in minutes. Safe, medically-supervised detox in California. Insurance accepted. Private rooms, luxury accommodations. Call 24/7.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <LpGalpDetoxPage
      headline="Premier 24/7 Detox Care In California"
      subheadline="Find detox treatment in minutes by talking to a care coordinator now. Safe, medically-supervised detox with private rooms, luxury accommodations, and insurance accepted."
      eyebrow="1,000+ Successful Recoveries"
      stat="24/7"
      statLabel="Medical Care Available"
      showLocationOptions
    />
  );
}
