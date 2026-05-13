import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { WolverineStackPage } from "@/views/wolverine-stack/page";
const fallback: Metadata = { title: "Wolverine Stack — BPC-157 + TB-500 Recovery Protocol | Get Simple Health", description: "Elite recovery stack for injury healing, tendon repair, and systemic resilience. 2–3x faster recovery timelines. Starting at $400/month.", alternates: { canonical: "/wolverine-stack" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/wolverine-stack", fallback); }
export default function Page() { return <WolverineStackPage />; }
