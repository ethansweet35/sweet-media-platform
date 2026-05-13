import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "tesamorelin", efficacyTier: "FDA-Approved for Visceral Fat", name: "Tesamorelin", headline: "Precision metabolic reset",
  startingPrice: "Starting at $400", delivery: "Daily subcutaneous injection", resultsIn: "Results in 12–26 weeks",
  description: "The only FDA-approved GHRH analogue shown to specifically reduce dangerous visceral adipose tissue. Originally developed for HIV-associated lipodystrophy, now prescribed for metabolic optimization. Tesamorelin targets the deep abdominal fat that drives insulin resistance, inflammation, and cardiovascular risk.",
  heroImage: `${IMG}/ChatGPT-Image-May-4-2026-01_22_20-PM.png`,
  mechanismTitle: "Targeted visceral fat mobilization",
  mechanismSubtitle: "Unlike off-label peptide use, Tesamorelin has a validated safety profile, established dosing protocols, and regulatory oversight based on rigorous clinical trials published in NEJM (2010) and Lancet (2010).",
  mechanisms: [
    { name: "Pulsatile GH Restoration", badge: "GH Rhythm", description: "Tesamorelin stimulates your pituitary to release growth hormone in natural pulses, restoring the GH rhythm that declines with age and metabolic dysfunction. This normalized GH secretion drives the metabolic benefits.", result: "Result: Restored GH levels without exogenous hormone replacement" },
    { name: "Visceral Fat Mobilization", badge: "Fat Specialist", description: "The restored GH specifically targets visceral adipose tissue — the metabolically dangerous fat surrounding your organs. Visceral fat is more responsive to GH-mediated lipolysis than subcutaneous fat.", result: "Result: Clinically proven 15.2% reduction in visceral adipose tissue" },
    { name: "Metabolic Optimization", badge: "Systemic Benefits", description: "By reducing visceral fat, Tesamorelin improves glucose metabolism, insulin sensitivity, and lipid profiles. Visceral fat produces inflammatory cytokines and hormones that drive metabolic dysfunction — removing it addresses the root cause.", result: "Result: Improved glucose tolerance, triglycerides, and HDL cholesterol" },
  ],
  benefits: [
    { icon: "ri-focus-3-line", title: "Visceral Fat Reduction", description: "Clinically proven to reduce dangerous belly fat by 15.2% at 26 weeks, with sustained reductions at one year." },
    { icon: "ri-heart-pulse-line", title: "Improved Insulin Sensitivity", description: "Enhances glucose tolerance in patients with impaired fasting glucose, addressing metabolic dysfunction at its source." },
    { icon: "ri-line-chart-line", title: "Favorable Lipid Profile", description: "Reduces triglycerides and increases HDL cholesterol, improving cardiovascular risk markers." },
    { icon: "ri-body-scan-line", title: "Lean Mass Preservation", description: "Maintains lean muscle mass during visceral fat loss, preventing the muscle wasting often seen with caloric restriction." },
    { icon: "ri-shield-check-line", title: "Cardiovascular Protection", description: "Reduces visceral fat that drives inflammation, insulin resistance, and cardiovascular disease risk." },
    { icon: "ri-recycle-line", title: "Metabolic Resilience", description: "Addresses the root metabolic dysfunction driving weight gain, making it easier to maintain results long-term." },
  ],
  timeline: [
    { phase: "Weeks 1–4", title: "Metabolic Adaptation", description: "Your body begins responding to restored GH pulses. Energy and recovery may improve as metabolic function optimizes." },
    { phase: "Weeks 8–12", title: "Early VAT Reduction", description: "Initial visceral fat mobilization begins. Waist circumference may start to decrease, though changes are subtle." },
    { phase: "Weeks 12–26", title: "Significant VAT Loss", description: "Measurable visceral fat reduction on imaging. Waist circumference visibly decreases. Metabolic markers begin improving." },
    { phase: "Week 26", title: "Peak VAT Reduction", description: "Clinical trials showed 15.2% visceral adipose tissue reduction at this timepoint — maximum benefit for most patients." },
    { phase: "6–12 Months", title: "Sustained Results", description: "Maintained visceral fat reduction with continued use. Metabolic improvements (glucose, lipids) fully manifest and stabilize." },
  ],
  faqs: [
    { q: "What makes Tesamorelin different from other GH peptides?", a: "Tesamorelin is the only FDA-approved GHRH analogue specifically shown to reduce visceral adipose tissue (dangerous belly fat). While other GH peptides like Sermorelin improve overall body composition, Tesamorelin has unique clinical data showing targeted reduction of visceral fat — the metabolically harmful fat surrounding your organs." },
    { q: "How much visceral fat reduction can I expect?", a: "Clinical trials showed a 15.2% reduction in visceral adipose tissue at 26 weeks, with sustained reductions maintained at 52 weeks. Individual results vary based on baseline visceral fat levels, diet, and exercise, but most patients see measurable reductions in waist circumference within 3–6 months." },
    { q: "Will Tesamorelin help with subcutaneous fat (the fat I can pinch)?", a: "Tesamorelin primarily targets visceral fat (deep abdominal fat around organs), not subcutaneous fat. While some patients experience overall fat loss, the primary benefit is reduction of metabolically dangerous visceral adiposity. For general fat loss, combining with GLP-1 medications is often recommended." },
    { q: "Can I use Tesamorelin if I have insulin resistance?", a: "Yes — in fact, patients with insulin resistance or impaired glucose tolerance often benefit most, as visceral fat is a primary driver of these conditions. Tesamorelin's reduction of visceral fat directly improves insulin sensitivity. Your provider will evaluate your metabolic markers before and during treatment." },
  ],
};

export function TesamorelinPage() { return <PeptideLandingPage data={data} />; }
