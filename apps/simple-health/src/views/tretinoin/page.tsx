import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "tretinoin", efficacyTier: "Skin Renewal", name: "Tretinoin", headline: "The gold standard in topical skin renewal",
  startingPrice: "Starting at $49/Mo", delivery: "Nightly topical application", resultsIn: "Results in 3–6 months",
  description: "An FDA-approved prescription retinoid that works immediately to stimulate collagen production, accelerate cell turnover, and refine texture. The most clinically validated anti-aging topical available — nothing over-the-counter comes close.",
  heroImage: `${IMG}/ChatGPT-Image-May-4-2026-09_56_55-AM.png`,
  mechanismTitle: "One molecule. Multiple pathways.",
  mechanismSubtitle: "Tretinoin (all-trans retinoic acid) binds directly to nuclear retinoic acid receptors, altering gene expression in ways that no cosmetic retinol product can replicate.",
  mechanisms: [
    { name: "Collagen Synthesis", badge: "Fibroblast Activation", description: "Directly stimulates fibroblasts to produce new Type I and Type III collagen — reversing the structural breakdown that causes wrinkles and sagging. Clinical studies show 80% increase in collagen density after 12 months of use.", result: "Result: Measurably thicker, firmer skin with reduced fine lines and wrinkles" },
    { name: "Cell Turnover", badge: "Keratinocyte Normalization", description: "Accelerates the shedding of old, pigmented, damaged skin cells while speeding the rise of fresh new cells from the basal layer. This continuous renewal keeps the skin surface clear, even, and luminous.", result: "Result: Smoother texture, reduced pore appearance, faded discoloration" },
    { name: "Acne Clearance", badge: "Comedolytic Action", description: "Normalizes the abnormal keratinization in follicles that creates comedones (clogged pores). Unlike topical antibiotics, tretinoin targets the source — it physically prevents pores from clogging rather than killing bacteria after the fact.", result: "Result: Clear pores, reduced blackheads and whiteheads, prevention of new acne" },
  ],
  benefits: [
    { icon: "ri-sparkling-2-line", title: "Reduces fine lines & wrinkles", description: "Clinical trials show 80–90% of patients experience visible reduction in fine lines after 6–12 months of consistent use." },
    { icon: "ri-palette-line", title: "Fades hyperpigmentation", description: "Accelerates turnover of pigmented cells, reducing dark spots, sun damage, melasma, and post-inflammatory marks." },
    { icon: "ri-droplet-line", title: "Treats acne", description: "FDA-approved for acne, tretinoin prevents pore clogging while simultaneously reducing inflammatory lesions." },
    { icon: "ri-focus-3-line", title: "Refines pore size", description: "Normalized cell turnover keeps pores clear and appears to reduce their visible size over time." },
    { icon: "ri-shield-check-line", title: "Prevents photoaging", description: "Consistent use prevents new UV damage from translating into visible skin aging, making it one of the best anti-aging investments available." },
    { icon: "ri-leaf-line", title: "40+ years of evidence", description: "More clinical data than any other topical anti-aging ingredient — prescribed by dermatologists since the 1970s." },
  ],
  timeline: [
    { phase: "Weeks 1–4", title: "Retinization Period", description: "Some redness, dryness, and peeling as skin adjusts. This is normal and temporary. Starting with every-other-night application and a good moisturizer minimizes discomfort." },
    { phase: "Weeks 4–8", title: "Skin Smoothing", description: "Texture begins to improve as accelerated cell turnover reveals fresher skin. Acne patients often see first significant clearing. Skin may still purge during this phase." },
    { phase: "Months 3–4", title: "Visible Tone Improvements", description: "Hyperpigmentation visibly fades. Skin tone becomes more even. Fine lines start to soften as collagen production ramps up. Most patients are now tolerating nightly use." },
    { phase: "Months 6–9", title: "Structural Changes", description: "Collagen remodeling becomes clinically measurable. Pores appear smaller. Skin has a new quality of firmness and radiance that distinguishes prescription tretinoin from cosmetic alternatives." },
    { phase: "12 Months+", title: "Full Anti-Aging Benefits", description: "Maximum collagen density improvement, sustained acne prevention, comprehensive photoaging reversal. Skin continues to improve with consistent use for years." },
  ],
  faqs: [
    { q: "Will tretinoin make my skin worse at first?", a: "Many patients experience a 'purging' or 'retinization' period in the first 2–4 weeks as cell turnover accelerates. This is normal and temporary. We start most patients on a lower strength and gradually increase to minimize irritation. The 'sandwich method' (applying moisturizer before and after) can also reduce irritation." },
    { q: "How is prescription tretinoin different from over-the-counter retinol?", a: "Tretinoin is retinoic acid — the active form. Retinol in cosmetic products must be converted by your skin into retinoic acid, losing 10–40x potency in the process. Prescription tretinoin is the molecule that directly binds to nuclear receptors. There's no cosmetic equivalent." },
    { q: "Can I use tretinoin if I have sensitive skin?", a: "Yes. We can prescribe lower concentrations (0.025%) and recommend a gradual application schedule (every 2–3 nights initially). Most patients build tolerance within 4–6 weeks. The sandwich method (moisturizer before and after tretinoin) significantly reduces irritation for sensitive skin types." },
    { q: "Can I use tretinoin with other skincare actives?", a: "With care. Tretinoin pairs well with hyaluronic acid, ceramides, and niacinamide (barrier support). Avoid combining with benzoyl peroxide (inactivates tretinoin), vitamin C (pH incompatibility), or AHA/BHA exfoliants (increases irritation) — use these at different times if needed. Your physician will review your routine." },
    { q: "How long do I need to use tretinoin?", a: "For acne, tretinoin is often used for a defined period (months to years) until clear, then potentially switched to maintenance. For anti-aging, it's a long-term investment — the benefits compound with continued use, and most dermatologists recommend indefinite use as tolerated." },
  ],
};

export function TretinoinPage() { return <PeptideLandingPage data={data} />; }
