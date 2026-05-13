import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { MinoxidilPage } from "@/views/minoxidil/page";
const fallback: Metadata = { title: "Oral Minoxidil for Hair Regrowth | Get Simple Health", description: "Low-dose oral minoxidil for superior hair restoration — stronger results than topical, works for all hair loss types. Starting at $99/month.", alternates: { canonical: "/minoxidil" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/minoxidil", fallback); }
export default function Page() { return <MinoxidilPage />; }
