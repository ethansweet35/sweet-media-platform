import ConditionPage, { type ConditionData } from "./ConditionPage";

const data: ConditionData = {
  heroImage: "add_opiate_hero01.jpg",
  heroImageAlt: "Warm natural light through windows of a peaceful healing room in a luxury treatment center in Orange County California",
  category: "Opiate Addiction",
  headline: "Opiate &",
  headlineEmphasis: "Opioid Addiction",
  subhead: "Opioid use disorder has the highest overdose mortality of any substance use disorder. Evidence-based treatment — combining medication-assisted treatment (MAT) with therapy and psychiatric support — dramatically improves survival and recovery outcomes.",
  quickFacts: [
    { value: "80K+",   label: "US Overdose Deaths / Year" },
    { value: "MAT",    label: "Gold-Standard Treatment" },
    { value: "50%",    label: "Relapse Risk Reduction with MAT" },
    { value: "1:3",    label: "Staff-Client Ratio" },
  ],
  overviewTitle: "Understanding Opioid Use Disorder",
  overviewCol1: [
    "Opioids include heroin, fentanyl, oxycodone, hydrocodone, morphine, and other prescription and illicit drugs that bind to the mu-opioid receptors in the brain, producing pain relief, euphoria, and sedation. With repeated use, the brain adapts — requiring increasingly higher doses for the same effect and producing intense withdrawal when use stops.",
    "Opioid use disorder (OUD) is the single most lethal substance use disorder — driven in large part by fentanyl contamination of the illicit supply. A single dose can cause fatal respiratory depression. This makes the window for intervention genuinely urgent: OUD is a life-threatening condition that requires immediate, effective treatment.",
  ],
  overviewCol2: [
    "The neurobiological changes produced by chronic opioid use go beyond physical dependence. The brain's endogenous opioid system — involved in pain regulation, stress response, emotional processing, and social bonding — is profoundly disrupted. Recovery requires time for these systems to normalize.",
    "Medication-assisted treatment (MAT) with buprenorphine-based medications is the gold-standard, evidence-based treatment for OUD — endorsed by SAMHSA, the American Society of Addiction Medicine, and the CDC. MAT dramatically reduces overdose mortality, relapse rates, and criminal justice involvement when delivered alongside appropriate therapy and support.",
  ],
  physicalSymptoms: [
    { text: "Physical dependence — withdrawal symptoms when dose is reduced or missed" },
    { text: "Tolerance — needing increasing doses to achieve the same effect" },
    { text: "Opioid withdrawal: nausea, vomiting, diarrhea, muscle aches, sweating, insomnia" },
    { text: "Track marks, infections, or vein damage with IV use" },
    { text: "Constipation, weight loss, and physical neglect" },
    { text: "Sedation, slurred speech, and slowed breathing during use" },
  ],
  behavioralSymptoms: [
    { text: "Compulsive use despite knowing it is causing serious harm" },
    { text: "Spending disproportionate time and resources obtaining opioids" },
    { text: "Doctor shopping, prescription fraud, or using illicit supply" },
    { text: "Withdrawal from relationships, work, and responsibilities" },
    { text: "Using alone, or using in increasingly risky ways to manage tolerance" },
    { text: "Using despite overdoses, hospitalizations, or near-deaths" },
  ],
  consequences: [
    {
      icon: "ri-heart-pulse-line",
      title: "Overdose & Death Risk",
      desc: "Fentanyl contamination of the illicit supply has made opioid overdose an ever-present risk with every single use. Tolerance loss during even brief periods of abstinence (hospitalization, incarceration, prior treatment) makes return to use particularly lethal. Naloxone (Narcan) access is essential — but treatment is the only sustainable solution.",
    },
    {
      icon: "ri-brain-line",
      title: "Neurological & Emotional Impact",
      desc: "Chronic opioid use disrupts the brain's endogenous opioid system, dysregulating pain processing, stress response, emotional regulation, and social bonding. Protracted withdrawal — persistent dysphoria, anxiety, and sleep disruption lasting weeks to months after acute withdrawal — is a major driver of relapse.",
    },
    {
      icon: "ri-group-line",
      title: "Social & Life Consequences",
      desc: "OUD destroys professional functioning, finances, and relationships with a speed and thoroughness matched by few other conditions. The stigma associated with opioid addiction creates additional barriers to care — barriers that our team is committed to dismantling through non-judgmental, evidence-based treatment.",
    },
  ],
  treatmentSteps: [
    {
      title: "Medical Detox & MAT Induction",
      desc: "Medically supervised management of opioid withdrawal, followed by induction onto buprenorphine (Suboxone) or buprenorphine/naloxone. MAT dramatically reduces withdrawal discomfort and craving intensity, enabling engagement with the therapeutic dimensions of treatment.",
      detail: "Buprenorphine induction requires careful timing relative to last opioid use to avoid precipitated withdrawal. Our physicians manage this process with precision.",
    },
    {
      title: "Ongoing MAT Management",
      desc: "Continued buprenorphine-based MAT throughout PHP, IOP, and outpatient phases. Regular medication reviews, dose optimization, and transition planning as recovery progresses.",
      detail: "Research shows that abrupt discontinuation of MAT significantly increases relapse and overdose risk. Duration of MAT is individualized — there is no clinical mandate to taper before a patient is clinically ready.",
    },
    {
      title: "Psychiatric Assessment & Dual Diagnosis",
      desc: "Assessment and treatment of co-occurring depression, anxiety, PTSD, or other psychiatric conditions. These are extremely common in OUD and require the same clinical attention as the addiction itself.",
      detail: "Trauma is one of the most prevalent co-occurring conditions in opioid use disorder. EMDR and trauma-informed care are integrated where indicated.",
    },
    {
      title: "CBT, DBT & Group Therapy",
      desc: "Cognitive Behavioral Therapy addresses relapse triggers, craving management, and the thought patterns underlying opioid use. DBT provides emotional regulation tools. Group therapy builds the peer community that is one of the strongest protective factors in OUD recovery.",
      detail: "Peer support and community connection are particularly important in opioid recovery given the profound social isolation that often accompanies active OUD.",
    },
    {
      title: "Long-Term Recovery & Overdose Prevention",
      desc: "Relapse prevention planning, Narcan access and training, sober housing referrals where appropriate, and ongoing clinical support through the extended recovery process. Alumni program and continuing care are available.",
      detail: "The risk of fatal overdose following a relapse after abstinence is elevated due to tolerance loss. Overdose prevention education is a non-negotiable component of every OUD discharge plan.",
    },
  ],
  faqs: [
    {
      q: "What is the difference between opiates and opioids?",
      a: "Technically, 'opiates' refers to naturally derived compounds from the opium poppy (morphine, heroin, codeine), while 'opioids' is the broader term encompassing all drugs that bind to opioid receptors — including semi-synthetic (oxycodone, hydrocodone) and fully synthetic (fentanyl, methadone) compounds. In clinical practice the terms are often used interchangeably, and 'opioid use disorder' (OUD) is the current diagnostic term covering all of these substances.",
    },
    {
      q: "Is buprenorphine (Suboxone) just substituting one drug for another?",
      a: "No. This is one of the most persistent and harmful misconceptions in addiction treatment. Buprenorphine is a partial opioid agonist that, at therapeutic doses, stabilizes opioid receptors without producing the euphoria or dangerous respiratory depression of full agonists. It eliminates withdrawal and dramatically reduces craving — enabling the neurological stability and psychological engagement necessary for recovery. Multiple large-scale clinical trials and decades of real-world evidence demonstrate that MAT with buprenorphine reduces overdose mortality by up to 50%, dramatically outperforming non-medication approaches. Withholding MAT from patients with OUD is not a more rigorous approach to recovery — it is a more dangerous one.",
    },
    {
      q: "How long should I stay on MAT?",
      a: "The evidence strongly supports maintaining MAT for at least 1–2 years, and longer for many patients. The risk of relapse and overdose death is significantly elevated in the months following MAT discontinuation — particularly premature discontinuation. The decision to taper off buprenorphine should be made collaboratively between patient and physician when the clinical picture supports it: stable recovery, strong social support, effective coping skills, and genuine intrinsic motivation — not external pressure or arbitrary timelines.",
    },
    {
      q: "What should I do if someone I love is overdosing?",
      a: "Call 911 immediately and administer naloxone (Narcan) if available. Narcan reverses opioid overdose and is available without a prescription at most pharmacies. If the person is unconscious, perform rescue breathing if trained. Place them in the recovery position to prevent aspiration. Fentanyl overdoses may require multiple Narcan doses. California has a Good Samaritan law protecting individuals who call 911 for an overdose emergency. After the immediate crisis, contact Rize OC for a discussion about treatment options.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-pulse-line",
      label: "First Step",
      title: "Drug & Alcohol Detox",
      desc: "Medically supervised opioid withdrawal management and buprenorphine induction.",
      href: "/drug-alcohol-detox",
    },
    {
      icon: "ri-sun-line",
      label: "Intensive Care",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily clinical programming with MAT oversight and integrated psychiatric support.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Flexible Recovery",
      title: "Intensive Outpatient (IOP)",
      desc: "Continued MAT management, CBT, and group therapy woven into daily life.",
      href: "/iop-program-orange-county",
    },
  ],
};

export default function Page() {
  return <ConditionPage data={data} />;
}
