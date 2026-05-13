import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "glow-stack", efficacyTier: "Aesthetic Optimization", name: "Glow Stack", headline: "GHK-Cu + BPC-157 + TB-500",
  startingPrice: "Starting at $600", delivery: "3–5x per week dosing", resultsIn: "Results in 3–4 weeks",
  description: "A physician-formulated three-peptide protocol designed for comprehensive skin, hair, and soft tissue rejuvenation. Combines the collagen-boosting power of GHK-Cu, the healing properties of BPC-157, and the regenerative effects of TB-500 into a single aesthetic optimization stack.",
  heroImage: `${IMG}/ChatGPT-Image-May-2-2026-03_20_58-PM.png`,
  mechanismTitle: "Three peptides, one comprehensive protocol",
  mechanismSubtitle: "Each peptide in the Glow Stack targets a different pathway — together they deliver synergistic aesthetic benefits that exceed any single peptide alone.",
  mechanisms: [
    { name: "GHK-Cu", badge: "Copper Peptide · Cellular Repair", description: "A naturally occurring copper complex peptide that modulates over 4,000 human genes to drive collagen synthesis, tissue remodeling, and cellular cleanup. The foundation of the stack's aesthetic benefits.", result: "Key Action: Increases collagen density, reverses aging-associated gene expression, accelerates wound healing" },
    { name: "BPC-157", badge: "Body Protective Compound · Healing", description: "A gastric peptide with profound healing properties for skin, connective tissue, and the gut lining. Supports the gut-skin axis — critical since gut health directly affects skin quality and inflammation.", result: "Key Action: Accelerates skin healing, reduces systemic inflammation, supports gut health for clearer skin" },
    { name: "TB-500", badge: "Thymosin Beta-4 · Regeneration", description: "A powerful regenerative peptide that promotes angiogenesis (new blood vessel formation) and cell migration to injury sites. Brings nutrients and growth factors to hair follicles and skin for enhanced vitality.", result: "Key Action: Promotes hair follicle health, enhances skin blood flow, accelerates tissue regeneration" },
  ],
  benefits: [
    { icon: "ri-sparkling-2-line", title: "Skin Elasticity & Tone", description: "Visibly improves skin firmness, reduces fine lines, and enhances overall skin radiance through collagen remodeling." },
    { icon: "ri-seedling-line", title: "Hair Thickness & Density", description: "Promotes thicker, healthier hair and reduces thinning by improving follicle health and blood flow to the scalp." },
    { icon: "ri-first-aid-kit-line", title: "Accelerated Healing", description: "Speeds recovery from cosmetic procedures, reduces scarring, and minimizes downtime from lasers or injectables." },
    { icon: "ri-droplet-line", title: "Collagen Production", description: "Increases dermal collagen density at the genetic level, reversing age-related collagen breakdown." },
    { icon: "ri-fire-line", title: "Inflammation Reduction", description: "Reduces systemic and skin inflammation, leading to clearer complexion and reduced redness or irritation." },
    { icon: "ri-recycle-line", title: "Tissue Regeneration", description: "Supports soft tissue repair, joint health, and overall cellular rejuvenation beyond just aesthetics." },
  ],
  timeline: [
    { phase: "Weeks 1–3", title: "Initial Glow & Texture", description: "Skin feels smoother and more hydrated. Many patients notice a subtle glow as cellular turnover begins." },
    { phase: "Weeks 3–6", title: "Visible Skin Improvements", description: "Fine lines begin to soften, skin tone evens out, and overall radiance becomes more apparent to others." },
    { phase: "Weeks 6–8", title: "Hair Thickness Changes", description: "Reduced hair shedding and visible improvements in hair density and thickness, especially at the hairline and crown." },
    { phase: "Weeks 8–12", title: "Collagen Remodeling", description: "Significant improvements in skin elasticity, visibly thicker and healthier hair, and profound reductions in fine lines and wrinkles." },
    { phase: "3–6 Months", title: "Peak Aesthetic Results", description: "Full collagen remodeling, maximized hair density, and comprehensive skin rejuvenation are fully visible." },
  ],
  faqs: [
    { q: "What makes the Glow Stack different from using individual peptides?", a: "The Glow Stack is specifically formulated to work synergistically — GHK-Cu drives collagen synthesis and gene expression, BPC-157 accelerates tissue healing and gut health (which affects skin), and TB-500 promotes angiogenesis and cellular migration. Together, they address aesthetic aging from multiple pathways simultaneously." },
    { q: "How long until I see visible aesthetic improvements?", a: "Initial improvements in skin texture and glow are often visible within 3–4 weeks. Hair thickness and reduction in thinning typically become noticeable at 6–8 weeks. Full collagen remodeling and maximum aesthetic benefits manifest after 3–6 months of consistent use." },
    { q: "Can I use the Glow Stack if I'm already using tretinoin or other skincare actives?", a: "Yes. The Glow Stack works from the inside out via systemic peptide therapy, complementing topical treatments like tretinoin, vitamin C, or prescription skincare. Many patients combine both approaches for comprehensive aesthetic optimization. Your physician will review your current regimen." },
    { q: "Will this help with post-procedure healing (Botox, fillers, lasers)?", a: "Absolutely. The Glow Stack is popular among patients undergoing cosmetic procedures because BPC-157 and TB-500 accelerate wound healing, reduce inflammation, and minimize downtime. GHK-Cu enhances collagen remodeling post-procedure. Many providers recommend starting the stack 2–4 weeks before elective cosmetic treatments." },
  ],
};

export function GlowStackPage() { return <PeptideLandingPage data={data} />; }
