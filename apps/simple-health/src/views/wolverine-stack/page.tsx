import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "wolverine-stack", efficacyTier: "Elite Recovery Protocol", name: "Wolverine Stack", headline: "BPC-157 + TB-500",
  startingPrice: "Starting at $400", delivery: "Daily subcutaneous injection", resultsIn: "Results in 12–26 weeks",
  description: "The gold-standard recovery stack combining BPC-157 and TB-500 — two of the most powerful healing peptides known. Used by elite athletes for injury recovery, tendon repair, and systemic resilience. This stack accelerates healing through complementary pathways: BPC-157 via the gut-joint axis and angiogenesis, TB-500 via cell migration and tissue regeneration.",
  heroImage: `${IMG}/ChatGPT-Image-May-4-2026-01_32_21-PM.png`,
  mechanismTitle: "Dual-pathway healing amplification",
  mechanismSubtitle: "BPC-157 addresses the gut-inflammation connection and promotes localized angiogenesis. TB-500 enhances cell migration and systemic tissue regeneration. Together, they attack healing from multiple angles — clinical observation shows 2–3x faster recovery timelines when used in combination.",
  mechanisms: [
    { name: "BPC-157", badge: "Body Protective Compound", description: "A gastric peptide with profound healing properties for tendons, ligaments, muscles, and the gut lining. BPC-157 works through the gut-joint axis — healing gut permeability that drives systemic inflammation, while simultaneously accelerating soft tissue repair through angiogenesis.", result: "Key Action: Accelerates Achilles tendon healing, protects gut lining, promotes blood vessel formation" },
    { name: "TB-500", badge: "Thymosin Beta-4", description: "A powerful regenerative peptide that promotes cell migration to injury sites and stimulates angiogenesis (new blood vessel formation). TB-500 helps cells migrate to where they're needed most, bringing nutrients and growth factors to damaged tissue for faster repair.", result: "Key Action: Promotes angiogenesis, enhances cell migration, accelerates neurological and systemic tissue repair" },
    { name: "Combined Protocol", badge: "Synergistic Healing", description: "When combined, BPC-157 and TB-500 attack healing from multiple angles simultaneously — reducing inflammation, increasing blood flow, recruiting repair cells, and supporting tissue remodeling. Clinical observation shows 2–3x faster recovery timelines vs. either peptide alone.", result: "Result: 2–3x faster injury recovery vs. single-peptide protocols" },
  ],
  benefits: [
    { icon: "ri-run-line", title: "Accelerated Injury Healing", description: "Dramatically speeds healing from muscle, tendon, and ligament injuries — 2–3x faster recovery timelines reported in sports medicine." },
    { icon: "ri-heart-pulse-line", title: "Gut-Joint Axis Support", description: "BPC-157 heals gut permeability that drives systemic inflammation and joint pain — addressing root causes, not just symptoms." },
    { icon: "ri-droplet-line", title: "Angiogenesis", description: "Increases blood vessel formation to injury sites, delivering oxygen, nutrients, and growth factors for faster tissue repair." },
    { icon: "ri-first-aid-kit-line", title: "Pain & Inflammation Reduction", description: "Reduces pain and inflammation without suppressing immune function or delaying healing like NSAIDs." },
    { icon: "ri-brain-line", title: "Neurological Support", description: "TB-500 crosses the blood-brain barrier and may support neurological tissue repair and nerve regeneration." },
    { icon: "ri-shield-check-line", title: "Systemic Tissue Repair", description: "Benefits extend beyond injury sites — supports overall tissue health, joint resilience, and recovery capacity." },
  ],
  timeline: [
    { phase: "Days 1–7", title: "Pain & Inflammation Reduction", description: "Many patients notice reduced pain and inflammation within the first week as the peptides begin modulating inflammatory pathways." },
    { phase: "Weeks 2–4", title: "Early Tissue Repair", description: "Initial tissue healing becomes apparent. Acute injuries show noticeable improvement in range of motion and pain levels." },
    { phase: "Weeks 4–8", title: "Structural Healing", description: "Tendons, ligaments, and muscle tissue undergo structural repair. Chronic injuries begin resolving. Strength and function improve." },
    { phase: "Weeks 8–12", title: "Complete Recovery", description: "Most acute injuries are fully healed. Chronic tendinopathies show significant improvement. Athletes return to full training capacity." },
    { phase: "3–6 Months", title: "Long-Term Resilience", description: "Tissue remodeling completes. Healed structures are stronger and more resilient. Reduced risk of re-injury." },
  ],
  faqs: [
    { q: "What makes the Wolverine Stack different from using BPC-157 or TB-500 alone?", a: "BPC-157 and TB-500 work through complementary mechanisms. BPC-157 accelerates healing through the gut-joint axis and promotes blood vessel formation, while TB-500 enhances cell migration to injury sites and stimulates angiogenesis from a different pathway. Together they produce synergistic healing effects — 2–3x faster recovery timelines are commonly reported in sports medicine." },
    { q: "Will the Wolverine Stack help with chronic injuries or only acute ones?", a: "Both. The stack accelerates healing from acute injuries (muscle tears, sprains, post-surgical recovery), but it's also effective for chronic tendinopathies, lingering joint pain, and slow-healing injuries that haven't responded to conventional treatment. Many patients use it to finally resolve nagging injuries that have persisted for months or years." },
    { q: "How quickly will I feel the effects?", a: "Pain and inflammation reduction often occur within days to weeks. Structural tissue healing (tendons, ligaments, muscle) typically requires 4–8 weeks for noticeable improvement, with continued healing through 12 weeks. Timeline varies based on injury severity and location — acute injuries respond faster than chronic degeneration." },
    { q: "Can I use the Wolverine Stack while actively training or should I rest?", a: "You can train, but adjusting intensity based on your injury is recommended. The stack actually enhances recovery from training, so many patients find they can maintain higher training volumes with faster recovery. Your provider will give specific guidance based on your injury type and severity." },
  ],
};

export function WolverineStackPage() { return <PeptideLandingPage data={data} />; }
