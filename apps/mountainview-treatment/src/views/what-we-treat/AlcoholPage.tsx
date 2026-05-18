import AddictionPage from "./AddictionPage";

const IMG = "https://gueqxorkktfcwiakepcp.supabase.co/storage/v1/object/public/site-assets/images/wp-inline/2026/05/mvt_alcohol_hero.jpg";

export default function AlcoholPage() {
  return (
    <AddictionPage
      heroImage={IMG}
      heroAlt="Alcohol addiction treatment in Seattle, WA — Mountain View Treatment"
      eyebrow="What We Treat / Addiction"
      headline="Alcohol Addiction Treatment"
      headlineItalic="in Seattle, WA"
      heroBody="Alcohol use disorder is one of the most common and most treatable conditions we see. Mountain View Treatment offers a structured, evidence-based outpatient continuum — from PHP through OP — tailored to your needs and schedule."
      whatHeadline="What Is Alcohol Use Disorder?"
      whatBody={[
        "Alcohol use disorder (AUD) is a chronic, relapsing brain condition characterized by an impaired ability to stop or control alcohol use despite adverse social, occupational, or health consequences. It exists on a spectrum from mild to severe and affects people across all demographics, professions, and backgrounds.",
        "The American Society of Addiction Medicine (ASAM) classifies AUD as a medical disease involving complex interactions among brain circuits, genetics, the environment, and an individual's life experiences. Effective treatment addresses all of these dimensions — not simply the drinking itself.",
        "Left untreated, alcohol use disorder is associated with liver disease, cardiovascular damage, neurological impairment, and significantly elevated mortality. With appropriate clinical support, recovery is not only possible but common.",
      ]}
      signsHeadline="Recognizing Alcohol Use Disorder"
      signsIntro="The DSM-5 identifies 11 criteria for AUD. The presence of 2 or more within a 12-month period indicates a diagnosable disorder. Severity is rated mild (2–3), moderate (4–5), or severe (6 or more)."
      signs={[
        { label: "Loss of Control", desc: "Drinking more or for longer than intended, or repeated failed attempts to cut down." },
        { label: "Preoccupation", desc: "A great deal of time spent obtaining, using, or recovering from alcohol's effects." },
        { label: "Cravings", desc: "Strong urges or cravings to drink that are difficult to ignore or resist." },
        { label: "Neglecting Responsibilities", desc: "Failure to fulfill major obligations at work, school, or home due to alcohol use." },
        { label: "Continued Use Despite Problems", desc: "Drinking despite persistent social, interpersonal, or health problems caused or worsened by alcohol." },
        { label: "Physical Dependence", desc: "Tolerance (needing more to feel the same effect) or withdrawal symptoms when alcohol is reduced or stopped." },
      ]}
      approachHeadline="How We Treat Alcohol Use Disorder"
      approachBody="Our approach to AUD integrates medically informed care, evidence-based behavioral therapies, and individualized support — addressing the physical, psychological, and social dimensions of recovery in a structured outpatient setting."
      approaches={[
        { icon: "ri-stethoscope-line", title: "Medical Assessment & MAT", body: "A thorough clinical intake assesses physical health, withdrawal risk, and co-occurring conditions. Medication-assisted treatment (naltrexone, acamprosate, disulfiram) is available when clinically indicated." },
        { icon: "ri-mind-map", title: "Cognitive Behavioral Therapy (CBT)", body: "CBT helps identify and restructure the thought patterns and triggers that drive alcohol use, replacing them with healthier coping strategies." },
        { icon: "ri-group-line", title: "Group & Individual Therapy", body: "Daily structured groups address relapse prevention, emotional regulation, and peer accountability. Individual sessions provide deeper personal work." },
        { icon: "ri-heart-pulse-line", title: "Holistic & Somatic Therapies", body: "Mindfulness, somatic experiencing, and holistic modalities support the nervous system recovery that is central to sustained sobriety." },
        { icon: "ri-user-heart-line", title: "Dual Diagnosis Treatment", body: "Depression, anxiety, and trauma frequently co-occur with AUD. We treat both simultaneously with an integrated clinical team." },
      ]}
      withdrawal={{
        headline: "What to Expect During Alcohol Withdrawal",
        intro: "Alcohol withdrawal is one of the few substance withdrawals that can be life-threatening. Symptoms emerge within hours of the last drink and may progress in severity over 24–72 hours. Medical supervision is strongly recommended for anyone with a history of heavy, daily drinking.",
        isMedical: true,
        timeline: [
          {
            phase: "Early Withdrawal",
            duration: "6–24 Hours",
            symptoms: [
              "Anxiety and restlessness",
              "Tremors (\"the shakes\")",
              "Nausea and vomiting",
              "Elevated heart rate and blood pressure",
              "Profuse sweating",
              "Insomnia",
            ],
          },
          {
            phase: "Peak Withdrawal",
            duration: "24–72 Hours",
            symptoms: [
              "Worsening tremors",
              "Withdrawal seizures (risk highest at 24–48 hours)",
              "Severe agitation",
              "Hallucinations (visual, auditory, or tactile)",
              "Delirium tremens (DTs) in severe cases",
              "Fever and confusion",
            ],
          },
          {
            phase: "Late & Post-Acute",
            duration: "Days 4–14+",
            symptoms: [
              "Gradual improvement in physical symptoms",
              "Persistent fatigue and low mood",
              "Disrupted sleep architecture",
              "Anxiety and irritability",
              "Post-acute withdrawal syndrome (PAWS) for weeks to months",
            ],
          },
        ],
        note: "Delirium tremens (DTs) occurs in approximately 5% of people going through alcohol withdrawal and carries a mortality risk without medical treatment. Our admissions team will assess your withdrawal risk and coordinate medically supervised detox when indicated before transitioning you into our outpatient program.",
      }}
      comorbidities={{
        headline: "Mental Health Conditions That Co-Occur With Alcohol Use Disorder",
        intro: "Alcohol use disorder rarely exists in isolation. Research consistently shows that 30–50% of individuals with AUD have at least one co-occurring psychiatric condition. Failing to treat both simultaneously is one of the most common reasons for relapse.",
        closingNote: "At Mountain View Treatment, co-occurring conditions are identified during intake and addressed concurrently by our integrated clinical team — not deferred until after primary addiction treatment.",
        items: [
          { icon: "ri-mental-health-line", title: "Major Depressive Disorder", body: "Depression and AUD are the most common co-occurring pair. Alcohol temporarily blunts emotional pain, reinforcing use. Treating depression alongside AUD dramatically improves outcomes for both." },
          { icon: "ri-mind-map", title: "Anxiety Disorders", body: "Social anxiety, generalized anxiety disorder, and panic disorder are highly prevalent in AUD. Many individuals begin drinking to manage anxiety, creating a dependency cycle." },
          { icon: "ri-ghost-2-line", title: "PTSD", body: "Trauma survivors frequently use alcohol as a coping mechanism for intrusive symptoms. EMDR and trauma-focused CBT address the root cause alongside addiction treatment." },
          { icon: "ri-flask-line", title: "Bipolar Disorder", body: "Alcohol use is more prevalent in bipolar disorder than any other substance. Alcohol destabilizes mood cycling, making medication management more complex and requiring integrated care." },
          { icon: "ri-focus-3-line", title: "ADHD", body: "Adults with undiagnosed ADHD frequently self-medicate with alcohol. Addressing ADHD with appropriate treatment reduces the underlying driver of alcohol use." },
          { icon: "ri-heart-pulse-line", title: "Chronic Pain", body: "Alcohol is often used to manage physical pain, creating a dependency that worsens pain sensitivity over time. Our team addresses pain management as part of integrated treatment." },
        ],
      }}
      locBody="Insurance typically covers medically necessary levels of care. Our admissions team verifies your benefits before you begin."
      whyPoints={[
        { icon: "ri-map-pin-2-line", title: "Seattle, WA Location", body: "Conveniently located in Seattle with easy access for King County residents — treatment that fits your life." },
        { icon: "ri-shield-check-line", title: "Insurance Accepted", body: "We work with Aetna, Anthem, Cigna, TRICARE, UnitedHealthcare, and most major PPO plans." },
        { icon: "ri-user-line", title: "Individualized Care Plans", body: "No two paths to recovery are identical. Every treatment plan is tailored to your specific clinical needs." },
        { icon: "ri-lock-2-line", title: "Complete Confidentiality", body: "HIPAA-protected care in a private, discreet environment. Your treatment is your business alone." },
      ]}
      faqs={[
        { q: "Do I need medical detox before starting PHP or IOP?", a: "Possibly. Alcohol withdrawal can be medically serious. Our clinical team conducts a thorough assessment and will coordinate with a detox facility if needed before you begin outpatient treatment. Many people can transition directly from a brief detox stay into our PHP program." },
        { q: "How long does outpatient alcohol treatment take?", a: "Duration depends on severity and individual progress. PHP typically runs 4–8 weeks, IOP 8–12 weeks, and standard outpatient continues for months or longer. Our team reassesses regularly and adjusts the plan based on clinical progress." },
        { q: "Can I continue working while in treatment?", a: "IOP and OP are specifically designed to be compatible with employment. PHP requires more time — typically mornings — but many clients coordinate a temporary leave of absence or reduced schedule." },
        { q: "Is medication-assisted treatment (MAT) available?", a: "Yes. Naltrexone, acamprosate, and disulfiram are evidence-based medications for AUD that our clinical team can prescribe and monitor when appropriate." },
        { q: "Does insurance cover alcohol treatment?", a: "Most major PPO plans including Aetna, Anthem, Cigna, TRICARE, and UnitedHealthcare cover medically necessary AUD treatment. Our admissions team verifies your specific benefits before you begin — at no cost." },
      ]}
    />
  );
}
