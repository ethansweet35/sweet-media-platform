import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "red-light-laser-cap", efficacyTier: "LLLT Device", name: "Red Light Laser Cap", headline: "Drug-free hair restoration",
  startingPrice: "Starting at $199/Mo", delivery: "3x per week, 30-minute sessions", resultsIn: "Results in 4–6 months",
  description: "A medical-grade laser cap that uses low-level light therapy (LLLT) to stimulate mitochondria in hair follicles, improving cellular energy and promoting hair growth. FDA-cleared, drug-free, and non-invasive — an effective complement or alternative to pharmaceutical hair loss treatments.",
  heroImage: `${IMG}/Untitled-design-2026-03-30T130024-362.png`,
  mechanismTitle: "Light energy. Cellular activation.",
  mechanismSubtitle: "Low-level laser therapy (LLLT) uses specific wavelengths of red and near-infrared light to stimulate biological processes at the cellular level — without heat, damage, or side effects.",
  mechanisms: [
    { name: "Mitochondrial Stimulation", badge: "Cellular Energy", description: "Red light at 650nm wavelength is absorbed by cytochrome c oxidase in mitochondria, increasing ATP production. Hair follicle cells with more cellular energy produce hair more robustly — larger follicles, thicker hairs, longer growth phases.", result: "Result: Improved cellular energy in follicles for stronger, thicker hair production" },
    { name: "Inflammation Reduction", badge: "Scalp Environment", description: "LLLT reduces the inflammatory cytokines and oxidative stress in the scalp that contribute to follicle miniaturization. A healthier scalp environment allows follicles to perform at their full genetic potential.", result: "Result: Reduced scalp inflammation that was suppressing follicle function" },
    { name: "Growth Factor Stimulation", badge: "Follicle Signaling", description: "Red light therapy upregulates hair growth-related growth factors including IGF-1, FGF-7, and KGF in the scalp — signaling dormant follicles to enter the anagen (active growth) phase and stimulating existing follicles to produce thicker hair.", result: "Result: Activation of dormant follicles and increased growth factor signaling" },
  ],
  benefits: [
    { icon: "ri-leaf-line", title: "Drug-free & non-invasive", description: "Zero systemic side effects — suitable for patients who can't or prefer not to take finasteride, dutasteride, or minoxidil." },
    { icon: "ri-shield-check-line", title: "FDA-cleared", description: "Cleared by the FDA for the treatment of androgenetic alopecia in both men and women — safety and efficacy established." },
    { icon: "ri-seedling-line", title: "Increases hair density", description: "Clinical studies show meaningful increases in hair count and thickness in men and women with androgenetic alopecia." },
    { icon: "ri-fire-line", title: "Reduces scalp inflammation", description: "Addresses the inflammatory component of hair loss that DHT blockers alone don't target — a complementary mechanism." },
    { icon: "ri-links-line", title: "Combines with all treatments", description: "Can be used alongside finasteride, dutasteride, and minoxidil for a comprehensive multi-pathway approach." },
    { icon: "ri-home-line", title: "Convenient home treatment", description: "30-minute sessions worn at home, 3x per week — no clinic visits, no mess, no disruption to your daily routine." },
  ],
  timeline: [
    { phase: "Months 1–2", title: "Scalp Environment Optimization", description: "Inflammatory cytokines begin reducing. Scalp circulation improves. Most patients don't yet notice visible hair changes but the biological environment is shifting." },
    { phase: "Months 2–4", title: "Follicle Activation", description: "Dormant follicles begin reactivating. Some patients notice reduced shedding as follicles stabilize. Initial new growth may be visible as fine, short hairs." },
    { phase: "Months 4–6", title: "Visible Density Improvements", description: "New hair growth becomes noticeable. Existing hairs thicken. Most clinical trials show measurable hair count improvements in this window." },
    { phase: "Months 6–9", title: "Continued Progression", description: "Hair density continues to improve with consistent use. The hairs produced during earlier phases have now grown to visible length." },
    { phase: "9–12 Months", title: "Peak Results", description: "Maximum response typically achieved around 9–12 months. Continued use maintains results — stopping LLLT will lead to gradual return to baseline over time." },
  ],
  faqs: [
    { q: "How does LLLT compare to minoxidil and finasteride?", a: "LLLT works through a completely different mechanism — stimulating mitochondrial energy production rather than vasodilation (minoxidil) or DHT suppression (finasteride). Clinical results show LLLT produces meaningful but typically more modest improvements than pharmaceutical treatments alone. Its real value is as a complement — adding LLLT to a pharmaceutical protocol produces better results than either alone, and it's appropriate for patients who can't or don't want to take medications." },
    { q: "Who is LLLT best suited for?", a: "Patients who prefer a drug-free approach, those who've experienced side effects from medications, patients wanting to maximize results on top of their pharmaceutical protocol, women with female pattern hair loss (who have fewer pharmaceutical options), and anyone in the early stages of thinning where preventive action can have maximum impact." },
    { q: "How often do I need to use it?", a: "Most devices are designed for 3 sessions per week, each lasting 20–30 minutes. Consistency is critical — irregular use significantly reduces efficacy. The cap is worn at home, so sessions can fit easily into your daily routine (watching TV, reading, working from home)." },
    { q: "Are there any side effects?", a: "LLLT is considered extremely safe. At therapeutic doses, it produces no heat damage, no ionizing radiation, and no systemic effects. Rare reports of scalp sensitivity or temporary mild headaches exist but are uncommon. There are no drug interactions and no contraindications for most patients." },
    { q: "Can I use LLLT with other hair loss treatments?", a: "Yes — and we encourage it. The multi-pathway approach is most effective: finasteride/dutasteride prevents DHT-driven miniaturization, minoxidil stimulates growth, and LLLT reduces inflammation and improves cellular energy. All three mechanisms are complementary and safe to combine. Your physician will design the right combination protocol for your situation." },
  ],
};

export function RedLightLaserCapPage() { return <PeptideLandingPage data={data} />; }
