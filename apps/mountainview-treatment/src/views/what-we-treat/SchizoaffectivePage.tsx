import MentalHealthPage from "./MentalHealthPage";
const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_mh_schizoaffective.jpg";
export default function SchizoaffectivePage() {
  return (
    <MentalHealthPage
      heroImage={IMG}
      heroAlt="Schizoaffective disorder treatment in Seattle, WA — Mountain View Treatment"
      eyebrow="What We Treat / Mental Health"
      headline="Schizoaffective Disorder"
      headlineItalic="Treatment in Seattle"
      heroBody="Schizoaffective disorder is a complex condition that requires integrated psychiatric and therapeutic support. Mountain View Treatment provides specialized outpatient care for schizoaffective disorder in Seattle — with coordinated medication management and evidence-based psychosocial treatment."
      whatHeadline="What Is Schizoaffective Disorder?"
      whatBody={[
        "Schizoaffective disorder is a psychiatric condition characterized by a combination of psychotic symptoms — such as hallucinations and delusions — and significant mood disorder symptoms, either depressive or manic. It sits between schizophrenia and bipolar disorder or major depressive disorder on the diagnostic spectrum, sharing features of both.",
        "The defining feature of schizoaffective disorder is that psychotic symptoms must be present for at least two weeks in the absence of a mood episode — distinguishing it from psychotic depression or bipolar disorder with psychotic features, where psychosis occurs only during mood episodes. This distinction has important implications for treatment.",
        "Schizoaffective disorder affects approximately 0.3% of the population and tends to have a chronic, relapsing course. With consistent treatment — combining antipsychotic medication, mood stabilization, and psychosocial support — many individuals achieve meaningful stability and quality of life. Early and sustained engagement with treatment significantly improves long-term outcomes.",
      ]}
      symptomsHeadline="Symptoms of Schizoaffective Disorder"
      symptomsIntro="Schizoaffective disorder combines symptoms from the psychotic spectrum with mood disorder symptoms. Both dimensions require clinical attention:"
      symptoms={[
        { label: "Hallucinations", desc: "Perceiving things that others do not — most commonly auditory hallucinations (hearing voices), but also visual, tactile, or olfactory. Voices may be commenting, commanding, or conversing." },
        { label: "Delusions", desc: "Fixed, false beliefs held with certainty despite contrary evidence — paranoid (being persecuted, watched, followed), referential (messages intended specifically for them), or grandiose in nature." },
        { label: "Disorganized Thinking", desc: "Disrupted thought flow manifesting as disorganized speech — loosely connected ideas, derailment, or incoherence. Cognitive dysfunction affects concentration, memory, and executive function." },
        { label: "Depressive Episodes", desc: "In the depressive subtype: persistent low mood, anhedonia, fatigue, hopelessness, and suicidal ideation. Depression accounts for significant functional impairment and mortality risk in schizoaffective disorder." },
        { label: "Manic or Mixed Episodes", desc: "In the bipolar subtype: episodes of elevated or irritable mood, decreased sleep, grandiosity, rapid speech, and impulsive behavior — with psychotic features potentially present during these episodes." },
        { label: "Negative Symptoms", desc: "Diminished emotional expression, poverty of speech, avolition (reduced motivation), anhedonia, and social withdrawal — often the most impairing and treatment-resistant dimension of the disorder." },
      ]}
      approachHeadline="Integrated Treatment for Schizoaffective Disorder"
      approachBody="Schizoaffective disorder requires a carefully coordinated combination of medication management, psychoeducation, and psychosocial support. Mountain View Treatment coordinates all dimensions of care within an integrated clinical framework."
      approaches={[
        { icon: "ri-stethoscope-line", title: "Medication Management & Coordination", body: "Antipsychotic medication is the pharmacological foundation of schizoaffective treatment. Mood stabilizers or antidepressants are added based on the subtype. Our team coordinates closely with prescribers and monitors closely for effectiveness, adherence, and side effects." },
        { icon: "ri-book-open-line", title: "Psychoeducation", body: "Understanding schizoaffective disorder — its course, triggers, early warning signs, and the critical importance of medication adherence — empowers clients and families to manage the condition proactively." },
        { icon: "ri-group-line", title: "Supportive Group Therapy", body: "Structured group formats provide social connection, practical coping skill development, and peer support — addressing the isolation and social withdrawal that are central features of the disorder." },
        { icon: "ri-mind-map", title: "Cognitive Remediation", body: "Cognitive dysfunction — including impaired attention, memory, and executive function — is a significant source of disability in schizoaffective disorder. Cognitive remediation exercises support real-world functioning." },
        { icon: "ri-home-heart-line", title: "Family Support & Psychoeducation", body: "Family members and support systems are essential partners in managing schizoaffective disorder. We provide psychoeducation, communication strategies, and support for those caring for a loved one with this condition." },
      ]}
      comorbidities={{
        headline: "Conditions That Commonly Co-Occur With Schizoaffective Disorder",
        intro: "Schizoaffective disorder has high rates of comorbid psychiatric conditions and significant medical health disparities. Comprehensive care addresses both.",
        closingNote: "Mountain View Treatment coordinates with prescribers, medical providers, and community support services to address the full clinical and functional picture — not just the primary diagnosis.",
        items: [
          { icon: "ri-drop-line", title: "Substance Use Disorders", body: "Substance use disorders occur in up to 50% of individuals with schizoaffective disorder — most commonly cannabis, alcohol, and stimulants. Substances often begin as self-medication but significantly worsen psychotic symptoms and destabilize mood." },
          { icon: "ri-emotion-unhappy-line", title: "Major Depression", body: "Depressive symptoms are central to schizoaffective disorder (depressive subtype) and represent a primary cause of disability and mortality risk. Antidepressant treatment must be carefully balanced against the risk of mood destabilization." },
          { icon: "ri-mind-map", title: "Anxiety Disorders", body: "Anxiety — including PTSD, panic, and GAD — is significantly elevated in schizoaffective disorder. Anxiety frequently amplifies psychotic symptoms and requires concurrent treatment." },
          { icon: "ri-heart-pulse-line", title: "Medical Comorbidities", body: "Antipsychotic medications are associated with metabolic side effects — weight gain, diabetes risk, and cardiovascular disease. Monitoring and managing physical health is an essential component of long-term schizoaffective care." },
          { icon: "ri-ghost-2-line", title: "Trauma & PTSD", body: "Psychotic experiences — including hospitalizations and the experiences themselves — can be traumatic. Trauma also increases vulnerability to psychosis. Trauma-informed care is integrated throughout treatment." },
          { icon: "ri-user-unfollow-line", title: "Social Isolation & Stigma", body: "The stigma associated with psychotic disorders and the social withdrawal driven by the illness itself create profound isolation. Peer support and community integration are therapeutic priorities alongside clinical treatment." },
        ],
      }}
      locBody="Schizoaffective disorder treatment is covered by most major insurance plans under the Mental Health Parity Act."
      whyPoints={[
        { icon: "ri-stethoscope-line", title: "Medication Coordination", body: "Expert coordination of antipsychotic and mood-stabilizing medications as part of integrated outpatient care." },
        { icon: "ri-shield-check-line", title: "Insurance Accepted", body: "Aetna, Anthem, Cigna, TRICARE, UnitedHealthcare, and most major PPO plans." },
        { icon: "ri-home-heart-line", title: "Family Involvement", body: "We support families and care systems — providing psychoeducation and communication strategies." },
        { icon: "ri-lock-2-line", title: "Complete Privacy", body: "HIPAA-protected care with absolute discretion in Seattle, WA." },
      ]}
      faqs={[
        { q: "What is the difference between schizoaffective disorder and schizophrenia?", a: "In schizophrenia, mood episodes are brief relative to the overall duration of the illness. In schizoaffective disorder, prominent mood episodes — depression or mania — are a central feature, and psychotic symptoms must also occur independent of mood episodes. Treatment differs: schizoaffective disorder requires addressing both the psychotic and mood dimensions." },
        { q: "What is the difference between schizoaffective disorder and bipolar disorder with psychotic features?", a: "In bipolar disorder with psychotic features, psychosis occurs only during mood episodes. In schizoaffective disorder, psychotic symptoms persist for at least two weeks in the absence of a mood episode. This distinction requires careful clinical assessment over time." },
        { q: "Is schizoaffective disorder treatable?", a: "Yes. While schizoaffective disorder is a chronic condition, consistent treatment — combining antipsychotic medication, mood stabilization, and psychosocial support — allows many individuals to achieve meaningful stability, symptom reduction, and quality of life. Early, sustained engagement with treatment is strongly associated with better long-term outcomes." },
        { q: "Can someone with schizoaffective disorder work and maintain relationships?", a: "Many people with schizoaffective disorder maintain employment, relationships, and independent living with appropriate support. Functional outcomes are highly variable — influenced by symptom severity, treatment adherence, early intervention, and the quality of psychosocial support." },
        { q: "Does insurance cover schizoaffective disorder treatment?", a: "Yes. Schizoaffective disorder is a recognized DSM-5 diagnosis covered under the Mental Health Parity Act by most major insurance plans. Our admissions team verifies your specific benefits at no cost." },
      ]}
    />
  );
}
