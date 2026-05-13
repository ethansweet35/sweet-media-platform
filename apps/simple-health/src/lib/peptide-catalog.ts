import type { PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const I = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images";

// Product vial images — unique per peptide
const IMG = {
  bpc157:         `${I}/sh_bpc157.png`,
  tb500:          `${I}/sh_tb500.png`,
  pt141:          `${I}/sh_pt141.png`,
  semax:          `${I}/sh_semax.png`,
  selank:         `${I}/sh_selank.png`,
  glutathione:    `${I}/sh_glutathione.png`,
  ghrp6:          `${I}/sh_ghrp6.png`,
  igflr3:         `${I}/sh_igflr3.png`,
  aod9604:        `${I}/sh_aod9604.png`,
  ss31:           `${I}/sh_ss31.png`,
  dsip:           `${I}/sh_dsip.png`,
  oxytocin:       `${I}/sh_oxytocin.png`,
  kisspeptin10:   `${I}/sh_kisspeptin10.png`,
  melanotan2:     `${I}/sh_melanotan2.png`,
  thymosinalpha1: `${I}/sh_thymosin_alpha1.png`,
  epithalon:      `${I}/sh_epithalon.png`,
  thymalin:       `${I}/sh_thymalin.png`,
  klow:           `${I}/sh_klow.png`,
  ll37:           `${I}/sh_ll37.png`,
  kvp:            `${I}/sh_kvp.png`,
  slupp332:       `${I}/sh_slupp332.png`,
  adipotide:      `${I}/sh_adipotide.png`,
  pinealon:       `${I}/sh_pinealon.png`,
  ara290:         `${I}/sh_ara290.png`,
  dihexa:         `${I}/sh_dihexa.png`,
  pe2228:         `${I}/sh_pe2228.png`,
  amino1mq:       `${I}/sh_5amino1mq.png`,
};

export const PEPTIDE_CATALOG: Record<string, PeptideLandingData> = {

  // ── Recovery & Healing ──────────────────────────────────────────────

  "bpc-157": {
    slug: "bpc-157", efficacyTier: "Cellular Repair", name: "BPC-157",
    headline: "Body Protective Compound",
    startingPrice: "Starting at $300", delivery: "Daily subcutaneous injection", resultsIn: "Results in 2–4 weeks",
    heroImage: IMG.bpc157,
    description: "A gastric pentadecapeptide with profound healing properties for tendons, ligaments, muscles, gut, and the nervous system. BPC-157 works through the gut-joint axis — healing gut permeability that drives systemic inflammation while accelerating soft tissue repair through angiogenesis.",
    mechanismTitle: "Gut-joint axis healing.",
    mechanismSubtitle: "BPC-157 was originally isolated from gastric juice and works through a unique mechanism that connects gut health to systemic tissue repair.",
    mechanisms: [
      { name: "Angiogenesis", badge: "Blood Vessel Formation", description: "Stimulates formation of new blood vessels to injury sites, dramatically increasing delivery of oxygen, nutrients, and growth factors to damaged tissue for faster repair.", result: "Result: Faster tissue healing through improved blood supply to injury sites" },
      { name: "Gut-Joint Axis", badge: "Systemic Inflammation", description: "Heals intestinal permeability that drives chronic systemic inflammation and joint pain. A leaky gut releases bacterial endotoxins into circulation — BPC-157 seals this pathway, reducing whole-body inflammatory burden.", result: "Result: Reduced systemic inflammation, improved joint function" },
      { name: "Tendon & Ligament Repair", badge: "Structural Healing", description: "Directly accelerates fibroblast migration and proliferation at tendon and ligament injury sites. Clinical observation shows Achilles tendon healing, rotator cuff recovery, and knee ligament repair all accelerated.", result: "Result: 2–3x faster structural healing of tendons and ligaments" },
    ],
    benefits: [
      { icon: "ri-run-line", title: "Accelerated injury healing", description: "Dramatically speeds recovery from tendon, ligament, and muscle injuries — used by elite athletes for its rapid healing properties." },
      { icon: "ri-heart-pulse-line", title: "Gut lining repair", description: "Heals intestinal permeability (leaky gut), reducing systemic inflammation and improving nutrient absorption." },
      { icon: "ri-droplet-line", title: "Angiogenesis", description: "Stimulates new blood vessel formation to injury sites, delivering healing factors directly where needed." },
      { icon: "ri-first-aid-kit-line", title: "Pain & inflammation reduction", description: "Reduces inflammatory mediators without suppressing immune function or delaying the healing process like NSAIDs." },
      { icon: "ri-brain-line", title: "Neuroprotection", description: "Crosses the blood-brain barrier and may support nerve regeneration and protection in neurological injury." },
      { icon: "ri-shield-check-line", title: "No systemic side effects", description: "Unlike NSAIDs and corticosteroids, BPC-157 promotes healing without suppressing immune function or causing GI damage." },
    ],
    timeline: [
      { phase: "Days 3–7", title: "Anti-Inflammatory Effect", description: "Pain and swelling reduction often begins within the first week as BPC-157 modulates inflammatory cytokines." },
      { phase: "Weeks 2–4", title: "Tissue Repair Begins", description: "Angiogenesis and fibroblast proliferation produce early structural healing. Range of motion and pain scores improve." },
      { phase: "Weeks 4–8", title: "Structural Healing", description: "Significant improvement in tendon and ligament integrity. Acute injuries show measurable healing on imaging." },
      { phase: "Weeks 8–12", title: "Complete Recovery", description: "Most acute injuries are fully resolved. Chronic tendinopathies show significant improvement with continued use." },
      { phase: "Long-term", title: "Sustained Resilience", description: "Healed tissue is stronger and more resilient. Gut permeability remains improved, sustaining reduced systemic inflammation." },
    ],
    faqs: [
      { q: "How is BPC-157 different from TB-500?", a: "BPC-157 works primarily through the gut-joint axis and localized angiogenesis — it's particularly effective for GI issues, tendon/ligament repair, and inflammatory conditions. TB-500 works through cell migration and systemic tissue regeneration. They're complementary, which is why the Wolverine Stack combines both for maximum healing effect." },
      { q: "Can BPC-157 help with gut issues like IBS or leaky gut?", a: "Yes. BPC-157 was originally studied for gastrointestinal disorders and has robust evidence for healing intestinal permeability, reducing gut inflammation, and protecting the gut lining. Many patients use it specifically for gut-healing alongside the injury recovery benefits." },
      { q: "How long do I need to use BPC-157?", a: "For acute injuries, a 4–8 week course is typically sufficient. For chronic conditions or gut healing, 8–12 weeks may be needed. Your physician will determine the appropriate course length based on your specific condition and response." },
      { q: "Is BPC-157 FDA-approved?", a: "BPC-157 is not FDA-approved but is used widely in sports medicine and regenerative wellness under physician supervision. It's sourced from 503B-licensed compounding pharmacies with quality testing for sterility and potency." },
    ],
  },

  "tb-500": {
    slug: "tb-500", efficacyTier: "Regenerative Peptide", name: "TB-500",
    headline: "Thymosin Beta-4",
    startingPrice: "Starting at $300", delivery: "Daily subcutaneous injection", resultsIn: "Results in 2–4 weeks",
    heroImage: IMG.tb500,
    description: "A powerful regenerative peptide naturally present in nearly all human cells. TB-500 promotes cell migration to injury sites, stimulates angiogenesis, reduces inflammation, and accelerates repair of muscle, tendon, ligament, skin, and even cardiac and neurological tissue.",
    mechanismTitle: "Cell migration. Systemic regeneration.",
    mechanismSubtitle: "TB-500 (Thymosin Beta-4) is a ubiquitous peptide that regulates actin — the protein responsible for cell structure and movement. By upregulating actin polymerization, it enables cells to migrate rapidly to injury sites.",
    mechanisms: [
      { name: "Cell Migration", badge: "Actin Upregulation", description: "TB-500 promotes actin polymerization, enabling repair cells (fibroblasts, keratinocytes, endothelial cells) to migrate rapidly from circulation to the injury site — bringing the machinery for repair directly where it's needed.", result: "Result: Rapid recruitment of repair cells to injury sites" },
      { name: "Angiogenesis", badge: "New Blood Vessel Formation", description: "Stimulates formation of new blood vessels at injury sites through endothelial cell activation, dramatically improving oxygen and nutrient delivery to healing tissue.", result: "Result: Enhanced perfusion of healing tissue for faster structural repair" },
      { name: "Anti-Fibrotic", badge: "Scar Reduction", description: "Promotes tissue regeneration over scar formation by modulating the inflammatory response and directing repair toward healthy tissue architecture rather than fibrotic scarring.", result: "Result: Better quality tissue healing with less scar formation" },
    ],
    benefits: [
      { icon: "ri-run-line", title: "Rapid injury recovery", description: "Accelerates healing from acute and chronic injuries — muscle tears, tendinopathies, ligament sprains, and post-surgical recovery." },
      { icon: "ri-heart-pulse-line", title: "Cardiac protection", description: "Research shows TB-500 can protect cardiac tissue from ischemic damage and support heart muscle regeneration after injury." },
      { icon: "ri-brain-line", title: "Neurological repair", description: "Crosses the blood-brain barrier and supports neurological tissue repair and nerve regeneration." },
      { icon: "ri-sparkling-2-line", title: "Skin & hair restoration", description: "Promotes hair follicle health, skin wound healing, and connective tissue repair — making it valuable for aesthetic applications." },
      { icon: "ri-shield-check-line", title: "Reduces fibrosis", description: "Promotes healthy tissue regeneration over scar formation, leading to better functional recovery." },
      { icon: "ri-recycle-line", title: "Systemic reach", description: "Unlike locally injected growth factors, TB-500 distributes systemically — addressing injuries throughout the body with a single injection." },
    ],
    timeline: [
      { phase: "Days 1–7", title: "Anti-Inflammatory Phase", description: "Inflammation modulation begins. Many patients notice reduced pain and improved mobility within the first week." },
      { phase: "Weeks 2–3", title: "Cell Migration & Repair", description: "Repair cells migrate to injury sites. New blood vessel formation begins. Early structural healing underway." },
      { phase: "Weeks 4–6", title: "Structural Improvement", description: "Measurable improvement in tissue integrity. Acute injuries show significant healing. Chronic injuries begin resolving." },
      { phase: "Weeks 6–12", title: "Complete Healing", description: "Most acute injuries fully healed. Chronic conditions show substantial improvement. Athletes return to full training." },
      { phase: "Maintenance", title: "Long-Term Resilience", description: "Continued periodic use supports ongoing tissue health and reduces re-injury risk in high-demand athletes." },
    ],
    faqs: [
      { q: "How is TB-500 different from BPC-157?", a: "TB-500 primarily works through cell migration and systemic angiogenesis — it's particularly effective for large-area tissue repair and has unique cardiac and neurological benefits. BPC-157 works through the gut-joint axis and localized angiogenesis, excelling at gut healing and local tendon/ligament repair. Combining both (Wolverine Stack) produces synergistic results." },
      { q: "Is TB-500 safe?", a: "TB-500 has been studied extensively in preclinical models and used in sports medicine for decades. It has an excellent safety profile with no significant adverse effects reported at therapeutic doses. As with all injectable peptides, it should be prescribed and monitored by a physician." },
      { q: "Can TB-500 help with chronic injuries?", a: "Yes. Many patients use TB-500 specifically for chronic tendinopathies, lingering joint issues, and injuries that haven't healed with conventional treatment. Its cell migration and angiogenesis effects can revascularize poorly-healing tissue and restart stalled healing processes." },
      { q: "Do I need to inject at the injury site?", a: "No. TB-500 distributes systemically — subcutaneous injection anywhere (abdomen, thigh, arm) delivers it to the bloodstream where it can reach all tissues. This is one of its advantages over locally injected growth factors." },
    ],
  },

  "kvp": {
    slug: "kvp", efficacyTier: "Anti-Inflammatory Peptide", name: "KPV",
    headline: "Targeted gut & skin inflammation relief",
    startingPrice: "Starting at $295", delivery: "Oral or injectable", resultsIn: "Results in 2–4 weeks",
    heroImage: IMG.kvp,
    description: "A tripeptide derived from alpha-MSH with potent anti-inflammatory properties. KPV directly inhibits inflammatory pathways in gut epithelial cells and skin, making it highly effective for IBD, colitis, skin inflammation, and wound healing.",
    mechanismTitle: "Direct NF-κB inhibition.",
    mechanismSubtitle: "KPV (Lys-Pro-Val) works by penetrating cells and directly inhibiting NF-κB — the master regulator of inflammatory gene expression.",
    mechanisms: [
      { name: "NF-κB Inhibition", badge: "Inflammatory Pathway", description: "Directly penetrates cell membranes and inhibits NF-κB activation — blocking the transcription of dozens of inflammatory cytokines simultaneously at their source.", result: "Result: Comprehensive suppression of inflammatory gene expression" },
      { name: "Gut Epithelial Protection", badge: "Intestinal Barrier", description: "Specifically protects gut epithelial cells from inflammatory damage, reduces colonic inflammation, and promotes healing of the intestinal lining in conditions like IBD and colitis.", result: "Result: Reduced gut inflammation and improved intestinal barrier function" },
      { name: "Wound Healing", badge: "Skin & Tissue", description: "Promotes wound closure and skin healing through anti-inflammatory and regenerative signaling, reducing the inflammatory burden that slows wound healing.", result: "Result: Accelerated wound closure and improved skin healing" },
    ],
    benefits: [
      { icon: "ri-heart-pulse-line", title: "IBD & colitis relief", description: "Reduces gut inflammation in inflammatory bowel disease, Crohn's, and ulcerative colitis through direct NF-κB inhibition." },
      { icon: "ri-shield-check-line", title: "Skin inflammation", description: "Effective for psoriasis, eczema, and other inflammatory skin conditions that have a NF-κB-mediated component." },
      { icon: "ri-first-aid-kit-line", title: "Wound healing", description: "Accelerates wound closure and reduces scarring through anti-inflammatory and regenerative mechanisms." },
      { icon: "ri-recycle-line", title: "Gut barrier support", description: "Protects and repairs the intestinal lining, reducing systemic inflammation from gut permeability." },
      { icon: "ri-leaf-line", title: "Well tolerated", description: "As a naturally occurring tripeptide, KPV is well-tolerated with no significant side effects at therapeutic doses." },
      { icon: "ri-capsule-line", title: "Oral bioavailability", description: "Unlike many peptides, KPV has reasonable oral bioavailability, allowing convenient oral or injectable delivery." },
    ],
    timeline: [
      { phase: "Week 1–2", title: "Inflammation Reduction", description: "NF-κB inhibition begins reducing inflammatory cytokine levels. Gut and skin symptoms start improving." },
      { phase: "Weeks 2–4", title: "Symptom Relief", description: "Significant reduction in IBD symptoms, skin inflammation, and wound discomfort. Tissue healing accelerates." },
      { phase: "Months 1–3", title: "Structural Healing", description: "Gut lining repair completes. Skin lesions resolve. Wound healing finalized with minimal scarring." },
      { phase: "Maintenance", title: "Long-term Control", description: "Periodic use helps maintain remission and prevent flares in chronic inflammatory conditions." },
    ],
    faqs: [
      { q: "What conditions benefit most from KPV?", a: "KPV is most studied and effective for gut inflammatory conditions (IBD, Crohn's, ulcerative colitis, IBS), inflammatory skin conditions (psoriasis, eczema), and wound healing. It can also be used alongside BPC-157 for comprehensive gut healing." },
      { q: "Can KPV be taken orally?", a: "Yes — KPV has demonstrated oral bioavailability, which is unusual for peptides. Oral administration is effective for gut-targeted conditions. Injectable delivery may produce stronger systemic effects." },
      { q: "Is KPV the same as alpha-MSH?", a: "KPV (Lys-Pro-Val) is a tripeptide fragment derived from the C-terminus of alpha-MSH. It retains alpha-MSH's anti-inflammatory properties without the melanocyte-stimulating effects — making it specific to inflammation without pigmentation changes." },
      { q: "Can I combine KPV with BPC-157?", a: "Yes, and many patients do. BPC-157 provides angiogenic and structural healing, while KPV specifically inhibits inflammatory pathways. Together they create a comprehensive gut-healing and anti-inflammatory protocol." },
    ],
  },

  // ── Injectable Support ─────────────────────────────────────────────

  "glutathione": {
    slug: "glutathione", efficacyTier: "Master Antioxidant", name: "Glutathione",
    headline: "The body's primary antioxidant defense",
    startingPrice: "Starting at $265", delivery: "Injectable (IV or subcutaneous)", resultsIn: "Results in 1–4 weeks",
    heroImage: IMG.glutathione,
    description: "Glutathione is the body's most abundant intracellular antioxidant — a tripeptide (glycine, cysteine, glutamic acid) that neutralizes free radicals, supports detoxification, and maintains cellular health. Levels decline with age, illness, and oxidative stress. Injectable replenishment bypasses GI breakdown for direct cellular delivery.",
    mechanismTitle: "Antioxidant. Detox. Immune support.",
    mechanismSubtitle: "Glutathione works at the cellular level as both a direct antioxidant and a cofactor for dozens of enzymatic reactions critical to health.",
    mechanisms: [
      { name: "Free Radical Neutralization", badge: "Antioxidant Defense", description: "Directly neutralizes reactive oxygen species (ROS) and reactive nitrogen species — the free radicals that damage DNA, proteins, and cell membranes. This is the primary anti-aging mechanism at the cellular level.", result: "Result: Reduced oxidative stress and cellular damage" },
      { name: "Detoxification", badge: "Phase II Liver Detox", description: "Essential for Phase II liver detoxification — conjugates with toxins, heavy metals, and drug metabolites to make them water-soluble for excretion. Low glutathione is a primary driver of toxic accumulation.", result: "Result: Enhanced toxin clearance and liver protection" },
      { name: "Immune Modulation", badge: "T-Cell Function", description: "Required for optimal T-cell proliferation and function. Glutathione-deficient immune cells show impaired response to pathogens and cancer cells. Replenishment restores immune surveillance.", result: "Result: Improved immune function and cellular immunity" },
    ],
    benefits: [
      { icon: "ri-shield-check-line", title: "Cellular antioxidant protection", description: "Neutralizes free radicals at the cellular level, protecting DNA, proteins, and membranes from oxidative damage." },
      { icon: "ri-sparkling-2-line", title: "Skin brightening", description: "Inhibits melanin synthesis, producing a visible brightening and evening of skin tone with consistent use." },
      { icon: "ri-recycle-line", title: "Detoxification support", description: "Essential for liver Phase II detox — accelerates elimination of toxins, heavy metals, and pharmaceutical metabolites." },
      { icon: "ri-leaf-line", title: "Immune enhancement", description: "Restores optimal T-cell function and immune surveillance in glutathione-depleted patients." },
      { icon: "ri-brain-line", title: "Neuroprotection", description: "High-dose glutathione shows benefits in Parkinson's disease and other neurodegenerative conditions in research settings." },
      { icon: "ri-flashlight-line", title: "Energy & recovery", description: "Optimized glutathione levels improve mitochondrial efficiency and reduce post-exercise oxidative stress." },
    ],
    timeline: [
      { phase: "Immediately (IV)", title: "Acute Antioxidant Effect", description: "IV glutathione produces immediate antioxidant and energy effects, often noticed within hours." },
      { phase: "Weeks 1–2", title: "Oxidative Stress Reduction", description: "Measurable reduction in oxidative stress markers. Skin begins brightening. Energy improves." },
      { phase: "Weeks 2–4", title: "Detox & Immune Support", description: "Liver detox function improves. Immune cell activity normalizes. Fatigue reduces." },
      { phase: "1–3 Months", title: "Sustained Benefits", description: "Comprehensive antioxidant protection maintained. Skin brightening, immune function, and energy optimized." },
    ],
    faqs: [
      { q: "Why inject glutathione instead of taking oral supplements?", a: "Oral glutathione is largely broken down in the GI tract before absorption. Injectable glutathione delivers the molecule directly into circulation for immediate cellular uptake — producing effects that oral supplements rarely achieve. IV glutathione produces the most rapid effects; subcutaneous offers sustained release." },
      { q: "Will glutathione brighten my skin?", a: "Yes — this is one of its well-documented effects. Glutathione inhibits tyrosinase, the enzyme required for melanin synthesis, producing gradual skin brightening and evening of skin tone with consistent use. Most patients notice visible effects after 4–8 weeks." },
      { q: "Can I combine glutathione with other peptides?", a: "Absolutely. Glutathione pairs well with NAD+ for comprehensive cellular optimization, with vitamin C for enhanced antioxidant effect, and can be included in IV cocktails with other nutrients." },
    ],
  },

  // ── Growth Hormone ─────────────────────────────────────────────────

  "ghrp-6": {
    slug: "ghrp-6", efficacyTier: "GH Secretagogue", name: "GHRP-6",
    headline: "Growth hormone releasing peptide",
    startingPrice: "Starting at $310", delivery: "3x daily subcutaneous injection", resultsIn: "Results in 4–8 weeks",
    heroImage: IMG.ghrp6,
    description: "GHRP-6 (Growth Hormone Releasing Peptide-6) is a potent ghrelin mimetic that stimulates the pituitary gland to release growth hormone through the ghrelin receptor pathway. It produces strong GH pulses and is often stacked with CJC-1295 for dual-receptor GH amplification.",
    mechanismTitle: "Ghrelin receptor activation.",
    mechanismSubtitle: "GHRP-6 mimics ghrelin to trigger strong GH release pulses through the ghrelin (GHS-R1a) receptor — a complementary pathway to GHRH-based secretagogues.",
    mechanisms: [
      { name: "Ghrelin Receptor", badge: "GHS-R1a Agonist", description: "Binds to growth hormone secretagogue receptor (GHS-R1a) — the ghrelin receptor — triggering strong, pulsatile GH release from the anterior pituitary gland independently of the GHRH pathway.", result: "Result: Strong GH pulses through a pathway complementary to CJC-1295" },
      { name: "Appetite Stimulation", badge: "Ghrelin Effect", description: "As a ghrelin mimetic, GHRP-6 stimulates appetite — making it particularly valuable for patients with inadequate caloric intake, muscle wasting, or recovery from illness or surgery.", result: "Result: Increased appetite and improved anabolic state for muscle growth" },
      { name: "IGF-1 Elevation", badge: "Anabolic Cascade", description: "The GH pulses trigger hepatic IGF-1 production — the downstream mediator of GH's anabolic, regenerative, and anti-aging effects on muscle, bone, and connective tissue.", result: "Result: Sustained IGF-1 elevation for muscle growth and tissue repair" },
    ],
    benefits: [
      { icon: "ri-body-scan-line", title: "Strong GH release", description: "Produces powerful GH pulses, particularly when combined with CJC-1295 for dual-pathway amplification." },
      { icon: "ri-seedling-line", title: "Muscle development", description: "Elevated GH and IGF-1 promote lean muscle protein synthesis and improved body composition." },
      { icon: "ri-fire-line", title: "Fat metabolism", description: "GH-mediated lipolysis targets visceral and subcutaneous fat for improved body composition." },
      { icon: "ri-zzz-line", title: "Sleep enhancement", description: "Amplifies the natural nighttime GH surge, improving deep sleep quality and recovery." },
      { icon: "ri-run-line", title: "Recovery acceleration", description: "IGF-1 elevation accelerates recovery from workouts and injuries through enhanced tissue repair." },
      { icon: "ri-restaurant-line", title: "Appetite stimulation", description: "Useful for patients needing increased caloric intake for muscle gain, recovery, or addressing poor appetite." },
    ],
    timeline: [
      { phase: "Weeks 1–2", title: "Sleep & Recovery", description: "Improved sleep depth and exercise recovery typically noticed first as GH pulses increase." },
      { phase: "Weeks 3–6", title: "Energy & Well-Being", description: "Increased energy, reduced brain fog, and improved mood as GH and IGF-1 levels optimize." },
      { phase: "Weeks 6–10", title: "Body Composition", description: "Visible changes in muscle tone and fat reduction, particularly in the midsection." },
      { phase: "3–6 Months", title: "Peak Results", description: "Maximum body recomposition, optimized recovery, and comprehensive anti-aging effects achieved." },
    ],
    faqs: [
      { q: "How does GHRP-6 compare to Ipamorelin?", a: "Both are ghrelin mimetics that trigger GH release through the GHS-R1a receptor. GHRP-6 produces stronger GH pulses but also elevates cortisol and prolactin and stimulates appetite. Ipamorelin is more selective — it produces significant GH release without the cortisol/prolactin effects, making it preferred when those side effects are a concern. GHRP-6 is preferred when appetite stimulation is a goal." },
      { q: "Can GHRP-6 be combined with CJC-1295?", a: "Yes — and this is one of the most effective GH stacks. CJC-1295 activates the GHRH receptor while GHRP-6 activates the ghrelin receptor, producing synergistic GH release that significantly exceeds either peptide alone. This dual-receptor approach is similar to the CJC/Ipamorelin stack but with stronger individual pulses." },
    ],
  },

  "igf-lr3": {
    slug: "igf-lr3", efficacyTier: "Anabolic Growth Factor", name: "IGF-LR3",
    headline: "Insulin-like Growth Factor Long R3",
    startingPrice: "Starting at $300", delivery: "Daily subcutaneous injection", resultsIn: "Results in 2–6 weeks",
    heroImage: IMG.igflr3,
    description: "IGF-LR3 (Insulin-like Growth Factor-1 Long R3) is a modified form of IGF-1 with significantly extended half-life and potency. It directly stimulates muscle cell growth, fat oxidation, and tissue repair — acting downstream of GH to produce anabolic and regenerative effects with greater duration than native IGF-1.",
    mechanismTitle: "Direct anabolic signaling.",
    mechanismSubtitle: "Unlike GH secretagogues that stimulate the pituitary, IGF-LR3 acts directly on IGF-1 receptors throughout the body — bypassing the GH-liver axis for immediate anabolic action.",
    mechanisms: [
      { name: "IGF-1 Receptor Activation", badge: "Direct Anabolic", description: "Binds directly to IGF-1 receptors on muscle cells, triggering protein synthesis, hyperplasia (new cell creation), and hypertrophy (cell size increase) — the fundamental mechanisms of muscle growth.", result: "Result: Direct stimulation of muscle protein synthesis and growth" },
      { name: "Extended Half-Life", badge: "Long R3 Modification", description: "The 'Long R3' modification reduces binding to IGF binding proteins (IGFBPs), extending the active half-life from minutes (native IGF-1) to hours — producing sustained anabolic signaling throughout the day.", result: "Result: Prolonged anabolic signaling from a single daily injection" },
      { name: "Fat Oxidation", badge: "Lipolysis", description: "IGF-LR3 activates adipocyte lipolysis — the breakdown of stored fat for fuel — while simultaneously building lean tissue, producing potent body recomposition effects.", result: "Result: Simultaneous muscle gain and fat loss (body recomposition)" },
    ],
    benefits: [
      { icon: "ri-body-scan-line", title: "Muscle growth & hyperplasia", description: "Directly stimulates new muscle cell creation and growth — one of the few peptides that promotes muscle hyperplasia, not just hypertrophy." },
      { icon: "ri-fire-line", title: "Body recomposition", description: "Simultaneous muscle gain and fat loss — particularly effective during caloric restriction phases." },
      { icon: "ri-run-line", title: "Accelerated recovery", description: "Enhanced tissue repair and reduced recovery time between training sessions." },
      { icon: "ri-first-aid-kit-line", title: "Injury healing", description: "Promotes repair of muscle, connective tissue, and bone through direct IGF-1 receptor stimulation." },
      { icon: "ri-shield-check-line", title: "Neuroprotection", description: "IGF-1 receptors in the brain mediate neuroprotective effects — potentially beneficial for cognitive function." },
      { icon: "ri-seedling-line", title: "Anti-aging", description: "IGF-1 levels decline with age; restoration produces comprehensive anti-aging effects across multiple tissue types." },
    ],
    timeline: [
      { phase: "Weeks 1–2", title: "Recovery Improvement", description: "Faster recovery between training sessions as IGF-1 receptor activation accelerates tissue repair." },
      { phase: "Weeks 2–4", title: "Body Composition Shift", description: "Visible changes in muscle fullness and early fat reduction as anabolic and lipolytic pathways activate." },
      { phase: "Weeks 4–8", title: "Structural Changes", description: "Measurable increases in lean mass. Fat reduction continues. Strength gains accelerate." },
      { phase: "2–4 Months", title: "Peak Results", description: "Maximum body recomposition achieved. Long-term courses may produce permanent muscle fiber hyperplasia." },
    ],
    faqs: [
      { q: "Is IGF-LR3 more powerful than regular IGF-1?", a: "Yes. The Long R3 modification prevents binding to IGF-binding proteins, extending the half-life from approximately 10 minutes (native IGF-1) to 20–30 hours. This produces prolonged IGF-1 receptor activation — roughly 2–3x more potent per dose than native IGF-1." },
      { q: "Can IGF-LR3 cause hypoglycemia?", a: "At therapeutic doses, hypoglycemia is rare. IGF-LR3 has weaker insulin-mimetic activity than native IGF-1, and the doses used in therapeutic protocols are designed to minimize this risk. Your physician will advise on timing (post-workout dosing reduces hypoglycemia risk) and monitor for any concerning effects." },
    ],
  },

  // ── Metabolic Boosters ────────────────────────────────────────────

  "aod-9604": {
    slug: "aod-9604", efficacyTier: "Fat Loss Peptide", name: "AOD-9604",
    headline: "The anti-obesity peptide fragment",
    startingPrice: "Starting at $280", delivery: "Daily subcutaneous injection", resultsIn: "Results in 4–12 weeks",
    heroImage: IMG.aod9604,
    description: "AOD-9604 is a synthetic fragment of human growth hormone (amino acids 176–191) that mimics GH's fat-burning properties without affecting blood sugar or IGF-1 levels. It directly stimulates lipolysis and inhibits lipogenesis through a mechanism independent of the GH receptor.",
    mechanismTitle: "Pure lipolysis. No metabolic disruption.",
    mechanismSubtitle: "AOD-9604 targets fat metabolism specifically — producing the fat-burning benefits of GH without the blood sugar effects that make full GH inappropriate for many patients.",
    mechanisms: [
      { name: "Lipolysis Stimulation", badge: "Fat Oxidation", description: "AOD-9604 activates beta-3 adrenergic receptors in adipose tissue, triggering the breakdown of stored triglycerides into free fatty acids for use as fuel — directly targeting fat stores.", result: "Result: Direct mobilization of stored fat for energy" },
      { name: "Lipogenesis Inhibition", badge: "Fat Storage Prevention", description: "Simultaneously inhibits the creation of new fat from dietary carbohydrates by blocking key enzymatic steps in de novo lipogenesis — preventing fat accumulation while mobilizing existing stores.", result: "Result: Reduced fat storage while existing fat is metabolized" },
      { name: "GH-Independent Action", badge: "Safe Metabolic Profile", description: "Unlike full GH, AOD-9604 does not bind the GH receptor, does not affect IGF-1 levels, and does not impair insulin sensitivity — making it safe for diabetic patients and those concerned about GH side effects.", result: "Result: Fat loss benefits without GH-related metabolic risks" },
    ],
    benefits: [
      { icon: "ri-fire-line", title: "Targeted fat loss", description: "Directly mobilizes stored fat through beta-3 adrenergic activation, targeting visceral and stubborn subcutaneous fat." },
      { icon: "ri-shield-check-line", title: "Metabolically safe", description: "No IGF-1 elevation, no blood sugar effects, no insulin resistance — safe for diabetics and those on GH-sensitive protocols." },
      { icon: "ri-heart-pulse-line", title: "Cardiovascular benefit", description: "Reduced visceral fat produces downstream improvements in insulin sensitivity, lipids, and cardiovascular risk markers." },
      { icon: "ri-recycle-line", title: "Anti-obesity activity", description: "Originally developed as an anti-obesity drug — the FDA has reviewed AOD-9604 as a food additive (GRAS status)." },
      { icon: "ri-body-scan-line", title: "Lean mass preservation", description: "Targets fat specifically without catabolizing lean muscle — ideal for body recomposition protocols." },
      { icon: "ri-links-line", title: "Stacks well", description: "Complements GLP-1 medications, GH secretagogues, and metabolic protocols for comprehensive weight management." },
    ],
    timeline: [
      { phase: "Weeks 1–4", title: "Metabolic Shift", description: "Lipolytic signaling activates. Some patients notice improved energy as fat oxidation increases." },
      { phase: "Weeks 4–8", title: "Visible Fat Loss", description: "Measurable reductions in body fat percentage, particularly in visceral and abdominal areas." },
      { phase: "Weeks 8–12", title: "Significant Recomposition", description: "Substantial fat loss with preserved or improved lean mass. Waist circumference typically decreases." },
      { phase: "3–6 Months", title: "Peak Results", description: "Maximum body recomposition achieved with sustained protocol use." },
    ],
    faqs: [
      { q: "Is AOD-9604 safe for diabetics?", a: "Yes. Unlike full HGH, AOD-9604 does not affect insulin sensitivity or blood glucose levels. It was specifically designed to deliver GH's fat-burning benefits without the metabolic disruption — making it appropriate for patients with diabetes or insulin resistance who cannot use GH." },
      { q: "How does AOD-9604 compare to GLP-1 medications for weight loss?", a: "AOD-9604 and GLP-1 medications work through different mechanisms. GLP-1s reduce appetite and caloric intake. AOD-9604 directly stimulates fat oxidation and prevents fat storage. They're complementary — many patients combine both for enhanced weight management." },
    ],
  },

  "ss-31": {
    slug: "ss-31", efficacyTier: "Mitochondrial Protector", name: "SS-31",
    headline: "Elamipretide — Mitochondrial repair peptide",
    startingPrice: "Starting at $285", delivery: "3–5x weekly subcutaneous injection", resultsIn: "Results in 2–6 weeks",
    heroImage: IMG.ss31,
    description: "SS-31 (Elamipretide) is a cell-permeable tetrapeptide that specifically targets and stabilizes cardiolipin in the inner mitochondrial membrane — restoring mitochondrial structure and function. It's one of the most potent mitochondrial protective agents known, with applications in heart failure, aging, and metabolic disease.",
    mechanismTitle: "Cardiolipin stabilization. Mitochondrial integrity.",
    mechanismSubtitle: "SS-31 directly targets the inner mitochondrial membrane where cardiolipin — the molecule that anchors the electron transport chain — is located. By stabilizing cardiolipin, it prevents the mitochondrial dysfunction that drives cellular aging.",
    mechanisms: [
      { name: "Cardiolipin Stabilization", badge: "Inner Mitochondrial Membrane", description: "SS-31 selectively concentrates in the inner mitochondrial membrane and interacts with cardiolipin, the lipid that anchors cristae structure and maintains the organization of the electron transport chain complexes.", result: "Result: Preserved mitochondrial architecture and electron transport chain efficiency" },
      { name: "ROS Reduction", badge: "Antioxidant at Source", description: "By stabilizing the electron transport chain, SS-31 reduces electron leak and superoxide production — addressing the source of mitochondrial ROS rather than just scavenging downstream.", result: "Result: Reduced mitochondrial oxidative stress at the point of generation" },
      { name: "ATP Restoration", badge: "Cellular Energy", description: "Restored mitochondrial efficiency produces more ATP per unit of substrate — increasing cellular energy availability in energy-depleted tissues like the heart, kidneys, and aging muscle.", result: "Result: Increased cellular energy production in metabolically stressed tissues" },
    ],
    benefits: [
      { icon: "ri-heart-pulse-line", title: "Cardiac protection", description: "Reduces myocardial oxidative stress and preserves mitochondrial function in cardiac tissue — studied in heart failure." },
      { icon: "ri-flashlight-line", title: "Cellular energy restoration", description: "Restores ATP production in energy-compromised tissues, improving cellular function throughout the body." },
      { icon: "ri-shield-check-line", title: "Kidney protection", description: "Protects renal tubular cells from oxidative damage — relevant for patients with metabolic syndrome or medication-induced nephrotoxicity." },
      { icon: "ri-recycle-line", title: "Anti-aging mitochondrial support", description: "Addresses the root mitochondrial dysfunction that drives age-related cellular decline." },
      { icon: "ri-run-line", title: "Exercise performance", description: "Improved mitochondrial efficiency translates to better exercise capacity and faster recovery." },
      { icon: "ri-brain-line", title: "Neuroprotection", description: "Mitochondrial protection in neurons may slow neurodegenerative processes and cognitive decline." },
    ],
    timeline: [
      { phase: "Weeks 1–2", title: "Mitochondrial Stabilization", description: "Cardiolipin stabilization begins. Some patients notice improved energy within the first two weeks." },
      { phase: "Weeks 2–4", title: "Energy & Recovery", description: "Cellular energy production improves. Exercise performance and recovery show measurable gains." },
      { phase: "Weeks 4–8", title: "Systemic Benefits", description: "Comprehensive mitochondrial protection established across all high-demand tissues." },
      { phase: "Ongoing", title: "Sustained Protection", description: "Continued use maintains mitochondrial integrity and provides ongoing protection against age-related decline." },
    ],
    faqs: [
      { q: "What conditions benefit most from SS-31?", a: "SS-31 is most studied for heart failure, ischemia-reperfusion injury, kidney disease, and age-related mitochondrial decline. Clinically, it's used for cardiac support, metabolic optimization in aging patients, kidney protection, and as a component of comprehensive longevity protocols." },
      { q: "Is SS-31 the same as Elamipretide?", a: "Yes. SS-31, Elamipretide, MTP-131, and Bendavia are all names for the same tetrapeptide. It was in Phase 3 clinical trials for heart failure (under the name Elamipretide) and has an extensive safety and pharmacokinetic database." },
    ],
  },

  "5-amino-1mq": {
    slug: "5-amino-1mq", efficacyTier: "Metabolic Optimizer", name: "5-Amino-1MQ",
    headline: "NNMT inhibitor for fat metabolism",
    startingPrice: "Starting at $285", delivery: "Oral daily", resultsIn: "Results in 4–8 weeks",
    heroImage: IMG.amino1mq,
    description: "5-Amino-1MQ is a small molecule that inhibits nicotinamide N-methyltransferase (NNMT) — an enzyme that regulates fat cell metabolism and energy expenditure. By blocking NNMT, it raises NAD+ levels in adipose tissue, activates SIRT1 longevity pathways, and reduces fat storage in a novel mechanism distinct from GLP-1 and stimulants.",
    mechanismTitle: "NNMT inhibition. Adipose NAD+ elevation.",
    mechanisms: [
      { name: "NNMT Inhibition", badge: "Fat Cell Enzyme", description: "Blocks NNMT, an enzyme that consumes NAD+ and methyl groups in fat cells. High NNMT activity is associated with obesity and metabolic dysfunction; inhibiting it restores cellular metabolic balance.", result: "Result: Improved fat cell metabolism and reduced fat storage" },
      { name: "NAD+ Elevation", badge: "Cellular Energy", description: "By blocking NNMT-driven NAD+ consumption in adipose tissue, 5-Amino-1MQ raises local NAD+ levels — activating SIRT1 and AMPK pathways that promote fat oxidation and metabolic health.", result: "Result: Activated longevity pathways in adipose tissue" },
      { name: "Adipogenesis Inhibition", badge: "Fat Cell Formation", description: "Reduces the differentiation of pre-adipocytes into mature fat cells, limiting fat tissue expansion at the cellular level.", result: "Result: Reduced formation of new fat cells" },
    ],
    benefits: [
      { icon: "ri-fire-line", title: "Novel fat metabolism", description: "Works through a completely different mechanism than GLP-1 drugs or stimulants — targeting the metabolic enzyme in fat cells directly." },
      { icon: "ri-flashlight-line", title: "NAD+ & SIRT1 activation", description: "Elevates NAD+ in adipose tissue, activating longevity-associated sirtuin pathways for metabolic health." },
      { icon: "ri-capsule-line", title: "Oral delivery", description: "Convenient once-daily oral dosing — no injections required." },
      { icon: "ri-links-line", title: "Complements GLP-1 protocols", description: "Distinct mechanism makes it a powerful complement to GLP-1 medications and other metabolic therapies." },
      { icon: "ri-body-scan-line", title: "Body recomposition", description: "Reduces fat mass while supporting lean tissue preservation through SIRT1-mediated metabolic improvements." },
      { icon: "ri-shield-check-line", title: "Well tolerated", description: "Small molecule with good safety profile at therapeutic doses in clinical research." },
    ],
    timeline: [
      { phase: "Weeks 1–4", title: "Metabolic Shift", description: "NNMT inhibition begins altering fat cell metabolism. Some patients notice early energy changes." },
      { phase: "Weeks 4–8", title: "Visible Fat Loss", description: "Body composition improvements become apparent. Synergistic effects with diet and exercise amplified." },
      { phase: "2–4 Months", title: "Peak Recomposition", description: "Maximum fat loss and metabolic optimization with consistent use." },
    ],
    faqs: [
      { q: "How is 5-Amino-1MQ different from GLP-1 medications?", a: "GLP-1 medications reduce appetite and caloric intake. 5-Amino-1MQ works directly at the fat cell level — inhibiting NNMT, elevating NAD+, and improving fat cell metabolism without affecting appetite or gut function. The mechanisms are completely different and complementary." },
    ],
  },

  // ── Cognitive & Neuro ─────────────────────────────────────────────

  "semax": {
    slug: "semax", efficacyTier: "Cognitive Enhancer", name: "Semax",
    headline: "Neuropeptide for brain optimization",
    startingPrice: "Starting at $295", delivery: "Intranasal or injectable", resultsIn: "Results in 1–2 weeks",
    heroImage: IMG.semax,
    description: "Semax is a synthetic heptapeptide analogue of ACTH(4–10) developed in Russia for neurological protection and cognitive enhancement. It increases BDNF (brain-derived neurotrophic factor), enhances dopaminergic and serotonergic signaling, and produces reliable improvements in focus, memory, and executive function.",
    mechanismTitle: "BDNF elevation. Neurotransmitter optimization.",
    mechanisms: [
      { name: "BDNF Upregulation", badge: "Neuroplasticity", description: "Dramatically increases BDNF (brain-derived neurotrophic factor) — the primary growth factor for neurons. BDNF supports synaptic plasticity, new neuron formation (neurogenesis), and protection of existing neurons from damage.", result: "Result: Enhanced neuroplasticity and long-term cognitive improvement" },
      { name: "Dopamine & Serotonin", badge: "Neurotransmitter Modulation", description: "Increases synthesis and sensitivity of dopamine and serotonin systems — improving motivation, focus, mood stability, and the ability to enter and sustain flow states.", result: "Result: Improved motivation, focus, and mood without stimulant side effects" },
      { name: "Neuroprotection", badge: "Oxidative Stress Defense", description: "Protects neurons from oxidative stress, ischemia, and inflammatory damage. Originally developed for stroke rehabilitation, it's now used for cognitive optimization in healthy patients.", result: "Result: Protection of existing neural tissue from damage and aging" },
    ],
    benefits: [
      { icon: "ri-brain-line", title: "Enhanced focus & cognition", description: "Clinically demonstrated improvements in attention, working memory, and processing speed." },
      { icon: "ri-seedling-line", title: "BDNF & neuroplasticity", description: "Dramatically elevates BDNF, the brain's primary growth factor, supporting long-term neural health and learning." },
      { icon: "ri-shield-check-line", title: "Neuroprotection", description: "Originally developed for stroke rehabilitation — protects neurons from ischemia, oxidative stress, and inflammatory damage." },
      { icon: "ri-mental-health-line", title: "Mood & motivation", description: "Enhances dopaminergic and serotonergic systems, improving mood stability and motivation without stimulant effects." },
      { icon: "ri-leaf-line", title: "Well tolerated", description: "Long clinical history in Russia with a well-established safety profile and no significant adverse effects at therapeutic doses." },
      { icon: "ri-capsule-line", title: "Intranasal delivery", description: "Nasal spray delivery allows direct access to the brain via the olfactory mucosa — rapid onset with no injections." },
    ],
    timeline: [
      { phase: "Days 1–7", title: "Acute Cognitive Effects", description: "Many patients notice improved focus and mental clarity within the first few days, particularly with intranasal delivery." },
      { phase: "Weeks 1–4", title: "BDNF Elevation", description: "BDNF levels rise, supporting neuroplasticity. Memory and processing speed begin improving measurably." },
      { phase: "Weeks 4–12", title: "Structural Cognitive Gains", description: "Long-term neuroplastic changes produce durable improvements in cognitive function and mental performance." },
      { phase: "Ongoing", title: "Neuroprotective Maintenance", description: "Continued use provides sustained neuroprotection and cognitive optimization." },
    ],
    faqs: [
      { q: "Is Semax a stimulant?", a: "No. Semax works through BDNF and neurotransmitter modulation — not through stimulant pathways like caffeine or amphetamines. It produces clear-headed focus and improved cognition without the anxiety, jitteriness, or crash associated with stimulants. It's suitable for daily use without tolerance development." },
      { q: "How does Semax compare to Selank?", a: "Semax is primarily activating and cognitive-enhancing — it improves focus, energy, and motivation. Selank is more anxiolytic and mood-stabilizing. Some patients cycle both for comprehensive cognitive and emotional optimization." },
    ],
  },

  "selank": {
    slug: "selank", efficacyTier: "Anxiolytic Peptide", name: "Selank",
    headline: "Anti-anxiety neuropeptide",
    startingPrice: "Starting at $295", delivery: "Intranasal or injectable", resultsIn: "Results in 1–2 weeks",
    heroImage: IMG.selank,
    description: "Selank is a synthetic analogue of tuftsin — an immunomodulatory tetrapeptide — with potent anxiolytic and nootropic properties. Developed in Russia as a treatment for anxiety, it works through GABA-A modulation and BDNF elevation, producing calm focus without sedation or dependence.",
    mechanismTitle: "GABA modulation. Anxiolytic focus.",
    mechanisms: [
      { name: "GABA-A Modulation", badge: "Anxiolytic Pathway", description: "Modulates GABA-A receptor sensitivity — the same pathway as benzodiazepines — but without the sedation, memory impairment, or addiction risk. Produces calm, focused anxiety relief.", result: "Result: Reduced anxiety without sedation or cognitive impairment" },
      { name: "BDNF Elevation", badge: "Neuroplasticity", description: "Like Semax, Selank elevates BDNF — supporting neuroplasticity and cognitive enhancement alongside its anxiolytic effects.", result: "Result: Improved memory and learning alongside anxiety reduction" },
      { name: "Enkephalin Protection", badge: "Mood Stability", description: "Inhibits enkephalin-degrading enzymes, extending the duration of natural opioid peptides that regulate mood and stress response.", result: "Result: Enhanced mood stability and stress resilience" },
    ],
    benefits: [
      { icon: "ri-mental-health-line", title: "Anxiety relief without sedation", description: "Reduces anxiety and stress through GABA modulation — without the sedation, fog, or addiction risk of benzodiazepines." },
      { icon: "ri-brain-line", title: "Cognitive enhancement", description: "Improves memory, learning, and mental clarity alongside anxiolytic effects — rare for anxiolytics." },
      { icon: "ri-zzz-line", title: "Sleep quality", description: "Reduces anxiety-driven sleep disruption, improving sleep onset and quality without causing daytime sedation." },
      { icon: "ri-shield-check-line", title: "Immune modulation", description: "Derived from tuftsin — an immunomodulatory peptide — Selank supports healthy immune function." },
      { icon: "ri-leaf-line", title: "No dependence", description: "Unlike benzodiazepines, Selank produces no physical dependence, tolerance, or withdrawal — can be used long-term." },
      { icon: "ri-capsule-line", title: "Intranasal delivery", description: "Nasal spray for rapid onset — suitable for as-needed use before stressful events or daily as a maintenance protocol." },
    ],
    timeline: [
      { phase: "Within hours (acute)", title: "Anxiolytic Effect", description: "Acute anxiety reduction often noticed within 30–60 minutes of intranasal administration." },
      { phase: "Days 3–7", title: "Mood Stabilization", description: "Baseline anxiety levels reduce with daily use. Sleep quality begins improving." },
      { phase: "Weeks 2–4", title: "Cognitive Benefits", description: "BDNF-mediated cognitive improvements become apparent alongside sustained anxiolytic effect." },
      { phase: "Ongoing", title: "Sustained Benefit", description: "No tolerance development — effects maintain with consistent use." },
    ],
    faqs: [
      { q: "Can Selank replace benzodiazepines?", a: "Selank works through a similar pathway (GABA modulation) without the risks of benzos. However, if you're currently taking benzodiazepines, transitioning should be done under physician supervision — do not stop benzos abruptly. Selank is appropriate as an initial treatment for anxiety or as part of a benzodiazepine tapering protocol under medical supervision." },
      { q: "How is Selank different from Semax?", a: "Semax is primarily activating and cognitive-enhancing. Selank is primarily anxiolytic and calming with secondary cognitive benefits. Some patients use Semax in the morning for focus and energy, and Selank in the evening for anxiety relief and sleep quality." },
    ],
  },

  "dsip": {
    slug: "dsip", efficacyTier: "Sleep Peptide", name: "DSIP",
    headline: "Delta sleep-inducing peptide",
    startingPrice: "Starting at $280", delivery: "Injectable, taken before sleep", resultsIn: "Results in 1 week",
    heroImage: IMG.dsip,
    description: "DSIP (Delta Sleep-Inducing Peptide) is a naturally occurring neuropeptide that promotes slow-wave (delta) sleep — the deep, restorative phase critical for GH release, memory consolidation, immune function, and cellular repair. It also shows effects on stress hormones and LH release.",
    mechanismTitle: "Delta wave induction. Sleep architecture repair.",
    mechanisms: [
      { name: "Delta Wave Enhancement", badge: "Slow-Wave Sleep", description: "Promotes deep slow-wave (delta) sleep by modulating hypothalamic sleep centers — increasing the proportion of time spent in the most restorative sleep stage.", result: "Result: More time in deep sleep for maximum recovery" },
      { name: "Stress Hormone Reduction", badge: "HPA Axis Modulation", description: "Reduces ACTH and cortisol levels, attenuating the stress response that disrupts sleep. Also modulates basal ACTH release for normalized circadian cortisol rhythm.", result: "Result: Reduced nighttime cortisol and improved sleep-wake regulation" },
      { name: "GH & LH Release", badge: "Hormonal Optimization", description: "The natural GH pulse during delta sleep is amplified — as DSIP increases delta sleep duration, more GH is released. Also has direct effects on LH secretion.", result: "Result: Enhanced natural GH and LH release during sleep" },
    ],
    benefits: [
      { icon: "ri-zzz-line", title: "Deep sleep enhancement", description: "Increases slow-wave sleep proportion — the phase responsible for physical recovery, memory consolidation, and GH release." },
      { icon: "ri-heart-pulse-line", title: "Stress & cortisol reduction", description: "Attenuates HPA axis overactivation and reduces nighttime cortisol levels that disrupt sleep." },
      { icon: "ri-flashlight-line", title: "Enhanced GH release", description: "More delta sleep means more natural GH release — amplifying recovery and anabolic benefits." },
      { icon: "ri-brain-line", title: "Memory consolidation", description: "Deep sleep is when procedural and declarative memories are consolidated — improved delta sleep means better learning retention." },
      { icon: "ri-shield-check-line", title: "Immune restoration", description: "Deep sleep is the primary window for immune system repair and memory formation." },
      { icon: "ri-leaf-line", title: "Non-habit forming", description: "Unlike pharmaceutical sleep aids, DSIP promotes natural sleep architecture without sedation or dependence." },
    ],
    timeline: [
      { phase: "Night 1–3", title: "Initial Sleep Improvement", description: "Many patients notice deeper sleep within the first few administrations, particularly reduction in nighttime waking." },
      { phase: "Week 1–2", title: "Sleep Architecture Restoration", description: "Delta wave duration increases measurably. Morning recovery feeling improves significantly." },
      { phase: "Weeks 2–4", title: "Downstream Benefits", description: "GH pulse amplitude increases with improved delta sleep. Energy, recovery, and cognitive performance improve." },
      { phase: "Ongoing", title: "Sustained Sleep Quality", description: "Continued use maintains improved sleep architecture and associated hormonal optimization." },
    ],
    faqs: [
      { q: "Is DSIP sedating during the day?", a: "No. DSIP is not a sedative — it specifically promotes delta sleep when taken before bed at night. It doesn't cause daytime drowsiness and can be taken periodically rather than nightly." },
      { q: "How does DSIP compare to melatonin or pharmaceutical sleep aids?", a: "Melatonin regulates circadian rhythm and sleep onset. Pharmaceutical sleep aids (benzodiazepines, z-drugs) cause sedation but often suppress delta sleep. DSIP specifically enhances delta sleep architecture — producing deeper, more restorative sleep without suppressing sleep stages or causing dependence." },
    ],
  },

  "pt-141": {
    slug: "pt-141", efficacyTier: "Hormonal Peptide", name: "PT-141",
    headline: "Bremelanotide — Sexual health peptide",
    startingPrice: "Starting at $295", delivery: "Subcutaneous injection or intranasal", resultsIn: "Results in 30–60 min (acute)",
    heroImage: IMG.pt141,
    description: "PT-141 (Bremelanotide) is an FDA-approved melanocortin receptor agonist that activates central nervous system pathways regulating sexual arousal in both men and women. Unlike PDE5 inhibitors (Viagra, Cialis), PT-141 works through the brain — effective regardless of hormonal status or vascular health.",
    mechanismTitle: "Central nervous system sexual activation.",
    mechanismSubtitle: "PT-141 activates MC3R and MC4R receptors in the hypothalamus — directly stimulating sexual arousal through the brain's own reward and desire pathways.",
    mechanisms: [
      { name: "MC3R / MC4R Activation", badge: "Melanocortin Receptors", description: "Activates melanocortin 3 and 4 receptors in the hypothalamus — directly stimulating the dopaminergic pathways that mediate sexual desire and arousal. This central mechanism works regardless of hormonal status or vascular function.", result: "Result: Direct CNS-mediated enhancement of sexual desire and arousal" },
      { name: "Dopamine Release", badge: "Reward Pathway", description: "MC4R activation triggers dopamine release in reward circuits, producing genuine increases in sexual motivation rather than just mechanical enhancement.", result: "Result: Increased sexual motivation and desire in both men and women" },
      { name: "Peripheral Effects", badge: "Erectile & Arousal Function", description: "In men, MC4R activation also promotes penile erection through a pathway independent of PDE5. In women, vaginal engorgement and clitoral sensitivity increase. Works in patients unresponsive to PDE5 inhibitors.", result: "Result: Effective for both men and women, including PDE5 non-responders" },
    ],
    benefits: [
      { icon: "ri-heart-pulse-line", title: "Increases sexual desire", description: "FDA-approved for hypoactive sexual desire disorder (HSDD) in premenopausal women — the first medication of its kind." },
      { icon: "ri-men-line", title: "Erectile dysfunction", description: "Effective for men with ED, particularly those with psychological or central components, or PDE5 inhibitor non-responders." },
      { icon: "ri-shield-check-line", title: "Works for men and women", description: "Unique CNS mechanism makes it effective for both sexes — one of the few sexual health medications validated in women." },
      { icon: "ri-links-line", title: "Vascular independence", description: "Works through the brain, not blood flow — effective even with vascular or hormonal factors that limit PDE5 inhibitors." },
      { icon: "ri-flashlight-line", title: "Rapid onset", description: "Effects typically begin 30–60 minutes after administration, lasting several hours." },
      { icon: "ri-leaf-line", title: "FDA clearance", description: "Approved as Vyleesi (bremelanotide) by the FDA for HSDD, providing an established safety database." },
    ],
    timeline: [
      { phase: "30–60 minutes", title: "Acute Sexual Arousal", description: "Onset of central and peripheral sexual arousal effects, typically peaking within 1–2 hours." },
      { phase: "2–8 hours", title: "Duration of Effect", description: "Effects last several hours — taken approximately 45 minutes before anticipated sexual activity." },
    ],
    faqs: [
      { q: "How is PT-141 different from Viagra or Cialis?", a: "PDE5 inhibitors (Viagra, Cialis) work on blood vessels — they improve blood flow to genital tissue but don't affect sexual desire. PT-141 works in the brain — it activates the dopaminergic pathways that generate sexual motivation and desire. PT-141 is effective for both men and women, and works in patients where PDE5 inhibitors have failed." },
      { q: "Is PT-141 safe for women?", a: "Yes — it was specifically developed and FDA-approved for women (as Vyleesi for HSDD in premenopausal women). The safety profile has been established in clinical trials. Common side effects include transient nausea and flushing, which typically resolve within 1–2 hours." },
      { q: "Can PT-141 be combined with Oxytocin?", a: "Yes — the PT-141/Oxytocin combination is a popular protocol. PT-141 enhances arousal and desire through melanocortin pathways; Oxytocin enhances emotional connection, intimacy, and pleasure through oxytocin receptors. Together they address both the physiological and emotional dimensions of sexual health." },
    ],
  },

  "oxytocin": {
    slug: "oxytocin", efficacyTier: "Bonding Hormone", name: "Oxytocin",
    headline: "The connection and intimacy peptide",
    startingPrice: "Starting at $305", delivery: "Intranasal or subcutaneous", resultsIn: "Results in minutes (acute)",
    heroImage: IMG.oxytocin,
    description: "Oxytocin is the naturally occurring 'bonding hormone' released during touch, intimacy, and social connection. Exogenous oxytocin enhances emotional bonding, reduces social anxiety, increases trust, and improves the quality of intimate experiences — with applications ranging from sexual health to stress reduction and relationship quality.",
    mechanismTitle: "Central oxytocin receptor activation.",
    mechanisms: [
      { name: "Oxytocin Receptors", badge: "Social Bonding", description: "Activates oxytocin receptors throughout the brain's limbic system — enhancing feelings of emotional connection, trust, warmth, and social reward.", result: "Result: Enhanced emotional bonding and social connection" },
      { name: "Anxiety Reduction", badge: "Amygdala Modulation", description: "Inhibits the amygdala's fear and anxiety response, reducing social anxiety and enabling deeper emotional openness and vulnerability.", result: "Result: Reduced social anxiety and increased emotional openness" },
      { name: "Intimacy Enhancement", badge: "Sexual Experience", description: "Enhances the pleasure and emotional depth of intimate experiences by modulating reward circuits and emotional processing during physical contact.", result: "Result: Improved intimacy quality and emotional satisfaction" },
    ],
    benefits: [
      { icon: "ri-heart-pulse-line", title: "Enhanced emotional bonding", description: "Deepens emotional connection and intimacy in relationships through central oxytocin receptor activation." },
      { icon: "ri-mental-health-line", title: "Social anxiety reduction", description: "Reduces amygdala-driven social anxiety, enabling more open and authentic social interactions." },
      { icon: "ri-shield-check-line", title: "Stress reduction", description: "Activates calming pathways that reduce cortisol and sympathetic nervous system activation." },
      { icon: "ri-sparkling-2-line", title: "Intimacy quality", description: "Enhances the emotional and sensory quality of intimate experiences — commonly combined with PT-141." },
      { icon: "ri-brain-line", title: "Trust & pro-social behavior", description: "Research demonstrates increased trust, generosity, and cooperative behavior with oxytocin administration." },
      { icon: "ri-leaf-line", title: "Natural compound", description: "Oxytocin is your body's own bonding hormone — exogenous administration simply elevates what's naturally present." },
    ],
    timeline: [
      { phase: "Minutes (intranasal)", title: "Acute Effect", description: "Intranasal oxytocin reaches the brain within minutes, producing rapid onset of bonding and calming effects." },
      { phase: "30–60 min", title: "Peak Effect", description: "Peak emotional and anxiolytic effects typically occur 30–60 minutes after intranasal administration." },
    ],
    faqs: [
      { q: "Can oxytocin be combined with PT-141?", a: "Yes — the combination is commonly prescribed. PT-141 activates sexual desire and arousal through melanocortin receptors; Oxytocin enhances emotional connection and intimacy through oxytocin receptors. Together they address both physiological arousal and emotional depth for a comprehensive sexual health protocol." },
      { q: "Is oxytocin safe for regular use?", a: "At therapeutic intranasal doses, oxytocin has an excellent safety profile. It's naturally produced by your hypothalamus and is well-studied in clinical settings. There's no evidence of dependence or significant adverse effects with intranasal use at prescribed doses." },
    ],
  },

  "kisspeptin-10": {
    slug: "kisspeptin-10", efficacyTier: "Hormonal Regulator", name: "Kisspeptin-10",
    headline: "The master reproductive hormone activator",
    startingPrice: "Starting at $295", delivery: "Subcutaneous injection", resultsIn: "Results in 1–4 weeks",
    heroImage: IMG.kisspeptin10,
    description: "Kisspeptin-10 is the most potent known activator of the hypothalamic-pituitary-gonadal (HPG) axis. It directly stimulates GnRH release, which drives LH and FSH production, which then stimulate testosterone and estrogen production. Used to restore natural hormonal function and fertility in both men and women.",
    mechanismTitle: "HPG axis master regulator.",
    mechanisms: [
      { name: "GnRH Pulse Activation", badge: "Hypothalamic", description: "Kisspeptin neurons in the hypothalamus directly control GnRH pulse frequency and amplitude — the pacemaker of the entire reproductive hormone cascade. Kisspeptin-10 activates this upstream master switch.", result: "Result: Restored GnRH pulsatility driving LH, FSH, and gonadal hormone production" },
      { name: "LH & FSH Surge", badge: "Pituitary Response", description: "GnRH pulses trigger pituitary release of LH and FSH — the hormones that signal the gonads to produce testosterone (men) and estrogen/progesterone (women).", result: "Result: Increased LH and FSH driving natural testosterone or estrogen production" },
      { name: "Sexual Arousal", badge: "CNS Effects", description: "Kisspeptin has direct effects on the brain's sexual arousal centers, independent of its hormonal effects — increasing sexual motivation and responsiveness.", result: "Result: Enhanced sexual arousal through both hormonal and CNS pathways" },
    ],
    benefits: [
      { icon: "ri-heart-pulse-line", title: "Testosterone restoration", description: "Stimulates the natural HPG axis to restore testosterone production — without suppressing the axis like exogenous TRT." },
      { icon: "ri-seedling-line", title: "Fertility support", description: "Used clinically to restore fertility in hypogonadotropic hypogonadism and support sperm production." },
      { icon: "ri-sparkling-2-line", title: "Sexual desire & function", description: "Direct CNS effects on sexual arousal centers independent of hormonal changes." },
      { icon: "ri-shield-check-line", title: "Natural hormone optimization", description: "Restores the body's own hormone production rather than replacing it externally." },
      { icon: "ri-body-scan-line", title: "Body composition", description: "Restored testosterone levels improve muscle mass, fat distribution, energy, and recovery." },
      { icon: "ri-brain-line", title: "Mood & cognitive function", description: "Optimized sex hormones produce comprehensive improvements in mood, motivation, and cognition." },
    ],
    timeline: [
      { phase: "Days 1–7", title: "Hormonal Signal", description: "GnRH pulses increase, stimulating pituitary LH and FSH release." },
      { phase: "Weeks 1–4", title: "Testosterone Rise", description: "LH stimulation of Leydig cells increases testosterone production. Labs typically show measurable elevation within 2–4 weeks." },
      { phase: "Months 1–3", title: "Full Hormonal Optimization", description: "Complete HPG axis restoration with stable elevated testosterone or estrogen levels." },
    ],
    faqs: [
      { q: "How is Kisspeptin different from TRT?", a: "TRT (testosterone replacement therapy) provides exogenous testosterone, which suppresses the HPG axis and can reduce fertility. Kisspeptin-10 activates the body's own hormonal axis, stimulating natural testosterone production — maintaining fertility and avoiding axis suppression. It's ideal for patients with secondary hypogonadism or those who want testosterone optimization without fertility compromise." },
    ],
  },

  "melanotan-ii": {
    slug: "melanotan-ii", efficacyTier: "Melanocortin Peptide", name: "Melanotan II",
    headline: "Tanning peptide and sexual health support",
    startingPrice: "Starting at $295", delivery: "Subcutaneous injection", resultsIn: "Results in 1–2 weeks",
    heroImage: IMG.melanotan2,
    description: "Melanotan II is a synthetic analogue of alpha-melanocyte stimulating hormone (α-MSH) that stimulates melanogenesis (tanning), enhances sexual function, and reduces appetite. It activates multiple melanocortin receptors for a range of physiological effects.",
    mechanismTitle: "Melanocortin receptor activation.",
    mechanisms: [
      { name: "MC1R — Melanogenesis", badge: "Tanning Effect", description: "Activates MC1R on melanocytes, stimulating production of eumelanin (brown/black pigment) — producing a natural-looking tan that provides UV protection without sun exposure.", result: "Result: Increased melanin production for natural tanning and UV protection" },
      { name: "MC3R/MC4R — Sexual Function", badge: "Arousal Effect", description: "Like PT-141 (which is its metabolite), activates MC3R and MC4R in the hypothalamus to enhance sexual arousal and desire in both men and women.", result: "Result: Enhanced sexual desire and erectile/arousal function" },
      { name: "MC4R — Appetite", badge: "Metabolic Effect", description: "MC4R activation in the hypothalamus reduces appetite signals — producing weight management benefits alongside the cosmetic and sexual effects.", result: "Result: Reduced appetite for additional metabolic benefit" },
    ],
    benefits: [
      { icon: "ri-sun-line", title: "Natural-looking tan", description: "Stimulates melanin production for a deep, natural-looking tan without UV exposure risk." },
      { icon: "ri-shield-check-line", title: "UV photoprotection", description: "Increased melanin provides natural UV protection, reducing sunburn risk and photoaging." },
      { icon: "ri-heart-pulse-line", title: "Sexual function", description: "Same MC4R pathway as PT-141 — enhances sexual arousal and desire in men and women." },
      { icon: "ri-fire-line", title: "Appetite reduction", description: "MC4R activation reduces appetite, supporting weight management goals." },
      { icon: "ri-sparkling-2-line", title: "Aesthetic benefits", description: "Improved skin pigmentation, reduced UV damage, and cosmetic tanning without sun beds." },
    ],
    timeline: [
      { phase: "Days 3–7", title: "Initial Tanning", description: "First signs of melanin production and tanning, especially with any UV exposure during the loading phase." },
      { phase: "Weeks 1–3", title: "Progressive Color Development", description: "Tan deepens progressively. Sexual effects typically noticed within 1–2 weeks." },
      { phase: "Weeks 3–6", title: "Peak Tan", description: "Maximum melanin saturation achieved. Tan maintained with lower maintenance doses." },
    ],
    faqs: [
      { q: "Is Melanotan II the same as PT-141?", a: "PT-141 (bremelanotide) is actually a metabolite of Melanotan II, specifically designed to retain the sexual function effects without the full tanning and appetite effects. Melanotan II produces a broader range of effects — tanning, sexual enhancement, and appetite reduction — while PT-141 is more targeted." },
      { q: "Does Melanotan II cause nausea?", a: "Nausea is the most common side effect, particularly with higher doses during the loading phase. Starting with lower doses and titrating up minimizes this. Anti-nausea medication can be used if needed. Most patients develop tolerance to the nausea within 2–4 weeks." },
    ],
  },

  // ── Anti-Aging / Cellular ────────────────────────────────────────

  "thymosin-alpha-1": {
    slug: "thymosin-alpha-1", efficacyTier: "Immune Modulator", name: "Thymosin Alpha-1",
    headline: "Immune system optimization peptide",
    startingPrice: "Starting at $295", delivery: "Subcutaneous injection", resultsIn: "Results in 2–4 weeks",
    heroImage: IMG.thymosinalpha1,
    description: "Thymosin Alpha-1 (Tα1) is a naturally occurring 28-amino-acid peptide produced by the thymus gland that regulates and enhances immune function. It activates T-cells, dendritic cells, and NK cells — used clinically in oncology, infectious disease, and as part of longevity protocols for immune optimization in aging patients.",
    mechanismTitle: "Thymic immune restoration.",
    mechanisms: [
      { name: "T-Cell Activation", badge: "Adaptive Immunity", description: "Increases T-helper cell (CD4+) and cytotoxic T-cell (CD8+) activity, restoring cellular immune surveillance that declines with age and immune suppression.", result: "Result: Restored T-cell function and adaptive immune capacity" },
      { name: "Dendritic Cell Maturation", badge: "Innate Immunity", description: "Promotes maturation of dendritic cells — the sentinels that detect pathogens and coordinate immune responses. Improves the quality of both innate and adaptive immune responses.", result: "Result: Enhanced pathogen detection and coordinated immune response" },
      { name: "NK Cell Enhancement", badge: "Cancer Surveillance", description: "Increases natural killer (NK) cell activity — the immune system's primary defense against cancer cells and viral infections. NK cell decline with age is a major driver of increased cancer risk.", result: "Result: Enhanced immune surveillance against cancer cells and viruses" },
    ],
    benefits: [
      { icon: "ri-shield-check-line", title: "Immune system restoration", description: "Restores T-cell function and adaptive immunity that declines with age, illness, or immune suppression." },
      { icon: "ri-leaf-line", title: "Infection protection", description: "Enhanced NK cell and T-cell activity improves resistance to viral infections, including chronic viral conditions." },
      { icon: "ri-recycle-line", title: "Cancer immune surveillance", description: "NK cell activation increases detection and elimination of cancer cells — particularly valuable in longevity protocols." },
      { icon: "ri-brain-line", title: "Anti-inflammatory regulation", description: "Modulates inflammatory cytokines, reducing chronic low-grade inflammation associated with aging and metabolic disease." },
      { icon: "ri-sparkles-line", title: "Vaccine response", description: "Clinical data shows Tα1 improves vaccine efficacy in immunocompromised patients and the elderly." },
      { icon: "ri-medal-line", title: "Approved globally", description: "Approved in 35+ countries for hepatitis B, hepatitis C, and as an adjunct to cancer treatment." },
    ],
    timeline: [
      { phase: "Weeks 1–2", title: "T-Cell Activation", description: "T-cell and NK cell counts begin rising. Some patients notice improved energy and reduced frequency of minor illnesses." },
      { phase: "Weeks 2–6", title: "Immune Restoration", description: "Adaptive immune function progressively restored. Inflammatory markers begin normalizing." },
      { phase: "2–6 Months", title: "Comprehensive Immune Optimization", description: "Full immune system restoration including T-helper/cytotoxic cell balance, NK cell activity, and dendritic cell function." },
      { phase: "Maintenance", title: "Sustained Immune Health", description: "Periodic use maintains immune optimization, particularly in aging patients or those with chronic immune challenges." },
    ],
    faqs: [
      { q: "Who benefits most from Thymosin Alpha-1?", a: "Patients over 40 with declining immune function, those with chronic viral infections (Lyme, EBV, HCV), cancer patients or survivors, immunocompromised individuals, and those seeking comprehensive longevity protocols. It's particularly valuable in aging where thymic involution reduces natural Tα1 production." },
      { q: "Can Thymosin Alpha-1 treat cancer?", a: "Tα1 is not a cancer treatment, but it's used as an immune adjunct in oncology — enhancing the immune system's natural cancer surveillance and improving response to chemotherapy and immunotherapy. It's approved as a cancer adjunct in multiple countries." },
    ],
  },

  "epithalon": {
    slug: "epithalon", efficacyTier: "Longevity Peptide", name: "Epithalon",
    headline: "Telomere extension & cellular longevity",
    startingPrice: "Starting at $285", delivery: "Injectable cycles", resultsIn: "Long-term benefits",
    heroImage: IMG.epithalon,
    description: "Epithalon (Epitalon) is a synthetic tetrapeptide analogue of epithalamin — a pineal gland polypeptide with profound anti-aging properties. It activates telomerase (the enzyme that extends telomeres), regulates the sleep-wake cycle, and modulates the endocrine system for comprehensive biological age reduction.",
    mechanismTitle: "Telomerase activation. Biological clock reset.",
    mechanisms: [
      { name: "Telomerase Activation", badge: "Telomere Extension", description: "The primary anti-aging mechanism — Epithalon activates telomerase, the enzyme that rebuilds telomeres at chromosome ends. Telomere length is the primary marker of biological cellular age.", result: "Result: Extended telomeres and reduced biological cellular age" },
      { name: "Melatonin Normalization", badge: "Circadian Rhythm", description: "Stimulates pineal gland melatonin production — restoring the circadian rhythm disruption that contributes to accelerated aging, sleep disorders, and endocrine dysfunction.", result: "Result: Normalized melatonin and improved circadian health" },
      { name: "Gene Expression", badge: "Epigenetic Modulation", description: "Modulates gene expression patterns toward a younger phenotype — reducing expression of aging-associated genes and restoring expression of repair and maintenance genes.", result: "Result: Younger epigenetic profile and restored cellular maintenance" },
    ],
    benefits: [
      { icon: "ri-leaf-line", title: "Telomere extension", description: "The only peptide with direct telomerase-activating activity — the most validated mechanism of biological age reduction." },
      { icon: "ri-zzz-line", title: "Sleep & melatonin restoration", description: "Normalizes pineal melatonin production, improving sleep architecture and circadian rhythm health." },
      { icon: "ri-recycle-line", title: "DNA repair enhancement", description: "Improved telomere integrity reduces chromosomal instability and DNA damage accumulation." },
      { icon: "ri-shield-check-line", title: "Immune rejuvenation", description: "Immune cells with longer telomeres replicate more effectively — supporting comprehensive immune function." },
      { icon: "ri-sparkling-2-line", title: "Skin & collagen", description: "Reduced cellular aging produces visible skin quality improvements with long-term use." },
      { icon: "ri-brain-line", title: "Cognitive longevity", description: "Neuronal telomere health supports long-term cognitive function and may reduce neurodegenerative risk." },
    ],
    timeline: [
      { phase: "Week 1–2", title: "Sleep Improvement", description: "Melatonin normalization produces early sleep quality improvements — often the first noticed benefit." },
      { phase: "Months 1–3", title: "Cellular Repair", description: "Telomerase activation and DNA repair accelerate. Lab markers of cellular aging may begin improving." },
      { phase: "6–12 Months", title: "Long-Term Anti-Aging", description: "Progressive biological age reduction with measurable improvements in telomere length and biological age markers." },
      { phase: "Ongoing cycles", title: "Sustained Longevity", description: "Most protocols use cyclical administration (10–20 day courses, 3–4 cycles/year) for sustained telomere maintenance." },
    ],
    faqs: [
      { q: "How is Epithalon typically administered?", a: "Most protocols use cyclical administration — commonly a 10-day course of twice-daily injections, repeated 3–4 times per year. This mimics how the pineal gland releases epithalamin naturally in episodic bursts. Your physician will design an appropriate protocol." },
      { q: "Can Epithalon actually reverse biological aging?", a: "In cell culture studies, Epithalon has been shown to extend telomere length and the replicative lifespan of cells. Human studies show improvements in biological age markers, immune function, and longevity-associated parameters. It won't reverse all aging, but it represents one of the strongest tools available for slowing the primary biological clock mechanism." },
    ],
  },

  "thymalin": {
    slug: "thymalin", efficacyTier: "Thymic Peptide", name: "Thymalin",
    headline: "Thymic immune restoration complex",
    startingPrice: "Starting at $280", delivery: "Subcutaneous injection cycles", resultsIn: "Results in 2–4 weeks",
    heroImage: IMG.thymalin,
    description: "Thymalin is a polypeptide complex extracted from the thymus gland that restores thymic function and immune competence. It regulates T-cell differentiation, reduces autoimmune reactivity, and coordinates adaptive immune responses — with particularly strong evidence for restoring immune function in aging populations.",
    mechanismTitle: "Thymic function restoration.",
    mechanisms: [
      { name: "T-Cell Differentiation", badge: "Adaptive Immunity", description: "Thymalin peptides signal developing T-cells in the thymus to differentiate into functional effector and regulatory subsets — restoring the balance of immune function that's lost with thymic involution.", result: "Result: Restored T-cell diversity and functional balance" },
      { name: "Regulatory T-Cell Induction", badge: "Autoimmune Balance", description: "Increases regulatory T-cell (Treg) production — reducing inappropriate inflammatory and autoimmune responses that increase with age and contribute to many chronic diseases.", result: "Result: Reduced autoimmune reactivity and chronic inflammation" },
      { name: "Cytokine Normalization", badge: "Immune Coordination", description: "Normalizes the cytokine environment that coordinates immune responses — reducing the chronic low-grade inflammatory state (inflammaging) characteristic of the aging immune system.", result: "Result: Normalized immune coordination and reduced inflammaging" },
    ],
    benefits: [
      { icon: "ri-shield-check-line", title: "Immune restoration", description: "Restores thymic-dependent immune function that declines with age, illness, and thymic involution." },
      { icon: "ri-leaf-line", title: "Autoimmune modulation", description: "Regulatory T-cell induction reduces inappropriate immune reactivity in autoimmune conditions." },
      { icon: "ri-recycle-line", title: "Inflammaging reduction", description: "Normalizes the chronic inflammatory state that drives age-related disease and accelerates biological aging." },
      { icon: "ri-seedling-line", title: "T-cell diversity", description: "Restores the breadth of T-cell receptor diversity needed for comprehensive pathogen surveillance." },
      { icon: "ri-medal-line", title: "Longevity data", description: "Soviet-era studies on Thymalin showed significant extensions in both mean and maximum lifespan in elderly populations." },
      { icon: "ri-brain-line", title: "Cognitive function", description: "Immune-brain axis optimization may support cognitive clarity and protection from neuroinflammation." },
    ],
    timeline: [
      { phase: "Weeks 1–2", title: "Immune Activation", description: "T-cell activity begins improving. Patients often notice reduced susceptibility to minor infections." },
      { phase: "Weeks 2–6", title: "Immune Rebalancing", description: "Regulatory T-cell levels normalize. Autoimmune or inflammatory conditions may show improvement." },
      { phase: "2–4 Months", title: "Comprehensive Immune Restoration", description: "Full T-cell repertoire restored. Inflammaging markers improve. Sustained immune competence established." },
    ],
    faqs: [
      { q: "How is Thymalin different from Thymosin Alpha-1?", a: "Thymosin Alpha-1 is a pure synthetic peptide that specifically activates T-cell, dendritic cell, and NK cell function. Thymalin is a broader thymic polypeptide complex that works on T-cell differentiation and thymic development. They're complementary — some longevity protocols use both." },
    ],
  },

  // ── Aesthetic ─────────────────────────────────────────────────────

  "klow": {
    slug: "klow", efficacyTier: "Aesthetic Stack", name: "KLOW",
    headline: "Advanced skin & hair optimization protocol",
    startingPrice: "Starting at $450", delivery: "3–5x per week dosing", resultsIn: "Results in 3–6 weeks",
    heroImage: IMG.klow,
    description: "KLOW is a physician-formulated aesthetic peptide stack designed for comprehensive skin quality and hair optimization. Combining synergistic peptides targeting collagen synthesis, hair follicle health, and anti-inflammatory pathways for visible aesthetic improvements.",
    mechanismTitle: "Multi-pathway aesthetic optimization.",
    mechanisms: [
      { name: "Collagen Synthesis", badge: "Dermal Structure", description: "Combined peptide pathways stimulate collagen and elastin production in the dermis — improving skin firmness, reducing fine lines, and restoring youthful skin architecture.", result: "Result: Increased collagen density and improved skin structural integrity" },
      { name: "Hair Follicle Support", badge: "Scalp Health", description: "Multiple pathways support hair follicle health, scalp microcirculation, and anagen phase extension — producing comprehensive improvements in hair density and quality.", result: "Result: Improved hair thickness, density, and reduced shedding" },
      { name: "Anti-Inflammatory", badge: "Skin Clarity", description: "Reduces inflammatory mediators in skin and scalp tissue that drive premature aging, redness, and hair loss. A healthy inflammatory balance is foundational to aesthetic health.", result: "Result: Reduced skin inflammation for clearer, more even complexion" },
    ],
    benefits: [
      { icon: "ri-sparkling-2-line", title: "Skin rejuvenation", description: "Comprehensive improvement in skin firmness, texture, radiance, and reduction of fine lines." },
      { icon: "ri-seedling-line", title: "Hair thickness & density", description: "Visible improvements in hair quality, reduced shedding, and increased density over 6–12 weeks." },
      { icon: "ri-droplet-line", title: "Enhanced hydration", description: "Improved skin barrier function and moisture retention for lasting hydration improvements." },
      { icon: "ri-fire-line", title: "Anti-inflammatory", description: "Reduces chronic skin and scalp inflammation that drives premature aging and hair thinning." },
      { icon: "ri-links-line", title: "Synergistic formula", description: "Multi-peptide approach produces greater results than individual peptides through complementary mechanisms." },
      { icon: "ri-first-aid-kit-line", title: "Procedure recovery", description: "Accelerates healing and improves outcomes after cosmetic procedures, laser treatments, or injectables." },
    ],
    timeline: [
      { phase: "Weeks 1–3", title: "Initial Glow & Hydration", description: "Skin texture and hydration improve noticeably. Scalp health begins optimizing." },
      { phase: "Weeks 3–6", title: "Visible Improvements", description: "Fine lines soften, skin tone evens, hair shedding decreases." },
      { phase: "Weeks 6–12", title: "Structural Changes", description: "Collagen density improvements produce firmer skin. Hair density visibly increases." },
      { phase: "3–6 Months", title: "Peak Aesthetic Results", description: "Full remodeling and maximum aesthetic optimization achieved with consistent use." },
    ],
    faqs: [
      { q: "How is KLOW different from the Glow Stack?", a: "Both are aesthetic peptide stacks, but with different formulations and primary targets. The Glow Stack (GHK-Cu + BPC-157 + TB-500) focuses on collagen remodeling, gut-skin axis healing, and tissue regeneration. KLOW uses a different peptide combination targeting skin quality and hair specifically. Your physician will recommend the most appropriate protocol based on your goals." },
    ],
  },

  // ── Misc ──────────────────────────────────────────────────────────

  "ll-37": {
    slug: "ll-37", efficacyTier: "Antimicrobial Peptide", name: "LL-37",
    headline: "The human cathelicidin antimicrobial peptide",
    startingPrice: "Starting at $295", delivery: "Injectable or topical", resultsIn: "Results in 1–4 weeks",
    heroImage: IMG.ll37,
    description: "LL-37 is the only member of the cathelicidin family in humans — a natural antimicrobial peptide produced by immune cells, skin cells, and mucosal epithelia as the body's first line of defense. It has direct antibacterial, antifungal, antiviral, and immune-modulatory properties, with emerging applications in wound healing, skin conditions, and immune optimization.",
    mechanismTitle: "Natural antimicrobial defense restored.",
    mechanisms: [
      { name: "Membrane Disruption", badge: "Antimicrobial Activity", description: "LL-37 disrupts bacterial and fungal cell membranes through amphipathic helix insertion — a mechanism resistant to the development of antibiotic resistance. Effective against antibiotic-resistant organisms.", result: "Result: Broad-spectrum antimicrobial activity including drug-resistant organisms" },
      { name: "Immune Activation", badge: "Innate Immunity", description: "Acts as an alarmin — activating dendritic cells, mast cells, and macrophages to mount coordinated immune responses. Bridges innate and adaptive immunity.", result: "Result: Enhanced innate immune response coordination" },
      { name: "Wound Healing", badge: "Tissue Repair", description: "Promotes wound healing through multiple mechanisms: chemotaxis of immune and repair cells, angiogenesis, and epithelial cell migration and proliferation.", result: "Result: Accelerated wound closure and reduced infection risk" },
    ],
    benefits: [
      { icon: "ri-shield-check-line", title: "Antimicrobial activity", description: "Direct activity against bacteria, fungi, and viruses — including antibiotic-resistant organisms like MRSA." },
      { icon: "ri-first-aid-kit-line", title: "Wound healing", description: "Accelerates wound closure through immune cell recruitment, angiogenesis, and epithelial repair." },
      { icon: "ri-sparkling-2-line", title: "Skin health", description: "Deficiency in LL-37 is implicated in atopic dermatitis — topical supplementation supports skin barrier defense." },
      { icon: "ri-leaf-line", title: "Antiviral protection", description: "Demonstrated activity against multiple viruses including herpes simplex, influenza, and SARS-CoV-2." },
      { icon: "ri-recycle-line", title: "Immune bridge", description: "Connects innate and adaptive immunity, ensuring coordinated and comprehensive immune responses." },
      { icon: "ri-brain-line", title: "Neuroprotection", description: "Emerging evidence for LL-37 in reducing neuroinflammation and supporting neuroprotective pathways." },
    ],
    timeline: [
      { phase: "Days 1–7", title: "Acute Antimicrobial Effect", description: "Direct antimicrobial activity begins. For wound healing applications, early improvement in infection control." },
      { phase: "Weeks 1–3", title: "Immune Activation", description: "Enhanced innate immune response. Wound healing accelerates with improved cell recruitment." },
      { phase: "Weeks 3–6", title: "Tissue Repair", description: "Structural wound healing and skin repair complete. Chronic conditions show progressive improvement." },
    ],
    faqs: [
      { q: "Who benefits most from LL-37 therapy?", a: "Patients with recurrent infections, chronic wound healing issues, skin conditions (particularly atopic dermatitis), those with immune deficiencies, and patients seeking comprehensive immune optimization. It's also used in sports medicine for its wound healing properties." },
      { q: "Can LL-37 be used topically?", a: "Yes — topical LL-37 is effective for skin conditions including atopic dermatitis, wound healing, and local antimicrobial protection. Injectable delivery produces systemic immune effects in addition to local ones." },
    ],
  },

  // ── Additional metabolic ───────────────────────────────────────────

  "slu-pp-332": {
    slug: "slu-pp-332", efficacyTier: "Exercise Mimetic", name: "SLU-PP-332",
    headline: "The exercise-in-a-molecule ERR agonist",
    startingPrice: "Starting at $400", delivery: "Oral or injectable", resultsIn: "Results in 2–4 weeks",
    heroImage: IMG.slupp332,
    description: "SLU-PP-332 activates ERRα (estrogen-related receptor alpha) — a nuclear receptor that mimics the cellular effects of aerobic exercise. It stimulates mitochondrial biogenesis, fat oxidation, and endurance capacity at the genetic level, independent of physical exertion.",
    mechanismTitle: "ERRα activation — exercise at the gene level.",
    mechanisms: [
      { name: "ERRα Activation", badge: "Nuclear Receptor", description: "Activates estrogen-related receptor alpha — the master transcription factor that coordinates exercise-induced gene expression in muscle and adipose tissue.", result: "Result: Exercise-like metabolic gene expression without physical exertion" },
      { name: "Mitochondrial Biogenesis", badge: "Cellular Power Upgrade", description: "Drives PGC-1α signaling to create new mitochondria and improve existing mitochondrial efficiency — the fundamental cellular adaptation from aerobic training.", result: "Result: Increased mitochondrial density and oxidative capacity" },
      { name: "Fat Oxidation", badge: "Lipid Metabolism", description: "Upregulates genes for fatty acid oxidation, improving the ability to use fat as fuel — particularly in sedentary or metabolically impaired individuals.", result: "Result: Enhanced fat-burning capacity independent of exercise" },
    ],
    benefits: [
      { icon: "ri-run-line", title: "Exercise-mimetic effects", description: "Produces cellular adaptations typically requiring weeks of aerobic training — mitochondrial biogenesis, fat oxidation, endurance." },
      { icon: "ri-flashlight-line", title: "Endurance enhancement", description: "Increases oxidative capacity and endurance performance in physically active patients." },
      { icon: "ri-fire-line", title: "Fat metabolism", description: "Enhanced fat oxidation for improved body composition and metabolic health." },
      { icon: "ri-heart-pulse-line", title: "Cardiovascular benefit", description: "ERRα activation in cardiac tissue produces cardioprotective metabolic adaptations." },
      { icon: "ri-recycle-line", title: "Metabolic disease protection", description: "Improves insulin sensitivity and metabolic flexibility — relevant for prediabetes and metabolic syndrome." },
      { icon: "ri-links-line", title: "Synergistic with training", description: "Amplifies training adaptations when used alongside exercise — not just a replacement for those who can't exercise." },
    ],
    timeline: [
      { phase: "Weeks 1–2", title: "Mitochondrial Changes", description: "Mitochondrial biogenesis begins. Cellular oxidative capacity starts improving." },
      { phase: "Weeks 2–4", title: "Performance & Composition", description: "Exercise performance improves. Fat oxidation increases. Body composition begins shifting." },
      { phase: "Months 1–3", title: "Peak Adaptation", description: "Full mitochondrial density improvements achieved. Maximum exercise-mimetic benefits realized." },
    ],
    faqs: [
      { q: "Is SLU-PP-332 a substitute for exercise?", a: "SLU-PP-332 mimics specific cellular aspects of aerobic exercise — particularly mitochondrial biogenesis and fat oxidation. It doesn't replace all exercise benefits (cardiovascular conditioning, muscle mechanics, bone density, mental health), but it provides significant metabolic benefits for patients limited by injury, illness, or inability to exercise intensely." },
    ],
  },

  "adipotide": {
    slug: "adipotide", efficacyTier: "Fat Targeting Peptide", name: "Adipotide",
    headline: "Proapoptotic fat cell targeting peptide",
    startingPrice: "Starting at $305", delivery: "Subcutaneous injection", resultsIn: "Results in 4–8 weeks",
    heroImage: IMG.adipotide,
    description: "Adipotide (CKGGRAKDC-GG-D(KLAKLAK)2) is a proapoptotic peptide that specifically targets the blood vessels supplying white adipose tissue — triggering programmed death of fat cell vasculature to reduce fat stores. It produces targeted fat reduction with body composition improvements.",
    mechanismTitle: "Targeted fat tissue vascular disruption.",
    mechanisms: [
      { name: "Adipose Targeting", badge: "Peptide Homing", description: "CKGGRAKDC peptide sequence specifically homes to receptors expressed on blood vessels supplying white adipose tissue — delivering its payload precisely to fat tissue vasculature.", result: "Result: Targeted delivery specifically to fat tissue" },
      { name: "Vascular Disruption", badge: "Pro-apoptotic", description: "The D(KLAKLAK)2 domain disrupts mitochondria in fat tissue endothelial cells, triggering apoptosis. Without blood supply, fat cells undergo controlled cell death.", result: "Result: Programmed reduction of fat tissue mass" },
      { name: "Body Composition", badge: "Selective Fat Loss", description: "Fat reduction occurs without affecting lean tissue, organ function, or other systems — producing selective body recomposition.", result: "Result: Targeted fat mass reduction with lean tissue preservation" },
    ],
    benefits: [
      { icon: "ri-fire-line", title: "Targeted fat reduction", description: "Specifically reduces white adipose tissue through vascular disruption — a novel mechanism distinct from all other weight loss approaches." },
      { icon: "ri-body-scan-line", title: "Body recomposition", description: "Fat reduction without lean tissue loss — improving body composition metrics." },
      { icon: "ri-heart-pulse-line", title: "Metabolic improvement", description: "Reduced visceral and subcutaneous fat produces downstream metabolic health improvements." },
      { icon: "ri-links-line", title: "Complements other protocols", description: "Novel mechanism makes it a powerful complement to GLP-1 medications and metabolic optimization protocols." },
    ],
    timeline: [
      { phase: "Weeks 2–4", title: "Vascular Changes", description: "Fat tissue vascular disruption begins. Some patients notice early body composition shifts." },
      { phase: "Weeks 4–8", title: "Visible Fat Loss", description: "Measurable reduction in fat mass, particularly in treated areas." },
      { phase: "Months 2–4", title: "Peak Recomposition", description: "Maximum fat reduction achieved. Body composition metrics significantly improved." },
    ],
    faqs: [
      { q: "Is Adipotide safe?", a: "Adipotide has demonstrated significant fat reduction in preclinical models and early clinical work. As with all investigational compounds, it should be used under physician supervision with regular monitoring. Your provider will review your health history to determine if it's appropriate." },
    ],
  },

  "pinealon": {
    slug: "pinealon", efficacyTier: "Neuropeptide", name: "Pinealon",
    headline: "Pineal-derived neuroprotective tripeptide",
    startingPrice: "Starting at $280", delivery: "Injectable or intranasal", resultsIn: "Results in 2–6 weeks",
    heroImage: IMG.pinealon,
    description: "Pinealon (Glu-Asp-Arg) is a synthetic tripeptide derived from the pineal gland with neuroprotective, antioxidant, and circadian-modulating properties. It protects neurons from hypoxia and oxidative damage, normalizes sleep-wake cycles, and is used in longevity protocols for brain health.",
    mechanismTitle: "Pineal-derived neuroprotection.",
    mechanisms: [
      { name: "Neuroprotection", badge: "Neuronal Defense", description: "Protects neurons from hypoxic damage, oxidative stress, and apoptotic signals — particularly relevant in aging brains where neuronal loss accelerates.", result: "Result: Reduced neuronal loss and preserved cognitive function" },
      { name: "Antioxidant Activity", badge: "Reactive Oxygen Species", description: "Reduces reactive oxygen species in neuronal tissue, protecting mitochondria and DNA from oxidative damage that accumulates with aging.", result: "Result: Reduced neuronal oxidative stress and cellular aging" },
      { name: "Circadian Modulation", badge: "Sleep-Wake Cycle", description: "Works with the pineal gland to regulate melatonin production and normalize circadian rhythms disrupted by aging, light pollution, or shift work.", result: "Result: Improved circadian rhythm health and sleep quality" },
    ],
    benefits: [
      { icon: "ri-brain-line", title: "Neuroprotection", description: "Protects neurons from hypoxic and oxidative damage that drives cognitive decline with aging." },
      { icon: "ri-zzz-line", title: "Sleep regulation", description: "Normalizes pineal melatonin production and circadian rhythms for improved sleep quality." },
      { icon: "ri-shield-check-line", title: "Cognitive preservation", description: "Long-term neuroprotection supports sustained cognitive function as part of a longevity protocol." },
      { icon: "ri-leaf-line", title: "Antioxidant defense", description: "Reduces neuronal oxidative stress at the cellular level." },
    ],
    timeline: [
      { phase: "Weeks 1–2", title: "Sleep Improvement", description: "Circadian normalization produces early sleep quality improvements." },
      { phase: "Weeks 2–6", title: "Cognitive Effects", description: "Improved neuroprotection and reduced oxidative stress support cognitive clarity and mental sharpness." },
      { phase: "Long-term", title: "Neuroprotective Benefit", description: "Continued use provides sustained protection against age-related neuronal decline." },
    ],
    faqs: [
      { q: "How does Pinealon differ from Epithalon?", a: "Both are derived from pineal gland peptides and work on circadian health and longevity. Pinealon (Glu-Asp-Arg) focuses on neuroprotection and circadian modulation. Epithalon focuses on telomerase activation and broader biological aging. They're often used together in comprehensive longevity protocols." },
    ],
  },

  "ara-290": {
    slug: "ara-290", efficacyTier: "Neuroprotective Peptide", name: "Ara-290",
    headline: "Erythropoietin-based neuroprotective peptide",
    startingPrice: "Starting at $285", delivery: "Subcutaneous injection", resultsIn: "Results in 2–4 weeks",
    heroImage: IMG.ara290,
    description: "Ara-290 is a synthetic 11-amino acid peptide derived from erythropoietin (EPO) that retains EPO's tissue-protective and anti-inflammatory properties without its erythropoietic (red blood cell stimulating) effects. It has strong neuroprotective, anti-inflammatory, and metabolic benefits.",
    mechanismTitle: "Non-hematopoietic EPO-receptor signaling.",
    mechanisms: [
      { name: "Innate Repair Receptor", badge: "Tissue Protection", description: "Activates the innate repair receptor (IRR) — the EPO receptor complex expressed on non-hematopoietic tissues. This receptor mediates EPO's tissue-protective effects independent of red blood cell production.", result: "Result: Tissue protection and repair without hematological effects" },
      { name: "Anti-Inflammatory", badge: "Cytokine Modulation", description: "Reduces pro-inflammatory cytokines (IL-1β, TNF-α) while promoting anti-inflammatory signals — useful in neuropathic pain, metabolic syndrome, and chronic inflammatory conditions.", result: "Result: Systemic anti-inflammatory effects across multiple tissue types" },
      { name: "Metabolic Improvement", badge: "Insulin Sensitivity", description: "Improves insulin sensitivity and beta-cell function — with clinical trials showing significant improvements in glycemic control in Type 2 diabetics and prediabetics.", result: "Result: Improved glucose metabolism and insulin sensitivity" },
    ],
    benefits: [
      { icon: "ri-brain-line", title: "Neuropathic pain relief", description: "Clinical trials show significant reduction in painful peripheral neuropathy — one of few treatments with strong evidence." },
      { icon: "ri-heart-pulse-line", title: "Metabolic improvement", description: "Improves insulin sensitivity and beta-cell function in diabetes and metabolic syndrome." },
      { icon: "ri-shield-check-line", title: "Anti-inflammatory", description: "Systemic reduction of pro-inflammatory cytokines without immunosuppression." },
      { icon: "ri-leaf-line", title: "No red blood cell effects", description: "Unlike EPO itself, Ara-290 doesn't affect hematocrit — safe for patients who can't use erythropoietic agents." },
      { icon: "ri-first-aid-kit-line", title: "Tissue repair", description: "Promotes healing and protection in heart, kidney, neural, and other vulnerable tissues." },
    ],
    timeline: [
      { phase: "Weeks 1–4", title: "Anti-Inflammatory Effect", description: "Cytokine reduction begins. Neuropathic pain may start improving within the first weeks." },
      { phase: "Months 1–3", title: "Metabolic & Neurological Benefits", description: "Insulin sensitivity improves. Neuropathic symptoms continue reducing." },
    ],
    faqs: [
      { q: "What is Ara-290 best used for?", a: "The strongest clinical evidence is for painful peripheral neuropathy (particularly diabetic neuropathy) and metabolic improvement in Type 2 diabetes. It's also used for general anti-inflammatory and tissue-protective applications in longevity protocols." },
    ],
  },

  "dihexa": {
    slug: "dihexa", efficacyTier: "Cognitive Enhancer", name: "Dihexa",
    headline: "Hepatocyte growth factor-derived nootropic",
    startingPrice: "Starting at $290", delivery: "Oral or subcutaneous", resultsIn: "Results in 2–4 weeks",
    heroImage: IMG.dihexa,
    description: "Dihexa is a small molecule derived from angiotensin IV and hepatocyte growth factor (HGF) that dramatically promotes synaptogenesis — the formation of new synaptic connections in the brain. It's estimated to be up to 10 million times more potent than BDNF in promoting new neural connections.",
    mechanismTitle: "Synaptogenesis and HGF signaling.",
    mechanisms: [
      { name: "HGF/c-Met Activation", badge: "Synaptogenesis", description: "Activates the hepatocyte growth factor receptor (c-Met) in neurons, triggering the formation of new dendritic spines and synaptic connections — the cellular substrate of learning and memory.", result: "Result: Increased synapse formation and neural connectivity" },
      { name: "BDNF Amplification", badge: "Neuroplasticity", description: "Works alongside BDNF signaling to promote neuroplasticity — estimated to be up to 10 million times more potent at promoting synaptic growth than BDNF alone.", result: "Result: Dramatically enhanced neuroplasticity and cognitive capacity" },
      { name: "Memory Consolidation", badge: "Long-Term Potentiation", description: "New synaptic connections produced by Dihexa support long-term potentiation — the cellular mechanism of memory formation and retention.", result: "Result: Improved memory formation and retention" },
    ],
    benefits: [
      { icon: "ri-brain-line", title: "Memory enhancement", description: "Promotes new synaptic connections that support memory formation and retention." },
      { icon: "ri-seedling-line", title: "Neuroplasticity", description: "Dramatically enhances the brain's ability to form new neural connections — the basis of learning and adaptation." },
      { icon: "ri-shield-check-line", title: "Neuroprotection", description: "HGF signaling protects existing neurons while promoting new connection formation." },
      { icon: "ri-flashlight-line", title: "Cognitive performance", description: "Improved neural connectivity supports processing speed, working memory, and executive function." },
      { icon: "ri-leaf-line", title: "Long-lasting effects", description: "Unlike most nootropics, the structural neural changes produced by Dihexa may be durable beyond the dosing period." },
    ],
    timeline: [
      { phase: "Weeks 1–2", title: "Early Cognitive Enhancement", description: "Initial improvements in focus and mental clarity as new synaptic connections form." },
      { phase: "Weeks 2–6", title: "Memory Improvement", description: "Progressive improvements in memory formation and retention as neuroplasticity increases." },
      { phase: "Months 1–3", title: "Structural Neural Enhancement", description: "Significant new synaptic density achieved. Cognitive improvements become pronounced and durable." },
    ],
    faqs: [
      { q: "Is Dihexa safe?", a: "Dihexa has been studied in animal models and early human settings. Given its potency, conservative dosing under physician supervision is important. Your physician will start at the lowest effective dose and titrate carefully. It should not be used without physician oversight." },
      { q: "How long do Dihexa's effects last?", a: "Unlike traditional nootropics that require ongoing dosing, the structural synaptic changes produced by Dihexa may persist beyond the dosing period. Some patients report cognitive benefits for months after completing a course. This is theoretically consistent with the permanent nature of new synaptic connections." },
    ],
  },

  "pe-22-28": {
    slug: "pe-22-28", efficacyTier: "Antidepressant Peptide", name: "PE-22-28",
    headline: "Spadin analogue — natural antidepressant peptide",
    startingPrice: "Starting at $285", delivery: "Intranasal or injectable", resultsIn: "Results in 1–2 weeks",
    heroImage: IMG.pe2228,
    description: "PE-22-28 is an optimized analogue of Spadin — a naturally occurring antidepressant peptide derived from the propeptide of neurotensin. It inhibits TREK-1 potassium channels in the brain's serotonin pathways, producing rapid antidepressant effects with a uniquely rapid onset.",
    mechanismTitle: "TREK-1 channel inhibition for mood optimization.",
    mechanisms: [
      { name: "TREK-1 Inhibition", badge: "Serotonin Pathway", description: "Inhibits TREK-1 potassium channels in the raphe nuclei (the brain's primary serotonin source), allowing more spontaneous serotonergic neuron firing — increasing serotonin release in key mood-regulating areas.", result: "Result: Increased serotonin signaling for improved mood and stress resilience" },
      { name: "Neuroplasticity", badge: "BDNF Upregulation", description: "Like most effective antidepressant treatments, PE-22-28 upregulates BDNF in the hippocampus — promoting neuroplasticity that addresses the structural neural changes underlying depression.", result: "Result: Enhanced neuroplasticity and hippocampal neurogenesis" },
      { name: "Rapid Onset", badge: "Faster than SSRIs", description: "Because it directly modulates the TREK-1 channel rather than blocking serotonin reuptake, effects can occur within days rather than the 4–6 weeks required for SSRI response.", result: "Result: Antidepressant and mood-stabilizing effects within 1–2 weeks" },
    ],
    benefits: [
      { icon: "ri-mental-health-line", title: "Antidepressant effects", description: "Rapid mood improvement through TREK-1 inhibition and serotonin pathway enhancement." },
      { icon: "ri-flashlight-line", title: "Rapid onset", description: "Effects within 1–2 weeks — significantly faster than traditional antidepressants." },
      { icon: "ri-brain-line", title: "Neuroplasticity", description: "BDNF upregulation promotes hippocampal neurogenesis — addressing structural brain changes in depression." },
      { icon: "ri-leaf-line", title: "Natural mechanism", description: "Based on a naturally occurring antidepressant peptide — a physiological approach to mood optimization." },
      { icon: "ri-zzz-line", title: "Sleep improvement", description: "Serotonin pathway optimization supports sleep quality and circadian rhythm health." },
      { icon: "ri-shield-check-line", title: "Minimal side effects", description: "Novel mechanism distinct from SSRIs/SNRIs — typically without sexual side effects or withdrawal syndrome." },
    ],
    timeline: [
      { phase: "Days 3–7", title: "Initial Mood Improvement", description: "TREK-1 inhibition produces early serotonin pathway enhancement — mood often improves within the first week." },
      { phase: "Weeks 1–3", title: "Sustained Mood Stabilization", description: "Serotonin signaling optimized. BDNF elevation begins supporting neuroplastic changes." },
      { phase: "Weeks 3–8", title: "Structural Improvements", description: "Hippocampal neurogenesis and neuroplasticity produce more durable mood and cognitive improvements." },
    ],
    faqs: [
      { q: "Can PE-22-28 replace SSRIs?", a: "PE-22-28 should not be used as a substitute for prescribed medications without physician supervision. It may be used as an adjunct to existing treatment, as a standalone option for subclinical mood issues, or as part of a tapering protocol under physician guidance. Never discontinue prescribed antidepressants without consulting your doctor." },
    ],
  },
};

export const PEPTIDE_SLUGS = Object.keys(PEPTIDE_CATALOG);
