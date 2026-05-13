import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "ghk-cu", efficacyTier: "Cellular Repair", name: "GHK-Cu", headline: "The master gene-resetting peptide",
  startingPrice: "Starting at $285", delivery: "3–5x per week dosing", resultsIn: "Results in 4–8 weeks",
  description: "A naturally occurring copper complex that acts as a powerful regenerative agent. GHK-Cu resets thousands of human genes to a younger, healthier state, promoting accelerated wound healing, collagen production, hair follicle stimulation, and profound anti-inflammatory benefits — reversing signs of aging at the cellular level.",
  heroImage: `${IMG}/ChatGPT-Image-May-2-2026-03_02_30-PM.png`,
  mechanismTitle: "Dual-action cellular rejuvenation",
  mechanismSubtitle: "When combined, the GHK peptide safely transports the highly reactive copper ion directly into cells where it is needed most — providing structural repair building blocks while simultaneously signaling cells to act younger and heal faster.",
  mechanisms: [
    { name: "GHK (Glycyl-L-Histidyl-L-Lysine)", badge: "Gene Modulator · Carrier Peptide", description: "A naturally occurring tripeptide sequence with an incredible affinity for binding to copper. On its own, GHK acts as a powerful epigenetic modulator, up-regulating and down-regulating over 4,000 human genes — resetting your cellular DNA to a younger, healthier state.", result: "Key Study: Modulated gene expression of 4,192 human genes (Int J Mol Sci, 2018)" },
    { name: "Copper (Cu2+)", badge: "Essential Mineral · Enzyme Cofactor", description: "A crucial trace mineral that acts as an essential cofactor for numerous biological enzymes responsible for collagen and elastin synthesis, blood vessel formation (angiogenesis), and clearing away damaged tissue proteins.", result: "Key Study: Directly stimulated human fibroblasts to increase collagen and elastin production (J Clin Invest, 1993)" },
    { name: "Synergistic Complex", badge: "Combined Action", description: "Together, GHK-Cu delivers copper precisely to the cells that need it most while simultaneously activating regenerative gene expression. This dual action produces profound increases in skin elasticity, tissue repair, and hair growth that exceed traditional supplementation.", result: "Result: Comprehensive cellular rejuvenation at the genetic level" },
  ],
  benefits: [
    { icon: "ri-sparkling-2-line", title: "Skin Rejuvenation & Collagen", description: "Significantly increases collagen and elastin production, tightening loose skin, reducing hyperpigmentation, and smoothing fine lines and deep wrinkles." },
    { icon: "ri-seedling-line", title: "Hair Follicle Stimulation", description: "Enlarges dormant hair follicles, increases new hair growth, and inhibits overall hair loss by improving microcirculation throughout the scalp." },
    { icon: "ri-fire-line", title: "Anti-Inflammatory Action", description: "Systemically reduces chronic inflammation and harmful oxidative stress, actively protecting tissues and organs from free radical damage." },
    { icon: "ri-brain-line", title: "Cognitive Support", description: "Protects vital nerve function, promotes new nerve outgrowth, and modulates pain perception, effectively improving mental clarity." },
    { icon: "ri-first-aid-kit-line", title: "Accelerated Healing", description: "Accelerates the natural healing process of skin, soft tissue, and bones by enhancing blood vessel growth and modulating tissue repair." },
    { icon: "ri-leaf-line", title: "Stem Cell Activation", description: "Rapidly mobilizes and activates dormant somatic stem cells throughout the body, improving overall cellular and tissue regeneration capacity." },
  ],
  timeline: [
    { phase: "Weeks 1–2", title: "Reduced Inflammation & Healing", description: "Patients notice faster recovery from minor injuries or intense workouts, reduced joint pain, and a general decrease in systemic inflammation." },
    { phase: "Weeks 3–4", title: "Improved Skin Texture", description: "A noticeable, radiant glow appears. Your skin feels better hydrated, much softer, and early signs of improved elasticity become apparent." },
    { phase: "Weeks 6–8", title: "Hair & Structural Changes", description: "Reduced hair shedding alongside new growth. Visible tightening of loose skin, fading scars, and reduced sun damage." },
    { phase: "Weeks 8–12", title: "Deep Tissue & Joint Repair", description: "Significant improvements in daily joint mobility, visibly thicker and healthier hair, and profound reductions in fine lines and wrinkles." },
    { phase: "3–6 Months", title: "Peak Systemic Rejuvenation", description: "Sustained systemic collagen production, highly optimized cellular health, robust deep tissue repair, and comprehensive full-body rejuvenation benefits fully manifest." },
  ],
  faqs: [
    { q: "How is injectable GHK-Cu different from topical copper peptide serums?", a: "While topical serums are excellent for localized facial skin improvement, they only penetrate the outer layers of the epidermis. Injectable GHK-Cu works systemically, delivering the peptide directly into your bloodstream for full-body benefits including internal tissue repair, systemic inflammation reduction, and whole-body skin and hair rejuvenation." },
    { q: "When will I start noticing results?", a: "Most patients report accelerated healing and reduced inflammation within the first 1–2 weeks. Skin texture improvements and increased hydration typically become noticeable at 3–4 weeks. Structural changes like skin tightening, hair growth, and deep tissue repair become visible at 6–12 weeks." },
    { q: "Can GHK-Cu help with hair loss?", a: "Yes. GHK-Cu has shown significant benefits for hair follicle health. It enlarges miniaturized hair follicles, improves scalp microcirculation, and inhibits dihydrotestosterone-induced hair follicle regression. Most patients notice reduced shedding within 4–6 weeks and visible new growth at 8–12 weeks." },
    { q: "Is GHK-Cu safe for long-term use?", a: "GHK-Cu is a naturally occurring peptide found in human plasma, urine, and saliva. It's well-tolerated and has an excellent safety profile with no significant adverse effects reported in clinical use. Your provider will monitor your response and adjust dosing as needed." },
  ],
};

export function GhkCuPage() { return <PeptideLandingPage data={data} />; }
