import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { FinasteridePage } from "@/views/finasteride/page";
const fallback: Metadata = { title: "Finasteride / Dutasteride for Hair Loss | Get Simple Health", description: "FDA-approved DHT blockers that stop hair loss progression in 99% of men. Starting at $99/month. Once-daily oral tablet.", alternates: { canonical: "/finasteride" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/finasteride", fallback); }
export default function Page() { return <FinasteridePage />; }
