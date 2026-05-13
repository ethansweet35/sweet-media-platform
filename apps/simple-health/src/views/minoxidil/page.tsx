import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "minoxidil", efficacyTier: "Growth Stimulator", name: "Oral Minoxidil", headline: "High-performance hair restoration",
  startingPrice: "Starting at $99/Mo", delivery: "Once-daily oral tablet", resultsIn: "Visible results in 3–6 months",
  description: "A vasodilator that prolongs the anagen (growth) phase of the hair cycle and increases blood flow to follicles. Low-dose oral minoxidil produces stronger, more consistent results than topical formulations — and works for all hair loss types, including those who haven't responded to topical treatment.",
  heroImage: `${IMG}/Untitled-design-2026-03-23T121256-659.png`,
  mechanismTitle: "Stimulate growth. Extend the growth cycle.",
  mechanismSubtitle: "Unlike DHT blockers that prevent loss, minoxidil directly stimulates hair follicles to produce new growth — making it the essential complement to finasteride/dutasteride.",
  mechanisms: [
    { name: "Anagen Extension", badge: "Hair Cycle Modulation", description: "Prolongs the anagen (active growth) phase of the hair cycle while shortening the telogen (resting) phase. This means more follicles are actively producing hair at any given time — increasing density and thickness.", result: "Result: More hairs in the growth phase simultaneously, visibly increased density" },
    { name: "Vasodilation", badge: "Increased Blood Flow", description: "As a potassium channel opener and vasodilator, minoxidil increases blood flow to hair follicles — delivering more oxygen, nutrients, and growth factors to support active hair production. This is why oral minoxidil reaches all follicles, not just the scalp areas you apply topical to.", result: "Result: Systemically improved follicle nutrition for whole-scalp coverage" },
    { name: "Follicle Enlargement", badge: "Miniaturization Reversal", description: "Clinically shown to increase follicle diameter and stimulate miniaturized follicles back to their original size. This not only creates new growth but restores the thickness and quality of existing thinning hairs.", result: "Result: Thicker, stronger individual hairs alongside increased density" },
  ],
  benefits: [
    { icon: "ri-arrow-up-line", title: "Increases hair density", description: "Visible improvements in hair density and thickness for both men and women with androgenetic alopecia." },
    { icon: "ri-sparkles-line", title: "Whole-scalp coverage", description: "Oral minoxidil reaches all follicles systemically — no application gaps, no missed areas, consistent treatment everywhere." },
    { icon: "ri-sparkling-2-line", title: "Works for all hair loss types", description: "Effective for androgenetic alopecia, diffuse thinning, and patients who didn't respond to topical minoxidil." },
    { icon: "ri-capsule-line", title: "Superior to topical", description: "Clinical evidence supports stronger, more consistent results from low-dose oral vs. topical foam — with the added convenience of no mess or scalp application." },
    { icon: "ri-men-line", title: "Proven for men and women", description: "Clinically validated for both male pattern baldness and female pattern hair loss — one of the few treatments effective across both sexes." },
    { icon: "ri-links-line", title: "Combines well with DHT blockers", description: "Finasteride prevents further loss; minoxidil stimulates growth. The combination is the gold standard for comprehensive hair restoration." },
  ],
  timeline: [
    { phase: "Weeks 1–8", title: "Initial Shedding Phase", description: "Many patients experience increased shedding in the first 4–8 weeks as minoxidil resets the hair cycle. This is a positive sign — old hairs shed to make way for healthier growth." },
    { phase: "Months 2–4", title: "Growth Phase Shift", description: "Shedding resolves. New, thicker hairs begin emerging. Hair feels different in texture — often stronger and more substantial than before." },
    { phase: "Months 4–6", title: "Visible Density Improvements", description: "Most patients notice clearly visible improvements in density by month 4–6. Thinning areas look fuller. Coverage of the scalp improves." },
    { phase: "Months 6–12", title: "Progressive Gains", description: "Continued improvement as more follicles complete growth cycles. Hair diameter increases. The cumulative effect of sustained anagen extension becomes apparent." },
    { phase: "12–24 Months", title: "Peak Results", description: "Maximum density and thickness achieved. Long-term use maintains results — stopping minoxidil will eventually result in gradual loss of the gains." },
  ],
  faqs: [
    { q: "Why oral minoxidil instead of topical?", a: "Clinical studies show oral minoxidil produces stronger, more consistent results than topical formulations in most patients. It eliminates the compliance challenge of daily scalp application, reaches all follicles systemically (not just where you apply), and avoids the scalp irritation some patients experience with topical. The tradeoff is potential systemic side effects (fluid retention, increased body hair) that don't occur with topical — your physician will weigh these against the benefits." },
    { q: "What are the side effects of oral minoxidil?", a: "The most common side effects are temporary increased hair shedding in the first 8 weeks (a positive sign), mild fluid retention in some patients, and potential for increased fine body hair (hypertrichosis). These are dose-dependent and typically manageable. Serious cardiovascular side effects occur at much higher doses than those used for hair loss. Your physician monitors for these during check-ins." },
    { q: "Can women use oral minoxidil?", a: "Yes — oral minoxidil is one of the few effective treatments for female pattern hair loss. Women typically use lower doses (0.625–2.5mg daily) than men (2.5–5mg). It's particularly valuable for women who can't take DHT blockers. Your physician will determine the appropriate dose based on your hair loss pattern and health history." },
    { q: "How does it work with finasteride or dutasteride?", a: "Minoxidil and DHT blockers work through completely different mechanisms and are safe to combine. Finasteride/dutasteride blocks DHT to prevent further miniaturization. Minoxidil stimulates active growth. Together, they produce superior results to either alone — this combination is the gold standard protocol for comprehensive hair restoration." },
    { q: "Will my hair fall out again if I stop?", a: "Yes, eventually. Minoxidil manages the condition; it doesn't cure it. If you stop, the anagen extension effect fades and hair loss gradually resumes over 6–12 months. Most patients maintain daily use long-term, as once-daily oral dosing is highly convenient compared to more invasive alternatives." },
  ],
};

export function MinoxidilPage() { return <PeptideLandingPage data={data} />; }
