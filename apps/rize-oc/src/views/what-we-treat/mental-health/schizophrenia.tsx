import MHConditionPage, { type MHConditionData } from "./MHConditionPage";

const data: MHConditionData = {
  heroImage: "mh_schizophrenia_hero01.jpg",
  heroImageAlt: "Clear crystal tide pool reflecting a bright blue sky representing clarity and grounded reality in schizophrenia treatment",
  category: "Schizophrenia",
  headline: "Schizophrenia &",
  headlineEmphasis: "Psychotic Disorders",
  subhead: "Schizophrenia is treatable — and early, sustained intervention produces the best long-term outcomes. Antipsychotic medication, psychosocial rehabilitation, and psychiatric support enable stable, meaningful functioning.",
  quickFacts: [
    { value: "1%",     label: "Global Prevalence" },
    { value: "Early",  label: "Intervention is Critical" },
    { value: "Psych",  label: "Specialist Required" },
    { value: "Stable", label: "Living is Achievable" },
  ],
  overviewTitle: "Understanding Schizophrenia and Psychotic Disorders",
  overviewCol1: [
    "Schizophrenia is a complex psychiatric condition characterized by disturbances in thought, perception, emotion, and behavior. It is classified by positive symptoms (hallucinations, delusions, disorganized thinking), negative symptoms (flattened affect, avolition, alogia, anhedonia), and cognitive symptoms (impairments in memory, attention, and executive function).",
    "Psychotic disorders on the schizophrenia spectrum include schizoaffective disorder (co-occurring mood disorder with psychosis), schizophreniform disorder (briefer duration), and brief psychotic disorder. Substance-induced psychosis (from stimulants, cannabis, or other drugs) requires careful differentiation from primary psychotic disorders.",
  ],
  overviewCol2: [
    "The neuroscience of schizophrenia involves dysregulation of dopamine, glutamate, and other neurotransmitter systems — producing the characteristic positive symptoms (dopamine dysregulation) and cognitive/negative symptoms (glutamate dysregulation in prefrontal circuits). Antipsychotic medications primarily address positive symptoms; the negative and cognitive dimensions require psychosocial and rehabilitative approaches.",
    "Early intervention in a first episode of psychosis significantly improves long-term outcomes — preventing neurological deterioration and building the functional foundation that sustains recovery. Rize OC's psychiatric team is experienced in first-episode psychosis assessment and the nuanced medication management required for optimal long-term outcomes.",
  ],
  signsLabel1: "Positive Symptoms",
  signsLabel2: "Negative & Cognitive Symptoms",
  signsIcon1: "ri-ghost-line",
  signsIcon2: "ri-brain-line",
  symptoms1: [
    { text: "Hallucinations — most commonly auditory (hearing voices), but also visual, tactile, or olfactory" },
    { text: "Delusions — fixed, false beliefs not based in reality (persecution, grandiosity, reference)" },
    { text: "Disorganized thinking — loosening of associations, tangential speech, thought blocking" },
    { text: "Disorganized behavior — unpredictable, inappropriate, or catatonic behavior" },
    { text: "Agitation or severe behavioral disorganization during acute episodes" },
    { text: "Paranoia — pervasive suspiciousness of others' intentions" },
  ],
  symptoms2: [
    { text: "Flattened affect — reduced emotional expression in face, voice, and body" },
    { text: "Avolition — marked decrease in motivation and goal-directed activity" },
    { text: "Alogia — poverty of speech; reduced spontaneous verbal output" },
    { text: "Anhedonia — inability to experience pleasure" },
    { text: "Cognitive impairments — memory, attention, processing speed, executive function" },
    { text: "Social withdrawal and reduced engagement with others" },
  ],
  consequences: [
    {
      icon: "ri-brain-line",
      title: "Neurological Progression",
      desc: "Untreated psychosis is associated with progressive neurological changes — particularly in first-episode psychosis, where delays in treatment are associated with worse long-term outcomes. Early, sustained antipsychotic treatment reduces this neurobiological deterioration and preserves cognitive functioning.",
    },
    {
      icon: "ri-heart-pulse-line",
      title: "Physical Health",
      desc: "Schizophrenia is associated with significantly reduced life expectancy — driven by cardiovascular disease, metabolic syndrome (worsened by some antipsychotic medications), tobacco use, and reduced access to medical care. Integrated medical monitoring is an important component of long-term schizophrenia management.",
    },
    {
      icon: "ri-home-line",
      title: "Functioning & Housing",
      desc: "Without adequate treatment and support, schizophrenia severely impairs occupational and social functioning, often leading to unemployment, housing instability, and social isolation. With comprehensive treatment — medication, psychosocial rehabilitation, and family support — stable community living and meaningful activity are achievable.",
    },
  ],
  treatmentSteps: [
    {
      title: "Psychiatric Evaluation & Diagnosis",
      desc: "Comprehensive psychiatric assessment establishing diagnosis (schizophrenia vs. schizoaffective vs. substance-induced psychosis vs. mood disorder with psychotic features), severity, and functional impact. Medical evaluation to rule out organic causes of psychosis.",
      detail: "Differentiating primary psychosis from substance-induced psychosis and from mood disorders with psychotic features is clinically critical — the treatment approaches differ significantly.",
    },
    {
      title: "Antipsychotic Medication Management",
      desc: "Evidence-based antipsychotic selection based on symptom profile, prior medication history, metabolic risk factors, and patient preferences. Second-generation antipsychotics are typically first-line. Long-acting injectable formulations are available for adherence optimization.",
      detail: "Antipsychotic selection involves balancing efficacy, metabolic side effects, and tolerability. Clozapine is the most effective antipsychotic for treatment-resistant schizophrenia.",
    },
    {
      title: "Psychoeducation & Family Involvement",
      desc: "Psychoeducation for both the individual and family members — explaining schizophrenia's nature, treatment, and course. Family-based interventions (particularly Family Focused Therapy) significantly reduce relapse rates by improving communication and reducing expressed emotion.",
      detail: "Family involvement is one of the most evidence-based interventions for reducing schizophrenia relapse — reducing 2-year relapse rates by approximately 20–30%.",
    },
    {
      title: "Cognitive Behavioral Therapy for Psychosis (CBTp)",
      desc: "CBT adapted for psychosis addresses the distress caused by positive symptoms, challenging the delusional beliefs maintaining dysfunction, and building coping strategies for symptom management. CBTp is an adjunct to medication, not a replacement.",
      detail: "CBTp is particularly effective for residual positive symptoms that persist despite adequate antipsychotic treatment.",
    },
    {
      title: "Psychosocial Rehabilitation & Recovery Planning",
      desc: "Building or rebuilding vocational functioning, social skills, and independent living capacities. Recovery-oriented planning that identifies meaningful personal goals and the clinical and social supports needed to achieve them.",
      detail: "Recovery in schizophrenia is not synonymous with symptom elimination — it includes achieving a meaningful, self-determined life in the context of managed illness.",
    },
  ],
  faqs: [
    {
      q: "Is schizophrenia dangerous?",
      a: "The overwhelming majority of people with schizophrenia are not violent and are more likely to be victims of violence than perpetrators. The cultural association between schizophrenia and violence is a media-driven distortion that significantly contributes to the stigma that makes treatment-seeking and community integration more difficult. When violence does occur in schizophrenia, it is almost always in the context of untreated acute psychosis, co-occurring substance use, or high-stress situations — all of which are directly addressed by comprehensive treatment.",
    },
    {
      q: "Does schizophrenia medication have to be taken for life?",
      a: "For most people with schizophrenia, long-term maintenance antipsychotic medication significantly reduces relapse risk. Discontinuing antipsychotics after a first episode results in relapse in approximately 80% of cases within 5 years. However, medication decisions are always individualized and made collaboratively. Some individuals — particularly those who have been symptom-free for extended periods — may consider a supervised discontinuation trial. These decisions require careful clinical oversight given the significant relapse risk.",
    },
    {
      q: "Can people with schizophrenia live independently?",
      a: "Yes — many people with schizophrenia live independently, maintain employment, have families, and lead full lives. Outcomes depend significantly on treatment engagement, the nature and severity of symptoms (particularly negative and cognitive symptoms), and available social support. Recovery is a realistic goal for the majority of people with schizophrenia. Comprehensive treatment — medication, psychosocial rehabilitation, family support, and ongoing psychiatric care — is the foundation of functional recovery.",
    },
  ],
  relatedPrograms: [
    {
      icon: "ri-sun-line",
      label: "Most Intensive",
      title: "Partial Hospitalization (PHP)",
      desc: "Daily psychiatric oversight and psychosocial programming for schizophrenia and psychotic disorders.",
      href: "/partial-hospitalization-program-orange-county",
    },
    {
      icon: "ri-group-line",
      label: "Step-Down",
      title: "Intensive Outpatient (IOP)",
      desc: "Psychoeducation, CBTp, and ongoing psychiatric management in an IOP format.",
      href: "/iop-program-orange-county",
    },
    {
      icon: "ri-outbox-line",
      label: "Maintenance",
      title: "Outpatient Program (OP)",
      desc: "Long-term psychiatric monitoring and relapse prevention support.",
      href: "/outpatient-program",
    },
  ],
};

export default function Page() {
  return <MHConditionPage data={data} />;
}
