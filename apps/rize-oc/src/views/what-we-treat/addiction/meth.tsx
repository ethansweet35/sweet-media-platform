import ConditionPage, { type ConditionData } from "./ConditionPage";

const data: ConditionData = {
  hideHeroForm: true,
  heroImage: "add_meth_hero01.jpg",
  heroImageAlt: "California high desert landscape at golden hour representing recovery and open space near Orange County",
  category: "Meth Addiction",
  headline: "Methamphetamine",
  headlineEmphasis: "Addiction",
  subhead: "Methamphetamine produces some of the most severe neurological changes of any substance. Specialized psychiatric care, evidence-based behavioral therapies, and intensive clinical support form the foundation of effective meth recovery.",
  quickFacts: [
    { value: "1.6M",   label: "US Adults with MUD" },
    { value: "72hrs",  label: "Acute Crash Window" },
    { value: "Months", label: "Dopamine Recovery Timeline" },
    { value: "CBT+CM", label: "Evidence-Based Treatment" },
  ],
  overviewTitle: "Understanding Methamphetamine Use Disorder",
  overviewCol1: [
    "Methamphetamine (meth, crystal meth, ice) is a highly potent CNS stimulant that releases massive surges of dopamine — up to three times more than cocaine — and blocks its reuptake. The result is an intense, prolonged high followed by an extended crash characterized by severe fatigue, depression, cognitive impairment, and overwhelming cravings.",
    "Chronic methamphetamine use causes some of the most profound and lasting brain changes of any substance. Dopaminergic and serotonergic neurons are damaged — affecting the brain's reward system, motor function, emotional regulation, and cognitive capacity. Some of these changes are detectable on brain imaging years into recovery.",
  ],
  overviewCol2: [
    "Meth-induced psychosis — paranoia, hallucinations, and delusional thinking during or after use — is common and can persist for weeks after cessation. This requires careful psychiatric management and should not be dismissed as a transient side effect.",
    "Despite the severity of meth's neurological impact, the brain has substantial capacity for recovery with sustained abstinence. Clinical research shows measurable dopamine system recovery with 12–24 months of abstinence — making the quality of treatment during early recovery critically important.",
  ],
  physicalSymptoms: [
    { text: "Extended wakefulness during use — sometimes days without sleep" },
    { text: "Severe appetite suppression and significant weight loss" },
    { text: "Dental deterioration ('meth mouth') — from dry mouth, grinding, and acid exposure" },
    { text: "Skin sores from compulsive picking during use" },
    { text: "Rapid physical deterioration visible in appearance over months" },
    { text: "Hyperthermia and elevated heart rate during acute use" },
  ],
  behavioralSymptoms: [
    { text: "Paranoia, hypervigilance, and erratic behavior during or after use" },
    { text: "Hallucinations — particularly visual and tactile (sensation of 'bugs under the skin')" },
    { text: "Compulsive, repetitive behaviors during intoxication (tweaking)" },
    { text: "Extreme mood swings — euphoria during use, profound depression during crash" },
    { text: "Complete social withdrawal or erratic, unpredictable social behavior" },
    { text: "Abandonment of relationships, responsibilities, and self-care" },
  ],
  consequences: [
    {
      icon: "ri-brain-line",
      title: "Neurological Damage",
      desc: "Meth causes structural damage to dopaminergic and serotonergic neurons — producing lasting impairments in memory, executive function, emotional regulation, and motor control. Some cognitive deficits persist for years into recovery, though significant improvement occurs with sustained abstinence.",
    },
    {
      icon: "ri-mental-health-line",
      title: "Psychiatric Consequences",
      desc: "Meth-induced psychosis can mimic schizophrenia and may persist long after the drug is cleared. Depression, anxiety, and anhedonia during early recovery can be severe enough to require intensive psychiatric support. Untreated, these often drive relapse.",
    },
    {
      icon: "ri-group-line",
      title: "Social & Physical Deterioration",
      desc: "Meth addiction typically produces rapid, visible physical deterioration. Social and professional functioning collapse. Criminal justice involvement, homelessness, and loss of family relationships are common in severe cases. Recovery often requires rebuilding life circumstances from the ground up.",
    },
  ],
  treatmentSteps: [
    {
      title: "Medical Evaluation & Acute Stabilization",
      desc: "Assessment of physical health status, nutritional deficits, and any acute psychiatric symptoms. Management of meth-induced psychosis where present. Medical support during the acute crash period (fatigue, hypersomnia, depression).",
      detail: "Meth-induced psychosis is managed with antipsychotic medications and typically resolves within days to weeks of abstinence. Persistent psychosis requires ongoing psychiatric evaluation.",
    },
    {
      title: "Intensive Psychiatric Support",
      desc: "Ongoing psychiatric assessment and management of meth-induced depression, psychosis, and anxiety. Treatment of any co-occurring primary psychiatric conditions — which may have been masked or worsened by meth use.",
      detail: "Severe anhedonia and depression during early meth recovery can be clinically indistinguishable from primary MDD and requires the same level of psychiatric attention.",
    },
    {
      title: "CBT & Contingency Management",
      desc: "Cognitive Behavioral Therapy for methamphetamine specifically addresses use triggers, craving management, and the cognitive distortions common in stimulant use disorder. Contingency Management has among the strongest trial evidence of any behavioral treatment for meth.",
      detail: "The Matrix Model — a structured, manualized approach combining CBT, CM, and family education — was developed specifically for stimulant use disorders and is used at Rize OC.",
    },
    {
      title: "Trauma Processing & Dual Diagnosis",
      desc: "Trauma histories are highly prevalent in methamphetamine use disorder. EMDR and trauma-informed CBT are integrated for clients with PTSD or complex trauma. Co-occurring ADHD, bipolar disorder, and other conditions are assessed and treated.",
      detail: "Trauma is one of the most common drivers of meth use initiation and maintenance. Treating trauma without addressing meth — or meth without addressing trauma — produces poor outcomes.",
    },
    {
      title: "Long-Term Recovery Support",
      desc: "Building the clinical, social, and community support infrastructure needed for sustainable recovery through the extended neurological recovery process. Alumni program, peer support, and continuing outpatient care are all components.",
      detail: "The 12–24 months following meth cessation are neurologically demanding. Sustained support through this period dramatically improves long-term outcomes.",
    },
  ],
  faqs: [
    {
      q: "Can the brain really recover from meth damage?",
      a: "Yes — with important caveats. Brain imaging studies show that many of the structural and functional changes caused by methamphetamine use improve significantly with sustained abstinence. Dopamine receptor density, prefrontal cortical function, and white matter integrity all show measurable recovery with 12–24+ months of abstinence. The recovery is not always complete — particularly with very long-term, high-dose use — but it is substantial and clinically significant. The quality of early recovery support significantly impacts the trajectory of neurological recovery.",
    },
    {
      q: "What is meth-induced psychosis and how is it treated?",
      a: "Meth-induced psychosis is a psychiatric syndrome — paranoia, auditory and visual hallucinations, and delusional thinking — that can occur during meth use or in the days to weeks after cessation. It is treated with antipsychotic medications and typically resolves within 1–4 weeks of abstinence. In some cases, particularly with long-term heavy use, psychotic symptoms can persist longer and require sustained psychiatric management. It is important to distinguish meth-induced psychosis from a primary psychotic disorder — our psychiatrists conduct comprehensive assessments to differentiate.",
    },
    {
      q: "Is there a medication for meth addiction?",
      a: "Unlike opioid or alcohol use disorder, there is no FDA-approved medication specifically for methamphetamine use disorder. Research is ongoing — several candidates including bupropion and naltrexone show modest evidence. In clinical practice, medications are used to manage specific symptoms: antipsychotics for psychosis, antidepressants for protracted depression, and appropriate treatment of co-occurring conditions. The primary evidence-based treatments are behavioral: CBT, Contingency Management, and the Matrix Model.",
    },
    {
      q: "How is meth addiction different from cocaine addiction?",
      a: "While both are stimulants, methamphetamine has a significantly longer half-life than cocaine (8–15 hours vs. 30–90 minutes) and penetrates the brain more efficiently, producing a longer and more intense high. Meth releases approximately 3× more dopamine than cocaine and causes greater structural neurological damage with chronic use. Meth-induced psychosis is more common and can be more severe and persistent. The overall clinical complexity of meth use disorder tends to be greater, often requiring more intensive and longer-duration treatment.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Most Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily clinical programming with psychiatric oversight — the most appropriate starting point for most meth use disorder presentations.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Step-Down",
      title: "Intensive Outpatient (IOP)",
      desc: "Structured group and individual therapy — typically following PHP stabilization for meth recovery.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-outbox-line",
      label: "Foundation",
      title: "Outpatient Program (OP)",
      desc: "Ongoing therapeutic support during the extended neurological recovery phase.",
      href: "/outpatient-program",
    },
  ],
};

export default function Page() {
  return <ConditionPage data={data} />;
}
