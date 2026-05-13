import type { Metadata } from "next";
import { resolveTrackedPageMetadata } from "@sweetmedia/admin-core";
import { MotscPage } from "@/views/mots-c/page";
const fallback: Metadata = { title: "MOTS-c — Mitochondrial Metabolic Optimizer | Get Simple Health", description: "MOTS-c improves insulin sensitivity, fat oxidation, and exercise capacity by optimizing cellular energy production. Starting at $450/month.", alternates: { canonical: "/mots-c" } };
export async function generateMetadata(): Promise<Metadata> { return resolveTrackedPageMetadata("/mots-c", fallback); }
export default function Page() { return <MotscPage />; }
