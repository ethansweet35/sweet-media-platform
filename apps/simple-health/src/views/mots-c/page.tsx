import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "mots-c", efficacyTier: "Mitochondrial Optimizer", name: "MOTS-c", headline: "The exercise mimetic",
  startingPrice: "Starting at $450", delivery: "3–5x per week dosing", resultsIn: "Results in 4–8 weeks",
  description: "A mitochondrial-derived peptide that acts as your body's natural metabolic regulator. MOTS-c improves insulin sensitivity, enhances fat oxidation, and increases exercise capacity by optimizing how your cells produce and use energy — essentially telling your body to burn fuel more efficiently.",
  heroImage: `${IMG}/ChatGPT-Image-May-4-2026-12_53_02-PM.png`,
  mechanismTitle: "Mitochondrial metabolic signaling",
  mechanismSubtitle: "MOTS-c is encoded in your mitochondrial DNA — a natural signal that declines with age. Most peptides are encoded in nuclear DNA; MOTS-c is unique because it represents a communication pathway between your mitochondria and the rest of your body.",
  mechanisms: [
    { name: "AMPK Activation", badge: "Metabolic Master Switch", description: "MOTS-c activates AMPK, the body's metabolic master switch that regulates energy balance, glucose uptake, and fat oxidation. This is the same pathway activated by exercise and caloric restriction.", result: "Result: Enhanced fat burning, improved insulin sensitivity, increased cellular energy" },
    { name: "Mitochondrial Biogenesis", badge: "Cellular Power Upgrade", description: "Stimulates the creation of new mitochondria and improves the efficiency of existing ones — essentially upgrading your cellular power plants to produce more ATP with less oxidative stress.", result: "Result: Increased energy production, reduced fatigue, better exercise capacity" },
    { name: "Glucose Regulation", badge: "Insulin Sensitivity", description: "Improves insulin sensitivity and glucose uptake in muscle tissue, helping prevent insulin resistance and metabolic dysfunction. Protects against diet-induced obesity and diabetes.", result: "Result: Better blood sugar control, reduced metabolic syndrome risk" },
  ],
  benefits: [
    { icon: "ri-heart-pulse-line", title: "Improved Insulin Sensitivity", description: "Enhances glucose uptake and reduces insulin resistance, protecting against metabolic syndrome and type 2 diabetes." },
    { icon: "ri-fire-line", title: "Enhanced Fat Metabolism", description: "Increases fat oxidation and mitochondrial efficiency, supporting body recomposition and preventing diet-induced obesity." },
    { icon: "ri-run-line", title: "Increased Exercise Capacity", description: "Improves endurance, oxygen utilization, and recovery — clinical studies show increased performance in both young and aged subjects." },
    { icon: "ri-flashlight-line", title: "Cellular Energy Production", description: "Optimizes mitochondrial ATP synthesis, reducing fatigue and improving overall energy levels throughout the day." },
    { icon: "ri-shield-check-line", title: "Metabolic Resilience", description: "Protects against age-related metabolic decline and helps maintain healthy metabolic function as you age." },
    { icon: "ri-body-scan-line", title: "Muscle Preservation", description: "Supports lean muscle mass retention during caloric deficits and aging, preventing sarcopenia." },
  ],
  timeline: [
    { phase: "Weeks 1–2", title: "Energy & Recovery Improvements", description: "Many patients notice increased daytime energy and faster recovery from exercise within the first two weeks." },
    { phase: "Weeks 2–4", title: "Exercise Performance Gains", description: "Improved endurance, stamina, and workout capacity become apparent. Workouts that felt difficult become easier." },
    { phase: "Weeks 4–8", title: "Metabolic Marker Improvements", description: "Fasting glucose, insulin sensitivity, and metabolic blood markers begin to improve on lab work." },
    { phase: "Weeks 8–12", title: "Body Composition Changes", description: "Visible improvements in muscle tone and fat distribution, particularly in stubborn areas like the midsection." },
    { phase: "3–6 Months", title: "Sustained Metabolic Optimization", description: "Peak metabolic benefits, improved body composition, sustained energy, and protection against age-related decline." },
  ],
  faqs: [
    { q: "What makes MOTS-c different from other metabolic peptides?", a: "MOTS-c is unique because it's encoded in your mitochondrial DNA, not nuclear DNA. It's a signal your mitochondria send to your muscles and other tissues to regulate metabolism. Unlike GLP-1s that work on appetite, MOTS-c works at the cellular level to improve how your body burns fuel, handles glucose, and generates energy." },
    { q: "Can I use MOTS-c if I'm already on GLP-1 medications like semaglutide or tirzepatide?", a: "Yes. MOTS-c works through a completely different mechanism than GLP-1 agonists. While GLP-1s reduce appetite and slow gastric emptying, MOTS-c improves mitochondrial function and insulin sensitivity at the cellular level. Many patients combine both for comprehensive metabolic optimization." },
    { q: "Will MOTS-c help me lose weight?", a: "MOTS-c supports fat metabolism and prevents diet-induced obesity in research, but it's not primarily a weight loss medication. It's better described as a metabolic optimizer. Patients often report improved body composition (more muscle, less fat) even without significant scale weight changes." },
    { q: "How does MOTS-c improve exercise performance?", a: "MOTS-c increases mitochondrial efficiency and activates AMPK — the body's metabolic master switch — which enhances endurance, speeds recovery, and improves how muscles use oxygen and glucose. Clinical studies have shown increased exercise capacity in both young adults and aged subjects, making it valuable across all fitness levels." },
  ],
};

export function MotscPage() { return <PeptideLandingPage data={data} />; }
