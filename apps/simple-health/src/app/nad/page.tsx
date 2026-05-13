import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { NadPage } from "@/views/nad/page";
const fallback: Metadata = { title: "NAD+ Therapy — Cellular Energy & Longevity | Get Simple Health", description: "NAD+ replenishment restores mitochondrial energy, sirtuin activation, and DNA repair. Starting at $200/month. Results in 1–2 weeks.", alternates: { canonical: "/nad" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/nad", fallback); }
export default function Page() { return <NadPage />; }
