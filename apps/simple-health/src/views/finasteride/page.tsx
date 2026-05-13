import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "finasteride", efficacyTier: "Top Standard", name: "Finasteride / Dutasteride", headline: "The trusted standard for hair preservation",
  startingPrice: "Starting at $99/Mo", delivery: "Once-daily oral tablet", resultsIn: "Stabilization in 3–6 months",
  description: "FDA-approved 5-alpha reductase inhibitors that block the conversion of testosterone to DHT — the hormone responsible for androgenetic alopecia. Finasteride is the gold standard for early prevention and maintenance. Dutasteride offers superior DHT suppression for advanced loss or non-responders.",
  heroImage: `${IMG}/Untitled-design-2026-03-19T120715-018.png`,
  mechanismTitle: "Stop the root cause of hair loss.",
  mechanismSubtitle: "Androgenetic alopecia is driven by DHT — a testosterone derivative that miniaturizes hair follicles over time. Finasteride and Dutasteride interrupt this process at the source.",
  mechanisms: [
    { name: "Finasteride", badge: "Type II 5-AR Inhibitor", description: "Blocks Type II 5-alpha reductase, the enzyme primarily responsible for DHT production in the scalp. Reduces scalp DHT by ~70%. FDA-approved for male pattern hair loss with over 30 years of clinical data. The gold standard for early prevention and maintenance.", result: "Result: 99.1% of men experience no further loss over 10 years; regrowth in 65% within 2 years" },
    { name: "Dutasteride", badge: "Dual 5-AR Inhibitor", description: "Blocks both Type I and Type II 5-alpha reductase — suppressing DHT by over 90% vs. ~70% for finasteride. Significantly more potent for advanced loss or patients who don't respond adequately to finasteride. Your physician will recommend which is appropriate.", result: "Result: Superior DHT suppression for more advanced androgenetic alopecia" },
    { name: "Follicle Preservation", badge: "Long-Term Protection", description: "By eliminating the DHT signal that causes follicles to miniaturize, the medications preserve follicle size and function. Hair that would have been permanently lost over the next 5–10 years stays. Once preserved, these follicles can recover density with minoxidil.", result: "Result: Permanent preservation of follicles that would otherwise be irreversibly lost" },
  ],
  benefits: [
    { icon: "ri-seedling-line", title: "Stops hair loss in 99% of men", description: "Long-term studies show 99.1% of patients maintain or improve hair count over 10 years of treatment." },
    { icon: "ri-arrow-up-line", title: "Regrows hair in 65% of users", description: "Visible hair density improvements occur in the majority of patients within 12–24 months of consistent use." },
    { icon: "ri-shield-check-line", title: "FDA-approved gold standard", description: "Finasteride has FDA approval for male androgenetic alopecia with decades of safety data supporting long-term use." },
    { icon: "ri-capsule-line", title: "Once-daily convenience", description: "Simple once-daily oral tablet — no scalp application, no foam, no mess. Maximum adherence for a chronic condition." },
    { icon: "ri-recycle-line", title: "Preserves what you have", description: "Prevention is dramatically more effective than restoration. Treating early keeps follicles alive that would otherwise permanently miniaturize." },
    { icon: "ri-heart-pulse-line", title: "Physician-monitored", description: "Regular check-ins monitor your response and any side effects, with dose adjustments or upgrade to dutasteride as needed." },
  ],
  timeline: [
    { phase: "Months 1–3", title: "DHT Suppression Begins", description: "DHT levels drop within days of starting. You may experience increased shedding (a positive sign the hair cycle is resetting). No visible improvement yet." },
    { phase: "Months 3–6", title: "Loss Stabilization", description: "For most patients, hair loss stops. The shedding phase resolves. Hair count stabilizes and begins holding steady for the first time." },
    { phase: "Months 6–12", title: "Initial Regrowth", description: "Preserved follicles begin producing thicker, healthier hairs. Density improvements become visible at the temples and crown for many patients." },
    { phase: "Months 12–24", title: "Visible Density Gains", description: "Significant regrowth becomes noticeable. Hairs that were thinning become thicker. Most patients achieve peak regrowth results around 18–24 months." },
    { phase: "Long-term", title: "Maintained Results", description: "Continued daily use maintains preserved density indefinitely. The 10-year data shows sustained protection with consistent treatment." },
  ],
  faqs: [
    { q: "What's the difference between finasteride and dutasteride?", a: "Finasteride blocks only Type II 5-alpha reductase, reducing scalp DHT by ~70%. Dutasteride blocks both Type I and Type II, reducing DHT by over 90%. Dutasteride is more potent but is off-label for hair loss (FDA-approved for BPH). Your physician will recommend finasteride as first-line, escalating to dutasteride if needed." },
    { q: "What are the sexual side effects?", a: "The most commonly discussed side effects are sexual (decreased libido, erectile changes), occurring in 1–2% of users. These are typically reversible upon discontinuation. The vast majority of patients experience no sexual side effects. Persistent side effects after stopping (post-finasteride syndrome) have been reported but remain controversial and appear to be rare." },
    { q: "Can women take finasteride?", a: "Finasteride is FDA-approved for men only. However, dutasteride is sometimes prescribed off-label for post-menopausal women with androgenetic alopecia. Women of childbearing potential must not handle crushed finasteride tablets due to birth defect risk. Your physician will determine if any DHT blocker is appropriate for your situation." },
    { q: "How long do I need to take it?", a: "Hair loss is a chronic, progressive condition. These medications manage the condition but don't cure it. If you stop, DHT returns and hair loss resumes within 6–12 months. Most patients maintain daily use long-term — once-daily oral medication is a very manageable chronic condition treatment." },
    { q: "Should I combine finasteride with minoxidil?", a: "Yes, if your goal is maximum density. Finasteride prevents loss; minoxidil stimulates growth. They work through different mechanisms and are safe to combine. The combination produces superior results to either alone and is the most common protocol for comprehensive hair restoration." },
  ],
};

export function FinasteridePage() { return <PeptideLandingPage data={data} />; }
