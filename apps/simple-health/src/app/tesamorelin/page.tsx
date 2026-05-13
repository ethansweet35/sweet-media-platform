import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { TesamorelinPage } from "@/views/tesamorelin/page";
const fallback: Metadata = { title: "Tesamorelin — FDA-Approved Visceral Fat Reduction | Get Simple Health", description: "The only FDA-approved GHRH analogue shown to reduce dangerous visceral adipose tissue. Clinically proven 15.2% VAT reduction at 26 weeks. Starting at $400/month.", alternates: { canonical: "/tesamorelin" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/tesamorelin", fallback); }
export default function Page() { return <TesamorelinPage />; }
