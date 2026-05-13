import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { GlowStackPage } from "@/views/glow-stack/page";
const fallback: Metadata = { title: "Glow Stack — GHK-Cu + BPC-157 + TB-500 Aesthetic Protocol | Get Simple Health", description: "Three-peptide aesthetic protocol for skin, hair, and soft tissue rejuvenation. Starting at $600/month. Results in 3–4 weeks.", alternates: { canonical: "/glow-stack" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/glow-stack", fallback); }
export default function Page() { return <GlowStackPage />; }
