import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "sermorelin", efficacyTier: "GH Foundation", name: "Sermorelin", headline: "Fuel every cell",
  startingPrice: "Starting at $350", delivery: "Nightly subcutaneous injection", resultsIn: "Results in 6–8 weeks",
  description: "A growth hormone-releasing hormone (GHRH) analogue that stimulates your pituitary gland to produce its own growth hormone naturally — working with your biology rather than overriding it. Unlike synthetic HGH, Sermorelin preserves your body's natural feedback loops and pulsatile release patterns.",
  heroImage: `${IMG}/ChatGPT-Image-May-4-2026-01_11_41-PM.png`,
  mechanismTitle: "Pituitary stimulation, not replacement",
  mechanismSubtitle: "Synthetic HGH floods your system with exogenous hormone. Sermorelin preserves your body's regulatory mechanisms — your pituitary still decides how much GH to release based on real-time signals.",
  mechanisms: [
    { name: "Pituitary Stimulation", badge: "GH Foundation", description: "Sermorelin binds to GHRH receptors on your pituitary gland, triggering it to release its own stores of growth hormone. This preserves your body's natural feedback mechanisms — when GH levels are sufficient, the signal stops.", result: "Result: Physiological GH release that self-regulates based on your body's needs" },
    { name: "Nighttime Pulse", badge: "Circadian Aligned", description: "Natural GH is released in pulses, with the largest surge occurring during deep sleep. Sermorelin is administered before bed to amplify this natural nighttime peak — working with your circadian rhythm, not against it.", result: "Result: Enhanced sleep quality while maximizing GH release during recovery" },
    { name: "IGF-1 Production", badge: "Anabolic Cascade", description: "The GH released by your pituitary travels to your liver, where it stimulates production of IGF-1 — the hormone responsible for most of GH's anabolic and anti-aging effects.", result: "Result: Sustained IGF-1 elevation for muscle growth, fat loss, and tissue repair" },
  ],
  benefits: [
    { icon: "ri-body-scan-line", title: "Lean Muscle Development", description: "Promotes muscle protein synthesis and lean mass gains, particularly when combined with resistance training." },
    { icon: "ri-fire-line", title: "Fat Metabolism", description: "Reduces stubborn abdominal and visceral fat via improved lipid metabolism and lipolysis." },
    { icon: "ri-run-line", title: "Exercise Recovery", description: "Accelerates recovery from workouts and injuries by enhancing tissue repair and reducing inflammation." },
    { icon: "ri-zzz-line", title: "Sleep Quality", description: "Enhances slow-wave (deep) sleep architecture for more restorative sleep cycles and better recovery." },
    { icon: "ri-sparkling-2-line", title: "Skin & Collagen", description: "Improves skin elasticity, reduces fine lines, and increases collagen production for younger-looking skin." },
    { icon: "ri-medal-line", title: "Bone Density", description: "Supports bone mineral density and may reduce age-related bone loss when used long-term." },
  ],
  timeline: [
    { phase: "Weeks 1–2", title: "Improved Sleep Quality", description: "Most patients notice deeper, more restorative sleep within the first two weeks — often the earliest benefit." },
    { phase: "Weeks 2–4", title: "Energy & Recovery", description: "Increased daytime energy, reduced fatigue, and faster recovery from workouts become apparent." },
    { phase: "Weeks 6–8", title: "Body Composition Changes", description: "Visible improvements in muscle tone and reduction in abdominal fat. Clothes fit differently." },
    { phase: "Weeks 8–12", title: "Skin & Aesthetic Improvements", description: "Enhanced skin elasticity, reduced fine lines, and improved overall skin quality become noticeable." },
    { phase: "3–6 Months", title: "Peak Anabolic Benefits", description: "Sustained lean mass gains, optimized body composition, and comprehensive anti-aging effects fully manifest." },
  ],
  faqs: [
    { q: "How is Sermorelin different from synthetic HGH injections?", a: "Sermorelin stimulates your pituitary gland to produce its own growth hormone naturally, preserving your body's natural feedback loops and pulsatile GH release patterns. Synthetic HGH bypasses this system entirely and can suppress your natural production. Sermorelin is safer long-term and maintains physiological GH rhythms." },
    { q: "Will Sermorelin help me build muscle and lose fat?", a: "Yes. By increasing natural GH production, Sermorelin promotes lean muscle protein synthesis and enhances fat oxidation, particularly visceral fat. Studies show significant improvements in body composition after 3–6 months. Results are optimized when combined with resistance training and proper nutrition." },
    { q: "When will I start seeing results?", a: "Sleep quality improvements are often noticed within 1–2 weeks. Increased energy and recovery typically appear around 2–4 weeks. Body composition changes become visible at 6–8 weeks. Skin quality improvements manifest around 8–12 weeks. Peak benefits occur after 3–6 months of consistent use." },
    { q: "Why do I need to inject it at night?", a: "Natural growth hormone is released in pulsatile bursts, with the largest pulse occurring 1–2 hours after falling asleep during deep slow-wave sleep. Injecting Sermorelin before bed mimics this natural rhythm, working with your biology to amplify your nighttime GH surge rather than fighting against it." },
  ],
};

export function SermorelinPage() { return <PeptideLandingPage data={data} />; }
