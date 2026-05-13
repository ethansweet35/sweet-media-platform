import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "skin-care-routine", efficacyTier: "Prescription Protocol", name: "Skin Care Routine", headline: "A complete prescription skincare system",
  startingPrice: "Starting at $199/Mo", delivery: "Prescription + medical-grade products", resultsIn: "Results in 6–12 weeks",
  description: "A skincare protocol designed by dermatology-trained physicians. Combines prescription actives (tretinoin, hydroquinone, azelaic acid) with pharmaceutical-grade cleansers, moisturizers, and SPF — customized to your skin type and concerns.",
  heroImage: `${IMG}/Untitled-design-2026-03-23T125759-991.png`,
  mechanismTitle: "Prescription actives. Medical-grade foundation.",
  mechanismSubtitle: "Your routine is built around the ingredients that have decades of clinical evidence — not marketing claims. Each component is chosen for your specific skin concerns.",
  mechanisms: [
    { name: "Prescription Actives", badge: "Core Treatment Layer", description: "Tretinoin, hydroquinone, or azelaic acid — depending on your concerns — form the treatment core. These prescription-strength ingredients work at a cellular level no cosmetic product can reach.", result: "Result: Clinically meaningful changes in texture, tone, acne, and aging" },
    { name: "Barrier Support", badge: "Foundation Layer", description: "Pharmaceutical-grade cleansers, ceramide-rich moisturizers, and protective SPF protect and support the skin's barrier during active treatment. Proper barrier function amplifies results and prevents irritation.", result: "Result: Optimal tolerability of prescription actives, maintained skin health" },
    { name: "Physician Monitoring", badge: "Ongoing Optimization", description: "Your protocol isn't static. Monthly check-ins allow your physician to adjust concentrations, swap actives, and optimize your routine as your skin responds. The routine evolves with your skin.", result: "Result: Continuously optimized treatment that adapts to your progress" },
  ],
  benefits: [
    { icon: "ri-user-heart-line", title: "Customized to your skin", description: "Your physician analyzes your skin type, concerns, and history to build a protocol specific to your needs — not a generic kit." },
    { icon: "ri-stethoscope-line", title: "Dermatologist oversight", description: "Every prescription is reviewed and monitored by a board-certified dermatologist licensed in your state." },
    { icon: "ri-sparkling-2-line", title: "Addresses acne, aging & pigmentation", description: "One comprehensive protocol covers multiple concerns simultaneously — acne prevention, collagen stimulation, and even skin tone." },
    { icon: "ri-shield-check-line", title: "Prescription-strength ingredients", description: "These aren't available over-the-counter for a reason — they work at a cellular level that cosmetic products can't reach." },
    { icon: "ri-focus-3-line", title: "Eliminates guesswork", description: "No more researching ingredients, layering products incorrectly, or wasting money on ineffective cosmetics. Your physician handles the science." },
    { icon: "ri-price-tag-line", title: "Transparent pricing", description: "No surprise fees, no insurance complexity. You know the exact cost before you commit, with all products included." },
  ],
  timeline: [
    { phase: "Weeks 1–2", title: "Protocol Introduction", description: "Begin with gentle application of prescription actives to build tolerance. Some initial dryness or adjustment is normal as skin adapts." },
    { phase: "Weeks 3–6", title: "Skin Adjustment Complete", description: "Most patients have fully acclimated to the routine. Texture begins improving. Acne patients see reduced breakout frequency." },
    { phase: "Weeks 6–12", title: "Visible Improvements", description: "Tone becomes more even, dark spots begin fading, skin feels smoother. The effects of consistent cell turnover and collagen stimulation become noticeable." },
    { phase: "Months 3–6", title: "Structural Skin Changes", description: "Collagen remodeling produces measurably firmer, thicker skin. Hyperpigmentation significantly reduced. Acne well-controlled with maintenance routine." },
    { phase: "6+ Months", title: "Long-Term Skin Health", description: "Your skin's fundamental health is optimized. Consistent use of the protocol maintains clear skin, prevents photoaging, and continues to improve quality over time." },
  ],
  faqs: [
    { q: "What's included in the Skin Care Routine?", a: "Your protocol includes prescription actives (tretinoin and/or hydroquinone or azelaic acid based on your concerns), a gentle medical-grade cleanser, a ceramide-rich moisturizer, and broad-spectrum SPF. Everything ships to you in one package — no pharmacy visits required." },
    { q: "How is this different from buying skincare myself?", a: "The prescription actives are not available without a physician — they're the core that makes this protocol clinically effective. Additionally, your physician selects the right combination and concentration for your skin type, and monitors your progress. Guessing wrong with actives can damage your skin barrier; this removes the guesswork entirely." },
    { q: "Can this routine treat acne, aging, and dark spots simultaneously?", a: "Yes. Tretinoin addresses all three: it clears acne by normalizing pore keratinization, stimulates collagen for anti-aging, and accelerates turnover to fade hyperpigmentation. If significant pigmentation is present, hydroquinone may be added for accelerated fading. Your physician tailors the protocol to your priorities." },
    { q: "What if my skin is sensitive?", a: "We start sensitive skin types on lower concentrations and gentler application schedules. The barrier-support products in your kit (moisturizer, gentle cleanser) are specifically chosen to minimize irritation while you build tolerance. Most sensitive-skin patients are fully tolerating the routine within 4–6 weeks." },
    { q: "How do follow-up visits work?", a: "Monthly telehealth check-ins with your dermatologist allow us to review your skin's progress (via photos you upload), adjust your prescription if needed, and refill your medications. No in-person visits required." },
  ],
};

export function SkinCareRoutinePage() { return <PeptideLandingPage data={data} />; }
