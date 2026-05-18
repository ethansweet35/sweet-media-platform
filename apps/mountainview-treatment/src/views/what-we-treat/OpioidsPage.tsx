import AddictionPage from "./AddictionPage";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_opioids_hero.jpg";

export default function OpioidsPage() {
  return (
    <AddictionPage
      heroImage={IMG}
      heroAlt="Opioid addiction treatment in Seattle, WA — Mountain View Treatment"
      eyebrow="What We Treat / Addiction"
      headline="Opioid Use Disorder"
      headlineItalic="Treatment in Seattle"
      heroBody="Opioid use disorder is a serious, life-threatening condition that responds well to evidence-based treatment. Mountain View Treatment combines medication-assisted treatment with structured behavioral care to support lasting recovery."
      whatHeadline="What Is Opioid Use Disorder?"
      whatBody={[
        "Opioid use disorder (OUD) is a chronic brain condition characterized by compulsive opioid use despite harmful consequences. It involves significant changes in brain structure and function — particularly in circuits governing reward, stress, and impulse control — that make willpower alone an insufficient treatment strategy.",
        "OUD encompasses dependency on prescription opioids (oxycodone, hydrocodone, fentanyl patches), illicit opioids (heroin), and synthetic opioids (illicitly manufactured fentanyl). Washington State, like much of the country, has seen dramatic increases in overdose deaths driven by fentanyl contamination of the drug supply.",
        "The gold standard of OUD treatment is medication-assisted treatment (MAT) — specifically buprenorphine or methadone — combined with behavioral therapy. MAT reduces overdose mortality, decreases illicit drug use, and improves treatment retention significantly compared to abstinence-only approaches.",
      ]}
      signsHeadline="Recognizing Opioid Use Disorder"
      signsIntro="OUD exists on a spectrum from mild to severe. Early identification and treatment significantly improves outcomes and reduces overdose risk."
      signs={[
        { label: "Compulsive Use", desc: "Using opioids in larger amounts or for longer than intended, or inability to stop despite wanting to." },
        { label: "Physical Dependence", desc: "Tolerance (needing more for the same effect) or withdrawal symptoms (nausea, sweating, muscle aches, anxiety) when stopping." },
        { label: "Preoccupation with Supply", desc: "Spending significant time obtaining, using, or recovering from opioids; fear of running out." },
        { label: "Neglecting Life Areas", desc: "Reduced functioning at work, in relationships, or in personal responsibilities due to opioid use." },
        { label: "Risk-Taking Behavior", desc: "Using in physically hazardous situations; obtaining opioids through illegal means." },
        { label: "Continued Use Despite Consequences", desc: "Persisting with opioid use despite awareness of serious health, legal, or social consequences." },
      ]}
      approachHeadline="Evidence-Based Opioid Treatment"
      approachBody="Opioid use disorder requires a medical approach. Mountain View Treatment integrates FDA-approved medications with structured behavioral therapy, treating OUD with the same clinical rigor applied to any serious chronic illness."
      approaches={[
        { icon: "ri-capsule-line", title: "Medication-Assisted Treatment (MAT)", body: "Buprenorphine (Suboxone) and naltrexone (Vivitrol) are FDA-approved, evidence-based medications that significantly reduce cravings, block euphoric effects, and lower overdose risk. Our physicians manage MAT as part of a comprehensive treatment plan." },
        { icon: "ri-mind-map", title: "Cognitive Behavioral Therapy", body: "CBT targets the thought patterns, triggers, and high-risk situations associated with opioid use, building practical skills for relapse prevention." },
        { icon: "ri-group-line", title: "Group Therapy & Peer Support", body: "Structured group sessions address the social isolation, shame, and trauma that frequently accompany OUD." },
        { icon: "ri-heart-pulse-line", title: "Trauma-Informed Care", body: "A significant proportion of individuals with OUD have trauma histories. Trauma-informed approaches create safety and address root causes alongside the addiction." },
        { icon: "ri-file-list-line", title: "Relapse Prevention Planning", body: "Individualized relapse prevention plans address high-risk situations, develop coping strategies, and establish a clear action plan for crises." },
      ]}
      withdrawal={{
        headline: "Opioid Withdrawal: What to Expect",
        intro: "Opioid withdrawal is intensely uncomfortable but is not typically life-threatening for otherwise healthy adults. Symptoms emerge within 8–24 hours of the last dose (longer for methadone or long-acting opioids) and are strongly influenced by the specific opioid used, duration, and dose. Medical supervision significantly reduces discomfort and prevents relapse.",
        isMedical: true,
        timeline: [
          {
            phase: "Early Withdrawal",
            duration: "8–24 Hours",
            symptoms: [
              "Anxiety, agitation, restlessness",
              "Muscle aches and yawning",
              "Runny nose and watery eyes",
              "Sweating and chills",
              "Insomnia",
              "Intense drug cravings",
            ],
          },
          {
            phase: "Peak Withdrawal",
            duration: "Days 1–3",
            symptoms: [
              "Severe muscle cramps and bone pain",
              "Nausea, vomiting, and diarrhea",
              "Goosebumps (\"cold turkey\")",
              "Dilated pupils",
              "Elevated heart rate and blood pressure",
              "Profound dysphoria and depression",
            ],
          },
          {
            phase: "Post-Acute Phase",
            duration: "Weeks to Months",
            symptoms: [
              "Persistent depression and anhedonia",
              "Sleep disturbance",
              "Anxiety and emotional instability",
              "Low energy and fatigue",
              "Intermittent cravings (often triggered by cues)",
              "Cognitive fog improving gradually",
            ],
          },
        ],
        note: "Post-acute withdrawal syndrome (PAWS) from opioids can persist for weeks to months and is a primary relapse trigger. Medication-assisted treatment (buprenorphine or naltrexone) significantly reduces PAWS severity and the associated overdose risk — which is at its highest immediately after a period of abstinence due to lost tolerance.",
      }}
      comorbidities={{
        headline: "Mental Health & Medical Conditions in Opioid Use Disorder",
        intro: "OUD is associated with a high burden of co-occurring psychiatric and physical health conditions. Addressing these alongside opioid dependency is not optional — it is essential to achieving and sustaining recovery.",
        closingNote: "Integrated treatment of OUD and co-occurring conditions is associated with significantly better outcomes than sequential treatment. Our clinical team is structured specifically to address both simultaneously.",
        items: [
          { icon: "ri-ghost-2-line", title: "Trauma & PTSD", body: "Trauma exposure — particularly childhood adversity and interpersonal violence — is among the strongest predictors of OUD. Trauma-informed care and EMDR are central to our opioid treatment approach." },
          { icon: "ri-mental-health-line", title: "Depression", body: "Major depression is present in up to 50% of individuals with OUD. Opioids temporarily relieve depressive symptoms, reinforcing use. Antidepressant treatment alongside MAT improves outcomes for both." },
          { icon: "ri-mind-map", title: "Anxiety Disorders", body: "Generalized anxiety, PTSD, and panic disorder frequently co-occur with OUD. Opioids suppress the anxious arousal of the nervous system — making treating anxiety essential to preventing relapse." },
          { icon: "ri-stethoscope-line", title: "Chronic Pain", body: "Prescription opioid misuse often begins with legitimate pain management. Addressing the underlying pain through non-opioid modalities — physical therapy, somatic work, and medication alternatives — is a critical treatment component." },
          { icon: "ri-heart-pulse-line", title: "Hepatitis C & Infectious Disease", body: "Injection drug use is associated with elevated rates of hepatitis C and other bloodborne infections. Our team coordinates medical referrals and ensures physical health needs are addressed alongside addiction treatment." },
          { icon: "ri-emotion-unhappy-line", title: "Grief & Loss", body: "Many individuals with OUD have experienced significant losses — relationships, employment, housing, and loved ones to overdose. Grief processing is integrated into individual and group therapy." },
        ],
      }}
      locBody="OUD treatment is covered by most major insurance plans under the Mental Health Parity Act. We verify your benefits before you begin."
      whyPoints={[
        { icon: "ri-capsule-line", title: "MAT Available", body: "FDA-approved medications for opioid use disorder — buprenorphine and naltrexone — are available as part of our clinical program." },
        { icon: "ri-shield-check-line", title: "Insurance Accepted", body: "Most major PPO plans including Aetna, Anthem, Cigna, TRICARE, and UnitedHealthcare cover OUD treatment." },
        { icon: "ri-user-heart-line", title: "Trauma-Informed", body: "Our team is trained in trauma-informed care — understanding the connection between trauma and opioid use disorder." },
        { icon: "ri-lock-2-line", title: "42 CFR Part 2 Protected", body: "Substance use disorder treatment records receive heightened federal confidentiality protections beyond standard HIPAA." },
      ]}
      faqs={[
        { q: "Is buprenorphine (Suboxone) available at Mountain View Treatment?", a: "Yes. Buprenorphine is an FDA-approved, evidence-based medication for opioid use disorder. Our physicians can prescribe and monitor buprenorphine as part of a comprehensive outpatient treatment plan." },
        { q: "Do I need to complete detox before starting IOP or PHP?", a: "Yes — opioid withdrawal requires medically supervised management, and active withdrawal is not appropriate for outpatient programming. Our admissions team will coordinate with a detox facility and plan your transition into our program." },
        { q: "How long will I need to take buprenorphine?", a: "Duration of MAT is a clinical decision made collaboratively between you and your treatment team. Research supports longer durations of MAT for better outcomes. There is no universal timeline." },
        { q: "Is naltrexone (Vivitrol) an option?", a: "Yes. Naltrexone is an opioid antagonist that blocks opioid effects and reduces cravings. Unlike buprenorphine, it carries no dependency risk. It requires complete opioid detoxification before initiation." },
        { q: "What about fentanyl? Is it treated the same as other opioids?", a: "Clinically, fentanyl OUD is treated similarly to other opioid disorders, though the potency of illicitly manufactured fentanyl makes the safety stakes especially high. MAT is strongly recommended for fentanyl-involved OUD." },
      ]}
    />
  );
}
