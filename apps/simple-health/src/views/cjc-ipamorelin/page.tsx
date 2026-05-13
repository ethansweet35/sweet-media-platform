import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "cjc-ipamorelin", efficacyTier: "Most Popular GH Stack", name: "CJC-1295 / Ipamorelin", headline: "Dual-pathway GH amplification",
  startingPrice: "Starting at $500", delivery: "3–5x per week injection", resultsIn: "Results in 6–8 weeks",
  description: "A strategic peptide combination that amplifies your body's natural growth hormone production through two complementary pathways. CJC-1295 provides sustained GH elevation while Ipamorelin adds pulsatile surges — together producing superior muscle development, fat loss, recovery, and anti-aging benefits without the side effects of synthetic HGH.",
  heroImage: `${IMG}/ChatGPT-Image-May-2-2026-03_00_25-PM.png`,
  mechanismTitle: "Dual-pathway growth hormone amplification",
  mechanismSubtitle: "CJC-1295 provides the baseline amplification of your natural GH rhythm, while Ipamorelin adds pulsatile surges through a complementary pathway — producing synergistic IGF-1 and lean body mass increases.",
  mechanisms: [
    { name: "CJC-1295", badge: "GHRH Analogue · Long-Acting", description: "A modified growth hormone-releasing hormone that binds to albumin in your bloodstream, extending its half-life to 6–8 days. This produces steady, sustained amplification of your natural GH pulses without peaks and valleys.", result: "Result: Extended mean GH levels for 6+ days per dose with minimal desensitization" },
    { name: "Ipamorelin", badge: "Ghrelin Mimetic · Selective GH Secretagogue", description: "Mimics ghrelin to trigger additional GH release through a different receptor pathway. Unlike older secretagogues, Ipamorelin produces strong GH release without elevating cortisol or prolactin — critical for clean, side-effect-free results.", result: "Result: Selectively increased GH without elevating cortisol or prolactin" },
    { name: "Synergistic Effect", badge: "Combined Protocol", description: "When combined, both peptides activate different GH-release pathways simultaneously, producing more sustained GH elevation than either peptide alone. The result is superior body recomposition, recovery, and anti-aging benefits with a cleaner side effect profile.", result: "Result: Superior lean mass, fat loss, and recovery vs. single-agent therapy" },
  ],
  benefits: [
    { icon: "ri-body-scan-line", title: "Muscle Protein Synthesis", description: "Lean muscle development and accelerates post-workout recovery through elevated IGF-1 signaling." },
    { icon: "ri-fire-line", title: "Fat Oxidation", description: "Enhances lipolysis (fat breakdown), particularly targeting stubborn visceral and abdominal fat deposits." },
    { icon: "ri-sparkling-2-line", title: "Skin & Collagen", description: "Increases collagen production and skin elasticity, reducing fine lines and improving overall skin quality." },
    { icon: "ri-zzz-line", title: "Sleep Quality", description: "Improves deep sleep architecture, leading to more restorative sleep cycles and better recovery." },
    { icon: "ri-flashlight-line", title: "Energy & Vitality", description: "Restores cellular energy production and metabolism, reducing age-related fatigue and brain fog." },
    { icon: "ri-first-aid-kit-line", title: "Joint & Tendon Health", description: "Supports connective tissue repair and may reduce joint discomfort through improved tissue regeneration." },
  ],
  timeline: [
    { phase: "Weeks 1–2", title: "Improved Sleep & Recovery", description: "Most patients notice deeper, more restorative sleep within the first two weeks. Recovery from exercise feels faster." },
    { phase: "Weeks 3–6", title: "Energy & Well-Being", description: "Increased daytime energy, reduced brain fog, and a general sense of improved vitality become apparent." },
    { phase: "Weeks 6–8", title: "Body Composition Changes", description: "Visible changes in muscle tone and fat reduction, particularly in the midsection. Clothes fit differently." },
    { phase: "Weeks 8–12", title: "Skin Quality Improvements", description: "Enhanced skin elasticity, reduced fine lines, and improved overall skin texture become noticeable." },
    { phase: "3–6 Months", title: "Peak Results", description: "Sustained body recomposition, optimized recovery, and comprehensive anti-aging benefits fully manifest." },
  ],
  faqs: [
    { q: "How is CJC/Ipamorelin different from single-agent therapy?", a: "The combination activates two different GH-release pathways simultaneously. CJC-1295 amplifies your natural GHRH pulses, while Ipamorelin triggers additional GH release through the ghrelin receptor. Studies show this dual approach produces more sustained GH elevation than either peptide alone, with minimal cortisol or prolactin elevation." },
    { q: "When will I start noticing results?", a: "Most patients report improved sleep quality and recovery within 2–3 weeks. Body composition changes (increased lean mass, reduced fat) typically become noticeable at 6–8 weeks. Skin quality improvements are usually visible at 8–12 weeks. Optimal results occur after 3–6 months of consistent use." },
    { q: "How often do I need to inject?", a: "CJC/Ipamorelin is typically administered 3–5 times per week via subcutaneous injection, usually before bed to mimic natural nighttime GH pulses. Your provider will determine the exact frequency based on your goals and response. The injection uses a very small insulin-style needle." },
    { q: "Can I use this while training or working out regularly?", a: "Absolutely — this is one of the most popular peptide stacks among athletes and active individuals. CJC/Ipamorelin enhances muscle protein synthesis, accelerates recovery, and helps maintain lean mass during caloric deficits. Many patients report improved workout performance and faster recovery between training sessions." },
  ],
};

export function CjcIpamorelinPage() { return <PeptideLandingPage data={data} />; }
