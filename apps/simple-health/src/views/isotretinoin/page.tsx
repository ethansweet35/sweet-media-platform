import { PeptideLandingPage, type PeptideLandingData } from "@/components/pages/medication/PeptideLandingPage";

const IMG = "https://zxpkxysqzxozgocfuvug.supabase.co/storage/v1/object/public/site-assets/images/wp-migrated";

const data: PeptideLandingData = {
  slug: "isotretinoin",
  efficacyTier: "Acne Help",
  name: "Isotretinoin",
  headline: "The definitive treatment for severe acne",
  startingPrice: "Starting at $99/Mo",
  delivery: "Daily oral capsule",
  resultsIn: "Results in 4–6 months",
  description:
    "The only prescription treatment that simultaneously addresses all four root causes of acne — sebum overproduction, follicular hyperkeratinization, bacterial colonization, and inflammation. When other treatments fail, isotretinoin delivers lasting clearance that no topical can achieve.",
  heroImage: `${IMG}/Untitled-design-2026-03-19T114634-009.png`,

  mechanismTitle: "Four causes. One treatment.",
  mechanismSubtitle:
    "Most acne treatments target one or two causes. Isotretinoin is unique — it works at all four simultaneously, which is why it produces clearance that other treatments simply cannot match.",

  mechanisms: [
    {
      name: "Sebum Reduction",
      badge: "Sebaceous Glands",
      description:
        "Isotretinoin shrinks sebaceous (oil) glands by up to 90% and dramatically reduces sebum production — removing the primary fuel for acne. This reduction persists long after the course ends, which is why many patients experience permanent clearance.",
      result: "Result: 90% reduction in sebum production, lasting months to years post-treatment",
    },
    {
      name: "Pore Clearing",
      badge: "Follicular Keratinization",
      description:
        "Normalizes the abnormal shedding of skin cells inside hair follicles (hyperkeratinization) that creates the clogged pores and microcomedones at the root of all acne. No pore clogging means no new pimples can form.",
      result: "Result: Prevents microcomedone formation — stops acne at its origin",
    },
    {
      name: "Bacterial Control",
      badge: "C. Acnes Colonization",
      description:
        "By dramatically reducing sebum, isotretinoin removes the nutrient source that C. acnes (acne bacteria) requires to survive and multiply. The bacteria population collapses — without the need for antibiotics or external bactericidal agents.",
      result: "Result: Significant reduction in C. acnes without developing antibiotic resistance",
    },
    {
      name: "Anti-Inflammatory",
      badge: "Inflammatory Cascade",
      description:
        "Directly reduces the inflammatory response that converts microcomedones into red, painful pimples, cysts, and nodules. This prevents the scarring and post-inflammatory hyperpigmentation that cause long-term skin damage.",
      result: "Result: Reduced inflammatory lesions and prevention of permanent acne scarring",
    },
  ],

  benefits: [
    {
      icon: "ri-sparkling-2-line",
      title: "Long-lasting clearance",
      description:
        "85% of patients achieve long-lasting or permanent acne clearance after a standard 5–6 month course — results no topical treatment can match.",
    },
    {
      icon: "ri-droplet-line",
      title: "90% sebum reduction",
      description:
        "Shrinks sebaceous glands dramatically, eliminating the root cause of acne rather than just treating breakouts as they appear.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Prevents scarring",
      description:
        "Stops inflammatory acne before it can cause the permanent dermal damage that leaves lasting scars, pits, and hyperpigmentation.",
    },
    {
      icon: "ri-body-scan-line",
      title: "Treats all body acne",
      description:
        "Effective for facial, back, chest, and shoulder acne simultaneously — the systemic delivery addresses all sebaceous glands at once.",
    },
    {
      icon: "ri-recycle-line",
      title: "Often permanent",
      description:
        "Many patients require only one course. Some studies show up to 60–70% of patients never need retreatment after completing a full course.",
    },
    {
      icon: "ri-stethoscope-line",
      title: "Physician-monitored",
      description:
        "Monthly check-ins with your dermatologist track your response, adjust dosing, and monitor for the rare side effects that require dose modification.",
    },
  ],

  timeline: [
    {
      phase: "Weeks 1–4",
      title: "Initial Adjustment Period",
      description:
        "Some patients experience an initial flare as cell turnover accelerates. This is normal and temporary. Dryness of lips and skin typically begins and is easily managed with moisturizer.",
    },
    {
      phase: "Month 2",
      title: "Sebum Reduction Begins",
      description:
        "Visible reduction in skin oiliness. New breakouts begin to decrease as sebum production drops. Most patients notice their skin becoming less shiny.",
    },
    {
      phase: "Months 3–4",
      title: "Dramatic Clearing",
      description:
        "For most patients, this is when the transformation becomes obvious. Significant reduction in active lesions, fading of inflammatory redness, and improved skin texture.",
    },
    {
      phase: "Month 5–6",
      title: "Standard Course Completion",
      description:
        "Final weeks of treatment. Most patients are near-clear or fully clear at this point. Cumulative dose calculations help your physician determine course length.",
    },
    {
      phase: "Post-Treatment",
      title: "Long-Term Clearance",
      description:
        "The dramatic reduction in sebum production and sebaceous gland size persists long after stopping. 85% of patients maintain long-lasting improvement — many permanently.",
    },
  ],

  faqs: [
    {
      q: "Is Isotretinoin safe? I've heard scary stories about Accutane.",
      a: "Isotretinoin has been studied for over 40 years and is considered safe when properly monitored. The most important consideration is pregnancy prevention — it causes severe birth defects and we require monthly pregnancy testing for patients who can become pregnant. Side effects like dryness are common but manageable. Serious side effects are rare when the medication is properly dosed and monitored. Millions of patients have completed courses safely.",
    },
    {
      q: "Who is a candidate for isotretinoin?",
      a: "Isotretinoin is typically prescribed for: moderate-to-severe acne that hasn't responded to antibiotics or topicals, acne causing scarring, cystic or nodular acne, or severe acne causing significant psychological distress. Our intake will assess your acne severity and treatment history to determine if isotretinoin is the right approach for you.",
    },
    {
      q: "What monitoring is required?",
      a: "Monthly visits (telehealth) with your physician are required throughout the course. Bloodwork (liver function, lipids, CBC) is checked at baseline and periodically. Patients who can become pregnant must use two forms of contraception and take monthly pregnancy tests — this is required by the FDA's iPLEDGE program. We handle all monitoring coordination for you.",
    },
    {
      q: "How long does a course last?",
      a: "A standard course is 5–6 months, though your physician calculates the target cumulative dose based on your body weight. Higher starting doses can shorten the course but may increase side effects. Longer courses may be recommended for very severe or widespread acne. Most patients need only one course.",
    },
    {
      q: "Will the acne come back after I stop?",
      a: "For most patients — no. Studies show 85% maintain long-lasting improvement after a full course. Some patients need a second course, particularly those who were treated at younger ages or lower cumulative doses. If acne does return, it's usually milder and responds well to topical treatments. Tretinoin as maintenance after isotretinoin is a common and effective approach.",
    },
  ],
};

export function IsotretinoinPage() {
  return <PeptideLandingPage data={data} />;
}
