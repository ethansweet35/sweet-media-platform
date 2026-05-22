import SubstancePageTemplate, { type SubstancePageData } from "@/views/shared/SubstancePageTemplate";

const BASE = "https://ahufsygjwpbymomfdazb.supabase.co/storage/v1/object/public/site-assets/images";

const data: SubstancePageData = {
  heroImage: `${BASE}/nbt_benzo_hero01.jpg`,
  heroImageAlt: "Person resting safely in a medical detox room during benzodiazepine withdrawal at Northbound Treatment",
  substanceName: "Benzodiazepines",
  heroHeadline: "Benzodiazepine Addiction Treatment",
  heroItalicWord: "Addiction",
  heroBody:
    "Xanax, Valium, Klonopin, Ativan — benzodiazepines are among the most prescribed drugs in America and among the most dangerous to stop without medical help. Northbound's medically supervised benzo detox and treatment program provides the safest, most clinically rigorous path to recovery.",

  whatItIsHeadline: "What Is Benzodiazepine Addiction?",
  whatItIsBody: [
    "Benzodiazepines (benzos) are a class of prescription sedatives that work by enhancing the effect of GABA — the brain's primary inhibitory neurotransmitter. Prescribed for anxiety, panic disorder, insomnia, and seizures, medications like Xanax (alprazolam), Valium (diazepam), Klonopin (clonazepam), and Ativan (lorazepam) are highly effective short-term. But physical dependence can develop in as little as 2–4 weeks of daily use.",
    "Benzodiazepine withdrawal is uniquely dangerous among substance use disorders. Unlike most drugs, abrupt discontinuation of benzos after prolonged use can cause grand mal seizures, delirium, and in rare cases death. This makes attempting to stop without medical supervision not just uncomfortable — but potentially life-threatening. A gradual, physician-managed taper is the medically accepted standard of care.",
    "Psychological dependence on benzodiazepines is also profound. Many clients describe an inability to manage normal anxiety, social situations, or sleep without medication — a rebound effect that the drug itself creates over time. Comprehensive treatment must address both the physical dependence and the anxiety and emotional dysregulation underneath it.",
  ],
  whatItIsImage: `${BASE}/nbt_benzo_therapy01.jpg`,
  whatItIsImageAlt: "Doctor reviewing benzodiazepine taper plan with patient in clinical setting at Northbound Treatment",
  quickStats: [
    { value: "30M+", label: "Benzo prescriptions written annually in the U.S." },
    { value: "2–4 wks", label: "Time until physical dependence can form" },
    { value: ">97%", label: "Drug abstinence rate in Northbound's USC outcomes study" },
  ],

  warningBody:
    "Benzodiazepine dependency often develops in people following a legitimate prescription, making it difficult to recognize. These are the clinical signs that use has crossed into addiction.",
  warningSigns: [
    "Needing higher doses to achieve the same calming effect (tolerance)",
    "Experiencing anxiety, insomnia, or irritability when a dose is missed",
    "Taking more benzos than prescribed, or using prescriptions from multiple doctors",
    "Continuing use despite negative consequences — at work, in relationships, or health",
    "Unsuccessful attempts to reduce or stop use on your own",
    "Using benzos alongside alcohol or opioids to intensify effects",
    "Feeling unable to cope with ordinary stress, anxiety, or sleep without medication",
    "Hiding or minimizing benzo use from family members or your doctor",
    "Memory gaps, blackouts, or cognitive impairment from benzo use",
    "Obtaining benzos illegally or via the internet after prescription is discontinued",
  ],

  recoveryHeadline: "What Benzo Recovery Looks Like at Northbound",
  recoveryIntro:
    "Because of benzodiazepine withdrawal's medical risk, recovery must begin with a physician-supervised detox and taper. Northbound's clinical team designs individualized taper protocols that prioritize both safety and comfort — providing the foundation for lasting recovery.",
  careSteps: [
    {
      phase: "Days 1–30+",
      title: "Medical Detox & Supervised Taper",
      icon: "ri-heart-pulse-line",
      body: "Benzo detox is never abrupt at Northbound. Our physicians design a gradual dose-reduction protocol — often converting to longer-acting benzodiazepines like diazepam before tapering — supported by 24/7 clinical monitoring, anti-seizure precautions, and comfort medications. The taper timeline is individualized based on the specific drug, dose, and duration of use.",
    },
    {
      phase: "Weeks 4–16+",
      title: "Residential Inpatient Treatment",
      icon: "ri-home-heart-line",
      body: "Following medical stabilization, residential treatment addresses the anxiety, insomnia, and emotional dysregulation that drove benzo use and that persist during early recovery. Individual therapy, group counseling, and evidence-based modalities — particularly CBT for anxiety and sleep — are the core of this phase.",
    },
    {
      phase: "Month 3–5",
      title: "Partial Hospitalization Program (PHP)",
      icon: "ri-sun-line",
      body: "PHP provides 5 days per week of structured programming as clients build capacity to manage anxiety, stress, and sleep without medication. Anxiety management, mindfulness, and sleep hygiene are foundational elements alongside ongoing therapy.",
    },
    {
      phase: "Month 4–6",
      title: "Virtual IOP (HomeBound)",
      icon: "ri-wifi-line",
      body: "Virtual IOP allows gradual reintegration into daily life while maintaining robust therapeutic support. Clients practice new coping strategies in real-world contexts, with ongoing psychiatric monitoring to address any protracted withdrawal symptoms.",
    },
    {
      phase: "Ongoing",
      title: "Continued Psychiatric Care & Aftercare",
      icon: "ri-refresh-line",
      body: "Post-acute withdrawal syndrome (PAWS) — including anxiety and sleep disruption — can persist for months after benzo cessation. Northbound's aftercare plan includes ongoing psychiatric follow-up, alumni support, and access to continued therapy as needed.",
    },
  ],

  differentiators: [
    {
      icon: "ri-shield-check-line",
      title: "Medically Safe Taper Protocol",
      body: "Abrupt benzo cessation can cause fatal seizures. Northbound's physicians design and supervise individualized taper schedules — the only medically safe approach to benzodiazepine withdrawal.",
    },
    {
      icon: "ri-brain-line",
      title: "Anxiety Treatment Expertise",
      body: "Most benzo-dependent clients have underlying anxiety disorders. Our dual-diagnosis psychiatrists treat the anxiety driving the dependency — not just the dependency itself — dramatically improving long-term outcomes.",
    },
    {
      icon: "ri-moon-line",
      title: "Sleep Restoration",
      body: "Insomnia is one of the most persistent benzo withdrawal symptoms. Northbound's treatment includes dedicated sleep hygiene protocols and CBT-I (Cognitive Behavioral Therapy for Insomnia) to restore natural sleep patterns.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "24/7 Medical Oversight",
      body: "Benzo withdrawal requires round-the-clock monitoring during the acute phase. Northbound's clinical staff is on-site and reachable at all hours, with seizure protocols in place from day one.",
    },
    {
      icon: "ri-group-line",
      title: "Peer Community in Recovery",
      body: "Many benzo-dependent individuals feel alone in their struggle — particularly those who developed dependency through a legitimate prescription. Northbound's group program connects clients with peers who understand their specific experience.",
    },
    {
      icon: "ri-award-line",
      title: "38+ Years of Clinical Excellence",
      body: "Northbound has been treating complex substance use disorders — including prescription drug dependency — since 1987. Our USC-verified outcomes reflect what nearly four decades of clinical refinement produce.",
    },
  ],

  closingImage: `${BASE}/nbt_benzo_hero01.jpg`,
  closingImageAlt: "Person resting in safe recovery from benzodiazepine dependency at Northbound Treatment",
  closingHeadline: "Safe, Medically Supervised Benzo Recovery Starts Here",
  closingBody: [
    "Stopping benzodiazepines on your own is dangerous — and it doesn't have to be that way. Northbound's medical team has guided hundreds of clients through safe, gradual benzo detox and comprehensive treatment.",
    "Our admissions team is available 24 hours a day, 7 days a week. The call is free and confidential. If you're struggling with benzodiazepine dependency — whether from a prescription or not — we can help you find a safer path forward.",
  ],
  closingQuote: "You didn't choose dependency — but you can choose recovery. We'll make sure the medical piece is handled.",

  faqs: [
    {
      question: "Can benzodiazepine withdrawal really be fatal?",
      answer:
        "Yes — in rare cases, abrupt benzodiazepine withdrawal after prolonged, heavy use can cause grand mal seizures and death. This risk is highest with short-acting benzos like Xanax and Ativan. This is why medical supervision is essential and why Northbound never abruptly discontinues benzodiazepines — a gradual, physician-managed taper is always used.",
    },
    {
      question: "I was prescribed benzos by my doctor. Does that make my dependency any different?",
      answer:
        "Not clinically — the brain doesn't distinguish between prescribed and non-prescribed use. Many clients arrive at Northbound after a legitimate prescription escalated into dependency. There is no judgment, and the treatment pathway is the same: a safe, medically supervised taper followed by comprehensive therapy.",
    },
    {
      question: "How long does benzodiazepine detox take?",
      answer:
        "Benzo detox is typically slower than other substances because of the seizure risk associated with rapid dose reduction. A taper can last anywhere from a few weeks to several months depending on the drug, dose, and duration of use. Northbound's physicians customize the timeline for each individual client.",
    },
    {
      question: "What does Northbound do to treat the underlying anxiety?",
      answer:
        "Our psychiatrists assess every client for anxiety disorders and prescribe non-benzo alternatives where appropriate (SSRIs, SNRIs, buspirone, hydroxyzine). Simultaneously, our therapists provide CBT for anxiety, mindfulness training, and exposure-based techniques to address anxiety without medication dependence.",
    },
    {
      question: "Will I need benzos for the rest of my life to manage my anxiety?",
      answer:
        "No. While benzodiazepines can feel irreplaceable during active use, the anxiety they appear to treat is often the anxiety they create. Evidence-based therapies — particularly CBT — have strong clinical data showing sustained anxiety reduction without long-term medication dependence.",
    },
    {
      question: "Does Northbound accept insurance for benzodiazepine treatment?",
      answer:
        "Yes. Northbound works with Aetna, Anthem, Cigna, Tricare, and other major insurers. Our admissions team verifies your benefits at no cost before treatment begins. Call (866) 311-0003 for a free, confidential insurance verification.",
    },
  ],

  substanceNameShort: "Benzodiazepines",
  relatedSubstances: [
    { label: "Prescription Drugs", href: "/treatment/prescription/", icon: "ri-medicine-bottle-line" },
    { label: "Alcohol", href: "/treatment/alcoholism/", icon: "ri-drop-line" },
    { label: "Anxiety Disorders", href: "/treatment/dual-diagnosis/treatment-for-anxiety-disorders/", icon: "ri-mental-health-line" },
    { label: "Dual Diagnosis", href: "/treatment/dual-diagnosis/", icon: "ri-brain-line" },
    { label: "Opioid Addiction", href: "/treatment/opioid/", icon: "ri-heart-pulse-line" },
    { label: "Medication-Assisted Treatment", href: "/treatment/medication-assisted-treatment/", icon: "ri-capsule-line" },
  ],
};

export default function BenzodiazepinePage() {
  return <SubstancePageTemplate data={data} />;
}
