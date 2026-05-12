import ConditionPage, { type ConditionData } from "./ConditionPage";

const data: ConditionData = {
  heroImage: "add_inhalant_hero01.jpg",
  heroImageAlt: "Open blue sky and clean outdoor courtyard representing fresh air and recovery in Orange County California",
  category: "Inhalant Addiction",
  headline: "Inhalant",
  headlineEmphasis: "Use Disorder",
  subhead: "Inhalant use disorder is among the most medically serious and least-discussed substance use disorders. Rapid neurotoxicity, cardiac risk, and the vulnerability of those affected demand immediate, specialized clinical attention.",
  quickFacts: [
    { value: "Toxic",  label: "Immediate Neurological Risk" },
    { value: "SSDS",   label: "Sudden Sniffing Death Risk" },
    { value: "Youth",  label: "Disproportionate Prevalence" },
    { value: "Psych",  label: "Assessment Essential" },
  ],
  overviewTitle: "Understanding Inhalant Use Disorder",
  overviewCol1: [
    "Inhalants are volatile substances — solvents (paint thinner, gasoline, glue), aerosols (spray paint, hair spray), gases (nitrous oxide, propane), and nitrites — that are inhaled to produce intoxication. They are particularly concerning because they are household or industrial products, often inexpensive and easily accessible.",
    "Inhalants are disproportionately used by younger individuals and those with limited access to other substances. The intoxication is brief (minutes), which drives frequent re-use. The chemicals involved are directly neurotoxic — they damage brain tissue, peripheral nerves, and major organs with each episode of use.",
  ],
  overviewCol2: [
    "Sudden Sniffing Death Syndrome (SSDS) is a very real risk — the chemical compounds can trigger fatal cardiac arrhythmia, even on a first use, even in healthy individuals. This is a medical emergency that does not require chronic use to occur.",
    "Individuals with inhalant use disorder often present with significant cognitive impairment, mood dysregulation, and psychiatric comorbidities. At Rize OC, medical evaluation of neurological and organ damage is integrated from the beginning of treatment.",
  ],
  physicalSymptoms: [
    { text: "Chemical odor on breath or clothing following use" },
    { text: "Paint, chemical, or solvent stains around mouth or hands" },
    { text: "Slurred speech, dizziness, and loss of coordination during intoxication" },
    { text: "Nosebleeds, chemical burns around the nose and mouth" },
    { text: "Persistent headaches and visual disturbances" },
    { text: "Weight loss, fatigue, and general physical deterioration" },
  ],
  behavioralSymptoms: [
    { text: "Discovering empty aerosol cans, chemical-soaked rags, or bags with solvent residue" },
    { text: "Disappearing for brief periods and returning disoriented or impaired" },
    { text: "Declining school or work performance and social withdrawal" },
    { text: "Mood changes — euphoria followed by depression and irritability" },
    { text: "Collecting and hiding household chemical products" },
    { text: "Continuing use despite visible physical consequences" },
  ],
  consequences: [
    {
      icon: "ri-brain-line",
      title: "Neurotoxicity",
      desc: "Inhalants are directly neurotoxic — damaging myelin sheaths (white matter) and destroying neurons with each episode of use. Consequences include permanent cognitive impairment, memory loss, attention deficits, difficulty with coordination, and in severe cases, dementia-like presentations. Some damage is irreversible.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Cardiac & Organ Damage",
      desc: "Sudden Sniffing Death Syndrome can cause fatal ventricular fibrillation with any single use episode. Chronic use causes liver and kidney damage, bone marrow toxicity, and hearing or vision loss. The physical health consequences of inhalant use are serious and progressive.",
    },
    {
      icon: "ri-mental-health-line",
      title: "Psychiatric Consequences",
      desc: "Inhalant use is strongly associated with depression, anxiety, and psychotic symptoms. The cognitive impairment produced can mimic and worsen underlying psychiatric conditions. In adolescents, inhalant use is associated with significantly elevated risk of developing more severe substance use disorders.",
    },
  ],
  treatmentSteps: [
    {
      title: "Medical Evaluation & Organ Assessment",
      desc: "Comprehensive medical evaluation including neurological assessment, liver and kidney function, cardiac evaluation, and assessment of any acute toxicity. The physical health dimension of inhalant use disorder requires immediate medical attention.",
      detail: "Neuropsychological testing may be indicated to assess cognitive impairment and establish a baseline for recovery monitoring.",
    },
    {
      title: "Medical Stabilization & Monitoring",
      desc: "Close monitoring during initial abstinence. Management of withdrawal symptoms — which can include tremors, anxiety, and perceptual disturbances. Nutritional support given the physical deterioration common in chronic inhalant use.",
      detail: "Withdrawal from chronic inhalant use can include neurological symptoms requiring medical management.",
    },
    {
      title: "Psychiatric Evaluation & Treatment",
      desc: "Assessment and treatment of co-occurring depression, anxiety, PTSD, ADHD, or psychotic symptoms. Given the cognitive impairment common in inhalant use disorder, treatment modalities are adapted for the specific neurological picture.",
      detail: "Adapted cognitive-behavioral approaches that account for the cognitive impairment common in this population are essential to effective treatment.",
    },
    {
      title: "Behavioral Therapy & Family Involvement",
      desc: "Motivational enhancement therapy, behavioral activation, and skills training adapted to the individual's cognitive capacity. Family involvement is particularly important given the prevalence of inhalant use among younger individuals.",
      detail: "Family therapy and psychoeducation for families of individuals with inhalant use disorder are critical components of treatment.",
    },
    {
      title: "Neurological Recovery Support",
      desc: "Supporting cognitive recovery through structured activity, sleep hygiene, nutrition, and regular clinical monitoring. The brain's capacity for recovery from inhalant neurotoxicity with sustained abstinence is real but requires time and support.",
      detail: "Cognitive rehabilitation exercises and structured daily activity support neurological recovery during sustained abstinence.",
    },
  ],
  faqs: [
    {
      q: "Can someone really die from inhaling on their first try?",
      a: "Yes. Sudden Sniffing Death Syndrome (SSDS) is a well-documented phenomenon in which volatile compounds cause fatal ventricular fibrillation — an abnormal heart rhythm — even in otherwise healthy individuals on their first use. This is not theoretical; it is documented in case reports and epidemiological data. The cardiac sensitivity to these compounds combined with the exertion or startle response common during intoxication creates conditions for this arrhythmia. There is no 'safe' level of inhalant use.",
    },
    {
      q: "Can the brain damage from inhalants be reversed?",
      a: "Some neurological damage from inhalant use recovers with sustained abstinence — particularly white matter abnormalities and some cognitive functions. However, recovery is partial and variable, and the extent of reversibility depends on the duration and intensity of use, the specific chemicals involved, and the individual's age and neurodevelopmental stage. Adolescent use during critical neurodevelopmental windows carries particularly serious long-term consequences. The best neurological outcome requires early intervention and sustained abstinence.",
    },
    {
      q: "Who is most likely to use inhalants?",
      a: "Inhalant use is disproportionately prevalent among younger individuals — particularly adolescents aged 12–17 — and individuals with limited economic resources or social support. The accessibility and low cost of household chemicals makes them available in contexts where other substances are not. This population profile underscores the importance of involving families in treatment and addressing the social and environmental factors contributing to inhalant use.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Most Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily medical and psychiatric oversight with clinical programming for complex inhalant presentations.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Step-Down",
      title: "Intensive Outpatient (IOP)",
      desc: "Structured therapy and psychiatric support during neurological recovery.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-outbox-line",
      label: "Ongoing Support",
      title: "Outpatient Program (OP)",
      desc: "Continued therapeutic and medical support during the extended recovery phase.",
      href: "/outpatient-program",
    },
  ],
};

export default function Page() {
  return <ConditionPage data={data} />;
}
