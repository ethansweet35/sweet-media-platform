import ConditionPage, { type ConditionData } from "./ConditionPage";

const data: ConditionData = {
  hideHeroForm: true,
  heroImage: "add_xanax_hero01.jpg",
  heroImageAlt: "Tranquil Japanese healing garden with autumn maple tree representing calm and recovery near Orange County California",
  category: "Xanax Addiction",
  headline: "Xanax",
  headlineEmphasis: "Dependence",
  subhead: "Xanax (alprazolam) is one of the most commonly prescribed and most frequently misused benzodiazepines. Its short half-life creates intense between-dose craving and makes safe discontinuation a medical priority requiring physician supervision.",
  quickFacts: [
    { value: "#1",    label: "Most Prescribed Benzo" },
    { value: "Short", label: "Half-Life (6–12 hrs)" },
    { value: "Rapid", label: "Dependence Development" },
    { value: "Taper", label: "Medical Protocol Required" },
  ],
  overviewTitle: "Understanding Xanax Dependence",
  overviewCol1: [
    "Xanax (alprazolam) is a short-acting benzodiazepine — the most commonly prescribed in the United States and one of the most frequently misused. It is prescribed primarily for anxiety disorders and panic disorder. Its rapid onset and short half-life (6–12 hours) make it highly effective for acute anxiety — and particularly prone to producing intense between-dose craving and rapid physical dependence.",
    "Unlike longer-acting benzodiazepines like Valium (diazepam), Xanax's short half-life means that physical withdrawal symptoms begin within hours of a missed dose rather than days. This creates a cycle where individuals experience withdrawal-driven anxiety that is relieved only by taking more Xanax — a cycle that makes both the psychological dependence and the physical consequences more intense.",
  ],
  overviewCol2: [
    "Xanax dependence can develop at therapeutic doses within weeks of regular use — meaning many individuals who are prescribed Xanax by their physician develop physical dependence without any intent to misuse the medication. This is not addiction in every case, but it does require careful medical management to discontinue safely.",
    "Abrupt discontinuation of Xanax — even after weeks of therapeutic use — can produce severe withdrawal symptoms including seizures. Because of the short half-life, withdrawal begins quickly and can escalate rapidly. This is a medical emergency, not a matter of willpower, and requires physician supervision.",
  ],
  physicalSymptoms: [
    { text: "Intense rebound anxiety and panic between doses or when doses are missed" },
    { text: "Physical withdrawal within hours of missed doses — sweating, tremors, nausea" },
    { text: "Tolerance requiring dose increases to maintain anxiolytic effect" },
    { text: "Seizure risk with abrupt discontinuation or rapid dose reduction" },
    { text: "Sedation, cognitive fog, and impaired memory at higher doses" },
    { text: "Headaches, dizziness, and muscle tension as effects wear off" },
  ],
  behavioralSymptoms: [
    { text: "Taking Xanax more frequently or at higher doses than prescribed" },
    { text: "Running out of prescription early and seeking refills or other sources" },
    { text: "Significant anxiety or panic when supply is running low" },
    { text: "Inability to manage anxiety without Xanax even in previously manageable situations" },
    { text: "Concealing the extent of use from prescribers or family" },
    { text: "Continued use despite knowing it is causing cognitive or functional problems" },
  ],
  consequences: [
    {
      icon: "ri-brain-line",
      title: "Cognitive & Psychological",
      desc: "Chronic Xanax use produces measurable cognitive impairment — particularly in memory encoding and processing speed. Paradoxically, it worsens anxiety over time as the brain compensates for chronic GABA enhancement. Emotional blunting, depression, and difficulty with authentic emotional processing are common.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Medical Dangers of Withdrawal",
      desc: "Xanax withdrawal is medically dangerous — more so than most benzodiazepines because of its short half-life and the rapidity with which withdrawal escalates. Seizures can occur within 24–48 hours of abrupt cessation. This makes any self-managed withdrawal attempt high-risk, and physician-supervised tapering essential.",
    },
    {
      icon: "ri-group-line",
      title: "Functional Consequences",
      desc: "The cognitive fog, emotional blunting, and schedule demands of managing tolerance and supply affect professional performance and relationships. Many individuals become functionally dependent — genuinely unable to manage daily life without Xanax — even at doses that are nominally therapeutic.",
    },
  ],
  treatmentSteps: [
    {
      title: "Physician Evaluation & Conversion Protocol",
      desc: "Medical assessment of Xanax use history, current dose, duration, and any withdrawal history. Design of a conversion protocol — typically to a longer-acting benzodiazepine (diazepam) — to enable more manageable, gradual tapering.",
      detail: "Conversion to diazepam is the standard approach for Xanax tapering because its longer half-life smooths out the sharp peaks and troughs of Xanax's short half-life, making the taper more physiologically stable.",
    },
    {
      title: "Medically Supervised Taper",
      desc: "Gradual, physician-supervised dose reduction with regular monitoring. Adjunct medications — anti-seizure agents, beta-blockers — used as clinically indicated to manage specific withdrawal symptoms.",
      detail: "The taper pace is always individualized. A common framework is 5–10% dose reduction every 1–2 weeks, adjusted based on symptom severity and clinical response.",
    },
    {
      title: "Anxiety Treatment: Non-Benzo Approaches",
      desc: "SSRIs and SNRIs for the underlying anxiety disorder. CBT for anxiety — particularly exposure-based approaches — addressing the anxiety directly rather than pharmacologically suppressing it.",
      detail: "The long-term evidence for CBT in anxiety disorders is equivalent to or exceeds medication — without the dependence liability. Building this non-pharmacological capacity is central to sustainable Xanax recovery.",
    },
    {
      title: "CBT for Anxiety & Panic",
      desc: "Cognitive Behavioral Therapy for anxiety and panic disorder — including interoceptive exposure, cognitive restructuring, and mindfulness-based anxiety management skills.",
      detail: "Many Xanax users have never developed non-pharmacological anxiety management skills. Building these is both essential for Xanax recovery and genuinely life-improving.",
    },
    {
      title: "Post-Taper Support & Relapse Prevention",
      desc: "Support through the post-taper period — which often involves several weeks of protracted withdrawal symptoms (anxiety, insomnia, irritability) as the nervous system normalizes. Continued therapeutic support is strongly recommended.",
      detail: "The post-taper period is a high-risk time for relapse. Continued IOP or OP support significantly reduces this risk.",
    },
  ],
  faqs: [
    {
      q: "My doctor prescribed Xanax. How did I develop dependence?",
      a: "Physical dependence on benzodiazepines can develop within weeks of regular use, even at therapeutic prescribed doses and without any intent to misuse the medication. This is a physiological response to the drug — not a moral failing or a sign of addiction disorder. The prescribing guidelines for Xanax are clear that it should not be used for more than 2–4 weeks continuously for this reason. If you have been taking prescribed Xanax regularly for longer than this, it is appropriate to discuss a supervised taper with a physician.",
    },
    {
      q: "Why can't I just stop taking Xanax on my own?",
      a: "Abrupt Xanax discontinuation is medically dangerous — seizures can occur within 24–48 hours of stopping, even in individuals who have been taking therapeutic doses for only weeks. This is not a matter of motivation or willpower; it is a matter of neurophysiology. The brain has adapted to Xanax's presence and requires a gradual reduction to readjust safely. Please consult a physician before reducing or stopping Xanax.",
    },
    {
      q: "Will I always need medication for anxiety after stopping Xanax?",
      a: "Not necessarily. Non-benzo medications (SSRIs, SNRIs) are effective for most anxiety disorders without dependence risk. But perhaps more importantly, CBT — particularly exposure-based therapy — produces lasting anxiety reduction for most anxiety disorders. Many individuals who successfully taper off Xanax and engage in appropriate therapy find that their anxiety is actually better managed than it ever was on Xanax, which primarily suppressed anxiety without addressing its underlying mechanisms.",
    },
    {
      q: "How is Xanax different from other benzos?",
      a: "Xanax (alprazolam) is distinguished primarily by its short half-life (6–12 hours) and its rapid onset. These properties make it effective for acute anxiety but also make it particularly prone to between-dose withdrawal rebound anxiety and rapid dependence development. Compared to longer-acting benzodiazepines like Valium (diazepam, half-life 20–100 hours), Xanax produces a more pronounced peaks-and-troughs pattern — which both drives more intense psychological dependence and makes withdrawal more acute and medically urgent when discontinuation begins.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-pulse-line",
      label: "First Step",
      title: "Drug & Alcohol Detox",
      desc: "Medically supervised Xanax conversion and tapering protocol with physician oversight.",
      href: "/drug-alcohol-detox",
    },
    {
      icon: "ri-sun-line",
      label: "Intensive Care",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily psychiatric oversight and CBT for anxiety during and after the taper process.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Ongoing Support",
      title: "Intensive Outpatient (IOP)",
      desc: "Continued anxiety treatment and support through the post-taper adjustment period.",
      href: "/iop-program-orange-county",
    },
  ],
};

export default function Page() {
  return <ConditionPage data={data} />;
}
