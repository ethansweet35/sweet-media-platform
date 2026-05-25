import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import PageView from "@/views/insurance/ppo-out-of-network/page";

const fallbackMetadata: Metadata = {
  title: "PPO Out-of-Network Rehab Insurance | Sullivan Recovery",
  description: "Private PPO out-of-network reimbursement for detox and residential treatment — benefits verified upfront.",
  alternates: { canonical: "/insurance/ppo-out-of-network/" },
};

export async function generateMetadata(): Promise<Metadata> {
  return resolveTrackedPageMetadata("/insurance/ppo-out-of-network/", fallbackMetadata);
}

export default function Page() {
  return <PageView />;
}
